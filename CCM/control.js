// Copyright © 2020 mja9
// Global constants.
var CANVAS = document.getElementById("game-canvas");
var CONTEXT = CANVAS.getContext("2d");
var CLICKABLE = [];

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

    paint(context, image) {
        // context.fillStyle = "gold";
        // context.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        context.drawImage(document.getElementById(image), this.x - this.w / 2, this.y - this.h / 2);
    }

}

class Position extends Button {
    constructor(xPos, yPos, width, height, isDescending, concentration) {
        super(xPos, yPos, width, height, 
            function() {
                console.log("New position has been selected!");
            });
        this.isDescending = isDescending;
        this.c = concentration;
    }

    paint(context) {
        context.fillStyle = "gold";
        context.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

// Begin the system upon webpage loading. (Maybe best placed in index?)
CANVAS.onload = initTitleScreen();

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

    // var restartButton = new Button(CANVAS.clientWidth / 2, (3 * CANVAS.clientHeight / 4 + CANVAS.clientHeight) / 2, 400, 100,
    //                                 function() {
    //                                     console.log("Clicked restart button!");

    //                                     // Lock user out of trigerring another click event.
    //                                     Clickable = [];

    //                                     // Clear the canvas
    //                                     CONTEXT.clearRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    //                                     initGameBoard();
    //                                 });

    // Paint the buttons on the canvas.
    startButton.paint(CONTEXT, "start-button");
    // restartButton.paint(CONTEXT, "start-button?");

    // Regiter the buttons as clickable items on the GUI.
    // CLICKABLE = [startButton, restartButton];
    CLICKABLE = [startButton];
    initClickHandler();
}

/*
* Initialize the click handler.
*/
function initClickHandler() {

    // Canvas click event handling
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

function initGameBoard() {
    // Draw the loop.
    drawLoopOfHenle();

    // Initialize the limbs.
    initDescendingLimb();
    initAscendingLimb();
}

function drawLoopOfHenle() {

    // Set new background color (must be behind other elements).
    CONTEXT.fillStyle = "dodgerblue";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    // Draw the loop outline.
    CONTEXT.strokeStyle = "gold";
    CONTEXT.beginPath();
    CONTEXT.moveTo(CANVAS.clientWidth / 8 * 3, CANVAS.clientHeight / 4);
    CONTEXT.lineTo(CANVAS.clientWidth / 8 * 3, CANVAS.clientHeight / 8 * 5);
    CONTEXT.arcTo(CANVAS.clientWidth / 8 * 3, CANVAS.clientHeight / 4 * 3, CANVAS.clientWidth / 2, CANVAS.clientHeight / 4 * 3, 50);
    CONTEXT.arcTo(CANVAS.clientWidth / 8 * 5, CANVAS.clientHeight / 4 * 3, CANVAS.clientWidth / 8 * 5, CANVAS.clientHeight / 8 * 5, 50);
    CONTEXT.lineTo(CANVAS.clientWidth / 8 * 5, CANVAS.clientHeight / 4);
    CONTEXT.stroke();
}

function initDescendingLimb() {

    // Create the 6 Positions and their corresponding concentrations.
    var pos1 = new Position(CANVAS.clientWidth / 8 * 3 - 50, CANVAS.clientHeight / 4 + 30, 60, 30, true, 300);
    var pos2 = new Position(CANVAS.clientWidth / 8 * 3 - 50, CANVAS.clientHeight / 4 + 80, 60, 30, true, 300);
    var pos3 = new Position(CANVAS.clientWidth / 8 * 3 - 50, CANVAS.clientHeight / 4 + 130, 60, 30, true, 300);
    var pos4 = new Position(CANVAS.clientWidth / 8 * 3 - 50, CANVAS.clientHeight / 4 + 180, 60, 30, true, 300);
    var pos5 = new Position(CANVAS.clientWidth / 8 * 3 - 50, CANVAS.clientHeight / 4 + 230, 60, 30, true, 300);
    var pos6 = new Position(CANVAS.clientWidth / 8 * 3 - 50, CANVAS.clientHeight / 4 + 280, 60, 30, true, 300);

    // Paint all positions.
    pos1.paint(CONTEXT);
    pos2.paint(CONTEXT);
    pos3.paint(CONTEXT);
    pos4.paint(CONTEXT);
    pos5.paint(CONTEXT);
    pos6.paint(CONTEXT);

    // Register each position as clickable.
    CLICKABLE = [pos1, pos2, pos3, pos4, pos5, pos6];

}

function initAscendingLimb() {

    // Create the 6 Positions and their corresponding concentrations.
    var pos1 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 30, 60, 30, true, 300);
    var pos2 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 80, 60, 30, true, 300);
    var pos3 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 130, 60, 30, true, 300);
    var pos4 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 180, 60, 30, true, 300);
    var pos5 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 230, 60, 30, true, 300);
    var pos6 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 280, 60, 30, true, 300);

    // Paint all positions.
    pos1.paint(CONTEXT);
    pos2.paint(CONTEXT);
    pos3.paint(CONTEXT);
    pos4.paint(CONTEXT);
    pos5.paint(CONTEXT);
    pos6.paint(CONTEXT);

    // Register each position as clickable.
    CLICKABLE.push(pos1);
    CLICKABLE.push(pos2);
    CLICKABLE.push(pos3);
    CLICKABLE.push(pos4);
    CLICKABLE.push(pos5);
    CLICKABLE.push(pos6);

}
