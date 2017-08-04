/*
Page where the results of the election are tallied and
show to all members who are part of that election:
*/

/*
 * JavaScript that runs on creation of page:
 */
Template.Tally.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('polls');
    });
});

/*
 * Methods for interacting with data, i.e. Mongo Documents:
 */
Template.Tally.helpers({
    polls: function() {
        return Polls.find({});
    }
});

/*
 * Methods for adding interactive components:
 */
Template.Tally.events({
});
