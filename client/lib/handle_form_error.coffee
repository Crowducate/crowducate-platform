@handleFormError = (err) ->
  if err.error is 'json' or err.error is 400
    reason = JSON.parse(err.reason)
    if _.isArray(reason)
      for err in reason
        Form.setFormError(err)
      return
    else if _.isObject(reason)
      return Form.setFormError(reason)
  if _.isArray(err)
    for e in err
      Form.setFormError(e)
    return
  return Notify.setError(err.reason) if err.reason
  return Notify.setError(__('Unerwarteter Fehler'))