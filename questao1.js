const readline = require('readline');

class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  distancia(outroVertice) {
    const dx = this.#x - outroVertice.x;
    const dy = this.#y - outroVertice.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  equals(outroVertice) {
    return this.#x === outroVertice.x && this.#y === outroVertice.y;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lerVerticeDoUsuario = () => {
  return new Promise((resolve) => {
    rl.question("Digite a coordenada x do vértice: ", (x) => {
      rl.question("Digite a coordenada y do vértice: ", (y) => {
        resolve(new Vertice(parseFloat(x), parseFloat(y)));
      });
    });
  });
};

const main = async () => {
  const vertice1 = await lerVerticeDoUsuario();
  const vertice2 = await lerVerticeDoUsuario();
  const vertice3 = await lerVerticeDoUsuario();

  console.log(`Distância entre vértice 1 e vértice 2: ${vertice1.distancia(vertice2).toFixed(2)}`);
  console.log(`Distância entre vértice 1 e vértice 3: ${vertice1.distancia(vertice3).toFixed(2)}`);

  vertice1.move(10, 10);
  console.log(`Vértice 1 movido para posição (10, 10): x=${vertice1.x}, y=${vertice1.y}`);

  console.log(`Vértice 1 e vértice 2 são iguais? ${vertice1.equals(vertice2)}`);
  console.log(`Vértice 1 e vértice 3 são iguais? ${vertice1.equals(vertice3)}`);

  rl.close();
};

main();

module.exports = Vertice;