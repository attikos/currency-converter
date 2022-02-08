<template>
  <div class="exchange" :class="{ show : currency }">
    <button class="close" @click="close()">×</button>

    <label for="amount-in">In Rubles (RUB)</label>
    <input type="text" id="amount-in" name="amount-in" class="input" v-model="amountIn">

    <img src="/arrows.svg" alt="Arrows" class="arrows">

    <label for="amount-out">{{ currencyCode }}</label>
    <input type="text" name="amount-out" class="input" v-model="amountOut">
  </div>
</template>

<script>
export default {
  name : 'exchange',

  props: {
    currency : {
      type: Object,
    }
  },

  data() {
    return {
      amountIn : 1,
      amountOut: null
    }
  },

  computed : {
    currencyCode() {
      return this.currency?.CharCode;
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'src/scss/_breakepoints.scss';

.exchange {
  margin-top: 20px;
  position: absolute;
  background: #271e1d45;
  width: 326px;
  border-radius: 8px;
  padding: 16px 16px 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.5);

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    & {
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  @include xs() {
    border: none;
    width: calc(100% - 47px);
    margin-right: 16px;
  }

  opacity: 0;
  pointer-events: none;
  transform: scale(0.6);
  transition: 0.3s all ease-in-out;

  &.show {
    opacity: 1;
    transform: scale(1);
    pointer-events: initial;
  }
}

.arrows {
  opacity: 0.6;
  width: 32px;
  height: 32px;
  display: inline-block;
  margin: 18px auto 0;
  cursor: pointer;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: 0.2s all ease-in-out;

  &:hover {
    border: 1px solid #fff;
    opacity: 1;
  }
}

.close {
  padding: 4px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  transition: 0.3s all ease-in-out;

  &:hover {
    opacity: 0.8;
  }
}
</style>
