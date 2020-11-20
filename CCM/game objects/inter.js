class InterPosition {

    static colorGrad = ["#ffe7c7", "#ffbe4d", "#ffab04", "#ff8316", "#ff5f33", "#ff413b"];

    constructor(xPos, yPos) {
        this.w = 323;
        this.h = 85;
        this.x = xPos + this.w / 2;
        this.y = yPos + this.h / 2;
        this.c = 300;
    }   

    paint() {
        // Draw rectangular positions.
        this.colorFillMechanic();

        // Draw numerical representation of concentration.
        CONTEXT.fillStyle = "#252525";
        CONTEXT.font = "40px Trebuchet MS";
        CONTEXT.textAlign = "center";
        CONTEXT.fillText(this.c.toString(), this.x, this.y + 11.0);
    }

    colorFillMechanic() {

        // Color change when concentration < 300 or > 1500.
        if (this.c < 300 | this.c >= 1500) {
            CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
            CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Handle color change when concentration > 300 and < 1500.
        } else {

            switch((this.c / 300.0 % 1).toFixed(2)) {

                case (350.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (5 * this.h / 6), this.w, this.h / 6);
                    break;

                case (400.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (2 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (2 * this.h / 6)), this.w, 2 * this.h / 6);
                    break;

                case (450.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (3 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (3 * this.h / 6)), this.w, 3 * this.h / 6);
                    break;

                case (500.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (4 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (4 * this.h / 6)), this.w, 4 * this.h / 6);
                    break;

                case (550.0 / 300.0 % 1).toFixed(2):
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300)];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h - (5 * this.h / 6));
                    CONTEXT.fillStyle = InterPosition.colorGrad[Math.trunc(this.c / 300) + 1];
                    CONTEXT.fillRect(this.x - this.w / 2, (this.y - this.h / 2) + (this.h - (5 * this.h / 6)), this.w, 5 * this.h / 6);
                    break;

                case (600.0 / 300.0 % 1).toFixed(2): 
                    CONTEXT.fillStyle = InterPosition.colorGrad[this.c / 300];
                    CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
                    break;

            }

        }

    }

}