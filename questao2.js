const Vertice = require('./questao1');

class Triangulo {
  #vertice1;
  #vertice2;
  #vertice3;

  constructor(v1, v2, v3) {
    this.#vertice1 = v1;
    this.#vertice2 = v2;
    this.#vertice3 = v3;

    if (!this.formaTriangulo()) {
      throw new Error("Os vértices não formam um triângulo.");
    }
  }

  formaTriangulo() {
    const a = this.#vertice1.distancia(this.#vertice2);
    const b = this.#vertice2.distancia(this.#vertice3);
    const c = this.#vertice3.distancia(this.#vertice1);
    return (a + b > c) && (a + c > b) && (b + c > a);
  }

  equals(outroTriangulo) {
    const vertices = [
      this.#vertice1, this.#vertice2, this.#vertice3
    ].map(v => [v.x, v.y]);

    const outrosVertices = [
      outroTriangulo.#vertice1, outroTriangulo.#vertice2, outroTriangulo.#vertice3
    ].map(v => [v.x, v.y]);

    return vertices.length === outrosVertices.length && 
           vertices.every(v => outrosVertices.some(ov => v[0] === ov[0] && v[1] === ov[1]));
  }

  get perimetro() {
    const a = this.#vertice1.distancia(this.#vertice2);
    const b = this.#vertice2.distancia(this.#vertice3);
    const c = this.#vertice3.distancia(this.#vertice1);
    return a + b + c;
  }

  tipo() {
    const a = this.#vertice1.distancia(this.#vertice2);
    const b = this.#vertice2.distancia(this.#vertice3);
    const c = this.#vertice3.distancia(this.#vertice1);

    if (a === b && b === c) {
      return "Equilátero";
    } else if (a === b || b === c || a === c) {
      return "Isósceles";
    } else {
      return "Escaleno";
    }
  }

  clone() {
    return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3);
  }

  get area() {
    const a = this.#vertice1.distancia(this.#vertice2);
    const b = this.#vertice2.distancia(this.#vertice3);
    const c = this.#vertice3.distancia(this.#vertice1);
    const s = (a + b + c) / 2; 
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
}

const vertice1 = new Vertice(0, 0);
const vertice2 = new Vertice(4, 0);
const vertice3 = new Vertice(2, 3);

const triangulo1 = new Triangulo(vertice1, vertice2, vertice3);

const vertice4 = new Vertice(1, 1);
const vertice5 = new Vertice(5, 1);
const vertice6 = new Vertice(3, 4);

const triangulo2 = new Triangulo(vertice4, vertice5, vertice6);

const vertice7 = new Vertice(0, 0);
const vertice8 = new Vertice(5, 0);
const vertice9 = new Vertice(5, 5);

const triangulo3 = new Triangulo(vertice7, vertice8, vertice9);

const exibirInformacoes = (triangulo, numero) => {
  console.log(`Triângulo ${numero}:`);
  console.log(`Perímetro: ${triangulo.perimetro.toFixed(2)}`);
  console.log(`Tipo: ${triangulo.tipo()}`);
  console.log(`Área: ${triangulo.area.toFixed(2)}`);
  console.log('---------------------------');
};

exibirInformacoes(triangulo1, 1);
exibirInformacoes(triangulo2, 2);
exibirInformacoes(triangulo3, 3);
