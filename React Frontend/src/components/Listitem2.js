import { Box } from "@mantine/core";

function Listitem2({ picture, title, date }) {
  const dateObject = new Date(date);
  const monthOptions = { month: "short" };
  const dayOptions = { day: "numeric" };
  const formatMonth = dateObject.toLocaleString("en-US", monthOptions);
  const formatDay = dateObject.toLocaleString("en-US", dayOptions);

  return (
    <Box
      flex="column"
      style={{ backgroundColor: " #FFD580 ", borderRadius: "10px" }}
    >
      <Box style={{ height: "30%", position: "relative" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            minHeight: "200px",
            maxHeight: "200px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
          src={picture}
          alt="Event"
        />
      </Box>
      <div style={{ display: "flex" }}>
        <div style={{ right: "20px" }}>{title}</div>
        <div style={{ marginLeft: "auto" }}>
          <div
            style={{
              width: "65px",
              height: "20px",
              backgroundColor: "#f24343",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          <div
            style={{
              width: "65px",
              height: "40px",
              backgroundColor: "#d9d9d9",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            {formatMonth} {formatDay}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Listitem2;
