import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import useQuery from "../hooks/useQuery";
import { Restaurant, getRestaurant } from "../api/restaurants";
import { useParams } from "react-router-dom";
import Message from "../components/Message";

const RestaurantDetail = (): JSX.Element => {
  let { restaurantId } = useParams();
  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useQuery<Restaurant>(() => {
    return getRestaurant(restaurantId || "");
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Message message={error?.message || ""} />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{restaurant?.name}</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <img
          src={restaurant?.image_url}
          alt={restaurant?.name}
          style={{ maxWidth: "100%" }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="body1">{`${restaurant?.review_count} Reviews`}</Typography>
        <Typography variant="body1">{`Rating: ${restaurant?.rating}`}</Typography>
        <Typography variant="body1">{`Phone: ${restaurant?.phone}`}</Typography>
        <Typography variant="h5">Categories:</Typography>
        <ul>
          {restaurant?.categories.map((category) => (
            <li key={category.alias}>
              <Typography variant="body1">{category.title}</Typography>
            </li>
          ))}
        </ul>
        <Typography variant="h5">Location:</Typography>
        <Typography variant="body1">{restaurant?.location.address1}</Typography>
        <Typography variant="body1">{`${restaurant?.location.city}, ${restaurant?.location.state} ${restaurant?.location.zip}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default RestaurantDetail;
