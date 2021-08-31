import { time } from '../timer/timer';
import { saveUserScore, saveUserInfo } from '../indexedDB/indexedDB';
import { popupWin } from '../popups/popupWin';
import {
  foodCards, foodCardsSix, foodCardsEight, animalCards, animalCardsSix, animalCardsEight, transportCards, transportCardsSix, transportCardsEight,
} from '../cards/cards';

export function game(num = 16, cardNumber = 0):void {
  const numCards = num;
  const cardNumbers = cardNumber;
  let cardsChosen: string[] = [];
  let cardsChosenId: string[] = [];
  let cardsWon: string[] = [];
  let cardArray = foodCards;
  let styleCard = 'card';
  const styleCardArray = ['card', 'card-six', 'card-eight'];
  // i don't now how add type in TS this const cardObj.
  const cardObj: any = [
    {
      16: foodCards,
      36: foodCardsSix,
      64: foodCardsEight,
    },
    {
      16: animalCards,
      36: animalCardsSix,
      64: animalCardsEight,
    },
    {
      16: transportCards,
      36: transportCardsSix,
      64: transportCardsEight,
    },
  ];
  cardArray = cardObj[cardNumbers][numCards];
  styleCard = styleCardArray[cardNumbers];
  // check for matches
  let countStep = 0;
  function checkForMatch() {
    const cards = document.getElementsByClassName(styleCard);
    const optionOneId = Number(cardsChosenId[0]);
    const optionTwoId = Number(cardsChosenId[1]);

    if (optionOneId === optionTwoId) {
      cards[optionOneId].setAttribute('src', './assets/images/blank.png');
      cards[optionOneId].classList.remove('flip');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      countStep += 1;
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionOneId].classList.add('won');
      cards[optionTwoId].removeEventListener('click', flipCard);
      cards[optionTwoId].classList.add('won');
      cardsWon.push(String(cardsChosen));
    } else {
      countStep += 1;
      countStep -= 1;
      cards[optionTwoId].classList.add('loose');
      cards[optionOneId].classList.add('loose');
      setTimeout(
        () => {
          cards[optionOneId].setAttribute('src', './assets/images/blank.png');
          cards[optionTwoId].setAttribute('src', './assets/images/blank.png');
          cards[optionOneId].classList.remove('flip');
          cards[optionTwoId].classList.remove('flip');
          cards[optionTwoId].classList.remove('loose');
          cards[optionOneId].classList.remove('loose');
        },
        1 * 500,
      );
    }
    cardsChosen = [];
    cardsChosenId = [];
    const allCardsSelected: boolean = cardsWon.length === cardArray.length / 2;
    if (allCardsSelected) {
      const countSec = document.getElementById('timer');
      const countSecValue = countSec?.textContent?.split(':').map((item) => parseInt(item, 10));
      const minSec = countSecValue?.[0];
      const secCount = countSecValue?.[1];
      cardsWon = [];
      let result = countStep * 100 - ((Number(minSec) * 60 + Number(secCount)) * 10);
      if (result < 0) {
        result = 0;
      }
      saveUserScore({ score: result });
      popupWin();
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
    }
  }
  function flipCard(this:HTMLElement) {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[Number(cardId)].name);
    cardsChosenId.push(String(cardId));
    const numberImage = Number(cardId);
    this.setAttribute('src', cardArray[numberImage].img);
    this.classList.add('flip');
    if (cardsChosen[1]) {
      setTimeout(checkForMatch, 10);
    }
  }
  const gameFiled = '<section class="page-game" id="game-page"><div class="timer" id="timer">00:00</div><div class="grid"></div></section>';
  const Block = document.getElementById('btnStyle') as HTMLElement;
  const pauseBtn = '<input type="submit" id="pauseBtn" class="btnRegister" value="Pause Game">';
  const getHomePage = document.getElementById('home-page') as HTMLElement;
  getHomePage.innerHTML = gameFiled;
  Block.innerHTML = pauseBtn;

  cardArray.sort(() => 0.5 - Math.random());
  for (let i = 0; i < num; i += 1) {
    const card = document.createElement('img') as HTMLElement;
    const grid = document.querySelector('.grid') as HTMLElement;
    card.setAttribute('src', cardArray[i].img);
    card?.setAttribute('data-id', `${i}`);
    card?.classList.add('card-style', styleCard);
    card?.addEventListener('click', flipCard);
    grid?.appendChild(card);
    grid.classList.add('disabled');
  }
  const allCards = Array.from(document.getElementsByClassName(styleCard));
  // show card 30 sec //
  setTimeout(
    () => {
      allCards.forEach((elem) => {
        elem.setAttribute('src', './assets/images/blank.png');
      });
      const grid = document.querySelector('.grid') as HTMLElement;
      grid.classList.remove('disabled');
      time();
    },
    30 * 1000,
  );
  const navListAbout = document.getElementById('about') as HTMLElement;
  const navListTop = document.getElementById('top') as HTMLElement;
  const navListSetting = document.getElementById('setting') as HTMLElement;
  navListAbout.classList.add('disable');
  navListTop.classList.add('disable');
  navListSetting.classList.add('disable');
}
