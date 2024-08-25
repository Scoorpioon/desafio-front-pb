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
          <Routes>
              <Route path='/' element={<Grid />} />
              <Route path='/spell/:spellName' element={<DetailedSpell />} />
          </Routes>
        </main>
      </SpellSearched>
      {/* <footer>Desenvolvido por Gabriel A.</footer> */}
    </Router>
  );
}