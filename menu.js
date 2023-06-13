//
const menuList = document.querySelectorAll('.menu__button');
let currentTab = document.querySelector('.menu__main');
const currentTabClass = 'menu__current';
const popups = document.querySelectorAll('.popup');

function returnBack() {
    
}

function changeTab(evt){
    currentTab.classList.remove(`${currentTabClass}`);
    document.querySelector(`.${currentTab.id}`).style.display = 'none';
    popups.forEach(popup => {
        popup.style.display = 'none';
    })
    evt.currentTarget.classList.add(`${currentTabClass}`);
    currentTab = evt.currentTarget;
    document.querySelector(`.${currentTab.id}`).style.display = 'flex';
}




menuList.forEach(element => {
    element.addEventListener('click', (evt) => changeTab(evt))
})



