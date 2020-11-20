// Copyright © 2020 mja9
// Global constants.
let i = 0;
let CANVAS = document.getElementById("game-canvas");
let CONTEXT = CANVAS.getContext("2d");
var LOOP_OF_HENLE = {
    x: CANVAS.clientWidth / 2.0,
    y: CANVAS.clientHeight / 2.0,
    w: 650,
    h: 700,
    paint: function() {
                CONTEXT.drawImage(document.getElementById("loop-of-henle"), this.x - this.w / 2, this.y - this.h / 2);
           }
};

var INCOMING = new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, -90, 
    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13.0);

var D_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103.0, 
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283.0, 
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 1.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463.0)
             ];

var A_LIMB = [
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, -90),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103.0, 
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 13.0),        
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 103.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 193.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 283.0),
                new LimbPosition(LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 463.0,
                    LOOP_OF_HENLE.x - LOOP_OF_HENLE.w / 2 + 501.5, LOOP_OF_HENLE.y - LOOP_OF_HENLE.h / 2 + 373.0)
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
var ADDITIONALS = [];

var inTutorial = false;

// ---------------------------------------------- Methods for the game title scene. ---------------------------------

/**
 * Initialize game board and start title screen for the game.
 */
function initTitleScreen() {

    // Draw title screen.
    paintTitleScreen();

    // Create the title screen buttons.
    let regPlayBtn = new Button(CANVAS.clientWidth / 2.0, CANVAS.clientHeight / 2.0, 400, 100, 
                                    function() {
                                        console.log("Clicked start button!");

                                        // Lock user out of trigerring another click event.
                                        CLICKABLE = [];

                                        // Start the tutorial.
                                        initGameTutorial();
                                    }, "start-button");

    let simPlayBtn = new Button(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * (3.0 / 4.0), 400, 100, 
                                    function() {
                                        console.log("Clicked simulation button!");
                                        CLICKABLE = [];

                                        // Start the simulation.
                                        initSimView();
                                        initSimModel();
                                    }, "start-button");

    // Paint the buttons on the canvas.
    regPlayBtn.paint();
    simPlayBtn.paint();

    // Regiter the button as clickable items on the GUI.
    CLICKABLE.push(regPlayBtn);
    CLICKABLE.push(simPlayBtn);
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

// ------------------------------------------------ Methods for handling user triggered events. ----------------------------------------------------------------------------

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

function flow() {
    console.log("Flowing...");

    var flag = false;
    ADDITIONALS.push(INCOMING);
    var animation = window.setInterval(function() {

        // Regular positions.
        if (INCOMING.y < INCOMING.nextY) {
            INCOMING.move(0, 5);
        }

        D_LIMB.forEach(limb => {

            if ((limb.x == limb.nextX) && (limb.y < limb.nextY)) {
                limb.move(0, 5);
            }

        });

        A_LIMB.forEach(limb => {

            if ((limb.x == limb.nextX) && (limb.y > limb.nextY)) {
                limb.move(0, -5);
            }

        });

        // Cross Limb position.
        if ((D_LIMB[5].x != D_LIMB[5].nextX) | (D_LIMB[5].y != D_LIMB[5].nextY)) {

            if (D_LIMB[5].x == D_LIMB[5].startX) {

                if (D_LIMB[5].y >= 600.0) {
                    D_LIMB[5].move(2, 3);

                } else {
                    D_LIMB[5].move(0, 10);
                }

            } else if ((D_LIMB[5].y < 665.0) && (D_LIMB[5].x < D_LIMB[5].nextX - 42)) {
                D_LIMB[5].move(2, 3);

            } else if ((D_LIMB[5].y >= 665.0) && (D_LIMB[5].x < D_LIMB[5].nextX - 42)) {
                D_LIMB[5].move(10, 0);

            } else if (D_LIMB[5].x < D_LIMB[5].nextX) {
                D_LIMB[5].move(2, -3);

            } else if ((D_LIMB[5].x >= D_LIMB[5].nextX) && (D_LIMB[5].y > D_LIMB[5].nextY)) {
                D_LIMB[5].move(0, -10);

                if (D_LIMB[5].y <= D_LIMB[5].nextY) {
                    D_LIMB[5].x = D_LIMB[5].nextX;
                    D_LIMB[5].y = D_LIMB[5].nextY;
                    flag = true;
                }
            } 
        }
        paintGameBoard();
        if (flag) {
            window.clearInterval(animation);
            flowConcentration();
        }

    }, 50);

}

function flowConcentration(i=0, limb="dlimb", conc=300) {

    // Flow in the descending limb.
    if (limb == "dlimb") {
        if (i == 5) {
            var oldConc = D_LIMB[i].c;
            D_LIMB[i].c = conc;

            if (!inTutorial && checkMovePlayer.hasBeenCalled != 2) {
                checkMovePlayer(i, limb);
            }
            flowConcentration(5, "alimb", oldConc);

        } else {
            var oldConc = D_LIMB[i].c;
            D_LIMB[i].c = conc;

            if (!inTutorial && checkMovePlayer.hasBeenCalled != 2) {
                checkMovePlayer(i, limb);
            }
            flowConcentration(i + 1, limb, oldConc);

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
                resetAfterFlow();        
                displayNowToRegularPlay();

            // Regular gameplay action.
            } else {

                // Move on to the next round unless the game is over.
                if (checkEndGame()) {
                    A_LIMB[i].isSelected = false;
                    resetAfterFlow();
                    dispalyEndGameScreen();
                } else {

                    if (checkMovePlayer.hasBeenCalled != 2) {
                        checkMovePlayer(i, limb);
                    }
                    checkMovePlayer.hasBeenCalled = 0;  // Reset call flag.
                    resetAfterFlow();
                    startGameAI();
                }

            }

        } else {
            var oldConc = A_LIMB[i].c;
            A_LIMB[i].c = conc;

            if (!inTutorial) {
                checkMovePlayer(i, limb);
            }

            flowConcentration(i - 1, limb, oldConc);
        }

    }

}

function resetAfterFlow() {

    // Handle the incoming position.
    INCOMING.move(INCOMING.startX - INCOMING.x, INCOMING.startY - INCOMING.y);
    ADDITIONALS.pop();

    // Handle the regular limb positions.
    D_LIMB.forEach(pos => {
        pos.move(pos.startX - pos.x, pos.startY - pos.y);
    });

    A_LIMB.forEach(pos => {
        pos.move(pos.startX - pos.x, pos.startY - pos.y);
    });
    paintGameBoard();
    console.log("Sucessfully reset positions!");
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
    CONTEXT.drawImage(document.getElementById("goodbye-box"), 215, 75, 900, 580);

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

function drawAdditionals() {

    ADDITIONALS.forEach(adds => {
        adds.paint();
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

    // Draw any temporary additional elements.
    drawAdditionals();

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

    // highlightLimb("alimb");

    var pumpPopUp = new PopUp(1158.5, 506.0, 321, 370, [], 
        new Button(1288.0, 658.0, 19, 22, function() {

            // Lock player out of retriggering this click action.
            CLICKABLE.pop();

            // End the water highlight and highlight the salt icon.
            // A_LIMB[2].water.stopAnimation();
            // A_LIMB[2].salt.animateHighlight();

            // Display second popUp
            var pumpPopUp2 = new PopUp(1158.5, 506.0, 321, 370, [], new Button(1288.0, 658.0, 19, 22, 
                function() {
                    CLICKABLE.pop();    // Lock player out of retriggering button 2.
                    PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                    // A_LIMB[2].salt.stopAnimation(); // End salt highlight.
                    displayHowToPump();
            }, "invert-tri"), "pump-box2");

            PASSIVE_POP_UPS.pop();  // Remove pop up 1.
            pumpPopUp2.paint();
            PASSIVE_POP_UPS.push(pumpPopUp2);

        }, "tri"), "pump-box1");

    pumpPopUp.paint();
    PASSIVE_POP_UPS.push(pumpPopUp);

    // Highlight the water icon.
    // A_LIMB[2].water.animateHighlight();

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

// ------------------------------------------------------------------- Methods for animating --------------------------------------------------------------------
 
function highlightLimb(limb) {

    switch (limb) {

        case "alimb":
            highlightA();
            break;

        default:
            break;

    }

}

function highlightA() {

    highlightA.direction = -1;
    highlightA.lastAlpha = 1.0;

    var highlightAnimation = window.setInterval(function() {

        CONTEXT.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

        // Fade Animation
        paintGameBoard();
        CONTEXT.globalAlpha = highlightA.lastAlpha;

        // Add shadow effect to slighltly blur line.
        CONTEXT.shadowBlur = 20;
        CONTEXT.shadowColor = "#66ff99";
        CONTEXT.fillStyle = "#66ff99";
        CONTEXT.fillRect(832, 15, 166, 565);
        CONTEXT.shadowBlur = 0;

        // Alter alpha for fade effect.
        highlightA.lastAlpha +=  highlightA.direction * 0.1;
        if (highlightA.lastAlpha <= 0.2) {
            highlightA.direction = 1;
        } else if (highlightA.lastAlpha == 1.0) {
            highlightA.direction = -1;
        }

        // Draw the rest of the limb
        CONTEXT.globalAlpha = 1.0;
        drawAscendingLimb();

    }, 50);

}

function stopLimbHighlight() {

}
