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
        
    }

    revert() {

    }

}

class SideBar {

    constructor() {
        this.maxbar = new MaxBar(400, 159, 23, 294);
    }
    
    paint() {
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
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("maxbar"), this.x, this.y, this.w, this.h);
        CONTEXT.fillStyle = "#16a3e5";
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x + 3, this.arrowMid - 4.5);
        CONTEXT.lineTo(this.x + 12, this.arrowMid);
        CONTEXT.lineTo(this.x + 3, this.arrowMid + 4.5);
        CONTEXT.fill();
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