// [R1]
const filmes = [
    { id: 1, nome: 'Vingadores: Guerra Infinita', 
        categoria: 'Ação', descricao: 'A batalha final... Será?', 
        duracao: 154, assistido: true},
    { id: 2, nome: 'Até o Último Homem', 
        categoria: 'Ação', descricao: 'Um soldado que vai de desvalorizado à herói', 
        duracao: 139, assistido: false},
    { id: 3, nome: 'Zootopia', 
        categoria: 'Animação', descricao: 'Cidade dos bichos', 
        duracao: 108, assistido: true},
    { id: 4, nome: 'Invocação do Mal', 
        categoria: 'Terror', descricao: 'Apenas não veja a fita', 
        duracao: 112, assistido: true},
    { id: 5, nome: 'Hotel Transylvania', 
        categoria: 'Animação', descricao: 'Casa dos monstros', 
        duracao: 91, assistido: false},
    { id: 6, nome: 'It - A Coisa', 
        categoria: 'Terror', descricao: 'Enfrente seus medos', 
        duracao: 135, assistido: false},
    { id: 7, nome: 'Bruxa de Blair', 
        categoria: 'Terror', descricao: 'Saia da floresta imediatamente', 
        duracao: 81, assistido: false},
    { id: 8, nome: 'Batman', 
        categoria: 'Ação', descricao: 'O cavaleiro das trevas', 
        duracao: 176, assistido: true},
    { id: 9, nome: 'Madagascar', 
        categoria: 'Animação', descricao: 'I like to move it move it', 
        duracao: 86, assistido: false},
    { id: 10, nome: 'De Volta Pro Futuro', 
        categoria: 'Ficção', descricao: 'Uma volta acidental ao passado', 
        duracao: 116, assistido: false},
    { id: 11, nome: 'Matrix', 
        categoria: 'Ficção', descricao: 'A vida dos hackers', 
        duracao: 136, assistido: false}
];

const catalogo = { nome: 'Meus Filmes', itens: filmes, 
    adicionar: function (item) { 
        this.itens.push(item); 
    }, 
    
    filtrarPorCategoria: function (categoria) {
        return this.itens.filter(function (item) {
            return item.categoria === categoria;
        });
    }
};


//[R2]
function renderizar(lista) {
  const container = document.getElementById('lista');
  container.innerHTML = '';                 

  if (lista.length === 0) {
    const vazio = document.createElement('p');
    vazio.textContent = 'Nenhum item encontrado';
    container.appendChild(vazio);
    return;                                 
  }

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
      default:
        icone = '🎬';
    }

    
    let descricao = filme.descricao;
    if (descricao.length > 60) {
      descricao = descricao.slice(0, 60) + '...';
    }

    
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

    info.appendChild(titulo);
    info.appendChild(categoria);
    info.appendChild(duracao);
    info.appendChild(desc);

    card.appendChild(poster);
    card.appendChild(info);
    container.appendChild(card);
  }
}

renderizar(catalogo.itens);   // desenha a lista ao carregar a página

const radios = document.querySelectorAll('input[name="categoria"]');

for (const radio of radios) {
  radio.addEventListener('change', function () {
    if (radio.value.toLowerCase() === 'todos') {
      renderizar(catalogo.itens);
    } else {
      renderizar(catalogo.filtrarPorCategoria(radio.value));
    }
  });
}

