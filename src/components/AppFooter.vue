<template>
  <div class="footer">
    <a
      href="https://www.cbr-xml-daily.ru/"
      target="_blank"
      rel="nofollow noreferrer noopener"
    >Currency rates API</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name : 'footer',
});
</script>

<style lang="scss">
.footer {
  margin-top: 20px;

  a {
    font-size: 13px;
    color: #e7e7e7;
  }
}
</style>
