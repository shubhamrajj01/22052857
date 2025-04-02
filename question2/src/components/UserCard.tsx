import { 
  Card, 
  CardContent, 
  Avatar, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Tooltip,
  Divider,
  Skeleton,
  useTheme,
  styled,
  Badge
} from "@mui/material";
import { 
  Verified, 
  Star, 
  MoreVert, 
  Chat, 
  Favorite, 
  Share,
  Add
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";

const AnimatedCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    '& .user-actions': {
      opacity: 1
    }
  }
}));

const RankBadge = styled(Box)(({ theme, rank }: { theme: any, rank: number }) => ({
  position: 'absolute',
  top: -12,
  left: -12,
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  color: '#fff',
  background: rank === 1 ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' :
            rank === 2 ? 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)' :
            rank === 3 ? 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)' :
            'linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)',
  boxShadow: theme.shadows[2],
  zIndex: 1
}));

interface UserCardProps {
  name: string;
  username: string;
  profileImage: string;
  postCount: number;
  engagementRate?: number;
  rank?: number;
  isVerified?: boolean;
  followers?: number;
  loading?: boolean;
  lastActive?: string;
  tags?: string[];
}

const UserCard: React.FC<UserCardProps> = ({ 
  name,
  username,
  profileImage,
  postCount,
  engagementRate = 0,
  rank,
  isVerified = false,
  followers = 0,
  loading = false,
  lastActive,
  tags = []
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ p: 2, mb: 3, borderRadius: 2, width: '100%' }}>
        <Box display="flex" gap={2}>
          <Skeleton variant="circular" width={64} height={64} />
          <Box flexGrow={1}>
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="text" width="40%" height={20} />
            <Box display="flex" gap={1} mt={1}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={60} height={24} />
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <AnimatedCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      {rank && <RankBadge theme={theme} rank={rank}>{rank}</RankBadge>}
      
      <Card sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 2,
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        border: rank === 1 ? '2px solid #FFD700' : 
               rank === 2 ? '2px solid #C0C0C0' : 
               rank === 3 ? '2px solid #CD7F32' : 'none'
      }}>
        {/* User header */}
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              engagementRate > 8 ? (
                <Tooltip title="High engagement">
                  <Star color="warning" sx={{ fontSize: { xs: 12, sm: 16 } }} />
                </Tooltip>
              ) : null
            }
          >
            <Avatar
              src={profileImage}
              alt={name}
              sx={{ 
                width: { xs: 48, sm: 64 }, 
                height: { xs: 48, sm: 64 },
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: theme.shadows[2]
              }}
            />
          </Badge>

          <Box flexGrow={1} minWidth={150}>
            <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
              <Typography variant="h6" fontWeight="700" fontSize={{ xs: 14, sm: 16, md: 18 }}>
                {name}
              </Typography>
              {isVerified && (
                <Tooltip title="Verified">
                  <Verified color="primary" sx={{ fontSize: { xs: 14, sm: 18 } }} />
                </Tooltip>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              @{username}
            </Typography>
            {lastActive && (
              <Typography variant="caption" color="text.secondary">
                Active {lastActive}
              </Typography>
            )}
          </Box>

          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        {/* Stats */}
        <Box display="flex" flexWrap="wrap" gap={1} mt={2} mb={1}>
          <Chip label={`${postCount} Posts`} size="small" icon={<Chat fontSize="small" />} />
          <Chip label={`${followers.toLocaleString()} Followers`} size="small" icon={<Favorite fontSize="small" />} />
          {engagementRate > 0 && (
            <Chip label={`${engagementRate}% ER`} size="small" color={engagementRate > 8 ? 'success' : 'default'} />
          )}
        </Box>

        {/* Tags */}
        {tags.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={1} mt={1} mb={1}>
            {tags.map(tag => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Actions */}
        <Box className="user-actions" display="flex" justifyContent="space-between">
          <Tooltip title={isFollowing ? "Unfollow" : "Follow"}>
            <IconButton size="small" onClick={() => setIsFollowing(!isFollowing)}>
              <Add fontSize="small" />
              <Typography variant="caption" ml={0.5}>
                {isFollowing ? "Following" : "Follow"}
              </Typography>
            </IconButton>
          </Tooltip>
          <Box display="flex" gap={0.5}>
            <Tooltip title="Message">
              <IconButton size="small"><Chat fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Share profile">
              <IconButton size="small"><Share fontSize="small" /></IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </AnimatedCard>
  );
};

export default UserCard;
