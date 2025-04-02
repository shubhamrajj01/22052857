import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, AUTH_CONFIG } from '../config/constants';
import { Post, User, Comment } from '../models/types';

class SocialMediaAPIService {
  private static instance: SocialMediaAPIService;
  private apiClient: AxiosInstance;
  private tokenRefreshInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${AUTH_CONFIG.tokenType} ${AUTH_CONFIG.accessToken}`
      }
    });

    // Set up token refresh check (optional)
    this.setupTokenRefresh();
  }

  private setupTokenRefresh() {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = Number(AUTH_CONFIG.expiresAt) - now;
    
    if (expiresIn > 0) {
      // Refresh check 5 minutes before expiry
      const refreshTime = (expiresIn - 300) * 1000;
      
      this.tokenRefreshInterval = setTimeout(() => {
        console.warn('Token will expire soon. Implement token refresh logic if needed.');
      }, refreshTime);
    }
  }

  public static getInstance(): SocialMediaAPIService {
    if (!SocialMediaAPIService.instance) {
      SocialMediaAPIService.instance = new SocialMediaAPIService();
    }
    return SocialMediaAPIService.instance;
  }

  async fetchUsers(): Promise<User[]> {
    const response = await this.apiClient.get('/users');
    return response.data;
  }

  async fetchPosts(): Promise<Post[]> {
    const response = await this.apiClient.get('/posts');
    return response.data;
  }

  async fetchComments(postId: string): Promise<Comment[]> {
    const response = await this.apiClient.get(`/posts/${postId}/comments`);
    return response.data;
  }

  // Clean up on service destruction
  destroy() {
    if (this.tokenRefreshInterval) {
      clearTimeout(this.tokenRefreshInterval);
    }
  }
}

const apiService = SocialMediaAPIService.getInstance();
export default apiService;

// Clean up on process exit
process.on('exit', () => apiService.destroy());