# Meteor.startup ->
  
#   #Generate some placeholders if the database is empty
#   if Course.find().count() is 0
#     user = Meteor.users.findOne()
#     return console.warn("No user found")  unless user
#     Course.create
#       courseTitle: "Analysis"
#       subtitle: "A gentle introduction to analysis."
#       category: "Math/Science"
#       keywords: [
#         "Analysis"
#         "High School"
#         "Beginner"
#       ]
#       age: "15+"
#       owner: user._id
#       published: 1

#     Course.create
#       courseTitle: "Inorganic Chemistry"
#       subtitle: "A gentle introduction to inorganic chemistry."
#       category: "Math/Science"
#       keywords: [
#         "Chemistry"
#         "University"
#         "Beginner"
#       ]
#       age: "18+"
#       owner: user._id
#       published: 1

#     Course.create
#       courseTitle: "Entrepreneurship 101"
#       subtitle: "A gentle introduction to the theory and practice of entrepreneurship."
#       category: "Business Management"
#       keywords: [
#         "Analysis"
#         "University"
#         "Beginner"
#       ]
#       age: "18+"
#       owner: user._id
#       published: 1

#   return
