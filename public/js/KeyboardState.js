const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
        window.KeyboardState = this;
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event) {
        const {keyCode} = event;

        if (!this.keyMap.has(keyCode)) {
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
        if (this.keyStates.get(keyCode) !== undefined) {
          if (this.keyStates.get(keyCode).value === keyState.value) {
              return;
          }
        }

        this.keyStates.set(keyCode, keyState);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
