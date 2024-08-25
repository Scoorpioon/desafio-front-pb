import {useState, createContext} from 'react';

export const SpellFilterContext = createContext();

export const SpellSearched = ({children}) => {
  const [spellFilter, setSpellFilter] = useState(); // state para armazenar o valor que será escrito na barra de pesquisa de magia

  return(
    <SpellFilterContext.Provider value={{spellFilter, setSpellFilter}}>
      {children}
    </SpellFilterContext.Provider>
  );
}

// A aplicação vai ser bem simples, então decidi usar o contextapi ao invés do Redux. No momento que estou escrevendo esse comentário, só pensei em utilizar compartilhamento de variável para a barra de pesquisa mesmo, já que decidi usar ela no header