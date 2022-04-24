const playBtn = document.querySelector('.fa-play');
const images = document.querySelectorAll('.diaporama img');
const forwardBtn = document.querySelector('.fa-forward');
const backwardBtn = document.querySelector('.fa-backward');
const randomBtn = document.querySelector('.fa-random');
const fullscreenBtn = document.querySelector('.fa-expand');
const diapo = document.querySelector('section');

let interval;
let id = 0;
let play = false;
let fullscreen = false;

// BASIC Functions

function imageForward() {
  images[id].classList.toggle('visible');
  smallImages[id].classList.toggle('snapshot__img--selected');

  id = id === images.length - 1 ? 0 : id + 1;

  images[id].classList.toggle('visible');
  smallImages[id].classList.toggle('snapshot__img--selected');
}

function imageBackward() {
  images[id].classList.toggle('visible');
  smallImages[id].classList.toggle('snapshot__img--selected');

  if (id === 0) {
    id = images.length - 1;
  } else {
    id -= 1;
  }
  images[id].classList.toggle('visible');
  smallImages[id].classList.toggle('snapshot__img--selected');
}

function playHandler() {
  playBtn.classList.toggle('fa-play');
  playBtn.classList.toggle('fa-pause');
  if (play === false) {
    interval = setInterval(imageForward, 1000);
    play = true;
    return;
  }
  play = false;
  window.clearInterval(interval);
}

function randomHandler() {
  let randomId;
  do {
    randomId = getRandomInt(images.length);
  } while (randomId === id);

  images[id].classList.toggle('visible');
  smallImages[id].classList.toggle('snapshot__img--selected');
  images[randomId].classList.toggle('visible');
  smallImages[randomId].classList.toggle('snapshot__img--selected');
  id = randomId;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function fullscreenHandler() {
  if (fullscreen === false) {
    diapo.requestFullscreen();
    fullscreen = true;
  } else {
    document.exitFullscreen();
    fullscreen = false;
  }
}

function keyboardHandler(event) {
  switch (event.key) {
    case 'ArrowLeft':
      imageBackward();
      break;
    case 'ArrowRight':
      imageForward();
      break;
    case 'ArrowUp':
      fullscreenHandler();
      break;
    case 'ArrowDown':
      fullscreenHandler();
      break;
  }
}

function selectHandler(clickedId) {
  if (id === clickedId) {
    return;
  }
  images[id].classList.toggle('visible');
  smallImages[id].classList.toggle('snapshot__img--selected');

  images[clickedId].classList.toggle('visible');
  smallImages[clickedId].classList.toggle('snapshot__img--selected');
  id = clickedId;

  if (play === true) {
    playHandler();
  }
}

// CREATION DES DOMS - APERCU PHOTOS DE NAVIGATION
const snapshotSection = document.querySelector('.snapshot');

let j = 0;
for (let image of images) {
  let smallImage = image.cloneNode();
  smallImage.classList.add('snapshot__img');
  snapshotSection.appendChild(smallImage);
  smallImage.addEventListener('click', selectHandler.bind(null, j));
  j++;
}

const smallImages = document.querySelectorAll('.snapshot img');

let i = 0;
for (let image of images) {
  if (image.classList.contains('visible')) {
    smallImages[i].classList.toggle('snapshot__img--selected');
  }
  i++;
}

// EVENT LISTENERS
playBtn.addEventListener('click', playHandler);
forwardBtn.addEventListener('click', imageForward);
backwardBtn.addEventListener('click', imageBackward);
randomBtn.addEventListener('click', randomHandler);
fullscreenBtn.addEventListener('click', fullscreenHandler);

// KEYBOARD EVENT
window.addEventListener('keydown', keyboardHandler);
