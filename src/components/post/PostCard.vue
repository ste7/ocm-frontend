<template>
  <div
    class="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full"
  >
    <h2 class="text-xl font-semibold text-neutral-800">{{ post.title }}</h2>
    <div class="py-2">
      <p
        class="text-gray-700 leading-relaxed line-clamp-2 h-12 overflow-hidden"
      >
        {{ post.body }}
      </p>
    </div>

    <div id="post-details" class="border-t border-gray-100 pt-2 mt-auto">
      <div class="flex flex-wrap gap-3 text-xs text-gray-500">
        <span class="flex items-center"
          >Created: {{ moment(post.created_at).format('MMM Do YY') }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import type Post from '@/types/Post';

defineProps<{
  post: Post;
}>();
</script>
