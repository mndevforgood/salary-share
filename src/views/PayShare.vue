<template>
  <div class="payShare">
    <h2>
      Share this link with your coworkers:
    </h2>
    <div class="share-container">
      <span id="share-link" class="share-link">{{ currentFullUrl }}</span>
      <div class="share-button-container">
        <button class="share-button button" data-clipboard-target="#share-link">
          <img
            src="../assets/clippy.svg"
            height="15px"
            alt="Copy to clipboard"
          />
        </button>
        <div v-if="showCopiedTooltip" class="share-tooltip">
          Copied to clipboard!
        </div>
      </div>
    </div>
    <form
      v-if="shouldDisplayInput"
      class="pay-form"
      @submit.prevent="handleSubmit()"
      autocomplete="off"
    >
      <label for="pay-input">
        Enter your current salary here. Whatever is applicable to what you want
        to compare with other employees. No other information will be shared or
        stored, ever.
      </label>
      <input
        required
        class="text-input"
        id="pay-input"
        v-model="payInput"
        type="text"
      />
      <button class="button">
        Submit
      </button>
    </form>
    <p v-else>Thank you for sharing with the group.</p>
    <div v-if="!shouldDisplayInput && payLength >= 5">
      <p>Salaries in your group:</p>
      <div class="pay-meta-container">
        <p>Max: {{ highestPay }}</p>
        <p>Min: {{ lowestPay }}</p>
        <p>Median: {{ medianPay }}</p>
      </div>
      <div class="pay-item-container">
        <div class="pay-item" v-for="payItem in pay" :key="payItem">
          {{ payItem }}
        </div>
      </div>
    </div>
    <p v-else-if="!shouldDisplayInput">
      <em>
        Currently waiting for more people to enter their pay. The list will
        automatically populate once 5 people have entered their pay.
      </em>
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
  showCopiedTooltip: boolean = false;

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

  copiedToClipboard(): void {
    this.showCopiedTooltip = true;

    setTimeout(() => {
      this.showCopiedTooltip = false;
    }, 3000);
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
    const clipboard = new ClipboardJS('.share-button');

    clipboard.on('success', e => {
      this.copiedToClipboard();

      e.clearSelection();
    });
  }
}
</script>

<style lang="scss" scoped>
.payShare {
  max-width: 100%;
}

.pay-form {
  margin: 50px auto;
  max-width: 450px;
}

.share-container {
  margin-bottom: 50px;
}

.share-link {
  word-wrap: break-word;
}

.share-button-container {
  position: relative;
  display: inline-block;
  margin-left: 10px;
}

.share-button {
  display: inline;
  padding: 4px 6px;
}

.share-tooltip {
  position: absolute;
  color: #333;
  background: #fff;
  padding: 4px 7px;
  border-radius: 3px;
  top: calc(100% + 6px);
  font-size: 12px;
  left: 50%;
  transform: translateX(-50%);

  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 3px solid white;
  }
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
  color: #333;
  padding: 10px 20px;
  display: inline-block;
}

.pay-meta-container {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
