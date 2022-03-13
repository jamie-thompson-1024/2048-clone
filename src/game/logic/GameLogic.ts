
import GameControls, { Direction } from "./GameControls";

class GameLogic
{
    grid: number[] = [];
    width: number = 5;
    height: number = 5;

    constructor()
    {

    }

    wipeGrid()
    {
        this.grid = this.grid.map(() => { return 0; });
    }

    resize()
    {
        let newGrid = [];
        for(let i = 0; i < this.width * this.height; i++)
            newGrid.push(0);
        
    }

    newTile()
    {
        let emptyTiles: number[] = [];
        // get indicies of empty tiles
        this.grid.forEach((val, i) => { if(val === 0) emptyTiles.push(i); });
        // get random index from list
        let newTileIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        // set empty tile to 2 70% of time and 4 30% of time
        this.grid[newTileIndex] = Math.random() > 0.3 ? 2 : 4;
    }

    slideGrid(dir: Direction)
    {
        switch(dir)
        {
            case 'down':
                
                break;
            case 'left':

                break;
            case 'right':

                break;
            case 'up':

                break;
        }
    }
}

export default GameLogic;
export type {
    Direction
};
