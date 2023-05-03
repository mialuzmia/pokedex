//variavel que representa a ol do html
const pokemonList = document.getElementById("pokemonList");
const loadButton = document.getElementById("loadButton");

const maxItens = 151
const limit = 12
let offset = 0

//função para carregar os pokemons
function loadPokemons(offset, limit) {

  // função que pega os dados da api e coloca no modelo da li do site
function convertPokemonToLi(pokemon) {

  return `<li class="pokemon ${pokemon.mainType}">
    <span class="number">#0${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
      ${pokemon.types.map((type) => `<li class = 'type type-${type}'>${type}</li>`).join('')} <!--pega a array com os tipos e faz uma nova array transformando em html, depois junta tudo numa string-->
      </ol>

      <img
        id = "img-${pokemon.name}"
        class="img-pokemon"
        src="${pokemon.img}"
        alt="Imagem do pokemon ${pokemon.name}."
      />
    </div>
  </li>`
}

  //pega o resultado da get pokemons da outra pagina e armazena na variavel pokemons
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
  let newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))
  //uso do metodo map que passa por cada elemento de uma array e
  //reorganiza de acordo com a função para criar um anova lista a partir da pokemons
  //em q dentro estão todos os elementos convertidos para li
  //da o mesmo resulgtado que usar o for como embaixo:

  // let newItems = []
  // for (let i = 0; i < pokemons.length; i++) {
  //   let pokemon = pokemons[i]
  //   newList.push(convertPokemonToLi(pokemon))
  // }
  const newHtml = newList.join("");
  //metodo join junta os elementos da array numa string com o separador passado, se n passar fica vrigula por padrao
  pokemonList.innerHTML += newHtml;
});
}

loadPokemons(offset, limit) //carrega primeira pagina de pokemons

//função para limitar as gerações
loadButton.addEventListener('click', () => {
  offset += limit

  let qtItensNextPage = offset + limit

  if (qtItensNextPage >= maxItens) { //verifica se a qtde q vai carregar é maior q o maximo, se sim, a qtdade q mostra é a diferença do maximo e do offset atual
    let newLimit = maxItens - offset

    loadPokemons(offset, newLimit)
    loadButton.parentElement.removeChild(loadButton)

  } else{
    loadPokemons(offset, limit)
  }
})