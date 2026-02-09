const tarefas = [];

const input = document.getElementById('inputTarefa');
const botao = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const mensagemVazia = document.getElementById('mensagemVazia');
const contadorTarefas = document.getElementById("contadorTarefas");

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("tarefas");

  if (tarefasSalvas) {
    tarefas.push(...JSON.parse(tarefasSalvas));
  }
}


function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    mensagemVazia.style.display = tarefas.length === 0 ? "block" : "none";

    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;

    contadorTarefas.textContent = `Total: ${total} | Concluídas: ${concluidas}`;

    tarefas.forEach(function (tarefa, index) {
        const li = document.createElement('li');

        const spanTexto = document.createElement("span");
        spanTexto.textContent = tarefa.texto;

        li.appendChild(spanTexto);

        if (tarefa.concluida) {
            li.classList.add("concluída");
        }

        li.addEventListener("click", function () {
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas();
            renderizarTarefas();
        })

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "";

        botaoRemover.classList.add("botao-remover");
        botaoRemover.setAttribute("aria-label", "Remover tarefa");

        botaoRemover.addEventListener('click', function (event) {
            event.stopPropagation();
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);
    });
}

botao.addEventListener('click', () => {
    const texto = input.value;

    if (texto === "") return;

    tarefas.push({texto, concluida: false});
    input.value = "";
    salvarTarefas();
    renderizarTarefas();

});

input.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        botao.click();
    }
});

carregarTarefas();
renderizarTarefas();
