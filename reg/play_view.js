class PlayView {

    constructor() {
        mainDispatcher.addAt(this, 0);
        this.img = "loop-bkgd-empty";
    }

    init() {
        this.loop = new LoopOfHenle();
        this.sidebar = new SideBar("tutorial");
        mainDispatcher.add(this.sidebar);
    }

    /**
     * Switches the background from empty
     * to the background used with the loop of Henle.
     */
    switchBackground() {
        this.img = "loop-bkgd";
    }

    paint() {
        CONTEXT.drawImage(document.getElementById(this.img), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    }

}