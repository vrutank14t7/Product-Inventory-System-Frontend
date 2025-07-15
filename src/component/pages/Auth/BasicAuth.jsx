import React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
// import Logo from '../../../assets/images/logo-dark.svg';
import Logo from "../../../assets/images/1.png";
import Loading from "../Loading";

const BasicAuth = ({ page, title = "Sign in" }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.common.black,
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <Loading />
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            sx={{
              overflow: "visible",
              display: "flex",
              position: "relative",
              padding: "2rem",
              "& .MuiCardContent-root": {
                flexGrow: 1,
                flexBasis: "50%",
                width: "50%",
                padding: "0rem !important",
              },
              maxWidth: "475px",
            }}
          >
            <CardContent sx={{ padding: "0px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                  sx={{ m: 0 }}
                >
                  {title}
                </Typography>
                <Button variant="text">
                  <img alt="Auth method" width="180" height="50" src={Logo} />
                </Button>
              </div>
              <div>{page}</div>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default BasicAuth;
