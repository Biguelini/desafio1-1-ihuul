const Vertice = require('./questao1.js');

class Poligono {
	#vertices;

	constructor(vertices) {
		if (vertices.length < 3) {
			throw new Error("O polígono deve ter pelo menos 3 vértices.");
		}
		this.#vertices = vertices;
	}

	addVertice(v) {
		for (const vertice of this.#vertices) {
			if (vertice.equals(v)) {
				return false;
			}
		}
		this.#vertices.push(v);
		return true;
	}

	get perimetro() {
		let perimetro = 0;
		for (let i = 0; i < this.#vertices.length; i++) {
			const verticeAtual = this.#vertices[i];
			const proximoVertice = this.#vertices[(i + 1) % this.#vertices.length];
			perimetro += verticeAtual.distancia(proximoVertice);
		}
		return perimetro;
	}

	get qtdVertices() {
		return this.#vertices.length;
	}
}

try {
	const v1 = new Vertice(0, 0);
	const v2 = new Vertice(4, 0);
	const v3 = new Vertice(4, 3);
	const poligono = new Poligono([v1, v2, v3]);

	const v4 = new Vertice(0, 3);
	const adicionou = poligono.addVertice(v4);
	console.log(`Vértice adicionado? ${adicionou}`);

	const adicionouDuplicado = poligono.addVertice(v1);
	console.log(`Vértice duplicado adicionado? ${adicionouDuplicado}`);

	console.log(`Perímetro: ${poligono.perimetro.toFixed(2)}`);
	console.log(`Quantidade de vértices: ${poligono.qtdVertices}`);

} catch (error) {
	console.error(error.message);
}
