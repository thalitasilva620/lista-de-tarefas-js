const tarefas = [
    "Estudar JavaScript",
    "Fazer exercícios de programação",
    "Ler artigos sobre desenvolvimento web",
    "Praticar projetos práticos"
]

const input = document.getElementById('inputTarefa');
const botao = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const mensagemVazia = document.getElementById('mensagemVazia');
const contadorTarefas = document.getElementById("contadorTarefas");


function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    mensagemVazia.style.display = tarefas.length === 0 ? "block" : "none";
    contadorTarefas.textContent = `Total de tarefas: ${tarefas.length}`;

    tarefas.forEach(function (tarefa, index) {
        const li = document.createElement('li');
        li.textContent = tarefa;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "";

        botaoRemover.addEventListener('click', function () {
            tarefas.splice(index, 1);
            renderizarTarefas();
        });

        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);
    });
}

botao.addEventListener('click', () => {
    const texto = input.value;

    if (texto === "") {
        alert("Digite uma tarfea!");
        return;
    }

    tarefas.push(texto);
    input.value = "";

    renderizarTarefas();

});

input.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        botao.click();
    }
});