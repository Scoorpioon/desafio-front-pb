import '../Styles/App.scss';

const Box = ({spell, description}) => {
  return(
    <div className="compressed_box">
      <h2>{spell}</h2>
      <span>{description}</span>
    </div>
  );
}

export default Box;