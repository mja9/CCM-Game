class Dispatcher {

    constructor() {
        this.observers = [];
    }

    /**
     * Adds observer to end of list of observers to be commanded in main loop.
     * @param {Object} observer Assumed to share a method with all other observers.
     */
    add(observer) {
        this.observers.push(observer);
    }

    /**
     * Adds observer to list pf observers at specified position to be commanded in main loop.
     * @param {Object} observer Assumed to share a method with all other observers.
     * @param {Number} index  Position to place new element.
     */
    addAt(observer, index) {
        this.observers.splice(index, 0, observer);
    }

    /**
     * Removes observer from list of observer so it no longer recieves commands.
     * @param {Object} observer Assumed to share a method with all other observers.
     */
    remove(observer) {
        if (this.observers.includes(observer)) {
            this.observers.splice(this.observers.indexOf(observer), 1);
        }
    }

    /**
     * Empties the list of observers.
     */
    removeAll() {
        this.observers = [];
    }

    /**
     * Dispatches command to each of the observers.
     * @param {Function} command A function accepting an observer capable of handling command.
     */
    dispatchCommand(command) {
        this.observers.forEach(observer => {
            command(observer);
        });
    }

}