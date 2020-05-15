# CS 52, Lab 5: Platform API
## Samiha Datta, May 2020

## Description
This lab was really interesting! While I was reasonably confused (although not as much as last time) for a while, I learned a lot and I now understand server-side concepts a whole lot better! I went through each part of the lab instructions in order: setting up express, mongo, and mongoose; creating a model; setting up the framework of the controller; routing; testing the routes to make sure it was connected; getting all endpoints working; testing with the client locally; and then transitioning to Heroku and testing with the client that way. I think this process worked well! As always, I think I should have started sooner, but I have a little more time now that I'm using my extension.

## What Worked
I think the process of going through each step methodically and creating structured checklists worked really well. Also, testing at many intervals during the process using curl and, especially, Insomnia meant that the code worked well in individual parts and that I felt more confident about things working together.

## What Didn't Work
I had a fair number of obscure errors due to some very silly mistakes such as passing in res and req from the router, including a backslash at the end of the root url ini my client, and failing to hook things up correctly. However, I think going through each problem, attacking it, and discussing with TAs whenever I was unsure about something worked well.

## Extra Credit (laid out in an *extra easy to find* way)
I changed the format of tags from strings to arrays. I also completed functionality for comments and a basic search! In the future, I'd like to populate this blog a bit more so that there's more for the search to work with; I'd like to make the search more complicated; I'd like to update the frontend so that it's easier to work with these different features and more cohesive; I'd like to incorporate routing into the search; and I'd like to add frontend tag filtering.