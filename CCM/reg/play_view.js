class PlayView {

    constructor(dispatcher) {
        dispatcher.add(this);
        this.loop = new LoopOfHenle(dispatcher);
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("loop-bkgd"), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    }

}