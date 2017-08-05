/*
 * Routes are the different URLs of your application
 */

// Home:
FlowRouter.route('/', {
    name: 'home',
    action() {
        // Automatically redirects when user is logged in
        // if(Meteor.userId()) {
        //     FlowRouter.go('blog');
        // }
        // Otherwise, renders home:
        BlazeLayout.render("Layout", {main: "Dashboard"});
    }
});


// Dashboard:
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Layout', {main: 'Dashboard'});
        } else {
            FlowRouter.go('home');
        }
    }
});

// Tally:
FlowRouter.route('/results', {
    name: 'tally',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Layout', {main: 'Tally'});
        } else {
            FlowRouter.go('home');
        }
    }
});

// Vote:
FlowRouter.route('/vote', {
    name: 'vote',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Layout', {main: 'Vote'});
        } else {
            FlowRouter.go('home');
        }
    }
});

// Create new election:
FlowRouter.route('/create', {
    name: 'create',
    action() {
        if(Meteor.userId()) {
            BlazeLayout.render('Layout', {main: 'Create'});
        } else {
            FlowRouter.go('home');
        }
    }
});

// Renders Sign-in form:
FlowRouter.route('/sign', {
    name: 'sign',
    action() {
        BlazeLayout.render("Layout", {main: "login"});
    }
});

// Not found pages will render 'home':
FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    action: function() {
        BlazeLayout.render("Layout", {main: "Home"});
    }
};
