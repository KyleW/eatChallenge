#eatChallenge

This is a prototype application for Free and Reduced Price School Meals. It was created for the [E.A.T School Lunch UX Challenge](http://lunchux.devpost.com/) by [Kyle Warneck](https://www.linkedin.com/in/kylewarneck) and [Anne Paprocki](https://www.linkedin.com/in/anne-paprocki-b88aa04). It is designed to improve the user experience, efficiency, and accuracy of the national Free and Reduced Price School Meals program application. 

You can see the project live at [https://eatchallenge-kylew.rhcloud.com/](https://eatchallenge-kylew.rhcloud.com/).

You can see a demo [here](https://youtu.be/JjCr2IgMPFs).

##Our User Stories 

Our prototype application takes a user-centered approach. Rather than starting with the needs of the United States Department of Agriculture, we focused on three user personas that emerged from user testing and conversations with potential users: 

* **Speedy Sam**  is well prepared to enter his information, but tends to rush through online forms. The application is designed both to meet Speedy Sam’s  desire for an efficient form, while also including some checks that slow him down enough to take a second look. This will help improve accuracy. For example, we include summary pages after every major section (number of household members, income, signature) that allow Speedy Sam to look over his entries and ensure that everything is correct. He is then given the opportunity to fix any errors. The income section of the application is the most error-prone, so we also prevent Speedy Sam from rushing through it, only entering the first thing that comes to mind. We do this by listing all possible income sources (from strike benefits to alimony) in a simple format. These will jog Speedy Sam’s memory and ensure he includes everything. 

   When it doesn’t threaten accuracy, we allow Speedy Sam to move quickly. We only ask questions that apply to his unique situation (for example, categorically qualified households skip the income section) so that he does not waste his time on those that are not relevant to his family’s eligibility. In addition, rather than having tooltips (which necessitate clicking for more information, thus disrupting Speedy Sam’s flow), we provide the same clarifying  information in annotations on the right side of the screen. These annotations are easy to see when you need them without requiring any extra steps, scrolling, or clicks.

* **Nervous Ned** wants to help his family, but is uneasy with government forms, perhaps because of literacy or language challenges, legal issues, or immigration status. To make him feel more welcome, the form uses a warm and friendly tone and cheerful images. It includes phrases like “let’s get started” and “why not give it a try?” that are more associated with a friend than a government form. We also provide annotations for many of the more complicated questions, with examples and normalizing language to make him feel more comfortable. For example, we provide information about reporting both court ordered and more informal child support payments and imply that both are equally valid forms of income. We also add validations so that Nervous Ned can feel confident that he has not missed anything important.

* **Missing Maggie** is excited to complete the form, but does not have all the information or time needed to complete it when she begins. For example, she may not know her household’s SNAP case number or an income amount offhand. Or she may start the form, then run out of time. For this user, we created the ability to save your work and come back later. The option to create an account is presented subtly for users like Missing Maggie, but does not get in the way of users who can complete the form in one go. Because Missing Maggie will likely know how to fill out some fields from the very beginning of her experience, we also allow her to move through the form freely without filling it in completely. The confirmation pages provide a mental map of the form so Missing Maggie can move back and forth without getting lost. This enables her to see what information she still needs to collect and gives her the chance to answer what she already knows. When she returns, Missing Maggie will not have to start from scratch. 

Overall, while we designed for all three user personas, we kept the application as simple and clean as possible. The additional features mentioned above are available for those who need them, but do not slow down the overall flow of the application for those that do not. 
When working through the process, we were surprised to discover how varied the experience of filling out this form could be. For some users, there are relatively few questions to answer, or they may be comfortable filling out this type of form. For others, such as those with many people in the household or varied income sources, the form can be quite long and complex. We wanted to design an experience to meet the needs of users wherever they fell on this spectrum. Ideally, by making the form both easier to fill out and more accurate, this application will serve the needs of the whole community.

## What's next for eatChallenge

The project is not open to contributions until after the end of the judging period for the E.A.T. Challenge. However, we encourage reviewers to open issues for future development.

Following the judging period, we welcome contributions. While this is just a prototype, supporting this project provides a stronger base for future projects.

The content of this particular form is focussed on the Federal Application for Free and Reduced Price School Meals, but we would love to see this work repurposed for other official forms or genericized into a form system. Use this as a starting point and contribute back your creations.

Contributions to this project must follow John Papa's [AngularJs Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md). JSCS and JSHint configuration files are including in the base of the project. Please be sure to lint your code before submitting. Changes to the UI should maintain the apps flat design. Avoid popups, modals, tooltips, etc. that break the dimensionality of the application.

## User Testing

To inform our process, we conducted user testing on an early version of the prototype application. We collected feedback with a [Google Form](http://goo.gl/forms/b3aB1mFXaN). Ultimately, we received 11 user test forms and modified our prototype application based on their suggestions. 

## The Tech Stack
The application was built using the MEAN stack. AngularJS on the front end. Express and NodeJS on the backend with a MongoDb database.

The front end styles reflect many elements of Google's Material Design as implemented in [Angular Material](https://material.angularjs.org/latest/). Angular-Material is used for layouts and input styles.

##Instructions for Development
After cloning the project to your local environment, follow these steps to get the app running:

1. [Install NodeJS](https://nodejs.org/en/)
2. [Install MongoDb](https://docs.mongodb.org/v3.0/installation/)
3. Run NPM install
    `npm install --dev`
4. [Install Bower](http://bower.io/#install-bower) and run
    `bower install`
5. Use Gulp to build your files and start the app 
    The build process is run through Gulp. See the [gulpfile](gulpfile.js) for more details.
    To build the files for the app run
        `gulp Build`
    To start the server, run
        `gulp Start`
    Or to build the files, start the server and watch for changes run
        `gulp dev`

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).