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

let CLICKABLE = [];
let MOVEABLE = [];
let DROPPABLE = [];
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

// ---------------------------------------------- Methods to initialize different game states. ---------------------------------

function initGameTutorial() {

    const fade = mainDispatcher.observers[0];
    let playView = new PlayView();
    let playModel = new PlayModel(playView);

    // Tell system we are in the tutorial.
    fade.v = -0.1;
    fade.animationDecorator = function() {
        fade.animationDecorator = function() {};
        mainDispatcher.remove(fade);
        playModel.tutorial.init();
        inTutorial = true;
    };
}

function initSimulation() {
    let simView = new SimulationView();
    let simModel = new SimulationModel(simView);
    simModel.init();
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
