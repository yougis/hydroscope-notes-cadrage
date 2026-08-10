-- dyn-counts.lua
-- Injecte les compteurs dynamiques (dyn_counts.txt : lignes key=value) comme
-- métadonnées Pandoc, tolérant un fichier absent. Les références {{< meta key >}}
-- du texte se résolvent alors vers la valeur numérique.

local function read_counts(path)
  local f = io.open(path, "r")
  if not f then return nil end
  local t = f:read("*a"); f:close()
  local meta = {}
  for k, v in t:gmatch("(%S+)%s*=%s*(%S+)") do meta[k] = v end
  return meta
end

function Meta(m)
  -- 'dir' du document source si quarto fournit QUARTO_DOCUMENT_PATH, sinon cwd
  local docpath = os.getenv("QUARTO_DOCUMENT_PATH")
  local candidates = {"dyn_counts.txt"}
  if docpath then
    local dir = docpath:match("^(.*)[/\\][^/\\]+$") or "."
    table.insert(candidates, 1, dir .. "/dyn_counts.txt")
    table.insert(candidates, dir .. "/../dyn_counts.txt")
    table.insert(candidates, dir .. "/../../dyn_counts.txt")
  end
  table.insert(candidates, "cahier des charges/dyn_counts.txt")
  local counts
  for _, p in ipairs(candidates) do
    counts = read_counts(p)
    if counts then break end
  end
  if not counts then return nil end
  for k, v in pairs(counts) do
    -- ignore keys déjà présentes (préserve la priorité du front-matter)
    if m[k] == nil then m[k] = pandoc.Str(v) end
  end
  return m
end