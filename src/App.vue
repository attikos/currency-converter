<template>
  <ModalOverlay />

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

<script>
import ModalOverlay from './components/ModalOverlay.vue'
import CurrencyList from './components/CurrencyList.vue'
import Exchange from './components/Exchange.vue'
import AppFooter from './components/AppFooter.vue'
import { getRatesEng } from './api';
import { DATA_LOADING_ERROR } from './utils/error-types';

export default {
  name: 'App',

  components: {
    ModalOverlay,
    CurrencyList,
    Exchange,
    AppFooter,
  },

  data() {
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
    setCurrency(currency) {
      this.currency = currency;
    },

    clearCurrency() {
      this.currency = null;
    },

    async fetchRates() {
      try {
        this.ratesData = await getRatesEng().then(data => data.ValCurs);
        this.currencyRates = this.ratesData.Valute;
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
