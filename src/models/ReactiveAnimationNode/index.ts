import { Properties } from "MWL@2026/modules/Reactive/Collections/Properties";
import { Fixed, Value } from "MWL@2026/modules/Reactive/Property";
import { AnimationNode } from "../AnimationNode";

export class ReactiveAnimationNode extends Properties({
                                        stepIndex: Value(0),
                                        stepCount: Fixed(1),
                                    })
                                    implements AnimationNode {}