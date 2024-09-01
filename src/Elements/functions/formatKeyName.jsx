const formatKeyName = (key) => {
    let newKeyName = []

    for(let letter of key) {
        if(letter != '_') {
            newKeyName.push(letter);
        } else {
            newKeyName.push(' ');
        }
    }

    let finalKeyName = newKeyName.toString();
    

    return finalKeyName.replace(/,/g, ''); //remover todas as vírgulas da nova frase
}

export default formatKeyName;

//essa pequena função formata a key de um objeto.
//fiz ela para poder formatar as chaves "damage_at_slot_level" e "damaage_at_character_level", para ficar claro ao usuário final.