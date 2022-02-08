<template>
  <div class="currency-list">
    <h1 class="title">Exchange rate to ruble</h1>

    <input class="search-input" type="text" placeholder="Search currency">

    <div v-for="currency in currencyList" :key="currency.code">
      <div>{{ currency.code }}</div>
      <div>{{ currency.name }}</div>
      <div>{{ currency.rate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyList',
  data() {
    return {
      count: 0,
      currencyList : [
        {
          code: 'USA',
          name: 'USA Dollar',
          rate: 76,
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/_breakepoints.scss';

$color-text: #fff;
.currency-list {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 16px;
}

.title {
  font-weight: 400;
  font-style: italic;
  margin: 0 0 16px;
  font-size: 32px;

  @include sm() {
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

  &::placeholder {
    color: rgb(231, 231, 231);
    font-size: 16px;
  }
}
</style>
