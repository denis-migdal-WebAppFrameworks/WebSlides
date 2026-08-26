export class VisibilityController {

    elements: HTMLElement[];
    isVisible: ((idx: number)=>boolean)[];

    readonly stepCount: number;

    constructor(target: ShadowRoot|HTMLElement) {
        this.elements = [...target.querySelectorAll<HTMLElement>('[onslide]')];
        this.isVisible = new Array(this.elements.length);
        
        let maxStep = 1; // we start at 1...

        for(let i = 0; i < this.elements.length; ++i) {
            // extract parts.
            const parts = this.elements[i].getAttribute("onslide")!
                            .split(",")
                            .map( p => p.split("-")
                                        .map( s => s === "" ? null : +s ) );
            
            // compute max part.
            for(let i = 0; i < parts.length; ++i) {
                const part = parts[i];
                if( part[0] !== null && maxStep < part[0] )
                    maxStep = part[0];
                if( part.length > 1 && part[1] !== null && maxStep < part[1])
                    maxStep = part[1];
            }

            // create isVisible...
            this.isVisible[i] = (idx: number) => {
                for(let i = 0; i < parts.length; ++i) {
                    const part = parts[i];
                    if( part.length === 1 && idx === part[0])
                        return true;

                    if(    (part[0] === null || idx >= part[0])
                        && (part[1] === null || idx <  part[1]))
                        return true;
                }
                return false;
            }
        }

        this.stepCount = maxStep;
    }

    setStep(idx: number) {
        for(let i = 0; i < this.elements.length; ++i) {
            this.elements[i].classList.toggle("onslide", this.isVisible[i](idx+1));
        }
    }
}