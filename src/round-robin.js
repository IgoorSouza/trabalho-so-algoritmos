export default function RoundRobin(processos, quantum) {
  let tempo = 0;
  let temporizadorQuantum = quantum;
  const processosTimeline = [];

  console.clear();

  processos.sort((a, b) => a.tempoChegada - b.tempoChegada);

  while (processos.length > 0) {
    processos.forEach((processo) => {
      if (processo.tempoChegada === tempo) processosTimeline.push(processo);
    });

    const processoEmExecucao = processosTimeline[0];

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
}
