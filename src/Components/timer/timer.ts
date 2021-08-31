export function time():void {
  let countSec = 0;
  const pauseBtn = document.getElementById('pauseBtn') as HTMLElement;
  const timer = document.getElementById('timer') as HTMLElement;
  const grid = document.getElementById('home-page') as HTMLElement;
  let min = 0;
  let sec = 0;
  let stopTime = true;
  let interval: NodeJS.Timeout;

  function display() {
    let m;
    let s;
    m = min;
    s = sec;
    if (min < 10) {
      m = `0${min}`;
    }
    if (sec < 10) {
      s = `0${sec}`;
    }
    timer.textContent = `${m}:${s}`;
  }
  function startTime():void {
    interval = setInterval(() => {
      sec += 1;
      countSec += 1;
      if (sec === 60) {
        min += 1;
        sec = 0;
      }
      if (min === 60) {
        min = 0;
        sec = 0;
      }
      display();
    }, 1000);
  }
  function pauseTimer() {
    stopTime = true;
    clearInterval(interval);
    pauseBtn.setAttribute('value', 'continue');
    grid.classList.add('disabled');
  }

  function continueTimer() {
    stopTime = false;
    startTime();
    pauseBtn.setAttribute('value', 'pause game');
    grid.classList.remove('disabled');
  }

  pauseBtn.addEventListener('click', () => {
    if (stopTime) {
      continueTimer();
      stopTime = false;
    } else {
      pauseTimer();
      stopTime = true;
    }
  });
  continueTimer();
}
