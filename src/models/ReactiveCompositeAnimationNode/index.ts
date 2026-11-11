import { Properties } from "MWL@2026/modules/Reactive/Collections/Properties";
import { Fixed, Value } from "MWL@2026/modules/Reactive/Property";
import { ReactiveAnimationNode } from "../ReactiveAnimationNode";
import { AnimationNode } from "../AnimationNode";
import { getProperty } from "MWL@2026/modules/Reactive/Property";
import { listen } from "MWL@2026/modules/Observable";
import { addLink } from "MWL@2026/modules/Reactive/Reaction";

export class ReactiveCompositeAnimationNode extends Properties({
                                    // we use -1 for force the initial trigger.
                                    stepIndex : Value(-1),
                                    childIndex: Value(-1),
                                    stepCount : Fixed( 1),
                                })
                                implements ReactiveAnimationNode {

    protected readonly endSteps: number[];
    readonly children: readonly AnimationNode[];

    constructor(nodes: readonly AnimationNode[]) {

        const endSteps = computeEndSteps(nodes);
        super({stepCount: last(endSteps) });

        this.children = nodes;
        this.endSteps = endSteps;

        // ideally we'd want a "conditional" forward.
        // or a non-lazy listener... (based on links ?).
        // we could also use frameEffect...
        listen( getProperty(this, "stepIndex"), () => {

            const childIdx = this.childIndex;

            let offset = 0;
            if( childIdx !== 0)
                offset = this.endSteps[childIdx-1];

            // sur le children...
            const child = this.children[childIdx];
            child.stepIndex = this.stepIndex - offset;
        });

        // => forward prevents loop ?
        const stepIdx  = getProperty(this, "stepIndex");
        const childIdx = getProperty(this, "childIndex");
        //TODO: cache...
        const computed = {
            get() {
                const idx = stepIdx.get();
                return endSteps.findIndex( endStep => idx < endStep);
            },

            isResolved: false
        }
        addLink( stepIdx, childIdx,
                () => childIdx._setSource(computed) );
    }

    firstStepIndex(child: AnimationNode) {

        const idx = this.children.indexOf(child);

        __ASSERT__(idx !== -1, "Animation node not found");

        if( idx === 0 )
            return 0;
    
        return this.endSteps[idx-1];
    }

    jumpTo(child: AnimationNode) {
        this.stepIndex = this.firstStepIndex(child);
    }
}

function last(array: number[]) {
    return array[array.length-1]
}

function computeEndSteps(nodes: readonly AnimationNode[]) {

    let cur = 0;
    const endSteps = new Array(nodes.length);
    for(let i = 0; i < nodes.length; ++i) {
        cur += nodes[i].stepCount;
        endSteps[i] = cur;
    }
    
    return endSteps;
}