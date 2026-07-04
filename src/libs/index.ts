import "WebSlides@2026:components/slide/overview";
import "WebSlides@2026:components/slide/scale";
import "WebSlides@2026:components/slide/browse";
import "WebSlides@2026:components/slide/menu";

import "WebSlides@2026:components/frames/FrameUCA";
import "WebSlides@2026:components/frames/FrameUCATitle";
import "WebSlides@2026:components/frames/FrameUCAPlain";

import "MWL@2026:Components/page/color-switch";
import "MWL@2026:Components/code/code-script";

/*
import LISS from "@LISS/src";

const css = `
    
`;

class FrameUCAPlain extends LISS({
    css
})<void> {
    constructor() {
        super();
        this.host.classList.add('ws-frame');
    }
}

LISS.define("frame-uca-plain", FrameUCAPlain);

const frametitle_css = `
    :host > .title > h1 {
        color: var(--uca_green);
        text-align: center;
    }
    :host > .title > h2 {
        color: var(--uca_green);
        text-align: center;
        font-style: italic;
        margin-top: 0;
    }

    :host .date {
        font-size: small;
        font-style: italic;
    }

    :host > div {
        text-align: center;
        color: var(--uca_gray);

        & > .mail {
            font-style: italic;
        }
    }
`;
const html = 
`<div class="title">
<h1></h1>
<h2></h2>
</div>
<div>
    <span class="author"></span><br/>
    <span class="mail"></span>
</div>
<div>
    <span class="date"></span>
</div>
`;

class FrameUCATitle extends LISS({
    css: [css, frametitle_css],
    html,
    attributes: ["caption", "subcaption", "author", "mail"]
})<void> {
    constructor() {
        super();
        this.host.classList.add('ws-frame');

        this.content.querySelector('h1')!.textContent = this.host.getAttribute("caption");
        this.content.querySelector('h2')!.textContent = this.host.getAttribute("subcaption");
        this.content.querySelector('.author')!.textContent = this.host.getAttribute("author");
        this.content.querySelector('.mail')!.textContent = this.host.getAttribute("mail");
        this.content.querySelector('.date')!.textContent = "(dernière modification le " + new Date(document.lastModified).toLocaleDateString('fr-FR', { year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute: "2-digit"}) + ")";
    }

}

LISS.define("frame-uca-title", FrameUCATitle);

{
    class FrameSection       extends LISS({ shadow: null })<void> {}
    class FrameSubSection    extends LISS({ shadow: null })<void> {}
    class FrameSubSubSection extends LISS({ shadow: null })<void> {}

    LISS.define("frame-section"      , FrameSection);
    LISS.define("frame-subsection"   , FrameSubSection);
    LISS.define("frame-subsubsection", FrameSubSubSection);
}
*/