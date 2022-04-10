import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.log('put to database')

  // create connection to db
  const jateDb = await openDB('jate', 1)
  //new transaction
  const tx = jateDb.transaction('jate', 'readwrite')

  // open up object store
  const store = tx.objectStore('jate')

  // adding content
  const request = store.add({content})

  const result = await request
  console.log('saved to db')
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  // console.error('')
  console.log('get from db')
// connect to db
 const jateDb = await openDB('jate', 1)
// new transaction
 const tx = jateDb.transaction('jate', 'readonly')

 // open up object store
 const store = tx.objectStore('jate')

 // adding content
 const request = store.getAll()

 const result = await request
 console.log('result.value', result)
}
initdb();
