import Compositor from './Compositor.js';
import TileCollision from './TileCollision.js';
import {Matrix} from './math.js';

export const g={globalGravity: 0};
export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();

        this.tileCollision = new TileCollision(this.tiles);
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollision.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollision.checkY(entity);
        });
    }
}
