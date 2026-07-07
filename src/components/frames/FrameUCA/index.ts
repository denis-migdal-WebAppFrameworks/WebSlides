import defineWebComponent from "MWL@2026:DOM/WebComponent/defineWebComponent";
import { Fixed } from "MWL@2026:Reactive/Properties/Controllers";
import { WithProperties } from "MWL@2026:Reactive/Properties/createProperties";
import {observe} from "MWL@2026:Reactive/Observers/observe";
import deferredCallback from "MWL@2026:DOM/FrameScheduler/deferredCallback";

export function setCaption(target: HTMLElement, content: ShadowRoot|HTMLElement) {

    for(let i = 0; i <= 2; ++i) {
            const prefix = "sub".repeat(i);

            const section = target.closest(`frame-${prefix}section`);
            if( section !== null)
                content.querySelector(`.${prefix}section`)!.textContent = section.getAttribute("name");
        }
}

class VisibilityController {

    constructor(_target: ShadowRoot|HTMLElement) {
        //TODO...
    }

    get stepCount() {
        return 1;
    }

    setStep() {

    }
}

class Controller extends WithProperties({
                                        stepCount: Fixed<number>(1),
                                        stepIndex: Fixed<number>(0)
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

        const controller = new Controller(1);

        // => create Controller here ???

        // required to be recognized as a slide...
        this.target.classList.add("ws-frame");

        // extract things (?).
        // lock property (?).
        
        setCaption(this.target, this.root);

        // only one prop to observe...
        observe(controller, deferredCallback(this.renderer, () => {

            // for all X => toggle...
            console.warn("idx", controller.properties.stepIndex);
            //TODO: "onslide" animations.
        }));

        return controller;
    }
});

export default FrameUCA;


/*
const onslides = this.host.querySelectorAll<HTMLElement>("[onslide]");

        //TODO: onslide.

        let slide = this.host.getAttribute("slide");
        if( slide === null) { // initial

            let max = 0;
            for(let onslide of onslides) {
                const m = +onslide.getAttribute('onslide')!;
                if( m > max)
                    max = m;
            }

            if( max === 0)
                return;

            const dupl = Array.from({length: max}, (_, idx) => {

                // cloneNode upgrade too soon.
                this.host.setAttribute('slide', `${idx+1}`);
                this.host.toggleAttribute("repeat", false); // ?

                const elem = cloneNode(this, true);

                // dirty h4ck
                //(elem as any).scripts = (this.host as any).scripts;

                return elem;
            });

            this.host.after( ...dupl );
            this.host.setAttribute("slide", "0");
        }

        // TODO: improve onslide... (visibility hidden)
        const slide_id = +( slide ?? "0" );
        for(let onslide of onslides) {
            const cond = onslide.getAttribute('onslide')!;

            const show = cond.split(",").map( p => p.split("-")).some( (part) => {

                if( part.length === 1)
                    return slide_id === +part[0];

                if( slide_id < +part[0] )
                    return false;
                
                if( part[1] === "")
                    return true;
                
                if( slide_id > +part[1] )
                    return false;

                return true;
            });

            if( ! show )
                onslide.classList.add('invisible');
                //  onslide.style.setProperty("display", "none");
        }
*/