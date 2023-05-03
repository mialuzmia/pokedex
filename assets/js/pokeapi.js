const pokeApi = {}; //objeto para representar a api

// função para conbverter o objeto da api para um objeto so com as informações que vou usar
function convertPokeapiToOwnModel(pokemonDetails) {
  const pokemon = new Pokemon()
  pokemon.name = pokemonDetails.name
  pokemon.number = pokemonDetails.id

  const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const mainType = types[0]
    //para colocar o elemento de uma array num objeto vc n pode colocar direto, tem q por nunma variavel antes

  pokemon.mainType = mainType
  pokemon.types = types

  pokemon.img = pokemonDetails.sprites.other.dream_world.front_default

  return pokemon
}

// metodo que abriga o fetch 
pokeApi.getPokemons = (offset = 0, limit = 10) => {
   //limit é o numero de elementos q vai pegar e offset a pagina
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
      .then((response) => response.json()) // pega a resposta e transforma em json
      .then((jsonBody) => jsonBody.results) //pega so o results do json
      .then((pokemons) =>  {
      return pokemons.map(pokeApi.getPokemonDetail)}) //pega a array de results(detalhes pkms) e cria  outra com base nela passando o metodo getPokemonDetail
      .then((detailRequests) => {
        return Promise.all(detailRequests)
      }) // pega os dadoas de cada pokemon e poe numa promise, so vai retornar quando todos forem concluidos
      .then((pokemonsDetails) => {
        return pokemonsDetails
      }) // pega a promise e retorna o resultado normal
}

// funçao para pegar os dados de cada pokemon e retornar eles convertidos para o meu modelo
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url) //faz um novo fetch com a url de cada pokemon
      .then((response) => { 
        // console.log(response)
        return response.json()
      })  // pega a resposta e transforma em json
      .then((response) => {
        // console.log(response)
        return convertPokeapiToOwnModel(response)
      }) // pega o json de cada pkmn e puxa so os dados necessarios pro novo objeto
}
