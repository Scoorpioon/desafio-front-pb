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
    console.log(ImagesUrls['Wizard']);
  }, []);
  
  return(spell ?
    <article id="spellPage">
      <section className="mainBox">
        <section className="spellMainData">
          <h2>{spell.name}</h2>
          <p className="spellDescription">{spell.desc}</p>
        </section>

        <aside>
          <div className="classes">
            <h3>Classes</h3>
            <ul>
              {spell.classes.map((classe) => {return <li key={Math.random()}>
                <span>{classe.name}</span>
                <img src={ImagesUrls[classe.name]} />
              </li>})}
            </ul>
          </div>
          <div className="subclasses">
            <h3>Subclasses</h3>
            <ul>
              {spell.subclasses.map((subclasse) => {return <li key={Math.random()}>
                {subclasse.name} 
              </li>})}
            </ul>
          </div>
        </aside>
      </section>

      <section className="box">
        {/* {Object.keys(spell).forEach((key) => {return <span>{key}</span>})} */}
        <span>Range: {spell.range}</span>
        {spell.components.map((component) => {return <span className="components">{component}</span>})}
        <span>Material: {spell.material}</span>
        <span>Atack: {spell.attack_type}</span>
        <span>Concentration: {spell.concentration}</span>
        <span>Duration: {spell.duration}</span>
        <span>Level: {spell.level}</span>
        <span>Casting time: {spell.casting_time}</span>
      </section>

      {/* <section className="box">
        <span>Atack: {spell.attack_type}</span>
        <span>Concentration: {spell.concentration}</span>
        <span>Material: {spell.material}</span>
      </section> */}
    </article>

         :
    <article id="spellPage">
      <span>Carregando informações...</span>
    </article>
  );
}

export default DetailedSpell;