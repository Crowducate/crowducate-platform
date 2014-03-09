@getPrettyDiff = (oldStr, newStr) ->
  dmp = new diff_match_patch()
  d = dmp.diff_main oldStr, newStr
  dmp.diff_prettyHtml(d)
