import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ImagesUrls from './AditionalData/imagesUrls.jsx';
import api from '../Services/apiconfig.jsx';
import formatKeyName from './functions/formatKeyName.jsx';
import '../Styles/SpellPage.scss';

const DetailedSpell = () => {
  const {spellName} = useParams();
  const [spell, setSpell] = useState();
  const [hasSlotLevel, setSlotLevelData] = useState();

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
  }, []);

  useEffect(() => {
    if(spell) {
      //verifica se a magia tem informações como dano ou fator de cura. Se tiver, incluo uma caixa extra para detalhar melhor. Se não, não incluo a caixa
      spell.damage || spell.heal_at_slot_level ? setSlotLevelData(true) : setSlotLevelData(false);
    }
  }, [spell]);

  return(spell ?
    <article id="spellPage">
      <section className="mainBox">
        <section className="spellMainData">
          <h2>{spell.name}</h2>
          <p className="spellDescription">{spell.desc}</p>
        </section>

        <aside>
          <span><strong>Level:</strong> {spell.level}</span>
          <span><strong>Casting time:</strong> {spell.casting_time}</span>
          <span><strong>Range:</strong> {spell.range}</span>
          <div className="components">
            <span><strong>Components:</strong></span>
            <ul>
              {spell.components.map((component) => {return <li>{component}</li>})}
            </ul>
          </div>
          <span><strong>Duration:</strong> {spell.duration}</span>
          <span><strong>School:</strong> {spell.school.name}</span>
        </aside>
      </section>

      <section className="boxContainer">
        <section className="box">      
          <div className="classesAndSubclasses">
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
                {spell.subclasses.length > 0 ? spell.subclasses.map((subclasse) => {return <li key={Math.random()}>
                  {subclasse.name} 
                </li>}) : <li className="no-data">No subclasses!</li>}
              </ul>
            </div>
          </div>
        </section>

        { hasSlotLevel ? 
        <section id="slotLevel" className="box">
          <h2>{spell.damage ? formatKeyName(Object.keys(spell.damage)[1]) : 'Heal at slot level'}</h2>
          <p>{spell.damage ? `Damage type: ${spell.damage.damage_type.name}` : null}</p>
          <p>{}</p>
          <ul>
            {spell.damage ?
            spell.damage.damage_at_slot_level ? 
            Object.keys(spell.damage.damage_at_slot_level).map((key) => {return <li title={`Slot ${key}`}>Slot {key}: {spell.damage.damage_at_slot_level[key]}</li>})
            :
            Object.keys(spell.damage.damage_at_character_level).map((key) => {return <li title={`Slot ${key}`}>Slot {key}: {spell.damage.damage_at_character_level[key]}</li>})
            : 
            Object.keys(spell.heal_at_slot_level).map((key) => {return <li title={`Slot ${key}`}>Slot {key}: {spell.heal_at_slot_level[key]}</li>})
            }
          </ul>
        </section>
        :
        null
        }
      </section>
    </article>
        :
    <article id="spellPage">
      <span>Carregando informações...</span>
    </article>
  );
}

export default DetailedSpell;