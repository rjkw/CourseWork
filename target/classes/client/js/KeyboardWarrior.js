let t = 0, w = 0, h = 0;
let lastTimestamp = 0;
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

    preparewords();



}

function redraw() {
    const canvas = document.getElementById('typingcanvas');
    const context = canvas.getContext('2d');

    /*  context.fillStyle = 'gray';
     context.beginPath();
     context.rect(0, 0, w,h);
     context.fill();
 */
    window.requestAnimationFrame(redraw)
}



class Words {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.dx = 256;
        this.edge = false;
        this.alive = true;


    }

    draw(context) {

        context.strokeStyle = 'black';
        context.strokeText("Test");

    }

    update(frameLength) {

        this.edge = false;
        this.x += frameLength * this.dx;
        if (this.x < 50 || this.x > w - 50) this.edge = true;

        this.reload -= frameLength;

    }
}

function preparewords() {
    let x = 0;
    let y = h / 2;

    Words.draw = function (context) {
        context.strokeStyle = 'black';
        context.strokeText("Test");

    }


    function gameFrame(timestamp) { //

        if (lastTimestamp === 0) lastTimestamp = timestamp;
        const frameLength = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        // inputs();
        // processes(frameLength);
        outputs();

        window.requestAnimationFrame(gameFrame);

    }

    function outputs() {
        const canvas = document.getElementById('invadersCanvas');
        const context = canvas.getContext('2d');

        Words.draw();

    }
}
