// change slide

//TODO: move somewhere...
interface AnimationNode {
    stepIndex: number;
    readonly stepCount: number;
}

function prev(target: AnimationNode) {
    if( target.stepIndex === 0 )
        return;
    --target.stepIndex;
}
function next(target: AnimationNode) {
    if( target.stepIndex >= target.stepCount - 1 )
        return;
    ++target.stepIndex;
}

function getProperties(target: object) {

    // @ts-ignore
    if( target.properties !== undefined)
        // @ts-ignore
        return target.properties;

    return target;
}

function getStepCount(target: object) {

    target = getProperties(target);

    if( "stepCount" in target)
        return target.stepCount as number;

    return 1;
}
function setStepIndex(target: object, index: number) {
    
    target = getProperties(target);
    
    if( "stepIndex" in target) {
        target.stepIndex = index;
        return;
    }

    return;
}

// some of the stuff should be external...
// inherit to handle location.hash & other ?
class Frames implements AnimationNode {

    readonly frames       : readonly HTMLElement[];
    readonly framesEndSteps: number[];

    protected _stepIndex: number = 0;
    readonly stepCount: number;

    readonly SessionKey = "wsidx-" + location.origin + location.pathname;

    constructor(target: HTMLElement) {
        this.frames = [...target.querySelectorAll<HTMLElement>('.ws-frame')];

        this.framesEndSteps = new Array(this.frames.length);
        let cur = 0;
        for(let i = 0; i < this.frames.length; ++i) {
            cur += getStepCount(this.frames[i]);
            this.framesEndSteps[i] = cur;
        }

        this.stepCount = cur;

        // restore scroll immediately.
        history.scrollRestoration = "manual";
        window.addEventListener("hashchange", () => {
            // could be more robust...
            frames.updateCurrentStep();
        });

        const stepIdx = sessionStorage.getItem(this.SessionKey);

        //TODO: #id must NOT be id= else browser cause issues...
        if( stepIdx !== null ) {
            this.stepIndex = +stepIdx;
            return;
        }

        const hash = location.hash.slice(1);
        if( hash !== "") {
            const target = document.getElementById(decodeURIComponent(hash))!;
            frames.setStepAt(target);
        }
    }

    get stepIndex() {
        return this._stepIndex;
    }

    set stepIndex(step: number) {

        console.error("set", step);

        sessionStorage.setItem(this.SessionKey, `${step}`);

        const frameID = this.framesEndSteps.findIndex( endStep => step < endStep);

        const frame = this.frames[frameID];

        let offset = 0;
        if( frameID !== 0)
            offset = this.framesEndSteps[frameID-1];

        setStepIndex(frame, step - offset);

        // avoid offsetTop: it doesn't work with subpixels, produces jitters.
        frame.scrollIntoView({behavior: "instant"});

        this._stepIndex = step;
    }

    setStepAt(target: HTMLElement) {
        const frame = target.querySelector<HTMLElement>(".ws-frame")!;
        let cur = this.frames.indexOf(frame);

        if( cur !== 0 )
            cur = this.framesEndSteps[cur-1];

        this.stepIndex = cur;
    }

    updateCurrentStep() {

        const pos = document.querySelector("main")!.scrollTop;

        let cur = 0;
        while( cur != this.frames.length - 1 && pos >= this.frames[cur].offsetTop)
            ++cur;

        if( cur !== 0 )
            cur = this.framesEndSteps[cur-1];

        this.stepIndex = cur;
    }
}

const frames = new Frames(document.body);

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