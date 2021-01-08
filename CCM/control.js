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
                new CrossingPosition(579, 523, 1079, 523)
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

// TODO:
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
