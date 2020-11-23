class LimbPosition {

    static colorGrad = ["#ffd9a6", "#ffc868", "#ffb829", "#ff9539", "#ff7751", "#ff5d58"];

    constructor(xPos, yPos, nextX, nextY) {
        this.w = 152;
        this.h = 82;
        this.startX = xPos;
        this.startY = yPos;
        this.x = this.startX;
        this.y = this.startY;
        this.salt = new SaltIcon(this.x + this.w / 2 - 7.0, this.y + this.h / 2 - 7.0, this);
        this.water = new WaterIcon(this.x - this.w / 2 + 7.0, this.y + this.h / 2 - 7.0, this);
        this.c = 300;
        this.isSelected = false;
        this.nextX = nextX + this.w / 2;
        this.nextY = nextY + this.h / 2;
    }   

    paint() {
        // Draw rectangular positions.
        this.colorFillMechanic();

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "30px Courier New";
        CONTEXT.textAlign = "center";
        CONTEXT.fillText(this.c.toString(), this.x, this.y - (this.h / 8.0));

        // Draw water/salt icons.
        this.salt.paint();
        this.water.paint();
    }

    colorFillMechanic() {

        let rad = 15.0;

        CONTEXT.fillStyle = LimbPosition.colorGrad[0];
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

        // // Color change when concentration < 300 or > 1500.
        // if (this.c < 300 | this.c >= 1500) {
        //     CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
        //     CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // // Handle color change when concentration > 300 and < 1500.
        // } else {

        //     switch((this.c / 300.0 % 1).toFixed(2)) {

        //         case (350.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (this.h / 6));
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (5 * this.h / 6), this.w, this.h / 6);
        //             break;

        //         case (400.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (2 * this.h / 6));
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (2 * this.h / 6)), this.w, 2 * this.h / 6);
        //             break;

        //         case (450.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (3 * this.h / 6));
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (3 * this.h / 6)), this.w, 3 * this.h / 6);
        //             break;

        //         case (500.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (4 * this.h / 6));
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (4 * this.h / 6)), this.w, 4 * this.h / 6);
        //             break;

        //         case (550.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (5 * this.h / 6));
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (5 * this.h / 6)), this.w, 5 * this.h / 6);
        //             break;

        //         case (600.0 / 300.0 % 1).toFixed(2): 
        //             CONTEXT.fillStyle = LimbPosition.colorGrad[this.c / 300];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        //             break;

        //     }

        // }

    }

    move(xDiff, yDiff) {

        // Move the limb position itself.
        this.x += xDiff;
        this.y += yDiff;

        // Move its icons.
        this.water.x += xDiff;
        this.water.y += yDiff;
        this.salt.x += xDiff;
        this.salt.y += yDiff;
    }

}

class WaterIcon {

    constructor(xPos, yPos, limbPos) {
        this.id = "water";
        this.w = 28;
        this.h = 40;
        this.startX = xPos + this.w / 2;
        this.startY = yPos - this.h / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.limbPos = limbPos;
    }

    paint() {
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

class SaltIcon {

    constructor(xPos, yPos, limbPos) {
        this.id = "salt";
        this.w = 33;
        this.h = 37;
        this.startX = xPos - this.w / 2;
        this.startY = yPos - this.h / 2;
        this.x = this.startX;
        this.y = this.startY;
        this.limbPos = limbPos;
    }

    paint() {
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