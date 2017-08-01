/*
 The 'Publish' methods interact with the database on the server-side,
 the client interacts with the database by 'Subscribing' to these methods:
 */

// Finds all blogs written by the user and returns them:
Meteor.publish('blogs', function() {
    return Blogs.find({
        author:this.userId
    });
});

// Find all blogs
Meteor.publish('blogsAll', function() {
    return Blogs.find();
});
