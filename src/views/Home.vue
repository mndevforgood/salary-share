<template>
  <div class="home">
    <h1>Pay Share</h1>
    <p></p>
    <button class="button" @click="createAndNavigate()">Create New</button>
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

<style lang="scss" scoped>
.button {
  border-radius: 5px;
  background: #fff;
  padding: 10px 40px;
  display: block;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin: 0 auto;
}
</style>
