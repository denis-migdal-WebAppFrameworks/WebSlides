import { WithProperties } from "MWL@2026/exports/Reactive/PropertySystem";
import { Fixed, Value } from "MWL@2026/exports/Reactive/PropertySystem/controllers";
import { AnimationNode } from "../AnimationNode";

export class ReactiveAnimationNode extends WithProperties({
                                        stepIndex: Value(0),
                                        stepCount: Fixed(1),
                                    })
                                    implements AnimationNode {

    constructor(stepCount: number) {
        super({stepCount});
    }
}