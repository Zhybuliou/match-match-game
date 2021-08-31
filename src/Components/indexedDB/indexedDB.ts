// work with indexedDB //
export function showUserInfo():void {
  let infoAllUserScore: {
    avatar: string,
    email: string,
    id: number,
    lastname: string,
    name: string,
    score: number
  }[];
  const dbs: IDBFactory = window.indexedDB;
  const nameIndexedDB = 'Zhybuliou';
  const req: IDBOpenDBRequest = dbs.open(nameIndexedDB, 1);
  let db: IDBDatabase;
  req.onupgradeneeded = () => {
    db = req.result;
    db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('info', { keyPath: 'id', autoIncrement: true });
  };
  function addGame(): void {
    dbs.open(nameIndexedDB, 1);
    db = req.result;
    const transactionScore = db.transaction('users', 'readwrite');
    const gamesScore = transactionScore.objectStore('users');
    const outputScore: IDBRequest = gamesScore.getAll();

    outputScore.onsuccess = () => {
      infoAllUserScore = outputScore.result;
      infoAllUserScore.sort((a, b) => (a.score < b.score ? 1 : -1));
      // console.log(infoAllUser[0].score);
      let counterScoreTable: number;
      if (infoAllUserScore.length > 10) {
        counterScoreTable = 10;
      } else {
        counterScoreTable = infoAllUserScore.length;
      }
      for (let i = 0; i < counterScoreTable; i += 1) {
        const list = document.getElementById('score-table') as HTMLElement;
        const listLi = document.createElement('li') as HTMLElement;
        listLi.classList.add('score-list');
        const re = `
          <div class="score-left-block">
            <img class="score-avatar" id="score-avatar" src="${infoAllUserScore[i].avatar}">
              <div class="score-info">
                <h5 class="score-name">${infoAllUserScore[i].name} ${infoAllUserScore[i].lastname}</h5>
                <p class="score-email text-style">${infoAllUserScore[i].email}</p>
              </div>
            </div>
          <div class= "score-right-block">
            <p class="score-score text-style">Score</p>
            <p class="score-point">${infoAllUserScore[i].score}</p>
          </div>
          `;
        listLi.innerHTML = re;
        list.appendChild(listLi);
      }
    };
  }
  req.onsuccess = () => {
    db = req.result;
    addGame();
  };
  req.onerror = () => {
    db = req.result;
  };
}

export function saveUserScore(arg: Record<string, unknown> | null | number):void {
  const dbs: IDBFactory = window.indexedDB;
  const nameIndexedDB = 'Zhybuliou';
  const req: IDBOpenDBRequest = dbs.open(nameIndexedDB, 1);
  let db: IDBDatabase;
  req.onupgradeneeded = () => {
    db = req.result;
    db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('info', { keyPath: 'id', autoIncrement: true });
  };
  req.onsuccess = () => {
    db = req.result;
    const transactionAll = db.transaction('info', 'readwrite');
    const gamesAll = transactionAll.objectStore('info');
    const requestAll = gamesAll.getAll();
    requestAll.onsuccess = () => {
      const transaction = db.transaction('users', 'readwrite');
      const games = transaction.objectStore('users');
      const gamerInfo = requestAll.result;
      const userLastInfo = gamerInfo.length - 1;
      const gameR = arg;
      const request = games.put(Object.assign(gameR, gamerInfo[userLastInfo]));
      request.onsuccess = () => {

      };
      request.onerror = () => {

      };
    };
  };
  req.onerror = () => {
  };
}

export function saveUserInfo(arg: Record<string, unknown> | null | number):void {
  const dbs: IDBFactory = window.indexedDB;
  const nameIndexedDB = 'Zhybuliou';
  const req: IDBOpenDBRequest = dbs.open(nameIndexedDB, 1);
  let db: IDBDatabase;
  req.onupgradeneeded = () => {
    db = req.result;
    db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('info', { keyPath: 'id', autoIncrement: true });
  };
  req.onsuccess = () => {
    db = req.result;
    const transaction = db.transaction('info', 'readwrite');
    const games = transaction.objectStore('info');
    const gameR = arg;
    const request = games.put(gameR);
    request.onsuccess = () => {
    };
    request.onerror = () => {
    };
  };
  req.onerror = () => {
  };
}
