import { Request, Response } from 'express';

// Example analytics data structure (you'll likely have a database or other data source)
const analyticsData = {
  pageViews: {
    '/': 100,
    '/top-users': 50,
    '/trending-posts': 75,
  },
  userActivity: {
    'user123': { posts: 10, comments: 20 },
    'user456': { posts: 5, comments: 5 },
  },
  popularPosts: [
    { id: 1, title: 'Post 1', views: 150 },
    { id: 2, title: 'Post 2', views: 120 },
  ],
};

export class AnalyticsController {
  getPageViews(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        data: analyticsData.pageViews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error fetching page views',
      });
    }
  }

  getUserActivity(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        data: analyticsData.userActivity,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error fetching user activity',
      });
    }
  }

  getPopularPosts(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        data: analyticsData.popularPosts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error fetching popular posts',
      });
    }
  }

  recordPageView(req: Request, res: Response) {
    const page = req.params.page; 

    if (analyticsData.pageViews[page]) {
      analyticsData.pageViews[page]++;
    } else {
      analyticsData.pageViews[page] = 1;
    }

    res.json({ success: true, message: `Page view recorded for ${page}` });
  }

  recordUserActivity(req: Request, res: Response) {
    const userId = req.body.userId;
    const posts = req.body.posts;
    const comments = req.body.comments;

    if (analyticsData.userActivity[userId]) {
      analyticsData.userActivity[userId].posts += posts;
      analyticsData.userActivity[userId].comments += comments;
    } else {
      analyticsData.userActivity[userId] = { posts, comments }
    }

    res.json({success: true, message: `user activity recorded for ${userId}`});
  }

}