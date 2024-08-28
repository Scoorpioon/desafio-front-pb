import {useState, useEffect, useContext} from 'react';
import { SpellFilterContext } from '../Services/contextFilter.jsx';
import {Outlet, Link} from 'react-router-dom';
import Box from './Box';
import api from '../Services/apiconfig.jsx';
import axios from 'axios';
import '../Styles/Grid.scss';

const Grid = () => {
  const {spellFilter} = useContext(SpellFilterContext);
  const [spells, setSpells] = useState();
  const quantidade = [...Array(16).keys()]; //quantidade de magias por página, basta alterar o número e você vai atualizar quantas magias aparecem no grid.

  useEffect(() => {
    const getData = async () => {
      try {
        const apiResponse = await api.get('/spells');
        setSpells(apiResponse.data);
      } catch(error) {
        console.error(`Eita, algo deu errado ao consumir a API: ${error}`);
      }
    }

    getData();
  }, []);

/*   const capitalize = (word) => {
    let newWord = [];

    for(let c = 0; c <= word.length; c++) {
      if(word[c - 1] === ' ' || c === 0) {
        newWord.push(word[c].toUpperCase());
      } else {
        newWord.push(word[c]);
      };
    };

    let finalWord = newWord.toString();
    
    return finalWord.replaceAll(",", "");
  }; */ //essa function faz com que todas as letras de inicio de palavras em uma frase se tornem maiúscula.

  const showAllOrFilterSpellsInGrid = () => {
    if(spells) {
      if(spellFilter) { //se a variável "spellFilter" for preenchida, significa que uma pesquisa está sendo realizada, e retornamos a lista do filtro das magias. Se não, será retornado a lista completa das magias
        let magicsFounds = spells.results.filter((spell) => spell.name.includes(spellFilter));

        return magicsFounds.map((magic) => {return <Link key={magic.key} to={`/spell/${magic.index}`} className="compressed_box">{magic.name}</Link>})
      } else {
        return quantidade.map((num) => {return <Link key={num} to={`/spell/${spells.results[num].index}`} className="compressed_box">{spells.results[num].index}</Link>}) 
      }
    } else {
      return <span>Carregando as magias...</span> // a variável "spells" armazena os dados da API. Enquanto a requisição não for terminada e a variável não for preenchida, é executado essa tag span indicando o carregamento da api.
    }
  }
  
  return(
    <section id="spells_grid">
      {showAllOrFilterSpellsInGrid()}
    </section>
  );
}

export default Grid;