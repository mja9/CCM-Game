class TitleView {
    
    constructor() {

        // Create the title screen buttons.
        let regPlayBtn = new MenuButton(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * 0.63, 228, 25, 
            function() {
                console.log("Clicked start button!");

                // Lock user out of trigerring another click event.
                CLICKABLE = [];

                let fade = {
                    alpha: 0.0,
                    move: function() {
                        fade.alpha += 0.1

                        if (fade.alpha >= 1.0) {
                            fade.animationDecorator();
                            fade.animationDecorator = function() {};
                        }
                    },
                    paint: function() {
                        fade.move();
                        let oldAlpha = CONTEXT.globalAlpha;
                        CONTEXT.globalAlpha = fade.alpha;
                        CONTEXT.fillStyle = "black";
                        CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
                        CONTEXT.globalAlpha = oldAlpha;
                    },

                    // TODO: Fix the animation decorator so it can fade back in as well
                    animationDecorator: function() {
                        mainDispatcher.clear();
                        initGameTutorial();
                        mainDispatcher.add(fade);
                    }
                };
                mainDispatcher.add(fade);
                // mainDispatcher.clear();

                // Lock user out from triggering scroll over event.
                CANVAS.removeEventListener("mousemove", TitleModel.menuScrollHandler);

                // Start the tutorial.
                // initGameTutorial();
            }, "#0ba1e7", "play");

        let simPlayBtn = new MenuButton(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * 0.74, 228, 25, 
                function() {

                    // // Lock user out of trigerring another click event.
                    CLICKABLE = [];
                    mainDispatcher.clear();

                    // // Lock user out from triggering scroll over event.
                    CANVAS.removeEventListener("mousemove", TitleModel.menuScrollHandler);

                    // // Start the simulation.
                    initSimulation();
                }, "#0ba1e7", "simulate");

        // Regiter the button as clickable items on the GUI.
        CLICKABLE.push(regPlayBtn);
        CLICKABLE.push(simPlayBtn);

        // Add the buttons to the dispatcher.
        mainDispatcher.add(this);
        mainDispatcher.add(regPlayBtn);
        mainDispatcher.add(simPlayBtn);
    }

    /**
     * Method to paint the menu screen.
     */
    paint() {

        CONTEXT.drawImage(document.getElementById("menu-bg"), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);

    }

}