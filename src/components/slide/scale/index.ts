import { IS_IN_OVERVIEW } from "../overview";

const main = document.querySelector("main")!;
let height_offset = 0;

export function setHeightOffset(off: number) {
    height_offset = off;
    updateRatio();
}

// fit page height
function updateRatio() {
    
    const mh = 420; // height: 148mm - cste fix in CSS

    const isFullScreen = window.screen.height === window.innerHeight;

    const offset = isFullScreen ? 0 : height_offset;

    const vh = document.documentElement.clientHeight - offset; // without scrollbar
    const vw = document.documentElement.clientWidth; // without scrollbar

    const scale = IS_IN_OVERVIEW ? vw/(mh*16/9) : Math.min( vh/mh, vw/(mh*16/9) );

    main.style.setProperty("--scale", `${scale}`);
}

window.addEventListener('resize', updateRatio);
updateRatio();