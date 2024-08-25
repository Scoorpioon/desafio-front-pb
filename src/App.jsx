import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SpellSearched} from './Services/contextFilter.jsx';
import DetailedSpell from './Elements/DetailedSpell.jsx'
import Header from './Elements/Header.jsx';
import Grid from './Elements/Grid.jsx';
import './Styles/App.scss';

export default function App() {
  return (
    <Router>
      <SpellSearched>
        <Header />
        <main>
          <Grid />
          {/* <DetailedSpell spellName='acid-arrow' /> */}
        </main>
      </SpellSearched>
      <footer>Desenvolvido por Gabriel A.</footer>
    </Router>
  );
}

/*
Código da API:

const [magic, setMagic] = useState();

api
  .get("/spells")
  .then((response) => setMagic(response.data))
  .catch((err) => {
    console.error("ops! ocorreu um erro" + err);
  })

console.log(magic);
*/