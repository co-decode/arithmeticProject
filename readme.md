# Arhythmetic

An application for training basic arithmetic skills.

## Technologies used:

- HTML
- Vanilla Javascript
- CSS

Deployed on Github Pages.

## Instructions:

1. Click on settings or press Shift + S then Enter to open up the settings menu
2. Choose the desired settings for your session, multiple operands may be entered if desired.
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

The Abacus image used as the website favicon is used under its Apache free software licence.

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
- _shift + r_ resets the game session, returns the time and answer counts back to zero and hides the pulse animation
- _shift + s_ focuses the settings button
- _shift + o_ opens the options menu
- _shift + m_ opens the memory bar

The game page layout shifts to the left when the memory bar is opened, remaining well positioned no matter the screen size.

### The Memory Bar:
The memory bar features:
- A results region, which records the number of correct answers in the session, the total time of the session in seconds and the average answer speed for the session.
- A memory region, which records and numbers each question that appeared in the session, along with the time it took to answer that question.

Clicking anywhere on the memory bar will collapse it again, or else pressing shift + m will toggle it on and off from the keyboard.

### The Setting Menu
The settings menu features:
- Left and Right range inputs, within which a number will be randomly selected and used as part of the next question.
- An operand selector. Operands are entered as a string. If the string contains multiple valid operands, they will be selected at random for question generation. Multiples of the same operand do not bias the random selection; the operands are chosen with equal chance.
- A time limit, which will automatically close a session when the time runs out.
- A score limit, which will automatically close the session when the designated number of questions have been correctly answered.
- A close button, which can be quickly focused by pressing Shift + S.

For subtraction, negative answers are disabled by default. Therefore, any questions generated that have a negative answer are flipped, ensuring that the answer can only be positive.

For division, the range inputs default to being factors of the leftmost number of the question. The rightmost number, the divisor, is determined by the right range input. The default behaviour can be modified in the options menu.

On activation of the settings menu, a backdrop blur filter is applied and brought forward in order to disabled interactivity with elements on the game page.
When deactivated, the settings menu has its display set to none, so that it does not interfere with the layout and interactivity of the game page.

### The Options Menu
The options menu features:
- An Options title, which also doubles as the close button. Shift + O may also be used to toggle this menu.
- A Themes section, which allows for toggling a decorative background pattern or changing the application's colour scheme. There are 14 themes to choose from!
- An information section, to remind the user of keyboard shortcuts and explain the quirks of the settings for subtraction and division.
- An operations section, for modifying the behaviour of the range inputs for subtraction and division.

The options section disables the background game page on activation, applying a backdrop blur filter, similarly to the settings menu.

Colour schemes choices are saved into the brower's local storage, so that when users close the application and come back later, the website will boot up with their theme preference already loaded up.

There are two alternative division settings available in the operations section:
- Decimal precision, the range inputs no longer ensure integer answers. The ranges are read literally, the left number will be between the left range and alike for the right side. Correct answer inputs are to be rounded to the nearest tenth.
- Double decimal precision, similar to the decimal precision mode, but the required answer is to be rounded ot the nearest hundreth.

The is one alternative subtraction setting available:
- Permit negatives, which prevents the application from flipping questions which would have had negative answers.