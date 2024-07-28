export default function SRT(processos) {
  let tempo = 0;
  const processosTimeline = [];

  console.clear();

  while (processos.length > 0) {
    processos.forEach((processo) => {
      if (processo.tempoChegada == tempo) processosTimeline.push(processo);
    });

    processosTimeline.sort((a, b) => a.tempoCPU - b.tempoCPU);
    const processoEmExecucao = processosTimeline[0];

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
}
