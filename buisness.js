import {buisnesses} from './buisnessesInfo.js'
import {balance} from './js.js'

const buisnessesList = document.querySelector('.buisness__main');
const newBuisnessButton = document.querySelector('.buisness__button-new');
const buisnessIncome = document.querySelector('.buisness__income')
export const buisnessIncomeNumber = document.querySelector('.buisness__income-number');
let activePopup = '';

//Buisnesses Popup
const newBuisnessPopup = document.querySelector('.popup-buisness-new');

//Template Upgrade Buisness
const cardUpgradeTemplate = '.upgrade-buisness';
const cardUpgradePopup = document.querySelector('.popup-buisness-upgrade');
const cardUpgradeTitleSelector = '.popup-buisness-upgrade__title';
const cardUpgradeCurIncomeSelector = '.popup-buisness-upgrade__current-income';
const cardUpgradeNextIncomeSelector = '.popup-buisness-upgrade__next-income';
const cardUpgradeImageSelector = '.popup-buisness-upgrade__image';
const cardUpgradeTimeSelector = '.popup-buisness-upgrade__upgrade-time';
const cardUpgradePriceSelector = '.popup-buisness-upgrade__price';
const cardUpgradeConfirmButton = '.popup-buisness-upgrade__confirm';
const cardUpgradeInfoSelector = '.popup-buisness-upgrade__info';

//Template Listed Buisnesses
const newBuisnessItemTemplate = '.new-buisness-list';
const newBuisnessItemTemplateBox = '.popup-buisness-new__buisness'
const newBuisnessItemTemplateImage= '.popup-buisness-new__img';
const newBuisnessItemTemplateTitle = '.popup-buisness-new__element-title';
const newBuisnessItemTemplatePrice = '.popup-buisness-new__price';
const newBuisnessItemTemplateAbout = '.popup-buisness-new__about';
//Suplies
const newBuisnessesList = document.querySelector('.popup-buisness-new__list');


//Template Create New Buiness
const createBuisnessTemplate = '.new-buisness';
const createBuisnessPopup = document.querySelector('.popup-buisness-create');
const createBuisnessTitleSelector = '.popup-buisness-create__title';
const createBuisnessPriceSelector = '.popup-buisness-create__price';
const createBuisnessImageSelector = '.popup-buisness-create__image';
const createBuisnessInfoSelector = '.popup-buisness-create__info';
const createBuisnessConfirmButton = '.popup-buisness-create__confirm';

//Template Created Buisness
const buisnessTemplate = '.buisness-card';
const buisnessTemplateCardSelector = '.buisness__card';
const buisnessTemplateImgLinkSelector = '.buisness__card-img';
const buisnessTemplateTitleSelector = '.buisness__card-title';
const buisnessTemplateUpTimeSelector = '.buisness__card-upgrade'
const buisnessTemplateIncomeSelector = '.buisness__card-income';
const buisnessTemplateLvlSelector = '.buisness__card-lvl';
const buisnessTemplateOverlaySelector = '.buisness__card-overlay';


function refreshIncome() {
    let countIncome = 0;
    buisnessesList.querySelectorAll(`${buisnessTemplateIncomeSelector}`).forEach(income => {
        countIncome += Number(income.textContent.slice(0,-3));
    });
    buisnessIncomeNumber.textContent = `${countIncome}$`;
    buisnessIncomeNumber.style.display = 'none';
    buisnessIncomeNumber.style.display = 'inline';
}

function openBuisnessPopup() {
    activePopup = newBuisnessPopup;
    newBuisnessPopup.classList.add('popup-buisness_opened');
    newBuisnessesList.innerHTML = '';
    for(let buisness in buisnesses) {
        const templateListedBuisnesses = document.querySelector(`${newBuisnessItemTemplate}`).content.cloneNode(true);
        templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateImage}`).src = `./images/${buisness}.png `;
        templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateAbout}`).textContent = buisnesses[buisness].infoAbout ;
        templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateBox}`).id = buisness;
        templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateTitle}`).textContent = buisnesses[buisness].name;
        templateListedBuisnesses.querySelector(`${newBuisnessItemTemplatePrice}`).textContent = `${buisnesses[buisness].startPrice}$` ;
        if((!buisnesses[buisness].made && (buisnesses[buisness].startPrice <= balance.textContent))) {
            templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateBox}`)
                .addEventListener('click', (evt) => createNewBuisness(evt),{once: true});
        } else {
            if(buisnesses[buisness].made) {
                templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateTitle}`).textContent = 'Куплено';
                templateListedBuisnesses.querySelector(`${newBuisnessItemTemplatePrice}`).textContent = '-';
            }
            templateListedBuisnesses.querySelector(`${newBuisnessItemTemplateBox}`).style.opacity = '0.6';
        }
        newBuisnessesList.append(templateListedBuisnesses);
    }
}

function openPopupUpgrade(id) {
    activePopup = cardUpgradePopup;
    cardUpgradePopup.classList.add('popup-buisness_opened');
    const currentBuisness = buisnesses[id];
    cardUpgradePopup.innerHTML = '';
    const templateCardUpgrade = document.querySelector(`${cardUpgradeTemplate}`).content.cloneNode(true);
    cardUpgradePopup.addEventListener('click', (evt) => {
        if(evt.target == cardUpgradePopup) {
            cardUpgradePopup.classList.remove('popup-buisness_opened');
        }
    },{once:true})
    templateCardUpgrade.querySelector(`${cardUpgradeTitleSelector}`).textContent = currentBuisness.name;
    templateCardUpgrade.querySelector(`${cardUpgradeCurIncomeSelector}`).textContent = `${currentBuisness.income}$`
    templateCardUpgrade.querySelector(`${cardUpgradeNextIncomeSelector}`).textContent = `${Math.round(currentBuisness.income * currentBuisness.scaleIncome)}$`
    templateCardUpgrade.querySelector(`${cardUpgradeInfoSelector}`).textContent = currentBuisness.infoAbout
    templateCardUpgrade.querySelector(`${cardUpgradeImageSelector}`).src = `./images/${id}.png `;
    templateCardUpgrade.querySelector(`${cardUpgradeTimeSelector}`)
    .textContent = 'Время улучшения: ' + Math.round(currentBuisness.upgradeTime/60) + ' ч'+ ' ' 
    + Math.round(currentBuisness.upgradeTime%60) + ' м';
    templateCardUpgrade.querySelector(`${cardUpgradePriceSelector}`).textContent = `Цена: 
    ${Math.round(currentBuisness.upgradePrice * Math.pow(currentBuisness.scalePrice,currentBuisness.lvl - 1))}$`;
    if(Number(balance.textContent) < (currentBuisness.upgradePrice * Math.pow(currentBuisness.scalePrice,currentBuisness.lvl - 1))) {
        templateCardUpgrade.querySelector(`${cardUpgradeConfirmButton}`).setAttribute('disabled','disabled');
    } else {
        templateCardUpgrade.querySelector(`${cardUpgradeConfirmButton}`).removeAttribute('disabled');
        templateCardUpgrade.querySelector(`${cardUpgradeConfirmButton}`).addEventListener('click', () => startUpgradeBuisness(id),{once:true})
    }
    cardUpgradePopup.append(templateCardUpgrade);
}

function startUpgradeBuisness(id){
    balance.textContent = balance.textContent - (buisnesses[id].upgradePrice * Math.pow(buisnesses[id].scalePrice,buisnesses[id].lvl - 1));
    buisnesses[id].lvl += 1;
    const card = buisnessesList.querySelector(`#${id}`);
    const upgradeCountdown = card.querySelector(`${buisnessTemplateUpTimeSelector}`);
    const overlay = card.querySelector(`${buisnessTemplateOverlaySelector}`);
    overlay.style.display = 'none';
    let passedTime = 0;
    upgradeCountdown.textContent = 'Апгрейд: ' + Math.round((buisnesses[id].upgradeTime)/60)+ ' ч '+ 
    + Math.round((buisnesses[id].upgradeTime)%60) + ' м';
    upgradeCountdown.style.display = 'inline';
    const x = setInterval(() => {
        upgradeCountdown.textContent = 'Апгрейд: ' + Math.round((buisnesses[id].upgradeTime - passedTime)/60)+ ' ч '+ 
        + Math.round((buisnesses[id].upgradeTime - 1 - passedTime)%60) + ' м';
        passedTime += 1;
        if ((buisnesses[id].upgradeTime - passedTime) === -1){
            clearInterval(x);
            upgradeCountdown.style.display = 'none';
            overlay.style.display = 'block';
            buisnesses[id].upgradeTime = Math.round(buisnesses[id].upgradeTime * buisnesses[id].timeScale);
            buisnesses[id].income = Math.round(buisnesses[id].income*buisnesses[id].scaleIncome)
            card.querySelector(`${buisnessTemplateLvlSelector}`).textContent = 'Lvl. ' + buisnesses[id].lvl;
            card.querySelector(`${buisnessTemplateIncomeSelector}`).textContent = `${buisnesses[id].income}$/с`;
            refreshIncome();
        }
    },1000)
    activePopup.classList.remove('popup-buisness_opened');
    
}

function createNewBuisness(evt) {
    activePopup.classList.remove('popup-buisness_opened');
    activePopup = createBuisnessPopup;
    createBuisnessPopup.innerHTML = '';
    let id = evt.currentTarget.id;
    const templateNewBuisness = document.querySelector(`${createBuisnessTemplate}`).content.cloneNode(true);
    createBuisnessPopup.classList.add('popup-buisness_opened');
    templateNewBuisness.querySelector(`${createBuisnessTitleSelector}`).textContent = buisnesses[id].name;
    templateNewBuisness.querySelector(`${createBuisnessImageSelector}`).src = `./images/${id}.png `;
    templateNewBuisness.querySelector(`${createBuisnessPriceSelector}`).textContent = buisnesses[id].startPrice + '$';
    templateNewBuisness.querySelector(`${createBuisnessInfoSelector}`).textContent = buisnesses[id].infoAbout;
    const templateNewBuisnessConfirm = templateNewBuisness.querySelector(`${createBuisnessConfirmButton}`)
        templateNewBuisnessConfirm.addEventListener('click', () => creatingBuisness(id),{once:true});
    createBuisnessPopup.append(templateNewBuisness);
}

function creatingBuisness(id) {
    balance.textContent = balance.textContent - buisnesses[id].startPrice;
    activePopup.classList.remove('popup-buisness_opened');
    const templateCompleteBuisness = document.querySelector(`${buisnessTemplate}`).content.cloneNode(true);
    templateCompleteBuisness.querySelector(`${buisnessTemplateTitleSelector}`).textContent = buisnesses[id].name;
    templateCompleteBuisness.querySelector(`${buisnessTemplateImgLinkSelector}`).src = `./images/${id}.png `;
    templateCompleteBuisness.querySelector(`${buisnessTemplateOverlaySelector}`).addEventListener('click', () => openPopupUpgrade(id));
    templateCompleteBuisness.querySelector(`${buisnessTemplateIncomeSelector}`).textContent = `${buisnesses[id].income}$/с`;
    templateCompleteBuisness.querySelector(`${buisnessTemplateLvlSelector}`).textContent = `Lvl.${buisnesses[id].lvl}`;
    templateCompleteBuisness.querySelector(`${buisnessTemplateCardSelector}`).id = id;
    buisnesses[id].made = true;
    buisnesses[id].lvl = 1;
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









