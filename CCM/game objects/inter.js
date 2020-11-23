class InterPosition {

    static colorGrad = ["#ffd9a6", "#ffc868", "#ffb829", "#ff9539", "#ff7751", "#ff5d58"];

    constructor(xPos, yPos) {
        this.w = 322;
        this.h = 82;
        this.x = xPos;
        this.y = yPos;
        this.c = 300;
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
        //     CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
        //     CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // // Handle color change when concentration > 300 and < 1500.
        // } else {

        //     switch((this.c / 300.0 % 1).toFixed(2)) {

        //         case (350.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (this.h / 6));
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (5 * this.h / 6), this.w, this.h / 6);
        //             break;

        //         case (400.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (2 * this.h / 6));
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (2 * this.h / 6)), this.w, 2 * this.h / 6);
        //             break;

        //         case (450.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (3 * this.h / 6));
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (3 * this.h / 6)), this.w, 3 * this.h / 6);
        //             break;

        //         case (500.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (4 * this.h / 6));
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (4 * this.h / 6)), this.w, 4 * this.h / 6);
        //             break;

        //         case (550.0 / 300.0 % 1).toFixed(2):
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (5 * this.h / 6));
        //             CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
        //             CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (5 * this.h / 6)), this.w, 5 * this.h / 6);
        //             break;

        //         case (600.0 / 300.0 % 1).toFixed(2): 
        //             CONTEXT.fillStyle = InterPosition.colorGrad[this.c / 300];
        //             CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        //             break;

        //     }

        // }

    }

}