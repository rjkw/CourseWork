let t = 0, w = 0, h = 0;

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('typingcanvas');
    canvas.width = w;
    canvas.height = h;
}

function pageLoad() {


    window.addEventListener("resize", fixSize);
    fixSize();

    window.requestAnimationFrame(redraw);


}

function redraw() {
    const canvas = document.getElementById('typingcanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'gray';
    context.beginPath();
    context.rect(0, 0, w,h);
    context.fill();

    window.requestAnimationFrame(redraw)
}

