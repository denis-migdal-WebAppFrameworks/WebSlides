import { AnimationNode, next, prev } from "WebSlides@2026/models/AnimationNode";

// because Document|HTMLElement lose event type.
interface KeyboardEventSource {
  addEventListener(
    type: "keydown"|"keypress"|"keyup",
    listener: (event: KeyboardEvent) => void
  ): void;
}

export function initKeyboardNavigation(
                                        target     : AnimationNode,
                                        eventSource: KeyboardEventSource
                                    ) {

    eventSource.addEventListener("keypress", resolveKeyAction);
    eventSource.addEventListener("keyup"   , resolveKeyAction);

    document.addEventListener("keydown", (ev) => {

        const code = resolveKeyAction(ev);

        if( code === null) return ;
        if( code === -1  ) return prev(target);
        if( code === +1  ) return next(target);
    });
}


function getAction(ev: KeyboardEvent) {

    let code = ev.code;

    // PageUp/PageDown is emitted by pointers.
    if( code == "PageUp"   || code === "ArrowLeft"  || code === "ArrowUp")
        return -1;
    if( code == "PageDown" || code === "ArrowRight" || code === "ArrowDown")
        return +1;

    return null;
}

export function resolveKeyAction(ev: KeyboardEvent) {

    const action = getAction(ev);

    if( action !== null )
        ev.preventDefault();

    return action;
}