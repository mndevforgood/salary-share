<template>
  <div class="payShare">
    <p>
      Share this link with your coworkers:
    </p>
    <p>
      <span id="share-link">{{ currentFullUrl }}</span>
      <button class="share-button button" data-clipboard-target="#share-link">
        <img src="../assets/clippy.svg" height="15px" alt="Copy to clipboard" />
      </button>
    </p>
    <form
      v-if="shouldDisplayInput"
      class="pay-form"
      @submit.prevent="handleSubmit()"
    >
      <label for="pay-input">
        Enter your salary, hourly wage, or bonus amount here. Whatever is
        applicable to what you want to compare with other employees.
      </label>
      <input class="text-input" id="pay-input" v-model="payInput" type="text" />
      <button class="button">
        Submit
      </button>
    </form>
    <p v-else>Thank you for sharing your pay.</p>
    <div v-if="payLength >= 5">
      <p>Salaries in your group:</p>
      <div class="pay-item-container">
        <div class="pay-item" v-for="payItem in pay" :key="payItem">
          {{ payItem }}
        </div>
      </div>
    </div>
    <p v-else>
      Currently waiting for more people to enter their pay. The list will
      automatically populate once 5 people have entered their pay.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import db from '../firebase';
import ClipboardJS from 'clipboard';

@Component({})
export default class PayShare extends Vue {
  pay: string[] = [];
  payInput: string = '';
  localId: string | null = '';

  get payLength(): number {
    return this.pay.length;
  }

  get shouldDisplayInput(): boolean {
    if (!this.localId) return true;
    return false;
  }

  get currentFullUrl(): string {
    return `${location.origin}${this.$route.path}`;
  }

  get payInts(): number[] {
    return this.pay.map(num => parseInt(num));
  }

  get highestPay(): number {
    return Math.max(...this.payInts);
  }

  get lowestPay(): number {
    return Math.min(...this.payInts);
  }

  get medianPay(): number {
    this.payInts.sort(function(a, b) {
      return a - b;
    });

    var half = Math.floor(this.payInts.length / 2);

    if (this.payInts.length % 2) {
      return this.payInts[half];
    } else {
      return (this.payInts[half - 1] + this.payInts[half]) / 2.0;
    }
  }

  handleSubmit(): void {
    if (this.payInput.length === 0) return;
    db.collection('payshare')
      .doc(this.$route.params.id)
      .collection('pay')
      .add({
        pay: this.payInput,
      })
      .then(thing => {
        localStorage.setItem(this.$route.params.id, 'true');
        this.localId = localStorage.getItem(this.$route.params.id);
      });
  }

  created(): void {
    this.localId = localStorage.getItem(this.$route.params.id);
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

  mounted(): void {
    new ClipboardJS('.share-btn');
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
  margin: 0 auto;
  font-size: 16px;
  font-weight: 600;
}

.pay-form {
  margin: 50px 0;
}

.share-button {
  display: inline;
  padding: 4px 6px;
  margin-left: 10px;
}

.text-input {
  margin: 20px auto;
  display: block;
  height: 31px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  width: 200px;
  text-align: right;
  padding: 0 5px;
}

.pay-item-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
}

.pay-item {
  border-radius: 5px;
  background: #ddd;
  padding: 10px 20px;
  display: inline-block;
}
</style>
