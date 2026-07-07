import defineWebComponent from "MWL@2026:DOM/WebComponent/defineWebComponent";
import { Fixed, Value } from "MWL@2026:Reactive/Properties/Controllers";
import { WithProperties } from "MWL@2026:Reactive/Properties/createProperties";
import {renderProperties} from "MWL@2026:DOM/FrameScheduler/PropertyRenderer";

export function setCaption(target: HTMLElement, content: ShadowRoot|HTMLElement) {

    for(let i = 0; i <= 2; ++i) {
            const prefix = "sub".repeat(i);

            const section = target.closest(`frame-${prefix}section`);
            if( section !== null)
                content.querySelector(`.${prefix}section`)!.textContent = section.getAttribute("name");
        }
}

//TODO: move out...
class VisibilityController {

    elements: HTMLElement[];
    isVisible: ((idx: number)=>boolean)[];

    readonly stepCount: number;

    constructor(target: ShadowRoot|HTMLElement) {
        this.elements = [...target.querySelectorAll<HTMLElement>('[onslide]')];
        this.isVisible = new Array(this.elements.length);
        
        let maxStep = 1; // we start at 1...

        for(let i = 0; i < this.elements.length; ++i) {
            // extract parts.
            const parts = this.elements[i].getAttribute("onslide")!
                            .split(",")
                            .map( p => p.split("-")
                                        .map( s => s === "" ? null : +s ) );
            
            // compute max part.
            for(let i = 0; i < parts.length; ++i) {
                const part = parts[i];
                if( part[0] !== null && maxStep < part[0] )
                    maxStep = part[0];
                if( part.length > 1 && part[1] !== null && maxStep < part[1])
                    maxStep = part[1];
            }

            // create isVisible...
            this.isVisible[i] = (idx: number) => {
                for(let i = 0; i < parts.length; ++i) {
                    const part = parts[i];
                    if( part.length === 1 && idx === part[0])
                        return true;

                    if(    (part[0] === null || idx >= part[0])
                        && (part[1] === null || idx <  part[1]))
                        return true;
                }
                return false;
            }
        }

        this.stepCount = maxStep;
    }

    setStep(idx: number) {
        for(let i = 0; i < this.elements.length; ++i) {
            console.warn( this.isVisible[i](idx+1) );
            this.elements[i].classList.toggle("onslide", this.isVisible[i](idx+1));
        }
    }
}

class Controller extends WithProperties({
                                        stepCount: Fixed<number>(1),
                                        stepIndex: Value<number>(0)
                                    }) {
    constructor(stepCount: number) {
        super({stepCount});
    }
}

const FrameUCA = defineWebComponent({
    name   : "frame-uca",
    content: __LOAD_FILE__("./index.html"),
    style  : [
                __LOAD_FILE__("../FrameUCAPlain/index.css"),
                __LOAD_FILE__("./index.css")
            ],
    initialize() {

        // required to be recognized as a slide...
        this.target.classList.add("ws-frame");
        setCaption(this.target, this.root);

        const visibilityCtrler = new VisibilityController(this.target);
        const controller       = new Controller(visibilityCtrler.stepCount);

        // only one property possible...
        renderProperties(controller, this.renderer, () => {
            console.warn("render");
            visibilityCtrler.setStep(controller.properties.stepIndex);
        });

        return controller;
    }
});

export default FrameUCA;