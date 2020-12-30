class PlayView {

    constructor() {
        mainDispatcher.add(this);
        this.loop = new LoopOfHenle();
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("loop-bkgd"), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    }

}