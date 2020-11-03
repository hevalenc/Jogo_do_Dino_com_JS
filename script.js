const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

//variáveis de interação
let isJumping = false;
let isGameOver = false;
let position = 0;

//criar a função de controle
function handleKeyUp(event) {
  if (event.keyCode === 32) { //o código 32 é a tecla espaço
    if (!isJumping) {
      jump();
    }
  }
}

//criar a função pular
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) { //a posição 150 é dado em pixels
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px'; //o comando style permite buscar o estilo aplicado no css
        }
      }, 20); //velocidade de movimento vertical do dino
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

//criar a função do cactus - interação na tela
function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000; //aparição do cactus de forma aleatória

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => { //movimento do cactus da direita para a esquerda
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //o número 60 representa a posição do dino
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'; //o comando body.innerHTML permite adicionar informação na página de HTML
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
