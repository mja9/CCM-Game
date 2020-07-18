// Copyright © 2020 mja9
// Global constants.
var CANVAS = document.getElementById("game-canvas");
var CONTEXT = CANVAS.getContext("2d");
var CLICKABLE = [];
var DROPDOWN = false;

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

                // Remove old drop down menu.
                if (DROPDOWN) {
                    removeDropDown();
                } else {
                    DROPDOWN = true;
                }

                if (isDescending) {

                    // Draw triangular portion of drop down for descending limb.
                    CONTEXT.beginPath();
                    CONTEXT.moveTo(xPos - 50, yPos);
                    CONTEXT.lineTo(xPos - 75, yPos - height / 2);
                    CONTEXT.lineTo(xPos - 75, yPos + height / 2);
                    CONTEXT.lineTo(xPos - 50, yPos);
                    CONTEXT.fillStyle = "gold";
                    CONTEXT.fill();

                    // Draw square portion of drop down menu.
                    CONTEXT.fillRect(xPos - 295, yPos - height / 2, 220, 310);

                    // Draw token grid of drop down menu.
                    // Row 1.
                    CONTEXT.fillStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 260, yPos - height / 2 + 35, 25, 0, 2 * Math.PI);
                    CONTEXT.fill();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 195, yPos - height / 2 + 35, 25, 0, 2 * Math.PI);
                    CONTEXT.fill();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 130, yPos - height / 2 + 35, 25, 0, 2 * Math.PI);
                    CONTEXT.fill();


                    // Row 2.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 260, yPos - height / 2 + 95, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 195, yPos - height / 2 + 95, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 130, yPos - height / 2 + 95, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    // Row 3.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 260, yPos - height / 2 + 155, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 195, yPos - height / 2 + 155, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 130, yPos - height / 2 + 155, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    // Row 4.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 260, yPos - height / 2 + 215, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 195, yPos - height / 2 + 215, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 130, yPos - height / 2 + 215, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    // Row 5.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 260, yPos - height / 2 + 275, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 195, yPos - height / 2 + 275, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos - 130, yPos - height / 2 + 275, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                } else {

                    // Draw triangular portion of drop down for descending limb.
                    CONTEXT.strokeStyle = "gold";
                    CONTEXT.beginPath();
                    CONTEXT.moveTo(xPos + 50, yPos);
                    CONTEXT.lineTo(xPos + 75, yPos - height / 2);
                    CONTEXT.lineTo(xPos + 75, yPos + height / 2);
                    CONTEXT.lineTo(xPos + 50, yPos);
                    CONTEXT.fillStyle = "gold";
                    CONTEXT.fill();
                    CONTEXT.stroke();

                    // Draw square portion of drop down menu.
                    CONTEXT.fillRect(xPos + 75, yPos - height / 2, 220, 310);

                    // Draw token grid of drop down menu.
                    // Row 1.
                    CONTEXT.fillStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 260, yPos - height / 2 + 35, 25, 0, 2 * Math.PI);
                    CONTEXT.fill();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 195, yPos - height / 2 + 35, 25, 0, 2 * Math.PI);
                    CONTEXT.fill();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 130, yPos - height / 2 + 35, 25, 0, 2 * Math.PI);
                    CONTEXT.fill();


                    // Row 2.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 260, yPos - height / 2 + 95, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 195, yPos - height / 2 + 95, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 130, yPos - height / 2 + 95, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    // Row 3.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 260, yPos - height / 2 + 155, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 195, yPos - height / 2 + 155, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 130, yPos - height / 2 + 155, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    // Row 4.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 260, yPos - height / 2 + 215, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 195, yPos - height / 2 + 215, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 130, yPos - height / 2 + 215, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    // Row 5.
                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 260, yPos - height / 2 + 275, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.strokeStyle = "indigo";
                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 195, yPos - height / 2 + 275, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();

                    CONTEXT.beginPath();
                    CONTEXT.arc(xPos + 130, yPos - height / 2 + 275, 25, 0, 2 * Math.PI);
                    CONTEXT.stroke();
                }

            });
        this.isDescending = isDescending;
        this.c = concentration;
    }

    paint(context) {
        context.fillStyle = "gold";
        context.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Add string representation of this position's concentration.
        context.strokeStyle = "indigo";
        context.font = "10px Sylfaen";
        context.textAlign = "center";
        context.strokeText(this.c.toString(), this.x, this.y);
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

    // Paint the buttons on the canvas.
    startButton.paint(CONTEXT, "start-button");

    // Regiter the button as clickable items on the GUI.
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
    var pos1 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 30, 60, 30, false, 300);
    var pos2 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 80, 60, 30, false, 300);
    var pos3 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 130, 60, 30, false, 300);
    var pos4 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 180, 60, 30, false, 300);
    var pos5 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 230, 60, 30, false, 300);
    var pos6 = new Position(CANVAS.clientWidth / 8 * 5 + 50, CANVAS.clientHeight / 4 + 280, 60, 30, false, 300);

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

function removeDropDown() {
    CONTEXT.fillStyle = "dodgerblue";
    CONTEXT.fillRect(0, 0, CANVAS.clientWidth / 8 * 3 - 80, CANVAS.clientHeight);
    CONTEXT.fillRect(CANVAS.clientWidth / 8 * 5 + 80, 0, CANVAS.clientWidth, CANVAS.clientHeight);
}
