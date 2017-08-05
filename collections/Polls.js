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
        label: "Results",
        defaultValue: 0,
        autoform: {
            type: "hidden"
        }
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
        console.log(id);
        Polls.update(
            {_id: id, voters:this.userId},
            { $set: {"voters.$": ""}}
        );
    },
    // Increment the results by one vote - requires document id, and
    // the array slot of the correct answer:
    updateResults: function(docId, questionId) {
        // Check whether the user is allowed to vote:
        var voterExist = Polls.find({voters: this.userId, _id:docId}).count() > 0;
        // Create the update JSON string:
        var resultQuery = 'results.' + questionId;
        // If user is able to vote, increment the correct vote:
        if (voterExist === true) {
            Polls.update(
                {_id: docId}, {
                    $inc: { [resultQuery]: 1 } // Right now, increments just slot 0
                }
            )
        }
    }
});

Polls.attachSchema( PollSchema );
