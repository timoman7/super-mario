export default class TileCollision {
    constructor(tiles) {
        this.tiles = tiles;
        this.tileSize = 16;
    }

    getTile(tileX, tileY) {
        return this.tiles.get(tileX, tileY);
    }

    indexToPos(index) {
        const p1 = index * this.tileSize;
        const p2 = p1 + this.tileSize;
        return [p1, p2];
    }

    posToIndex(p) {
        return Math.floor(p / this.tileSize);
    }

    posSpanToIndexRange(p1, p2) {
        const pMax = Math.ceil(p2 / this.tileSize) * this.tileSize;
        const range = [];
        for (let p = p1; p < pMax; p = p + this.tileSize) {
            range.push(this.posToIndex(p));
        }
        return range;
    }

    forRange(xRange, yRange, callback) {
        xRange.forEach(x => {
            yRange.forEach(y => {
                const tile = this.getTile(x, y);
                if (tile && tile.name === 'ground') {
                    callback(tile, x, y);
                }
            });
        });
    }

    checkX({bounds, vel}) {
        let x;
        if (vel.x > 0) {
            x = this.posToIndex(bounds.right);
        } else if (vel.x < 0) {
            x = this.posToIndex(bounds.left);
        } else {
            return;
        }

        const yRange = this.posSpanToIndexRange(bounds.top, bounds.bottom);

        this.forRange([x], yRange, (tile, tileX, tileY) => {
            const [
                tileLeft,
                tileRight,
            ] = this.indexToPos(tileX);

            if (vel.x > 0) {
                if (bounds.right > tileLeft) {
                    bounds.right = tileLeft;
                }
            } else if (vel.x < 0) {
                if (bounds.left < tileRight) {
                    bounds.left = tileRight;
                }
            }

            vel.x = 0;
        });
    }

    checkY({bounds, vel}) {
        let y;
        if (vel.y > 0) {
            y = this.posToIndex(bounds.bottom);
        } else if (vel.y < 0) {
            y = this.posToIndex(bounds.top);
        }

        const xRange = this.posSpanToIndexRange(bounds.left, bounds.right);

        this.forRange(xRange, [y], (tile, tileX, tileY) => {
            const [
                tileTop,
                tileBottom,
            ] = this.indexToPos(tileY);

            if (vel.y > 0) {
                if (bounds.bottom > tileTop) {
                    bounds.bottom = tileTop;
                }
            } else if (vel.y < 0) {
                if (bounds.top < tileBottom) {
                    bounds.top = tileBottom;
                }
            }

            vel.y = 0;
        });
    }
}
