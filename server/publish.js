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

// Find all polls that are currently available:
Meteor.publish('polls', function() {
    return Polls.find();
});

// Find all polls that you created:
Meteor.publish('myPolls', function(id) {
        return Polls.find({
            author:this.userId
        });
});

// Find all polls where you are in the 'voters' field of document:
Meteor.publish('electoratePolls', function(id) {
        return Polls.find({
            voters:this.userId // Add users to vote by the user's ID
        });
});

// Find all blogs
Meteor.publish('blogsAll', function() {
    return Blogs.find();
});
