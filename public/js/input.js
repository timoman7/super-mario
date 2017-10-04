import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity) {
    const input = new Keyboard();

    input.addMapping('Space', keyState => {
        if (keyState.value) {
            entity.jump.start();
            entity.animate.state_name = "jump_";
            entity.animate.frameID = 0;
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        entity.go.SHIFTED = keyState.shiftKey;
        entity.go.dir = keyState.value;
        entity.animate.state_name = "run_";
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.go.SHIFTED = keyState.shiftKey;
        entity.go.dir = -keyState.value;
        entity.animate.state_name = "run_";
    });

    input.addMapping('ArrowDown', keyState => {
      entity.animate.crouching = keyState.value === 1 ? (entity.SIZE_STATE === 'b' ? true : false) : false;
    });

    return input;
}
