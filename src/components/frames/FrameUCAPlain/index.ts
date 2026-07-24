import {defineWebComponent} from "MWL@2026:exports/DOM/WebComponent";

const FrameUCAPlain = defineWebComponent({
    name   : "frame-uca-plain",
    content: __LOAD_FILE__("./index.html"),
    style  : [
                __LOAD_FILE__("./index.css")
            ],
    initialize() {
        this.target.classList.add('ws-frame');
    }
});

export default FrameUCAPlain;