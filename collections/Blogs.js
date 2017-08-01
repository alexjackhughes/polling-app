/*
 * Collections are where you create the data of the application,
 * as well as add permissions and Schemas:
 */

// Initialisation of Collection of Mongo documents:
Blogs = new Mongo.Collection('blogs');

// OnGoWorks handles security/permissions without Insecure package:
Blogs.permit(['insert', 'update', 'remove']).ifLoggedIn();

// Permission rules the Collection has to follow:
Blogs.allow({
    // If signed in, you're allowed to post recipe:
    insert: function(userId, doc) {
        return !!userId;
    },
    // If signed in, Allows you to update recipe:
    update: function(userId, doc) {
        return !!userId;
    }
});

// Schemas allow Documents to be structured:
BlogSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    description: {
        type: String,
        label: "Description"
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
    },
    inMenu: {
        type: Boolean,
        defaultValue: false, // should be auto value right?
        autoform: {
            type: "hidden"
        }
    }
});

// Meteor methods that manipulate the Documents in some manner:
Meteor.methods({
    deleteBlog: function(id) {
        Blogs.remove(id);
    }
});

// Attaches Schema to the Document:
Blogs.attachSchema( BlogSchema );
