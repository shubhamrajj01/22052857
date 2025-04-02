// analytics.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  private pageViews: Record<string, number> = {};
  private userActivity: Record<number, { posts: number; comments: number }> = {};
  private posts: { id: number; views: number }[] = [];

  async recordPageView(page: string): Promise<void> {
    this.pageViews[page] = (this.pageViews[page] || 0) + 1;
  }

  async getPageViewCounts(): Promise<Record<string, number>> {
    return this.pageViews;
  }

  async recordUserActivity(userId: number, posts: number, comments: number): Promise<void> {
    this.userActivity[userId] = {
      posts: (this.userActivity[userId]?.posts || 0) + posts,
      comments: (this.userActivity[userId]?.comments || 0) + comments,
    };
  }

  async getUserActivitySummary(): Promise<any[]> {
    return Object.entries(this.userActivity).map(([userId, activity]) => ({
      userId: parseInt(userId),
      _sum: activity,
    }));
  }

  async getPopularPosts(): Promise<any[]> {
    return this.posts.sort((a, b) => b.views - a.views).slice(0, 10);
  }

  async incrementPostViews(postId: number): Promise<void> {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.views++;
    } else {
      this.posts.push({ id: postId, views: 1 });
    }
  }

  async getPostViews(postId: number): Promise<number | null> {
    const post = this.posts.find((p) => p.id === postId);
    return post?.views || null;
  }
}