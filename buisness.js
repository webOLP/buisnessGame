import {buisnesses} from './buisnessesInfo.js'

const buisnessesList = document.querySelector('.buisness__main');
const newBuisnessButton = document.querySelector('.buisness__button-new');
const buisnessIncome = document.querySelector('.buisness__income')
export const buisnessIncomeNumber = document.querySelector('.buisness__income-number');

//Buisnesses Popup
const newBuisnessPopup = document.querySelector('.popup-buisness-new');
const newBuisnessList = document.querySelectorAll('.popup-buisness-new__buisness');
const cardImageSelector = 'popup-buisness-new__img';
const cardTitleSelector = 'popup-buisness-new__element-title';
const cardPriceSelector = 'popup-buisness-new__price';
const cardInfoSelector = 'popup-buisness-new__about';

//BuyCard Popup
const cardPopup = document.querySelector('.popup-buisness-create');
const cardPopupTitleSelector = 'popup-buisness-create__title';
const cardPopupPriceSelector = 'popup-buisness-create__price';
const cardPopupImageSelector = 'popup-buisness-create__image';
const cardPopupInfoSelector = 'popup-buisness-create__info';
const cardPopupConfirmButton = 'popup-buisness-create__confirm';
const returnButton = document.querySelector('.return-button');

//UpgradeCard Popup
const cardUpgradePopup = document.querySelector('.popup-buisness-upgrade');
const cardUpgradePopupTitleSelector = 'popup-buisness-upgrade__title';
const cardUpgradePopupCurIncomeSelector = 'popup-buisness-upgrade__current-income';
const cardUpgradePopupNextIncomeSelector = 'popup-buisness-upgrade__next-income';
const cardUpgradePopupImageSelector = 'popup-buisness-upgrade__image';
const cardUpgradePopupTimeSelector = 'popup-buisness-upgrade__upgrade-time';
const cardUpgradePopupConfirmButton = 'popup-buisness-upgrade__confirm';
const cardUpgradePopupInfoSelector = 'popup-buisness-upgrade__info';

//Template
const buisnessTemplate = 'buisness-card';
const buisnessTemplateCardSelector = 'buisness__card';
const buisnessTemplateImgLinkSelector = 'buisness__img';
const buisnessTemplateTitleSelector = 'buisness__card-title';
const buisnessTemplateIncomeSelector = 'buisness__card-income';
const buisnessTemplateLvlSelector = 'buisness__card-lvl';
const buisnessTemplateOverlaySelector = 'buisness__card-overlay';


function refreshIncome() {
    let countIncome = 0;
    buisnessesList.querySelectorAll(`.${buisnessTemplateIncomeSelector}`).forEach(income => {
        countIncome += Number(income.textContent.slice(0,-3));
    });
    buisnessIncomeNumber.textContent = `${countIncome}$`;
    buisnessIncomeNumber.style.display = 'none';
    buisnessIncomeNumber.style.display = 'inline';
}

function openBuisnessPopup() {
    newBuisnessPopup.style.display = 'flex';
    newBuisnessPopup.classList.add('popup_opened');
}

function openPopupUpgrade(evt) {
    cardUpgradePopup.style.display = 'flex';
    cardUpgradePopup.classList.add('popup_opened');
    const currentBuisness = buisnesses[evt.currentTarget.parentElement.id]
    console.log(currentBuisness)
    cardUpgradePopup.addEventListener('click', (evt) => {
        if(evt.target == cardUpgradePopup) {
            cardUpgradePopup.style.display = 'none';
            cardUpgradePopup.classList.remove('popup_opened');
        }
    })
    cardUpgradePopup.querySelector(`.${cardUpgradePopupTitleSelector}`).textContent = currentBuisness.name;
    cardUpgradePopup.querySelector(`.${cardUpgradePopupCurIncomeSelector}`).textContent = `${currentBuisness.currentIncome}$`
    cardUpgradePopup.querySelector(`.${cardUpgradePopupNextIncomeSelector}`).textContent = `${Math.round(currentBuisness.currentIncome * currentBuisness.scaleIncome, -1)}$`
    cardUpgradePopup.querySelector(`.${cardUpgradePopupInfoSelector}`).textContent = currentBuisness.infoAbout
    cardUpgradePopup.querySelector(`.${cardUpgradePopupImageSelector}`).src = currentBuisness.imageLink;
    cardUpgradePopup.querySelector(`.${cardUpgradePopupTimeSelector}`)
    .textContent = 'Вреям улучшения: ' + Math.round(currentBuisness.upgradeTime/60) + 'час.'+ ' ' 
    + Math.round(currentBuisness.upgradeTime%60) + 'мин.';
}

function createNewBuisness(evt) {
    evt.currentTarget.closest('.popup').style.display = 'none';
    cardPopup.classList.remove('popup_opened');
    cardPopup.style.display = 'flex';
    cardPopup.classList.add('popup_opened');
    const cardPopupTitle = cardPopup.querySelector(`.${cardPopupTitleSelector}`).textContent = evt.currentTarget.querySelector(`.${cardTitleSelector}`).textContent;
    const cardPopupImg =  cardPopup.querySelector(`.${cardPopupImageSelector}`).src = evt.currentTarget.querySelector(`.${cardImageSelector}`).src;
    cardPopup.querySelector(`.${cardPopupPriceSelector}`).textContent = evt.currentTarget.querySelector(`.${cardPriceSelector}`).textContent + '$';
    cardPopup.querySelector(`.${cardPopupInfoSelector}`).textContent = evt.currentTarget.querySelector(`.${cardInfoSelector}`).textContent;
    cardPopup.querySelector(`.${cardPopupConfirmButton}`).addEventListener('click', (evt) => creatingBuisness(evt,cardPopupTitle, cardPopupImg), {once : true});
}

function creatingBuisness(evt,title,img) {
    evt.currentTarget.closest('.popup').style.display = 'none';
    const cloneTemplate = document.querySelector(`.${buisnessTemplate}`).content.cloneNode(true);
    cloneTemplate.querySelector(`.${buisnessTemplateTitleSelector}`).textContent = title;
    cloneTemplate.querySelector(`.${buisnessTemplateImgLinkSelector}`).src = img;
    cloneTemplate.querySelector(`.${buisnessTemplateOverlaySelector}`).addEventListener('click', (evt) => openPopupUpgrade(evt))
    for (let key in buisnesses) {
        if(buisnesses[key].name == title) {
            cloneTemplate.querySelector(`.${buisnessTemplateIncomeSelector}`).textContent = `${buisnesses[key].startIncome}$/с`;
            cloneTemplate.querySelector(`.${buisnessTemplateLvlSelector}`).textContent = `Lvl.${buisnesses[key].lvl}`;
            cloneTemplate.querySelector(`.${buisnessTemplateCardSelector}`).id = key;
            break;
        }
    }
    
    buisnessesList.append(cloneTemplate);
    if(buisnessesList.hasChildNodes){
        buisnessIncome.style.display = 'flex'
        newBuisnessButton.style.width = '30%';
        newBuisnessButton.textContent = 'Создать'
    }
    refreshIncome();
}

newBuisnessButton.addEventListener('click', openBuisnessPopup);




newBuisnessList.forEach(element => {
    element.addEventListener('click', (evt) => createNewBuisness(evt))
})




