// Copyright © 2020 mja9
// Global constants.
let i = 0;
let CANVAS = document.getElementById("game-canvas");
let CONTEXT = CANVAS.getContext("2d");
let titleScreenInterval;
let LOOP_OF_HENLE = {
    x: 829,
    y: 360.5,
    paint: function() {
                // Draw the boxes at the top.
                CONTEXT.fillStyle = "#0daaf2";
                CONTEXT.fillRect(505, 0, 148, 30);
                CONTEXT.fillRect(1005, 0, 148, 30);
           }
};

let INCOMING = new LimbPosition(579, -90, 579, 78);

let D_LIMB = [
                new LimbPosition(579, 78, 579, 167),
                new LimbPosition(579, 167, 579, 256),
                new LimbPosition(579, 256, 579, 345),
                new LimbPosition(579, 345, 579, 434),
                new LimbPosition(579, 434, 579, 523),
                new LimbPosition(579, 523, 1079, 523)
             ];

let A_LIMB = [
                new LimbPosition(1079, 78, 1079, -90),
                new LimbPosition(1079, 167, 1079, 78),        
                new LimbPosition(1079, 256, 1079, 167),
                new LimbPosition(1079, 345, 1079, 256),
                new LimbPosition(1079, 434, 1079, 345),
                new LimbPosition(1079, 523, 1079, 434)
             ];

let INTER_FLUID = [
                    new InterPosition(829, 78),
                    new InterPosition(829, 167),
                    new InterPosition(829, 256),
                    new InterPosition(829, 345),
                    new InterPosition(829, 434),
                    new InterPosition(829, 523)
                  ];

// TODO: Design paint loop to remove some of these!
let CLICKABLE = [];
let MOVEABLE = [];
let DROPPABLE = [];
let STATE_BUTTONS = [];
let PASSIVE_POP_UPS = [];
let ADDITIONALS = [];

let inTutorial = false;

const mainDispatcher = new Dispatcher();
let mainLoop = window.setInterval(function() {
    mainDispatcher.dispatchCommand(function(observer) {
        observer.paint();
    });
}, 50);

// ---------------------------------------------- Methods for the game title scene. ---------------------------------

/**
 * Initialize game board and start title screen for the game.
 */
function initTitleScreen() {

    titleView = new TitleView();
    titleModel = new TitleModel();
    
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

function flow(inSim = false) {
    console.log("Flowing...");

    var flag = false;
    ADDITIONALS.push(INCOMING);
    var animation = window.setInterval(function() {

        // Regular positions.
        if (INCOMING.y < INCOMING.nextY) {
            INCOMING.move(0, 5);
            
            // Fix position.
            if (INCOMING.y > INCOMING.nextY) {
                INCOMING.moveTo(INCOMING.x, INCOMING.nextY);
            }
        }

        D_LIMB.forEach(limb => {

            if ((limb.x == limb.nextX) && (limb.y < limb.nextY)) {
                limb.move(0, 5);

                // Fix the position.
                if (limb.y > limb.nextY) {
                    limb.moveTo(limb.x, limb.nextY);
                }
            }

        });

        A_LIMB.forEach(limb => {

            if ((limb.x == limb.nextX) && (limb.y > limb.nextY)) {
                limb.move(0, -5);

                // Fix the position.
                if (limb.y < limb.nextY) {
                    limb.moveTo(limb.x, limb.nextY);
                }
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
                    D_LIMB[5].moveTo(D_LIMB[5].nextX, D_LIMB[5].nextY);
                    flag = true;
                }
            } 
        }
        paintGameBoard();
        if (flag) {
            window.clearInterval(animation);

            if (inSim) {
                flowConcentrationSim();
            } else {
                flowConcentration();
            }
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
    let i = 0;
    D_LIMB.forEach(pos => {
        i += 1;

        if (i == 6) {
            pos.move(pos.startX - pos.x, pos.startY - pos.y);
        }
        pos.move(pos.startX - pos.x, pos.startY - pos.y);
    });

    A_LIMB.forEach(pos => {
        pos.move(pos.startX - pos.x, pos.startY - pos.y);
    });
    paintGameBoard();
}

// ---------------------------------------------- Methods to initialize different game states. ---------------------------------

function initGameTutorial() {

    let playView = new PlayView();
    let playModel = new PlayModel(playView);

    // Tell system we are in the tutorial.
    playModel.init();
    inTutorial = true;
}

// TODO:
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
