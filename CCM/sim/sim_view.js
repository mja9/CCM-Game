// Copyright © 2020 mja9

/**
 * Initialize the view for the simulation mode. 
 */
function initSimView() {

    // Clear menu intervals and listeners.
    window.clearInterval(titleScreenInterval);
    CANVAS.removeEventListener("mousemove", TitleModel.menuScrollHandler);

    // Initialize loop game objects
    initStateButtons();
    initDescendingLimb();
    initAscendingLimb();
    initInterstitialFluid();
    createSimButtons();

    // Paint the game board
    paintGameBoard();

    window.setInterval(function() {
        paintGameBoard();
    }, 50);
}

/**
 * Creates the simulation control buttons.
 */
function createSimButtons() {

    // Create the start sim button.
    let simStartBtn = new Button(94.5, 403.5, 39.0, 45.0, simStart, "sim-start");
    CLICKABLE.push(simStartBtn);
    ADDITIONALS.push(simStartBtn);

    // Create the stop sim button.
    let simStopBtn = new Button(172.0, 403.5, 26.0, 38.0, simStop, "sim-stop");
    CLICKABLE.push(simStopBtn);
    ADDITIONALS.push(simStopBtn);

    // Create the slow down button.
    let simSlowBtn = new Button(252.0, 403.5, 44.0, 45.0, function() {}, "sim-slow");
    CLICKABLE.push(simSlowBtn);
    ADDITIONALS.push(simSlowBtn);

    // Create the fast-forward button.
    let simFFBtn = new Button(342.0, 403.5, 44.0, 45.0, function() {}, "sim-fast");
    CLICKABLE.push(simFFBtn);
    ADDITIONALS.push(simFFBtn);

}