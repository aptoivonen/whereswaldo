# Where's Waldo

[_Where's Waldo_](https://whereswaldo-dev.web.app/) is a browser game to find characters in a busy image. Players can also record their results on the scoreboard.

## Gameplay

Players can select a level to play from the homepage. In the game player aught to find the character(s) as quickly as possible.
The picture can be dragged around and zoom in and out. Right-clicking pops up a menu to select character from.
After success, a screen appears, asking for the player to enter his/her name for the scoreboard. The game then takes the player
to the scoreboard page. Go back to the homepage to try another level!

<br />
<p align="center">
    <img src="./readme_img/waldohome.png" alt="Where's Waldo home page" width="700">
    <br />
    <em>Where's Waldo home page, where players can pick a game to play.</em>
</p>

<br />
<br />
<p align="center">
    <img src="./readme_img/waldogame.png" alt="Where's Waldo game page" width="700">
    <br />
    <em>After picking a game to play, a picture containing characters is shown and the game timer starts.</em>
</p>
<br />

## Technologies used

The game was realized with React, using Firebase as backend for game images, data and player scores.

Here's a list of technologies used:

- Vite
- React
- Typescript
- Eslint+prettier
- Tailwind
- Firebase hosting/storage/firestore
- Tanstack Query
- React Router
- Zod
- React testing library for unit/integration tests
- Cypress for e2e tests
- Axe for accessibility tests
- Firebase emulator for testing and development

## Live Game

The game is [hosted live at Firebase](https://whereswaldo-dev.web.app/).
