import { Grid, Skeleton } from "@mui/material";
import React from "react";

const FormLoader = React.memo(() => {
  const renderGridItems = () => {
    const numberOfItems = 12;
    return Array.from({ length: numberOfItems }, (_, index) => (
      <Grid key={index} item xs={2} sm={4} md={4}>
        <Skeleton variant="rectangular" height={50} />
      </Grid>
    ));
  };
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {renderGridItems()}
    </Grid>
  );
});

export default FormLoader;
