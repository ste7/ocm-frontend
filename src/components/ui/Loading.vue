<template>
  <div
    v-if="loadingStore.isLoading"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/20"
  >
    <img :src="loadingSpinner" alt="Loading" width="40" height="40" />
  </div>
</template>

<script setup lang="ts">
import loadingSpinner from '@/assets/loading-spinner.svg';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
</script>
