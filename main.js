// PRODUTOS

const catalogo = [
    {id: '1',
    nome: 'Camisa Larga com Bolso',
    marca: 'Zara',
    preco: 70,
    imagem: 'product-1.jpg',
    feminimo:false,
},
    {id: '2',
    nome: 'Casaco Reto com Lã',
    marca: 'Zara',
    preco: 85,
    imagem: 'product-2.jpg',
    feminimo:true,
},
    {id:'3',
    nome:'Jaqueta com Efeito Camurça',
    marca: 'Zara',
    preco:60,
    imagem: 'product-3.jpg',
    feminimo:false,
},
    {id:'4',
    nome:'Sobretudo com Mescla de Lã',
    marca: 'Zara',
    preco:160,
    imagem: 'product-4.jpg',
    feminimo:false,
},
    {id:'5',
    nome:'Camisa Larga Acolchoada com Veludo Cotelê',
    marca: 'Zara',
    preco:110,
    imagem: 'product-5.jpg',
    feminimo:false,
},
    {id:'6',
    nome:'Casaco de Lã com Botões',
    marca: 'Zara',
    preco:170,
    imagem: 'product-6.jpg',
    feminimo:true,
},
    {id:'7',
    nome:'Casaco com botões',
    marca: 'Zara',
    preco:75,
    imagem: 'product-7.jpg',
    feminimo:true,
},
    {id:'8',
    nome:'Colete Comprido com Cinto',
    marca: 'Zara',
    preco:88,
    imagem: 'product-8.jpg',
    feminimo:true,
},

]

// fUNÇÕES CARRINHO
function abrirCarrinho(){
    document.getElementById('carrinho').classList.add('carrinho-on');
    document.getElementById('carrinho').classList.remove('carrinho-down');
}
  
  function fecharCarrinho(){
    document.getElementById('carrinho').classList.remove('carrinho-on');
    document.getElementById('carrinho').classList.add('carrinho-down');
}
  
function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById('fechar-carrinho')
    const botaoAbrirCarrinho= document.getElementById('abrir-carrinho')
  
    botaoFecharCarrinho.addEventListener('click',fecharCarrinho)
    botaoAbrirCarrinho.addEventListener('click',abrirCarrinho)
}

function adicionarAoCarrinho(idProduto){
    if (idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto);
         return; //Verificando se já tem algum item no carrinho, caso tenha ele incrementa um número e cancela o resto da operação, se não ele continua
        
    } 
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    desenharProdutoCarrinho(idProduto)
}

function desenharProdutoCarrinho(idProduto){
    const produto = catalogo.find(p => p.id===idProduto) //Criando a variavéç produto que vai ate a variavel catalgo procurar a variavel p que é o id dos produtos cadastrados

    const conteinerProdutosCarrinho = document.getElementById(`produtos-carrinho`) //Busca as informações de um elemento HTML para trazer ate a var criada 'conteinerProdutosCarrinho

    const elementoArticle = document.createElement('article')
    elementoArticle.classList.add('produto-carrinho')
    

    const cartaoProdutoCarrinho = //Criando uma variavel com as informações HTMl que serão adicionadas ao carrinho no clique
    `<button class='lixeira-carrinho' id = 'remover-item-${produto.id}'><i class="fa-solid fa-trash-can"></i></button>
  
    <img src="./assets/img/${produto.imagem}" class="img-carrinho">
  
    <div class="texto-carrinho">
      <p class="nome-produto-carrinho">${produto.nome}</p>
      <p class="tamanho-produto-carrinho">Tamanho: M</p>
      <p class="preco-produto-carrinho">R$${produto.preco}</p>
    </div>

    <div class='controle-quantidade'> 
        <button class = 'menos-item' id='decrementar-${produto.id}'><i class="fa-solid fa-minus"></i></button>

        <p id = 'quantidade-${idProduto}'>${idsProdutoCarrinhoComQuantidade[idProduto]}</p>

        <button class = 'mais-item' id='incrementar-${produto.id}'> <i class="fa-solid fa-plus"></i> </button>
    </div>`

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  conteinerProdutosCarrinho.appendChild(elementoArticle); 

  document.getElementById(`decrementar-${produto.id}`).addEventListener('click',() =>decrementarQuantidadeProduto(produto.id)) //ele vai pegar a informação de clique no ID selecionado e executar a function mencionada ('decrementarQuadidadeProduto')

  document.getElementById(`incrementar-${produto.id}`).addEventListener('click',() =>incrementarQuantidadeProduto(produto.id))

  document.getElementById(`remover-item-${produto.id}`).addEventListener('click',() =>removerDoCarrinho(produto.id))
}


function renderizarProdutosCarrinho(){
    const conteinerProdutosCarrinho = document.getElementById(`produtos-carrinho`)
    conteinerProdutosCarrinho.innerHTML = '';

    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoCarrinho(idProduto)
    }
}


// QUANTIDADE NO CARRINHO
const idsProdutoCarrinhoComQuantidade = {};

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    atualizarQuantidade(idProduto)
    
}

function decrementarQuantidadeProduto(idProduto){
    if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerDoCarrinho(idProduto)
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    
    atualizarQuantidade(idProduto)
    
}

function atualizarQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    renderizarProdutosCarrinho() 
    

}

function atualizarPreco(){
    const Total = document.getElementById('preco-carrinho');
    let precoTotalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }
    Total.innerHTML = 'Total: $';
}

// TELA PRINCIPAL
function renderizarCatalogo(){
    for (const produtoCatalogo of catalogo){
     const cartaoProduto =
    `<div class="card-produto"${produtoCatalogo.id}">

        <img class='img-produto' src="./assets/img/${produtoCatalogo.imagem}">
    
        <p class='marca'>${produtoCatalogo.marca}</p>
        <p>${produtoCatalogo.nome}</p>
        <p>R$${produtoCatalogo.preco}</p>
        <button id='adicionar-${produtoCatalogo.id}'class='adc-carrinho'>
        <i class="fa-solid fa-cart-plus"></i>
        </button>
    </div>`;
    
    document.getElementById('conteiner-produto').innerHTML += cartaoProduto
    }
    for (const produtoCatalogo of catalogo){
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id))
    }
}

// INICIALIZAÇÃO DE CODIGOS
renderizarCatalogo()
inicializarCarrinho()
