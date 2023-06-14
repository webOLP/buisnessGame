export const balance = document.querySelector('.balance__number');
const jobTitle = document.querySelector('.job__title');
const salary = document.querySelector('.salary__number')
const expCurrent = document.querySelector('.points_current');
const expNeeded = document.querySelector('.points_needed');
const workButton = document.querySelector('.button-work');
const touchZone = document.querySelector('.touch-zone');
const info = document.querySelector('.info');
const menuButtons = document.querySelectorAll('.menu__button');
//
let expCount = 0;
let lvlCurrent = 0;
const jobList = ['Дворник','Кассир','Менеджер','Директор','Гл.Директор','Остановись!','Жаль мышь','С тебя шава']

// Задаем тач зоне высоту
touchZone.style.height = `calc(100% - ${workButton.clientHeight + info.clientHeight}px)`

// Задаем кнопкам меню размер
menuButtons.forEach(button => {
    button.style.height = `${button.clientWidth}px`;
});

function activateClicks(){
    expCount += 1;
    balance.textContent = Number(balance.textContent) + Number(salary.textContent);
    expCurrent.textContent = expCount;
    if(expCount == expNeeded.textContent) {
        upgradeLvl();
    }
}

function upgradeLvl() {
    lvlCurrent += 1;
    expCount = 0;
    salary.textContent = Number(salary.textContent) + 2;
    expCurrent.textContent = '0';
    expNeeded.textContent = Math.round(Number(expNeeded.textContent)+3);
    if(lvlCurrent % 2 != 0) {
        jobTitle.textContent += '+';
        return;
    }
    jobTitle.textContent = jobList[lvlCurrent/2];
}

workButton.addEventListener('click',() => {
    workButton.classList.toggle('button-work_active');
    if(workButton.textContent === 'Работать') {
        workButton.textContent = '';
        workButton.style.height = `${workButton.clientWidth/3}px`;
        setTimeout(() => {workButton.style.backgroundImage = 'url(./images/button_off.png)'},400);
        touchZone.addEventListener('click',activateClicks)
        touchZone.textContent = `${document.documentElement.clientHeight} выс X ${document.documentElement.clientWidth} шир`
        return;
    }
    workButton.style.backgroundImage = '';
    setTimeout(() => {workButton.textContent = 'Работать'},400);
    touchZone.removeEventListener('click',activateClicks);
})