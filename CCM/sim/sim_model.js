// Copyright © 2020 mja9

class SimulationModel {

    constructor(view) {
        this.view = view;
        this.isRunning = false;
        this.simState = {
            PUMP: simPUMP,
            EQUI: simEQUI,
            FLOW: simFLOW,
        };
        this.currState = simState.PUMP;
        this.waveCoolDown = 1450; // ms
        this.transitionCoolDown = 500; // ms
        this.flowCoolDown = 6000; //ms

    }

    init() {
        this.initSimBtns();
        this.initStateButtons();

        // Set timeout to begin simulation.
        window.setTimeout(simStart, 2500);
    }

    /**
     * Creates the simulation control buttons.
     */
    initSimBtns() {

        // Create the start sim button.
        this.startBtn = new Button(94.5, 403.5, 39.0, 45.0, simStart, "sim-start");
        CLICKABLE.push(this.startBtn);

        // Create the stop sim button.
        this.stopBtn = new Button(172.0, 403.5, 26.0, 38.0, simStop, "sim-stop");
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
        this.isRunning = true;
        this.currState();
    }

    /**
     * Method to pause the simulation. 
     */
    // TODO: Fix this.
    simStop() {
        this.isRunning = false;
    }

}

// // TODO: Fix this!!
// let startConc = 300;
// let maxbar = new MaxBar(400, 159, 23, 294);

/**
 * Method to simulate pumping. Only runs while the simulation is in play.
 */
function simPUMP() {

    // FIXME: Calling paint too many times -- throwing the timing off.
    STATE_BUTTONS[0].v2 = 0.01;

    if (isRunning) {

        let didChange = false;
        for (i = 0; i < A_LIMB.length; i++) {
            if (!checkPump(i)) {
                didChange = true;
                animatePump(i);
            }
        }

        // Cooldown until next wave of pump animations.
        if (didChange) {
            window.setTimeout(currState, waveCoolDown);

        // Cooldown until switch happens.
        } else {

            // FIXME: Calling paint too many times -- throwing the timing off.
            STATE_BUTTONS[0].v2 = -0.01;
            currState = simState.EQUI;
            window.setTimeout(currState, transitionCoolDown);

            // TODO: Fix this !!!
            let max = 0;
            INTER_FLUID.forEach(pos => {
                if (pos.c > max) {
                    max = pos.c;
                }
            });
            console.log(max);
            console.log(Math.round((max - startConc) / 50));
            if (max > startConc) {
                maxbar.moveArrow();
                // maxbar.paint();
            }
        }

    }
}

/**
 * Method to simulat equilibration. Only runs when simulation is in play.
 */
function simEQUI() {

    // FIXME:
    STATE_BUTTONS[1].v2 = 0.01;

    if (isRunning) {

        let didChange = false;
        for (i = 0; i < D_LIMB.length; i++) {
            if (!checkEqui(i)) {
                didChange = true;
                animateEquilibrate(i);
            }
        }

        // Cooldown until next wave of equi animations.
        if (didChange) {
            window.setTimeout(currState, waveCoolDown);

        // Cooldown until switch happens.
        } else {

            // FIXME:
            STATE_BUTTONS[1].v2 = -0.01;
            currState = simState.FLOW;
            window.setTimeout(currState, transitionCoolDown);
        }

    }
}

/**
 * Method to simulate flow. Once flow has begun, can not be paused in the middle.
 * Only runs while the simulation is in play.
 */
function simFLOW() {

    // FIXME: 
    STATE_BUTTONS[2].v2 = 0.01;
    if (isRunning) {
        flow(true);
        currState = simState.PUMP;
        window.setTimeout(function() {
            currState();

            // FIXME:
            STATE_BUTTONS[2].v2 = -0.01;
        }, flowCoolDown);
    }
}

function flowConcentrationSim(i=0, limb="dlimb", conc=300) {

    // Flow in the descending limb.
    if (limb == "dlimb") {
        if (i == 5) {
            var oldConc = D_LIMB[i].c;
            D_LIMB[i].c = conc;
            flowConcentrationSim(5, "alimb", oldConc);

        } else {
            var oldConc = D_LIMB[i].c;
            D_LIMB[i].c = conc;
            flowConcentrationSim(i + 1, limb, oldConc);
        }
    }

    // Flow in the ascending limb.
    if (limb == "alimb") {
        if (i == 0) {   // Base case.
            A_LIMB[i].c = conc;
            resetAfterFlow();

        } else {
            var oldConc = A_LIMB[i].c;
            A_LIMB[i].c = conc;
            flowConcentrationSim(i - 1, limb, oldConc);
        }

    }

}

