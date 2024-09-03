    import { Box } from "@mui/material";

    function ListItem({ picture, title, date }) {
      const dateObject = new Date(date);
      const monthOptions = { month: "short" };
      const dayOptions = { day: "numeric" };
      const formatMonth = dateObject.toLocaleString("en-US", monthOptions);
      const formatDay = dateObject.toLocaleString("en-US", dayOptions);

      return (
        <Box
          flexDirection="row"
          display="flex"
          width={700}
          height={60}
          sx={{
            backgroundColor: "#ffd580",
            borderStyle: "solid",
            borderColor: "#89cff0",
            boxShadow: "1px 1px 5px #dadada",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "20%",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <img
              src={picture}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              height: "100%",
              width: "65%",
              display: "flex",
              alignItems: "center",
              fontSize: "15px",
            }}
          >
            {title}
          </Box>

        </Box>
      );
    }

    export default ListItem;
