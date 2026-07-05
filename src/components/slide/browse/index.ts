// change slide

//TODO: move somewhere...
interface AnimationNode {
    readonly stepIndex: number;
    readonly stepCount: number;
    setStep(step: number): void;
}

function prev(target: AnimationNode) {
    if( target.stepIndex === 0 )
        return;
    target.setStep( target.stepIndex-1 );
}
function next(target: AnimationNode) {
    if( target.stepIndex >= target.stepCount - 1 )
        return;
    target.setStep( target.stepIndex+1 );
}

// TODO: setPage...
class Frames implements AnimationNode {

    readonly frames       : readonly HTMLElement[];
    readonly framesEndSteps: number[];

    stepIndex: number = 0;
    readonly stepCount: number;

    constructor(target: HTMLElement) {
        this.frames = [...target.querySelectorAll<HTMLElement>('.ws-frame')];

        this.framesEndSteps = new Array(this.frames.length);
        let cur = 0;
        for(let i = 0; i < this.frames.length; ++i) {
            //TODO...
            // @ts-ignore
            cur += this.frames[i].toto ?? 1;
            this.framesEndSteps[i] = cur;
        }

        this.stepCount = cur;
    }

    setStep(step: number): void {

        const frameID = this.framesEndSteps.findIndex( endStep => step < endStep);

        // avoid : offsetTop doesn't work with subpixels, produces jitters.
        this.frames[frameID].scrollIntoView({behavior: "instant"});

        //TODO: set frame step...

        this.stepIndex = step;
    }

    updateCurrentStep() {

        const pos = document.querySelector("main")!.scrollTop;

        let cur = 0;
        while( cur != this.frames.length - 1 && pos >= this.frames[cur].offsetTop)
            ++cur;

        console.warn(cur);

        if( cur !== 0 )
            cur = this.framesEndSteps[cur-1];

        console.warn("end", cur);

        this.setStep(cur);
    }
}

const frames = new Frames(document.body);

// restore scroll immediately.
history.scrollRestoration = "manual";
document.getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
frames.updateCurrentStep();

window.addEventListener("hashchange", () => {
    frames.updateCurrentStep();
});

function getAction(ev: KeyboardEvent) {

    let code = ev.code;

    // PageUp/PageDown is emitted by pointers.
    if( code == "PageUp" || code === "ArrowLeft"  || code === "ArrowUp")
        return -1;
    if( code == "PageDown" || code === "ArrowRight" || code === "ArrowDown")
        return +1;

    return null;
}

document.addEventListener("keydown", (ev) => {

    const code = getAction(ev);

    if( code === null)
        return;

    ev.preventDefault();
    if( code === -1 )
        prev(frames);
    if( code === +1 )
        next(frames);
});

document.addEventListener("keypress", (ev) => {
    if( getAction(ev) !== null )
        ev.preventDefault();
});

document.addEventListener("keyup", (ev) => {
    if( getAction(ev) !== null )
        ev.preventDefault();
});