cef.on("show-spectate", () => {
    document.getElementById("spectate-menu").style = `display: block`;
});

cef.on("hide-spectate", () => {
    document.getElementById("spectate-menu").style = `display: none`;
})

cef.on("update-spectate", (id, value) => {
    document.getElementById(`spectate-player-${id}`).innerHTML = value;
});