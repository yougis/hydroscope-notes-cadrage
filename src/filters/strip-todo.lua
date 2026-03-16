function Para(el)
  local txt = pandoc.utils.stringify(el)

  if txt:match("@todo") then
    return {}
  elif text:match("^TODO:") then
    return {}
  else
    return el
  end
end