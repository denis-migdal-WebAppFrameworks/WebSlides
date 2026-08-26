import { ReactiveCompositeAnimationNode } from "WebSlides@2026/models/ReactiveCompositeAnimationNode";
import { initKeyboardNavigation } from "./keyboard";
import { ReactiveAnimationNode } from "WebSlides@2026/models/ReactiveAnimationNode";
import { Widget } from "MWL@2026/exports/Widget";
import { listenProperty } from "MWL@2026/core/Reactive/PropertySystem/Properties/PropertiesProvider";
import { frameEffect } from "MWL@2026/exports/browser/scheduler";
import { AnimationNode } from "WebSlides@2026/models/AnimationNode";

const ANIMATION_NODE = Symbol();

// ======

const elements = getAnimationsElements(document.body)
const nodes    = elements.map(e => getAnimationNode(e) );

const animationRoot = new ReactiveCompositeAnimationNode(nodes);

initKeyboardNavigation(animationRoot, document);
initializeScroll      (animationRoot, elements);

const stepHisto = initializeHistory(animationRoot);
const stepLocal = initializePersistance(animationRoot);

animationRoot.stepIndex = stepHisto ?? stepLocal ?? 0;

// ======

type AnimationRootNode = ReactiveCompositeAnimationNode;

type AnimationElement = HTMLElement | Widget<ReactiveAnimationNode, "properties">;
function getAnimationsElements(target: HTMLElement) {
   return [...target.querySelectorAll<AnimationElement>('.ws-frame')];
}

function isAnimationNode(element: AnimationElement): element is Widget<ReactiveAnimationNode, "properties"> {

    return "stepIndex" in element && "stepCount" in element;
}

function getAnimationNode(element: AnimationElement & {[ANIMATION_NODE]?: AnimationNode}) {

    if( ANIMATION_NODE in element )
        return element[ANIMATION_NODE];

    if( isAnimationNode(element) )
        return element.properties;

    // object needs to be unique.
    return element[ANIMATION_NODE] = {
        stepIndex: 0,
        stepCount: 1,
    };
}

// ======

function initializeScroll(
                        root: AnimationRootNode,
                        children: readonly HTMLElement[]
                    ) {
    // scroll to
    listenProperty(root, "childIndex", () => {
        children[root.childIndex].scrollIntoView({behavior: "instant"});
    });

    // when the menu scroll jump to a slide.
    window.addEventListener("hashchange", () => {
        // could be more robust...
        const pos = document.querySelector("main")!.scrollTop;

        let cur = 0;
        while( cur != children.length - 1 && pos >= children[cur].offsetTop)
            ++cur;

        root.jumpTo( getAnimationNode(children[cur]) );
    });
}

function initializePersistance(root: AnimationRootNode) {

    const SessionKey = "wsidx-" + location.origin + location.pathname;

    listenProperty(root, "stepIndex", frameEffect(() => {
        sessionStorage.setItem(SessionKey, `${root.stepIndex}`);
    }));

    const stepIndex = sessionStorage.getItem(SessionKey);

    if( stepIndex === null )
        return null;

    return +stepIndex;
}

function initializeHistory(root: AnimationRootNode) {

    // we will scroll ourself.
    history.scrollRestoration = "manual";

    const hash = location.hash.slice(1);
    if( hash !== "") {
        const target = document.getElementById(decodeURIComponent(hash))!
                               .querySelector<AnimationElement>(".ws-frame")!;

        const node = getAnimationNode(target);

        return root.firstStepIndex(node);
    }

    return null;
}