import defineWebComponent from "MWL@2026:DOM/WebComponent/defineWebComponent";

export function setCaption(target: HTMLElement, content: ShadowRoot|HTMLElement) {

    for(let i = 0; i <= 2; ++i) {
            const prefix = "sub".repeat(i);

            const section = target.closest(`frame-${prefix}section`);
            if( section !== null)
                content.querySelector(`.${prefix}section`)!.textContent = section.getAttribute("name");
        }
}


const FrameUCA = defineWebComponent(null, {
    name   : "frame-uca",
    content: __LOAD_FILE__("./index.html"),
    style  : [
                __LOAD_FILE__("../FrameUCAPlain/index.css"),
                __LOAD_FILE__("./index.css")
            ],
    initialize: (ctx) => {

        // required to be recognized as a slide...
        ctx.target.classList.add("ws-frame");
        setCaption(ctx.target, ctx.root);

        // "onslide" animations.
    }
});

export default FrameUCA;