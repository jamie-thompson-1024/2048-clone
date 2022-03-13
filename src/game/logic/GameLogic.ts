
import GameControls, { Direction, GameInputEvent } from "./GameControls";

class GameLogic extends GameControls
{
    grid: number[][] = [];
    width: number = 5;
    height: number = 5;

    onInputListener = this.onInput.bind(this) as unknown as EventListener;

    constructor()
    {
        super();
        this.resetGame();
        this.addEventListener(
            'gameInput', 
            this.onInputListener);
    }

    cleanUpEvents()
    {
        super.cleanUpEvents();

        this.removeEventListener(
            'gameInput', 
            this.onInputListener);
    }

    onInput({ detail }: { detail: GameInputEvent})
    {
        if(detail.direction)
            this.slideGrid(detail.direction);
    }

    resetGame()
    {
        this.wipeGrid();
        this.newTile();
    }

    wipeGrid()
    {
        this.grid = [];
        for(let y = 0; y < this.height; y++)
        {
            this.grid.push([]);
            for(let x = 0; x < this.width; x++)
            {
                this.grid[y].push(0);
            }
        }
            
        this.dispatchEvent(new Event('update'));
    }

    resize(newWidth: number, newHeight: number)
    {
        let newGrid: number[][] = [];
        for(let y = 0; y < this.height; y++)
        {
            newGrid.push([]);
            for(let x = 0; x < this.width; x++)
            {
                newGrid[y].push(0);
            }
        }
        
        this.grid = newGrid;
        this.width = newWidth;
        this.height = newHeight;

        this.dispatchEvent(new Event('resize'));
        this.dispatchEvent(new Event('update'));
    }

    newTile()
    {
        let emptyTiles: [number, number][] = [];
        // get indicies of empty tiles
        this.grid.forEach((row, y) => { 
            row.forEach((val, x) => {
                if(val === 0) emptyTiles.push([y, x]); 
            });
        });
        // get random index from list
        let newTileIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        // set empty tile to 2 70% of time and 4 30% of time
        this.grid[newTileIndex[0]][newTileIndex[1]] = Math.random() > 0.3 ? 2 : 4;
        
        this.dispatchEvent(new Event('update'));
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
        
        this.dispatchEvent(new Event('update'));
    }
}

export default GameLogic;
export type {
    Direction
};
