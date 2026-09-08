import { View, LazyCoordinator, defineWidget } from "MWL@2026/exports/Widget";
import { listen } from "MWL@2026/exports/Reactive/Observable";
import { frameEffect } from "MWL@2026/exports/browser/scheduler";
import { ReactiveAnimationNode } from "WebSlides@2026/models/ReactiveAnimationNode";
import { VisibilityController } from "WebSlides@2026/presentation/navigator/VisibilityController";
import { initSlide } from "../core";

const FrameUCA = defineWidget(
    "frame-uca",
    LazyCoordinator(ReactiveAnimationNode),
    View({

        content: __LOAD_FILE__("./index.html"),
        style  : [
                    __LOAD_FILE__("../FrameUCAPlain/index.css"),
                    __LOAD_FILE__("./index.css")
                ],
        setup(ctrler) {
            initSlide(this.target);
            setCaption(this.target, this.root);
            initializeAnimations(this.target, ctrler);
        }
    })
);

type FrameUCA = InstanceType<typeof FrameUCA>;
export {FrameUCA};

// ad hoc tool.
function initializeAnimations(
                                target: ShadowRoot|HTMLElement,
                                ctlerFactory: (args: {stepCount: number}) => ReactiveAnimationNode
) {

    const visibilityCtrler = new VisibilityController(target);
    const controller       = ctlerFactory({stepCount: visibilityCtrler.stepCount});

    listen(controller, frameEffect(() => {
        visibilityCtrler.setStep(controller.stepIndex);
    }));
}

function setCaption(target: HTMLElement, content: ShadowRoot|HTMLElement) {

    for(let i = 0; i <= 2; ++i) {
            const prefix = "sub".repeat(i);

            const section = target.closest(`frame-${prefix}section`);
            if( section !== null)
                content.querySelector(`.${prefix}section`)!.textContent = section.getAttribute("name");
        }
}