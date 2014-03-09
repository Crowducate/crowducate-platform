Template.courseListItem.helpers({
  courseThumb: ->
    console.log 'Tpl.courseListItem', @
    return @thumb if @thumb
    return '/images/course-thumb.png'
})
