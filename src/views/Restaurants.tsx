import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Divider,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useMutation from "../hooks/useMutation";
import {
  Restaurant,
  SearchRestaurantsQueryParams,
  searchRestaurants,
} from "../api/restaurants";
import { useGeolocated } from "react-geolocated";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

const Restaurants = () => {
  const { error, isLoading, isError, data, mutate } = useMutation<
    SearchRestaurantsQueryParams,
    Restaurant[]
  >(async (data) => {
    return searchRestaurants(data);
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const setText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const onclick = () => {
    if (!isGeolocationEnabled) {
      getPosition();
      return;
    }

    mutate({ term: searchTerm, location: "new york" });
  };

  useEffect(() => {
    if (!isGeolocationEnabled) {
      getPosition();
    }
  }, []);

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ padding: 2 }}
      >
        <TextField
          label="Search..."
          onChange={setText}
          id="search"
          variant="outlined"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={onclick}
          startIcon={<SearchIcon />}
        >
          Search
        </LoadingButton>
      </Stack>

      {data != null && data.length !== 0 && (
        <div>
          <Typography variant="h4" sx={{ paddingLeft: 2 }} gutterBottom>
            Results
          </Typography>
          <hr />
        </div>
      )}

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ padding: 2 }}
      >
        {data?.map((restaurant) => (
          <Grid item key={restaurant.id} xs={12} sm={6} md={4} lg={3}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!isGeolocationEnabled}
      >
        <Alert severity="error">
          <AlertTitle>Location required</AlertTitle>
          This application requires user <strong>location</strong>
        </Alert>
      </Snackbar>

      {isError && <Alert severity="error">{error?.message}</Alert>}
    </Stack>
  );
};

export default Restaurants;
