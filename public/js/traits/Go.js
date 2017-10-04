import {Trait} from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.DEFAULT_SPEED = 6000;
        this.speed = 6000;
        // Is shift being held? Values: 0 | 1
        // Must be changed manually, currently through input.addMapping
        this.SHIFTED = 0;
        // Amount to multiply SHIFTED by
        this.SHIFT_MOD = 1;
    }

    update(entity, deltaTime) {
        /**
        * Set speed to a constrained value between
        * the min speed(entity.MIN_SPEED) and the max speed(entity.MAX_SPEED) of the entity
        * That value is added to the product of SHIFTED and SHIFT_MOD(amount to add, is 0 if shift is not held)
        */
        this.speed = Math.abs(this.dir) === 1 ? Math.max(Math.min(this.DEFAULT_SPEED + (this.SHIFTED * this.SHIFT_MOD), (entity.MAX_SPEED) / deltaTime), (entity.MIN_SPEED) / deltaTime) : this.DEFAULT_SPEED;
        // entity.vel.x = this.speed * (this.dir * (entity.animate.crouching ? 0 : 1)) * deltaTime; // For use later when calculating velocity while crouching
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}
