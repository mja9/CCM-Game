class TutorialModel {

    constructor(playModel) {
        this.playModel = playModel;
    }

    init() {
        this.displayWelcomeTutorial();
    }


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
        const line2 = "$(#ff5853)descending limb$";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Make the descending limb flash to highlight the subject of this dialogue box.
        D_LIMB.forEach(pos => {
            pos.setFlashState(1);
            pos.setFlash(0.05);
        });

        // Press anything event.
        function keyDownEvent9(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent9);
            document.removeEventListener("keydown", keyDownEvent9);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            D_LIMB.forEach(pos => pos.resetFlash());
            tutorial.displayDialogueBox9Part2();
        }

        // On input display db9 part 2.
        CANVAS.addEventListener("mousedown", keyDownEvent9);
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
        const line3 = "$(#ff5853)hairpin bend$";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Make the hairpin bend flash an animation.
        let bend = new HairpinBend();
        mainDispatcher.add(bend);

        // Press anything event.
        function keyDownEvent9Part2(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent9Part2);
            document.removeEventListener("keydown", keyDownEvent9Part2);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            mainDispatcher.remove(bend);
            tutorial.displayDialogueBox9Part3();
        }

        // On input display db9 part 3.
        CANVAS.addEventListener("mousedown", keyDownEvent9Part2);
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
        const line4 = "the $(#ff5853)ascending limb$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Make the ascending limb flash to highlight the subject of this dialogue box.
        A_LIMB.forEach(pos => {
            pos.setFlashState(1);
            pos.setFlash(0.05);
        });

        // Press anything event.
        function keyDownEvent9Part3(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent9Part3);
            document.removeEventListener("keydown", keyDownEvent9Part3);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            A_LIMB.forEach(pos => pos.resetFlash());
            tutorial.displayDialogueBox10();
        }

        // On input display db10.
        CANVAS.addEventListener("mousedown", keyDownEvent9Part3);
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
        const line2 = "$(#ff5853)interstitial fluid$, the liquid medium in";
        const line3 = "which the loop of Henle floats.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Flash the interstitial boxes to direct the player's attention.
        INTER_FLUID.forEach(pos => {
            pos.setFlashState(1);
            pos.setFlash(0.05);
        });

        // Press anything event.
        function keyDownEvent10(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent10);
            document.removeEventListener("keydown", keyDownEvent10);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            INTER_FLUID.forEach(pos => pos.resetFlash());
            tutorial.displayDialogueBox11();
        }

        // On input display db11.
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

        // Flash the concentrations.
        for (let i = 0; i < A_LIMB.length; i++) {
            A_LIMB[i].setFlashState(2);
            A_LIMB[i].setFlash(0.05);
            D_LIMB[i].setFlashState(2);
            D_LIMB[i].setFlash(0.05);
            INTER_FLUID[i].setFlashState(2);
            INTER_FLUID[i].setFlash(0.05);
        }

        // Press anything event.
        function keyDownEvent11(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent11);
            document.removeEventListener("keydown", keyDownEvent11);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            for (let i = 0; i < A_LIMB.length; i++) {
                A_LIMB[i].resetFlash();
                D_LIMB[i].resetFlash();
                INTER_FLUID[i].resetFlash();
            }
            tutorial.displayDialogueBox12();
        }

        // On input display db12.
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

        // On input display db13.
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

        // On input display db14.
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

        // On input display db15.
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

        // TODO: Flash the icons here.

        // Press anything event.
        function keyDownEvent15(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent15);
            document.removeEventListener("keydown", keyDownEvent15);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox16();
        }

        // On input display db16.
        CANVAS.addEventListener("mousedown", keyDownEvent15);
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
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent16(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent16);
            document.removeEventListener("keydown", keyDownEvent16);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox17();
        }

        // On input display db17.
        CANVAS.addEventListener("mousedown", keyDownEvent16);
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
        const line1 = "First, the ascending limb $(#ff5853)actively pumps$";
        const line2 = "$(#ff5853)out solutes$ into the interstitial fluid, as its";
        const line3 = "walls are $(#ff5853)impermeable$ to water.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // TODO: Shadow animation of salt moving.
        let saltCopy = new SaltIcon(A_LIMB[2].salt.startX, A_LIMB[2].salt.startY, A_LIMB[2]);
        saltCopy.animationDecorator = function() {
            saltCopy.x = saltCopy.startX;
            saltCopy.v = -10;
        };
        saltCopy.terminationCriteria = function() {
            if (saltCopy.x <= INTER_FLUID[2].x + (INTER_FLUID[2].w / 4.0)) {
                return true;
            }
            return false;
        };
        saltCopy.v = -10;
        let grayedSalt = new GrayOut(0.5, saltCopy);
        mainDispatcher.add(grayedSalt);

        // Press anything event.
        function keyDownEvent17(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent17);
            document.removeEventListener("keydown", keyDownEvent17);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            mainDispatcher.remove(grayedSalt);
            tutorial.displayDialogueBox18();
        }

        // On input display db18.
        CANVAS.addEventListener("mousedown", keyDownEvent17);
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
        const line2 = "interstitial fluid $(#0060ff)cannot exceed a$";
        const line3 = "$(#0060ff)concentration difference of 200 mOsm$.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent18(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent18);
            document.removeEventListener("keydown", keyDownEvent18);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox19();
        }

        // On input display db19.
        CANVAS.addEventListener("mousedown", keyDownEvent18);
        document.addEventListener("keydown", keyDownEvent18);
        mainDispatcher.add(text);
    }


    /**
     * Handles the display and click
     * detection for db19.
     */
    displayDialogueBox19() {
        const tutorial = this;

        // Lines of text for db19.
        const line1 = "$(#0060ff)Drag the correct element$ into the";
        const line2 = "corresponding position in the interstitial";
        const line3 = "fluid until you've reduced the concentration";
        const line4 = "as much as possible."

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Add db19's subtext.
        const line5 = "Press the $(#0060ff)next$ button when you are done, or the";
        const line6 = "$(#0060ff)retry$ button to reset your concentration.";

        let subtext = new BlockingDialogue([line5, line6], 247, 660, 25, "12pt Verdana");
        subtext.alpha = 1.0;

        // Press anything event.
        function keyDownEvent19() {
            CANVAS.removeEventListener("mousedown", keyDownEvent19);
            document.removeEventListener("keydown", keyDownEvent19);     // Avoid re-trigger.
            mainDispatcher.removeAll([text, subtext]);
            tutorial.playModel.removeMoveableHandler()
            tutorial.displayDialogueBox20();
        }

        // On check display db20.
        this.playModel.init();  // Initialize the clickable handler.
        this.playModel.addMoveableHandler();
        this.playModel.checkBtn.onClick = function() {
            if (tutorial.playModel.view.loop.validatePump()) {
                tutorial.playModel.checkBtn.onClick = function() {};
                tutorial.playModel.revertBtn.onClick = function() {};   // Avoid reverting after successful pump.
                keyDownEvent19();
            }
        };
        this.playModel.view.loop.save();    // Save the state for the revert button.
        this.playModel.revertBtn.onClick = function() {
            tutorial.playModel.view.loop.revert();
        };
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
        let text = new BlockingDialogue([line1], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent20(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent20);
            document.removeEventListener("keydown", keyDownEvent20);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox21();
        }

        // On input display db21.
        CANVAS.addEventListener("mousedown", keyDownEvent20);
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
        const line1 = "Next, the $(#ff5853)descending limb$ passively";
        const line2 = "equilibrates wth the interstitial fluid to";
        const line3 = "match its concentration. Its walls are";
        const line4 = "$(#ff5853)permeable$ to accomodate this";
        const line5 = "process.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4, line5], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent21(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent21);
            document.removeEventListener("keydown", keyDownEvent21);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox22();
        }

        // On input display db22.
        CANVAS.addEventListener("mousedown", keyDownEvent21);
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
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Add db22's subtext.
        const line5 = "Press the $(#0060ff)next$ button when you are done, or the";
        const line6 = "$(#0060ff)retry$ button to reset your concentration.";

        let subtext = new BlockingDialogue([line5, line6], 247, 660, 25, "12pt Verdana");
        subtext.alpha = 1.0;

        // Press anything event.
        function keyDownEvent22() {
            CANVAS.removeEventListener("mousedown", keyDownEvent22);
            document.removeEventListener("keydown", keyDownEvent22);     // Avoid re-trigger.
            mainDispatcher.removeAll([text, subtext]);
            tutorial.playModel.removeMoveableHandler();
            tutorial.displayDialogueBox23();
        }

        // On input display db23.
        this.playModel.addMoveableHandler();    // Allow icons to be moved once again.
        this.playModel.checkBtn.onClick = function() {
            if (tutorial.playModel.view.loop.validateEquilibrate()) {
                tutorial.playModel.checkBtn.onClick = function() {};
                tutorial.playModel.revertBtn.onClick = function() {};
                keyDownEvent22();
            }
        };
        this.playModel.view.loop.save();    // Save loop state for revert button.
        this.playModel.revertBtn.onClick = function() {
            tutorial.playModel.view.loop.revert();
        };
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
        const line2 = "correctly!";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Add db23's subtext.
        const line3 = "Click $(#0060ff)next$ to advance the fluid and";
        const line4 = "pass it through the loop.";

        let subtext = new BlockingDialogue([line3, line4], 247, 597, 25, "12pt Verdana");
        subtext.alpha = 1.0;

        // Press anything event.
        function keyDownEvent23() {
            CANVAS.removeEventListener("mousedown", keyDownEvent23);
            document.removeEventListener("keydown", keyDownEvent23);     // Avoid re-trigger.
            mainDispatcher.removeAll([text, subtext]);
            tutorial.displayDialogueBox24();
        }

        // On input display db24.
        this.playModel.checkBtn.onClick = function() {
            tutorial.playModel.checkBtn.onClick = function() {};
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
        const line1 = "One final thing -- the box above will";
        const line2 = "allow you to track your progress";
        const line3 = "building the gradient.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent24(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent24);
            document.removeEventListener("keydown", keyDownEvent24);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox25();
        }

        // On input display db25.
        CANVAS.addEventListener("mousedown", keyDownEvent24);
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
        const line1 = "$(#0060ff)These$ will light up to signify what";
        const line2 = "stage of the process you are on,";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent25(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent25);
            document.removeEventListener("keydown", keyDownEvent25);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox26();
        }

        // On input display db26.
        CANVAS.addEventListener("mousedown", keyDownEvent25);
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
        const line3 = "and $(#0060ff)this bar$ will track the maximum";
        const line4 = "concentration of your interstitial fluid.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent26(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent26);
            document.removeEventListener("keydown", keyDownEvent26);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.displayDialogueBox27();
        }

        // On input display db26.
        CANVAS.addEventListener("mousedown", keyDownEvent26);
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
        const line1 = "Now you will be restricted to your";
        const line2 = "spot as a single unit of primary urine.";
        const line3 = "Follow the loop's rules when it's your";
        const line4 = "turn, and watch how the gradient";
        const line5 = "builds.";

        // Add this dialogue box. 
        let text = new BlockingDialogue([line1, line2, line3, line4, line5], 247, 526, 30, "14pt Verdana");
        text.alpha = 1.0;

        // Press anything event.
        function keyDownEvent27(event) {
            CANVAS.removeEventListener("mousedown", keyDownEvent27);
            document.removeEventListener("keydown", keyDownEvent27);     // Avoid re-trigger.
            mainDispatcher.remove(text);
            tutorial.playModel.addMoveableHandler();
            tutorial.playModel.initRegularGame();
        }

        // On input display db26.
        CANVAS.addEventListener("mousedown", keyDownEvent27);
        document.addEventListener("keydown", keyDownEvent27);
        mainDispatcher.add(text);
    }

}