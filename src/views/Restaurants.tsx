import { LoadingButton } from "@mui/lab";
import { Alert, Grid, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutation from "../hooks/useMutation";
import {
  Restaurant,
  SearchRestaurantsQueryParams,
  searchRestaurants,
} from "../api/restaurants";
import RestaurantCard from "../components/RestaurantCard";
import { TypeOf, object, string } from "zod";
import { Controller, useForm } from "react-hook-form";
import Message from "../components/Message";

const FormInputSchema = object({
  location: string().min(1, "Location is required"),
  term: string().min(1, "Search term is required"),
});

type FormInputData = TypeOf<typeof FormInputSchema>;

const Restaurants = (): JSX.Element => {
  const { error, isLoading, isError, data, mutate } = useMutation<
    SearchRestaurantsQueryParams,
    Restaurant[]
  >(async (data) => {
    return searchRestaurants(data);
  });

  const { handleSubmit, control } = useForm<FormInputData>({
    resolver: zodResolver(FormInputSchema),
  });

  const onSubmit = (data: FormInputData) => {
    const { location, term } = data;
    mutate({
      term: term.toLocaleLowerCase(),
      location: location.toLocaleLowerCase(),
    });
  };

  return (
    <Stack>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="center"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{ padding: 2 }}
      >
        <Controller
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <TextField
              required
              type="text"
              autoComplete="text"
              label="Enter location"
              error={Boolean(error?.message)}
              helperText={error?.message}
              name={name}
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
            />
          )}
          name="location"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        <Controller
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <TextField
              required
              type="text"
              autoComplete="text"
              label="Enter search term"
              error={Boolean(error?.message)}
              helperText={error?.message}
              name={name}
              autoFocus
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
            />
          )}
          name="term"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          id="search-button"
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

      {data != null && data.length === 0 && (
        <Message message="No restaurants found" />
      )}

      {isError && <Alert severity="error">{error?.message}</Alert>}
    </Stack>
  );
};

export default Restaurants;
