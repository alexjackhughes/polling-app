/*
A home page for logged-in users, with links to elections you are a
part of, link to the create new elections page, and a link all
finished elections:
*/

/*
 * JavaScript that runs on creation of page:
 */
Template.Dashboard.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('polls');
    });
});

/*
 * Methods for interacting with data, i.e. Mongo Documents:
 */
Template.Dashboard.helpers({
    polls: function() {
        return Polls.find({});
    }
});


/*
 * Methods for adding interactive components:
 */
Template.Dashboard.events({
});
