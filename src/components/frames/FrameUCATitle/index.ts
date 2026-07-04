import defineWebComponent from "MWL@2026:DOM/WebComponent/defineWebComponent";

const FrameUCATitle = defineWebComponent(null, {
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
    initialize: (ctx) => {
        ctx.target.classList.add('ws-frame');

        const modifDate = new Date(document.lastModified).toLocaleDateString('fr-FR', { year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute: "2-digit"});

        // we use standard attr attributes.
        ctx.elements.title   .textContent    = ctx.target.getAttribute("title");
        ctx.elements.subtitle.textContent = ctx.target.getAttribute("subtitle");
        ctx.elements.author  .textContent = ctx.target.getAttribute("author");
        ctx.elements.mail    .textContent = ctx.target.getAttribute("mail");
        ctx.elements.date    .textContent = `Dernière modification le ${modifDate}.`;
    }
});

export default FrameUCATitle;