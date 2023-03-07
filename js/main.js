const form = document.getElementById('novoItem')
const lista = document.getElementById('lista');
    
form.addEventListener('submit', (evento) => {
    evento.preventDefault(); 
    let nome = evento.target.elements['nome'];
    let quantidade = evento.target.elements['quantidade'];

    criaElemento(nome.value, quantidade.value);
    nome.value = "";
    quantidade.value = "";
});

function criaElemento(nome, qtd) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = qtd;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);

    localStorage.setItem("lista", lista);
}