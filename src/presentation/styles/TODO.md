###
# Helpers (cf MWL...)
###

.overlay {
    display: inline-grid;
    grid: 1 1;

    & > * {
        grid-area: 1 / 1;
    }
}