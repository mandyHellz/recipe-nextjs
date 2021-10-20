import 'tailwindcss/tailwind.css'
import React from "react"
import {useEffect, useState} from "react";
import Recipe from './components/Recipe';
import Header from './components/Header';

function MyApp() {

  // 1 - inserindo os valores de APP_ID e KEY
  const APP_ID  = "pass_id";
  const APP_KEY = "pass_key";
  
  // 4 - criando a constante de estado para "guardar" os dados 
  //que vem da API
  const [recipes, setRecipes] = useState([]);

  // 8 - criando um estado para o searchbar
  const [search, setSearch] = useState(" ");

  // 11 - criando um estado para cada consulta (query) feita, podendo assim pesquisar pelas
  // receitas no useEffect apenas após um "ök", impedindo que qualquer tipo de alteração na searchbar 
  // (como add caracteres) gere uma pesquisa na API.
  const [query, setQuery] = useState('bread'); //"bread" foi o valor setado como default para a pesquisa, não deixando o app em branco ao carregar pela primeira vez


  // 2 - criando uma função useEffect para o getrecipes ao iniciar o app;
  useEffect(() => {
    getRecipes();
  }, [query]); // 14 - adicionando a query, para que a cada vez que o seu valor 
               // seja atualizado, por meio das searchs na searchbar e o envio do form com o submit, o evento dentro do useEffect (pegar as receitas na API) seja atualizado


  // 3 - criando a promisse responsável por trazer os dados
  const getRecipes =  async () => { 
    //async e response para quando fizermos uma solicitação externa 
    //(como uma info de uma API externa), onde não sabemos o tempo 
    //de espera para o retorno desta solitação - por isso escrevemos a promisse!  
    const response = await fetch
    (`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();


  // 5 - inserindo o setRecipes na getRecipes para guardar os dados que queremos - hits neste caso
    setRecipes(data.hits);
  };


  // 10 - criando a função para capturar o valor de setSearch, ou seja, da alteração no input
  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  // 12 - criando a função para que a pesquisa seja executada apenas após a obtenção deste valor 
  const getSearch = (e) => {
    e.preventDefault(); // irá "bloquear" a atualização automatica da página cada vez q o valor for obtido
    setQuery(search);   // define o valor de setQuery para o valor digitado na searchbar
    setSearch(" ");     // apaga o valor que foi digitado na searchbar após apertar o botão de submit
  }


  return(
      <>
      <Header />
      <div className=" max-w-full bg-red-100 ">
        <form className=" md:flex items-center justify-center text-center mx-auto mt-10 mb-20 py-2 "
        // 13 - adicionamos a função getSearch para capturar o dados e atualizar a Query, para então poder realizar a busca na API apenas após enviar o form
        onSubmit={getSearch} 
        > 
          <input 
          id="search-bar" 
          className=" w-1/2 border-2 border-gray-400  " 
          type="text"
          // 9 - criando o value e selecionando o search, que é uma string vazia. Para isso
          //criamos também um evento (onChange), que ira rodar toda vez qu o valor no input for alterado
          value={search}
          onChange={updateSearch}/>

          <button id="submit-btn" className=" mt-2 md:mt-0 rounded-md bg-red-300 py-1 px-2 text-white " type="submit">Procurar receita</button>
        </form>
        {// 7 - criando um map para cada recipe, e escolhendo os valores/dados 
         //que quer trazer dos mesmos, contidos na API
        recipes.map(recipe => <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>)}
      </div>
      </>
  )
}

export default MyApp
