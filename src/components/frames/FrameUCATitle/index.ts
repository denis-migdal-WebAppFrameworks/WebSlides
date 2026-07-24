import {defineWebComponent} from "MWL@2026:exports/DOM/WebComponent";

const FrameUCATitle = defineWebComponent({
    name   : "frame-uca-title",
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
    initialize() {

        const target = this.target;
        const elems  = this.elements;

        target.classList.add('ws-frame');

        const modifDate = new Date(document.lastModified).toLocaleDateString('fr-FR', { year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute: "2-digit"});

        // we use standard attr attributes.
        elems.title   .textContent = target.getAttribute("title");
        elems.subtitle.textContent = target.getAttribute("subtitle");
        elems.author  .textContent = target.getAttribute("author");
        elems.mail    .textContent = target.getAttribute("mail");
        elems.date    .textContent = `Dernière modification le ${modifDate}.`;
    }
});

export default FrameUCATitle;