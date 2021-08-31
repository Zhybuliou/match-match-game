import { showUserInfo } from '../indexedDB/indexedDB';

export function popupWin():void {
  const top = '<h2 class="page-about__header">Best players</h2><ul id="score-table" class="score-table"></ul>';
  const pageGames = document.getElementById('game-page') as HTMLElement;
  const pageGamesClean = '<div></div>';
  pageGames.innerHTML = pageGamesClean;
  const registerPopup = document.querySelector('body') as HTMLElement;
  const popupWindow = document.createElement('div');
  registerPopup.append(popupWindow);
  const popupContent = '<div id="winModal" class="modalWin"><div class="modal-content"><div class="modal-title"><div class="modal-image"></div><button class="win-btn-close" id="btn-close">ok</button></div></div></div>';
  popupWindow.innerHTML = popupContent;
  // Get the modal
  const modalWin = document.getElementById('winModal') as HTMLElement;
  // Get the button that opens the modal
  const btnWin = document.getElementById('btn-close') as HTMLElement;

  function popupDisplay() {
    modalWin.remove();
    const content = document.getElementById('home-page') as HTMLElement;
    const topLink = document.getElementById('top') as HTMLElement;
    const aboutLink = document.getElementById('about') as HTMLElement;
    const settingLink = document.getElementById('setting') as HTMLElement;
    content.classList.add('page-about');
    content.classList.remove('page-setting');
    content.innerHTML = top;
    settingLink.classList.remove('active-link');
    topLink.classList.add('active-link');
    aboutLink.classList.remove('active-link');
    showUserInfo();
    const navListAbout = document.getElementById('about') as HTMLElement;
    const navListTop = document.getElementById('top') as HTMLElement;
    const navListSetting = document.getElementById('setting') as HTMLElement;
    navListAbout.classList.remove('disable');
    navListTop.classList.remove('disable');
    navListSetting.classList.remove('disable');
    const avatarBlock = document.getElementById('btnStyle') as HTMLElement;
    const startBtn = '<input type="submit" id="startBtn" class="btnRegister" value="Start Game">';
    avatarBlock.innerHTML = startBtn;
  }

  btnWin?.addEventListener('click', popupDisplay);
}
