let t = 0, w = 0, h = 0;

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('typingGame');
    canvas.width = w;
    canvas.height = h;
}

function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();

    window.requestAnimationFrame(redraw);


}

function redraw() {
    const canvas = document.getElementById('typingGame');
    const context = canvas.getContext('2d');

    context.strokeStyle = 'yellow';
    context.beginPath();
    context.rect(50, 50, w,h);
    context.stroke();

}


