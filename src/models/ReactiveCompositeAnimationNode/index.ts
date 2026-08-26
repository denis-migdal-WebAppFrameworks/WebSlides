import { WithProperties } from "MWL@2026/exports/Reactive/PropertySystem";
import { Fixed, Value } from "MWL@2026/exports/Reactive/PropertySystem/controllers";
import { ReactiveAnimationNode } from "../ReactiveAnimationNode";
import { AnimationNode } from "../AnimationNode";
import { forward } from "MWL@2026/core/Reactive/PropertySystem/Property/sync/forward";
import { getProperty } from "MWL@2026/core/Reactive/PropertySystem/Properties/PropertiesProvider";
import { listen } from "MWL@2026/exports/Reactive/Events";


export class ReactiveCompositeAnimationNode extends WithProperties({
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

        forward( getProperty(this, "stepIndex"),
                 getProperty(this, "childIndex"),
                 (idx) => {
                    return endSteps.findIndex( endStep => idx < endStep);
                 }
            );
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