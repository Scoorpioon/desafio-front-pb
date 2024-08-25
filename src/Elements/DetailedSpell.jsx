import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ImagesUrls from './AditionalData/imagesUrls.jsx';
import api from '../Services/apiconfig.jsx';
import axios from 'axios';
import '../Styles/SpellPage.scss';

const DetailedSpell = () => {
  const {spellName} = useParams();
  const [spell, setSpell] = useState();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const apiResponse = await api.get(`/spells/${spellName}`); //faço a requisição da magia correspondente
        setSpell(apiResponse.data);
      } catch(error) {
        console.error(`Deu algum erro ao pesquisar a magia ou consumir a API: ${error}`);
      }

    }
    
    getData();

    console.log(spell);
    console.log(ImagesUrls['Wizard'])
  }, []);
  
  return(spell ?
    <article id="spellPage">
      <section className="mainBox">
        <section className="spellMainData">
          <h2>{spell.name}</h2>
          <p className="spellDescription">{spell.desc}</p>
        </section>

        <aside>
          <ul>
            {spell.classes.map((classe) => {return <li key={Math.random()}>
              <span>{classe.name}</span>
              <img src={ImagesUrls[classe.name]} alt={`Ícone de ${classe.name}`} />
            </li>})}
          </ul>
          <ul>
            {spell.subclasses.map((classe) => {return <li key={Math.random()}>
              {classe.name} 
            </li>})}
          </ul>
        </aside>
      </section>

        <span>{spell.attack_type}</span>
        <span>{spell.concentration}</span>
        <span>{spell.material}</span>
      {/* <div className="classesBox">
        <ul>
          {spell.classes.map((classe) => {return <li key={Math.random()}>
            <span>{classe.name}</span>
            <img src={ImagesUrls[classe.name]} alt={`Ícone de ${classe.name}`} />
          </li>})}
        </ul>
        <ul>
          {spell.subclasses.map((classe) => {return <li key={Math.random()}>
            {classe.name} 
          </li>})}
        </ul>
      </div> */}
    </article>
         :
    <article id="spellPage">
      <span>Carregando informações...</span>
    </article>
  );
}

export default DetailedSpell;