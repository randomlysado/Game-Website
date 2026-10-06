window.addEventListener('resize', () => {
    gameCanvas.clientWidth = window.innerWidth;
    gameCanvas.clientHeight = window.innerHeight;
    navBar.clientWidth =window.innerWidth;
    console.log("Called");
})