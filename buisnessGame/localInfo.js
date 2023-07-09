import {lvlCurrent as lvlCurrent} from "./js.js";


const gameVersion = '0.009';
const gameStorage = window.localStorage;
export let lvlCurrentLocal = 0;
export let curExpLocal = 0;
gameStorage.getItem('');


if(gameStorage.getItem('version') === gameVersion){
    document.querySelector('#balance').textContent = gameStorage.getItem('balance');
    lvlCurrentLocal = gameStorage.getItem('lvl');
    curExpLocal = gameStorage.getItem('curExp');
    
}


function saveLocalFiles() {
    gameStorage.setItem('balance', `${document.querySelector('#balance').textContent}`)
    gameStorage.setItem('lvl', `${lvlCurrent}`);
    gameStorage.setItem('curExp', `${document.querySelector('#cur-exp').textContent}`);
    gameStorage.setItem('version', `${gameVersion}`);
}



setInterval(() => {
    saveLocalFiles();
    
},5000)
