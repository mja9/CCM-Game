// Copyright © 2020 mja9

/**
 * A class representing buttons and their behaviour 
 * for game menu.
 */
class Button {

    constructor(xPos, yPos, width, height, clickAction, image) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.onClick = clickAction;
        this.image = image
    }

    paint() {
        CONTEXT.drawImage(document.getElementById(this.image), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class PopUp {

    constructor(xPos, yPos, width, height, message, closeAction) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.m = message;

        if (closeAction != undefined) {
            this.onClose = closeAction;
            this.closeButton = new Button(this.x + this.w / 2 - 13, this.y - this.h / 2 + 13, 15, 15, this.onClose, "close-button");
            CLICKABLE.push(this.closeButton);
        }
    }

    paint() {

        // Paint body.
        CONTEXT.globalAlpha = 1.0;
        CONTEXT.fillStyle = "coral";
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Display message.
        CONTEXT.fillStyle = "black";
        CONTEXT.font = "20px Arial";
        CONTEXT.textAlign = "center";
        var txtHeight = this.y - this.h / 2 + 40;

        for (i = 0; i < this.m.length; i++) {
            CONTEXT.fillText(this.m[i], this.x, txtHeight, this.w);
            txtHeight += 40;
        }

        // Paint close button if one exists.
        if (this.closeButton != undefined) {
            this.closeButton.paint();
        }

    }

}

class LimbPosition {

    // static colorGrad = new Map([
    //     [0, "#ffe7c7"],
    //     [300, "#ffbe4d"],
    //     [600, "#ffab04"],
    //     [900, "#ff8316"],
    //     [1200, "#ff5f33"],
    //     [1500, "#ff413b"]
    // ]);

    static colorGrad = ["#ffe7c7", "#ffbe4d", "#ffab04", "#ff8316", "#ff5f33", "#ff413b"];

    constructor(xPos, yPos) {
        this.w = 147;
        this.h = 90;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.salt = new SaltIcon(this.x + this.w / 2 - 7, this.y + this.h / 2 - 7, this);
        this.water = new WaterIcon(this.x - this.w / 2 + 7, this.y + this.h / 2 - 7, this);
        this.c = 300;
        this.isSelected = false;
    }   

    paint() {
        // Draw rectangular positions.
        this.colorFillMechanic();

        // Draw highlight around limb position.
        CONTEXT.lineWidth = 3;
        if (this.isSelected) {
            CONTEXT.strokeStyle = "yellow";
        } else {
            CONTEXT.strokeStyle = "#252525";
        }
        CONTEXT.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "30px Trebuchet MS";
        CONTEXT.textAlign = "center";
        CONTEXT.fillText(this.c.toString(), this.x - this.w / 2 + 58, this.y);

        // Draw water/salt icons.
        this.salt.paint();
        this.water.paint();
    }

    colorFillMechanic() {

        // Color change when concentration < 300 or > 1500.
        if (this.c < 300 | this.c >= 1500) {
            CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
            CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Handle color change when concentration > 300 and < 1500.
        } else {

            switch((this.c / 300.0 % 1).toFixed(2)) {

                case (350.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (this.h / 6));
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (5 * this.h / 6), this.w, this.h / 6);
                    break;

                case (400.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (2 * this.h / 6));
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (2 * this.h / 6)), this.w, 2 * this.h / 6);
                    break;

                case (450.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (3 * this.h / 6));
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (3 * this.h / 6)), this.w, 3 * this.h / 6);
                    break;

                case (500.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (4 * this.h / 6));
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (4 * this.h / 6)), this.w, 4 * this.h / 6);
                    break;

                case (550.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (5 * this.h / 6));
                    CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (5 * this.h / 6)), this.w, 5 * this.h / 6);
                    break;

                case (600.0 / 300.0 % 1).toFixed(2): 
                    CONTEXT.fillStyle = LimbPosition.colorGrad[this.c / 300];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
                    break;

            }

        }

    }

}

class InterPosition {

    constructor(xPos, yPos) {
        this.w = 323;
        this.h = 85;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.c = 300;
    }   

    paint() {
        // Draw rectangular positions.
        CONTEXT.fillStyle = "#ffc730";
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "40px Trebuchet MS";
        CONTEXT.textAlign = "center";
        CONTEXT.fillText(this.c.toString(), this.x, this.y + 11);
    }

    increaseConcentration() {

    }

}

class WaterIcon {

    constructor(xPos, yPos, limbPos) {
        this.id = "water";
        this.w = 26;
        this.h = 38;
        this.startX = xPos + this.w / 2;
        this.startY = yPos - this.h / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.limbPos = limbPos;
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("water-icon"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class SaltIcon {

    constructor(xPos, yPos, limbPos) {
        this.id = "salt";
        this.w = 30;
        this.h = 34;
        this.startX = xPos - this.w / 2;
        this.startY = yPos - this.h / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.limbPos = limbPos;
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
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463)
             ];

var A_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103),        
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463)
             ];

var INTER_FLUID = [
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 16),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 196),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 286),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 376),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 466)
                  ];

var CLICKABLE = [];
var MOVEABLE = [];
var DROPPABLE = [];
var STATE_BUTTONS = [];
var PASSIVE_POP_UPS = [];

var inTutorial = false;

// ---------------------------------------------- Methods for the game title scene. ---------------------------------

/**
 * Initialize game board and start title screen for the game.
 */
function initTitleScreen() {

    // Draw title screen.
    paintTitleScreen();

    // Create the title screen buttons.
    var startButton = new Button(CANVAS.clientWidth / 2, (CANVAS.clientHeight / 2 + 3 * CANVAS.clientHeight / 4) / 2, 400, 100, 
                                    function() {
                                        console.log("Clicked start button!");

                                        // Lock user out of trigerring another click event.
                                        CLICKABLE = [];

                                        // Clear the canvas
                                        CONTEXT.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
                                        initGameTutorial();
                                    }, "start-button");

    // Paint the buttons on the canvas.
    startButton.paint();

    // Regiter the button as clickable items on the GUI.
    CLICKABLE = [startButton];
    addClickHandler();
}

function paintTitleScreen() {

    // Set the background.
    CONTEXT.fillStyle = "cornsilk";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Set the game title.
    CONTEXT.fillStyle = "darkslateblue";
    CONTEXT.font = "100px Sylfaen";
    CONTEXT.textAlign = "center";
    CONTEXT.fillText("Countercurrent Multiplication", CANVAS.clientWidth / 2, CANVAS.clientHeight / 4);

}

// ---------------------------------------------- Methods for handling user triggered events. ---------------------------------

/*
* Initialize the click handler.
*/
function addClickHandler() {

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
   
}

/**
 * This function defines the event handler for moveable objects 
 * during the tutorial and regular play for the game. 
 * This handler places no restrictions on the limb position from 
 * which a player can trigger drag and drop events when inTutotial
 * is true. 
 * @param {*} event A mousedown event on the CANVAS used to decide whether a 
 *                  player is attempting to drag a moveable item.
 */
function moveableHandler(event) {

    // Get click location relative to canvas.
    var xPos = event.offsetX;
    var yPos = event.offsetY;

    // Check each moveable item.
    for (i = 0; i < MOVEABLE.length; i++) {

        // This moveable item.
        moveable = MOVEABLE[i];

        // Check if mousedown on a moveable item.
        if (xPos >= moveable.x - moveable.w / 2 && xPos <= moveable.x + moveable.w / 2) {

            // Check y-position.
            if (yPos >= moveable.y - moveable.h / 2 && yPos <= moveable.y + moveable.h / 2) {

                if (inTutorial) {   // Moveable handler for tutorial only.

                    // Highlight selected limb position.
                    moveable.limbPos.isSelected = true;

                    // Removing salt from system reduces concentration.
                    if (moveable.id == "salt") {
                        moveable.limbPos.c -= 50;

                    // Remove water from system increases concentration.
                    } else {
                        moveable.limbPos.c += 50;
                    }
                    addDragNDropHandler(moveable, moveable.x - xPos, moveable.y - yPos);

                } else if (moveable.limbPos.isSelected) {   // Moveable handler for regular gameplay.

                    // Removing salt from system reduces concentration.
                    if (moveable.id == "salt") {
                        moveable.limbPos.c -= 50;

                    // Remove water from system increases concentration.
                    } else {
                        moveable.limbPos.c += 50;
                    }
                    addDragNDropHandler(moveable, moveable.x - xPos, moveable.y - yPos);
                    
                }

            }

        }

    }
}

function addMoveableHandler() {

    // Moveable event handling.
    CANVAS.addEventListener("mousedown", moveableHandler);

}

function removeMoveableHandler() {
    CANVAS.removeEventListener("mousedown", moveableHandler);
}

function addDragNDropHandler(moveable, dragOffsetX, dragOffsetY) {

    // Create interval for painting the box moving.
    var animateInterval = window.setInterval(function() {
                            paintGameBoard();
                            moveable.paint();
                            }, 
                            50);

    var drag = function(event) {

        // Get event location.
        xPos = event.offsetX;
        yPos = event.offsetY;

        // Change location of moveable item.
        moveable.x = xPos + dragOffsetX;
        moveable.y = yPos + dragOffsetY;

        // Block water movement if in the ascending limb.
        if (moveable.id == "water" && moveable.limbPos.x > LOOP_OF_HENLE.x) {

            // Check if we are trying to move water past the wall of the ascending limb.
            if (moveable.x - moveable.w / 2 <= LOOP_OF_HENLE.x + LOOP_OF_HENLE.w / 2 - 150) {
                moveable.x = moveable.limbPos.x - moveable.limbPos.w / 2 + moveable.w / 2;
            } else if (moveable.x + moveable.w / 2 >= LOOP_OF_HENLE.x + LOOP_OF_HENLE.w / 2) {
                moveable.x = moveable.limbPos.x + moveable.limbPos.w / 2 - moveable.w / 2;
            }
        }

        // Block salt movement in the descending limb.
        if (moveable.id == "salt" && moveable.limbPos.x < LOOP_OF_HENLE.x) {

            // Check if we are trying to move salt past the wall of the descending limb.
            if (moveable.x - moveable.w / 2 <= LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2) {
                moveable.x = moveable.limbPos.x - moveable.limbPos.w / 2 + moveable.w / 2;
            } else if (moveable.x + moveable.w / 2 >= LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 150) {
                moveable.x = moveable.limbPos.x + moveable.limbPos.w / 2 - moveable.w / 2;
            }

        }

   };

   var drop = function() {

        window.clearInterval(animateInterval);

        // Get event location.
        xPos = moveable.x;
        yPos = moveable.y;

        // Check if item was dropped in a droppable.
        var canDrop = false;
        DROPPABLE.forEach(droppable => {

            // Check x position.
            if (xPos >= droppable.x - droppable.w / 2 && xPos <= droppable.x + droppable.w / 2) {

                if (yPos >= droppable.y - droppable.h / 2 && yPos <= droppable.y + droppable.h / 2) {

                    // Can only change concentration of fluid adjacent to limb position.
                    if ((moveable.limbPos.y > droppable.y - droppable.h / 2) && (moveable.limbPos.y < droppable.y + droppable.h / 2)) {
                        canDrop = true;

                        // Interstitial fluid concentration only changes with the addition of salt.
                        if (moveable.id == "salt") {
                            droppable.c += 50;
                        }
                    }
                    
                }

            }

    });

     // If item dropped elsewhere, reset concentration of limb position.
     if (!canDrop) {
        if (moveable.id == "salt") {
            moveable.limbPos.c += 50;
        } else {
            moveable.limbPos.c -= 50;
        }
    }

    // Reset position.
    moveable.x = moveable.startX;
    moveable.y = moveable.startY;

    // Remove highlight from selected position in tutorial version.
    if (inTutorial) {
        moveable.limbPos.isSelected = false;
    }

    paintGameBoard();
    removeDragHandler(drag, drop);
    
    };


    // Add dragging event.
    CANVAS.addEventListener("mousemove", drag);

    // Add drop event.
    CANVAS.addEventListener("mouseup", drop);

}

function removeDragHandler(drag, drop) {
    
    // Remove dragging event.
    CANVAS.removeEventListener("mousemove", drag);

    // Remove drop event.
    CANVAS.removeEventListener("mouseup", drop);

}

function validatePump() {

    for (i = 0; i < A_LIMB.length; i++) {

        // Check that the difference is not greater than 200.
        if (Math.abs(A_LIMB[i].c - INTER_FLUID[i].c) > 200) {
            console.log("Pump failed!");
            return false;
        }

        // Check that max amount of salt was removed.
        if (200 - Math.abs(A_LIMB[i].c - INTER_FLUID[i].c) >= 100) {
            console.log("Pump failed!");
            return false;
        }

    }

    // Enable the next button.
    STATE_BUTTONS[1].onClick = validateEquilibrate;
    STATE_BUTTONS[1].image = "equi";

    // Disable this button.
    STATE_BUTTONS[0].onClick = function() {};
    STATE_BUTTONS[0].image = "pump-disabled";

    // One time action taken during tutorial.
    if (inTutorial) {
        PASSIVE_POP_UPS.pop();
        paintGameBoard();
        displayHowToEquilibrate();
        console.log("Pump successful!");
        return true;
    }

    paintGameBoard();
    console.log("Pump successful!");
    return true;

}

function validateEquilibrate() {

    var improperEquil = false;

    for (i = 0; i < D_LIMB.length; i++) {
        if (D_LIMB[i].c == INTER_FLUID[i].c) {
            // Do nothing. Experiencing issue with !=.
        } else {
            improperEquil = true;
        }
    }

    if (improperEquil) {
        console.log("Equilibrate failed!");
    } else {

        // Enable the next button.
        STATE_BUTTONS[2].onClick = flow;
        STATE_BUTTONS[2].image = "flow";

        // Disable this button.
        STATE_BUTTONS[1].onClick = function() {};
        STATE_BUTTONS[1].image = "equi-disabled";

        // One time action taken during tutorial.
        if (inTutorial) {
            PASSIVE_POP_UPS.pop();
            paintGameBoard();
            displayHowToFlow();
            console.log("Equilibrate successful!");
            return improperEquil;
        }

        paintGameBoard();
        console.log("Equilibrate successful!");
    }
    return improperEquil;

}

function flow(i=0, limb="alimb") {

    // Flow in the ascending limb.
    if (limb == "alimb") {
        if (i == 5) {
            A_LIMB[i].c = D_LIMB[D_LIMB.length - 1].c;
            paintGameBoard();
            window.setTimeout(function() {flow(5, "dlimb")}, 500);
        } else {
            A_LIMB[i].c = A_LIMB[i + 1].c;
            paintGameBoard();
            window.setTimeout(function() {flow(i + 1)}, 500);
        }

    }

    // Flow in the descending limb.
    if (limb == "dlimb") {
        if (i == 0) {   // Base case.
            D_LIMB[i].c = 300;

            // Enable next button.
            STATE_BUTTONS[0].onClick = validatePump;
            STATE_BUTTONS[0].image = "pump";

            // Disable this button.
            STATE_BUTTONS[2].onClick = function() {};
            STATE_BUTTONS[2].image = "flow-disabled";

            // This is the last step of the tutorial before proceeding to regular gameplay.
            if (inTutorial) {
                displayNowToRegularPlay();
                // initRegularGame();
            }

        } else {
            D_LIMB[i].c = D_LIMB[i - 1].c;
            paintGameBoard();
            window.setTimeout(function() {flow(i - 1, "dlimb")}, 500);
        }

    }

}

// ---------------------------------------------- Methods to initialize different game states. ---------------------------------

function initGameTutorial() {

    // Initialize pump, equilibrate, flow buttons.
    initStateButtons();

    // Initialize the limbs.
    initDescendingLimb();
    initAscendingLimb();

    // Initialize the interstitial fluid.
    initInterstitialFluid()

    // Paint the intitialized elements.
    paintGameBoard();

    // Tell system we are in the tutorial.
    inTutorial = true;
    
    // Display welcome popup.
    displayWelcomeTutorial();
}

function initDescendingLimb() {

    D_LIMB.forEach(pos => {
        MOVEABLE.push(pos.salt);
        MOVEABLE.push(pos.water);
    });

}

function initAscendingLimb() {

    A_LIMB.forEach(pos => {
        MOVEABLE.push(pos.salt);
        MOVEABLE.push(pos.water);
    });

}

function initInterstitialFluid() {

    INTER_FLUID.forEach(pos => {
        DROPPABLE.push(pos);
    });

}

function initStateButtons() {

    // Pump button.
    var pumpButton = new Button(1137, 257, 170, 80, validatePump, "pump");
    STATE_BUTTONS.push(pumpButton);
    CLICKABLE.push(pumpButton);

    // Equilibrate button.
    var equilibrateButton = new Button(163, 257, 170, 80, function() {}, "equi-disabled");
    STATE_BUTTONS.push(equilibrateButton);
    CLICKABLE.push(equilibrateButton);

    // Flow button.
    var flowButton = new Button(CANVAS.clientWidth / 2, 665, 200, 60, function() {}, "flow-disabled");
    STATE_BUTTONS.push(flowButton);
    CLICKABLE.push(flowButton);

}

function initRegularGame() {

    // Tell system we are out of the tutorial.
    inTutorial = false;

    // Choose starting limb position.
    D_LIMB[2].isSelected = true;

    // Change state button behaviour to include automated game behaviour.

}

// ---------------------------------------------- Methods for drawing the game scene. ---------------------------------

function drawLoopOfHenle() {
    LOOP_OF_HENLE.paint();
}

function drawDescendingLimb() {

    D_LIMB.forEach(pos => {
        pos.paint();
    });

}

function drawAscendingLimb() {

    A_LIMB.forEach(pos => {
        pos.paint();
    });

}

function drawInterstitialFluid() {

    INTER_FLUID.forEach(pos => {
        pos.paint();
    });

}

function drawStateButtons() {

    STATE_BUTTONS.forEach(button => {
        button.paint();
    });

}

function drawPassivePopUps() {

    PASSIVE_POP_UPS.forEach(popUp => {
        popUp.paint();
    });

}

function paintGameBoard() {

    // Clear the canvas.
    CONTEXT.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Set new background color (must be behind other elements).
    CONTEXT.fillStyle = "#f5d9d9";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Draw the loop.
    drawLoopOfHenle();

    // Draw state controlling buttons.
    drawStateButtons();

    // Draw interstitial fluid.
    drawInterstitialFluid();

    // Draw descending limb.
    drawDescendingLimb();

    // Draw ascending limb.
    drawAscendingLimb();

    // Draw any passive popups present.
    drawPassivePopUps();

}

// -------------------------------------- Methods for handling dialogue pop-ups. -----------------------
function displayWelcomeTutorial() {
    var oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
    CLICKABLE = [];

    var welcomePopUp = new PopUp(LOOP_OF_HENLE.x, LOOP_OF_HENLE.y, LOOP_OF_HENLE.w + 200, LOOP_OF_HENLE.h / 2,
        ["Welcome.", "This is the Loop of Henle.", "Its job is to create an osmotic gradient in the interstitial fluid", "to later draw water out of " +
        "the finalized urine.", "You are a unit of soon-to-be urine.", "Your job?", "Pass through the length of the loop, and exit out the ascending limb – ", 
        "but to do this, you’ll have to play by the rules."], 
        function() {
            paintGameBoard();
            addMoveableHandler();
            displayHowToPump();
            CLICKABLE = oldClickable;
        });

    CONTEXT.globalAlpha = 0.5;
    paintGameBoard();
    welcomePopUp.paint();
}

function displayHowToPump() {
    var pumpPopUp = new PopUp((LOOP_OF_HENLE.x + LOOP_OF_HENLE.w / 2 + CANVAS.clientWidth) / 2, LOOP_OF_HENLE.y + LOOP_OF_HENLE.h / 4,
     CANVAS.clientWidth - (LOOP_OF_HENLE.x + LOOP_OF_HENLE.w / 2) - 30, LOOP_OF_HENLE.h / 2, 
     ["This is the ascending limb. Its walls are impermeable to water.", "It is in charge of actively pumping out solutes into the surrounding fluid.", 
      "However, it cannot exceed a concentration difference of 200 mOsm with the nterstitial fluid!", "Drag the correct element into the corresponding position",
      "in the interstitial fluid until you’ve reduced the", "concentrations of the limb as much as possible.", "Press ‘pump’ when you are done."]);
      pumpPopUp.paint();
    PASSIVE_POP_UPS.push(pumpPopUp);

}

function displayHowToEquilibrate() {
    var equiPopUp = new PopUp((LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2) / 2, LOOP_OF_HENLE.y + LOOP_OF_HENLE.h / 4, 
    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 - 30, LOOP_OF_HENLE.h / 2, 
    ["This is the descending limb. Its walls are permeable to water.", "It participates in a passive exchange of solvent with", "the surrounding fluid, matching its concentration.",
     "Drag the correct element into the corresponding position", "in the interstitial fluid until you’ve reached equilibrium.", "Press ‘equi’ when you are done."]);
    equiPopUp.paint();
    PASSIVE_POP_UPS.push(equiPopUp);
}

function displayHowToFlow() {
    var oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
    CLICKABLE = [];

    var flowPopUp = new PopUp(LOOP_OF_HENLE.x, LOOP_OF_HENLE.y, LOOP_OF_HENLE.w + 200, LOOP_OF_HENLE.h / 2,
        ["You’ve set up all the concentrations correctly.", "Fluid is transported along the loop,", "each unit occupying its neighbor’s position.", 
        "One unit of new fluid will enter the descending limb,", "and another will exit out the loop.", "Press ‘flow’ to move the units of fluid from left to right by one position."],
        function() {
            paintGameBoard();
            CLICKABLE = oldClickable;
        });

    CONTEXT.globalAlpha = 0.5;
    paintGameBoard();
    console.log("got to this point");
    flowPopUp.paint();
}

function displayNowToRegularPlay() {
    var oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
    CLICKABLE = [];

    var regularPlayPopUp = new PopUp(LOOP_OF_HENLE.x, LOOP_OF_HENLE.y, LOOP_OF_HENLE.w + 200, LOOP_OF_HENLE.h / 2,
        ["That’s it! You’ve completed the tutorial.", "Now you will be restricted to your spot as a single unit of primary urine.", "Follow the loop’s rules when it’s your turn, and watch how the gradient builds."],
        function() {
            initRegularGame();
            CLICKABLE = oldClickable;
            paintGameBoard();
        });

    CONTEXT.globalAlpha = 0.5;
    paintGameBoard();
    regularPlayPopUp.paint();

}

