class TutorialModel {

    constructor(playModel) {
        this.playModel = playModel;
        this.font = "Hanken Light";
        this.loopIsSaved = false;
        const tutorial = this;
        this.skipBtn = new Button(1272, 666.5, 78, 57, 
            function() {
                tutorial.skipTutorial();
            }, 'skip');
        this.removeOnSkip = function() {};
        this.promptIntro = {
            paint: function() {
                let text = "- click anywhere or press the right arrow key to continue -";
                CONTEXT.fillStyle = "#0060ff";
                CONTEXT.font = "15pt " + this.font;
                CONTEXT.textAlign = "center";
                CONTEXT.textBaseline = "middle";
                CONTEXT.fillText(text, CANVAS.clientWidth / 2, CANVAS.clientHeight - 100);
            }
        };
        // this.promptTut = {
        //     paint: function() {
        //         let text = "- press the right arrow key to continue -";
        //         CONTEXT.fillStyle = "#0060ff";
        //         CONTEXT.font = "10pt " + this.font;
        //         CONTEXT.textAlign = "center";
        //         CONTEXT.textBaseline = "middle";
        //         CONTEXT.fillText(text, 247, 476);
        //     }
        // }
    }

    /**
     * Initialize the tutorial by displaying the first welcome message.
     */
    init() {

        // Add the skip tutorial button.
        mainDispatcher.add(this.skipBtn);
        CLICKABLE.push(this.skipBtn);

        this.displayWelcomeTutorial();
    }

    /**
     * Method to skip the tutorial and go straight to regular play.
     */
    skipTutorial() {
        const tutorial = this;

        // fade into the regular play.
        let fade = {
            v: 0.1,
            alpha: 0.0,
            move: function () {
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
            paint: function () {
                fade.move();
                let oldAlpha = CONTEXT.globalAlpha;
                CONTEXT.globalAlpha = fade.alpha;
                CONTEXT.fillStyle = "black";
                CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
                CONTEXT.globalAlpha = oldAlpha;
            },

            animationDecorator: function () {
                fade.animationDecorator = function () {};    // Avoid double-jeopardy.
                mainDispatcher.clear();

                // Perform additional removal function.
                tutorial.removeOnSkip();

                // Place the new game board behind the fade object.
                tutorial.playModel.view.switchBackground();
                mainDispatcher.add(tutorial.playModel.view);
                tutorial.playModel.view.init();
                tutorial.playModel.addButtons();
                tutorial.playModel.initBackButton();    // Allow player to go back to menu.
                tutorial.playModel.init();  // Initialize the clickable handler. 
                mainDispatcher.add(fade);

                fade.v = -0.1;
                fade.animationDecorator = function () {
                    fade.animationDecorator = function () { };    // Avoid double-jeopardy.
                    mainDispatcher.remove(fade);

                    // Perform the rest of the initialization.
                    tutorial.playModel.addMoveableHandler();
                    tutorial.playModel.initRegularGame();  
                }
            }
        };

        // Remove the skip btn from CLICKABLE.
        CLICKABLE.splice(CLICKABLE.indexOf(this.skipBtn), 1);

        mainDispatcher.add(fade);
    }

    /**
     * Handles the incoming animation, and click detection
     * for the first dialogue box.
     */
    displayWelcomeTutorial() {
        const tutorial = this;

        // The lines of text of the first dialogue box.
        const line1 = "Some 400 million years ago, our fishy ancestors transitioned from a life";
        const line2 = "in the sea to one on land. This drier environment presented a host";
        const line3 = "of new problems -- not least, water conservation during excretion.";
        const promptIntro = this.promptIntro;

        // Press anything event.
        function keyDownEvent1(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent1);
            document.removeEventListener("keydown", keyDownEvent1);     // Avoid re-trigger.
            tutorial.displayDialogueBox2(text);
        }

        // Create the blocking dialogue object, and display the second dialogue box
        // when user input is detected. Both dialogue boxes are shwon on the screen at once.
        let text = new BlockingDialogue([line1, line2, line3], CANVAS.clientWidth / 2, 206, 37, "20pt " + this.font);
        text.v = 0.02;
        text.animationDecorator = function () {
            text.animationDecorator = function () { };    // Avoid double-jeopardy. 
            document.addEventListener("keydown", keyDownEvent1);
            CANVAS.addEventListener("mousedown", keyDownEvent1);
            mainDispatcher.add(promptIntro);
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
        let text = new BlockingDialogue([line1, line2], CANVAS.clientWidth / 2, 350, 37, "20pt " + this.font);
        text.v = 0.1;

        // Press anything event.
        function keyDownEvent2(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent2);
            document.removeEventListener("keydown", keyDownEvent2);     // Avoid re-trigger.
            db1.v = - 0.1;
            text.v = -0.1;
            text.animationDecorator = function () {
                text.animationDecorator = function () { };    // Avoid double-jeopardy.
                mainDispatcher.removeAll([text, db1]);  // Remove the old objects.  
                tutorial.displayDialogueBox3();
            }
        }

        // Clear the screen then display dialogue 3 when detecting user input.
        text.animationDecorator = function () {
            text.animationDecorator = function () { };    // Avoid double-jeopardy.    
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
        const line1 = "That new structure is the loop of Henle,";
        const line2 = "nestled between the distal and proximal";
        const line3 = "convoluted tubules in the kidney.";

        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2, line3], CANVAS.clientWidth / 2, 206, 37, "20pt " + this.font);

        // Press anything event.
        function keyDownEvent3(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent3);
            document.removeEventListener("keydown", keyDownEvent3);     // Avoid re-trigger.
            tutorial.displayDialogueBox4(text);
        }

        // On input, dialogue 4 appears on the screen as well.
        text.v = 0.02;
        text.animationDecorator = function () {
            text.animationDecorator = function () { };    // Avoid double-jeopardy.
            document.addEventListener("keydown", keyDownEvent3);
            CANVAS.addEventListener("mousedown", keyDownEvent3);

        }
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation and click detection.
     * for dialogue 4. 
     * @param {BlockingDialogue} db3 Dialogue box 3 which appears at the same time as 4.
     */
    displayDialogueBox4(db3) {
        const tutorial = this;

        // Lines of text for dialogue 4.
        const line1 = "Fluid enters the loop around the same concentration as blood plasma.";
        const line2 = "As it flows through the loop, the concentration grows as an osmotic gradient";
        const line3 = "is created through countercurrent multiplication. The gradient ultimately draws";
        const line4 = "water out of urine leaving the body through the collecting duct, minimizing water loss.";

        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2, line3, line4], CANVAS.clientWidth / 2, 350, 37, "20pt " + this.font);
        text.v = 0.1;

        // Press anything event.
        function keyDownEvent4(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent4);
            document.removeEventListener("keydown", keyDownEvent4);     // Avoid re-trigger.
            tutorial.displayDialogueBox4Part2(db3, text);
        }

        // Clear the screen then display dialogue 3 when detecting user input.
        text.animationDecorator = function () {
            text.animationDecorator = function () { };    // Avoid double-jeopardy.    
            document.addEventListener("keydown", keyDownEvent4);
            CANVAS.addEventListener("mousedown", keyDownEvent4);
        };
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation, click detection, and outgoing 
     * animation for the additional paragraph in dialogue box 4.
     * Additionally handles the outgoing animation for dialogue boxes
     * 3 and 4.
     * @param {BlockingDialogue} db3 Dialogue box 3, which appears at the same time.
     * @param {BlockingDialogue} db4 Dialogue box 4 part 1, which appears at the same time.
     */
    displayDialogueBox4Part2(db3, db4) {
        const tutorial = this;

        // Lines of text for dialogue 4 part 2.
        const line1 = "This is necessary because active transport cannot directly generate";
        const line2 = "sufficient osmotic strength with which to concentrate urine.";

        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2], CANVAS.clientWidth / 2, 535, 37, "20pt " + this.font);
        text.v = 0.1;

        // Press anything event.
        function keyDownEvent4Part2(event) {
            CANVAS.removeEventListener("mouswdown", keyDownEvent4Part2);
            document.removeEventListener("keydown", keyDownEvent4Part2);     // Avoid re-trigger.
            db3.v = - 0.1;
            db4.v = -0.1;
            text.v = -0.1;
            text.animationDecorator = function () {
                text.animationDecorator = function () { };    // Avoid double-jeopardy.
                mainDispatcher.removeAll([text, db3, db4]);  // Remove the old objects.  
                tutorial.displayDialogueBox5();
            }
        }

        // Clear the screen then display dialogue 3 when detecting user input.
        text.animationDecorator = function () {
            text.animationDecorator = function () { };    // Avoid double-jeopardy.    
            document.addEventListener("keydown", keyDownEvent4Part2);
            CANVAS.addEventListener("mousedown", keyDownEvent4Part2);
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
        const line1 = "This game will teach you how countercurrent multiplication creates";
        const line2 = "a gradient of NaCl concentration. You will play the role of glomerular filtrate,";
        const line3 = "gaining and losing osmolarity as you move through the loop of Henle,";
        const line4 = "first descending into the medulla of the kidney and then ascending"
        const line5 = "back out toward the cortex."

        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2, line3, line4, line5], CANVAS.clientWidth / 2, 249, 37, "20pt " + this.font);

        // Press anything event.
        function keyDownEvent5(event) {
            CANVAS.removeEventListener("mouswdown", keyDownEvent5);
            document.removeEventListener("keydown", keyDownEvent5);     // Avoid re-trigger.
            text.v = -0.1;
            text.animationDecorator = function () {
                text.animationDecorator = function () { };    // Avoid double-jeopardy.
                mainDispatcher.removeAll([text]);  // Remove the old objects.  
                tutorial.displayDialogueBox5Half();
            }
        }

        text.v = 0.02;
        text.animationDecorator = function () {
            text.animationDecorator = function () {};    // Avoid double-jeopardy.
            document.addEventListener("keydown", keyDownEvent5);
            CANVAS.addEventListener("mousedown", keyDownEvent5);
        }
        mainDispatcher.add(text);
    }

    /**
     * Handles the incoming animation, click detection,
     * and ougoing animation of dialogue box 5 and a half.
     */
    displayDialogueBox5Half() {
        const tutorial = this;

        // Lines of text for dialogue 5.
        const line1 = "LEARNING GOAL: You will understand urine formation in mammals.";
        const line2 = "LEARNING OUTCOME: You will explain the mechanism used by the";
        const line3 = "mammalian kidney to concentrate urine."
        const prompt = this.promptIntro;
    
        // Add this dialogue box.
        let text = new BlockingDialogue([line1, line2, line3], CANVAS.clientWidth / 2, 249, 37, "20pt " + this.font);

        // On input, dialogue 6 appears on the screen as well.
        text.v = 0.02;
        text.animationDecorator = function () {
            text.animationDecorator = function () { };    // Avoid double-jeopardy.
            window.setTimeout(function () {
                tutorial.displayDialogueBox6();
                mainDispatcher.remove(prompt);
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
        let text = new BlockingDialogue([line1, line2], CANVAS.clientWidth / 2, 423, 37, "20pt " + this.font);
        text.alpha = 1.0;

        // Click anywhere to continue events.
        function keyDownEvent6(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent6);
            document.removeEventListener("keydown", keyDownEvent6);     // Avoid re-trigger.

            let fade = {
                v: 0.1,
                alpha: 0.0,
                move: function () {
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
                paint: function () {
                    fade.move();
                    let oldAlpha = CONTEXT.globalAlpha;
                    CONTEXT.globalAlpha = fade.alpha;
                    CONTEXT.fillStyle = "black";
                    CONTEXT.fillRect(0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
                    CONTEXT.globalAlpha = oldAlpha;
                },

                animationDecorator: function () {
                    fade.animationDecorator = function () { };    // Avoid double-jeopardy.
                    mainDispatcher.clear();

                    // Place the new game board behind the fade object.
                    tutorial.playModel.view.switchBackground();
                    mainDispatcher.add(tutorial.playModel.view);
                    tutorial.playModel.view.init();
                    tutorial.playModel.addButtons();
                    tutorial.playModel.initBackButton();    // Allow player to go back to menu.
                    tutorial.playModel.init();  // Initialize the clickable handler.
                    mainDispatcher.add(tutorial.skipBtn);
                    mainDispatcher.add(fade);

                    fade.v = -0.1;
                    fade.animationDecorator = function () {
                        fade.animationDecorator = function () { };    // Avoid double-jeopardy.
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
        const line1 = "Welcome to your kidney. Let's help you";
        const line2 = "get oriented and learn the rules of the";
        const line3 = "game.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent7(event) {

            // Do not allow left key to do anything.
            if (event.key == "ArrowRight") {
                document.removeEventListener("keydown", keyDownEvent7);     // Avoid re-trigger.

                // Clear the screen and display db 8.
                mainDispatcher.remove(text);
                tutorial.displayDialogueBox8();
            }
        }

        // On input display db8.
        document.addEventListener("keydown", keyDownEvent7);
        mainDispatcher.add(text);
        // mainDispatcher.add(this.promptTut);
    }

    /** 
     * Handles the display and click
     * detection for dialogue box 8.
     */
    displayDialogueBox8() {
        const tutorial = this;

        // Lines of text for db8.
        const line1 = "The structure to your right is the";
        const line2 = "$(white)loop of Henle$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent8(event) {
            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                document.removeEventListener("keydown", keyDownEvent8);     // Avoid re-trigger.
                mainDispatcher.remove(text);

                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox7();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox9();
                } 

            }
        }

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
        const line2 = "$(white)descending limb$";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Make the descending limb flash to highlight the subject of this dialogue box.
        D_LIMB.forEach(pos => {
            pos.setFlashState(1);
            pos.setFlash(0.05);
        });

        // If we press skip button here, remove descending limb flash.
        this.removeOnSkip = function() {
            D_LIMB.forEach(pos => pos.resetFlash());
        };

        // Press anything event.
        function keyDownEvent9(event) {
            
            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent9);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                D_LIMB.forEach(pos => pos.resetFlash());

                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox8();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox9Part2();
                } 
            }
        }

        // On input display db9 part 2.
        document.addEventListener("keydown", keyDownEvent9);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db9 part 2, where
     * the hairpin bend gets highlighted.
     */
    displayDialogueBox9Part2() {
        const tutorial = this;

        // Lines of text for db9.
        const line1 = "Fluid flows in through the";
        const line2 = "descending limb, around the";
        const line3 = "$(white)hairpin bend$";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Make the hairpin bend flash an animation.
        let bend = new HairpinBend();
        mainDispatcher.add(bend);

        // Press anything event.
        function keyDownEvent9Part2(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent9Part2);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                mainDispatcher.remove(bend);

                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox9();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox9Part3();
                } 
            }
        }

        // On input display db9 part 3.
        document.addEventListener("keydown", keyDownEvent9Part2);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db9 part 3, where
     * the ascending limb gets highlighted.
     */
    displayDialogueBox9Part3() {
        const tutorial = this;

        // Lines of text for db9.
        const line1 = "Fluid flows in through the";
        const line2 = "descending limb, around the";
        const line3 = "hairpin bend, then out through";
        const line4 = "the $(white)ascending limb$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Make the ascending limb flash to highlight the subject of this dialogue box.
        A_LIMB.forEach(pos => {
            pos.setFlashState(1);
            pos.setFlash(0.05);
        });

        // If we press skip button here, remove ascending limb flash.
        this.removeOnSkip = function() {
            A_LIMB.forEach(pos => pos.resetFlash());
        };

        // Press anything event.
        function keyDownEvent9Part3(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent9Part3);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                A_LIMB.forEach(pos => pos.resetFlash());
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox9Part2();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox10();
                } 
            }            
        }

        // On input display db10.
        document.addEventListener("keydown", keyDownEvent9Part3);
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
        const line2 = "$(white)interstitial fluid$, the liquid medium in";
        const line3 = "which the loop of Henle floats.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Flash the interstitial boxes to direct the player's attention.
        INTER_FLUID.forEach(pos => {
            pos.setFlashState(1);
            pos.setFlash(0.05);
        });

        // If we press skip button here, remove interstitial fluid flash.
        this.removeOnSkip = function() {
            INTER_FLUID.forEach(pos => pos.resetFlash());
        };

        // Press arrow keys to navigate tutorial.
        function keyDownEvent10(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent10);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                INTER_FLUID.forEach(pos => pos.resetFlash());
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox9Part3();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox11();
                } 
            }
        }

        // On input display db11.
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
        const line3 = "concentration, or $(white)osmotic pressure$, of";
        const line4 = "the interstitial fluid, which will ultimately"
        const line5 = "create concentrated urine in the";
        const line6 = "collecting duct."

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4, line5, line6], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Flash the concentrations.
        for (let i = 0; i < A_LIMB.length; i++) {
            A_LIMB[i].setFlashState(2);
            A_LIMB[i].setFlash(0.05);
            D_LIMB[i].setFlashState(2);
            D_LIMB[i].setFlash(0.05);
            INTER_FLUID[i].setFlashState(2);
            INTER_FLUID[i].setFlash(0.05);
        }

        // If we press skip button here, remove concentration flash.
        this.removeOnSkip = function() {
            for (let i = 0; i < A_LIMB.length; i++) {
                A_LIMB[i].resetFlash();
                D_LIMB[i].resetFlash();
                INTER_FLUID[i].resetFlash();
            }
        };

        // Press anything event.
        function keyDownEvent11(event) {
    
            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent11);     // Avoid re-trigger.
                mainDispatcher.remove(text);    
                for (let i = 0; i < A_LIMB.length; i++) {   // Remove concebtration flashes.
                    A_LIMB[i].resetFlash();
                    D_LIMB[i].resetFlash();
                    INTER_FLUID[i].resetFlash();
                }
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    for (let i = 0; i < A_LIMB.length; i++) {   // Remove concebtration flashes.
                        A_LIMB[i].resetFlash();
                        D_LIMB[i].resetFlash();
                        INTER_FLUID[i].resetFlash();
                    }
                    tutorial.displayDialogueBox10();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox12();
                } 
            }
        }

        // On input display db12.
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
        const line1 = "The osmotic pressure of fluid is";
        const line2 = "measured in $(white)milliosmolarity$ (mOsm) -- the";
        const line3 = "higher the number, the more";
        const line4 = "concentrated."

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Flash the concentrations.
        for (let i = 0; i < A_LIMB.length; i++) {
            A_LIMB[i].setFlashState(2);
            A_LIMB[i].setFlash(0.05);
            D_LIMB[i].setFlashState(2);
            D_LIMB[i].setFlash(0.05);
            INTER_FLUID[i].setFlashState(2);
            INTER_FLUID[i].setFlash(0.05);
        }

        // If we press skip button here, remove concentration flash.
        this.removeOnSkip = function() {
            for (let i = 0; i < A_LIMB.length; i++) {
                A_LIMB[i].resetFlash();
                D_LIMB[i].resetFlash();
                INTER_FLUID[i].resetFlash();
            }
        };

        // Press anything event.
        function keyDownEvent12(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent12);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                for (let i = 0; i < A_LIMB.length; i++) {   // Remove concebtration flashes.
                    A_LIMB[i].resetFlash();
                    D_LIMB[i].resetFlash();
                    INTER_FLUID[i].resetFlash();
                }
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox11();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox13();
                } 
            }
        }

        // On input display db13.
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
        const line1 = "The loop starts off at 300 mOsm,";
        const line2 = "the same osmolarity as your";
        const line3 = "blood plasma.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent13(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent13);     // Avoid re-trigger.
                mainDispatcher.remove(text);        
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox12();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox14();
                } 
            }
        }

        // On input display db14.
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
        const line1 = "Osmotic pressure of the interstitial";
        const line2 = "fluid can be increased by removing";
        const line3 = "salt or water from the loop.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent14(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent14);     // Avoid re-trigger.
                mainDispatcher.remove(text);        
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox13();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox15();        
                } 
            }
        }

        // On input display db15.
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
        const line1 = "The $(#f26c4f)salt$ and $(#0060ff)water$ icons allow you to";
        const line2 = "add or subtract a unit of $(white)50 mOsm$";
        const line3 = "from the corresponding box.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent15(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent15);     // Avoid re-trigger.
                mainDispatcher.remove(text);        
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox14();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox16();        
                } 
            }
        }

        // On input display db16.
        document.addEventListener("keydown", keyDownEvent15);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db16.
     */
    displayDialogueBox16() {
        const tutorial = this;

        // Lines of text for db16.
        const line1 = "Now that you know the loop's basic";
        const line2 = "anatomy and the features of the";
        const line3 = "game, let's start building the";
        const line4 = "gradient!";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent16(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent16);     // Avoid re-trigger.
                mainDispatcher.remove(text);        
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox15();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox17();
                } 
            }
        }

        // On input display db17.
        document.addEventListener("keydown", keyDownEvent16);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db17.
     */
    displayDialogueBox17() {
        const tutorial = this;

        // Lines of text for db17.
        const line1 = "First, the ascending limb will actively $(#ff5853)PUMP$";
        const line2 = "out solutes into the interstitial fluid, as its";
        const line3 = "walls are essentially $(white)impermeable$ to water.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Shadow animation of ascending limb salt moving.
        let grayed = [];
        for (let i = 0; i < A_LIMB.length; i++) {

            let saltCopy = new SaltIcon(A_LIMB[i].salt.startX + (A_LIMB[i].salt.w / 2), A_LIMB[i].salt.startY + (A_LIMB[i].salt.h / 2), A_LIMB[i]);

            // When shadow salt reaches the inter position, reset its position and velocity.
            saltCopy.animationDecorator = function () {
                saltCopy.x = saltCopy.startX;
                saltCopy.v = -10;
            };
            saltCopy.terminationCriteria = function () {
                if (saltCopy.x <= INTER_FLUID[i].x + (INTER_FLUID[i].w / 4.0)) {
                    return true;
                }
                return false;
            };
            saltCopy.v = -10;

            // Create grayed out version of the object and add it to dispatcher.
            let grayedSalt = new GrayOut(0.5, saltCopy);
            grayed.push(grayedSalt);
        }

        mainDispatcher.addAll(grayed);

        // Press anything event.
        function keyDownEvent17(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent17);     // Avoid re-trigger.
                mainDispatcher.remove(text);

                // Remove grayed out icon copy.
                mainDispatcher.removeAll(grayed);        
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox16();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox18();        
                } 
            }
        }

        // On input display db18.
        document.addEventListener("keydown", keyDownEvent17);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db18.
     */
    displayDialogueBox18() {
        const tutorial = this;

        // Lines of text for db18.
        const line1 = "However, the ascending limb and the";
        const line2 = "interstitial fluid $(white)cannot exceed a$";
        const line3 = "$(white)concentration difference of 200 mOsm$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent18(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent18);     // Avoid re-trigger.
                mainDispatcher.remove(text);        
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox17();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox19();        
                } 
            }
        }

        // On input display db19.
        document.addEventListener("keydown", keyDownEvent18);
        mainDispatcher.add(text);
    }


    /**
     * Handles the display and click
     * detection for db19.
     */
    displayDialogueBox19() {
        const tutorial = this;

        // Remove the skip button at this point.
        CLICKABLE.splice(CLICKABLE.indexOf(this.skipBtn), 1);
        mainDispatcher.remove(this.skipBtn);

        // Lines of text for db19.
        const line1 = "$(#0060ff)Drag the correct element$ into the";
        const line2 = "corresponding position in the interstitial";
        const line3 = "fluid until you've reduced the concentration";
        const line4 = "as much as possible."

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Add db19's subtext.
        const line5 = "Press the $(#0060ff)NEXT$ button when you are done, or the";
        const line6 = "$(#0060ff)RESET$ button to reset your concentration.";

        let subtext = new BlockingDialogue([line5, line6], 247, 660, 25, "12pt " + this.font);
        subtext.alpha = 1.0;

        // Press anything event.
        function keyDownEvent19(event) {

            if (event.key == "ArrowLeft") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent19);     // Avoid re-trigger.
                mainDispatcher.removeAll([text, subtext]);
                tutorial.playModel.removeMoveableHandler();
                tutorial.displayDialogueBox18();
        
            }
        }

        // On check display db20.
        this.playModel.addMoveableHandler();
        this.playModel.checkBtn.onClick = function () {
            if (tutorial.playModel.view.loop.validatePump()) {
                tutorial.playModel.checkBtn.onClick = function () { };
                tutorial.playModel.revertBtn.onClick = function () { };   // Avoid reverting after successful pump.
                document.removeEventListener("keydown", keyDownEvent19);     // Avoid re-trigger.
                mainDispatcher.removeAll([text, subtext]);
                tutorial.playModel.removeMoveableHandler();
                tutorial.loopIsSaved = false;   // Reset loop save tracking.
                tutorial.displayDialogueBox20();

            // Show the player which positions are wrong.
            } else {
                tutorial.playModel.view.loop.flashWrongPumps();
            }
        };

        // Only save the state of the loop when this is first reached!
        if (!this.loopIsSaved) {
            this.playModel.view.loop.save();    // Save the state for the revert button.
            this.loopIsSaved = true;
        }
        this.playModel.revertBtn.onClick = function () {
            tutorial.playModel.view.loop.revert();
        };
        document.addEventListener("keydown", keyDownEvent19);
        mainDispatcher.addAll([text, subtext]);
    }

    /**
     * Handles the display and click
     * detection for db20.
     */
    displayDialogueBox20() {
        const tutorial = this;

        // Lines of text for db20.
        const line1 = "Great job!";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent20(event) {

            if (event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent20);     // Avoid re-trigger.
                mainDispatcher.remove(text);            
        
                // Click left to go back and right to go forward.
                tutorial.displayDialogueBox21();
            }
        }

        // On input display db21.
        document.addEventListener("keydown", keyDownEvent20);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db21.
     */
    displayDialogueBox21() {
        const tutorial = this;

        // Lines of text for db21.
        const line1 = "Next, the descending limb will passively";
        const line2 = "$(#ffb829)EQUILIBRATE$ with the interstitial fluid to";
        const line3 = "match its concentration. Its walls are";
        const line4 = "$(white)permeable$ to water, so the fluid inside";
        const line5 = "becomes more concentrated as it loses water by";
        const line6 = "osmosis and sometimes gains salts by diffusion.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4, line5, line6], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Shadow animation for the water icon.
        let grayed = [];
        for (let i = 0; i < D_LIMB.length; i++) {

            let waterCopy = new WaterIcon(D_LIMB[i].water.startX - (D_LIMB[i].water.w / 2), D_LIMB[i].water.startY + (D_LIMB[i].water.h / 2), D_LIMB[i]);

            // When shadow salt reaches the inter position, reset its position and velocity.
            waterCopy.animationDecorator = function () {
                waterCopy.x = waterCopy.startX;
                waterCopy.v = 10;
            };
            waterCopy.terminationCriteria = function () {
                if (waterCopy.x >= INTER_FLUID[i].x - (INTER_FLUID[i].w / 4.0)) {
                    return true;
                }
                return false;
            };
            waterCopy.v = 10;

            // Create grayed out version of the object and add it to dispatcher.
            let grayedWater = new GrayOut(0.5, waterCopy);
            grayed.push(grayedWater);
        }
        mainDispatcher.addAll(grayed);

        // Press anything event.
        function keyDownEvent21(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent21);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                mainDispatcher.removeAll(grayed); // Remove shadow icon animation.            
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox20();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox22();        
                } 
            }
        }

        // On input display db22.
        document.addEventListener("keydown", keyDownEvent21);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db22.
     */
    displayDialogueBox22() {
        const tutorial = this;

        // Lines of text for db22.
        const line1 = "$(#0060ff)Drag the correct element$ into the";
        const line2 = "corresponding position in the interstitial";
        const line3 = "fluid until you've reached";
        const line4 = "equilibrium.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Add db22's subtext.
        const line5 = "Press the $(#0060ff)NEXT$ button when you are done, or the";
        const line6 = "$(#0060ff)RESET$ button to reset your concentration.";

        let subtext = new BlockingDialogue([line5, line6], 247, 660, 25, "12pt " + this.font);
        subtext.alpha = 1.0;

        // Press anything event.
        function keyDownEvent22(event) {
            if (event.key == "ArrowLeft") {
                document.removeEventListener("keydown", keyDownEvent22);     // Avoid re-trigger.
                mainDispatcher.removeAll([text, subtext]);
                tutorial.playModel.removeMoveableHandler();
                tutorial.displayDialogueBox21();
            }
        }

        // On input display db23.
        this.playModel.addMoveableHandler();    // Allow icons to be moved once again.
        this.playModel.checkBtn.onClick = function () {
            if (tutorial.playModel.view.loop.validateEquilibrate()) {
                tutorial.playModel.checkBtn.onClick = function () { };
                tutorial.playModel.revertBtn.onClick = function () { };
                document.removeEventListener("keydown", keyDownEvent22);     // Avoid re-trigger.
                mainDispatcher.removeAll([text, subtext]);
                tutorial.playModel.removeMoveableHandler();
                tutorial.loopIsSaved = false;   // Reset loop save tracking.
                tutorial.displayDialogueBox23();
            
            // Indicate wrong positions to the player.
            } else {
                tutorial.playModel.view.loop.flashWrongEquis();
            }
        };

        if (!this.loopIsSaved) {
            this.playModel.view.loop.save();    // Save loop state for revert button.
            this.loopIsSaved = true;
        }
        this.playModel.revertBtn.onClick = function () {
            tutorial.playModel.view.loop.revert();
        };
        document.addEventListener("keydown", keyDownEvent22);
        mainDispatcher.addAll([text, subtext]);
    }


    /**
     * Handles the display and click
     * detection for db23.
     */
    displayDialogueBox23() {
        const tutorial = this;

        // Lines of text for db23.
        const line1 = "You've set up all the concentrations";
        const line2 = "correctly! Now you can $(#0060ff)FLOW$ through the loop.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Add db23's subtext.
        const line3 = "Click $(#0060ff)NEXT$ to advance the fluid.";

        let subtext = new BlockingDialogue([line3], 247, 597, 25, "12pt " + this.font);
        subtext.alpha = 1.0;

        // Press anything event.
        function keyDownEvent23() {
            mainDispatcher.removeAll([text, subtext]);
            tutorial.displayDialogueBox24();
        }

        // On input display db24.
        this.playModel.checkBtn.onClick = function () {
            tutorial.playModel.checkBtn.onClick = function () { };
            tutorial.playModel.view.loop.flow(keyDownEvent23);
        };
        mainDispatcher.addAll([text, subtext]);
    }

    /**
     * Handles the display and click
     * detection for db24.
     */
    displayDialogueBox24() {
        const tutorial = this;

        // Lines of text for db24.
        const line1 = "One final thing -- the $(white)box$ above will";
        const line2 = "allow you to track your progress";
        const line3 = "building the gradient.";

        // Highlight the state box.
        this.playModel.view.sidebar.setVelocity(0.05);

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent24(event) {

            if (event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent24);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                tutorial.playModel.view.sidebar.resetFlash();   // Remove flash highlight animation.
                tutorial.displayDialogueBox25();                
            }
        }

        // On input display db25.
        document.addEventListener("keydown", keyDownEvent24);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db25.
     */
    displayDialogueBox25() {
        const tutorial = this;

        // Lines of text for db25.
        const line1 = "$(white)These$ will light up to signify what";
        const line2 = "stage of the process you are on,";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Highlight the state buttons.
        this.playModel.pumpButton.setFlashVelocity(0.05);
        this.playModel.equilibrateButton.setFlashVelocity(0.05);
        this.playModel.flowButton.setFlashVelocity(0.05);

        // Press anything event.
        function keyDownEvent25(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent25);     // Avoid re-trigger.
                mainDispatcher.remove(text);

                // Remove the flash animation.
                tutorial.playModel.pumpButton.resetFlash();
                tutorial.playModel.equilibrateButton.resetFlash();
                tutorial.playModel.flowButton.resetFlash();                
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox24();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox26();    
                } 
            }
        }

        // On input display db26.
        document.addEventListener("keydown", keyDownEvent25);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db26.
     */
    displayDialogueBox26() {
        const tutorial = this;

        // Lines of text for db26.
        const line1 = "These will light up to signify what";
        const line2 = "stage of the process you are on,";
        const line3 = "and $(white)this bar$ will track the maximum";
        const line4 = "concentration of your interstitial fluid.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Flash highlight of the maxbar.
        this.playModel.view.sidebar.maxbar.setFlashVelocity(0.05);

        // Press anything event.
        function keyDownEvent26(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent26);     // Avoid re-trigger.
                mainDispatcher.remove(text);
                tutorial.playModel.view.sidebar.maxbar.resetFlash();    // Remove the flash animation.
        
                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox25();
                } else if (event.key == "ArrowRight") {
                    tutorial.displayDialogueBox27();
                } 
            }
        }

        // On input display db26.
        document.addEventListener("keydown", keyDownEvent26);
        mainDispatcher.add(text);
    }

    /**
     * Handles the display and click
     * detection for db27.
     */
    displayDialogueBox27() {
        const tutorial = this;

        // Lines of text for db27.
        const line1 = "Now you will be $(white)restricted to your$";
        const line2 = "$(white)spot as a single unit of primary urine$.";
        const line3 = "Follow the loop's rules when it's your";
        const line4 = "turn, and watch how the gradient";
        const line5 = "builds.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4, line5], 247, 526, 30, "14pt " + this.font);
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent27(event) {

            if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
                
                // Shared actions fo rmoving back or forward.
                document.removeEventListener("keydown", keyDownEvent27);     // Avoid re-trigger.
                mainDispatcher.remove(text);

                // Click left to go back and right to go forward.
                if (event.key == "ArrowLeft") {
                    tutorial.displayDialogueBox26();
                } else if (event.key == "ArrowRight") {

                    // get rid of the skip tutorial button.
                    mainDispatcher.remove(tutorial.skipBtn);
                    CLICKABLE.splice(CLICKABLE.indexOf(tutorial.skipBtn), 1);

                    tutorial.playModel.addMoveableHandler();
                    tutorial.playModel.initRegularGame();  
                } 
            }
        }

        // On input display db26.
        document.addEventListener("keydown", keyDownEvent27);
        mainDispatcher.add(text);
    }

}