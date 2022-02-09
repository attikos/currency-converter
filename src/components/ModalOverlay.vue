<template>
    <div class="modal-overlay js-modal-overlay"></div>
</template>

<script>
export default {
    name : 'modal-overlay',
};
</script>

<style lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
}
</style>
