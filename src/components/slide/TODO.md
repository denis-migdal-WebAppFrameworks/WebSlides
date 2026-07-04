###
# Helpers (cf MWL...)
###

.invisible {
    visibility: hidden;
}

.overlay {
    display: inline-grid;
    grid: 1 1;

    & > * {
        grid-area: 1 / 1;
    }
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