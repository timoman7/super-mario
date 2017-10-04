import {Matrix} from './math.js';

export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
        });
    };
}

export function createCollisionLayer(level) {
    const tileCol = level.tileCollision;

    const usedTiles = new Matrix();

    const originalGetTile = tileCol.getTile;

    tileCol.getTile = function fakeGetTile(x, y) {
        usedTiles.set(x, y, true);
        return originalGetTile.call(tileCol, x, y);
    }

    return function drawCollisions(context) {
        const ts = tileCol.tileSize;

        // context.strokeStyle = 'blue';
        // usedTiles.forEach((value, x, y) => {
        //     context.beginPath();
        //     context.rect(x * ts, y * ts, ts, ts);
        //     context.stroke();
        // });
        usedTiles.clear();

        // context.strokeStyle = 'red';
        // level.entities.forEach(entity => {
        //     context.beginPath();
        //     context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
        //     context.stroke();
        // });
    };
}
