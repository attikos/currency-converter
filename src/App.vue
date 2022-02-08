<template>
  <CurrencyList
    :error="error"
    :currency-list="currencyList"
    :is-loading="isLoading"
    @set-currency="setCurrency($event)"
  />

  <Exchange :currency="currency" @close="clearCurrency()"/>

  <AppFooter />
</template>

<script>
import CurrencyList from './components/CurrencyList.vue'
import Exchange from './components/Exchange.vue'
import AppFooter from './components/AppFooter.vue'
import { getRatesEng } from './api';
import { DATA_LOADING_ERROR } from './utils/error-types';

export default {
  name: 'App',

  components: {
    CurrencyList,
    Exchange,
    AppFooter,
  },

  data() {
    return {
      currencyList: [],
      error: null,
      currency: null,
      isLoading: true,
    }
  },

  mounted() {
    this.fetchRates();
  },

  methods: {
    setCurrency(currency) {
      this.currency = currency;
    },

    clearCurrency() {
      this.currency = null;
    },

    async fetchRates() {
      try {
        this.ratesData = await getRatesEng().then(data => data.ValCurs);

        const currencyHash = this.ratesData.Valute;
        this.currencyList = Object.keys(currencyHash).map(code => currencyHash[code]);
      }
      catch (error) {
        this.error = DATA_LOADING_ERROR;
        throw Error('Error getting rates!');
      }
      finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
