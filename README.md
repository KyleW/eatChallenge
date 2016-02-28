#eatChallenge

This is a prototype for the Federal application for free and reduced price meals. It's been created for the E.A.T School Lunch UX Challenge[http://lunchux.devpost.com/]

## What it does

## The Tech Stack
The application is built using the MEAN stack. AngularJS on the front end. Express and NodeJS on the backend with a MongoDb database.

The front end styles reflect many elements of Google's Material Design as implemented in Angular Material[https://material.angularjs.org/latest/]. Angular-Material is used for layouts and input styles.

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for eatChallenge

The project is not open to contributions until after the end of the judging period for the E.A.T. Challenge. However, we encourage reviewers to open issues for future development.

Following the judging period, we welcome contributions. While this is just a prototype, supporting this project provides a stronger base for future projects.

While the content of this form is focussed on the Federal Application for Free and Reduced Price School meals, we would love to see this repurposed for other official forms or genericized into a form system. Use this as a starting point and contribute back your creations.

Contributions to this project must follow John Papa's AngularJs style guide[https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md]. JSCS and JSHint configuration files are including in the base of the project. Please be sure to lint your code before submitting.

Changes to the UI should maintain the apps flat design. Avoid popups, modals, tooltips, etc that break the dimensionality of the application.

##Instructions for Development
After cloning the project to your local environment, follow these steps to get the app running:

1. [Install NodeJS](https://nodejs.org/en/)
2. [Install MongoDb](https://docs.mongodb.org/v3.0/installation/)
3. Run NPM install
    <script>npm install --dev</script>
4. [Install Bower](http://bower.io/#install-bower) and run
    <script>bower install</script>
5. Use Gulp to build your files and start the app 
    The build process is run through Gulp. See the [gulpfile](gulpfile.js) for more details.
    To build the files for the app run
        <script>gulp Build</script>
    To start the server, run
        <script>gulp Start</script>
    Or to build the files, start the server and watch for changes run
        <script>gulp dev</script>

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).