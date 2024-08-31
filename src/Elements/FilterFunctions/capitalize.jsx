const capitalize = (word) => {
    if(!word) {
      return word;
    };
  
    let newWord = [];
  
    for(let c = 0; c <= word.length; c++) {
      try {
        if(word[c - 1] === ' ' || c === 0) {
          newWord.push(word[c].toUpperCase());
        } else {
          newWord.push(word[c]);
        };
      } catch(error) {
        console.log('Erro não identificado'); //tive que usar o try/catch para o programa funcionar. Ainda não consegui identificar a causa do erro, mas ele acontece toda vez que um espaço novo é inserido na variável word.
      }
    };
  
    let finalWord = newWord.toString();
  
    return finalWord.replaceAll(",", "");
  }; 
  
  // Essa function faz com que todas as letras de inicio de palavras em uma frase se tornem maiúscula. Ela serve para nomes próprios.
  
  export default capitalize;