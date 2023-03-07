const form = document.getElementById('novoItem')
const lista = document.getElementById('lista');
let itens = [];
itens = JSON.parse(localStorage.getItem('itens')) || [];


itens.forEach(item => {
    criaElemento(item);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let nome = evento.target.elements['nome'];
    let quantidade = evento.target.elements['quantidade'];

    let itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    criaElemento(itemAtual);

    var itemExiste = verificaItemNaLista(itemAtual);

    if (!itemExiste) {
        adicionaItem(itemAtual);
    }

    nome.value = "";
    quantidade.value = "";
});

function adicionaItem(itemAtual) {
    itens.push(itemAtual);
    localStorage.setItem("itens", JSON.stringify(itens));
}

function verificaItemNaLista(itemAtual) {
    var existeItem = false;
    itens.every(elemento => {
        existeItem = elemento.nome === itemAtual.nome && elemento.quantidade === itemAtual.quantidade;
        if (existeItem)
            return;
    });

    return existeItem;
}

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
}