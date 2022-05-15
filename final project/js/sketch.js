
let rain = [];
let clouds = [];
let bgColor, rainColor, lightningColor;
let numDrops, actionFrame, phaseNum, numClouds;
let lightningState, x, y;
let programState = 'waiting';
let rainSound, thunder, bgSequence, synth; 
let bgMelody1 = ["C2", "C3", "A2", "G2","C2", "C3", "A2", ["G2", "A2"]];
let vol = new Tone.Volume(-24).toDestination();
let delay = new Tone.Delay(0.2).toDestination();

function setup() {
    createCanvas(800, 600);
    x = 800;
    y = 600;

    rainSound = new Tone.Player("rain.wav").toDestination();
    thunder = new Tone.MembraneSynth().connect(delay).toDestination();

    synth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: .01,
            decay: .5,
            sustain: 1,
            release: 5
        }
    }).connect(vol).toDestination();

    bgSequence = new Tone.Sequence(function(time, note){
        synth.triggerAttackRelease(note, .5);
    }, bgMelody1, '4n');

    Tone.Transport.bpm.value = 40;
    Tone.Transport.start();
   
    bgColor = color(12, 24, 48, 255);
    rainColor = color(60, 100, 170, 255);
    lightningColor = color(255, 255, 255, 0);

    numDrops = x / 2;
    for (var i = 0; i < numDrops; i++) {
        rain[i] = new Raindrop();
    }

    numClouds = 20;
    for (var i = 0; i < numClouds; i++) {
        clouds[i] = new Clouds();
    }

    actionFrame = -1;
    phaseNum = 0;
    lightningState = 'inactive';

    bgMusic();
}

function bgMusic(){
    bgSequence.start();
}

function mousePressed() {
    if (programState === 'waiting') {
        programState = 'raining';
        rainSound.start();
    } else if (programState === 'raining') {
        programState = 'paused';
        rainSound.stop();
    } else if (programState === 'paused') {
        programState = 'raining';
        rainSound.start();
    }
}

function draw() {
    background(bgColor);

    if (programState === 'waiting') {
        textAlign(CENTER);
        fill(rainColor);
        textFont("Sans");
        textSize(20);
        text('press any key for lightning and thunder', x / 2, (y / 2) - 48);
        text('click anywhere to start the rain', x / 2, (y / 2));
    }

    if (programState === 'raining') {
        for (var i = 0; i < numDrops; i++) {
            rain[i].displayPath();
            rain[i].displayColor();
        }
    }

    fill(lightningColor);
    rect(0, 0, x, y);

    if (frameCount === actionFrame) {
        if (phaseNum == 1) {
            actionFrame = -1;
            secondPhase();
        } else if (phaseNum == 2) {
            actionFrame = -1;
            thirdPhase();
        } else if (phaseNum == 3) {
            actionFrame = -1;
            lightningOff();
        }
    }

    for (var i = 0; i < numClouds; i++) {
        clouds[i].cloudMovement();
        clouds[i].cloudColor();
    }
}

function keyPressed() {
    if (lightningState === 'inactive') {
        lightningState = 'active';            
        lightningOn();
    }
    
    thunder.triggerAttackRelease('C1', 1);
}


function lightningOn() {
    console.log('Lightning On');
    firstPhase();
}

function firstPhase() {
    lightningColor = color(255, 255, 255, 60);
    phaseNum++
    console.log('1st Phase Num: ', phaseNum);
    
    frameCount = 0;
    actionFrame = frameCount + 10;
}

function secondPhase() {
    lightningColor = color(255, 255, 255, 10);
    phaseNum++;
    console.log('2nd Phase Num: ', phaseNum);

    frameCount = 0;
    actionFrame = frameCount + 5;
}

function thirdPhase() {
    lightningColor = color(255, 255, 255, 50);
    phaseNum++;
    console.log('3rd Phase Num: ', phaseNum);

    frameCount = 0;
    actionFrame = frameCount + 6;
}

function lightningOff() {
    console.log('Sequence Done');
    lightningState = 'inactive';

    phaseNum = 0;
    lightningColor = color(255, 255, 255, 0);
}

class Raindrop {
    constructor() {
        this.x = 800;
        this.y = 600;
        this.posX = random(this.x);
        this.posY = random(-this.y, -50);
        this.num = random(0, 10);
        this.s = 4;
        this.speed = map(this.num, 0, 10, this.s, this.s + 10);
        this.dropletHeight = map(this.num, 0, 10, 8, 12);
    }

    displayPath() {
        this.posY = this.posY + this.speed;
        if (this.posY > this.y) {
            this.posY = random(-this.y, -50);
        }
    }

    displayColor() {
        stroke(rainColor);
        line(this.posX, this.posY, this.posX, this.posY + this.dropletHeight);
    }
}

class Clouds {
    constructor() {
        this.x = 800;
        this.y = 600;
        this.cloudX = random(this.x);
        this.cloudY = 0;
        this.cloudSpeed = random(1, 3);
        this.n = 100;
        this.cloudHeight = random(100);  
    }

    cloudMovement() {
        this.cloudX = this.cloudX + this.cloudSpeed;
        
        if (this.cloudX > this.x + 200) {
            this.cloudX = -200;
        }
    }

    cloudColor() {
        noStroke();
        fill(color(this.n, this.n, this.n, 200));
        ellipse(this.cloudX, this.cloudY, 400, 100 + this.cloudHeight);
    }
}