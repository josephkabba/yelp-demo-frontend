import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Restaurant } from "../api/restaurants";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
}: RestaurantCardProps) => {
  const navigate = useNavigate();
  const { id, name, location, image_url, review_count, rating, phone } =
    restaurant;

  const onClick = () => {
    navigate(`/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="140" image={image_url} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location.address1}, {location.city}, {location.state}{" "}
            {location.zip}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rating} stars ({review_count} reviews)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {phone}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;
