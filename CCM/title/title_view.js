class TitleView {
    
    constructor() {
        const view = this;

        // Fade object for menu exit animations.
        this.fade = {
            v: 0.1,
            alpha: 0.0,
            move: function() {
                view.fade.alpha += view.fade.v

                if (view.fade.alpha >= 1.0) {
                    view.fade.animationDecorator();
                    view.fade.alpha = 1.0;
                }
                else if (view.fade.alpha <= 0.0) {
                    view.fade.animationDecorator();
                    view.fade.alpha = 0.0;
                }
            },
            paint: function() {
                view.fade.move();
                let oldAlpha = CONTEXT.globalAlpha;
                CONTEXT.globalAlpha = view.fade.alpha;
                CONTEXT.fillStyle = "black";
                CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
                CONTEXT.globalAlpha = oldAlpha;
            },
        };

        // Create the title screen buttons.
        let regPlayBtn = new MenuButton(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * 0.63, 228, 25, 
            function() {
                // Lock user out of trigerring another click event.
                CLICKABLE = [];

                // Add the fade animation object.
                view.fade.animationDecorator = function() {
                    this.animationDecorator = function() {};
                    mainDispatcher.clear();
                    mainDispatcher.add(view.fade);   // Leave the fade object.
    
                    // Start the tutorial.
                    initGameTutorial();
                }
                mainDispatcher.add(view.fade);

                // Lock user out from triggering scroll over event.
                CANVAS.removeEventListener("mousemove", TitleModel.menuScrollHandler);

            }, "#0ba1e7", "play");

        let simPlayBtn = new MenuButton(CANVAS.clientWidth / 2.0, CANVAS.clientHeight * 0.74, 228, 25, 
                function() {

                    // Lock user out of trigerring another click event.
                    CLICKABLE = [];
                    mainDispatcher.clear();

                    // Lock user out from triggering scroll over event.
                    CANVAS.removeEventListener("mousemove", TitleModel.menuScrollHandler);

                    // TODO: Add the fade animation when entering the simulation portion of the game.
                    // Start the simulation.
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