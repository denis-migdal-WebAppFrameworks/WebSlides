import {defineWidget, View} from "MWL@2026/exports/DOM/Widget";
import { initSlide } from "../core";

const FrameUCAPlain = defineWidget(
    "frame-uca-plain",
    View({
        content: __LOAD_FILE__("./index.html"),
        style  : __LOAD_FILE__("./index.css"),
        setup() {
            initSlide(this.target);
        }
    })
);

type FrameUCAPlain = InstanceType<typeof FrameUCAPlain>;

export {FrameUCAPlain};