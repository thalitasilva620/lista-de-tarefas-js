const tarefas = [];

const input = document.getElementById('inputTarefa');
const botao = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const mensagemVazia = document.getElementById('mensagemVazia');
const contadorTarefas = document.getElementById("contadorTarefas");
const botaoAdicionar = document.getElementById("botao-adicionar");

console.log(botaoAdicionar);


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
        li.classList.add("tarefa");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;

        checkbox.addEventListener("change", () => {
        tarefas[index].concluida = checkbox.checked;
        salvarTarefas();
        renderizarTarefas();
        });

        const spanTexto = document.createElement("span");
        spanTexto.textContent = tarefa.texto;
        spanTexto.classList.add("texto-tarefa");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("botao-remover");
        botaoRemover.setAttribute("aria-label", "Remover tarefa");

        botaoRemover.addEventListener('click', () => {
            li.classList.add("tarefa-removendo");

            setTimeout(() => {
                tarefas.splice(index, 1);
                salvarTarefas();
                renderizarTarefas();
            }, 200);
        });
        
        li.appendChild(checkbox);
        li.appendChild(spanTexto);
        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);
    });
}

botaoAdicionar.addEventListener('click', () => {
    const textoDaTarefa = input.value.trim();

    if (textoDaTarefa === "") return;

    tarefas.push({
        texto: textoDaTarefa,
        concluida: false
    });

    salvarTarefas();
    renderizarTarefas();
    input.value = "";
});

input.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        botaoAdicionar.click();
    }
});

carregarTarefas();
renderizarTarefas();
