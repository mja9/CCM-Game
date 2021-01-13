// Copyright © 2020 mja9

class SimulationModel {

    constructor(view) {
        this.view = view;
        this.isRunning = true;
        this.state = "Flow";
        this.baseSpeed = 50;
        this.currSpeed = 1.0;
    }

    init() {
        this.initSimBtns();
        this.initStateButtons();

        // Set timeout to begin simulation.
        this.transitionState();
    }

    /**
     * Creates the simulation control buttons.
     */
    initSimBtns() {
        const model = this;

        // Create the start sim button.
        this.startBtn = new Button(94.5, 403.5, 39.0, 45.0, function() {
            model.simStart();
        }, "sim-start");
        CLICKABLE.push(this.startBtn);

        // Create the stop sim button.
        this.stopBtn = new Button(172.0, 403.5, 26.0, 38.0, function() {
            model.simStop();
        }, "sim-stop");
        CLICKABLE.push(this.stopBtn);

        // Create the slow down button.
        this.slowBtn = new Button(252.0, 403.5, 44.0, 45.0, function() {}, "sim-slow");
        CLICKABLE.push(this.slowBtn);

        // Create the fast-forward button.
        this.ffBtn = new Button(342.0, 403.5, 44.0, 45.0, function() {}, "sim-fast");
        CLICKABLE.push(this.ffBtn);

        mainDispatcher.addAll([this.startBtn, this.stopBtn, this.slowBtn, this.ffBtn]);
    }

    initStateButtons() {

        // Pump button.
        this.pumpBtn = new StateButton(194.0, 175.0, 256, 60, function(){}, "255, 88, 83");
        CLICKABLE.push(this.pumpBtn);

        // Equilibrate button.
        this.equilibrateBtn = new StateButton(194.0, 240.0, 256, 60, function() {}, "255, 184, 41");
        CLICKABLE.push(this.equilibrateBtn);

        // Flow button.
        this.flowBtn = new StateButton(194.0, 305.0, 256, 60, function() {}, "49, 177, 238");
        CLICKABLE.push(this.flowBtn);

        mainDispatcher.addAll([this.pumpBtn, this.equilibrateBtn, this.flowBtn]);
    }

    /**
     * Method to start the simulation.
     */
    simStart() {
        if (!this.isRunning) {
            mainLoop = window.setInterval(function() {
                mainDispatcher.dispatchCommand(function(observer) {
                    observer.paint();
                });
            }, (this.baseSpeed / this.currSpeed));
            this.isRunning = true;
        }
    }

    /**
     * Method to pause the simulation. 
     */
    simStop() {
        if (this.isRunning) {
            window.clearInterval(mainLoop);
            this.isRunning = false;
        }
    }

    /**
     * Method to slow down the simulation.
     */
    simSlow() {
        if (this.currSpeed > 1.0) {
            this.currSpeed -= 0.5;
            this.simStop();
            this.simStart();
        }
    }

    /**
     * Method to speed up the simulation.
     */
    simFastForward() {
        if (this.currSpeed < 2.0) {
            this.currSpeed += 0.5;
            this.simStop();
            this.simStart();
        }
    }

    ai() {
        switch(this.state) {

            case "Pump":
                if (this.view.loop.validatePump()) {
                    this.transitionState();
                } else {
                    this.animatePump();
                }
                break;

            case "Equilibrate":
                if (this.view.loop.validateEquilibrate()) {
                    this.transitionState();
                } else {
                    this.animateEquilibrate();
                }
                break;

            case "Flow":
                this.view.loop.clearDecorators();
                const model = this;
                this.view.loop.flow(function() {
                    model.transitionState();
                });
                break;

        }
    }

    transitionState() {
        const model = this;
        switch(this.state) {

            case "Pump":
                this.pumpBtn.animationDecorator = function() {
                    model.equilibrateBtn.animationDecorator = function() {
                        model.state = "Equilibrate";
                        model.ai();
                    }
                    model.equilibrateBtn.v = 12.25;
                };
                this.pumpBtn.v = -12.25;
                break;

            case "Equilibrate":
                this.equilibrateBtn.animationDecorator = function() {
                    model.flowBtn.animationDecorator = function() {
                        model.state = "Flow";
                        model.ai();
                    }
                    model.flowBtn.v = 12.25;
                };
                this.equilibrateBtn.v = -12.25;
                break;

            case "Flow":
                console.log("Successfully entered the flow state!");
                this.flowBtn.animationDecorator = function() {
                    model.pumpBtn.animationDecorator = function() {
                        model.state = "Pump";
                        model.ai();
                    }
                    model.pumpBtn.v = 12.25;
                };
                this.flowBtn.v = -12.25;
                break;
        }

    }

    animatePump() {
        const model = this;
        let needPump = A_LIMB.map(function(pos, i) {
            return !model.view.loop.checkPump(i);
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
            model.ai();     // Continue the simulation.
        }

        A_LIMB[lastOccurence].salt.v = -10;
        A_LIMB[lastOccurence].c -= 50;        
    }

    animateEquilibrate() {
        const model = this;
        let needEquilibrate = D_LIMB.map(function(pos, i) {
            return !model.view.loop.checkEqui(i);
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
            model.ai();     // Continue the simulation.
        }

        D_LIMB[lastOccurence].water.v = 10;
        D_LIMB[lastOccurence].c += 50;
    }

}
