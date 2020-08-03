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

    constructor(xPos, yPos, width, height, message, closeBtn, image) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.m = message;
        this.image = image;
        this.closeButton = closeBtn;

        // Initialize the click action for the button.
        CLICKABLE.push(this.closeButton);

    }

    paint() {

        // Active boxes require semi-transparent background.
        CONTEXT.globalAlpha = 1.0;

        if (this.image == undefined) {

            // Paint body.
            CONTEXT.fillStyle = "coral";
            CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

            // Display message.
            CONTEXT.fillStyle = "black";
            CONTEXT.font = "20px Arial";
            CONTEXT.textAlign = "center";
            var txtHeight = this.y - this.h / 2 + 40.0;

            for (i = 0; i < this.m.length; i++) {
                CONTEXT.fillText(this.m[i], this.x, txtHeight, this.w);
                txtHeight += 40.0;
            }
        } else {
            CONTEXT.drawImage(document.getElementById(this.image), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        }

        this.closeButton.paint();

    }

}

class LimbPosition {

    static colorGrad = ["#ffe7c7", "#ffbe4d", "#ffab04", "#ff8316", "#ff5f33", "#ff413b"];

    constructor(xPos, yPos) {
        this.w = 147;
        this.h = 90;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.salt = new SaltIcon(this.x + this.w / 2 - 7.0, this.y + this.h / 2 - 7.0, this);
        this.water = new WaterIcon(this.x - this.w / 2 + 7.0, this.y + this.h / 2 - 7.0, this);
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
        CONTEXT.fillText(this.c.toString(), this.x - this.w / 2 + 58.0, this.y);

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

    static colorGrad = ["#ffe7c7", "#ffbe4d", "#ffab04", "#ff8316", "#ff5f33", "#ff413b"];

    constructor(xPos, yPos) {
        this.w = 323;
        this.h = 85;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.c = 300;
    }   

    paint() {
        // Draw rectangular positions.
        this.colorFillMechanic();

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "40px Trebuchet MS";
        CONTEXT.textAlign = "center";
        CONTEXT.fillText(this.c.toString(), this.x, this.y + 11.0);
    }

    colorFillMechanic() {

        // Color change when concentration < 300 or > 1500.
        if (this.c < 300 | this.c >= 1500) {
            CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
            CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Handle color change when concentration > 300 and < 1500.
        } else {

            switch((this.c / 300.0 % 1).toFixed(2)) {

                case (350.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (5 * this.h / 6), this.w, this.h / 6);
                    break;

                case (400.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (2 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (2 * this.h / 6)), this.w, 2 * this.h / 6);
                    break;

                case (450.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (3 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (3 * this.h / 6)), this.w, 3 * this.h / 6);
                    break;

                case (500.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (4 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (4 * this.h / 6)), this.w, 4 * this.h / 6);
                    break;

                case (550.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (5 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (5 * this.h / 6)), this.w, 5 * this.h / 6);
                    break;

                case (600.0 / 300.0 % 1).toFixed(2): 
                    CONTEXT.fillStyle = InterPosition.colorGrad[this.c / 300];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
                    break;

            }

        }

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
    x: CANVAS.clientWidth / 2.0,
    y: CANVAS.clientHeight / 2.0,
    w: 650,
    h: 700,
    paint: function() {
                CONTEXT.drawImage(document.getElementById("loop-of-henle"), this.x - this.w / 2, this.y - this.h / 2);
           }
};

var D_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463.0)
             ];

var A_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103.0),        
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463.0)
             ];

var INTER_FLUID = [
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 16.0),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106.0),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 196.0),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 286.0),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 376.0),
                    new InterPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 163.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 466.0)
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
    var startButton = new Button(CANVAS.clientWidth / 2.0, (CANVAS.clientHeight / 2.0 + 3 * CANVAS.clientHeight / 4) / 2, 400, 100, 
                                    function() {
                                        console.log("Clicked start button!");

                                        // Lock user out of trigerring another click event.
                                        CLICKABLE = [];

                                        // Start the tutorial.
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
 * @param {MouseEvent} event A mousedown event on the CANVAS used to decide whether a 
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

    var improperPump = false;

    for (i = 0; i < A_LIMB.length; i++) {

        if (!checkPump(i)) {
            improperPump = true;
        }

    }

    if (improperPump) {

        console.log("Pump failed!");

    } else {

        // One time action taken during tutorial.
        if (inTutorial) {

            // Enable the next button.
            STATE_BUTTONS[1].onClick = validateEquilibrate;
            STATE_BUTTONS[1].image = "equi";

            // Disable this button.
            STATE_BUTTONS[0].onClick = function() {};
            STATE_BUTTONS[0].image = "pump-disabled";

            // Remove last pop up and its corresponding button.
            PASSIVE_POP_UPS.pop();
            CLICKABLE.pop();
            paintGameBoard();
            displayHowToEquilibrate();
            console.log("Pump successful!");
            return improperPump;

        // Regular game action.
        } else {

            // Disable this button.
            STATE_BUTTONS[0].onClick = function() {};
            STATE_BUTTONS[0].image = "pump-disabled";
            paintGameBoard();
            console.log("Pump successful!");

            // Continue the AI.
            startGameAI("dlimb");
        }

    }
   
    return improperPump;

}

function validateEquilibrate() {

    var improperEquil = false;

    for (i = 0; i < D_LIMB.length; i++) {

        // Flag any descending limb positions that fail the equilibrate criteria.
        if (!checkEqui(i)) {
            improperEquil = true;
        }
    }

    if (improperEquil) {
        console.log("Equilibrate failed!");

    } else {

        // One time action taken during tutorial.
        if (inTutorial) {

            // Enable the next button.
            STATE_BUTTONS[2].onClick = 
                function() {
                    STATE_BUTTONS[2].onClick = function() {};
                    STATE_BUTTONS[2].image = "flow-disabled";
                    flow();
                };
            STATE_BUTTONS[2].image = "flow";

            // Disable this button.
            STATE_BUTTONS[1].onClick = function() {};
            STATE_BUTTONS[1].image = "equi-disabled";

            // Remove last pop up and its corresponding button.
            PASSIVE_POP_UPS.pop();
            CLICKABLE.pop();           
            paintGameBoard();
            displayHowToFlow();
            console.log("Equilibrate successful!");
            return improperEquil;
      
        // Regular game action.
        } else {

             // Disable this button.
             STATE_BUTTONS[1].onClick = function() {};
             STATE_BUTTONS[1].image = "equi-disabled";
            paintGameBoard();
            console.log("Equilibrate successful!");

            // Continue to flow paused game state.
            pauseGameAI("player flow");
        }

    }
    return true;

}

function flow(i=0, limb="dlimb", conc=300) {

    // Flow in the descending limb.
    if (limb == "dlimb") {
        if (i == 5) {
            var oldConc = D_LIMB[i].c;
            D_LIMB[i].c = conc;

            if (!inTutorial && checkMovePlayer.hasBeenCalled != 2) {
                checkMovePlayer(i, limb);
            }
            paintGameBoard();
            window.setTimeout(function() {flow(5, "alimb", oldConc)}, 500);

        } else {
            var oldConc = D_LIMB[i].c;
            D_LIMB[i].c = conc;

            if (!inTutorial && checkMovePlayer.hasBeenCalled != 2) {
                checkMovePlayer(i, limb);
            }
            paintGameBoard();
            window.setTimeout(function() {flow(i + 1, limb, oldConc)}, 500);

        }

    }

    // Flow in the ascending limb.
    if (limb == "alimb") {
        if (i == 0) {   // Base case.
            A_LIMB[i].c = conc;

            // This is the last step of the tutorial before proceeding to regular gameplay.
            if (inTutorial) {

                // Remove last pop up and its corresponding button.
                PASSIVE_POP_UPS.pop();
                CLICKABLE.pop();           
                displayNowToRegularPlay();

            // Regular gameplay action.
            } else {

                // Move on to the next round unless the game is over.
                if (checkEndGame()) {
                    A_LIMB[i].isSelected = false;
                    dispalyEndGameScreen();
                } else {

                    if (checkMovePlayer.hasBeenCalled != 2) {
                        checkMovePlayer(i, limb);
                    }
                    paintGameBoard(); 
                    checkMovePlayer.hasBeenCalled = 0;  // Reset call flag.
                    startGameAI();
                }

            }

        } else {
            var oldConc = A_LIMB[i].c;
            A_LIMB[i].c = conc;

            if (!inTutorial) {
                checkMovePlayer(i, limb);
            }

            paintGameBoard();
            window.setTimeout(function() {flow(i - 1, limb, oldConc)}, 500);
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
    var pumpButton = new Button(1137.0, 257.0, 170, 80, validatePump, "pump");
    STATE_BUTTONS.push(pumpButton);
    CLICKABLE.push(pumpButton);

    // Equilibrate button.
    var equilibrateButton = new Button(163.0, 257.0, 170, 80, function() {}, "equi-disabled");
    STATE_BUTTONS.push(equilibrateButton);
    CLICKABLE.push(equilibrateButton);

    // Flow button.
    var flowButton = new Button(CANVAS.clientWidth / 2.0, 665.0, 200, 60, function() {}, "flow-disabled");
    STATE_BUTTONS.push(flowButton);
    CLICKABLE.push(flowButton);

}

function initRegularGame() {

    // Tell system we are out of the tutorial.
    inTutorial = false;

    // Choose starting limb position.
    D_LIMB[2].isSelected = true;

    // Begin AI control of other positions.
    startGameAI();

}

// ------------------------------------------ Methods for regular gameplay. ----------------------------------------


function checkEndGame() {

    if (A_LIMB[0].isSelected) {
        return true;
    } 

    return false;

}

function checkMovePlayer(currentPos, currentLimb) {

    // Set property during first call of function.
    if (checkMovePlayer.hasBeenCalled == undefined) {
        checkMovePlayer.hasBeenCalled = 0;
    }

    if (checkMovePlayer.hasBeenCalled == 0) {

        if (currentLimb == "dlimb") {

            if (D_LIMB[currentPos].isSelected) {
                D_LIMB[currentPos].isSelected = false;
                checkMovePlayer.hasBeenCalled = 1;
            }

        }

        if (currentLimb == "alimb") {

            if (A_LIMB[currentPos].isSelected) {
                A_LIMB[currentPos].isSelected = false;
                checkMovePlayer.hasBeenCalled = 1;
            }

        }
    } else if (checkMovePlayer.hasBeenCalled == 1) {
        
        if (currentLimb == "dlimb") {
            D_LIMB[currentPos].isSelected = true;
        } else {
            A_LIMB[currentPos].isSelected = true;
        }

        checkMovePlayer.hasBeenCalled = 2;

    }

}

function movePlayer() {

    var playerFlag = false;
    var playerPosition = 0;

    for (i = 0; i < D_LIMB.length; i ++) {
        if (D_LIMB[i].isSelected) {
            playerFlag = true;
            playerPosition = i;
        }
    }

    if (playerFlag) {

        if (playerPosition == 5) {
            D_LIMB[playerPosition].isSelected = false;
            A_LIMB[playerPosition].isSelected = true;
        } else {
            D_LIMB[playerPosition].isSelected = false;
            D_LIMB[playerPosition + 1].isSelected = true;
        }

    } else {

        for (i = 0; i < A_LIMB.length; i ++) {
            if (A_LIMB[i].isSelected) {
                playerFlag = true;
                playerPosition = i;
            }
        }

        A_LIMB[playerPosition].isSelected = false;
        A_LIMB[playerPosition - 1].isSelected = true;

    }

}

function startGameAI(currentLimb = "alimb") {

    var playerFlag = false;

    // Ascending limb automation logic.
    if (currentLimb == "alimb") {

        console.log("Automating pump phase!");

        var pumpFlag = false;

        for (i = 0; i < A_LIMB.length; i++) {

            // If we reach the player's position, pause the automation.
            if (A_LIMB[i].isSelected) {

                playerFlag = true;

            // Otherwise, animate the pump cycle if criteria is not being met.
            } else if (!checkPump(i)) {

                pumpFlag = true;
                animatePump(i);

            }
        }

        if (pumpFlag) {
            window.setTimeout(function() {startGameAI(currentLimb)}, 1450); // Distance is 217.5, / distanced moved per tick * tick time ms.
        } else if (playerFlag) {
            pauseGameAI("player pump");
        } else {
            window.setTimeout(function() {startGameAI("dlimb")}, 300);
        }

    // Descending limb automation cycle.
    } else {

        console.log("Automating equilibrate phase!");

        var equiFlag = false;

        for (i = 0; i < D_LIMB.length; i++) {

            // If we reach the player's position, pause the automation.
            if (D_LIMB[i].isSelected) {
                playerFlag = true;

            // Otherwise, animate equilibrate cycle if criteria is not met.
            } else if (!checkEqui(i)) {
                equiFlag = true;
                animateEquilibrate(i);
            }
        }

        if (equiFlag) {
            window.setTimeout(function(){startGameAI(currentLimb)}, 1450);
        }
        else if(playerFlag) {
            pauseGameAI("player equi");
        } else {
            pauseGameAI("player flow");
        }

    }

}

function pauseGameAI(pauseID) {

    console.log(pauseID);

    switch(pauseID) {

        case "player pump":
            STATE_BUTTONS[0].onClick = validatePump;
            STATE_BUTTONS[0].image = "pump";
            paintGameBoard();
            break;

        case "player equi":
            STATE_BUTTONS[1].onClick = validateEquilibrate;
            STATE_BUTTONS[1].image = "equi";
            paintGameBoard();
            break;

        case "player flow":
            STATE_BUTTONS[2].onClick = function() {
                STATE_BUTTONS[2].onClick = function() {};
                STATE_BUTTONS[2].image = "flow-disabled";
                flow();
            };
            STATE_BUTTONS[2].image = "flow";
            paintGameBoard();
            break;

        default:
            console.log("Unrecognized pause ID passed!");
            console.log(pauseID);
            break;
    }

}

function animatePump(currentPos) {

        A_LIMB[currentPos].c -= 50;

        var iconAnimation = window.setInterval(function() {

            if (A_LIMB[currentPos].salt.x <= INTER_FLUID[currentPos].x + INTER_FLUID[currentPos].w / 4) {
                INTER_FLUID[currentPos].c += 50;
                A_LIMB[currentPos].salt.x = A_LIMB[currentPos].salt.startX;

                paintGameBoard();
                window.clearInterval(iconAnimation);

            // Move salt icon.
            } else {

                A_LIMB[currentPos].salt.x -= 10;
                paintGameBoard();

            }

        }, 50);

}

function animateEquilibrate(currentPos) {

    D_LIMB[currentPos].c += 50;

    var waterAnimation = window.setInterval(function() {

        // Drop effect.
        if (D_LIMB[currentPos].water.x >= INTER_FLUID[currentPos].x - INTER_FLUID[currentPos].w / 4) {
            D_LIMB[currentPos].water.x = D_LIMB[currentPos].water.startX;

             // Paint board and recursively call function.
            paintGameBoard();
            window.clearInterval(waterAnimation);
        
        // Move water icon.
        } else {

            D_LIMB[currentPos].water.x += 10;
            paintGameBoard();

        }

    }, 50);

}

// ----------------------------------- Methods for handling end game ------------------------------------------------

function dispalyEndGameScreen() {

    // Display goodbye box.
    CONTEXT.drawImage(document.getElementById("goodbye-box"), 665, 365, 900, 580);

    // Don't let the player interact with anything else.
    CLICKABLE = [];
    MOVEABLE = [];
    DROPPABLE = [];
    STATE_BUTTONS = [];
    PASSIVE_POP_UPS = [];    

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
    CONTEXT.fillStyle = "#e4f6ff";
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

    var welcomePopUp = new PopUp(665.0, 365.0, 900, 580, [], 
        new Button(665.0, 556.0, 150, 70, function() {
            CLICKABLE = oldClickable;
            paintGameBoard();
            addMoveableHandler();
            displayHowToPump();
        }, "ok-button"),
        "welcome-box");

    CONTEXT.globalAlpha = 0.35;
    paintGameBoard();
    welcomePopUp.paint();
}

function displayHowToPump() {

    var pumpPopUp = new PopUp(1158.5, 506.0, 321, 370, [], 
        new Button(1288.0, 658.0, 19, 22, function() {

            // Lock player out of retriggering this click action.
            CLICKABLE.pop();

            // Display second popUp
            var pumpPopUp2 = new PopUp(1158.5, 506.0, 321, 370, [], new Button(1288.0, 658.0, 19, 22, 
                function() {
                    CLICKABLE.pop();    // Lock player out of retriggering button 2.
                    PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                    displayHowToPump();
            }, "invert-tri"), "pump-box2");

            PASSIVE_POP_UPS.pop();  // Remove pop up 1.
            pumpPopUp2.paint();
            PASSIVE_POP_UPS.push(pumpPopUp2);

        }, "tri"), "pump-box1");

    pumpPopUp.paint();
    PASSIVE_POP_UPS.push(pumpPopUp);

}

function displayHowToEquilibrate() {

    var equiPopUp = new PopUp(171.5, 526.0, 321, 330, [], 
        new Button(282.0, 658.0, 19, 22, 
            function() {

                CLICKABLE.pop();    // Lock player out of rettriggering button 1.

                var equiPopUp2 = new PopUp(171.5, 526.0, 321, 330, [], new Button(282.0, 658.0, 19, 22, 
                    function() {
                        CLICKABLE.pop();    // Lock player out of retriggering button 2.
                        PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                        displayHowToEquilibrate();
                    }, "invert-tri"), "equi-box2");

                PASSIVE_POP_UPS.pop();  // Remove pop up 1.
                equiPopUp2.paint();
                PASSIVE_POP_UPS.push(equiPopUp2);
                
            }, "tri"), "equi-box1");
    equiPopUp.paint();
    PASSIVE_POP_UPS.push(equiPopUp);

}

function displayHowToFlow() {

    var flowPopUp = new PopUp(665.0, 447.5, 330, 321, [], new Button(803.0, 556.0, 19, 22, 
        function() {

            CLICKABLE.pop();    // Lock player out of retriggering button 1.

            var flowPopUp2 = new PopUp(665.0, 447.5, 330, 321, [], new Button(803.0, 556.0, 19, 22, 
                function(){

                    CLICKABLE.pop();    // Lock player out of retrigerring button 2.
                    PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                    displayHowToFlow();

                }, "invert-tri"), "flow-box2");

            PASSIVE_POP_UPS.pop();  // Remove pop up 1.
            flowPopUp2.paint();
            PASSIVE_POP_UPS.push(flowPopUp2);

        }, "tri"), "flow-box1");

    flowPopUp.paint();
    PASSIVE_POP_UPS.push(flowPopUp);

}

function displayNowToRegularPlay() {
    var oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
    CLICKABLE = [];

    var regularPlayPopUp = new PopUp(665.0, 328.0, 700, 300, [], 
    new Button(665.0, 404.0, 150, 70, 
        function() {
            initRegularGame();
            CLICKABLE = oldClickable;
            paintGameBoard();
        }, "ok-button"), "end-tutorial");

    CONTEXT.globalAlpha = 0.35;
    paintGameBoard();
    regularPlayPopUp.paint();

}

// ---------------------------------------- Helpers used in both tutorial and regular play ----------------------

/**
 * Checks if the position in currentPos of the ascending limb
 * has a valid concentration according to the pump 
 * criteria.
 * @param {Number} currentPos The current position in the ascending limb.
 */
function checkPump(currentPos) {

    // Check that the difference is not greater than 200.
    if (Math.abs(A_LIMB[currentPos].c - INTER_FLUID[currentPos].c) > 200) {
        return false;
    }

    // Check that max amount of salt was removed.
    if (200 - Math.abs(A_LIMB[currentPos].c - INTER_FLUID[currentPos].c) >= 100) {
        return false;
    }

    return true;
}

/**
 * Checks if the position in currentPos of the descending limb
 * has a valid concentration according to the equilibrate 
 * criteria.
 * @param {Number} currentPos The current position in the descending limb.
 */
function checkEqui(currentPos) {

    if (D_LIMB[currentPos].c == INTER_FLUID[currentPos].c) {
        return true;
    }

    return false;

}

