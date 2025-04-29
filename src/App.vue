<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Posts</h1>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        @click="fetchAndStorePosts"
      >
        Fetch and Store Posts
      </button>
    </div>
    <PostsList ref="postsListRef" />
    <Loading />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import apiService from '@/services/api';
import PostsList from '@/components/post/PostsList.vue';
import Loading from '@/components/ui/Loading.vue';
import { useLoadingStore } from '@/stores/loading';
import { toast, type ToastOptions } from 'vue3-toastify';

const loadingStore = useLoadingStore();
const postsListRef = ref<InstanceType<typeof PostsList> | null>(null);

const fetchAndStorePosts = async () => {
  try {
    loadingStore.setLoading(true);
    const { status, message } = await apiService.fetchAndStorePosts();
    toast(message, {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT
    } as ToastOptions);
    if (status === 'success') {
      postsListRef.value?.fetchPosts();
    }
  } catch (err) {
    console.error(err);
  } finally {
    loadingStore.setLoading(false);
  }
};
</script>
