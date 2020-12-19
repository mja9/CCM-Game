class TitleModel {

    constructor() {
        CANVAS.addEventListener("mousemove", this.menuScrollHandler);
        addClickHandler();
    }

    /**
     * Initialize scroll-over functionality for menu buttons.
     */
    menuScrollHandler(event) {

        let x = event.offsetX;
        let y = event.offsetY;

        CLICKABLE.forEach(btn => {

            // Check if we are hovering over a button.
            if (x >= (btn.x - (btn.w / 2.0)) && x <= (btn.x + (btn.w / 2.0))) {

                if (y >= (btn.y - (btn.h / 2.0)) && y <= (btn.y + (btn.h / 2.0))) {
                
                    btn.color = "#ffab04";
                    btn.isHovering = true;
                    btn.v = 1.5;

                }

            }

            // Check if we have moved off of a button we were hovering over.
            if (btn.isHovering) {

                if (!(x >= (btn.x - (btn.w / 2.0)) && x <= (btn.x + (btn.w / 2.0))) ||
                    (!(y >= (btn.y - (btn.h / 2.0)) && y <= (btn.y + (btn.h / 2.0))))) {
                    
                        btn.color = "#0ba1e7";
                        btn.isHovering = false;
                        btn.v = -1.5;
        
                }

            }

        });

    }

}