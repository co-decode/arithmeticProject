# Arhythmetic

An application for training basic arithmetic skills.

## Technologies used:

- HTML
- Vanilla Javascript
- CSS

Deployed on Github Pages.

## Instructions:


1. Click on settings or press Shift + S then Enter to open up the settings menu
2. Choose the desired settings for your session
3. Close the settings menu and click the answer input, or hit Shift + R
4. Answer the question displayed, the session begins on your first key stroke!
5. If you did not set a time or score limit, press Shift + R to reset your session, and cache the results of the previous session.

To view the results of your session, press Shift + M to display the Memory bar, or else click the right side of the page.
The Memory Bar's tab will change colour when you hover over it.

If you wish to change the colour theme of the website, to view information about the website or to change some of the operand settings, press Shift + O to open the options menu, or else click the Arythmetic text logo.

Close the options page by pressing Shift + O again, or by clicking on the options title text.

## Components and Features:
_Arhythmetic_ features four major components:
- The Game page
- The Memory bar
- The Settings Menu
- The Options Menu

### The Game Page:
The game page features:
- An Arhythmetic logo which doubles as the options page button
- A question display and answer input
- A timer which only begins when the first keystroke is made within the answer input
- A pulse animation, which is calibrated to pulse approximately once every second, measured using the more accurate performance.now() function
- A settings button which opens up the settings page
- A correct answer counter
- A tab on the right side of the screen which, when clicked, opens the memory bar.

The game page is responsive, in that the layout scales as a percentage of the screen width.
 
There are various **event listeners** set up which provide keyboard shortcuts to navigate the site:
- shift + r resets the game session, returns the time and answer counts back to zero and hides the pulse animation
- shift + s focuses the settings button
- shift + o opens the options menu
- shift + m opens the memory bar

The game page layout shifts to the left when the memory bar is opened, remaining well positioned no matter the screen size.

### The Memory Bar:
The memory bar features:
- A results regions, which records the number of correct answers in the session, the total time of the session in seconds and the average answer speed for the session.
- A memory region, which records and numbers each question that appeared in the session, along with the time it took to answer that question.

Click anywhere on the memory bar will collapse it again, or else press shift + m to toggle it from the keyboard.

### The Setting Menu
The settings menu features:
