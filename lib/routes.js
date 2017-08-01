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
        BlazeLayout.render("Layout", {main: "Home"});
    }
});

// Blog:
FlowRouter.route('/blog', {
    name: 'blog',
    action() {
        BlazeLayout.render('Layout', {main: 'BlogPage'});
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
