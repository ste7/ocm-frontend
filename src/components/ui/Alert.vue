<template>
  <div
    v-if="shouldShow"
    :class="alertClasses"
    class="text-center p-4 rounded my-2"
  >
    <p>{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLoadingStore } from '@/stores/loading';

interface AlertProps {
  active?: boolean;
  type?: 'error' | 'empty' | 'success' | 'info' | 'warning';
  message?: string;
}

const loadingStore = useLoadingStore();

const props = withDefaults(defineProps<AlertProps>(), {
  active: false,
  type: 'info',
  message: ''
});

const shouldShow = computed(() => !loadingStore.isLoading && props.active);

const alertClasses = computed(() => {
  const classes = {
    error: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700',
    info: 'bg-blue-50 text-neutral-600',
    warning: 'bg-yellow-100 text-yellow-700',
    empty: 'text-center'
  };

  return classes[props.type];
});
</script>
