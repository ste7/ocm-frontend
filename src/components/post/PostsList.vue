<template>
  <div>
    <div class="mb-4">
      <div class="flex">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search posts..."
          class="flex-grow px-4 py-2 border border-neutral-400 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="handleSearchInput"
        />
      </div>
    </div>

    <Alert
      :active="!posts.data?.length"
      type="info"
      message="No posts found."
    />

    <div v-if="posts.data?.length">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PostCard v-for="post in posts.data" :key="post.id" :post="post" />
      </div>

      <div
        v-if="posts.last_page > 1"
        class="flex justify-center items-center mt-6 space-x-2"
      >
        <button
          :disabled="!posts.prev_page_url"
          class="px-3 py-1 rounded border"
          :class="
            !posts.prev_page_url
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'cursor-pointer bg-white hover:bg-gray-50'
          "
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <div class="flex space-x-1">
          <template v-for="(link, index) in posts.links" :key="index">
            <template v-if="index !== 0 && index !== posts.links.length - 1">
              <button
                class="px-3 py-1 rounded border"
                :class="
                  link.active
                    ? 'bg-blue-600 text-white'
                    : 'cursor-pointer bg-white hover:bg-gray-50'
                "
                @click="goToPage(parseInt(link.label))"
              >
                {{ link.label }}
              </button>
            </template>
          </template>
        </div>
        <button
          :disabled="!posts.next_page_url"
          class="px-3 py-1 rounded border"
          :class="
            !posts.next_page_url
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'cursor-pointer bg-white hover:bg-gray-50'
          "
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiService from '@/services/api';
import type PaginationResponse from '@/types/PaginationResponse';
import type Post from '@/types/Post';
import PostCard from '@/components/post/PostCard.vue';
import { useLoadingStore } from '@/stores/loading';
import { toast, type ToastOptions } from 'vue3-toastify';
import Alert from '../ui/Alert.vue';
import { debounce } from 'lodash-es';

const posts = ref<PaginationResponse<Post>>({
  current_page: 1,
  data: [],
  first_page_url: '',
  from: 0,
  last_page: 1,
  last_page_url: '',
  links: [],
  next_page_url: null,
  path: '',
  per_page: 0,
  prev_page_url: null,
  to: 0,
  total: 0
});

const loadingStore = useLoadingStore();
const currentPage = ref(1);
const searchQuery = ref('');

const fetchPosts = async (page = 1) => {
  try {
    loadingStore.setLoading(true);
    const response = (await apiService.getPosts(searchQuery.value, page)).data;

    posts.value = response;
    currentPage.value = posts.value.current_page;
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message ??
      'Failed to fetch posts. Please try again.';
    toast(errorMessage, {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT
    } as ToastOptions);
  } finally {
    loadingStore.setLoading(false);
  }
};

const goToPage = (page: number) => {
  fetchPosts(page);
};

const handleSearchInput = debounce(() => {
  fetchPosts(1);
}, 500);

onMounted(() => {
  fetchPosts(1);
});

defineExpose({
  fetchPosts
});
</script>
