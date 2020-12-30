class LoopOfHenle {

    constructor(dispatcher) {
        dispatcher.add(LOOP_OF_HENLE);

        // Add the positions.
        D_LIMB.forEach(pos => {
            dispatcher.add(pos);
        });
        A_LIMB.forEach(pos => {
            dispatcher.add(pos);
        });
        INTER_FLUID.forEach(pos => {
            dispatcher.add(pos);
        });

        // Add the icons.
        D_LIMB.forEach(pos => {
            dispatcher.add(pos.salt);
            dispatcher.add(pos.water);
        });
        A_LIMB.forEach(pos => {
            dispatcher.add(pos.salt);
            dispatcher.add(pos.water);        
        });
    }

}