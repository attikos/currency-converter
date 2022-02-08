<template>
  <div class="currency-list-wrapper">
    <h1 class="title">Exchange rate to ruble</h1>

    <input class="search-input" type="text" placeholder="Search currency">

    <ul class="currency-list">
      <li v-for="currency in paginatedList" :key="currency.code" class="currency-list-item">
        <div class="list-code">{{ currency.CharCode }}</div>
        <div class="list-name">{{ currency.Name }}</div>
        <div class="list-rate">{{ currency.Value }}</div>
      </li>

      <li
        v-if="paginatedList.length < currencyList.length"
        class="currency-list-item load-more"
        @click="getMoreItems()"
      >... Load more</li>
    </ul>
  </div>
</template>

<script>
import { getRates, getRatesEng } from '../api';

export default {
  name: 'CurrencyList',
  data() {
    return {
      ratesData: {},
      currencyList: [],
      page: 0,
      limit: 10,
    }
  },

  computed: {
    paginatedList() {
      const start = 0;
      let end = this.page * this.limit + this.limit;

      if (end > this.currencyList?.length) {
        end = this.currencyList.length;
      }

      return this.currencyList.slice(start, end);
    },
  },

  mounted() {
    this.fetchRates();
  },

  methods: {
    getMoreItems() {
      console.log('this.page', this.page);

      // this.paginatedList = this.currencyList.slice(this.page, this.limit);

      // console.log('this.currencyList.slice(0, this.limit)', ...this.currencyList.slice(this.page, this.limit));

      this.page++;
    },

    async fetchRates() {
      try {
        // this.ratesData = await getRates();
        this.ratesData = await getRatesEng().then(data => data.ValCurs);
        console.log('this.ratesData', this.ratesData);


        const currencyHash = this.ratesData.Valute;
        this.currencyList = Object.keys(currencyHash).map(currency => currencyHash[currency]);
      } catch (error) {
        console.log('error', error);
        throw Error('Error getting rates!');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/_breakepoints.scss';

$color-text: #fff;
.currency-list-wrapper {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  // padding: 16px;
  width: 400px;

  @include xs() {
    border: none;
    width: 100%;
  }
}

.currency-list {
  display: block;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  margin: 0;
  padding: 0;
}

.title {
  font-weight: 400;
  font-style: italic;
  font-size: 32px;
  margin: 16px 16px 8px;

  @include xs() {
    font-size: 24px;
  }
}

.search-input {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  padding: 8px 12px;
  color: $color-text;
  font-size: 18px;
  margin: 0 16px 16px;
  width: calc(100% - 59px);

  &:focus-visible {
    outline: none;
  }

  &:focus,
  &:focus-visible {
    outline: none;
    transition: 0.3s all ease-in-out;
    border-color: #fff;
  }

  &::placeholder {
    color: rgb(231, 231, 231);
    font-size: 16px;
  }
}

.list-code {
  grid-area: code;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
}

.list-name {
  grid-area: name;
  font-size: 13px;
  line-height: 18px;
  color: $color-text;
  opacity: 0.8;
}

.list-rate {
  grid-area: rate;
  justify-self: end;
  align-self: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
}

.currency-list-item {
  display: grid;
  grid-template-areas:
    "code rate"
    "name rate";
  margin: 0;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  border-image: linear-gradient(to right, rgba(255, 255, 255, 0.2), #f38b18, rgba(255, 255, 255, 0.2)) 1;
  cursor: pointer;
  transition: 0.3s all ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0,0,0,0.3);
  }
}

.load-more {
  min-height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
