# Sobre o projeto
> Status: Finalizado ✔️

## Objetivo
+ Simular o funcionamento dos algoritmos:
<table>
  <tr>
    <td>Shortest Remaining Time (SRT)</td>
    <td>Round-Robin (RR)</td>
  </tr>
</table>

## Estrutura e funcionalidades

### Shortest Remaining Time (SRT)

#### Inicializando a função
```javascript
export default function SRT(processos) {
  let tempo = 0;
  const processosTimeline = [];
```
> A função do SRT recebe como parâmetro os processos que foram inseridos, cada um contendo as variáveis: tempoChegada, tempoCPU, e nome.

<br>

#### Iniciando laço de repetição
```javascript
while (processos.length > 0) {
```
> Este é o início do laço de repetição, os trechos de código contendo as funcionalidades a seguir estarão dentro do laço.

<br>

#### Adicionando os processos em uma lista
```javascript
processos.forEach((processo) => {
    if (processo.tempoChegada == tempo) processosTimeline.push(processo);
});
```
> Para cada processo na lista, verifica se o tempo de chegada é igual ao valor da variável tempo. Se a condição for satisfeita, o processo é adicionado à lista processosTimeline. E enquanto houver processos na lista, continua iterando.

<br>

#### Sort
```javascript
processosTimeline.sort((a, b) => a.tempoCPU - b.tempoCPU);
```
> É realizada a comparação e colocado em ordem crescente os processos de acordo com tempo de uso da CPU.

<br>

#### Primeiro processo em execução
```javascript
const processoEmExecucao = processosTimeline[0];
```
> O primeiro processo em execução será aquele com o menor tempo de uso da CPU.

<br>

#### Gerenciamento de processos no SRT
```javascript
console.log(`------ Tempo ${tempo}: ------`);
    if (processosTimeline.length > 0) {
      processosTimeline.forEach((processo, index) => {
        if (index === 0) {
          console.log("-> Processo em execução:");
        }

        if (index === 1) {
          console.log("-> Processos em estado de pronto:");
        }

        console.log(`Nome: ${processo.nome}`);
        console.log(`Tempo de uso restante da CPU: ${processo.tempoCPU}`);
        console.log(`Tempo de chegada: ${processo.tempoChegada}\n`);
      });

      if (processoEmExecucao) {
        processoEmExecucao.tempoCPU--;

        if (processoEmExecucao.tempoCPU === 0) {
          processos.shift();
          processosTimeline.shift();
        }
      }
    } else {
      console.log("Nenhum processo para ser executado.\n");
    }

    tempo++;
    console.log();
  }
```
> <b>Se a quantidade de processos na lista processosTimeLine for maior que 0:</b>
> - Se o index for igual a 0, será impresso o processo da lista que se encontrará em estado de execução. Mas, caso o index seja igual ou maior que 1, serão impressos os processos que estarão em estado de pronto.
> - Para o processo que estiver em execução, o tempo de CPU será reduzido. E se o tempo de uso da CPU for igual a 0, ou seja, terminar de executar, o processo será retirado da fila de execução.

<br>

> <b>E se não houverem mais processos para serem executados, será impresso na tela que não há mais processos para execução.</b>

<br>

> No fim do laço o tempo é iterado positivamente.

<br>

### Round-Robin

#### Inicializando a função
```javascript
export default function RoundRobin(processos, quantum) {
  let tempo = 0;
  let temporizadorQuantum = quantum;
  const processosTimeline = [];
```
> A função é inicializada recebendo como parâmetro os processos e o número do quantum de processamento. As variáveis de processo são: tempoChegada, tempoCPU, e nome.

<br>

#### Sort
```javascript
processos.sort((a, b) => a.tempoChegada - b.tempoChegada);
```
> É realizada a comparação e colocado em ordem crescente os processos de acordo com o tempo de chegada.

<br>

#### Iniciando laço de repetição
```javascript
while (processos.length > 0) {
```
> Este é o início do laço de repetição, os trechos de código contendo as funcionalidades a seguir estarão dentro do laço.

<br>

#### Adicionando os processos em uma lista
```javascript
processos.forEach((processo) => {
      if (processo.tempoChegada === tempo) processosTimeline.push(processo);
    });
```
> Para cada processo na lista, verifica se o tempo de chegada é igual ao valor da variável tempo. Se a condição for satisfeita, o processo é adicionado à lista processosTimeline. E enquanto houver processos na lista, continua iterando.

<br>

#### Primeiro processo em execução
```javascript
const processoEmExecucao = processosTimeline[0];
```
> O primeiro processo em execução será aquele que estiver no início da fila, conforme a ordem do tempo de chegada.

<br>

#### Gerenciamento de processos no Round-Robin
```javascript
 console.log(`------ Tempo ${tempo}: ------`);
    processosTimeline.forEach((processo, index) => {
      if (index === 0) {
        console.log("-> Processo em execução:");
      }

      if (index === 1) {
        console.log("-> Processos em estado de pronto:");
      }

      console.log(`Nome: ${processo.nome}`);
      console.log(`Tempo de uso restante da CPU: ${processo.tempoCPU}`);
      console.log(`Tempo de chegada: ${processo.tempoChegada}\n`);
    });

    if (processoEmExecucao) {
      processoEmExecucao.tempoCPU--;
      temporizadorQuantum--;

      if (processoEmExecucao.tempoCPU === 0) {
        const processo = processosTimeline.shift();
        processos.splice(processo, 1);
        temporizadorQuantum = quantum;
      }

      if (temporizadorQuantum === 0) {
        processosTimeline.push(processoEmExecucao);
        processosTimeline.shift();
        temporizadorQuantum = quantum;
      }
    } else {
      console.log("Nenhum processo para ser executado.\n");
    }

    tempo++;
    console.log();
  }
```
> <b>Se a quantidade de processos na lista processosTimeLine for maior que 0:</b>
> - Se o index for igual a 0, será impresso o processo da lista que se encontrará em estado de execução. Mas, caso o index seja igual ou maior que 1, serão impressos os processos que estarão em estado de pronto.
> - Para o processo que estiver em execução, o tempo de CPU e o temporizador do quantum serão decrementados, confirmando o processamento.
> - Se o tempo de CPU do processo em execução chegar a 0, ou seja, terminar de executar, o processo será removido da fila de execução e será alterado para o estado de pronto. O temporizador do quantum será reiniciado para o valor inicial.\
> - Caso o temporizador do quantum chegue a 0, o processo em execução é movido para o final da fila e o quantum é reiniciado para o valor inicial.

<br>

> <b>E se não houverem mais processos para serem executados, será impresso na tela que não há mais processos para execução.</b>

<br>

> No fim do laço o tempo é iterado positivamente.

<br>

### Index(principal)

#### Importando arquivos
```javascript
import readline from "readline-sync";
import SRT from "./srt.js";
import RoundRobin from "./round-robin.js";
```
> Importando biblioteca e códigos do SRT e Round-Robin.

<br>

#### Definindo variáveis
```javascript
let algoritmo, quantidadeProcessos = 0;
const processos = [];
```
> Declarando variáveis para receber o tipo de algoritmo que será selecionado, quantidade de processos que serão executados e um array de processos.

<br>

#### Menu de algoritmos
```javascript
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
```
> Menu para que o usuário selecione o algoritmo que será executado.

<br>

#### Quantidade de processos
```javascript
while (quantidadeProcessos <= 0 || quantidadeProcessos > 15) {
  quantidadeProcessos = Number(
    input("Quantos processos voce deseja adicionar? (Minimo 1, maximo 15) \n")
  );
}
```
> Entrada de quantos processos serão executados.

<br>

#### Montando um processo
```javascript
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
```
> Preenchimento de dados para a criação de processos.

<br>

#### Executando algoritmo
```javascript
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
```
> Executando o algoritmo selecionado pelo usuário.
> - Caso o algoritmo seja o SRT, os processos são definidos como parâmetro e o algoritmo é executado.
> - Caso o algoritmo seja o Round-Robin, o usuário deve informar o valor do quantum de processamento. Dessa forma é passado como parâmetro os processos e o quantum de processamento para a execução.


## Tecnologias utilizadas
