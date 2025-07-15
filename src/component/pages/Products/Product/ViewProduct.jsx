import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import FilledInput from "../../../Basic/FilledInput";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../config/AxiosConfig";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/slices/loadingSlice";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import { showErrorMessage } from "../../../../helpers/notificationService";
import ShowDescription from "../../../Form/ShowDescription";
import BackNavigate from "../../../Basic/BackNavigate";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const fetProductData = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Products.GET_BY_ID + id
      );
      if (response.data?.payload) {
        setProduct(response.data?.payload?.result);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchCategoryList = async () => {
    try {
      dispatch(startLoading());
      const response = await axiosInstance.get(
        AxiosInstancePaths.Categories.GET_LIST
      );
      if (response.data?.payload) {
        setCategories(response.data?.payload?.result?.data);
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchCategoryList();
    fetProductData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <Grid container spacing={2} alignItems="stretch">
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
              Product Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <FilledInput
                  label={"product_name"}
                  value={product?.product_name || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <FilledInput
                  label={"product_code"}
                  value={product?.product_code || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FilledInput
                  label={"category_name"}
                  value={
                    categories.find((item) => item._id === product?.category_id)
                      ?.category_name
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"price"}
                  value={product?.price || "Not Added"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FilledInput
                  label={"quantity"}
                  value={product?.quantity?.toString()}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Typography
            variant="h4"
            style={{ fontWeight: "bold" }}
            sx={{ marginBottom: "1rem" }}
          >
            Description
          </Typography>
          <ShowDescription description={product?.description} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ViewProduct;
