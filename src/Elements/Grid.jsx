import {useState, useEffect, useContext} from 'react';
import {SpellFilterContext} from '../Services/contextFilter.jsx';
import CompressedBox from './CompressedBox.jsx';
import capitalize from './FilterFunctions/capitalize.jsx';
import api from '../Services/apiconfig.jsx';
import '../Styles/Grid.scss';

const Grid = () => {
  const {spellFilter} = useContext(SpellFilterContext);
  const [spells, setSpells] = useState();
  const quantidade = [...Array(12).keys()]; //quantidade de magias por página, basta alterar o número e você vai atualizar quantas magias aparecem no grid.
  /* const numberOfPages = []; */

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

  
  const totalPages = () => {
    let numberOfPages = [];
    
    if(spells) {
      for(let counter = 1; counter < spells.count / quantidade.length; counter++) {
        numberOfPages.push(<li value={counter}>{counter}</li>)
      }

      /* return numberOfPages; */
    }
  }

  const showAllOrFilterSpellsInGrid = () => { 
    if(spells) {
      if(spellFilter) { //se a variável "spellFilter" for preenchida, significa que uma pesquisa está sendo realizada, e retornamos a lista do filtro das magias. Se não, será retornado a lista completa das magias
        let magicsFounds = spells.results.filter((spell) => spell.index.includes(spellFilter) || spell.name.includes(capitalize(spellFilter))); //verifica se a pesquisa é igual ao index, ou ao nome mesmo.

        return magicsFounds.map((spell) => {return <CompressedBox linkTo={spell.index} spell={spell} />})
      } else {
        return quantidade.map((num) => {return <CompressedBox linkTo={spells.results[num].index} spell={spells.results[num]} />}) 
      }
    } else {
      return <span>Carregando as magias...</span> // a variável "spells" armazena os dados da API. Enquanto a requisição não for terminada e a variável não for preenchida, é executado essa tag span indicando o carregamento da api.
    }
  }

  return(
    <article id="spells_grid">
      <div className="spellsHeader">
        <h1>Spells</h1>
        <select onChange={(values) => {console.log(values.target.value)}}>
          <option value="all">All</option>
          <option value="class">Class</option>
          <option value="level">Level</option>
        </select>
      </div>
      <section className="spells">
        {showAllOrFilterSpellsInGrid()}
      </section>
      <nav>
        <ul id="pages">
          {totalPages()}
        </ul>
      </nav>
    </article>
  );
}

export default Grid;

/*
Código antes de eu tentar otimizar a parte da filtragem da barra de pesquisa

import {useState, useEffect, useContext} from 'react';
import {SpellFilterContext} from '../Services/contextFilter.jsx';
import capitalize from './FilterFunctions/capitalize.jsx';
import {Link} from 'react-router-dom';
import api from '../Services/apiconfig.jsx';
import '../Styles/Grid.scss';

const Grid = () => {
  const {spellFilter} = useContext(SpellFilterContext);
  const [spells, setSpells] = useState();
  const quantidade = [...Array(9).keys()]; //quantidade de magias por página, basta alterar o número e você vai atualizar quantas magias aparecem no grid.

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

  useEffect(() => {
    console.log(capitalize(spellFilter));
  }, [spellFilter]);

  const showAllOrFilterSpellsInGrid = () => {
    if(spells) {
      if(spellFilter) { //se a variável "spellFilter" for preenchida, significa que uma pesquisa está sendo realizada, e retornamos a lista do filtro das magias. Se não, será retornado a lista completa das magias
        let magicsFounds = spells.results.filter((spell) => spell.index.includes(spellFilter) || spell.name.includes(capitalize(spellFilter))); //verifica se a pesquisa é igual ao index, ou ao nome mesmo.

        return magicsFounds.map((magic) => {return <Link key={magic.key} to={`/spell/${magic.index}`} className="compressed_box">
          <span>{magic.name}</span>
          <span className="level" title="Spell level">{magic.level}</span>
        </Link>})
      } else {
        return quantidade.map((num) => {return <Link key={num} to={`/spell/${spells.results[num].index}`} className="compressed_box">
          <span>{spells.results[num].name}</span>
          <span className="level" title="Spell level">{spells.results[num].level}</span>
        </Link>}) 
      }
    } else {
      return <span>Carregando as magias...</span> // a variável "spells" armazena os dados da API. Enquanto a requisição não for terminada e a variável não for preenchida, é executado essa tag span indicando o carregamento da api.
    }
  }

  return(
    <article id="spells_grid">
      <div className="spellsHeader">
        <h1>Spells</h1>
        <select onChange={(values) => {console.log(values.target.value)}}>
          <option value="all">All</option>
          <option value="class">Class</option>
          <option value="level">Level</option>
        </select>
      </div>
      <section className="spells">
        {showAllOrFilterSpellsInGrid()}
      </section>
      <nav>
        <ul id="pages">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </nav>
    </article>
  );
}

export default Grid;

*/