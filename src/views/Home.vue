<template>
  <div class="home">
    <h1>Pay Share</h1>
    <button class="button" @click="createAndNavigate()">Create</button>
    <div class="explaination">
      <h2>What is this?</h2>
      <p></p>
    </div>
    <p></p>
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
      .add({
        createdOn: new Date(),
      })
      .then(docRef => {
        payId = docRef.id;
        this.$router.push({ path: `/${payId}` });
      });
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.explaination {
  margin-top: 50px;
}
</style>
