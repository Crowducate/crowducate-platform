@slugify = (text) ->
  text = text.toLowerCase()
  text = text.replace(/[^-a-zA-Z0-9,&\s]/g, (ch) ->
    return 'ae' if ("ä".indexOf(ch) >= 0)
    return 'Ae' if ("Ä".indexOf(ch) >= 0)
    return 'oe' if ("ö".indexOf(ch) >= 0)
    return 'Oe' if ("Ö".indexOf(ch) >= 0)
    return 'ue' if ("ü".indexOf(ch) >= 0)
    return 'Ue' if ("Ü".indexOf(ch) >= 0)
    return ''
  )
  text = text.replace(/\s/g, "-")
  text = text.replace(",", "")
  return text