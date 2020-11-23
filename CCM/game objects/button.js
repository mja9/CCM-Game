// Copyright © 2020 mja9
"use strict";

/**
 * A class representing buttons and their behaviour 
 * for game menu.
 */
class Button {

    constructor(xPos, yPos, width, height, clickAction, image) {
        this.x = xPos;
        this.y = yPos;
        this.w = width;
        this.h = height;
        this.onClick = clickAction;
        this.image = image
    }

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
    }

    paint() {
        let ratio = 0.0877;

        // Draw the left traingle
        CONTEXT.fillStyle = this.color;
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x - (this.w / 2.0), this.y - (this.h / 2.0));
        CONTEXT.lineTo((this.x - (this.w / 2.0) - (this.w * ratio)), this.y);
        CONTEXT.lineTo(this.x - (this.w / 2.0), this.y + (this.h / 2.0));
        CONTEXT.fill();

        // Draw the right traingle
        CONTEXT.fillStyle = this.color;
        CONTEXT.beginPath();
        CONTEXT.moveTo(this.x + (this.w / 2.0), this.y - (this.h / 2.0));
        CONTEXT.lineTo((this.x + (this.w / 2.0) + (this.w * ratio)), this.y);
        CONTEXT.lineTo(this.x + (this.w / 2.0), this.y + (this.h / 2.0));
        CONTEXT.fill();

        // Draw the words
        CONTEXT.font = "30pt Courier New";
        CONTEXT.textAlign = "center";
        CONTEXT.textBaseline = "middle";
        CONTEXT.fillText(this.label, this.x, this.y);

    }

}

