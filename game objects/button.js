// Copyright © 2020 mja9
"use strict";

/**
 * A class representing buttons and their behaviour.
 */
class Button {

    /**
     * Constrcutor for the button class.
     * @param {Number} xPos x component of the button's center
     * @param {Number} yPos y component of the button's center.
     * @param {Number} width width of the button
     * @param {Number} height height of the button
     * @param {Function} clickAction action triggered when button is clicked
     * @param {String} image DOM reference of the image to be used for the button's appearance.
     */
    constructor(xPos, yPos, width, height, clickAction, image) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.onClick = clickAction;
        this.image = image
    }

    /**
     * Paint method of the button. Paints the image at the specidied location accoring to 
     * its center, width, and height.
     */
    paint() {
        CONTEXT.drawImage(document.getElementById(this.image), this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }

}

class MenuButton {

    constructor(x, y, w, h, clickAction, color, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClick = clickAction;
        this.color = color;
        this.label = label;
        this.isHovering = false;
        this.offset = 0;
        this.v = 0;
    }

    /**
     * Method to animate the button triangles when scrolling over.
     */
    move() {
        this.offset += this.v;

        if (this.offset > 10) {
            this.offset = 10;
        }

        if (this.offset < 0) {
            this.offset = 0;
        } 
    }

    paint() {

        // Move for animation before painting.
        this.move();

        let ratio = 0.0877;

        // Draw the left traingle
        CONTEXT.fillStyle = this.color;
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x - (this.w / 2.0) - this.offset, this.y - (this.h / 2.0));
        CONTEXT.lineTo((this.x - (this.w / 2.0) - (this.w * ratio)) - this.offset, this.y);
        CONTEXT.lineTo(this.x - (this.w / 2.0) - this.offset, this.y + (this.h / 2.0));
        CONTEXT.fill();

        // Draw the right traingle
        CONTEXT.fillStyle = this.color;
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x + (this.w / 2.0) + this.offset, this.y - (this.h / 2.0));
        CONTEXT.lineTo((this.x + (this.w / 2.0) + (this.w * ratio)) + this.offset, this.y);
        CONTEXT.lineTo(this.x + (this.w / 2.0) + this.offset, this.y + (this.h / 2.0));
        CONTEXT.fill();

        // Draw the words
        CONTEXT.font = "25pt Courier New";
        CONTEXT.textAlign = "center";
        CONTEXT.textBaseline = "middle";
        CONTEXT.fillText(this.label, this.x, this.y);

    }

}

class StateButton {

    constructor(x, y, w, h, clickAction, color, label) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.onClick = clickAction;
        this.color = color;
        this.label = label;
        this.gradWidth = 0;
        this.v = 0;
        this.animationDecorator = function() {};
        this.a = 0.0;   // Alpha used for flash animation.
        this.maxAlpha = 0.75;
        this.flashVel = 0.0;   // Delta for alpha per tick.
    }

    /**
     * Set the amount to change the alpha
     * value per tick.
     * @param {*} v Delta alpha per tick.
     */
    setFlashVelocity(v) {
        this.v = v;
    }
    
    /**
     * method to set the max alpha for the 
     * flash animation.
     * @param {Number} maxAlpha 
     */
    setMaxAlpha(maxAlpha) {
        this.maxAlpha = maxAlpha;
    }

    /**
     * Update method to alter the alpha
     * value used in the flash animation per tick.
     */
     updateAlpha() {
        this.a += this.v;

        // Clamp max of the alpha value.
        if (this.a > this.maxAlpha) {
            this.a = this.maxAlpha;
            this.v = -this.v;
        }

        // Clamp the min of the alpha value.
        if (this.a < 0.0) {
            this.a = 0.0;
            this.v = -this.v;
        }    
    }



    paint() {

        // Update state of this button.
        this.updateAlpha();
        this.move();

        let gradient = CONTEXT.createLinearGradient(this.x - (this.w / 2.0), this.y, this.x - (this.w / 2.0) + this.gradWidth, this.y);
        gradient.addColorStop(0, 'rgba(' + this.color + ', 0.5)');
        gradient.addColorStop(1.0, 'rgba(' + this.color + ', 0.0)');
        CONTEXT.fillStyle = gradient;
        CONTEXT.fillRect(this.x - (this.w / 2.0), this.y - (this.h / 2.0), this.w, this.h);

        // Additional animations.
        this.flow();
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
        CONTEXT.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

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
        this.v = 0.0;
    }

    move() {
        this.gradWidth += this.v;
        
        // Clamp.
        if (this.gradWidth < 0) {
            this.gradWidth = 0;
            this.animationDecorator();
            this.animationDecorator = function() {};    // One-time use decorator.
        }

        if (this.gradWidth > this.w) {
            this.gradWidth = this.w;
            this.animationDecorator();
            this.animationDecorator = function() {};    // One-time use decorator.
        }
    }

}

