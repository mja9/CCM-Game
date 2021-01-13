class PlayModel {

    constructor(playView) {

        // Create state buttons.
        this.pumpButton = new StateButton(194.0, 175.0, 256, 60, function(){}, "255, 88, 83");
        this.equilibrateButton = new StateButton(194.0, 240.0, 256, 60, function() {}, "255, 184, 41");
        this.flowButton = new StateButton(194.0, 305.0, 256, 60, function() {}, "49, 177, 238");
        mainDispatcher.addAll([this.pumpButton, this.equilibrateButton, this.flowButton]);
        this.tutorial = new TutorialModel(this);
        this.view = playView;
    }

    init() {
        // Initialize click, moveable, and drag n' drop handlers.
        this.initStateButtons();
        this.initPlayButtons();
        this.initAscendingLimb();
        this.initDescendingLimb();
        this.initInterstitialFluid();

        // Initialize the tutorial.
        this.tutorial.displayWelcomeTutorial();
    }

    initPlayButtons() {
        
        this.checkBtn = new Button(289, 408, 62, 54, function(){}, "check");
        CLICKABLE.push(this.checkBtn);

        this.revertBtn = new Button(142.5, 409.5, 61, 59, function(){}, "replay");
        CLICKABLE.push(this.checkBtn);
        mainDispatcher.addAll([this.checkBtn, this.revertBtn]);

    }

    initStateButtons() {

        // Pump button.
        CLICKABLE.push(this.pumpButton);
    
        // Equilibrate button.
        CLICKABLE.push(this.equilibrateButton);
    
        // Flow button.
        CLICKABLE.push(this.flowButton);
    
    }

    initDescendingLimb() {

        D_LIMB.forEach(pos => {
            MOVEABLE.push(pos.salt);
            MOVEABLE.push(pos.water);
        });
    
    }
    
    initAscendingLimb() {
    
        A_LIMB.forEach(pos => {
            MOVEABLE.push(pos.salt);
            MOVEABLE.push(pos.water);
        });
    
    }

    initInterstitialFluid() {

        INTER_FLUID.forEach(pos => {
            DROPPABLE.push(pos);
        });
    
    }

    /**
     * This function defines the event handler for moveable objects 
     * during the tutorial and regular play for the game. 
     * This handler places no restrictions on the limb position from 
     * which a player can trigger drag and drop events when inTutotial
     * is true. 
     * @param {MouseEvent} event A mousedown event on the CANVAS used to decide whether a 
     *                  player is attempting to drag a moveable item.
     */
    moveableHandler(event) {

        // Get click location relative to canvas.
        var xPos = event.offsetX;
        var yPos = event.offsetY;

        // Check each moveable item.
        for (i = 0; i < MOVEABLE.length; i++) {

            // This moveable item.
            let moveable = MOVEABLE[i];

            // Check if mousedown on a moveable item.
            if (xPos >= moveable.x - moveable.w / 2 && xPos <= moveable.x + moveable.w / 2) {

                // Check y-position.
                if (yPos >= moveable.y - moveable.h / 2 && yPos <= moveable.y + moveable.h / 2) {

                    // Prioritize the painting of this icon.
                    mainDispatcher.remove(moveable);
                    mainDispatcher.add(moveable);

                    // TODO: Need to maintain a notion of this.
                    if (inTutorial) {   // Moveable handler for tutorial only.

                        // Highlight selected limb position.
                        moveable.limbPos.isSelected = true;

                        // Removing salt from system reduces concentration.
                        if (moveable.id == "salt") {
                            moveable.limbPos.c -= 50;

                        // Remove water from system increases concentration.
                        } else {
                            moveable.limbPos.c += 50;
                        }
                        PlayModel.addDragNDropHandler(moveable, moveable.x - xPos, moveable.y - yPos);

                    } else if (moveable.limbPos.isSelected) {   // Moveable handler for regular gameplay.

                        // Removing salt from system reduces concentration.
                        if (moveable.id == "salt") {
                            moveable.limbPos.c -= 50;

                        // Remove water from system increases concentration.
                        } else {
                            moveable.limbPos.c += 50;
                        }
                        PlayModel.addDragNDropHandler(moveable, moveable.x - xPos, moveable.y - yPos);
                        
                    }

                }

            }

        }
    }

    addMoveableHandler() {
        CANVAS.addEventListener("mousedown", this.moveableHandler);
    }

    removeMoveableHandler() {
        CANVAS.removeEventListener("mousedown", this.moveableHandler);
    }

    static addDragNDropHandler(moveable, dragOffsetX, dragOffsetY) {
    
        var drag = function(event) {
    
            // Get event location.
            let xPos = event.offsetX;
            let yPos = event.offsetY;
    
            // Change location of moveable item.
            moveable.x = xPos + dragOffsetX;
            moveable.y = yPos + dragOffsetY;
    
            // Block water movement if in the ascending limb.
            if (moveable.id == "water" && moveable.limbPos.x > LOOP_OF_HENLE.x) {
    
                // Check if we are trying to move water past the wall of the ascending limb.
                if (moveable.x - moveable.w / 2 <= moveable.limbPos.x - (moveable.limbPos.w / 2.0)) {
                    moveable.x = moveable.limbPos.x - moveable.limbPos.w / 2 + moveable.w / 2;
                } else if (moveable.x + moveable.w / 2 >= moveable.limbPos.x + (moveable.limbPos.w / 2.0)) {
                    moveable.x = moveable.limbPos.x + moveable.limbPos.w / 2 - moveable.w / 2;
                }
            }
    
            // Block salt movement in the descending limb.
            if (moveable.id == "salt" && moveable.limbPos.x < LOOP_OF_HENLE.x) {
    
                // Check if we are trying to move salt past the wall of the descending limb.
                if (moveable.x - moveable.w / 2 <= moveable.limbPos.x - (moveable.limbPos.w / 2.0)) {
                    moveable.x = moveable.limbPos.x - moveable.limbPos.w / 2 + moveable.w / 2;
                } else if (moveable.x + moveable.w / 2 >= moveable.limbPos.x + (moveable.limbPos.w / 2.0)) {
                    moveable.x = moveable.limbPos.x + moveable.limbPos.w / 2 - moveable.w / 2;
                }
    
            }
    
       };
    
       var drop = function() {
        
            // Get event location.
            let xPos = moveable.x;
            let yPos = moveable.y;
    
            // Check if item was dropped in a droppable.
            var canDrop = false;
            DROPPABLE.forEach(droppable => {
    
                // Check x position.
                if (xPos >= droppable.x - droppable.w / 2 && xPos <= droppable.x + droppable.w / 2) {
    
                    if (yPos >= droppable.y - droppable.h / 2 && yPos <= droppable.y + droppable.h / 2) {
    
                        // Can only change concentration of fluid adjacent to limb position.
                        if ((moveable.limbPos.y > droppable.y - droppable.h / 2) && (moveable.limbPos.y < droppable.y + droppable.h / 2)) {
                            canDrop = true;
    
                            // Interstitial fluid concentration only changes with the addition of salt.
                            if (moveable.id == "salt") {
                                droppable.c += 50;
                            }
                        }
                        
                    }
    
                }
    
            });
    
            // If item dropped elsewhere, reset concentration of limb position.
            if (!canDrop) {
                if (moveable.id == "salt") {
                    moveable.limbPos.c += 50;
                } else {
                    moveable.limbPos.c -= 50;
                }
            }
    
            // Reset position.
            moveable.x = moveable.startX;
            moveable.y = moveable.startY;
        
            // Remove highlight from selected position in tutorial version.
            if (inTutorial) {
                moveable.limbPos.isSelected = false;
            }
        
            PlayModel.removeDragHandler(drag, drop);
        
        };
    
    
        // Add dragging event.
        CANVAS.addEventListener("mousemove", drag);
    
        // Add drop event.
        CANVAS.addEventListener("mouseup", drop);
    
    }
    
    static removeDragHandler(drag, drop) {
        
        // Remove dragging event.
        CANVAS.removeEventListener("mousemove", drag);
    
        // Remove drop event.
        CANVAS.removeEventListener("mouseup", drop);
    
    }

    initRegularGame() {
        // Choose starting limb position.
        D_LIMB[2].isSelected = true;
        this.playerPosition = 3;

        // Transition to pump and begin AI.
        this.transitionState();
    }

    transitionState() {
        const model = this;
        switch(this.state) {

            case "Pump":
                console.log("Pump to equilibrate transition was called!");
                this.state = "Equilibrate";    
                this.pumpButton.animationDecorator = function() {
                    model.equilibrateButton.animationDecorator = function() {
                        model.startAI();
                    };
                    model.equilibrateButton.v = 12.25;
                };
                this.pumpButton.v = -12.25;
                break;

            case "Equilibrate":
                console.log("Equilibrate to flow transition was called!");
                this.state = "Flow";
                this.equilibrateButton.animationDecorator = function() {
                    model.flowButton.animationDecorator = function() {
                        console.log("The flow state button decorator was called!");
                        model.startAI();
                    }
                    model.flowButton.v = 12.25;
                };
                this.equilibrateButton.v = -12.25;
                break;

            default:
                console.log("Default transition was called!");
                this.state = "Pump";
                this.flowButton.animationDecorator = function() {
                    model.pumpButton.animationDecorator = function() {
                        model.startAI();
                    }
                    model.pumpButton.v = 12.25;
                };
                this.flowButton.v = -12.25;
                break;

        }
    }

    movePlayer() {

        // Crossing limbs case.
        if (this.playerPosition == 6) {
            D_LIMB[D_LIMB.length - 1].isSelected = false;
            A_LIMB[A_LIMB.length - 1].isSelected = true;
            this.playerPosition += 1;
        }

        // End of regular play case.
        else if (this.playerPosition == 12) {
            this.gameOver();
        }

        // Descending limb case.
        else if (this.playerPosition < 6) {
            D_LIMB[this.playerPosition - 1].isSelected = false;
            D_LIMB[this.playerPosition].isSelected = true;
            this.playerPosition += 1;
        }

        // Ascending limb case.
        else {
            A_LIMB[A_LIMB.length - (this.playerPosition % 6)].isSelected = false;
            A_LIMB[A_LIMB.length - (this.playerPosition % 6) - 1].isSelected = true;
            this.playerPosition += 1;
        }

    }

    startAI() {
        const model = this;
        switch(this.state) {

            case "Pump":
                console.log("Pump AI starting...");
                if (!this.view.loop.validatePump()) {

                    // Check for the player's turn.
                    let isPlayer = false;
                    let sum = 0;
                    for (let i = 0; i < A_LIMB.length; i++) {
                        if (!this.view.loop.checkPump(i)) {
                            sum++;
                            if (A_LIMB[i].isSelected) {
                                isPlayer = true;
                            }
                        }
                    }

                    if (isPlayer && sum === 1) {
                        console.log("Nothing else to pump")
                        this.pauseAI();
                    } else {
                        console.log("Pumping...");
                        this.animatePump();
                    }

                } else {
                    console.log("Nothing else to pump")
                    this.pauseAI();
                }
                break;

            case "Equilibrate":
                console.log("Equilibrate AI starting...");
                if (!this.view.loop.validateEquilibrate()) {

                    // Check for the player's turn.
                    let isPlayer = false;
                    let sum = 0;
                    for (let i = 0; i < D_LIMB.length; i++) {
                        if (!this.view.loop.checkEqui(i)) {
                            sum++;
                            if (D_LIMB[i].isSelected) {
                                isPlayer = true;
                            }
                        }
                    }
                    
                    if (isPlayer && sum === 1) {
                        console.log("Nothing else to equilibrate")
                        this.pauseAI();
                    } else {
                        console.log("Equilibrating...");
                        this.animateEquilibrate();
                    }

                } else {
                    console.log("Nothing else to equilibrate!");
                    this.pauseAI();
                }
                break;

            case "Flow":
                console.log("Flow AI starting...");
                model.view.loop.clearDecorators();
                this.view.loop.flow(function() {
                    model.view.sidebar.maxbar.checkMax();
                    model.movePlayer();
                    model.transitionState();
                });
                break;

        }
    }

    pauseAI() {
        const model = this;
        if (this.state == "Equilibrate" && this.playerPosition <= 6) {

            // Player equilibrates.
            this.checkBtn.onClick = function() {
                if (model.view.loop.validateEquilibrate()) {
                    model.transitionState();
                }
            };

        } else if (this.state == "Pump" && this.playerPosition > 6) {

            // PLayer pumps.
            this.checkBtn.onClick = function() {
                if (model.view.loop.validatePump()) {
                    model.transitionState();
                }
            }
        }

        else {
            console.log("Transitioning states instead...");
            this.transitionState();
        }

    }

    animatePump() {
        const model = this;
        let needPump = A_LIMB.map(function(pos, i) {
            return !model.view.loop.checkPump(i) && !pos.isSelected;
        });
        let lastOccurence = needPump.lastIndexOf(true);    // Maintain refernece to last occurence to continue pump.
        needPump[lastOccurence] = false;

        for (let i = 0; i < needPump.length; i++) {

            if (needPump[i]) {

                A_LIMB[i].salt.terminationCriteria = function(icon) {
                    if (icon.x <= INTER_FLUID[i].x + (INTER_FLUID[i].w / 4.0)) {
                        return true;
                    }
                    return false;
                } 
                A_LIMB[i].salt.animationDecorator = function() {
                    INTER_FLUID[i].c += 50;
                    A_LIMB[i].salt.x =  A_LIMB[i].salt.startX;
                    A_LIMB[i].salt.y =  A_LIMB[i].salt.startY;
                }

                // Set the velocity and alter limb concentration.
                A_LIMB[i].salt.v = -10;
                A_LIMB[i].c -= 50;

            }

        }
        
        // Do the same for the last occurence.
        A_LIMB[lastOccurence].salt.terminationCriteria = function(icon) {
            if (icon.x <= INTER_FLUID[lastOccurence].x + (INTER_FLUID[lastOccurence].w / 4.0)) {
                return true;
            }
            return false;
        } 
        A_LIMB[lastOccurence].salt.animationDecorator = function() {
            INTER_FLUID[lastOccurence].c += 50;
            A_LIMB[lastOccurence].salt.x =  A_LIMB[lastOccurence].salt.startX;
            A_LIMB[lastOccurence].salt.y =  A_LIMB[lastOccurence].salt.startY;
            A_LIMB[lastOccurence].salt.animationDecorator = function() {};  // One-time use.
            model.startAI();     // Continue the engine AI.
        }

        A_LIMB[lastOccurence].salt.v = -10;
        A_LIMB[lastOccurence].c -= 50;        
    }

    animateEquilibrate() {
        const model = this;
        let needEquilibrate = D_LIMB.map(function(pos, i) {
            return !model.view.loop.checkEqui(i) && !pos.isSelected;
        });
        let lastOccurence = needEquilibrate.lastIndexOf(true);    // Maintain refernece to last occurence to continue pump.
        needEquilibrate[lastOccurence] = false;
        
        for (let i = 0; i < needEquilibrate.length; i++) {

            if (needEquilibrate[i]) {

                D_LIMB[i].water.terminationCriteria = function(icon) {
                    if (icon.x >= INTER_FLUID[i].x - (INTER_FLUID[i].w / 4.0)) {
                        return true;
                    }
                    return false;
                } 
                D_LIMB[i].water.animationDecorator = function() {
                    D_LIMB[i].water.x =  D_LIMB[i].water.startX;
                    D_LIMB[i].water.y =  D_LIMB[i].water.startY;
                }

                // Set the velocity and alter limb concentration.
                D_LIMB[i].water.v = 10;
                D_LIMB[i].c += 50;

            }

        }
        
        // Do the same for the last occurence.
        D_LIMB[lastOccurence].water.terminationCriteria = function(icon) {
            if (icon.x >= INTER_FLUID[lastOccurence].x - (INTER_FLUID[lastOccurence].w / 4.0)) {
                return true;
            }
            return false;
        } 
        D_LIMB[lastOccurence].water.animationDecorator = function() {
            D_LIMB[lastOccurence].water.x =  D_LIMB[lastOccurence].water.startX;
            D_LIMB[lastOccurence].water.y =  D_LIMB[lastOccurence].water.startY;
            A_LIMB[lastOccurence].salt.animationDecorator = function() {};  // One-time use.
            model.startAI();     // Continue the engine AI.
        }

        D_LIMB[lastOccurence].water.v = 10;
        D_LIMB[lastOccurence].c += 50;
    }

    gameOver() {
        // Don't let the player interact with anything else.
        CLICKABLE = [];
        MOVEABLE = [];
        DROPPABLE = [];  

        // Display goodbye box.
        const goodbye = 
        {
            paint() {
                CONTEXT.drawImage(document.getElementById("goodbye-box"), 215, 75, 900, 580);
            }
        }
        mainDispatcher.add(goodbye);
    }

}

class TutorialModel {

    constructor(playModel) {
        this.playModel = playModel;
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

    displayWelcomeTutorial() {
        let oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
        CLICKABLE = [];
        const model = this.playModel;
        const tutorial = this;
    
        let welcomePopUp = new PopUp(665.0, 365.0, 900, 580, [], 
            new Button(665.0, 556.0, 150, 70, function() {

                // Reset state before pop up was added.
                CLICKABLE = oldClickable;
                mainDispatcher.remove(welcomePopUp);
                CONTEXT.globalAlpha = 1.0;

                // FIXME: Is this where I want to do this?
                model.addMoveableHandler();

                // Animate the state button to indicate what part of the system we are on.
                model.pumpButton.animationDecorator = function() {

                    // FIXME: Add the popup for the pump portion of the tutorial.
                    model.checkBtn.onClick = function() {
                        // tutorial.displayHowToPump();
                        tutorial.pumpState(tutorial);
                    };
                };
                model.pumpButton.v = 12.25;
    
            }, "ok-button"),
            "welcome-box");
            
        CONTEXT.globalAlpha = 0.35;
        mainDispatcher.add(welcomePopUp);
    }

    displayHowToPump() {

        // highlightLimb("alimb");
    
        // FIXME: Need to have a distinction between an obtrusive and unobtrusive pop up.
        // var pumpPopUp = new PopUp(1158.5, 506.0, 321, 370, [], 
        //     new Button(1288.0, 658.0, 19, 22, function() {
    
        //         // Lock player out of retriggering this click action.
        //         CLICKABLE.pop();
    
        //         // End the water highlight and highlight the salt icon.
        //         // A_LIMB[2].water.stopAnimation();
        //         // A_LIMB[2].salt.animateHighlight();
    
        //         // Display second popUp
        //         var pumpPopUp2 = new PopUp(1158.5, 506.0, 321, 370, [], new Button(1288.0, 658.0, 19, 22, 
        //             function() {
        //                 CLICKABLE.pop();    // Lock player out of retriggering button 2.
        //                 PASSIVE_POP_UPS.pop();  // Remove pop up 2.
        //                 // A_LIMB[2].salt.stopAnimation(); // End salt highlight.
        //                 displayHowToPump();
        //         }, "invert-tri"), "pump-box2");
    
        //         PASSIVE_POP_UPS.pop();  // Remove pop up 1.
        //         pumpPopUp2.paint();
        //         PASSIVE_POP_UPS.push(pumpPopUp2);
    
        //     }, "tri"), "pump-box1");
    
        // pumpPopUp.paint();
        // PASSIVE_POP_UPS.push(pumpPopUp);
    
        // Highlight the water icon.
        // A_LIMB[2].water.animateHighlight();
    
    }
    
    displayHowToEquilibrate() {
    
        // var equiPopUp = new PopUp(171.5, 526.0, 321, 330, [], 
        //     new Button(282.0, 658.0, 19, 22, 
        //         function() {
    
        //             CLICKABLE.pop();    // Lock player out of rettriggering button 1.
    
        //             var equiPopUp2 = new PopUp(171.5, 526.0, 321, 330, [], new Button(282.0, 658.0, 19, 22, 
        //                 function() {
        //                     CLICKABLE.pop();    // Lock player out of retriggering button 2.
        //                     PASSIVE_POP_UPS.pop();  // Remove pop up 2.
        //                     displayHowToEquilibrate();
        //                 }, "invert-tri"), "equi-box2");
    
        //             PASSIVE_POP_UPS.pop();  // Remove pop up 1.
        //             equiPopUp2.paint();
        //             PASSIVE_POP_UPS.push(equiPopUp2);
                    
        //         }, "tri"), "equi-box1");
        // equiPopUp.paint();
        // PASSIVE_POP_UPS.push(equiPopUp);
    
    }
    
    displayHowToFlow() {
    
        // var flowPopUp = new PopUp(665.0, 447.5, 330, 321, [], new Button(803.0, 556.0, 19, 22, 
        //     function() {
    
        //         CLICKABLE.pop();    // Lock player out of retriggering button 1.
    
        //         var flowPopUp2 = new PopUp(665.0, 447.5, 330, 321, [], new Button(803.0, 556.0, 19, 22, 
        //             function(){
    
        //                 CLICKABLE.pop();    // Lock player out of retrigerring button 2.
        //                 PASSIVE_POP_UPS.pop();  // Remove pop up 2.
        //                 displayHowToFlow();
    
        //             }, "invert-tri"), "flow-box2");
    
        //         PASSIVE_POP_UPS.pop();  // Remove pop up 1.
        //         flowPopUp2.paint();
        //         PASSIVE_POP_UPS.push(flowPopUp2);
    
        //     }, "tri"), "flow-box1");
    
        // flowPopUp.paint();
        // PASSIVE_POP_UPS.push(flowPopUp);
    
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


