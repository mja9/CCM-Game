class PlayView {

    constructor() {
        mainDispatcher.add(this);
    }

    init() {
        this.loop = new LoopOfHenle();
        this.sidebar = new SideBar();
        mainDispatcher.add(this.sidebar);
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("loop-bkgd"), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    }

}