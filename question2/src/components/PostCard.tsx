import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  Avatar, 
  Chip,
  Tooltip,
  Collapse,
  Skeleton,
  useTheme,
  styled
} from "@mui/material";
import { 
  Favorite, 
  ChatBubbleOutline, 
  Share, 
  Bookmark, 
  MoreHoriz,
  FavoriteBorder,
  BookmarkBorder,
  Verified
} from "@mui/icons-material";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

// Initialize time-ago
TimeAgo.addLocale(en);

const AnimatedCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[6],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[12]
  }
}));

const EngagementButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  }
}));

interface PostCardProps {
  title: string;
  content: string;
  imageUrl: string;
  comments: number;
  likes: number;
  shares: number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  timestamp: Date;
  tags?: string[];
  loading?: boolean;
  seoKeywords?: string[];
}

const PostCard: React.FC<PostCardProps> = ({ 
  title, 
  content, 
  imageUrl, 
  comments, 
  likes,
  shares,
  author,
  timestamp,
  tags = [],
  loading = false,
  seoKeywords = []
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleLike = () => setIsLiked(!isLiked);
  const handleSave = () => setIsSaved(!isSaved);
  const toggleExpand = () => setExpanded(!expanded);

  if (loading) {
    return (
      <Card className="mb-6 shadow-lg" sx={{ width: "100%", maxWidth: "600px", mx: "auto" }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" width="80%" height={32} />
          <Skeleton variant="text" width="60%" height={24} />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="30%" height={24} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto", my: 2 }}>
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SocialMediaPosting",
            "headline": title,
            "description": content,
            "datePublished": timestamp.toISOString(),
            "image": imageUrl,
            "author": {
              "@type": "Person",
              "name": author.name
            },
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/CommentAction",
              "userInteractionCount": comments
            },
            "keywords": seoKeywords.join(", ")
          })}
        </script>

        <Card className="border-0" sx={{ width: "100%" }}>
          {/* Author header */}
          <Box display="flex" alignItems="center" p={2}>
            <Avatar 
              src={author.avatar} 
              alt={author.name}
              sx={{ width: 42, height: 42, mr: 1.5, border: `2px solid ${theme.palette.primary.main}` }}
            />
            <Box flexGrow={1}>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" fontWeight="600">
                  {author.name}
                </Typography>
                {author.verified && (
                  <Tooltip title="Verified" arrow>
                    <Verified color="primary" sx={{ fontSize: 16, ml: 0.5 }} />
                  </Tooltip>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                <ReactTimeAgo date={timestamp} locale="en-US" />
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreHoriz />
            </IconButton>
          </Box>

          {/* Tags */}
          {tags.length > 0 && (
            <Box px={2} pb={1}>
              {tags.map(tag => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}

          {/* Content */}
          <CardContent sx={{ pt: 0, pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }} onClick={toggleExpand}>
              {title}
            </Typography>
            <Collapse in={expanded} collapsedSize={72}>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            </Collapse>
          </CardContent>

          {/* Image */}
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{
              width: "100%",
              maxHeight: { xs: 250, sm: 350, md: 400 },
              objectFit: "cover",
            }}
          />

          {/* Engagement metrics */}
          <Box display="flex" justifyContent="space-between" px={2} py={1}>
            <Typography variant="caption" color="text.secondary">
              {likes.toLocaleString()} likes • {comments.toLocaleString()} comments • {shares.toLocaleString()} shares
            </Typography>
          </Box>

          {/* Action buttons */}
          <Box display="flex" justifyContent="space-around" borderTop={`1px solid ${theme.palette.divider}`}>
            <EngagementButton onClick={handleLike}>
              {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            </EngagementButton>
            <EngagementButton>
              <ChatBubbleOutline />
            </EngagementButton>
            <EngagementButton>
              <Share />
            </EngagementButton>
            <EngagementButton sx={{ ml: 'auto' }} onClick={handleSave}>
              {isSaved ? <Bookmark color="secondary" /> : <BookmarkBorder />}
            </EngagementButton>
          </Box>
        </Card>
      </AnimatedCard>
    </Box>
  );
};

export default PostCard;
