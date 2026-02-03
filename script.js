const tarefas = [
    "Estudar JavaScript",
    "Fazer exercícios de programação",
    "Ler artigos sobre desenvolvimento web",
    "Praticar projetos práticos"
]

const input = document.getElementById('inputTarefa');
const botao = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

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