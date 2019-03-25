<template>
  <div class="home">
    <button @click="createAndNavigate()">Create New</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import db from '../firebase';
import 'firebase/firestore';

@Component({})
export default class Home extends Vue {
  createAndNavigate() {
    let payId: string = '';
    db.collection('payshare')
      .add({})
      .then(docRef => {
        payId = docRef.id;
        this.$router.push({ path: `/${payId}` });
      });
  }
}
</script>
