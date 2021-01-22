// Copyright © 2020 mja9

class SimulationView {

    constructor() {
        mainDispatcher.add(this);
        this.loop = new LoopOfHenle();
        this.sidebar = new SideBar();
        mainDispatcher.add(this.sidebar);
    }

    paint() {
        CONTEXT.drawImage(document.getElementById("loop-bkgd"), 0, 0, CANVAS.clientWidth, CANVAS.clientHeight);
    }

}