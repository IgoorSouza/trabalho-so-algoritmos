import readline from "readline-sync";
import SRT from "./srt.js";
import RoundRobin from "./round-robin.js";

let algoritmo, quantidadeProcessos = 0;
const processos = [];

while (algoritmo !== "SRT" && algoritmo !== "Round Robin") {
  const escolha = input(
    "Qual algoritmo deseja testar? \n 1. SRT (Shortest Remaining Time next) \n 2. Round Robin \n"
  );

  if (escolha != 1 && escolha != 2) {
    console.log("Escolha inválida.\n");
  } else {
    algoritmo = escolha == 1 ? "SRT" : "Round Robin";
  }
}
console.clear();

while (quantidadeProcessos <= 0 || quantidadeProcessos > 15) {
  quantidadeProcessos = Number(
    input("Quantos processos voce deseja adicionar? (Minimo 1, maximo 15) \n")
  );
}
console.clear();

const regexNome = /^(?!\s*$).+/;
for (let i = 0; i < quantidadeProcessos; i++) {
  const novoProcesso = {};

  console.log(`Processo ${i + 1}:`);

  while (novoProcesso.nome === undefined || !regexNome.test(novoProcesso.nome)) {
    novoProcesso.nome = input("Nome do processo: ");
  }

  while (novoProcesso.tempoCPU === undefined || novoProcesso.tempoCPU <= 0) {
    novoProcesso.tempoCPU = Number(input("Tempo de uso da CPU do processo: "));
  }

  while (
    novoProcesso.tempoChegada === undefined ||
    novoProcesso.tempoChegada < 0
  ) {
    novoProcesso.tempoChegada = Number(input("Tempo de chegada do processo: "));
  }

  processos.push(novoProcesso);
  console.log();
}
console.clear();

if (algoritmo === "SRT") SRT(processos);
if (algoritmo === "Round Robin") {
  let quantum;
  while (quantum === undefined || quantum <= 0) {
    quantum = Number(input("Informe o valor do quantum: "));
  }

  RoundRobin(processos, quantum);
}

function input(texto) {
  return readline.question(texto);
}
