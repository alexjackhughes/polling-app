// Initialisation of Collection of Mongo documents:
Polls = new Mongo.Collection('polls');

// OnGoWorks handles security/permissions without Insecure package:
Polls.permit(['insert', 'update', 'remove']).ifLoggedIn();

// Permission rules the Collection has to follow:
Polls.allow({
    // If signed in, you're allowed to post recipe:
    insert: function(userId, doc) {
        return !!userId;
    },
    // If signed in, Allows you to update recipe:
    update: function(userId, doc) {
        return !!userId;
    }
});

PollSchema = new SimpleSchema({
    question: {
        type: String,
        label: "Question"
    },
    answers: {
        type: [String],
        label: "Answers"
    },
    results: {
        type: [Number],
        label: "Results"
    },
    voters: {
        type: [String],
        label: "Voters"
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        },
        autoform: {
            type: "hidden"
        }
    }
});

Meteor.methods({
    // Deletes a Poll based on id of document:
    deletePoll: function(id) {
        Polls.remove(id);
    },
    // Removes user from votes - requires the id of the document
    // and the voter's userId:
    updateVoter: function(id) {
        Polls.update(
            {id: id, voters: this.userId},
            {
                $set: {'voters.$': ''} // Set voter in slot 0 to nothing
            }
        );
    },
    // Increment the results by one vote - requires document id, and
    // the array slot of the correct answer:
    updateResults: function(docId, questionId) {
        var voterExist = Polls.find({voters: this.userId, _id:docId}).count() > 0;
        var resultQuery = 'results.' + questionId;

        if (voterExist === true) {
            Polls.update(
                {_id: docId}, {
                    $inc: { [resultQuery]: 1 } // Right now, increments just slot 0
                }
            )
        }

        // Make sure the user is in the author section - works!:
        // var voterExist = Polls.find({voters: this.userId, id:id}).count() > 0;
        // //console.log(voterExist);
        // // If the user is allowed to vote, increment their vote:
        //
        // if (voterExist === true) {
        //     //var resultQuery = 'results.' + questionId;
        //     var resultQuery = 'results.' + questionId;
        //     // Increments the array by 1
        //     Polls.update(
        //         {id: id},
        //         {
        //             $inc: { [resultQuery]: 1 } // Right now, increments just slot 0
        //         }
        //     );
        // }
    }
});

Polls.attachSchema( PollSchema );
