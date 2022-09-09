<template>
  <CurrencyList
    :error="error"
    :currency-rates="currencyRates"
    :is-loading="isLoading"
    @set-currency="setCurrency($event)"
  />

  <Exchange
    :currency="currency"
    @close="clearCurrency()"
  />

  <AppFooter />
</template>

<script lang="ts">
import CurrencyList from './components/CurrencyList.vue'
import Exchange from './components/Exchange.vue'
import AppFooter from './components/AppFooter.vue'
import { getRatesEng } from './api';
import { DATA_LOADING_ERROR } from './utils/error-types';
import { defineComponent } from 'vue';
import { Currency } from './types';

type Data = {
  currencyRates: Currency[]
  error: string
  currency: Currency | null
  isLoading: boolean
}
export default defineComponent({
  name: 'App',

  components: {
    CurrencyList,
    Exchange,
    AppFooter,
  },

  data(): Data {
    return {
      currencyRates: [],
      error: null,
      currency: null,
      isLoading: true,
    }
  },

  mounted() {
    this.fetchRates();
  },


  methods: {
    setCurrency(currency: Currency) {
      this.currency = currency;
    },

    clearCurrency() {
      this.currency = null;
    },

    async fetchRates() {
      try {
        const ratesData = await getRatesEng().then(data => data?.ValCurs);
        console.log('ratesData', ratesData);

        this.currencyRates = ratesData.Valute;
      }
      catch (error) {
        this.error = DATA_LOADING_ERROR;
        console.error(error);
        throw Error('Error getting rates!');
      }
      finally {
        this.isLoading = false;
      }
    },
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
