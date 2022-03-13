
type Direction = 'up' | 'right' | 'down' | 'left';
interface GameInputEvent {
    code?: string,
    direction?: Direction
};

class GameControls extends EventTarget
{

    bindings: {[key: string]: Direction} = {
        'KeyW': 'up',
        'KeyA': 'left',
        'KeyS': 'down',
        'KeyD': 'right',

        'ArrowUp': 'up',
        'ArrowLeft': 'left',
        'ArrowDown': 'down',
        'ArrowRight': 'right',
    };

    keyHandler = this.keyInputHandler.bind(this);
    touchHandler = this.touchInputHandler.bind(this);

    els: HTMLElement[] = [];

    constructor()
    {
        super();

        window.addEventListener('keydown', this.keyHandler);
    }

    attachElement(el: HTMLElement)
    {
        // el.addEventListener('keydown', this.keyHandler);
        el.addEventListener('touchstart', this.touchHandler);
        this.els.push(el);
    }

    detachElement(el: HTMLElement)
    {
        // el.removeEventListener('keydown', this.keyHandler);
        el.removeEventListener('touchstart', this.touchHandler);
        this.els = this.els.filter((e) => e === el);
    }

    cleanUpEvents()
    {
        this.els.forEach((el) => {
            // el.removeEventListener('keydown', this.keyHandler);
            el.removeEventListener('touchstart', this.touchHandler);
        });

        this.els = [];

        window.removeEventListener('keydown', this.keyHandler);
    }

    keyInputHandler(ev: KeyboardEvent)
    {
        let { code } = ev;

        if(this.bindings[code])
            this.dispatchEvent(
                new CustomEvent<GameInputEvent>('gameInput', {
                    detail: {
                        code, 
                        direction: this.bindings[code]
                    }}));
    }

    touchInputHandler(ev: TouchEvent)
    {
        if(ev.targetTouches.length === 1)
        {
            let isDispacthed = false;
            const touchMoveHandler = (evMove: TouchEvent) => {
                // only run if input event hasnt been dispatched
                // to avoid multiple inputs from one touch instance
                if(!isDispacthed)
                {
                    // calc vector between first and current touch
                    let moveVec = [
                        evMove.targetTouches[0].clientX - ev.targetTouches[0].clientX,
                        evMove.targetTouches[0].clientY - ev.targetTouches[0].clientY
                    ];

                    // dispatch input event if moved more than 80px
                    if(Math.sqrt(moveVec[0]**2 + moveVec[1]**2) > 80)
                    {
                        let angle = Math.atan2(-moveVec[1], moveVec[0]);
                        angle = (angle / (Math.PI * 2)) * 360;
                        angle = (angle + 360) % 360;

                        let direction: Direction = 
                            angle > 45 && angle < 135 ? 'up' :
                            angle > 135 && angle < 225 ? 'left' :
                            angle > 225 && angle < 315 ? 'down' : 'right';

                        this.dispatchEvent(
                            new CustomEvent<GameInputEvent>('gameInput', {
                                detail: {
                                    direction
                                }}));
                                
                        isDispacthed = true;
                    }
                }
            };
            const touchCancelHandler = () => {
                ev.target?.removeEventListener('touchmove', touchMoveHandler);
                ev.target?.removeEventListener('touchcancel', touchCancelHandler);
                ev.target?.removeEventListener('touchend', touchCancelHandler);
            };
            ev.target?.addEventListener('touchmove', touchMoveHandler);
            ev.target?.addEventListener('touchcancel', touchCancelHandler);
            ev.target?.addEventListener('touchend', touchCancelHandler);
        }
    }
}

export default GameControls;
export type {
    Direction,
    GameInputEvent
};
