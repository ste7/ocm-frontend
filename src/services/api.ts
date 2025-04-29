import axios, { type AxiosInstance } from 'axios';
import type Post from '@/types/Post';
import type PaginationResponse from '@/types/PaginationResponse';
import type ApiResponse from '@/types/ApiResponse';

export type PostsResponse = PaginationResponse<Post>;

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default {
  async getPosts(
    query?: string,
    page: number = 1
  ): Promise<ApiResponse<PostsResponse>> {
    return (
      await apiClient.get<ApiResponse<PostsResponse>>('/posts', {
        params: {
          query,
          page
        }
      })
    ).data;
  },

  async fetchAndStorePosts(): Promise<ApiResponse> {
    return (await apiClient.get<ApiResponse>('/posts/fetch')).data;
  }
};
