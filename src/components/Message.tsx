import { Box, Typography } from "@mui/material";

interface Props {
  message: string;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",

        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          borderRadius: 4,
          padding: 4,
          width: "25%",
          border: 1,
          borderColor: "blue",
          color: "blue",
        }}
        variant="body1"
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Message;
