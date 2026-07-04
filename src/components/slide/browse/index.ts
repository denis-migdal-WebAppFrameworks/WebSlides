// change slide
let current = 0;

function getCode(ev: KeyboardEvent) {

    let code = ev.code;

    if( code === "ArrowLeft"  || code === "ArrowUp")
        code = "PageUp";
    if( code === "ArrowRight" || code === "ArrowDown")
        code = "PageDown";

    return code;
}
function isDownUp(code: string) {
    return ["PageUp", "PageDown"].includes(code);
}

document.addEventListener("keydown", (ev) => {

    const code = getCode(ev);

    if( isDownUp( code ) ) {
        ev.preventDefault();
        handleEvent( code );
    }

});

document.addEventListener("keypress", (ev) => {

    if( isDownUp( getCode(ev) ) )
        ev.preventDefault();
});

document.addEventListener("keyup", (ev) => {

    if( isDownUp( getCode(ev) ) )
        ev.preventDefault();
});

function handleEvent(code: string) {

    let sections = [...document.querySelectorAll<HTMLElement>('.ws-frame')];

    const pos = document.querySelector("main")!.scrollTop;

    /*
    if( ev.code=== "ArrowLeft" && current !== 0)
        --current;
    if( ev.code=== "ArrowRight" && current !== sections.length - 1 )
        ++current;
    */
    if( code=== "PageUp" ) {

        let cur = sections.length - 1;
        while( cur != 0 && pos <= sections[cur].offsetTop)
            --cur;

        current = cur;
    }
    if( code=== "PageDown" ) {

        let cur = 0;
        while( cur != sections.length - 1 && pos >= sections[cur].offsetTop)
            ++cur;

        current = cur;
    }

    // avoid : offsetTop doesn't work with subpixels, produces jitters.
    sections[current].scrollIntoView({behavior: "instant"});
}