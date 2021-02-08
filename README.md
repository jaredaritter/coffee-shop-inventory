# Inventory App - Coffee Shop

- Based on TOP Node Inventory Project with Library Catalog as reference.
- It is a coffee shop inventory tracker currently using Coffee, Origin, and Roast models with CRUD functionality.
- Tools
  - Back end: Node, Express, Mongoose
  - Front end: Pug templates with Bootstrap 5
  - Deploy: Heroku for site and MongoDB Atlas for DB

## Personal thoughts/comments

- My goal was to build as much of the project as possible without referencing the library catalog walk-through. Instead I attempted to use the docs for Express, Pug, and Bootstrap 5 along with normal internet searches to solve problems that arose. I was largely able to accomplish this.
- Difficulties:
  - Syntax: Many of my problems were straight syntax issues dealing with Mongoose, Pug, and Bootstrap 5.
    - Mongoose update and delete functions are called infrequently so the exact names and required parameters don't stick easily. I know where to find them so it's just a matter of looking them up.
    - Pug is syntactically different from JS and HTML so it takes some getting used to. The documentation is also sparse, assumes a large higher base knowledge, and seems to have minimal community support. I enjoy writing it, but I will try out some other template engines and see if they offer improved experiences.
    - Bootstrap 5 is purely a matter of reading the docs for syntax and spending more time working with it. I was not a heavy user of Bootstrap prior to this project and the change to v5 has shifted a good bit of what I did know. I'm enjoying the new changes but still have a lot to learn.
  - Theory: The walk through does a thorough job of explaining what is happening, but does not go into a lot of detail explaining the why of their choices. When combined with some inconsistencies between pages I have had to make some structural choices and go with them without knowing if there is some pitfall I'm missing. On some levels that is frustrating because I want to know the 'right' way of doing a thing, but on the other hand it forces me to dive a little deeper into the topic and make a choice about how to accomplish a task. Sometimes you just have make you best guess and move forward to finish the task.
- Overall I feel this is a valuable project to come back to and flesh out for my portfolio and even personal use tracking my coffees and brews. I definitely need to update the styling to something more personal.

## Things to do moving forward

- Look at references and either make referenced items be deleted prior to deleting main item or look up more elegant ways to remove referenced DB items.
- Restyle page
- Do extra credit adding images
- Do extra extra credit by making users enter secret password to delete items
- Expand page to allow for a brew list tracking daily brews
