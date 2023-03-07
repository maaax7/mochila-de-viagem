const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach(item => {
    criaElemento(item);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let nome = evento.target.elements['nome'];
    let quantidade = evento.target.elements['quantidade'];

    var existe = itens.find(elemento => elemento.nome === nome.value);

    let itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id == existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(tag, idItem) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id == idItem), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}