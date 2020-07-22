// Copyright © 2020 mja9

/**
 * A class representing buttons and their behaviour 
 * for game menu.
 */
class Button {

    constructor(xPos, yPos, width, height, clickAction) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.onClick = clickAction;
    }

    paint(image) {
        CONTEXT.drawImage(document.getElementById(image), this.x - this.w / 2, this.y - this.h / 2);
    }

}

class LimbPosition {

    constructor(xPos, yPos) {
        this.w = 124;
        this.h = 80;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.salt = new SaltIcon(this.x + this.w / 2 - 22, this.y + this.h / 2 - 24);
        this.water = new WaterIcon(this.x - this.w / 2 + 20, this.y + this.h / 2 - 26);
    }   

    paint() {

        // Draw rectangular positions.
        CONTEXT.fillStyle = "#ffc730";
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        CONTEXT.strokeStyle = "#252525";
        CONTEXT.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Draw numerical representation of concentration.

        // Draw water/salt icons.
        this.salt.paint();
        this.water.paint();

    }

}

class InterPosition {

    constructor(xPos, yPos) {
        this.w = 324;
        this.h = 80;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
    }   

    paint() {
        CONTEXT.fillStyle = "#ffc730";
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class WaterIcon {

    constructor(xPos, yPos) {

        this.x = xPos;
        this.y = yPos;
        this.w = 26;
        this.h = 38;

    }

    paint() {
        CONTEXT.drawImage(document.getElementById("water-icon"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class SaltIcon {

    constructor(xPos, yPos) {

        this.x = xPos;
        this.y = yPos;
        this.w = 30;
        this.h = 34;

    }

    paint() {
        CONTEXT.drawImage(document.getElementById("salt-icon"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

// Global constants.
var CANVAS = document.getElementById("game-canvas");
var CONTEXT = CANVAS.getContext("2d");
var LOOP_OF_HENLE = {
    x: CANVAS.clientWidth / 2,
    y: CANVAS.clientHeight / 2,
    w: 650,
    h: 700,
    paint: function() {
                CONTEXT.drawImage(document.getElementById("loop-of-henle"), this.x - this.w / 2, this.y - this.h / 2);
           }
};

var D_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 13, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 13, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 13, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 199),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 13, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 292),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 13, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 385),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 13, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 478)
             ];

var A_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 513, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 513, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106),        
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 513, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 199),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 513, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 292),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 513, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 385),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 513, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 478)
             ];

var INTER_FLUID = [
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 199),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 292),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 385),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 478)
                  ];

var CLICKABLE = [];
var DRAGGABLE = [];

/**
 * Initialize game board and start title screen for the game.
 */
function initTitleScreen() {

    // Set the background.
    CONTEXT.fillStyle = "darkolivegreen";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Set the game title.
    CONTEXT.fillStyle = "gold";
    CONTEXT.font = "100px Sylfaen";
    CONTEXT.textAlign = "center";
    CONTEXT.fillText("Countercurrent Multiplication", CANVAS.clientWidth / 2, CANVAS.clientHeight / 4);

    // Create the title screen buttons.
    var startButton = new Button(CANVAS.clientWidth / 2, (CANVAS.clientHeight / 2 + 3 * CANVAS.clientHeight / 4) / 2, 400, 100, 
                                    function() {
                                        console.log("Clicked start button!");

                                        // Lock user out of trigerring another click event.
                                        CLICKABLE = [];

                                        // Clear the canvas
                                        CONTEXT.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
                                        initGameBoard();
                                    });

    // Paint the buttons on the canvas.
    startButton.paint("start-button");

    // Regiter the button as clickable items on the GUI.
    CLICKABLE = [startButton];
        initClickHandler();
}

/*
* Initialize the click handler.
*/
function initClickHandler() {

    // Clickable event handling.
    CANVAS.addEventListener("click", function(event) {

        // Get click location relative to canvas.
        var xPos = event.offsetX;
        var yPos = event.offsetY;

        // Check each clickable item.
        for (i = 0; i < CLICKABLE.length; i++) {

            thisClickable = CLICKABLE[i];

            // Check if click lies within the x bounds of this clickable item.
            if (xPos >= thisClickable.x - thisClickable.w / 2 && xPos <= thisClickable.x + thisClickable.w / 2) {

                // Check if click lies within y bounds of the clickable item.
                if (yPos >= thisClickable.y - thisClickable.h / 2 && yPos <= thisClickable.y + thisClickable.h / 2) {
                    thisClickable.onClick();
                }

            }
        }
    });

    // Draggable event handling.
    CANVAS.addEventListener("mousedown", function(event) {

        // Get click location relative to canvas.
        var xPos = event.offsetX;
        var yPos = event.offsetY;

        // Check each draggable item.
        for (i = 0; i < DRAGGABLE.length; i++) {

            // This draggable item.
            draggable = DRAGGABLE[i];

            // Check if mousedown on a draggable item.
            if (xPos >= draggable.x - draggable.w / 2 && xPos <= draggable.x + draggable.w / 2) {

                // Check y-position.
                if (yPos >= draggable.y - draggable.h / 2 && yPos <= draggable.y + draggable.h / 2) {

                    addDragHandler(draggable, draggable.x - xPos, draggable.y - yPos);

                }

            }

        }
    });
}

function addDragHandler(draggable, dragOffsetX, dragOffsetY) {

    // Create interval for painting the box moving.
    var animateInterval = window.setInterval(function() {
                            repaintGameBoard();
                            draggable.paint();
                            }, 
                            50);

    var drag = function() {

        // Get event location.
       xPos = event.offsetX;
       yPos = event.offsetY;

       // Change location of draggable item.
       draggable.x = xPos + dragOffsetX;
       draggable.y = yPos + dragOffsetY;

   };

   var drop = function() {

    window.clearInterval(animateInterval);
    repaintGameBoard();
    draggable.paint();
    removeDragHandler(draggable, drag, drop);
    
    };


    // Add dragging event.
    CANVAS.addEventListener("mousemove", drag);

    // Add drop event.
    CANVAS.addEventListener("mouseup", drop);

}

function removeDragHandler(draggable, drag, drop) {
    
    // Remove dragging event.
    CANVAS.removeEventListener("mousemove", drag);

    // Remove drop event.
    CANVAS.removeEventListener("mouseup", drop);

}

function initGameBoard() {

    // Set new background color (must be behind other elements).
    CONTEXT.fillStyle = "#fdc689";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Draw the loop.
    drawLoopOfHenle();

    // Initialize the limbs.
    initDescendingLimb();
    initAscendingLimb();

    // Initialize the interstitial fluid.
    initInterstitialFluid()
}

function drawLoopOfHenle() {
    LOOP_OF_HENLE.paint();
}

function initDescendingLimb() {

    D_LIMB.forEach(pos => {
        DRAGGABLE.push(pos.salt);
        DRAGGABLE.push(pos.water);
    });
    drawDescendingLimb();

}

function drawDescendingLimb() {

    D_LIMB.forEach(pos => {
        pos.paint();
    });

}

function initAscendingLimb() {

    A_LIMB.forEach(pos => {
        DRAGGABLE.push(pos.salt);
        DRAGGABLE.push(pos.water);
    });
    drawAscendingLimb();

}

function drawAscendingLimb() {

    A_LIMB.forEach(pos => {
        pos.paint();
    });

}

function initInterstitialFluid() {

    drawInterstitialFluid();

}

function drawInterstitialFluid() {

    INTER_FLUID.forEach(pos => {
        pos.paint();
    });

}

function repaintGameBoard() {

    // Clear the canvas.
    CONTEXT.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Set new background color (must be behind other elements).
    CONTEXT.fillStyle = "#fdc689";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Draw the loop.
    drawLoopOfHenle();

    // Draw descending limb.
    drawDescendingLimb();

    // // Draw ascending limb.
    drawAscendingLimb();

    // // Draw interstitial fluid.
    drawInterstitialFluid();

}
