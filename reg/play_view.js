class PlayView {

    constructor() {
        mainDispatcher.addAt(this, 0);
        this.img = "loop-bkgd-empty";
    }

    init() {
        this.loop = new LoopOfHenle();
        this.sidebar = new SideBar("tutorial");
        mainDispatcher.add(this.sidebar);

        // Add the back to menu button.
        let backToMenu = new Button(49.5, 59, 41, 44, 
            function() {
                location.reload();
            }, "back");
        mainDispatcher.add(backToMenu);
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