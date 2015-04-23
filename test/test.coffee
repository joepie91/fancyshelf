fancyshelf = require("./fancyshelf")

shelf = fancyshelf({
	username: "root"
	password: null
	database: "anonnews"
})

ForumPost = shelf.model("ForumPost", {
	tableName: "forum_posts"
	idAttribute: "Id"
	replies: -> this.hasMany("ForumPost", "ParentId")
})

ForumPost.find(30, "replies").then (result) -> console.log(result.json())