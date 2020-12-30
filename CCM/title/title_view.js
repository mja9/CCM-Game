class TitleView {
    
    constructor(dispatcher) {

        // Create the title screen buttons.
        let regPlayBtn = new MenuButton(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * 0.63, 228, 25, 
            function() {
                console.log("Clicked start button!");

                // Lock user out of trigerring another click event.
                CLICKABLE = [];
                dispatcher.removeAll();

                // Start the tutorial.
                initGameTutorial();
            }, "#0ba1e7", "play");

        let simPlayBtn = new MenuButton(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * 0.74, 228, 25, 
                function() {
                    console.log("Clicked simulation button!");
                    CLICKABLE = [];

                    // Start the simulation.
                    initSimView();
                    initSimModel();
                }, "#0ba1e7", "simulate");

        // Regiter the button as clickable items on the GUI.
        CLICKABLE.push(regPlayBtn);
        CLICKABLE.push(simPlayBtn);

        // Add the buttons to the dispatcher.
        dispatcher.add(this);
        dispatcher.add(regPlayBtn);
        dispatcher.add(simPlayBtn);
    }

    /**
     * Method to paint the menu screen.
     */
    paint() {

        CONTEXT.drawImage(document.getElementById("menu-bg"), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    }

}