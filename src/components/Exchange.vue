<template>
  <div
    class="exchange"
    :class="{ show : currency, inverted : isInvert }"
    :key="isInvert.toString()"
  >
    <button class="close" @click="close()">×</button>

    <div class="amount-in">
      <label for="amount-in">In RUB (Rubles)</label>
      <Cleave
        id="amount-in"
        v-model="amountIn"
        :options="cleave.amountIn"
        name="amount-in"
        class="input"
        ref="amountIn"
      />
    </div>

    <a class="arrows" @click="invert()">
      <img src="/arrows.svg" alt="Arrows" class="arrows-img">
    </a>

    <div class="amount-out">
      <label for="amount-out">{{ currencyCode }} ({{currencyName}})</label>
      <Cleave
        id="amount-out"
        v-model="amountOut"
        :options="cleave.amountOut"
        name="amount-in"
        class="input"
        ref="amountOut"
      />
    </div>
  </div>
</template>

<script>
import Cleave from 'vue-cleave-component';
import Big from 'big-js';
import { onClickOutside } from '@vueuse/core'

const DELAY_ANIMATION = 300;

export default {
  name : 'exchange',

  components: {
    Cleave
  },

  props: {
    currency : {
      type: Object,
    },
  },

  data() {
    return {
      amountIn : 1,
      amountOut: null,
      isInvert: false,
    }
  },

  computed : {
    currencyCode() {
      return this.currency?.CharCode;
    },

    currencyName() {
      return this.currency?.Name;
    },

    cleave() {
      let payinDecimalScale = '4';
      let payoutDecimalScale = '4';

      return {
        amountIn : {
          numeral                    : true,
          numeralPositiveOnly        : true,
          numeralThousandsGroupStyle : ',',
          numeralDecimalScale        : payinDecimalScale,
          rawValueTrimPrefix         : true,
        },
        amountOut : {
          numeral                    : true,
          numeralPositiveOnly        : true,
          numeralThousandsGroupStyle : ',',
          numeralDecimalScale        : payoutDecimalScale,
          rawValueTrimPrefix         : true,
        },
      }
    },

    rate() {
      return this.currency.Value?.replace(/,/, '.');
    },

    nominal() {
      return this.currency.Nominal?.replace(/,/, '.');
    },
  },

  mounted() {
    this.$refs.amountIn?.$el.addEventListener('keyup', () => {
      this.calcAmount('in');
    });

    this.$refs.amountOut?.$el.addEventListener('keyup', () => {
      this.calcAmount('out');
    });

    onClickOutside(this.$el, (e) => {
        const isOverlayTarget = e.target?.classList?.toString().includes('js-modal-overlay');

        if (this.currency && isOverlayTarget) {
          this.close();
        }
      },
    )
  },

  watch: {
    currency: {
      deep: true,
      handler() {
        if (this.currency) {
          this.resetForm();
          this.initForm();
        }
      },
    },
  },

  methods: {
    invert() {
      this.isInvert = !this.isInvert;
    },

    resetForm() {
      this.amountIn = 1;
      this.amountOut = null;
      this.isInvert = false;
    },

    initForm() {
      this.amountIn = this.rate;
      this.amountOut = this.nominal;
    },

    checkBase(base) {
      return base === 'in' || base === 'out';
    },

    calcAmount(base) {
      if (!this.checkBase(base) ) {
        return;
      };

      if (!this.rate) {
        return this.resetForm();
      }

      if (!this.nominal) {
        return this.resetForm();
      }

      if (base === 'in') {
        try {
          const result = new Big(+this.amountIn)
              .div(this.rate)
              .times(this.nominal);

          this.amountOut = result.toString();
        } catch (error) {
          this.resetForm();
          console.error(error);
        }
      }

      if (base === 'out') {
        try {
          const result = new Big(+this.amountOut)
              .times(this.rate)
              .div(this.nominal);

          this.amountIn = result.toString();
        } catch (error) {
          this.resetForm();
          console.error(error);
        }
      }
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/scss/_breakepoints.scss';

.exchange {
  margin-top: 20px;
  position: absolute;
  z-index: 2;
  background: #271e1d45;
  width: 326px;
  border-radius: 8px;
  padding: 16px 16px 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: grid;
  grid-template-areas: "close"
    "amount-in"
    "arrows"
    "amount-out";

  &.inverted {
    grid-template-areas: "close"
      "amount-out"
      "arrows"
      "amount-in";
  }

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

.amount-in {
  grid-area: amount-in;
  display: flex;
  flex-direction: column;

  & > label {
    margin-bottom: 4px;
  }

  & > input {
    color: rgb(255, 201, 117);
  }
}

.amount-out {
  grid-area: amount-out;
  display: flex;
  flex-direction: column;

  & > label {
    margin-bottom: 4px;
  }

  & > input {
    color: rgb(255, 201, 117);
  }
}

.arrows {
  grid-area: arrows;
  opacity: 0.6;
  width: 32px;
  height: 32px;
  display: inline-block;
  margin: 18px auto 10px;
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

.arrows-img {
  width: 32px;
  height: 32px;
  display: inline-block;
}

.close {
  grid-area: close;
  padding: 6px;
  font-size: 24px;
  line-height: 30px;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
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
