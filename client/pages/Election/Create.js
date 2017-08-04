/*
Page for the creation of elections:
*/

/*
 * JavaScript that runs on creation of page:
 */
Template.Create.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('myPolls');
    });
});

/*
 * Methods for interacting with data, i.e. Mongo Documents:
 */
Template.Create.helpers({
    polls: function() {
        return Polls.find({});
    }
});

/*
 * Methods for adding interactive components:
 */
 Template.Create.events({
     'click .fa-trash': function() {
         Meteor.call('deletePoll', this._id);
     }
 });
