# Project 1: JavaScript Game

### Timeframe
**7 days**  
(🎶 "Met this game on Monday..." 🎶)  


![Craig David](https://media.giphy.com/media/26tP33uIVH302aACI/giphy.gif)

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* git

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview

![Gameplay](https://user-images.githubusercontent.com/43697154/55618274-04dbd880-578e-11e9-98dc-81cce649bb78.gif)

_Link to live site_
https://h-raymond.github.io/sei-project-01/

### Introduction
A Bauhaus inspired version of Space Invaders. Currently just a single level, but with more to come!

### Controls
_User controls_
* Spacebar = Shoot
* :arrow_left: & :arrow_right: = Move

### Game Instructions
1. Click on the **Play** button
2. Kill all triangles by shooting them using Spacebar
3. You have only 3 lives, so try avoiding the bombs being dropped

## Process

**Planning**  
As with all projects, I started with a combination of using pseudocode and separating at a high level what would be delivered in Javascript, CSS and HTML. I also used Figma to draw out a rough design of what I wanted the end result to look like to help with the CSS styling later on. I used Trello to define features that could then be built, and to monitor progress and bugs.

**Coding**  
I started with building out a basic HTML structure with the principle sections of the page — `<header>` & `<main>` — and then decided that the grid needed to be created by populating divs using JS. This then required the use of Flexbox in CSS to organise them so that they run horizontally and vertically within a restricted width and to make them uniform.

I then spent most of the first day trying to get the "aliens" (i.e. triangles) to move across the page, which was done successfully. However, in order for them to not just run in a single direction and outside the frame I had write in some logic to set boundaries and then create am array that was used to define the movement.

Getting the "player" to move was by comparison a far easier task, as it only required keycodes and switch statements.

It was then a matter of wrapping some of the if statements into functions over the following days and having scores register.

**What I'd do differently next time**  
The starting approach I don't think would differ, but I think I need to focus more on getting the JavaScript working and the functions broken down into smaller steps.

### Challenges

* Getting the aliens to die at the points of intersection
* Being able to have the `<img>` tags disappear when a life was lost.
* Ensuring that the functions weren't trying to `.classList.remove` on bombs that were no longer in the grid; a lot of very complex if statements the first time around.


### Wins

* I'm proud of the refactoring and making the functions more concise.
* Working properly with `setInterval()` for the first time

## Future features

* I'd love to create a series of levels which can increase difficulty or number of aliens.
* I would also like to improve on the UI for it.
