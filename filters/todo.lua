-- todo.lua
-- Filtre Pandoc pour gérer les @todo avec priorité, section et surlignage

todos = {}
used_ids = {}
bookmark_id = 0  -- compteur global pour les IDs de bookmark Word (doivent être uniques)

-- Fonction utilitaire pour créer un ID unique
local function make_id(base)
  local id = base:gsub("%W+", "-"):lower()
  if used_ids[id] then
    local n = 2
    while used_ids[id .. "-" .. n] do
      n = n + 1
    end
    id = id .. "-" .. n
  end
  used_ids[id] = true
  return id
end

-- Fonction pour obtenir le prochain ID de bookmark Word (entier unique)
local function next_bookmark_id()
  local id = bookmark_id
  bookmark_id = bookmark_id + 1
  return id
end

-- Filtre pour les paragraphes
function Para(el)
  local text = pandoc.utils.stringify(el.content)

  -- Détecte le format @todo[priority=...,section=...] texte
  local p, s, t = text:match("@todo%s*%[priority%s*=%s*([^,]+)%s*,%s*section%s*=%s*([^%]]+)%]%s*(.+)")

  if p then
    local anchor_name = make_id(s .. "-" .. t)
    table.insert(todos, {id = anchor_name, priority = p, section = s, text = t})

    -- ── HTML : fond jaune + anchor ──────────────────────────────────────────
    if FORMAT:match("html") then
      local anchor      = pandoc.Span({}, pandoc.Attr(anchor_name))
      local hl_start    = pandoc.RawInline("html", '<span style="background-color: yellow;">')
      local hl_end      = pandoc.RawInline("html", "</span>")
      local new_content = {anchor, hl_start}
      for _, inline in ipairs(el.content) do table.insert(new_content, inline) end
      table.insert(new_content, hl_end)
      return pandoc.Para(new_content)

    -- ── LaTeX / PDF : \hl{...} avec package soul ────────────────────────────
    elseif FORMAT:match("latex") or FORMAT:match("pdf") then
      local anchor      = pandoc.Span({}, pandoc.Attr(anchor_name))
      local hl_start    = pandoc.RawInline("latex", "\\hl{")
      local hl_end      = pandoc.RawInline("latex", "}")
      local new_content = {anchor, hl_start}
      for _, inline in ipairs(el.content) do table.insert(new_content, inline) end
      table.insert(new_content, hl_end)
      return pandoc.Para(new_content)

    -- ── DOCX : bookmark Word natif + style de paragraphe ────────────────────
    elseif FORMAT:match("docx") then
      local bid = next_bookmark_id()

      -- Bookmark Word natif (w:bookmarkStart / w:bookmarkEnd)
      -- Ils encadrent le contenu du paragraphe pour permettre les liens internes
      local bm_start = pandoc.RawInline("openxml", string.format(
        '<w:bookmarkStart w:id="%d" w:name="%s"/>', bid, anchor_name))
      local bm_end = pandoc.RawInline("openxml", string.format(
        '<w:bookmarkEnd w:id="%d"/>', bid))

      -- Contenu : bookmark + inlines originaux
      local inner = {bm_start}
      for _, inline in ipairs(el.content) do
        table.insert(inner, inline)
      end
      table.insert(inner, bm_end)

      -- Div avec custom-style applique le style de paragraphe Word "HighlightYellow"
      -- défini dans custom-reference.docx (w:type="paragraph")
      return pandoc.Div(
        {pandoc.Para(inner)},
        pandoc.Attr("", {}, {["custom-style"] = "HighlightYellow"})
      )
    end
  end

  return el
end

-- Génère un lien interne vers un bookmark Word via un champ HYPERLINK openxml
-- pandoc.Link("#anchor") ne résout pas les bookmarks créés manuellement en openxml
local function make_docx_link(anchor_name, link_label, description_text)
  -- Champ Word : { HYPERLINK \l "bookmark_name" }
  -- \l = lien local (bookmark), sans \l ce serait une URL externe
  local field_begin = pandoc.RawInline("openxml",
    '<w:r><w:fldChar w:fldCharType="begin"/></w:r>'
    .. '<w:r><w:instrText xml:space="preserve"> HYPERLINK \\l "'
    .. anchor_name .. '" </w:instrText></w:r>'
    .. '<w:r><w:fldChar w:fldCharType="separate"/></w:r>')

  -- Texte du lien avec style "Hyperlink" natif Word (souligné bleu)
  local field_text = pandoc.RawInline("openxml",
    '<w:r><w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr>'
    .. '<w:t xml:space="preserve">' .. link_label .. '</w:t></w:r>')

  local field_end = pandoc.RawInline("openxml",
    '<w:r><w:fldChar w:fldCharType="end"/></w:r>')

  -- Description après le lien en texte normal
  local desc = pandoc.RawInline("openxml",
    '<w:r><w:t xml:space="preserve"> ' .. description_text .. '</w:t></w:r>')

  return pandoc.Para({field_begin, field_text, field_end, desc})
end



-- Génère les blocs de la liste TODO
-- Génère les blocs de la liste TODO
local function make_todo_blocks()
  local blocks = {}

  -- Titre uniquement s'il y a au moins un TODO
  if #todos > 0 then
    table.insert(blocks, pandoc.Para({
      pandoc.Str("Points en attente (" .. #todos .. ")")
    }))
  end

  for _, todo in ipairs(todos) do
    local label = todo.priority .. " (" .. todo.section .. ")"
    if FORMAT:match("docx") then
      table.insert(blocks, make_docx_link(todo.id, label, todo.text))
    else
      local link = pandoc.Link({pandoc.Str(label)}, "#" .. todo.id)
      table.insert(blocks, pandoc.Para({link, pandoc.Space(), pandoc.Str(todo.text)}))
    end
  end

  return blocks
end

-- Remplace récursivement le div#todo-list où qu'il soit dans l'arbre
local function replace_todo_list(blocks)


  
  local result = {}
  for _, block in ipairs(blocks) do
    if block.t == "Div" and block.identifier == "todo-list" then
      for _, b in ipairs(make_todo_blocks()) do
        table.insert(result, b)
      end
    elseif block.t == "Div" then
      -- Descend récursivement dans les Div imbriqués (callout, etc.)
      local inner = replace_todo_list(block.content)
      local new_div = pandoc.Div(inner, block.attr)
      table.insert(result, new_div)
    else
      table.insert(result, block)
    end
  end
  return result
end

-- Filtre final
function Pandoc(doc)
  doc.blocks = replace_todo_list(doc.blocks)
  return doc
end