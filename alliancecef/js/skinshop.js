cef.on("show-skin", () => {
    document.getElementById("skin-menu").style = `display: block`;
});

cef.on("hide-skin", () => {
    document.getElementById("skin-menu").style = `display: none`;
})

cef.on("update-skin", (id, value) => {
    document.getElementById(`skin-player-${id}`).innerHTML = value;
});