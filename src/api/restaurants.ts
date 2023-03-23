import axios from "axios";
const BASE_URL = "http://localhost:8080";

export interface Restaurant {
  id: string;
  name: string;
  location: Location;
  image_url: string;
  review_count: number;
  rating: number;
  phone: string;
  categories: Category[];
}

interface Category {
  alias: string;
  title: string;
}

interface Location {
  address1: string;
  city: string;
  state: string;
  zip: string;
}
export type SearchRestaurantsQueryParams = {
  term: string;
  location: string;
};

export const searchRestaurants = async (
  queryParams: SearchRestaurantsQueryParams
) => {
  return axios.get<Restaurant[]>(`${BASE_URL}/api/restaurants`, {
    params: queryParams,
  });
};

export const getRestaurant = async (id: string) => {
  return axios.get<Restaurant>(`${BASE_URL}/api/restaurants/${id}`);
};
