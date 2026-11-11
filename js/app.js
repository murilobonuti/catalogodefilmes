//IA utilizada para auxílio no raciocínio lógico e "criação" dos emojis das categorias
// [R1]
// Criação Objetos Filmes e Catálogo
const filmes = [
    { id: 1, nome: 'Vingadores: Guerra Infinita', categoria: 'Ação', descricao: 'A batalha final... Será?', duracao: 154, assistido: true },
    { id: 2, nome: 'Até o Último Homem', categoria: 'Ação', descricao: 'Um soldado que vai de desvalorizado à herói', duracao: 139, assistido: false },
    { id: 3, nome: 'Zootopia', categoria: 'Animação', descricao: 'Cidade dos bichos', duracao: 108, assistido: true },
    { id: 4, nome: 'Invocação do Mal', categoria: 'Terror', descricao: 'Apenas não veja a fita', duracao: 112, assistido: true },
    { id: 5, nome: 'Shrek', categoria: 'Animação', descricao: 'O ogro mais amado do mundo', duracao: 90, assistido: false },
    { id: 6, nome: 'It - A Coisa', categoria: 'Terror', descricao: 'Enfrente seus medos', duracao: 135, assistido: false },
    { id: 7, nome: 'Bruxa de Blair', categoria: 'Terror', descricao: 'Saia da floresta imediatamente', duracao: 81, assistido: false },
    { id: 8, nome: 'Batman', categoria: 'Ação', descricao: 'O cavaleiro das trevas', duracao: 176, assistido: true },
    { id: 9, nome: 'Madagascar', categoria: 'Animação', descricao: 'I like to move it move it', duracao: 86, assistido: false },
    { id: 10, nome: 'De Volta Pro Futuro', categoria: 'Ficção', descricao: 'Uma volta acidental ao passado', duracao: 116, assistido: false },
    { id: 11, nome: 'Matrix', categoria: 'Ficção', descricao: 'A vida dos hackers', duracao: 136, assistido: false }
];

const catalogo = {
    nome: 'Meus Filmes',
    itens: filmes,

    adicionar: function(item) {
        this.itens.push(item);
    },

    marcarFavorito: function(id) {
        for (const filme of this.itens) {
            if (filme.id === id) {
                filme.favorito = !filme.favorito;
            }
        }
    }
};

// [R2]
//Função que carrega a lista dos filmes cadastrados no html
function renderizar(lista) {
    const container = document.getElementById('lista');
    container.innerHTML = '';

    //Validação (se lista vazia, exibe que não há itens)
    if (lista.length === 0) {
        const vazio = document.createElement('p');
        vazio.textContent = 'Nenhum item encontrado';
        container.appendChild(vazio);
        return;
    }

    //Laço de repetição que verifica a categoria do filme e lhe da um emoji de identificação
    for (const filme of lista) {
        let icone;

        switch (filme.categoria) {
            case 'Ação':
                icone = '💥';
                break;
            case 'Animação':
                icone = '🧸';
                break;
            case 'Terror':
                icone = '👻';
                break;
            case 'Ficção':
                icone = '🚀';
                break;
            case 'Favoritos':
                icone = '⭐';
                break;
            default:
                icone = '🎬';
        }

        let descricao = filme.descricao;

        if (descricao.length > 60) {
            descricao = descricao.slice(0, 60) + '…';
        }

        //Criação de objetos tanto no javascript quanto no html de acordo com itens de filmes[] 
        const card = document.createElement('article');
        card.className = 'card';

        const poster = document.createElement('div');
        poster.className = 'poster';
        poster.textContent = icone;

        const info = document.createElement('div');
        info.className = 'info';

        const titulo = document.createElement('h2');
        titulo.textContent = filme.nome;

        const categoria = document.createElement('span');
        categoria.className = 'tag';
        categoria.textContent = filme.categoria;

        const duracao = document.createElement('span');
        duracao.className = 'duracao';
        duracao.textContent = filme.duracao.toFixed(0) + ' min';

        const desc = document.createElement('p');
        desc.textContent = descricao;

        const favorito = document.createElement('button');
        favorito.className = 'btn-favorito';
        favorito.textContent = filme.favorito ? '⭐ Favoritado' : '☆ Favoritar';
        favorito.classList.toggle('ativo', !!filme.favorito);

        // [R5]
        favorito.addEventListener('click', function() {
            catalogo.marcarFavorito(filme.id);
            favorito.classList.toggle('ativo', filme.favorito);
            favorito.textContent = filme.favorito ? '⭐ Favoritado' : '☆ Favoritar';

            filtrarFilmes();
        });

        info.appendChild(titulo);
        info.appendChild(categoria);
        info.appendChild(duracao);
        info.appendChild(desc);
        info.appendChild(favorito);

        card.appendChild(poster);
        card.appendChild(info);

        container.appendChild(card);
    }
}

//Atribuição de valores a constantes de acordo com o id do html
// [R3]
const campoPesquisa = document.getElementById('pesquisa');
const campoCategoria = document.getElementById('categoria');

// [R4]
const formCadastro = document.getElementById('form-cadastro');
const campoNome = document.getElementById('nome-filme');
const campoDuracao = document.getElementById('duracao-filme');
const campoCategoriaFilme = document.getElementById('categoria-filme');
const campoDescricao = document.getElementById('descricao-filme');
const mensagem = document.getElementById('mensagem');

//Função que filtra filmes de acordo com pesquisa, categoria ou ambos os campos
// [R3]
function filtrarFilmes() {
    const texto = campoPesquisa.value.toLowerCase();
    const categoriaSelecionada = campoCategoria.value;

    const listaFiltrada = [];

    for (const filme of catalogo.itens) {
        const nomeFilme = filme.nome.toLowerCase();

        const correspondeTexto = nomeFilme.indexOf(texto) !== -1;

        const correspondeCategoria =
            categoriaSelecionada === 'Todas' ||
            filme.categoria === categoriaSelecionada;

        if (correspondeTexto && correspondeCategoria) {
            listaFiltrada.push(filme);
        }
    }

    renderizar(listaFiltrada);
    atualizarPainel(listaFiltrada);
}

campoPesquisa.addEventListener('input', function() {
    filtrarFilmes();
});

campoCategoria.addEventListener('change', function() {
    filtrarFilmes();
});

campoPesquisa.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        campoPesquisa.value = '';
        filtrarFilmes();
    }
});

//Função que atualiza o painel de estatísticas dos filmes em geral
// [R6]
function atualizarPainel(lista) {
    const painel = document.getElementById('painel-q06');
    const total = lista.length;
    let quantidadeFavoritos = 0;
    let quantidadeAssistidos = 0;
    let soma = 0;
    let maiorValor = null;

    for (const filme of lista) {
        if (filme.favorito === true) {
            quantidadeFavoritos++;
        }

        if (filme.assistido === true) {
            quantidadeAssistidos++;
        }

        soma += filme.duracao;

        if (maiorValor === null || filme.duracao > maiorValor.duracao) {
            maiorValor = filme;
        }
    }

    let media = '—';

    if (total > 0) {
        media = (soma / total).toFixed(2).replace('.', ',');
    }

    const maior = maiorValor !== null
        ? `${maiorValor.nome} (${maiorValor.duracao})`
        : '—';

    painel.textContent =
        `Total exibido: ${total} | ` +
        `Favoritos: ${quantidadeFavoritos} | ` +
        `Assistidos: ${quantidadeAssistidos} | ` +
        `Média de duração: ${media} | ` +
        `Maior duração: ${maior}`;
}

//Função que valida se um filme pode ser cadastrado ou não, validações: título com no mínimo 3 caracteres, duração entre 1 e 1000 minutos
// categoria obrigatória e descrição obrigatória
// [R4]
function validarFilme() {
    const nome = campoNome.value.trim();
    const duracao = parseFloat(campoDuracao.value);
    const categoria = campoCategoriaFilme.value;
    const descricao = campoDescricao.value.trim();

    if (nome.length < 3) {
        campoNome.classList.add('erro');
        throw new Error('Digite um nome com pelo menos 3 caracteres');
    } else {
        campoNome.classList.remove('erro');
    }

    if (isNaN(duracao) || duracao <= 0 || duracao > 1000) {
        campoDuracao.classList.add('erro');
        throw new Error('Digite uma duração entre 1 e 1000 minutos');
    } else {
        campoDuracao.classList.remove('erro');
    }

    if (categoria === '') {
        campoCategoriaFilme.classList.add('erro');
        throw new Error('Selecione uma categoria');
    } else {
        campoCategoriaFilme.classList.remove('erro');
    }

    if (descricao === '') {
        campoDescricao.classList.add('erro');
        throw new Error('Digite uma descrição');
    } else {
        campoDescricao.classList.remove('erro');
    }

    return {
        nome: nome,
        duracao: duracao,
        categoria: categoria,
        descricao: descricao
    };
}

//Atualiza painel, se filme novo for cadastrado, envia dados do html para o javascript 
// [R4]
formCadastro.addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        const dados = validarFilme();

        const novoFilme = {
            id: Date.now(),
            nome: dados.nome,
            categoria: dados.categoria,
            descricao: dados.descricao,
            duracao: dados.duracao,
            assistido: false,
            favorito: false
        };

        catalogo.adicionar(novoFilme);

        formCadastro.reset();

        campoPesquisa.value = '';
        campoCategoria.value = 'Todas';

        mensagem.textContent = 'Filme cadastrado com sucesso!';

        filtrarFilmes();

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});

//Atualiza painel de filmes a cara interação
// [R7]
filtrarFilmes();
console.log(filmes);
