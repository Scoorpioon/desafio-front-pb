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
    console.log(spells);
  }, []);

  const showAllOrFilterSpellsInGrid = () => {
    if(spells) {
      if(spellFilter) { //se a variável "spellFilter" for preenchida, significa que uma pesquisa está sendo realizada, e retornamos a lista do filtro das magias. Se não, será retornado a lista completa das magias
        let magicsFounds = spells.results.filter((spell) => spell.name.includes(spellFilter));
        console.log(magicsFounds);
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
      {/* spells ? 
      quantidade.map((num) => {return <Link key={num} to={`/spell/${spells.results[num].index}`} className="compressed_box">{spells.results[num].index}</Link>}) 
      : <span>Carregando as magias...</span> */}
    </section>
  );
}

export default Grid;

// spells.results[num].index