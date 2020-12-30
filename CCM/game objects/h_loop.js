class LoopOfHenle {

    constructor(dispatcher) {
        dispatcher.add(LOOP_OF_HENLE);
        D_LIMB.forEach(pos => {
            dispatcher.add(pos);
        });
        A_LIMB.forEach(pos => {
            dispatcher.add(pos);
        });
        INTER_FLUID.forEach(pos => {
            dispatcher.add(pos);
        });
    }

}