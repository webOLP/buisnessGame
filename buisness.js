import {buisnesses} from './buisnessesInfo.js'
import {balance} from './js.js'

const buisnessesList = document.querySelector('.buisness__main');
const newBuisnessButton = document.querySelector('.buisness__button-new');
const buisnessIncome = document.querySelector('.buisness__income')
export const buisnessIncomeNumber = document.querySelector('.buisness__income-number');
let activePopup = '';

//Buisnesses Popup
const newBuisnessPopup = document.querySelector('.popup-buisness-new');



//BuyCard Popup
const cardPopup = document.querySelector('.popup-buisness-create');
const cardPopupTitleSelector = '.popup-buisness-create__title';
const cardPopupPriceSelector = '.popup-buisness-create__price';
const cardPopupImageSelector = '.popup-buisness-create__image';
const cardPopupInfoSelector = '.popup-buisness-create__info';
const cardPopupConfirmButton = '.popup-buisness-create__confirm';
const returnButton = document.querySelector('.return-button');

//UpgradeCard Popup
const cardUpgradePopup = document.querySelector('.popup-buisness-upgrade');
const cardUpgradePopupTitleSelector = '.popup-buisness-upgrade__title';
const cardUpgradePopupCurIncomeSelector = '.popup-buisness-upgrade__current-income';
const cardUpgradePopupNextIncomeSelector = '.popup-buisness-upgrade__next-income';
const cardUpgradePopupImageSelector = '.popup-buisness-upgrade__image';
const cardUpgradePopupTimeSelector = '.popup-buisness-upgrade__upgrade-time';
const cardUpgradePopupPriceSelector = '.popup-buisness-upgrade__price';
const cardUpgradePopupConfirmButton = '.popup-buisness-upgrade__confirm';
const cardUpgradePopupInfoSelector = '.popup-buisness-upgrade__info';

//Template Listed Buisnesses
const newBuisnessTemplate = '.new-buisness-list';
const newBuisnessTemplateBox = '.popup-buisness-new__buisness'
const newBuisnessTemplateImage= '.popup-buisness-new__img';
const newBuisnessTemplateTitle = '.popup-buisness-new__element-title';
const newBuisnessTemplatePrice = '.popup-buisness-new__price';
const newBuisnessTemplateAbout = '.popup-buisness-new__about';
//Suplies
const newBuisnessesList = document.querySelector('.popup-buisness-new__list');



//Template Created Buisness
const buisnessTemplate = '.buisness-card';
const buisnessTemplateCardSelector = '.buisness__card';
const buisnessTemplateImgLinkSelector = '.buisness__card-img';
const buisnessTemplateTitleSelector = '.buisness__card-title';
const buisnessTemplateIncomeSelector = '.buisness__card-income';
const buisnessTemplateLvlSelector = '.buisness__card-lvl';
const buisnessTemplateOverlaySelector = '.buisness__card-overlay';


function refreshIncome() {
    let countIncome = 0;
    buisnessesList.querySelectorAll(`${buisnessTemplateIncomeSelector}`).forEach(income => {
        countIncome += Number(income.textContent.slice(0,-4));
    });
    buisnessIncomeNumber.textContent = `${countIncome}$`;
    buisnessIncomeNumber.style.display = 'none';
    buisnessIncomeNumber.style.display = 'inline';
}

function openBuisnessPopup() {
    // newBuisnessPopup.style.display = 'flex';
    activePopup = newBuisnessPopup;
    newBuisnessPopup.classList.add('popup-buisness_opened');
    newBuisnessesList.innerHTML = '';
    for(let buisness in buisnesses) {
        const templateListedBuisnesses = document.querySelector(`${newBuisnessTemplate}`).content.cloneNode(true);
        
        templateListedBuisnesses.querySelector(`${newBuisnessTemplateImage}`).src = `./images/${buisness}.png `;
       
        templateListedBuisnesses.querySelector(`${newBuisnessTemplateAbout}`).textContent = buisnesses[buisness].infoAbout ;
        templateListedBuisnesses.querySelector(`${newBuisnessTemplateBox}`).id = buisness;
        if(!buisnesses[buisness].made) {
            templateListedBuisnesses.querySelector(`${newBuisnessTemplateBox}`)
                .addEventListener('click', (evt) => createNewBuisness(evt),{once: true});
            templateListedBuisnesses.querySelector(`${newBuisnessTemplateTitle}`).textContent = buisnesses[buisness].name;
            templateListedBuisnesses.querySelector(`${newBuisnessTemplatePrice}`).textContent = `${buisnesses[buisness].startPrice}$` ;
        } else {
            templateListedBuisnesses.querySelector(`${newBuisnessTemplateTitle}`).textContent = 'Куплено';
            templateListedBuisnesses.querySelector(`${newBuisnessTemplatePrice}`).textContent = '-';
            templateListedBuisnesses.querySelector(`${newBuisnessTemplateBox}`).style.opacity = '0.6';
        }
        newBuisnessesList.append(templateListedBuisnesses);
    }
}

function openPopupUpgrade(id) {
    activePopup = cardUpgradePopup;
    cardUpgradePopup.classList.add('popup-buisness_opened');
    const currentBuisness = buisnesses[id];
    console.log(id)
    cardUpgradePopup.addEventListener('click', (evt) => {
        if(evt.target == cardUpgradePopup) {
            cardUpgradePopup.querySelector(`${cardUpgradePopupConfirmButton}`).removeEventListener('click', () => startUpgradeBuisness(id),{once:true})
            activePopup.classList.remove('popup-buisness_opened');
            console.log('123')
        }
    },{once:true})
    cardUpgradePopup.querySelector(`${cardUpgradePopupTitleSelector}`).textContent = currentBuisness.name;
    cardUpgradePopup.querySelector(`${cardUpgradePopupCurIncomeSelector}`).textContent = `${currentBuisness.currentIncome}$`
    cardUpgradePopup.querySelector(`${cardUpgradePopupNextIncomeSelector}`).textContent = `${Math.round(currentBuisness.currentIncome * currentBuisness.scaleIncome, -1)}$`
    cardUpgradePopup.querySelector(`${cardUpgradePopupInfoSelector}`).textContent = currentBuisness.infoAbout
    cardUpgradePopup.querySelector(`${cardUpgradePopupImageSelector}`).src = `./images/${id}.png `;;
    cardUpgradePopup.querySelector(`${cardUpgradePopupTimeSelector}`)
    .textContent = 'Время улучшения: ' + Math.round(currentBuisness.upgradeTime/60) + ' час.'+ ' ' 
    + Math.round(currentBuisness.upgradeTime%60) + ' мин.';
    
    cardUpgradePopup.querySelector(`${cardUpgradePopupPriceSelector}`).textContent = `Цена: ${currentBuisness.lastUpgradePrice}$`;
    if(Number(balance.textContent) < currentBuisness.lastUpgradePrice) {
        console.log(currentBuisness.lastUpgradePrice);
        cardUpgradePopup.querySelector(`${cardUpgradePopupConfirmButton}`).setAttribute('disabled','disabled');
    } else {
        cardUpgradePopup.querySelector(`${cardUpgradePopupConfirmButton}`).removeAttribute('disabled');
        cardUpgradePopup.querySelector(`${cardUpgradePopupConfirmButton}`).addEventListener('click', () => startUpgradeBuisness(id),{once:true})
    }
}

function startUpgradeBuisness(id){
    buisnesses[id].lastUpgradePrice = Math.round(buisnesses[id].lastUpgradePrice * buisnesses[id].scalePrice);
    console.log(buisnesses[id].lastUpgradePrice);
    activePopup.classList.remove('popup-buisness_opened');

}

function createNewBuisness(evt) {
    activePopup.classList.remove('popup-buisness_opened');
    activePopup = cardPopup;
    let clickedNewBuisnessId = evt.currentTarget.id;
    cardPopup.classList.add('popup-buisness_opened');
    cardPopup.querySelector(`${cardPopupTitleSelector}`).textContent = buisnesses[clickedNewBuisnessId].name;
    cardPopup.querySelector(`${cardPopupImageSelector}`).src = `./images/${clickedNewBuisnessId}.png `;
    cardPopup.querySelector(`${cardPopupPriceSelector}`).textContent = buisnesses[clickedNewBuisnessId].startPrice + '$';
    cardPopup.querySelector(`${cardPopupInfoSelector}`).textContent = buisnesses[clickedNewBuisnessId].infoAbout;
    cardPopup.querySelector(`${cardPopupConfirmButton}`).addEventListener('click', () => creatingBuisness(clickedNewBuisnessId),{once:true});
}

function creatingBuisness(id) {
    activePopup.classList.remove('popup-buisness_opened');
    const templateCompleteBuisness = document.querySelector(`${buisnessTemplate}`).content.cloneNode(true);
    templateCompleteBuisness.querySelector(`${buisnessTemplateTitleSelector}`).textContent = buisnesses[id].name;
    templateCompleteBuisness.querySelector(`${buisnessTemplateImgLinkSelector}`).src = `./images/${id}.png `;
    templateCompleteBuisness.querySelector(`${buisnessTemplateOverlaySelector}`).addEventListener('click', () => openPopupUpgrade(id));
    templateCompleteBuisness.querySelector(`${buisnessTemplateIncomeSelector}`).textContent = `${buisnesses[id].startIncome}$ /с`;
    templateCompleteBuisness.querySelector(`${buisnessTemplateLvlSelector}`).textContent = `Lvl.${buisnesses[id].lvl}`;
    templateCompleteBuisness.querySelector(`${buisnessTemplateCardSelector}`).id = id;
    buisnesses[id].made = true;
    
    buisnessesList.append(templateCompleteBuisness);
    if(buisnessesList.hasChildNodes){
        buisnessIncome.style.display = 'flex'
        newBuisnessButton.style.width = '30%';
        if(document.documentElement.clientWidth < 500){
            newBuisnessButton.textContent = '+'
            newBuisnessButton.style.fontSize = '85px';
        } else {

            newBuisnessButton.textContent = 'Создать'; 
        }
        
    }
    refreshIncome();
}

newBuisnessButton.addEventListener('click', openBuisnessPopup);









