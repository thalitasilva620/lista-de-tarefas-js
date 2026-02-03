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

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    tarefas.forEach((tarefa) => {
        const li = document.createElement('li');
        li.textContent = tarefa;
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