<template>
  <div class="payShare">
    <p>
      Share this link with your coworkers:
      {{ currentFullUrl }}
    </p>
    <div v-if="payLength >= 5">{{ pay }}</div>
    <div v-else>Waiting for more people to enter their salaries.</div>
    <form @submit.prevent="handleSubmit()">
      <input v-model="payInput" type="text" />
      <button class="button">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import db from '../firebase';

@Component({})
export default class PayShare extends Vue {
  pay: string[] = [];
  payInput: string = '';

  get payLength() {
    return this.pay.length;
  }

  get currentFullUrl() {
    return `${location.origin}${this.$route.path}`;
  }

  handleSubmit() {
    if (this.payInput.length === 0) return;
    db.collection('payshare')
      .doc(this.$route.params.id)
      .collection('pay')
      .add({
        pay: this.payInput,
      });
  }

  created() {
    db.collection('payshare')
      .doc(this.$route.params.id)
      .collection('pay')
      .onSnapshot(querySnapshotPay => {
        this.pay = [];
        querySnapshotPay.forEach(person => {
          this.pay.push(person.data().pay as string);
        });
      });
  }
}
</script>
