import { useQuery } from "react-query";
import { getTrendingPosts } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Alert,
  Grid,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const TrendingPosts = () => {
  const { data, isLoading, error } = useQuery("trendingPosts", getTrendingPosts);

  if (isLoading)
    return (
      <Box sx={{ width: "100%", p: 4 }}>
        <LinearProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Error fetching trending posts.</Alert>
      </Box>
    );

  if (!data || data.length === 0)
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">No trending posts found.</Alert>
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          color: (theme) => theme.palette.secondary.main,
        }}
      >
        <WhatshotIcon sx={{ mr: 1, fontSize: "2rem" }} />
        <Typography variant="h4" component="h2" fontWeight="bold">
          Hot Topics: Trending Posts
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {data.map((post: any) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {post.content?.substring(0, 150) + "..." || "No content provided"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
                  <Avatar
                    src={post.authorAvatar || `https://ui-avatars.com/api/?name=${post.author}`}
                    alt={post.author}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    By {post.author}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", mb: 2 }}>
                  {post.tags?.map((tag: string) => (
                    <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} size="small" />
                  )) || null}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Comments">
                      <IconButton aria-label="comments" size="small">
                        <CommentIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2" color="text.secondary">
                      {post.comments || 0}
                    </Typography>
                  </Box>
                  <Tooltip title="Share">
                    <IconButton aria-label="share" size="small">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingPosts;