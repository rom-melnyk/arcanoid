# The Arcanoid game
This repository contains the Arcanoid game code made according lessons in my [blog](https://codedoc255.wordpress.com/).

# Lessons and branching
Branch naming:
- **dev/&#42;** are development mirrors; each new feature is developed here.  
   After the feature is done/ready, this branch is merged into...
- **lesson/&#42;**. These branches are dedicated to ready lessons.  
   Merging these branches one by one into **master** implements features into...
- **master**. This is ready prototype; you can run it.

# Technologies used
HTML, CSS, JS. No frameworks!  
   **Basic understanding** of technologies required.

# Run and learn
### What you need:
- NodeJS.
- A good editor, for instance, [Sublime](http://www.sublimetext.com/3).

### Develop and run
- `npm install -g instant-server` &mdash; this installs the _instant-server_.  
   The server allows you to assess the content of any local folder like the internet page.  
   Once you change any file, the server updates the page _automatically._
- Run `instant 8080` in the project folder.
- Open the `http://localhost:8080/index.html` in the browser.
