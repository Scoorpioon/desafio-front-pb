import {useState, useEffect} from 'react';
import api from '../Services/apiconfig.jsx';
import axios from 'axios';

const DetailedSpell = ({spellName}) => {
  const [spell, setSpell] = useState();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const apiResponse = await api.get(`/spells/acid-arrow`);
        setSpell(apiResponse.data);
      } catch(error) {
        console.error(`Deu algum erro ao pesquisar a magia ou consumir a API: ${error}`);
      }
    }

    getData();
    console.log(spell);
  }, []);
  
  return(spell ?
    <section id="spellPage">
      <h2>{spell.name}</h2>
      <p>{spell.desc}</p>
      <span>{spell.attack_type}</span>
      <span>{spell.concentration}</span>
      <div className="classesBox">
        <ul>
          {spell.classes.map((classe) => {return <li key={Math.random()}>
            {classe.name} 
          </li>})}
        </ul>
        <ul>
          {spell.subclasses.map((classe) => {return <li key={Math.random()}>
            {classe.name} 
          </li>})}
        </ul>
      </div>
    </section>
         :
    <section id="spellPage">
      <span>Carregando informações...</span>
    </section>
  );
}

export default DetailedSpell;