import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () => {
  await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Function to put data into the database
export const putDb = async (content) => {
  console.log('PUT to the database');


  const contactDb = await openDB('jate', 1);


  const tx = contactDb.transaction('jate', 'readwrite');

  
  const store = tx.objectStore('jate');

 
  const request = store.put({ id: 1, value: content });

 
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Function to get data from the database
export const getDb = async () => {
  console.log('GET from the database');

  
  const contactDb = await openDB('jate', 1);

 
  const tx = contactDb.transaction('jate', 'readonly');

  
  const store = tx.objectStore('jate');

 
  const request = store.getAll();

  // Wait for the request to complete
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};


initdb();
