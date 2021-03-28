/**
 * A utility class used to quickly gray out an object. 
 * Its constructor takes in an alpha value and an
 * object whose paint method will be delegated to. 
 * Before painting the delegate object, this object will
 * alter the global alpha value.
 */
class GrayOut {

    /**
     * Constructor for the gray out object.
     * @param {Number} a The alpha value used to gray out the delegate.
     * @param {Object} delegate The subject of this object, the one to be grayed out.
     *                          Assumes delegate contains a paint() method.
     */
    constructor(a, delegate) {
        this.a = a;
        this.delegate = delegate;
    }

    /**
     * Sets the level of the gray out.
     * @param {Number} a The alpha value of this object.
     */
    setAlpha(a) {
        this.a = a;
    }

    /**
     * Performs the graying out effect by changing the alpha value,
     * delegating to object, then reverting the global alpha.
     */
    paint() {
        let lastAlpha = CONTEXT.globalAlpha;
        CONTEXT.globalAlpha = this.a;
        this.delegate.paint();
        CONTEXT.globalAlpha = lastAlpha;
    }

}