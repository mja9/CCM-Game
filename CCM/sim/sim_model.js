// Copyright © 2020 mja9
let isRunning = false;
const simState = {
    PUMP: simPUMP,
    EQUI: simEQUI,
    FLOW: simFLOW,
}
let currState = simState.PUMP;
let waveCoolDown = 1450; // ms
let transitionCoolDown = 500; // ms
let flowCoolDown = 6000; //ms

/**
 * Method to initialize the simulation model.
 */
function initSimModel() {
    window.setTimeout(simStart, 2500);
}

/**
 * Method to start the simulation.
 */
function simStart() {
    isRunning = true;
    currState();
}

/**
 * Method to pause the simulation. 
 */
function simStop() {
    isRunning = false;
}

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

