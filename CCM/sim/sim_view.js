// Copyright © 2020 mja9

/**
 * Initialize the view for the simulation mode. 
 */
function initSimView() {

    // Initialize loop game objects
    initStateButtons();
    initDescendingLimb();
    initAscendingLimb();
    initInterstitialFluid();

    // Paint the game board
    paintGameBoard();
    window.setInterval(paintGameBoard, 50);
}