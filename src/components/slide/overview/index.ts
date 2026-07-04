const p = new URLSearchParams(location.search);

const IS_IN_OVERVIEW = p.has("overview");

if( IS_IN_OVERVIEW ) {
    const main = document.querySelector("main")!;
    main.style.setProperty('--nb_frame', p.get("overview"));
    document.body.classList.add('overview');
}

export {IS_IN_OVERVIEW};