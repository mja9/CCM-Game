
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