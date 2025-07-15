import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import FilledInput from "../../../Basic/FilledInput";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/slices/loadingSlice";
import { showErrorMessage } from "../../../../helpers/notificationService";
import ShowDescription from "../../../Form/ShowDescription";
import BackNavigate from "../../../Basic/BackNavigate";

function ViewCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  const fetCategoryData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Categories.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setCategory(response.data?.payload?.result);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);

      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetCategoryData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid
      container
      spacing={2}
      alignItems="stretch"
      style={{ display: "flex", justifyContent: "end" }}
    >
      <Grid
        item
        xs={12}
        sx={{
          paddingTop: {
            xs: "0.5rem !important",
            sx: "0.5rem !important",
            md: "0px !important",
          },
        }}
      >
        <BackNavigate />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardContent style={{ flex: 1 }}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold" }}
              sx={{ marginBottom: "0.5rem" }}
            >
              Category Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <FilledInput
                  label={"category_name"}
                  value={category?.category_name || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  Description
                </Typography>
                <ShowDescription description={category?.description} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ViewCategory;
