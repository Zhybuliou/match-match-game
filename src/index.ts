import './styles.scss'; // add style
import { game } from './Components/game/game';
import { nav } from './Components/nav/nav';
import { popup } from './Components/popups/popup';
import { showUserInfo } from './Components/indexedDB/indexedDB';

nav();
popup();
const topLink = document.getElementById('top') as HTMLElement;
const settingLink = document.getElementById('setting') as HTMLElement;
const aboutLink = document.getElementById('about') as HTMLElement;
const about = '<section class="page-about" id="home-page"><h2 class="page-about__header">How to play?</h2><div class="page-about__step1"><div class="page-about__step1-description"><img src="./assets/one.png" alt="one step"><p class="text-style">Register new player in game</p></div><div class="page-about__step1-image"></div></div><div class="page-about__step1"><div class="page-about__step2-description"><img src="./assets/two.png" alt="two step"><p class="text-style">Configure your game settings</p></div><div class="page-about__step2-image"></div></div><div class="page-about__step1"><div class="page-about__step1-description"><img src="./assets/three.png" alt="three step"><p class="text-style">Start you new game! Remember card positions and match it before times up.</p></div><div class="page-about__step3-image"></div></div></section>';

const top = '<section class="page-about" id="home-page"><h2 class="page-about__header">Best players</h2><ul id="score-table" class="score-table"></ul></section>';

const setting = '<section class="page-setting" id="home-page"><h2 class="page-setting__title">Game cards</h2><div class="custom-select" ><select class="setting-select" id="settingSelect";><option value="0">select game cards type</option><option value="0">food</option><option value="1">animal</option><option value="2">car</option></select></div><h2 class="page-setting__title">Difficulty</h2><div class="custom-select" ><select class="setting-select" id="settingLevel"><option value="16">select game type</option><option value="16">4x4</option><option value="36">6x6</option><option value="64">8x8</option></select></div></section>';

const linkLocationPathname:string = window.location.pathname;
const content = document.createElement('div');
const rootDiv = document.querySelector('body') as HTMLElement;
rootDiv.append(content);
if (linkLocationPathname === '/zhybuliou-JSFE2021Q1/match-match-game/dist/') {
  window.location.hash = '#/about/';
  content.innerHTML = about;
} else if (linkLocationPathname === '/dist/best') {
  content.innerHTML = top;
} else if (linkLocationPathname === '/dist/setting') {
  content.innerHTML = setting;
} else {
  window.location.hash = '#/about/';
  content.innerHTML = about;
}
// setting page //
let numberSlide = 0;
let selectCards = 0;
function handleClick() {
  content.innerHTML = setting;
  settingLink.classList.add('active-link');
  topLink.classList.remove('active-link');
  aboutLink.classList.remove('active-link');
  window.location.hash = '/users/';
  const selectElement = document.getElementById('settingLevel') as HTMLSelectElement;
  const selectSetting = document.getElementById('settingSelect') as HTMLSelectElement;
  selectElement?.addEventListener('change', () => {
    numberSlide = parseInt(selectElement.value, 10);
    selectCards = parseInt(selectSetting.value, 10);
  });
  selectSetting?.addEventListener('change', () => {
    selectCards = parseInt(selectSetting.value, 10);
    numberSlide = parseInt(selectElement.value, 10);
  });
}
settingLink?.addEventListener('click', handleClick);
// page about //
function aboutClick() {
  content.innerHTML = about;
  settingLink.classList.remove('active-link');
  topLink.classList.remove('active-link');
  aboutLink.classList.add('active-link');
}
aboutLink?.addEventListener('click', aboutClick);
// page score //
function topClick() {
  content.innerHTML = top;
  settingLink.classList.remove('active-link');
  topLink.classList.add('active-link');
  aboutLink.classList.remove('active-link');
  showUserInfo();
}
topLink?.addEventListener('click', topClick);

document.addEventListener('click', (event) => {
  if (event.target === document.getElementById('startBtn')) {
    if (numberSlide === 0) {
      numberSlide = 16;
    }
    game(numberSlide, selectCards);
  }
});
