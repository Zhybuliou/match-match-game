import { saveUserInfo } from '../indexedDB/indexedDB';
import { avatar } from '../avatar/avatar';

export function popup():void {
  const registerPopup = document.querySelector('body') as HTMLElement;
  const popupWindow = document.createElement('div');
  registerPopup.append(popupWindow);
  const popupContent = '<div id="myModal" class="modal"><div class="modal-content"><div class="modal-title"><h6 class="modal-title__h6">Register new Player</h6><form class="modal-form" id="modal-form" name="modal-form"><label class="label-fname" for="fname">First name:</label><br><input type="text" class="fname" id="fname" name="fname" maxlength="30" pattern="[A-Za-z]{1,30}" value ="" required><br><div class="update-fname"></div><label class="label-lname" for="lname">Last name:</label><br><input type="text" class="lname" id="lname" name="lname"  maxlength="30" pattern="[A-Za-z]{1,30}" value ="" required><br><div class="update-name"></div><label class="label-mail" for="e-mail">E-mail</label><br><input class="e-mail" type="e-mail" id="e-mail" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,30}$" maxlength="30" value="" required><div class="update-email"></div><label for="pictureTest" class="pictureAvatarCross">+</label><input type="file" id="pictureTest" class="pictureTest"  capture><input class="submit" type="submit" id="submit" name="submit" value="ADD USER"><span class="close" id="close">cancel</span><img class="form-image" id="testImage" src="./assets/avatar.png" alt="avatar"></form></div></div></div>';
  popupWindow.innerHTML = popupContent;
  // Get the modal
  const modal = document.getElementById('myModal') as HTMLElement;
  // Get the button that opens the modal
  const btn = document.getElementById('btnRegister') as HTMLElement;
  // Get the <span> element that closes the modal
  const span = document.getElementById('close') as HTMLElement;
  // When the user clicks on the button, open the modal
  function popupDisplay() {
    modal.style.display = 'block';
  }
  btn?.addEventListener('click', popupDisplay);
  // When the user clicks on <span> (x), close the modal
  function popupClose() {
    modal.style.display = 'none';
    const imageAvatar = document.getElementById('testImage') as HTMLElement;
    const input = document.getElementById('fname') as HTMLInputElement;
    const inputLastName = document.getElementById('lname') as HTMLInputElement;
    const inputEmail = document.getElementById('e-mail') as HTMLInputElement;
    inputLastName.value = '';
    inputEmail.value = '';
    input.value = '';
    imageAvatar.setAttribute('src', './assets/avatar.png');
  }
  span?.addEventListener('click', popupClose);
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  // form submit event //
  const modalForm = document.getElementById('modal-form') as HTMLElement;
  const avatarBlock = document.getElementById('btnStyle') as HTMLElement;
  const startBtn = '<input type="submit" id="startBtn" class="btnRegister" value="Start Game">';
  avatar();
  modalForm.onsubmit = (e) => {
    e.preventDefault();
    // start game btn //
    avatarBlock.innerHTML = startBtn;
    modal.style.display = 'none';
    const avatarNav = document.getElementById('avatar') as HTMLElement;
    const imageAvatar = document.getElementById('testImage') as HTMLElement;
    const imageLink = imageAvatar.getAttribute('src');
    avatarNav.style.backgroundImage = `url(${imageLink})`;
    const input = document.getElementById('fname') as HTMLInputElement;
    const inputLastName = document.getElementById('lname') as HTMLInputElement;
    const inputEmail = document.getElementById('e-mail') as HTMLInputElement;
    saveUserInfo({
      name: String(input.value), lastname: String(inputLastName.value), email: String(inputEmail.value), avatar: imageLink,
    });
  };
  const inputE = document.getElementById('e-mail') as HTMLInputElement;
  const update = document.querySelector('.update-email') as HTMLElement;
  const correctInput = 'v';
  const notCorrectInput = 'x';
  function inputEmailFunction(e: Event): void {
    const target = e.target as HTMLInputElement;
    const input = target.value;
    if (input && /(^\w.*@\w+\.\w)/.test(input)) {
      update.textContent = correctInput;
      update.classList.add('success');
      update.classList.remove('failure');
    } else {
      update.textContent = notCorrectInput;
      update.classList.remove('success');
      update.classList.add('failure');
    }
  }
  inputE.addEventListener('input', inputEmailFunction);

  const inputFname = document.getElementById('fname') as HTMLInputElement;
  const updateFname = document.querySelector('.update-fname') as HTMLElement;
  function inputFnameFunction(e: Event): void {
    const target = e.target as HTMLInputElement;
    const input = target.value;
    const patternRegexp = /(^[a-zA-Z]+$)/;
    if (input.match(patternRegexp)) {
      updateFname.textContent = correctInput;
      updateFname.classList.add('success');
      updateFname.classList.remove('failure');
    } else {
      updateFname.textContent = notCorrectInput;
      updateFname.classList.remove('success');
      updateFname.classList.add('failure');
    }
  }
  inputFname.addEventListener('input', inputFnameFunction);

  const inputName = document.getElementById('lname') as HTMLInputElement;
  const updateName = document.querySelector('.update-name') as HTMLElement;
  function inputNameFunction(e: Event): void {
    const target = e.target as HTMLInputElement;
    const input = target.value;
    const patternRegexp = /(^[a-zA-Z]+$)/;
    if (input.match(patternRegexp)) {
      updateName.textContent = correctInput;
      updateName.classList.add('success');
      updateName.classList.remove('failure');
    } else {
      updateName.textContent = notCorrectInput;
      updateName.classList.remove('success');
      updateName.classList.add('failure');
    }
  }
  inputName.addEventListener('input', inputNameFunction);
}
