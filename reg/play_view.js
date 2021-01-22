class PlayView {

    constructor() {
        mainDispatcher.addAt(this, 0);
        this.img = "loop-bkgd-empty";
    }

    init() {
        this.loop = new LoopOfHenle();
        this.sidebar = new SideBar();
        mainDispatcher.add(this.sidebar);
    }

    paint() {
        CONTEXT.drawImage(document.getElementById(this.img), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    }

}