import { useState, useEffect } from "react";
import { getFeed } from "../services/api";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const data = await getFeed();
      setPosts(data);
    };

    fetchInitialPosts();

    socket.on("newPost", (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    return () => {
      socket.off("newPost");
    };
  }, []);

  return (
    <Box className="p-4 w-full flex justify-center">
      <Box className="max-w-4xl w-full">
        <Typography 
          variant="h5" 
          className="font-bold mb-4 text-center md:text-left"
        >
          Live Feed
        </Typography>

        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card 
                className="shadow-md hover:shadow-lg transition-shadow" 
                sx={{ maxWidth: 400, mx: "auto" }}
              >
                <CardContent>
                  <Typography variant="h6" className="font-semibold">
                    {post.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    className="text-gray-600 mt-2"
                  >
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Feed;
