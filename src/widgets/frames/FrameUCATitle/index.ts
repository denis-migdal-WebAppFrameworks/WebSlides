import { defineWidget, View } from "MWL@2026/exports/DOM/Widget";
import { initSlide } from "../core";

const FrameUCATitle = defineWidget(
    "frame-uca-title",
    View({
        content: __LOAD_FILE__("./index.html"),
        style  : [
                    __LOAD_FILE__("../FrameUCAPlain/index.css"),
                    __LOAD_FILE__("./index.css")
                ],
        elements: {
            title   : HTMLElement,
            subtitle: HTMLElement,
            author  : HTMLElement,
            mail    : HTMLElement,
            date    : HTMLElement,
        },
        setup() {

            const target = this.target;
            const elems  = this.elements;

            initSlide(this.target);

            const modifDate = formatDate(new Date(document.lastModified));

            // we use standard attr attributes.
            elems.title   .textContent = target.getAttribute("title");
            elems.subtitle.textContent = target.getAttribute("subtitle");
            elems.author  .textContent = target.getAttribute("author");
            elems.mail    .textContent = target.getAttribute("mail");
            elems.date    .textContent = `Dernière modification le ${modifDate}.`;
        }
    })
);

function formatDate(date: Date) {
    return date.toLocaleDateString('fr-FR', { year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute: "2-digit"})
}

type FrameUCATitle = InstanceType<typeof FrameUCATitle>;
export {FrameUCATitle};