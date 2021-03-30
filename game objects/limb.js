class GradientPosition {

    constructor(x, y, w, h, c) {
        this.colorGrad = ["#ffd9a6", "#ffc868", "#ffb829", "#ff9539", "#ff7751", "#ff5d58"];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.a = 0.0;
        this.rad = 15.0;
        this.flashVel = 0;
        this.flashState = 0;    // 1 to flash, 2 to flashNumbers
    }

    /**
     * The primary mechanic behind the paint method for each 
     * position in the game whose colors change into a gradient dynamically.
     */
    colorFillMechanic() {

        let rad = this.rad;
        let ratio = Math.round((this.c / 300.0 % 1) / 0.17);

        // Single color case.
        if (ratio == 0 | this.c < 300 | this.c >= 1500) {

            // Choose the single color according to the special cases.
            if (this.c < 300) {
                CONTEXT.fillStyle = this.colorGrad[0];
            } else if (this.c >= 1500) {
                CONTEXT.fillStyle = this.colorGrad[this.colorGrad.length - 1];
            } else {
                CONTEXT.fillStyle = this.colorGrad[Math.trunc(this.c / 300)];
            }

            // Draw the rounded box.
            CONTEXT.beginPath();
            CONTEXT.moveTo(this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
            CONTEXT.lineTo(this.x + (this.w / 2.0) - rad, this.y - (this.h / 2.0));
            CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y - (this.h / 2.0), 
            this.x + (this.w / 2.0), this.y - (this.h / 2.0) + rad);
            CONTEXT.lineTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0) - rad);
            CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0), 
            this.x + (this.w / 2.0) - rad, this.y + (this.h / 2.0));
            CONTEXT.lineTo(this.x - (this.w / 2.0) + rad, this.y + (this.h / 2.0));
            CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y + (this.h / 2.0), 
            this.x - (this.w / 2.0), this.y + (this.h / 2.0) - rad);
            CONTEXT.lineTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0) + rad);
            CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0), 
            this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
            CONTEXT.fill();

        // Two color case.
        } else {

            // Pick the two colors.
            let topColor = this.colorGrad[Math.trunc(this.c / 300)];
            let bottomColor = this.colorGrad[Math.trunc((this.c / 300) + Math.ceil(ratio / 6))];

            // Top rounded box (prev color).
            CONTEXT.fillStyle = topColor;
            CONTEXT.beginPath();
            // Top left after curve.
            CONTEXT.moveTo(this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
            // Top border.
            CONTEXT.lineTo(this.x + (this.w / 2.0) - rad, this.y - (this.h / 2.0));
            // Top right corner.
            CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y - (this.h / 2.0), 
            this.x + (this.w / 2.0), this.y - (this.h / 2.0) + rad);
            // Right border.
            CONTEXT.lineTo(this.x + (this.w / 2), this.y - (this.h / 2) + (this.h - (ratio * this.h / 6)));
            // Bottom border.
            CONTEXT.lineTo(this.x - (this.w / 2), this.y - (this.h / 2) + (this.h - (ratio * this.h / 6)));
            // Left border.
            CONTEXT.lineTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0) + rad);
            // Top left corner.
            CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0), 
            this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
            CONTEXT.fill();

            // Bottom rounded box.
            CONTEXT.fillStyle = bottomColor;
            CONTEXT.beginPath();
            // Top left corner.
            CONTEXT.moveTo(this.x - (this.w / 2), this.y - (this.h / 2) + (this.h - (ratio * this.h / 6)) - 1);
            // Top border.
            CONTEXT.lineTo(this.x + (this.w / 2), this.y - (this.h / 2) + (this.h - (ratio * this.h / 6)) - 1);
            // Right Border.
            CONTEXT.lineTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0) - rad);
            // Bottom right corner.
            CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0), 
            this.x + (this.w / 2.0) - rad, this.y + (this.h / 2.0));
            // Bottom border.
            CONTEXT.lineTo(this.x - (this.w / 2.0) + rad, this.y + (this.h / 2.0));
            // Bottom left corner.
            CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y + (this.h / 2.0), 
            this.x - (this.w / 2.0), this.y + (this.h / 2.0) - rad);
            // Left border.
            CONTEXT.lineTo(this.x - (this.w / 2), this.y - (this.h / 2) + (this.h - (ratio * this.h / 6)) - 1);
            CONTEXT.fill();

        }
    }

    /**
     * A method used to paint the concentration 
     * of this position in the center of its shape.
     * 
     * @param {String} color The color to use when painting the concentration.
     * @param {Number} code 0 for a limb position, 1 for an interstitial position.
     */
    paintConcentration(color, code) {

        CONTEXT.fillStyle = color;
        CONTEXT.textAlign = "center";
        if (code == 0) {
            CONTEXT.font = "30px Hanken Light";
            CONTEXT.fillText(this.c.toString(), this.x, this.y - (this.h / 8.0));
        } else {
            CONTEXT.font = "40px Hanken Light";
            CONTEXT.fillText(this.c.toString(), this.x, this.y);
        }

    }

    flash() {

        // Optimization technique: avoid painting an invisible square.
        if (this.a > 0.0 && this.flashState == 1) {

            // Set color style for the flashing animation.
            CONTEXT.fillStyle = "white";

            // Maintain the previous alpha being used to paint items on the canvas
            // to eliminate unwanted side-effects.
            let lastAlpha = CONTEXT.globalAlpha;
            // console.log("Alpha: ");
            // console.log(this.a);
            CONTEXT.globalAlpha = this.a;

            // Draw the rounded box.
            let rad = this.rad;
            CONTEXT.beginPath();
            CONTEXT.moveTo(this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
            CONTEXT.lineTo(this.x + (this.w / 2.0) - rad, this.y - (this.h / 2.0));
            CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y - (this.h / 2.0), 
            this.x + (this.w / 2.0), this.y - (this.h / 2.0) + rad);
            CONTEXT.lineTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0) - rad);
            CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0), 
            this.x + (this.w / 2.0) - rad, this.y + (this.h / 2.0));
            CONTEXT.lineTo(this.x - (this.w / 2.0) + rad, this.y + (this.h / 2.0));
            CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y + (this.h / 2.0), 
            this.x - (this.w / 2.0), this.y + (this.h / 2.0) - rad);
            CONTEXT.lineTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0) + rad);
            CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0), 
            this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
            CONTEXT.fill();

            CONTEXT.globalAlpha = lastAlpha;
        }

    }

    /**
     * An alternative flashing method. This method performs
     * the same flashing highlight animation on the numbers 
     * representing the concentration of each position.
     * 
     * @param {Number} code 0 for a limb pos, 1 for an inter pos.
     */
    flashNumbers(code) {

        if (this.flashState == 2) {
            // Maintain old alpha value to minimize side-effects.
            let lastAlpha = CONTEXT.globalAlpha;

            CONTEXT.globalAlpha = this.a;
            this.paintConcentration("white", code);
            CONTEXT.globalAlpha = lastAlpha;
        }

    }

    /**
     * This method sets the velocity used to change the 
     * alpha parameter of this GradientPosition (this.a).
     * The parameter is used to dynamically change the 
     * alpha setting when creating the flash highlight
     * animation.
     * @param {Number} vel Amount to change alpha per tick.
     */
    setFlash(vel) {
        this.flashVel = vel;
    }

    /**
     * This method sets the code used to perform 
     * seperate flash animations.
     * @param {Number} code 0 for off, 1 for flash, 2 for flashNumbers.
     */
     setFlashState(code) {
        this.flashState = code;
    }

    /**
     * This method is called per tick of the paint/update loop.
     * It updates the alpha of this GradientPosition according
     * to the set flashVelocity. In the case flashVel is 0, which
     * includes its starting state, this method makes no changes 
     * to the state of this GradientPosition.
     */
    updateAlpha() {
        this.a += this.flashVel;

        // Clamp the alpha number by a set maximum.
        if (this.a >= 0.65) {
            this.a = 0.65;
            this.flashVel = -this.flashVel;
        }

        // Avoid errors where alpha could be negative.
        if (this.a < 0.0) {
            this.a = 0;
            this.flashVel = -this.flashVel;
        }
    }

    /**
     * This method is used to reset the parameters used 
     * to implement the flash highlight animation. Can be 
     * used to halt the animation.
     */
     resetFlash() {
        this.a = 0.0;
        this.flashVel = 0.0;
        this.setFlashState(0);
    }

}

class LimbPosition extends GradientPosition {

    constructor(xPos, yPos, nextX, nextY) {
        super(xPos, yPos, 152, 82, 300);
        this.startX = xPos;
        this.startY = yPos;
        this.salt = new SaltIcon(this.x + this.w / 2 - 7.0, this.y + this.h / 2 - 7.0, this);
        this.water = new WaterIcon(this.x - this.w / 2 + 7.0, this.y + this.h / 2 - 7.0, this);
        this.isSelected = false;
        this.nextX = nextX;
        this.nextY = nextY;
        this.velY = 0;
        this.velX = 0;
        this.animationDecorator = function() {};
    }  
    
    setVelocity(velX, velY) {
        this.velX = velX;
        this.velY = velY;
    }

    paint() {

        // Methods to update the state of the LimbPosition.
        this.updateAlpha();
        this.move();

        // Draw rectangular positions.
        this.colorFillMechanic();
        if (this.isSelected) {
            this.selectionIndicator();
        }

        // Draw numerical representation of concentration.
        this.paintConcentration("#252525", 0);

        // Additonal animations.
        this.flash();
        this.flashNumbers(0);
    }

    selectionIndicator() {
        let rad = 15.0;

        // Choose the proper color
        CONTEXT.strokeStyle = "white";
        CONTEXT.lineWidth = 7;

        // Draw the rounded box.
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
        CONTEXT.lineTo(this.x + (this.w / 2.0) - rad, this.y - (this.h / 2.0));
        CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y - (this.h / 2.0), 
        this.x + (this.w / 2.0), this.y - (this.h / 2.0) + rad);
        CONTEXT.lineTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0) - rad);
        CONTEXT.quadraticCurveTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0), 
        this.x + (this.w / 2.0) - rad, this.y + (this.h / 2.0));
        CONTEXT.lineTo(this.x - (this.w / 2.0) + rad, this.y + (this.h / 2.0));
        CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y + (this.h / 2.0), 
        this.x - (this.w / 2.0), this.y + (this.h / 2.0) - rad);
        CONTEXT.lineTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0) + rad);
        CONTEXT.quadraticCurveTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0), 
        this.x - (this.w / 2.0) + rad, this.y - (this.h / 2.0));
        CONTEXT.stroke();
    }

    move() {

        // Move the limb position itself.
        this.x += this.velX;
        this.y += this.velY;

        // Move its icons.
        this.water.x += this.velX;
        this.water.y += this.velY;
        this.salt.x += this.velX;
        this.salt.y += this.velY;

        // Clamp movement.
        if ((this.startY < this.nextY && this.y > this.nextY) || (this.startY > this.nextY && this.y < this.nextY)) {
            this.y = this.nextY;
            this.water.moveTopLeftTo(this.nextX - this.w / 2 + 7.0, this.nextY + this.h / 2 - 7.0);
            this.salt.moveTopLeftTo(this.nextX + this.w / 2 - 7.0, this.nextY + this.h / 2 - 7.0);
            this.animationDecorator();
            this.animationDecorator = function() {};    // One-time use decorator.
        }
    }

    moveTo(x, y) {

        // Delta to new position.
        let xDiff = x - this.x;
        let yDiff = y - this.y;

        // Move limp pos and icons.
        this.x += xDiff;
        this.y += yDiff;
        this.water.x += xDiff;
        this.water.y += yDiff;
        this.salt.x += xDiff;
        this.salt.y += yDiff;
        
    }

}

class CrossingPosition extends LimbPosition {

    constructor(xPos, yPos, nextX, nextY) {
        super(xPos, yPos, nextX, nextY);
        this.accelY = 0;
        this.phase = 1;
    }

    setVelocity(velX, velY) {
        this.velX = 14;
        this.velY = 62.33;
        this.accelY = -10;
    }

    move() {

        this.x += this.velX;
        this.y += this.velY;
        this.velY += this.accelY;

        // Move its icons.
        this.water.x += this.velX;
        this.water.y += this.velY;
        this.salt.x += this.velX;
        this.salt.y += this.velY;

        switch(this.phase) {

            case 1:
                if (this.x >= 621 && this.y >= 665) {
                    this.accelY = 0;
                    this.velY = 0;
                    this.velX = 31.43;
                    this.y = 665;
                    this.phase = 2;
                }
                break;

            case 2:
                if (this.x >= 1039) {
                    this.velX = 14;
                    this.velY = -62.33;
                    this.accelY = 10;
                    this.x = 1039;
                    this.phase = 3;
                }
                break;

            case 3:
                if (this.x >= 1079 && this.y <= 523) {
                    this.x = 1079;
                    this.y = 523;
                    this.water.moveTopLeftTo(this.nextX - this.w / 2 + 7.0, this.nextY + this.h / 2 - 7.0);
                    this.salt.moveTopLeftTo(this.nextX + this.w / 2 - 7.0, this.nextY + this.h / 2 - 7.0);
                    this.accelY = 0;
                    this.velY = 0;
                    this.velX = 0;
                    this.animationDecorator();
                    this.animationDecorator = function() {};
                    this.phase = 1;
                }
                break;
        }

    }

}

class Icon {

    constructor(xPos, yPos, w, h, limbPos, id) {
        this.w = w;
        this.h = h;
        this.id = id;
        if (this.id == "water") {
            this.x = xPos + this.w / 2;
        } else {
            this.x = xPos - this.w / 2;            
        }
        this.y = yPos - this.h / 2;
        this.limbPos = limbPos;
        this.v = 0;
        this.animationDecorator = function() {};
        this.terminationCriteria = function(icon) {};
    }

    move() {
        this.x += this.v;

        // Termination criteria.
        if (this.terminationCriteria(this) === true) {
            console.log("The termination criteria was passed!");
            this.v = 0;
            this.animationDecorator();
        }
    }

}

class WaterIcon extends Icon {

    constructor(xPos, yPos, limbPos) {
        super(xPos, yPos, 28, 40, limbPos, "water");
        this.startX = this.x;
        this.startY = this.y;
    }

    moveTopLeftTo(x, y) {
        this.x = x + this.w / 2.0;
        this.y = y - this.h / 2.0;
    }

    paint() {
        this.move();
        CONTEXT.drawImage(document.getElementById("water-icon"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class SaltIcon extends Icon {

    constructor(xPos, yPos, limbPos) {
        super(xPos, yPos, 33, 37, limbPos, "salt");
        this.startX = this.x;
        this.startY = this.y;
    }

    moveTopLeftTo(x, y) {
        this.x = x - this.w / 2.0;
        this.y = y - this.h / 2.0;
    }

    paint() {
        this.move();
        CONTEXT.drawImage(document.getElementById("salt-icon"), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}


class InterPosition extends GradientPosition{

    constructor(xPos, yPos) {
        super(xPos, yPos, 322, 82, 300);
    }   

    paint() {

        // Update the state of this position.
        this.updateAlpha();

        // Draw rectangular positions.
        this.colorFillMechanic();

        // Draw numerical representation of concentration.
        this.paintConcentration("#252525", 1);

        // Additional animations.
        this.flash();
        this.flashNumbers(1);
    }
}