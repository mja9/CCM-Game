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
        this.initAscendingLimb();
        this.initDescendingLimb();
        this.initInterstitialFluid();

        // Initialize the tutorial.
        this.tutorial.displayWelcomeTutorial();
    }

    initStateButtons() {

        // Pump button.
        STATE_BUTTONS.push(this.pumpButton);
        CLICKABLE.push(this.pumpButton);
    
        // Equilibrate button.
        STATE_BUTTONS.push(this.equilibrateButton);
        CLICKABLE.push(this.equilibrateButton);
    
        // Flow button.
        STATE_BUTTONS.push(this.flowButton);
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
            model.pumpButton.onClick = function() {};

            // Animate and then enable the equi state button.
            model.pumpButton.v = -12.25;
            model.pumpButton.animationDecorator = function() {
                model.equilibrateButton.v = 12.25;
                model.equilibrateButton.animationDecorator = function() {
                    model.equilibrateButton.onClick = function() {
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
            model.equilibrateButton.onClick = function() {};

            // Animate and enable the flow button
            model.equilibrateButton.v = -12.25;
            model.equilibrateButton.animationDecorator = function() {
                model.flowButton.v = 12.25;
                model.flowButton.animationDecorator = function() {
                    model.flowButton.onClick = function() {
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

    // TODO: Fill out the proper actions for each state in the tutorial.
    flowState(tutorial) {
        
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
                    model.pumpButton.onClick = function() {
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

    // TODO: Next step is to fix this one!
    displayHowToPump() {

        // highlightLimb("alimb");
    
        // FIXME: Need to have a distinction between an obtrusive and unobtrusive pop up.
        var pumpPopUp = new PopUp(1158.5, 506.0, 321, 370, [], 
            new Button(1288.0, 658.0, 19, 22, function() {
    
                // Lock player out of retriggering this click action.
                CLICKABLE.pop();
    
                // End the water highlight and highlight the salt icon.
                // A_LIMB[2].water.stopAnimation();
                // A_LIMB[2].salt.animateHighlight();
    
                // Display second popUp
                var pumpPopUp2 = new PopUp(1158.5, 506.0, 321, 370, [], new Button(1288.0, 658.0, 19, 22, 
                    function() {
                        CLICKABLE.pop();    // Lock player out of retriggering button 2.
                        PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                        // A_LIMB[2].salt.stopAnimation(); // End salt highlight.
                        displayHowToPump();
                }, "invert-tri"), "pump-box2");
    
                PASSIVE_POP_UPS.pop();  // Remove pop up 1.
                pumpPopUp2.paint();
                PASSIVE_POP_UPS.push(pumpPopUp2);
    
            }, "tri"), "pump-box1");
    
        pumpPopUp.paint();
        PASSIVE_POP_UPS.push(pumpPopUp);
    
        // Highlight the water icon.
        // A_LIMB[2].water.animateHighlight();
    
    }
    
    displayHowToEquilibrate() {
    
        var equiPopUp = new PopUp(171.5, 526.0, 321, 330, [], 
            new Button(282.0, 658.0, 19, 22, 
                function() {
    
                    CLICKABLE.pop();    // Lock player out of rettriggering button 1.
    
                    var equiPopUp2 = new PopUp(171.5, 526.0, 321, 330, [], new Button(282.0, 658.0, 19, 22, 
                        function() {
                            CLICKABLE.pop();    // Lock player out of retriggering button 2.
                            PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                            displayHowToEquilibrate();
                        }, "invert-tri"), "equi-box2");
    
                    PASSIVE_POP_UPS.pop();  // Remove pop up 1.
                    equiPopUp2.paint();
                    PASSIVE_POP_UPS.push(equiPopUp2);
                    
                }, "tri"), "equi-box1");
        equiPopUp.paint();
        PASSIVE_POP_UPS.push(equiPopUp);
    
    }
    
    displayHowToFlow() {
    
        var flowPopUp = new PopUp(665.0, 447.5, 330, 321, [], new Button(803.0, 556.0, 19, 22, 
            function() {
    
                CLICKABLE.pop();    // Lock player out of retriggering button 1.
    
                var flowPopUp2 = new PopUp(665.0, 447.5, 330, 321, [], new Button(803.0, 556.0, 19, 22, 
                    function(){
    
                        CLICKABLE.pop();    // Lock player out of retrigerring button 2.
                        PASSIVE_POP_UPS.pop();  // Remove pop up 2.
                        displayHowToFlow();
    
                    }, "invert-tri"), "flow-box2");
    
                PASSIVE_POP_UPS.pop();  // Remove pop up 1.
                flowPopUp2.paint();
                PASSIVE_POP_UPS.push(flowPopUp2);
    
            }, "tri"), "flow-box1");
    
        flowPopUp.paint();
        PASSIVE_POP_UPS.push(flowPopUp);
    
    }
    
    displayNowToRegularPlay() {
        var oldClickable = CLICKABLE.slice();   // Functionally handle changes in CLICKABLE.
        CLICKABLE = [];
    
        var regularPlayPopUp = new PopUp(665.0, 328.0, 700, 300, [], 
        new Button(665.0, 404.0, 150, 70, 
            function() {
                initRegularGame();
                CLICKABLE = oldClickable;
                paintGameBoard();
            }, "ok-button"), "end-tutorial");
    
        CONTEXT.globalAlpha = 0.35;
        paintGameBoard();
        regularPlayPopUp.paint();
    
    }

}


