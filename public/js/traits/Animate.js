import {Trait} from '../Entity.js';

export default class Animate extends Trait {
    constructor() {
        super('animate');
        /**
        * Syntax for STATES is as follows:
        * {
        *  The direction the entity is facing, depicted by entity.go.dir:
        *  {
        *   name of the state, followed by _ and the state of the size of the entity, in Mario's case: (s) for small and (b) for big:
        *   [
        *     Sequence of the animation, named as the state_size_direction(l or r)<_frame of the sprite, if any>
        *   ]
        *  }
        * }
        * An example is this:
        * '-1': // Facing Left
        * {
        *   "run_s": //Sprite animation for running while small
        *   [
        *     "run_s_l_0",  //First frame of the animation
        *     "run_s_l_1",  //Second frame of the animation
        *     "run_s_l_2"   //Third frame of the animation
        *   ]
        * }
        * I added the function to autoconstruct sets of sprite animations in sprites.js
        */
        this.STATES = {
          '-1':{
            "idle_s":[
              'idle_s_l'
            ],
            "run_s":[
              'run_s_l_0',
              'run_s_l_1',
              'run_s_l_2'
            ],
            "jump_s":[
              'jump_s_l'
            ],
            "idle_b":[
              'idle_b_l'
            ],
            "run_b":[
              'run_b_l_0',
              'run_b_l_1',
              'run_b_l_2'
            ],
            "jump_b":[
              'jump_b_l'
            ],
            "crouch_b":[
              'crouch_b_l'
            ],
          },
          '0':{
            "idle_s":[
              'idle_s_r'
            ],
            "jump_s":[
              'jump_s_r'
            ],
            "idle_b":[
              'idle_b_r'
            ],
            "jump_b":[
              'jump_b_r'
            ],
            "crouch_b":[
              'crouch_b_r'
            ],
          },
          '1':{
            "idle_s":[
              'idle_s_r'
            ],
            "run_s":[
              'run_s_r_0',
              'run_s_r_1',
              'run_s_r_2'
            ],
            "jump_s":[
              'jump_s_r'
            ],
            "idle_b":[
              'idle_b_r'
            ],
            "run_b":[
              'run_b_r_0',
              'run_b_r_1',
              'run_b_r_2'
            ],
            "jump_b":[
              'jump_b_r'
            ],
            "crouch_b":[
              'crouch_b_r'
            ],
          }
        };
        this.DEFAULT_SIZE = "s";
        this.state_name = 'idle_';
        this.current_state = this.STATES["1"][this.state_name+this.DEFAULT_SIZE][0];
        this.lastDir = "1";
        this.frameID = 0;
        this.elapsedTime = 0;
        this.crouching = false;
    }

    update(entity, deltaTime) {
      /**
      * This sets the last valid direction the entity was facing: Left(-1) or right(1)
      */
      let curDir = ""+entity.go.dir;
      if(curDir === "0"){
        curDir = this.lastDir;
      }else{
        this.lastDir = curDir;
      }
      entity.size.set(14, entity.SIZE_STATE === 'b' ? 32 : (entity.SIZE_STATE === 's' ? 16 : 16));
      /**
      * Animation "fixing", needs major improvement
      * "crouch_" SHOULD be called when the down arrow, or whatever key is decided to crouch, is pressed
      * It should also be noted that crouching should only be possible when the user is standing still
      * or moving horizontally in the air.
      * If the entity IS crouching, the entity should NOT be able to move horizontally on their own.
      */
      if(entity.vel.x === 0 && entity.go.dir === 0 && ( this.state_name !== "jump_" || entity.vel.y === 0)){
        this.state_name = "idle_";
        this.frameID = 0;
        this.elapsedTime = 0;
      }
      if(this.crouching){
        this.state_name = "crouch_";
        this.frameID = 0;
      }else{
        if(this.state_name === "crouch_"){
          this.state_name = "idle_";
        }
      }
      let frameCount = this.STATES[curDir][this.state_name+entity.SIZE_STATE].length;
      this.current_state=this.STATES[curDir][this.state_name+entity.SIZE_STATE][this.frameID];
      if(this.elapsedTime > frameCount / (Math.abs(entity.vel.x)/8 + 1)){
        this.frameID++;
        this.elapsedTime = 0;
      }else{
        this.elapsedTime += deltaTime;
      }
      if(this.frameID > frameCount - 1){
        this.frameID = 0;
      }
    }
}
