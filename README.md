## Thunderstorm

This is my final project for PDM 2022. It includes the implementation of p5.js, tone.js, and physical computing via the Arduino Uno

### Graphics using p5.js
#### Rain
Used an array of blue lines with varying size and speed to make animation more realistic
User can toggle rain on/off with the click of a mouse
When the rain is running a sample is triggered
#### Clouds
Used an array of semi-transparent varying grey ellipses
Ellipses move at varying rates to show the atmospheric turmoil of a storm
#### Lightning
The event of lightning, triggered by any key, fills the screen with a breif semi-transparent white flash
Each flash occurs twice and triggers a sound event

### Sound using tone.js
#### Rain Sample
Used a sample of rainfall which plays while the user has the program raining
#### Background Music
Used a sequence of notes in a synthesizer to loop while program is running
#### Thunder
Used a membrane synth to trigger a drum like sound when lightning is triggered

### Physical Computing
#### Button
Employed a digital signal to change the color of the background to a random color each time the user presses the button
#### LED
Used a digital signal to flash the LEDs in accordance with each lightning event

## Errors
Could not figure out how to connect my arduino signal to the p5
