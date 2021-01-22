
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

        // Fade background out.
        CONTEXT.globalAlpha = 0.35;
    }

}


/**
 * This class defines the behavior for all objects with the fading effect. Other classes
 * extend the FadingObject class to apply its behaviour to their own specific paint strategies.
 */
class FadingObject {

    constructor() {
        this.v = 0;
        this.alpha = 0.0;   // This may be set to 1.0 if the object is meant to fade out.
        this.animationDecorator = function() {};
    }

    /**
     * This method is designed to be called at each 
     * tick of the main loop. It updates the state of this object,
     * in this case changing its alpha value.
     */
    move() {
        this.alpha += this.v;

        // Clamp the alpha value.
        if (this.alpha >= 1.0) {
            this.animationDecorator();
            this.alpha = 1.0;
        }

        if (this.alpha <= 0.0) {
            this.animationDecorator();
            this.alpha = 0.0;
        }
    }

}