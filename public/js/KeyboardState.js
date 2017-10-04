const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = {
          value: (event.type === 'keydown' ? PRESSED : RELEASED),
          shiftKey: (event.shiftKey ? PRESSED : RELEASED),
          altKey: (event.altKey ? PRESSED : RELEASED),
          ctrlKey: (event.ctrlKey ? PRESSED : RELEASED),
          metaKey: (event.metaKey ? PRESSED : RELEASED)
        };
        if (this.keyStates.get(code) !== undefined) {
          if (this.keyStates.get(code).value === keyState.value) {
              return;
          }
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
