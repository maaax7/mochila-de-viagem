const form = document.getElementById('novoItem')
const lista = document.getElementById('lista');
let itens = [];
itens = localStorage.getItem('item') !== null ? JSON.parse(localStorage.item) : [];

carregaItens();

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let nome = evento.target.elements['nome'];
    let quantidade = evento.target.elements['quantidade'];

    criaElemento(nome.value, quantidade.value);
    nome.value = "";
    quantidade.value = "";
});

function carregaItens() {
    itens.forEach(item => {
        criaElemento(item.nome, item.quantidade);
    });
}

function criaElemento(nome, qtd) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = qtd;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);

    var exists = false;
    itens.forEach(item => {
        exists = item.nome === nome && item.quantidade === qtd;
        if (exists)
            return;
    });

    if (!exists) {
        itens.push({
            "nome": nome,
            "quantidade": qtd
        });
    }

    localStorage.setItem("item", JSON.stringify(itens));
}