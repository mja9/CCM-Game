class TutorialModel {

    constructor(playModel) {
        this.playModel = playModel;
    }

    init() {
        this.displayWelcomeTutorial();
    }

    pumpState(tutorial) {

        const model = tutorial.playModel;

        if (model.view.loop.validatePump()) {
            console.log("Successful pump!");

            // Disable the pump state button.
            model.checkBtn.onClick = function() {};

            // Animate and then enable the equi state button.
            model.pumpButton.v = -12.25;
            model.pumpButton.animationDecorator = function() {
                console.log("This was called!")
                model.equilibrateButton.v = 12.25;
                model.equilibrateButton.animationDecorator = function() {
                    model.checkBtn.onClick = function() {
                        tutorial.equiState(tutorial);
                    };
                };
            };

            // FIXME: Show pop up for equilibrate

        // FIXME: Add a useful error message here
        } else {
            console.log("Unsucessful pump!");
        }

    }

    equiState(tutorial) {

        const model = tutorial.playModel;

        if (model.view.loop.validateEquilibrate()) {
            console.log("Successful equilibration!");

            // Disable the equi button.
            model.checkBtn.onClick = function() {};

            // Animate and enable the flow button
            model.equilibrateButton.v = -12.25;
            model.equilibrateButton.animationDecorator = function() {
                model.flowButton.v = 12.25;
                model.flowButton.animationDecorator = function() {
                    model.checkBtn.onClick = function() {
                        console.log("Called the flow button's onCLick!");
                        tutorial.flowState(tutorial);
                    };
                };
            };

            // FIXME: Show pop up for flow
        
        // FIXME: Add a useful error message
        } else {
            console.log("Unsuccessful equilibration!")
        }

    }

    flowState(tutorial) {

        let animationDecorator = function() {
            tutorial.playModel.view.sidebar.maxbar.checkMax();
            tutorial.displayNowToRegularPlay();
        };
        tutorial.playModel.view.loop.flow(animationDecorator);
        
    }

    // FIXME: Rename.
    /**
     * Handles the incoming animation, and click detection
     * for the first dialogue box.
     */
    displayWelcomeTutorial() {
        const tutorial = this;

        // The lines of text of the first dialogue box.
        const line1 = "400 million years ago, our fishy ancestors transitioned from a life";
        const line2 = "in the sea to one on land. This drier environment presented a host";
        const line3 = "of new problems -- not least, water conservation during excretion.";

        // Press anything event.
        function keyDownEvent1(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent1);
            document.removeEventListener("keydown", keyDownEvent1);     // Avoid re-trigger.
            tutorial.displayDialogueBox2(text);
        }

        // Create the blocking dialogue object, and display the second dialogue box
        // when user input is detected. Both dialogue boxes are shwon on the screen at once.
        let text = new BlockingDialogue([line1, line2, line3], CANVAS.clientWidth / 2, 206, 37, "20pt Verdana");
        text.v = 0.02;
        text.animationDecorator = function() {
            text.animationDecorator = function() {};    // Avoid double-jeopardy. 
            document.addEventListener("keydown", keyDownEvent1);
            CANVAS.addEventListener("mousedown", keyDownEvent1);
        };
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation, click detection, 
     * and outgoing animation for dialogue 2. Also handles outging animation for dialogue box 1.
     * @param {BlockingDialogue} db1 Dialogue box 1 which appears at the same time as 2.
     */
    displayDialogueBox2(db1) {
        const tutorial = this;

        // Lines of text for dialogue 2.
        const line1 = "Mammals solved this problem by tinkering with the layout of the";
        const line2 = "vertebrate kidney -- through the addition of a new structure.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], CANVAS.clientWidth / 2, 350, 37, "20pt Verdana");
        text.v = 0.1;

        // Press anything event.
        function keyDownEvent2(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent2);
            document.removeEventListener("keydown", keyDownEvent2);     // Avoid re-trigger.
            db1.v = - 0.1;
            text.v = -0.1;
            text.animationDecorator = function() {
                text.animationDecorator = function() {};    // Avoid double-jeopardy.
                mainDispatcher.removeAll([text, db1]);  // Remove the old objects.  
                tutorial.displayDialogueBox3();
            }
        }

        // Clear the screen then display dialogue 3 when detecting user input.
        text.animationDecorator = function() {
            text.animationDecorator = function() {};    // Avoid double-jeopardy.    
            document.addEventListener("keydown", keyDownEvent2);
            CANVAS.addEventListener("mousedown", keyDownEvent2);  
        };
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation and click
     * detection for dialogue box 3.
     */
    displayDialogueBox3() {
        const tutorial = this;

        // Lines of text for dialogue 3.
        const line1 = "That new structure is the $(#ff5853)loop of Henle$,";
        const line2 = "nestled between the distal and proximal";
        const line3 = "convoluted tubules in the kidney.";

        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2, line3], CANVAS.clientWidth / 2, 206, 37, "20pt Verdana");

        // Press anything event.
        function keyDownEvent3(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent3);
            document.removeEventListener("keydown", keyDownEvent3);     // Avoid re-trigger.
            tutorial.displayDialogueBox4(text);
        }

        // On input, dialogue 4 appears on the screen as well.
        text.v = 0.02;
        text.animationDecorator = function() {
            text.animationDecorator = function() {};    // Avoid double-jeopardy.
            document.addEventListener("keydown", keyDownEvent3);
            CANVAS.addEventListener("mousedown", keyDownEvent3);

        }
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation, click detection, 
     * and outgoing animation for dialogue 4. 
     * Also handles outging animation for dialogue box 3.
     * @param {BlockingDialogue} db3 Dialogue box 3 which appears at the same time as 4.
     */
    displayDialogueBox4(db3) {
        const tutorial = this;

        // Lines of text for dialogue 4.
        const line1 = "Fluid enters at a low concentration. As it flows through the loop, the";
        const line2 = "concentration grows as an osmotic gradient is created through $(#ff5853)countercurrent$";
        const line3 = "$(#ff5853)multiplication.$ The gradient ultimately draws water out of urine leaving the";
        const line4 = "body through the collecting duct, minimizing water loss.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], CANVAS.clientWidth / 2, 350, 37, "20pt Verdana");
        text.v = 0.1;

        // Press anything event.
        function keyDownEvent4(event) {
            CANVAS.removeEventListener("mouswdown", keyDownEvent4);
            document.removeEventListener("keydown", keyDownEvent4);     // Avoid re-trigger.
            db3.v = - 0.1;
            text.v = -0.1;
            text.animationDecorator = function() {
                text.animationDecorator = function() {};    // Avoid double-jeopardy.
                mainDispatcher.removeAll([text, db3]);  // Remove the old objects.  
                tutorial.displayDialogueBox5();
            }
        }

        // Clear the screen then display dialogue 3 when detecting user input.
        text.animationDecorator = function() {
            text.animationDecorator = function() {};    // Avoid double-jeopardy.    
            document.addEventListener("keydown", keyDownEvent4); 
            CANVAS.addEventListener("mousedown", keyDownEvent4); 
        };
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation
     * and click detection for dialogue box 5.
     */
    displayDialogueBox5() {
        const tutorial = this;

        // Lines of text for dialogue 5.
        const line1 = "This game will teach you how countercurrent";
        const line2 = "multiplication works by allowing you to $(#ff5853)build your$";
        const line3 = "$(#ff5853)own osmotic gradient$ in the loop of Henle.";

        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2, line3], CANVAS.clientWidth / 2, 249, 37, "20pt Verdana");        

        // On input, dialogue 6 appears on the screen as well.
        text.v = 0.02;
        text.animationDecorator = function() {
            text.animationDecorator = function() {};    // Avoid double-jeopardy.
            window.setTimeout(function() { 
                tutorial.displayDialogueBox6();
            }, 100);
        }
        mainDispatcher.add(text);
    }

    /**
     * Handle sthe incoming animation, click detection, 
     * and the transition out of the preface.
     */
    displayDialogueBox6() {
        const tutorial = this;

        // Lines of text for dialogue 6.
        const line1 = "$(#0060ff)When you are ready to play, press space or click$";
        const line2 = "$(#0060ff)anywhere to enter the tutorial.$";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], CANVAS.clientWidth / 2, 423, 37, "20pt Verdana");
        text.alpha = 1.0;

        // Click anywhere to continue events.
        function keyDownEvent6(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent6);
            document.removeEventListener("keydown", keyDownEvent6);     // Avoid re-trigger.

                let fade = {
                    v: 0.1,
                    alpha: 0.0,
                    move: function() {
                        fade.alpha += fade.v
        
                        if (fade.alpha >= 1.0) {
                            fade.animationDecorator();
                            fade.alpha = 1.0;
                        }
                        else if (fade.alpha <= 0.0) {
                            fade.animationDecorator();
                            fade.alpha = 0.0;
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

                    animationDecorator: function() {
                        fade.animationDecorator = function() {};    // Avoid double-jeopardy.
                        mainDispatcher.clear();

                        // Place the new game board behind the fade object.
                        tutorial.playModel.view.switchBackground();
                        mainDispatcher.add(tutorial.playModel.view);
                        tutorial.playModel.view.init();
                        tutorial.playModel.addButtons();
                        mainDispatcher.add(fade);

                        fade.v = -0.1;
                        fade.animationDecorator = function() {
                            fade.animationDecorator = function() {};    // Avoid double-jeopardy.
                            mainDispatcher.remove(fade);
                            tutorial.displayDialogueBox7();
                        }
                    }
                };
                mainDispatcher.add(fade);
        };

        // Clear the screen then display the loop of Henle.
        document.addEventListener("keydown", keyDownEvent6);
        CANVAS.addEventListener("mousedown", keyDownEvent6);  
        mainDispatcher.add(text);
    }

    // Handles the display and click 
    // detection for dialogue box 7.
    displayDialogueBox7() {
        const tutorial = this;

        // Lines of text for dialogue box 7.
        const line1 = "Welcome to your kindey. Let's help you";
        const line2 = "get oriented and learn the rules of the";
        const line3 = "game.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent7(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent7)
            document.removeEventListener("keydown", keyDownEvent7);     // Avoid re-trigger.

            // Clear the screen and display db 8.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox8();
        }

        // On input display db8.
        document.addEventListener("keydown", keyDownEvent7);
        CANVAS.addEventListener("mousedown", keyDownEvent7);
        mainDispatcher.add(text);
    }

    /** 
     * Handles the display and click
     * detection for dialogue box 8.
     */
    displayDialogueBox8() {
        const tutorial = this;

        // Lines of text for db8.
        const line1 = "The structure to your right is the";
        const line2 = "$(#ff5853)loop of Henle$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent8(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent8);
            document.removeEventListener("keydown", keyDownEvent8);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox9();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent8);
        document.addEventListener("keydown", keyDownEvent8);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db9.
     */
    displayDialogueBox9() {
        const tutorial = this;

        // Lines of text for db9.
        const line1 = "Fluid flows in through the";
        const line2 = "$(#ff5853)descending limb$, around the";
        const line3 = "hairpin bend, then out through";
        const line4 = "the $(#ff5853)ascending limb$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent9(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent9);
            document.removeEventListener("keydown", keyDownEvent9);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox10();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent9);
        document.addEventListener("keydown", keyDownEvent9);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db10.
     */
    displayDialogueBox10() {
        const tutorial = this;

        // Lines of text for db10.
        const line1 = "The boxes in the middle represent the";
        const line2 = "$(#ff5853)interstitial fluid$, the liquid medium in";
        const line3 = "which the loop of Henle floats.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent10(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent10);
            document.removeEventListener("keydown", keyDownEvent10);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox11();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent10);
        document.addEventListener("keydown", keyDownEvent10);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db11.
     */
    displayDialogueBox11() {
        const tutorial = this;

        // Lines of text for db11.
        const line1 = "The goal of countercurrent";
        const line2 = "multiplication is to increase the";
        const line3 = "concentration, or $(#ff5853)osmotic potential$, of";
        const line4 = "the interstitial fluid, which will create"
        const line5 = "concentrated urine in the collecting";
        const line6 = "duct."

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4, line5, line6], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent11(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent11);
            document.removeEventListener("keydown", keyDownEvent11);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox12();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent11);
        document.addEventListener("keydown", keyDownEvent11);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db12.
     */
    displayDialogueBox12() {
        const tutorial = this;

        // Lines of text for db12.
        const line1 = "The osmotic potential of fluid is";
        const line2 = "measured in $(#ff5853)milliosmoles$ (mOsm) -- the";
        const line3 = "higher the number, the more";
        const line4 = "concentrated."

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent12(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent12);
            document.removeEventListener("keydown", keyDownEvent12);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox13();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent12);
        document.addEventListener("keydown", keyDownEvent12);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db13.
     */
    displayDialogueBox13() {
        const tutorial = this;

        // Lines of text for db13.
        const line1 = "The loop starts off at a homogeneous";
        const line2 = "300 mOsm, the same as your blood";
        const line3 = "plasma.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent13(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent13);
            document.removeEventListener("keydown", keyDownEvent13);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox14();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent13);
        document.addEventListener("keydown", keyDownEvent13);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db14.
     */
    displayDialogueBox14() {
        const tutorial = this;

        // Lines of text for db14.
        const line1 = "Osmotic potential of the interstitial";
        const line2 = "fluid can be increased by removing";
        const line3 = "salt or water from the loop.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent14(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent14);
            document.removeEventListener("keydown", keyDownEvent14);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox15();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent14);
        document.addEventListener("keydown", keyDownEvent14);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db15.
     */
    displayDialogueBox15() {
        const tutorial = this;

        // Lines of text for db15.
        const line1 = "The $(#ff5853)salt$ and $(#0060ff)water$ icons allow you to";
        const line2 = "add or subtract a unit of $(#ff5853)50 mOsm$";
        const line3 = "from the corresponding box.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent15(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent15);
            document.removeEventListener("keydown", keyDownEvent15);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox16();
        }

        // On input display db9.
        CANVAS.addEventListener("mousedown", keyDownEvent15);
        document.addEventListener("keydown", keyDownEvent15);
        mainDispatcher.add(text);
    }
    
    // TODO: Fix this transition!
    displayNowToRegularPlay() {
        var oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
        CLICKABLE = [];
        const model = this.playModel;
    
        var regularPlayPopUp = new PopUp(665.0, 328.0, 700, 300, [], 
        new Button(665.0, 404.0, 150, 70, 
            function() {
                CLICKABLE = oldClickable;
                mainDispatcher.remove(regularPlayPopUp);
                CONTEXT.globalAlpha = 1.0;

                model.initRegularGame();
            }, "ok-button"), "end-tutorial");
    
        CONTEXT.globalAlpha = 0.35;
        mainDispatcher.add(regularPlayPopUp);
    
    }

}