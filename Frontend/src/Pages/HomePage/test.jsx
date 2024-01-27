import db from '../../../../Firebase/Firebase-config';
import { ref, set } from 'firebase/database';

// Simple test to write data to Firebase
const writeTestData = () => {
  set(ref(db, 'messages'), { test: 'data' })
    .then(() => console.log('Data written successfully to Firebase.'))
    .catch((error) => console.error('Error writing to Firebase:', error));
};

export default writeTestData;