<template>
  <CurrencyList />
  <Footer />
</template>

<script>
import CurrencyList from './components/CurrencyList.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    CurrencyList,
    Footer,
  }
}
</script>

<style lang="scss" scoped>

</style>
