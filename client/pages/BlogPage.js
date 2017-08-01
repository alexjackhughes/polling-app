/*
 * JavaScript is used to manipulate and interact with the page:
 */

/*
 * JavaScript that runs on creation of page:
 */
Template.BlogPage.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('blogs');
    });
});

/*
 * Methods for interacting with data, i.e. Mongo Documents:
 */
Template.BlogPage.helpers({
    blogs: function() {
        return Blogs.find();
    }
});

/*
 * Methods for adding interactive components:
 */
Template.BlogPage.events({
    'click .fa-trash': function() {
        Meteor.call('deleteBlog', this._id);
    }
});
