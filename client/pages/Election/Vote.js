/*
Page where all elections you are part of are shown, and you have
the ability to vote in those elections:
*/

/*
 * JavaScript that runs on creation of page:
 */
Template.Vote.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('electoratePolls');
    });
});

/*
 * Methods for interacting with data, i.e. Mongo Documents:
 */
Template.Vote.helpers({
    polls: function() {
        return Polls.find();
    }
});

/*
 * Methods for adding interactive components:
 */
Template.electionVote.events({
    // Method handler for clicking to vote - should
    // update the 'results' and disallow the user from voting again
    // Could do this by removing the userId from the 'voters'
    'click .btn-trigger-vote': function(event, template) {

        // Access the parentId of the election document:
        var parentThis = template.data._id;
        console.log(parentThis);

        // Find the array position of the button clicked:
        console.log(event.currentTarget.getAttribute('class'));
        var btnArray = event.currentTarget.getAttribute('class').substr(0,1);
        console.log(btnArray);

        // Increments the vote of the correct button:
        Meteor.call('updateResults', parentThis, btnArray);
        // Deletes the user from this election - WORKS!
        Meteor.call('updateVoter', parentThis);
        // Gives feedback that the user has actually voted - WORKS!
        alert("Thanks for voting!");
    }
});
