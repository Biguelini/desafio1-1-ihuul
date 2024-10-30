class Aluno {
	constructor(matricula, nome) {
		this.matricula = matricula;
		this.nome = nome;
		this.p1 = null;
		this.p2 = null;
	}

	setNota(prova, nota) {
		if (prova === 'P1') {
			this.p1 = nota;
		} else if (prova === 'P2') {
			this.p2 = nota;
		}
	}

	get notaFinal() {
		if (this.p1 !== null && this.p2 !== null) {
			return ((this.p1 + this.p2) / 2).toFixed(1);
		} else if (this.p1 !== null) {
			return (this.p1 / 2).toFixed(1);
		} else if (this.p2 !== null) {
			return (this.p2 / 2).toFixed(1);
		}
		return (0).toFixed(1);
	}
}

class Turma {
	constructor() {
		this.alunos = [];
	}

	adicionarAluno(matricula, nome) {
		if (this.alunos.some(aluno => aluno.matricula === matricula)) {
			console.log(`Aluno com matrícula ${matricula} já existe.`);
			return false;
		}
		this.alunos.push(new Aluno(matricula, nome));
		return true;
	}

	removerAluno(matricula) {
		const index = this.alunos.findIndex(aluno => aluno.matricula === matricula);
		if (index !== -1) {
			this.alunos.splice(index, 1);
			return true;
		}
		console.log(`Aluno com matrícula ${matricula} não encontrado.`);
		return false;
	}

	lancarNota(matricula, prova, nota) {
		const aluno = this.alunos.find(aluno => aluno.matricula === matricula);
		if (aluno) {
			aluno.setNota(prova, nota);
			return true;
		}
		console.log(`Aluno com matrícula ${matricula} não encontrado.`);
		return false;
	}

	imprimirAlunos() {
		console.log('---------------------------------------');
		console.log('Matricula  Nome                P1   P2   NF');
		console.log('---------------------------------------');

		const alunosOrdenados = this.alunos.slice().sort((a, b) => a.nome.localeCompare(b.nome));

		for (const aluno of alunosOrdenados) {
			const p1 = aluno.p1 !== null ? aluno.p1.toFixed(1) : '-';
			const p2 = aluno.p2 !== null ? aluno.p2.toFixed(1) : '-';
			const nf = aluno.notaFinal;
			console.log(`${aluno.matricula.toString().padEnd(10)} ${aluno.nome.padEnd(20)} ${p1.padEnd(4)} ${p2.padEnd(4)} ${nf}`);
		}

		console.log('---------------------------------------');
	}
}

const turma = new Turma();
turma.adicionarAluno(12345, 'Ana de Almeida');
turma.adicionarAluno(23456, 'Bruno Carvalho');
turma.adicionarAluno(34567, 'Fernanda Abreu');
turma.adicionarAluno(45678, 'Joao Santos');

turma.lancarNota(12345, 'P1', 8.0);
turma.lancarNota(12345, 'P2', 9.5);
turma.lancarNota(23456, 'P1', 7.0);
turma.lancarNota(34567, 'P2', 8.5);

turma.imprimirAlunos();
