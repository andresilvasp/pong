// variaveis bilinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

// variaveis raquete
let xRaquete = 10;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variavel oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//rede
let xRede = 300;
let yRede = 0;
let redeAltura = 400;

// variavel coludiu igual falso
let coludiu = false;

// variavel pontos
let meusPontos = 0;
let pontosDoOponente = 0;

// varial erro da maquina


// variavel som
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("sons/trilha.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
  ponto = loadSound("sons/ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentaBolinha();
  verificarColisaoBolinha();
  mostrarRaquete(xRaquete, yRaquete, raqueteAltura);
  mostrarRaquete(xRede, yRede, redeAltura);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente, raqueteAltura);
  movimentarRaquete();
  colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoMinhaRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  movimentarRaqueteOponente();
  incluirPlacar();
  marcarPontos();
}

function mostrarBolinha() {
  circle(xbolinha, ybolinha, diametro);
}

function movimentaBolinha() {
  xbolinha += velocidadeXbolinha;
  ybolinha += velocidadeYbolinha;
}

function verificarColisaoBolinha() {
  if (xbolinha + raio > width || xbolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }

  if (ybolinha + raio > height || ybolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

function mostrarRaquete(x, y, a) {
  rect(x, y, raqueteComprimento, a);
}

function movimentarRaquete() {
  
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  // variavel dois oponentes
  /*if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }*/
}

function colisaoMinhaRaqueteBiblioteca(x, y) {
  coludiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xbolinha, ybolinha, raio);
  if (coludiu) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentarRaqueteOponente() {
  velocidadeYOponente = ybolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
  // variavel dois oponentes
  /*
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }*/
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcarPontos() {
  if (xbolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }

  if (xbolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos){
    chanceDeErrar += 1;
    if (chanceDeErrar >= 34){
      chanceDeErrar = 35;
    }
  } else{
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 34){
      chanceDeErrar = 31;
    }
  }
}
