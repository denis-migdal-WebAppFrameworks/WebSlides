import defineWebComponent from "MWL@2026:DOM/WebComponent/defineWebComponent";

const FrameUCAPlain = defineWebComponent(null, {
    name   : "frame-uca-plain",
    content: __LOAD_FILE__("./index.html"),
    style  : [
                __LOAD_FILE__("./index.css")
            ],
    initialize: (ctx) => {
        ctx.target.classList.add('ws-frame');
    }
});

export default FrameUCAPlain;