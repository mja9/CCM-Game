// Copyright © 2020 mja9

/**
 * Initialize the view for the simulation mode. 
 */
function initSimView() {

    // Clear menu intervals and listeners.
    window.clearInterval(titleScreenInterval);
    CANVAS.removeEventListener("mousemove", menuScrollHandler);

    // Initialize loop game objects
    initStateButtons();
    initDescendingLimb();
    initAscendingLimb();
    initInterstitialFluid();
    createSimButtons();

    // Paint the game board
    paintGameBoard();
    window.setInterval(paintGameBoard, 50);
}

/**
 * Creates the simulation control buttons.
 */
function createSimButtons() {

    // Create the start sim button.
    let simStartBtn = new Button(CANVAS.clientWidth * (13.0 / 16.0), CANVAS.clientHeight * (7.0 / 8.0), 100, 100, simStart, "sim-start");
    CLICKABLE.push(simStartBtn);
    ADDITIONALS.push(simStartBtn);

    // Create the stop sim button.
    let simStopBtn = new Button(CANVAS.clientWidth * (15.0 / 16.0), CANVAS.clientHeight * (7.0 / 8.0), 100, 100, simStop, "sim-stop");
    CLICKABLE.push(simStopBtn);
    ADDITIONALS.push(simStopBtn);
}