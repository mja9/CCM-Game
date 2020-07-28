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
        CONTEXT.globalAlpha = 0.95;
        CONTEXT.fillStyle = "coral";
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        CONTEXT.globalAlpha = 1.0;

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

    static colorGrad = new Map([
        [0, "#ffe7c7"],
        [300, "#ffbe4d"],
        [600, "#ffab04"],
        [900, "#ff8316"],
        [1200, "#ff5f33"],
        [1500, "#ff413b"]
    ]);

    constructor(xPos, yPos) {
        this.w = 147;
        this.h = 80;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.salt = new SaltIcon(this.x + this.w / 2 - 22, this.y + this.h / 2 - 24, this);
        this.water = new WaterIcon(this.x - this.w / 2 + 20, this.y + this.h / 2 - 26, this);
        this.c = 300;
        this.isSelected = false;
    }   

    paint() {
        // Draw rectangular positions.
        CONTEXT.fillStyle = "#ffc730";
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

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

    drawRectangle() {

        switch((this.c / 300.0 * 100) % 100) {

            case 1.0 / 6.0:

            case 50:

            case 75:

            default: 

        }

    }

}

class InterPosition {

    constructor(xPos, yPos) {
        this.w = 324;
        this.h = 80;
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

}

class WaterIcon {

    constructor(xPos, yPos, limbPos) {
        this.id = "water";
        this.startX = xPos;
        this.startY = yPos;
        this.x = xPos;
        this.y = yPos;
        this.w = 26;
        this.h = 38;
        this.limbPos = limbPos;
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("water-icon"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class SaltIcon {

    constructor(xPos, yPos, limbPos) {
        this.id = "salt";
        this.startX = xPos;
        this.startY = yPos;
        this.x = xPos;
        this.y = yPos;
        this.w = 30;
        this.h = 34;
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
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 199),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 292),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 385),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 478)
             ];

var A_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 106),        
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 199),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 292),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 385),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 478)
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
var MOVEABLE = [];
var DROPPABLE = [];
var STATE_BUTTONS = [];

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
                    if (moveable.limbPos.y == droppable.y) {
                        canDrop = true;

                        // Interstitial fluid concentrationonly changes with the addition of salt.
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
                initRegularGame();
            }

            paintGameBoard();
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

}

// -------------------------------------- Methods for handling dialogue pop-ups. -----------------------
function displayWelcomeTutorial() {
    var welcomePopUp = new PopUp(LOOP_OF_HENLE.x, LOOP_OF_HENLE.y, LOOP_OF_HENLE.w, LOOP_OF_HENLE.h / 2,
        ["Welcome.", "This is the Loop of Henle.", "Its job is to create an osmotic gradient in the interstitial fluid", "to later draw water out of " +
        "the finalized urine.", "You are a unit of soon-to-be urine.", "Your job?", "Pass through the length of the loop, and exit out the ascending limb – ", 
        "but to do this, you’ll have to play by the rules."], 
        function() {
            paintGameBoard();
            addMoveableHandler();
            displayHowToPump();
            CLICKABLE.pop();
            console.log(CLICKABLE);
        });

        welcomePopUp.paint();
}

function displayHowToPump() {

}

function displayHowToEquilibrate() {

}

function displayHowToFlow() {

}

