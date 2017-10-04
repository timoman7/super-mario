import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {createCollisionLayer} from './layers.js';
import {g} from './Level.js';
import Keyboard from './KeyboardState.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1'),
])
.then(([mario, level]) => {

    const gravity = 2000;
    mario.pos.set(64, 64);
    mario.vel.set(50, 0);

    level.entities.add(mario);

    level.comp.layers.push(createCollisionLayer(level));

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState.value === 1) {
            mario.jump.start();
            mario.animate.state_name = "jump_";
            mario.animate.frameID = 0;
        } else {
            mario.jump.cancel();
        }
    });
    input.addMapping(39, keyState => {
        //mario.go.speed = keyState.value === 1 ? Math.max(Math.min(mario.go.speed + keyState.shiftKey,mario.MAX_SPEED),mario.MIN_SPEED) : mario.go.DEFAULT_SPEED;
        if(keyState.value === 1){
          mario.go.SHIFTED = keyState.shiftKey;
          mario.go.dir = keyState.value;
          mario.animate.state_name = "run_";
        }else{
          mario.go.dir = 0;
        }
    });
    input.addMapping(37, keyState => {
        //mario.go.speed = keyState.value === 1 ? Math.max(Math.min(mario.go.speed + keyState.shiftKey,mario.MAX_SPEED),mario.MIN_SPEED) : mario.go.DEFAULT_SPEED;
        if(keyState.value === 1){
          mario.go.SHIFTED = keyState.shiftKey;
          mario.go.dir = -keyState.value;
          mario.animate.state_name = "run_";
        }else{
          mario.go.dir = 0;
        }

    });
    input.addMapping(40, keyState => {
      if(keyState.value === 1){
        if(mario.SIZE_STATE === "b"){
          mario.animate.crouching = true;
        }
      }else{
        mario.animate.crouching = false;
      }
    });
    window.mario = mario;
    input.listenTo(window);

    canvas.addEventListener('mousedown', event => {
        if (event.buttons === 1) {
            mario.vel.set(0, 0);
            mario.pos.set(event.offsetX, event.offsetY);
        }
    });


    const timer = new Timer(1/60);
    window._context = context;
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        level.comp.draw(context);
        mario.vel.y += gravity * deltaTime;
        g.globalGravity = gravity * deltaTime;
        // context.resetTransform();
        // context.translate((-mario.pos.x) + (context.canvas.width / 4), (-mario.pos.y) + (context.canvas.height / 4));
    }

    timer.start();
});
