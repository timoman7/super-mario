import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

/**
  * Modified the naming convention of sprite names:
  * Sprite names should be structured as such:
  * sprites.define('<name of sprite state[ex. idle, run, jump...]>_<size of the entity(small=s / big=b)>_<direction of the entity(left=l / right=r)>', ...)
  *                                  ^- In terms of mario mushroom -^
  * Usage of createSpriteSet:
  * createSpriteSet(<SpriteSheet>,
  *                 <name of sprite set(uses same form as sprites.define(<name>))>,
  *                 <starting x position>,
  *                 <starting y position>,
  *                 <width of each sprite>,
  *                 <height of each sprite>,
  *                 <number of frames for the sprite>,
  *                 <direction used when looping(-1 for left, 1 for right)>
  *                 )
*/

function createSpriteSet(sprites, prefix, x, y, w, h, num, dir){

  for(let animIndex = 0; animIndex < num; animIndex++){
    let spriteInc = animIndex * dir;
    sprites.define(prefix+"_"+animIndex, x + (spriteInc * w), y, w, h);
  }
}

export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        let small_y = 44;
        sprites.define('idle_s_r', 276, small_y, 16, 16);
        sprites.define('idle_s_l', 223, small_y, 16, 16);
        createSpriteSet(sprites, "run_s_r", 289, small_y, 16, 16, 3, 1);
        createSpriteSet(sprites, "run_s_l", 208, small_y, 16, 16, 3, -1);
        sprites.define('jump_s_r', 356, small_y, 16, 16);
        sprites.define('jump_s_l', 143, small_y, 16, 16);
        let big_y = 1;
        let big_height = 32;
        sprites.define('idle_b_r', 258, big_y, 16, big_height);
        sprites.define('idle_b_l', 239, big_y, 16, big_height);
        sprites.define('crouch_b_r', 276, big_y, 16, big_height);
        sprites.define('crouch_b_l', 223, big_y, 16, big_height);
        createSpriteSet(sprites, "run_b_r", 299, big_y, 16, big_height, 3, 1);
        createSpriteSet(sprites, "run_b_l", 208, big_y, 16, big_height, 3, -1);
        sprites.define('jump_b_r', 330, big_y, 16, big_height);
        sprites.define('jump_b_l', 143, big_y, 16, big_height);
        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/img/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}
