###
# Helpers (cf MWL...)
###

.hidden {
    display: none;
}
.invisible {
    visibility: hidden;
}

.center {
    margin-left: auto;
    margin-right: auto;
}

.overlay {
    display: inline-grid;
    grid: 1 1;

    & > * {
        grid-area: 1 / 1;
    }
}

div.center {
    width: fit-content;
}

li[mark="🕮"]::marker {
    content: "🕮 ";
    color: unset;
}
li[mark="💡"]::marker {
    content: "💡 ";
    color: unset;
}

.linespace {
    height: 14px;

    &.invisible {
        display: none;
    }
}

.flex {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
.flex-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
}
.flex-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
}
.flex-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
}

img {
    width: 100%;

    &[src$=".svg"] {
        width:60%;
        background-color:white;
        border-radius:5px;
        padding:5px
    }
}

ul+p {
    margin-top: 0.75rem;
}

ul.flex-2 {
    gap: 0px;
}

.terminal {
    margin-left: 25px;
    margin-right: 25px;

    background-color: light-dark(white, black);
    border: 1px solid gray; border-radius: 5px; padding: 5px;
    & > pre {
        margin: 0;
    }
}

todo {
    display: block;

    background-color: yellow;
    color: black;
    padding: 2px;
    border-radius: 4px;

    &::before {
        content: "[TODO] "
    }
}