export function avatar(): void {
  let db: IDBDatabase;
  const dbVersion = 1;
  const imageButton = document.getElementById('pictureTest');
  const request = indexedDB.open('Zhybuliou', dbVersion);
  request.onerror = () => {
    db = request.result;
  };
  request.onsuccess = () => {
    db = request.result;
  };
  request.onupgradeneeded = () => {
    db = request.result;
    db.createObjectStore('image', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('info', { keyPath: 'id', autoIncrement: true });
  };

  function doFile(e: Event): void {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const bits = reader.result;
      const ob = {
        data: bits,
      };
      const trans = db.transaction(['image'], 'readwrite');
      const addReq = trans.objectStore('image').add(ob);
      addReq.onerror = () => {
      };
      trans.oncomplete = () => {
        const image = document.querySelector('#testImage') as HTMLElement;
        const transOn = db.transaction(['image'], 'readwrite');
        const req = transOn.objectStore('image').getAll();
        req.onsuccess = () => {
          const record = req.result;
          image.setAttribute('src', `data:image/jpeg;base64,${btoa(record[record.length - 1].data)}`);
        };
      };
    };
  }
  document.addEventListener('DOMContentLoaded', () => {
    imageButton?.addEventListener('change', doFile);
  });
}
