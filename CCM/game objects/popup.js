
/**
 * 
 */
class PopUp {

    constructor(xPos, yPos, width, height, message, closeBtn, image) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.m = message;
        this.image = image;
        this.closeButton = closeBtn;

        // Initialize the click action for the button.
        CLICKABLE.push(this.closeButton);

    }

    paint() {

        // Active boxes require semi-transparent background.
        CONTEXT.globalAlpha = 1.0;

        if (this.image == undefined) {

            // Paint body.
            CONTEXT.fillStyle = "coral";
            CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

            // Display message.
            CONTEXT.fillStyle = "black";
            CONTEXT.font = "20px Arial";
            CONTEXT.textAlign = "center";
            var txtHeight = this.y - this.h / 2 + 40.0;

            for (i = 0; i < this.m.length; i++) {
                CONTEXT.fillText(this.m[i], this.x, txtHeight, this.w);
                txtHeight += 40.0;
            }
        } else {
            CONTEXT.drawImage(document.getElementById(this.image), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        }

        this.closeButton.paint();

    }

}