<template>
  <div>
    <h2>Fruits</h2>

    <ul>
      <li v-for="(fruit, index) in fruits" :key="index">
        {{ fruit }}
        <button @click="deleteFruit(index)">Delete</button>
      </li>
    </ul>

    <input v-model="newFruit" placeholder="Enter a new fruit" />
    <button @click="addFruit">Add Fruit</button>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref } from 'vue';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from '../firebase';
import { onSnapshot } from 'firebase/firestore';



export default {
  data() {
  return {
    fruits: [],
    newFruit: ''
  };
},
 mounted() {
  // Fetch fruits from Firestore on component mount
  this.fetchFruits();
  
  // Fetch initial data from Firestore
  const fruitsCollection = collection(db, 'fruits');
  onSnapshot(fruitsCollection, (snapshot) => {
    this.fruits = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
},


  methods: {
    async fetchFruits() {
      try {
        // Use Firestore's collection and getDocs to fetch data
        const querySnapshot = await getDocs(collection(db, 'fruits'));
        this.fruits = querySnapshot.docs.map(doc => doc.data().name);
      } catch (error) {
        console.error('Error fetching fruits:', error);
      }
    },
    async addFruit() {
      try {
        if (this.newFruit) {
          // Use Firestore's collection and addDoc to add data
          await addDoc(collection(db, 'fruits'), { name: this.newFruit });
          this.newFruit = '';
          // After adding, re-fetch the fruits to update the list
          this.fetchFruits();
        }
      } catch (error) {
        console.error('Error adding fruit:', error);
      }
    },
    async deleteFruit(index) {
      try {
        // Use Firestore's collection, doc, and deleteDoc to delete data
        const querySnapshot = await getDocs(collection(db, 'fruits'));
        const fruitId = querySnapshot.docs[index].id;
        await deleteDoc(doc(db, 'fruits', fruitId));
        // After deleting, re-fetch the fruits to update the list
        this.fetchFruits();
      } catch (error) {
        console.error('Error deleting fruit:', error);
      }
    },
  }
};
</script>
