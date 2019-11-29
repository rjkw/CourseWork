function pageLoad() {
    const canvas = document.getElementById('typingGame')
    const context = canvas.getContext('2d');

    context.fillStyle = 'blue';
    context.beginPath();
    context.rect(0, 0, 1000, 750);
    context.fill();
}