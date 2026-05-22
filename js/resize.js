const image = document.getElementById('image');
const widthRange = document.getElementById('widthRange');
const heightRange = document.getElementById('heightRange');

const baseWidth = 1050;
const baseHeight = 550;

function resizeImage() {
    const newWidth = (widthRange.value / 100) * baseWidth;
    const newHeight = (heightRange.value / 100) * baseHeight;
    image.style.width = newWidth + "px";
    image.style.height = newHeight + "px";
}

widthRange.addEventListener('input', resizeImage);
heightRange.addEventListener('input', resizeImage);