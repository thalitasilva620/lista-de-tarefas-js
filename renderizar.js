function renderizarTarefas() {
  limparLista();

  tarefas.forEach((tarefa, index) => {
    const li = criarElementoTarefa(tarefa, index);
    lista.appendChild(li);
  });

  atualizarContador();
}
