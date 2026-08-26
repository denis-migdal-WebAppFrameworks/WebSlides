export interface AnimationNode {
    stepIndex: number;
    readonly stepCount: number;
}

export function prev(target: AnimationNode) {
    if( target.stepIndex === 0 )
        return;
    --target.stepIndex;
}

export function next(target: AnimationNode) {
    if( target.stepIndex >= target.stepCount - 1 )
        return;
    ++target.stepIndex;
}