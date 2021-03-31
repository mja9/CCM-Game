class LoopOfHenle {

    constructor() {
        mainDispatcher.add(LOOP_OF_HENLE);

        // Add the positions.
        D_LIMB.forEach(pos => {
            mainDispatcher.add(pos);
        });
        A_LIMB.forEach(pos => {
            mainDispatcher.add(pos);
        });
        INTER_FLUID.forEach(pos => {
            mainDispatcher.add(pos);
        });

        // Add the icons after so they always appear on top.
        D_LIMB.forEach(pos => {
            mainDispatcher.add(pos.salt);
            mainDispatcher.add(pos.water);
        });
        A_LIMB.forEach(pos => {
            mainDispatcher.add(pos.salt);
            mainDispatcher.add(pos.water);        
        });
    }

    validatePump() {

        var improperPump = false;

        for (i = 0; i < A_LIMB.length; i++) {

            if (!this.checkPump(i)) {
                improperPump = true;
            }

        }
    
        return !improperPump;
    }
    /**
     * Checks if the position in currentPos of the ascending limb
     * has a valid concentration according to the pump 
     * criteria.
     * @param {Number} currentPos The current position in the ascending limb.
     */
    checkPump(currentPos) {

        // Check that the difference is not greater than 200.
        if (Math.abs(A_LIMB[currentPos].c - INTER_FLUID[currentPos].c) > 200) {
            return false;
        }

        // Check that max amount of salt was removed.
        if (200 - Math.abs(A_LIMB[currentPos].c - INTER_FLUID[currentPos].c) >= 100) {
            return false;
        }

        return true;
    }

    validateEquilibrate() {

        var improperEquil = false;
    
        for (i = 0; i < D_LIMB.length; i++) {
    
            // Flag any descending limb positions that fail the equilibrate criteria.
            if (!this.checkEqui(i)) {
                improperEquil = true;
            }
        }
        
        return !improperEquil;
    }

    /**
     * Checks if the position in currentPos of the descending limb
     * has a valid concentration according to the equilibrate 
     * criteria.
     * @param {Number} currentPos The current position in the descending limb.
     */
    checkEqui(currentPos) {

        if (D_LIMB[currentPos].c == INTER_FLUID[currentPos].c) {
            return true;
        }

        return false;

    }

    flow(animationDecorator = function() {}) {
        mainDispatcher.addAll([INCOMING, INCOMING.salt, INCOMING.water]);
        INCOMING.setVelocity(0, 14.165);
        D_LIMB.forEach(pos => pos.setVelocity(0, 7.5));
        A_LIMB.forEach(pos => pos.setVelocity(0, -7.5));

        // Set the animation decorator for the special positon.
        const loop = this;
        D_LIMB[D_LIMB.length - 1].animationDecorator = function() {
            loop.flowConcentration();
            loop.resetAfterFlow();
            animationDecorator();
        }
    }

    flowConcentration() {

        let prevC = INCOMING.c;

        // First down the descending limb.
        for (let i = 0; i < D_LIMB.length; i++) {
            let newC  = prevC;
            prevC = D_LIMB[i].c;
            D_LIMB[i].c = newC;
        }

        // Then up the ascending limb.
        for (let i = A_LIMB.length - 1; i > -1; i--) {
            let newC = prevC;
            prevC = A_LIMB[i].c;
            A_LIMB[i].c = newC;
        }
    }

    resetAfterFlow() {
        
        // Handle the regular limb positions.
        D_LIMB.forEach(pos => {
            pos.velX = 0;
            pos.velY = 0;
            pos.moveTo(pos.startX, pos.startY);
        });

        A_LIMB.forEach(pos => {
            pos.velX = 0;
            pos.velY = 0;
            pos.moveTo(pos.startX, pos.startY);
        });

        // Handle the incoming position.
        INCOMING.velX = 0;
        INCOMING.velY = 0;
        INCOMING.moveTo(INCOMING.startX, INCOMING.startY);
        mainDispatcher.removeAll([INCOMING, INCOMING.salt, INCOMING.water]);

    }

    clearDecorators() {
        A_LIMB.forEach(pos => {
            pos.salt.animationDecorator = function() {};
        });
        D_LIMB.forEach(pos => {
            pos.water.animationDecorator = function() {};
        });
    }

    /**
     * Method to save the state of the loop of Henle. Since 
     * positions in the loop are static, it is sufficient to 
     * save the concentration for each position.
     */
    save() {

        // Save the concentrations for the descending limb.
        this.descendingState = [];
        D_LIMB.forEach(pos => {
            this.descendingState.push(pos.c);
        });

        // Save the concentrations for the ascending limb.
        this.ascendingState = [];
        A_LIMB.forEach(pos => {
            this.ascendingState.push(pos.c);
        });

        // Save the concentrations for the interstitial fluid.
        this.interState = [];
        INTER_FLUID.forEach(pos => {
            this.interState.push(pos.c);
        });

    }

    /**
     * Reverts the loop of Henle back to the last saved state.
     * If no state has been saved, makes no changes to the loop.
     */
    revert() {

        // Revert to saved concentrations.
        for (let i = 0; i < this.descendingState.length; i++) {
            D_LIMB[i].c = this.descendingState[i];
            A_LIMB[i].c = this.ascendingState[i];
            INTER_FLUID[i].c = this.interState[i];
        }

    }

}

class HairpinBend {

    /**
     * An object representing the hairpin bend of the loop.
     * The x and y positions represent the top left point of the
     * bend. Used to animate the bend in the tutorial.
     */
    constructor() {
        this.h = 150;
        this.w = 648;
        this.x = 505;
        this.y = 571;
        this.a = 0.0;
        this.vel = 0.05;
    }

    /**
     * The paint method for the hairpin object. It calls any
     * supporting methods used to animate the bend, as well
     * as performs any necessary updates on the state of the bend.
     */
    paint() {
        this.update();
        this.flash();
    }

    /**
     * Update method used to update the state of the 
     * hairpin bend object. Changes the alpha value 
     * used for the flash animation per tick.
     */
    update() {
        this.a += this.vel;

        // Clamp the upper bound of the alpha.
        if (this.a >= 0.65) {
            this.a = 0.65;
            this.vel = -this.vel;
        }

        // Clamp the lower bound of the alpha.
        if (this.a < 0.0) {
            this.a = 0.0;
            this.vel = -this.vel;
        }
    }

    /**
     * Supporting flash highlight animation used 
     * in the tutorial of the game.
     */
    flash() {

        // Save the alpha value before this method was called
        // to avoid unintended side-effects.
        let lastAlpha = CONTEXT.globalAlpha;

        // Fill in a white rectangle on the hairpin bend.
        CONTEXT.globalAlpha = this.a;
        CONTEXT.fillStyle = "white";
        CONTEXT.fillRect(this.x, this.y, this.w, this.h);

        // reset the alpha value to the original
        CONTEXT.globalAlpha = lastAlpha;

    }

}

/**
 * Class representing the sidebar containing information about the
 * game state at a given moment. This includes which state the game is in,
 * and a measure of the max concentration present.
 */
class SideBar {

    /**
     * Constructor for sidebar.
     * @param {String} mode Either 'tutorial' or 'simulation'. 
     */
    constructor(mode) {
        this.maxbar = new MaxBar(400, 159, 23, 294);
        this.a = 0.0;
        this.v = 0.0;

        let font = "10pt Hanken Book";
        let color = "#16a3e5";

        // Button labels for tutorial.
        this.tLabels = [
            new Label(139, 448, font, color, "RESET"),
            new Label(278, 448, font, color, "NEXT")
        ];

        // Button labels for simulation.
        this.sLabels = [
            new Label(94, 448, font, color, "PLAY"),
            new Label(171, 448, font, color, "PAUSE"),
            new Label(255, 448, font, color, "SLOWER"),
            new Label(341, 448, font, color, "FASTER")
        ];
        this.mode = mode;
    }

    /**
     * Set this.a's delta 
     * per tick.
     * @param {Number} v Velocity of alpha value.
     */
    setVelocity(v) {
        this.v = v;
    }

    /**
     * Update method called every tick to 
     * change the alpha value according to this.v.
     */
    updateAlpha() {
        this.a += this.v;

        // Clamp the max value of this.a
        if (this.a > 0.75) {
            this.a = 0.75;
            this.v = -this.v;
        }

        // Clamp the max value of this.a
        if (this.a < 0.0) {
            this.a = 0.0;
            this.v = -this.v;
        }
    }

    /**
     * Paint method which paints the 
     * labels for the state bars and the
     * maxbar.
     */
    paint() {

        // Update the state of the sidebar.
        this.updateAlpha();

        // Background
        let oldAlpha = CONTEXT.globalAlpha;
        CONTEXT.fillStyle = "white";
        CONTEXT.globalAlpha = oldAlpha * 0.46;
        CONTEXT.fillRect(45, 125, 404, 350);
        CONTEXT.globalAlpha = oldAlpha;

        // Pump decor
        CONTEXT.fillStyle = "#ff5853";
        CONTEXT.beginPath();
        CONTEXT.moveTo(61, 200);
        CONTEXT.lineTo(61, 150);
        CONTEXT.quadraticCurveTo(61, 145, 66, 145);
        CONTEXT.quadraticCurveTo(71, 145, 71, 150);
        CONTEXT.lineTo(71, 200);
        CONTEXT.quadraticCurveTo(71, 205, 66, 205);
        CONTEXT.quadraticCurveTo(61, 205, 61, 200);
        CONTEXT.fill();

        // Pump letters
        CONTEXT.font = "22pt Trebuchet MS";
        CONTEXT.textAlign = "start";
        CONTEXT.textBaseline = "middle";
        CONTEXT.fillText("PUMP", 106.0, 175.0);

        // Equi decor
        CONTEXT.fillStyle = "#ffb829";
        CONTEXT.beginPath();
        CONTEXT.moveTo(61, 265);
        CONTEXT.lineTo(61, 215);
        CONTEXT.quadraticCurveTo(61, 210, 66, 210);
        CONTEXT.quadraticCurveTo(71, 210, 71, 215);
        CONTEXT.lineTo(71, 265);
        CONTEXT.quadraticCurveTo(71, 270, 66, 270);
        CONTEXT.quadraticCurveTo(61, 270, 61, 265);
        CONTEXT.fill();

        // EQUI Letters
        CONTEXT.font = "22pt Trebuchet MS";
        CONTEXT.textAlign = "start";
        CONTEXT.textBaseline = "middle";
        CONTEXT.fillText("EQUILIBRATE", 106.0, 240.0);

        // Flow decor
        CONTEXT.fillStyle = "#31b1ee";
        CONTEXT.beginPath();
        CONTEXT.moveTo(61, 330);
        CONTEXT.lineTo(61, 280);
        CONTEXT.quadraticCurveTo(61, 275, 66, 275);
        CONTEXT.quadraticCurveTo(71, 275, 71, 280);
        CONTEXT.lineTo(71, 330);
        CONTEXT.quadraticCurveTo(71, 335, 66, 335);
        CONTEXT.quadraticCurveTo(61, 335, 61, 330);
        CONTEXT.fill();

        // Flow letters
        CONTEXT.font = "22pt Trebuchet MS";
        CONTEXT.textAlign = "start";
        CONTEXT.textBaseline = "middle";
        CONTEXT.fillText("FLOW", 106.0, 305.0);


        // Maxbar
        this.maxbar.paint();

        // Additional animations.
        this.flash();

        // Paint the button labels.
        if (this.mode == "tutorial") {
            this.tLabels.forEach(label => label.paint());

        } else {
            this.sLabels.forEach(label => label.paint());
        }
    }

    /**
     * Flash animation for SideBar object. Uses this.a 
     * to dynamically change the transparency of the animation.
     */
    flash() {

        // Hold on to the last value of alpha to limit side-effects.
        let oldAlpha = CONTEXT.globalAlpha;
        CONTEXT.globalAlpha = this.a;

        // Fill in white square where sidebar is located.
        CONTEXT.fillStyle = "white";
        CONTEXT.fillRect(45, 125, 404, 350);

        // Reset alpha value.
        CONTEXT.globalAlpha = oldAlpha;

    }

    /**
     * Method to reset the values associated with the 
     * flash animation.
     */
    resetFlash() {
        this.v = 0.0;
        this.a = 0.0;
    }

}

class MaxBar {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.arrowMid = this.y + this.h - (3 * 16 + 3);
        this.max = 300;
        this.a = 0.0;   // Alpha for flash animation.
        this.flashVel = 0.0;   // Delta for alpha per tick.
    }

    /**
     * Set the amount to change the alpha
     * value per tick.
     * @param {Number} v Delta alpha per tick.
     */
     setFlashVelocity(v) {
        this.flashVel = v;
    }

    /**
     * Update method to alter the alpha
     * value used in the flash animation per tick.
     */
     updateAlpha() {
        this.a += this.flashVel;

        // Clamp max of the alpha value.
        if (this.a > 0.75) {
            this.a = 0.75;
            this.flashVel = -this.flashVel;
        }

        // Clamp the min of the alpha value.
        if (this.a < 0.0) {
            this.a = 0.0;
            this.flashVel = -this.flashVel;
        }    
    }

    /**
     * Additional animation method 
     * to flash white highlight over button using
     * button's alpha value.
     */
     flash() {
        // Hold onto previous alpha value.
        let lastAlpha = CONTEXT.globalAlpha;

        // Paint white square over button.
        CONTEXT.globalAlpha = this.a;
        CONTEXT.fillStyle = "white";
        CONTEXT.fillRect(this.x, this.y, this.w, this.h);

        // Reset alpha value
        CONTEXT.globalAlpha = lastAlpha;
    }

    /**
     * This method is used to reset the parameters used 
     * to implement the flash highlight animation. Can be 
     * used to halt the animation.
     */
     resetFlash() {
        this.a = 0.0;
        this.flashVel = 0.0;
    }

    paint() {

        // Update state of the maxbar.
        this.updateAlpha();

        CONTEXT.drawImage(document.getElementById("maxbar"), this.x, this.y, this.w, this.h);
        CONTEXT.fillStyle = "#16a3e5";
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x + 3, this.arrowMid - 4.5);
        CONTEXT.lineTo(this.x + 12, this.arrowMid);
        CONTEXT.lineTo(this.x + 3, this.arrowMid + 4.5);
        CONTEXT.fill();

        // Additional animations.
        this.flash();
    }

    moveArrow() {
        this.arrowMid = this.arrowMid - 16;
        if (this.arrowMid < this.y + 19) {
            this.arrowMid = this.y + 19;
        }
    }

    checkMax() {
        if (INTER_FLUID[INTER_FLUID.length - 1].c > this.max) {
            this.max = INTER_FLUID[INTER_FLUID.length - 1].c;
            this.moveArrow();
        }
    }


}