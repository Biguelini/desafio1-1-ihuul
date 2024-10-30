const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const formatarCPF = (cpf) => {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
};

const formatarData = (data) => {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const validarCPF = (cpf) => {
  return /^\d{11}$/.test(cpf);
};

const verificarIdade = (dataNascimento) => {
  const hoje = new Date();
  const idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mes = hoje.getMonth() - dataNascimento.getMonth();
  return idade > 18 || (idade === 18 && mes >= 0);
};

const validarRenda = (renda) => {
  return renda >= 0;
};

const coletarDadosCliente = async () => {
  let nome;
  while (!nome || nome.length < 5) {
    nome = await question("Digite o nome (mínimo 5 caracteres): ");
    if (nome.length < 5) {
      console.log("Erro: O nome deve ter pelo menos 5 caracteres.");
    }
  }

  let cpf;
  while (!validarCPF(cpf)) {
    cpf = await question("Digite o CPF (11 dígitos): ");
    if (!validarCPF(cpf)) {
      console.log("Erro: O CPF deve ter exatamente 11 dígitos.");
    }
  }

  let dataNascimento;
  while (true) {
    const dataInput = await question("Digite a data de nascimento (DD/MM/AAAA): ");
    const [dia, mes, ano] = dataInput.split('/').map(Number);
    dataNascimento = new Date(ano, mes - 1, dia);
    if (dataNascimento instanceof Date && !isNaN(dataNascimento)) {
      if (verificarIdade(dataNascimento)) break;
      console.log("Erro: O cliente deve ter pelo menos 18 anos.");
    } else {
      console.log("Erro: Data inválida. Use o formato DD/MM/AAAA.");
    }
  }

  let rendaMensal;
  while (true) {
    rendaMensal = await question("Digite a renda mensal (valor ≥ 0): ");
    rendaMensal = parseFloat(rendaMensal.replace(',', '.'));
    if (validarRenda(rendaMensal)) break;
    console.log("Erro: A renda mensal deve ser um valor ≥ 0.");
  }

  let estadoCivil;
  while (!['C', 'S', 'V', 'D', 'c', 's', 'v', 'd'].includes(estadoCivil)) {
    estadoCivil = await question("Digite o estado civil (C, S, V ou D): ");
    if (!['C', 'S', 'V', 'D', 'c', 's', 'v', 'd'].includes(estadoCivil)) {
      console.log("Erro: Estado civil deve ser C, S, V ou D.");
    }
  }

  let dependentes;
  while (isNaN(dependentes) || dependentes < 0 || dependentes > 10) {
    dependentes = await question("Digite o número de dependentes (0 a 10): ");
    dependentes = parseInt(dependentes);
    if (isNaN(dependentes) || dependentes < 0 || dependentes > 10) {
      console.log("Erro: O número de dependentes deve estar entre 0 e 10.");
    }
  }

  rl.close();

  console.log("\nDados do Cliente:");
  console.log(`Nome: ${nome}`);
  console.log(`CPF: ${formatarCPF(cpf)}`);
  console.log(`Data de Nascimento: ${formatarData(dataNascimento)}`);
  console.log(`Renda Mensal: R$ ${rendaMensal.toFixed(2).replace('.', ',')}`);
  console.log(`Estado Civil: ${estadoCivil.toUpperCase()}`);
  console.log(`Dependentes: ${dependentes}`);
};

coletarDadosCliente();