Template.sectionMenuItem.helpers({
  lectures: ->
    lectures = Lecture.where({_id: {$in: @lectures}}, {sort: {index: 1}}) if @lectures
    return lectures
  active: ->
    return 'active' if @_id is Session.get 'currentSection'
})
