
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

/**
 * This class defines the behaviour for a 
 * dialogue box requiring user input to remove.
 * This is different from a passive dialogue box 
 * which acts independently from the player.
 */
class BlockingDialogue extends FadingObject {

    /**
     * Constructor for the blocking dialogue box.
     * @param {Array} lines An array of strings representing the lines of text.
     * @param {Number} xCenter The x-position about which the text is center-aligned.
     * @param {Number} firstY The y-position of the midline of the first line of text.
     * @param {Number} lineDistance The distance between the midlines of each line of text, assumed to be uniform.
     * @param {*} font A string representing the font name and size to be used for this text box, assumed to be uniform.
     */
    constructor(lines, xCenter, firstY, lineDistance, font) {
        super();
        this.lines = lines;
        this.xCenter = xCenter;
        this.firstY = firstY;
        this.lineDistance = lineDistance;
        this.font = font;
    }

    /**
     * This method uses the fillText() to draw a 
     * multi-line text box on the canvas with the 
     * ability to fade in or out. Text may contain 
     * various colors.
     */
    paint() {
        this.move();    // Update object state.

        // Record the old global alpha.
        let oldAlpha = CONTEXT.globalAlpha;
        CONTEXT.globalAlpha = this.alpha;

        // Draw each line of text on the canvas.
        let y = this.firstY;
        for (let i = 0; i < this.lines.length; i++) {
            
            // Color case.
            if (this.lines[i].includes("$")) {
                this.paintColorLine(this.lines[i], y);

            } else {
                // Text settings set to be compatible with assigned fields.
                CONTEXT.fillStyle = "#252525";
                CONTEXT.font = this.font;
                CONTEXT.textAlign = "center";
                CONTEXT.textBaseline = "middle";
                CONTEXT.fillText(this.lines[i], this.xCenter, y);
            }

            y += this.lineDistance;
        }

        // Make sure to maintain the old alpha.
        CONTEXT.globalAlpha = oldAlpha;
    }

    /**
     * Method to draw a line of text with multiple colors.
     * Colored text is indicated by placing "$(color)...$"
     * around the word(s) that should be painted 
     * in color.
     */
    paintColorLine(line, y) {

        // Split the line up between words with and without color.
        let lineParts = line.split("$");

        // Get the left-most point.
        CONTEXT.font = this.font;
        let start = this.getLineStart(line);

        // Paint each part of the line according to its designation.
        for (let i = 0; i < lineParts.length; i++) {

            if (lineParts[i].length > 0) {  // Skip empty strings.
                let text = lineParts[i];

                // Case where color is specified.
                if (text[0] == "(") {

                    // Get the color.
                    let closeP = text.indexOf(")");
                    let color = text.substring(1, closeP);
                    CONTEXT.fillStyle = color;
                    text = lineParts[i].substring(closeP + 1);

                // Default color case.
                } else {
                    CONTEXT.fillStyle = "#252525";
                }

                // Paint the next portion of text.
                CONTEXT.textAlign = "start";
                CONTEXT.textBaseline = "middle";
                CONTEXT.fillText(text, start, y);

                // Move new starting point past written text.
                start = start + CONTEXT.measureText(text).width;
            }

        }
    }

    /**
     * Helper function for painColorLine()
     * that accurately identifies the x-pos
     * where the line should start painting.
     * Removes all excess characters referring to
     * color from line.
     * @param {String} line The multi-color line to be painted. 
     */
    getLineStart(line) {

        // Cut out all the color refernces in the line.
        let lineWithoutColors = "";


        while (line.length > 0) {

            // Find the next '$' and remove it from new string.
            let nextDollar = line.indexOf("$");

            // Case where no more dollar signs are found.
            if (nextDollar == -1) {
                lineWithoutColors = lineWithoutColors.concat(line);
                line = "";

            } else {
                lineWithoutColors = lineWithoutColors.concat(line.substring(0, nextDollar));

                // Case where '$' is followed by a color.
                if (line[nextDollar + 1] == "(") {
                    let closeP = line.indexOf(")");
                    line = line.substring(closeP + 1);

                // Closing '$' case.
                } else {
                    line = line.substring(nextDollar + 1);
                }
            }

        }

        return this.xCenter - CONTEXT.measureText(lineWithoutColors).width / 2.0;
    }

}
