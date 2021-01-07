class LoopOfHenle {

    constructor() {
        this.sidebar = new SideBar();
        mainDispatcher.add(this.sidebar);
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

        // Add the icons.
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

            if (!checkPump(i)) {
                improperPump = true;
            }

        }
    
        return !improperPump;
    }

    validateEquilibrate() {

        var improperEquil = false;
    
        for (i = 0; i < D_LIMB.length; i++) {
    
            // Flag any descending limb positions that fail the equilibrate criteria.
            if (!checkEqui(i)) {
                improperEquil = true;
            }
        }
        
        return !improperEquil;
        //     // Regular game action.
        //     } else {
    
        //          // Disable this button.
        //          STATE_BUTTONS[1].onClick = function() {};
        //          STATE_BUTTONS[1].image = "equi-disabled";
        //         paintGameBoard();
        //         console.log("Equilibrate successful!");
    
        //         // Continue to flow paused game state.
        //         pauseGameAI("player flow");
        //     }
    
        // }
    
    }

    flow(animationDecorator = function() {}) {
        console.log("Flow was called!")
        mainDispatcher.addAll([INCOMING, INCOMING.salt, INCOMING.water]);
        INCOMING.setVelocity(0, 14.165);
        D_LIMB.forEach(pos => pos.setVelocity(0, 7.5));
        A_LIMB.forEach(pos => pos.setVelocity(0, -7.5));

        // Set the animation decorator for the special positon.
        D_LIMB[D_LIMB.length - 1].animationDecorator = animationDecorator;
    }

}

class SideBar {
    
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
        // maxbar = new MaxBar(400, 159, 23, 294);
        maxbar.paint();
    }

}

class MaxBar {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.arrowMid = this.y + this.h - (3 * 16 + 3);
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("maxbar"), this.x, this.y, this.w, this.h);
        
        // 162 - 440 -> 278 / 18 = 15.5
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


}