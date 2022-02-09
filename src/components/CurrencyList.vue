<template>
  <div class="currency-list-wrapper">
    <h1 class="title">Exchange rate<br>to Russian Ruble (RUB)</h1>

    <input
      class="search-input input"
      type="text"
      placeholder="Search currency"
      v-model="searchQuery"
    >

    <transition-group tag="ul" name="list" class="currency-list">
      <li
        v-for="currency in filteredList"
        :key="currency.CharCode"
        @click="setCurrency(currency)"
        class="currency-list-item"
      >
        <div class="list-code">{{ currency.CharCode }}</div>
        <div class="list-name">{{ currency.Name }}</div>
        <div class="list-rate">{{ currency.Value }}</div>
      </li>

      <li
        v-if="hasLoadMore"
        class="currency-list-item load-more"
        @click="getMoreItems()"
        key="load-more"
      >Load more ...</li>
    </transition-group>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="isNotFound" class="not-found">Not found</div>
    <div v-else-if="isLoading" class="loader">Loading...</div>
  </div>
</template>

<script>
import { fuzzySearch } from '../utils/fuzzy-search';

export default {
  name: 'CurrencyList',

  props: {
    error: {
      type: String,
    },

    currencyRates: {
      type: Array,
    },

    isLoading : {
      type: Boolean,
    }
  },

  data() {
    return {
      ratesData: {},
      page: 0,
      limit: 10,
      searchQuery: '',
    }
  },

  computed: {
    isNotFound() {
      return this.searchQuery && !this.filteredList.length;
    },

    hasLoadMore() {
      return !this.searchQuery && this.paginatedList.length < this.currencyRates.length;
    },

    filteredList() {
      if (!this.searchQuery) {
        return this.paginatedList;
      }

      return this.currencyRates.filter(cur => {
        return fuzzySearch(cur.CharCode, this.searchQuery)
          || fuzzySearch(cur.Name, this.searchQuery)
      });
    },

    paginatedList() {
      const start = 0;
      let end = this.page * this.limit + this.limit;

      if (end > this.currencyRates?.length) {
        end = this.currencyRates?.length;
      }

      return this.currencyRates?.slice(start, end) || [];
    },
  },

  methods: {
    getMoreItems() {
      this.page++;
    },

    setCurrency(currency) {
      this.$emit('set-currency', currency);
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/_breakepoints.scss';

.currency-list-wrapper {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  width: 400px;
  z-index: 2;

  @include xs() {
    border: none;
    width: 100vw;
    margin-right: 0;
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
  padding: 0 0 16px;
}

.title {
  font-weight: 400;
  font-size: 32px;
  margin: 16px;

  @include xs() {
    font-size: 24px;
  }
}

.search-input {
  margin: 0 16px 16px;
  width: calc(100% - 59px);
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
  color: #fff;
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
  border-top: none;
  border-right: none;
  border-left: none;
  transition: 0.3s background ease-in-out;

  &:last-child {
    border-color: transparent;
    border-image: none;
  }

  &:hover {
    background: rgba(0,0,0,0.3);
  }
}

.load-more {
  font-size: 14px;
  min-height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found {
  margin: 8px 16px 24px;
  text-align: center;
}

.loader {
  margin: 8px 16px 24px;
  text-align: center;
}

.error {
  font-weight: 500;
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin: 8px 16px 24px;
  text-align: left;
  border-radius: 4px;
  color: #fff;
  background: rgba(255, 0, 0, 0.4);
  border: 1px solid #f00;
  padding: 2px 8px;
}

/* Animation */
.list-item {
  display: inline-block;
  margin-right: 10px;
  max-height: 400px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  // transform: translateY(30px);
  max-height: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}
/* /Animation */
</style>
