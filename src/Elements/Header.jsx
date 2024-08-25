import {useContext} from 'react';
import {SpellFilterContext} from '../Services/contextFilter.jsx';
import '../Styles/Header.scss';

const Header = () => {
  const {setSpellFilter} = useContext(SpellFilterContext);
  
  const spellTyped = (e) => {
    let inputData = e.target.value;
    
    setSpellFilter(inputData);
  }
  
  return(
    <header>
      <div id="title_content">
        <img src="/Images/DeDLogo.png" alt="Logo do Dungeons e Dragons" />
        <span>Livro de feitiços</span>
      </div>
      <input type="text" placeholder="Procurar magia..." onChange={spellTyped} />
    </header>
  )
}

export default Header;

/*
<header>
  <div id="titleContent">
    <img src="DeDLogo.png" alt="Logo do Dungeons e Dragons" />
  </div>
</header>
*/