import { useQuery } from "react-query";
import { getTopUsers } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  LinearProgress,
  Alert,
  Tooltip,
  Divider,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";

interface User {
  id: number;
  name: string;
  avatarUrl?: string;
  postCount?: number;
  followers?: number;
  bio?: string;
  rank?: number;
}

const RankBadge = styled(Box)<{ rank: number }>(({ theme, rank }) => ({
  position: 'absolute',
  top: -10,
  right: -10,
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 
    rank === 1 ? '#FFD700' : 
    rank === 2 ? '#C0C0C0' : 
    rank === 3 ? '#CD7F32' : theme.palette.primary.main,
  color: rank <= 3 ? theme.palette.getContrastText(
    rank === 1 ? '#FFD700' : 
    rank === 2 ? '#C0C0C0' : 
    rank === 3 ? '#CD7F32' : theme.palette.primary.main
  ) : theme.palette.common.white,
  fontWeight: 'bold',
  boxShadow: theme.shadows[2],
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const UserStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
  '& > *': {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(0.5),
      fontSize: '1rem',
    },
  },
}));

const TopUsers = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useQuery<User[]>("topUsers", getTopUsers, {
    select: (users) => users.map((user, index) => ({ ...user, rank: index + 1 })),
  });

  if (isLoading) return (
    <Box sx={{ width: "100%", p: 4 }}>
      <LinearProgress />
    </Box>
  );

  if (error) return (
    <Box sx={{ p: 4 }}>
      <Alert severity="error">Error fetching top users. Please try again later.</Alert>
    </Box>
  );

  if (!data || data.length === 0) return (
    <Box sx={{ p: 4 }}>
      <Alert severity="info">No top users found.</Alert>
    </Box>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          color: theme.palette.primary.main,
        }}
      >
        <TrendingUpIcon sx={{ mr: 1, fontSize: "2rem" }} />
        <Typography variant="h4" component="h2" fontWeight="bold">
          Top Contributors
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {data.map((user) => (
          <Grid item={true} xs={12} sm={6} md={4} lg={3} key={user.id}>
            <StyledCard>
              {user.rank && <RankBadge rank={user.rank}>
                {user.rank <= 3 ? (
                  <StarIcon fontSize="small" />
                ) : (
                  <Typography variant="body2">{user.rank}</Typography>
                )}
              </RankBadge>}
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  position: 'relative',
                }}>
                  <Avatar
                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}&background=${theme.palette.primary.main.replace('#', '')}&color=fff`}
                    alt={user.name}
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      mr: 2,
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Box>
                    <Tooltip title={user.name}>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        fontWeight="bold"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '150px'
                        }}
                      >
                        {user.name}
                      </Typography>
                    </Tooltip>
                    {user.bio && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {user.bio.length > 60 ? `${user.bio.substring(0, 60)}...` : user.bio}
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <UserStats>
                  <Tooltip title="Posts">
                    <Typography variant="body2">
                      <PostAddIcon fontSize="small" />
                      {user.postCount || 0}
                    </Typography>
                  </Tooltip>
                  <Tooltip title="Followers">
                    <Typography variant="body2">
                      <PeopleAltIcon fontSize="small" />
                      {user.followers || 0}
                    </Typography>
                  </Tooltip>
                </UserStats>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopUsers;