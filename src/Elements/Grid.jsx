import {useState, useEffect, useContext} from 'react';
import { SpellFilterContext } from '../Services/contextFilter.jsx';
import Box from './Box';
import api from '../Services/apiconfig.jsx';
import axios from 'axios';
import '../Styles/Grid.scss';

const Grid = () => {
  const [spells, setSpells] = useState();
  const quantidade = [...Array(24).keys()]; // quantidade de magias por página, basta alterar o número e você vai atualizar quantas magias aparecem no grid.
  const {spellFilter} = useContext(SpellFilterContext);

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
  
  return(
    <section id="spells_grid">
      {spells ? quantidade.map((num) => {return <Box key={num} spell={spells.results[num].index} />}) 
      : <span>Carregando as magias...</span>}
    </section>
  );
}

export default Grid;

// spells.results[num].index