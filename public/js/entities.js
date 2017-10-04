import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import Animate from './traits/Animate.js';
import Velocity from './traits/Velocity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.size.set(14, 16);
        
        //SIZE_STATE determines marios current size
        mario.SIZE_STATE = "b";
        //MAX_SPEED: Max x velocity
        mario.MAX_SPEED = 300;
        //MIN_SPEED: Min x velocity
        mario.MIN_SPEED = -300;
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Animate());
        //mario.addTrait(new Velocity());

        mario.draw = function drawMario(context) {
            sprite.draw(this.animate.current_state, context, this.pos.x, this.pos.y);
        }

        return mario;
    });
}
