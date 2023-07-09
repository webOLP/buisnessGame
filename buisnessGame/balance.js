import {balance} from './js.js';
import {buisnessIncomeNumber} from './buisness.js';

setInterval(() => {
    balance.textContent = Math.round(Number(balance.textContent) + Number(buisnessIncomeNumber.textContent.slice(0,-1))/4);
},250)


