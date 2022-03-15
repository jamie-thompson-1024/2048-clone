
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

        this.dispatchEvent(new Event('update'));
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
    }

    resize(newWidth: number, newHeight: number)
    {   
        this.width = newWidth;
        this.height = newHeight;

        this.wipeGrid();
        this.newTile();

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
        // end function if no empty tiles
        if(emptyTiles.length === 0) return;
        // get random index from list
        let newTileIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        // set empty tile to 2 70% of time and 4 30% of time
        this.grid[newTileIndex[0]][newTileIndex[1]] = Math.random() > 0.3 ? 2 : 4;
    }

    slideGrid(dir: Direction)
    {

        let spawnNewTile = false;

        switch(dir)
        {
            case 'down':
                for(let x = 0; x < this.width; x++)
                    for(let y = this.height - 2; y >= 0; y--)
                        if(this.grid[y][x] > 0)
                        {
                            let moveTo: [number, number] | undefined;
                            for(let backStep = y + 1; backStep < this.height; backStep++)
                            {
                                if(
                                    this.grid[backStep][x] === 0 || 
                                    this.grid[backStep][x] === this.grid[y][x])
                                {
                                    moveTo = [x, backStep];
                                }else{
                                    break;
                                }
                            }
                            if(moveTo) 
                            {
                                spawnNewTile = true;
                                this.grid[moveTo[1]][moveTo[0]] += this.grid[y][x];
                                this.grid[y][x] = 0;
                            }
                        }
                break;
            case 'left':
                for(let y = 0; y < this.height; y++)
                    for(let x = 1; x < this.width; x++)
                        if(this.grid[y][x] > 0)
                        {
                            let moveTo: [number, number] | undefined;
                            for(let backStep = x - 1; backStep >= 0; backStep--)
                            {
                                if(
                                    this.grid[y][backStep] === 0 || 
                                    this.grid[y][backStep] === this.grid[y][x])
                                {
                                    moveTo = [backStep, y];
                                }else{
                                    break;
                                }
                            }
                            if(moveTo) 
                            {
                                spawnNewTile = true;
                                this.grid[moveTo[1]][moveTo[0]] += this.grid[y][x];
                                this.grid[y][x] = 0;
                            }
                        }
                break;
            case 'right':
                for(let y = 0; y < this.height; y++)
                    for(let x = this.width - 2; x >= 0; x--)
                        if(this.grid[y][x] > 0)
                        {
                            let moveTo: [number, number] | undefined;
                            for(let backStep = x + 1; backStep < this.width; backStep++)
                            {
                                if(
                                    this.grid[y][backStep] === 0 || 
                                    this.grid[y][backStep] === this.grid[y][x])
                                {
                                    moveTo = [backStep, y];
                                }else{
                                    break;
                                }
                            }
                            if(moveTo) 
                            {
                                spawnNewTile = true;
                                this.grid[moveTo[1]][moveTo[0]] += this.grid[y][x];
                                this.grid[y][x] = 0;
                            }
                        }
                break;
            case 'up':
                for(let x = 0; x < this.width; x++)
                    for(let y = 0; y < this.height; y++)
                        if(this.grid[y][x] > 0)
                        {
                            let moveTo: [number, number] | undefined;
                            for(let backStep = y - 1; backStep >= 0; backStep--)
                            {
                                if(
                                    this.grid[backStep][x] === 0 || 
                                    this.grid[backStep][x] === this.grid[y][x])
                                {
                                    moveTo = [x, backStep];
                                }else{
                                    break;
                                }
                            }
                            if(moveTo) 
                            {
                                spawnNewTile = true;
                                this.grid[moveTo[1]][moveTo[0]] += this.grid[y][x];
                                this.grid[y][x] = 0;
                            }
                        }
                break;
        }

        if(spawnNewTile)
            this.newTile();
        
        this.dispatchEvent(new Event('update'));
    }
}

export default GameLogic;
export type {
    Direction
};
