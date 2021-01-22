class GradientPosition {

    constructor(x, y, w, h, c) {
        this.colorGrad = ["#ffd9a6", "#ffc868", "#ffb829", "#ff9539", "#ff7751", "#ff5d58"];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }


    colorFillMechanic() {

        let rad = 15.0;
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
        // Draw rectangular positions.
        this.move();
        this.colorFillMechanic();
        if (this.isSelected) {
            this.selectionIndicator();
        }

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "30px Courier New";
        CONTEXT.textAlign = "center";
        // CONTEXT.shadowColor = "white";
        // CONTEXT.shadowBlur = 4;
        CONTEXT.fillText(this.c.toString(), this.x, this.y - (this.h / 8.0));

        // CONTEXT.shadowBlur = 0;
    }

    selectionIndicator() {
        let rad = 15.0;

        // Choose the proper color
        CONTEXT.strokeStyle = "green";

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

    highlight(icon) {
        
        return function() {

            // Fade Animation
            paintGameBoard();
            CONTEXT.globalAlpha = icon.highlight.lastAlpha;
            var grad = CONTEXT.createRadialGradient(icon.x, icon.y + icon.h / 12, 5, icon.x, icon.y + icon.h / 12, 
                                                    icon.h > icon.w ? icon.h / 2 + icon.h / 10 : icon.w / 2 + icon.w / 10);
            grad.addColorStop(0, "#003311");
            grad.addColorStop(1, "#66ff99");
            CONTEXT.fillStyle = grad;
            CONTEXT.beginPath();
            CONTEXT.arc(icon.x, icon.y + icon.h / 12, icon.h > icon.w ? icon.h / 2 + icon.h / 10 : icon.w / 2 + icon.w / 10, 0, 2 * Math.PI);
            CONTEXT.fill();
            CONTEXT.globalAlpha = 1.0;
            icon.paint();

            icon.highlight.lastAlpha +=  icon.highlight.direction * 0.1;
            if (icon.highlight.lastAlpha <= 0.2) {
                icon.highlight.direction = 1;
            } else if (icon.highlight.lastAlpha == 1.0) {
                icon.highlight.direction = -1;
            }

        }

    }

    animateHighlight() {

        this.highlight.direction = -1;
        this.highlight.lastAlpha = 1.0;
        this.animateHighlight.animation = window.setInterval(this.highlight(this), 50);

    }

    stopAnimation() {
        window.clearInterval(this.animateHighlight.animation);
        this.highlight.direction = -1;
        this.highlight.lastAlpha = 1.0;
        CONTEXT.globalAlpha = 1.0;
        paintGameBoard();
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

    highlight(icon) {
        
        return function() {

            // Fade Animation
            paintGameBoard();
            CONTEXT.globalAlpha = icon.highlight.lastAlpha;
            var grad = CONTEXT.createRadialGradient(icon.x, icon.y, 5, icon.x, icon.y, 
                                                    icon.h > icon.w ? icon.h / 2 + icon.h / 6 : icon.w / 2 + icon.w / 6);
            grad.addColorStop(0, "#003311");
            grad.addColorStop(1, "#66ff99");
            CONTEXT.fillStyle = grad;
            CONTEXT.beginPath();
            CONTEXT.arc(icon.x, icon.y, icon.h > icon.w ? icon.h / 2 + icon.h / 6 : icon.w / 2 + icon.w / 6, 0, 2 * Math.PI);
            CONTEXT.fill();
            CONTEXT.globalAlpha = 1.0;
            icon.paint();

            icon.highlight.lastAlpha +=  icon.highlight.direction * 0.1;
            if (icon.highlight.lastAlpha <= 0.2) {
                icon.highlight.direction = 1;
            } else if (icon.highlight.lastAlpha == 1.0) {
                icon.highlight.direction = -1;
            }

        }

    }

    animateHighlight() {

        this.highlight.direction = -1;
        this.highlight.lastAlpha = 1.0;
        this.animateHighlight.animation = window.setInterval(this.highlight(this), 50);

    }

    stopAnimation() {
        window.clearInterval(this.animateHighlight.animation);
        this.highlight.direction = -1;
        this.highlight.lastAlpha = 1.0;
        CONTEXT.globalAlpha = 1.0;
        paintGameBoard();
    }

}


class InterPosition extends GradientPosition{

    constructor(xPos, yPos) {
        super(xPos, yPos, 322, 82, 300);
    }   

    paint() {
        // Draw rectangular positions.
        this.colorFillMechanic();

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "40px Courier New";
        CONTEXT.textAlign = "center";
        CONTEXT.fillText(this.c.toString(), this.x, this.y);
    }
}