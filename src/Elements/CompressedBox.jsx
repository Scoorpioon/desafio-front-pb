import {Link} from 'react-router-dom';
import '../Styles/App.scss';

const CompressedBox = ({linkTo, spell}) => {
  return(
    <Link key={spell.key} to={`/spell/${linkTo}`} className="compressed_box">
      <span>{spell.name}</span>
      <span className="level" title="Spell level">{spell.level}</span>
    </Link>
  );
}

export default CompressedBox;