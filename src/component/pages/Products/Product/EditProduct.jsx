import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import TextInput from "../../../Form/TextInput";
import { createProductOptions, formatErrorObject } from "../../../../helpers";
import Editor from "../../../Form/Editor";
import { useDispatch } from "react-redux";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import axiosInstance from "../../../../config/AxiosConfig";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../helpers/notificationService";
import {
  UpdateProductSchema,
  validateSchema,
} from "../../../../validation/validationSchema";
import { useTheme } from "@mui/material";
import FilledInput from "../../../Basic/FilledInput";
import BackNavigate from "../../../Basic/BackNavigate";
import SelectMultipleInput from "../../../Form/SelectMultipleInput";

function EditProduct() {
  const { id } = useParams();
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleSelectChange = (name, value) => {
    const keys = name.split(".");
    setFormData((prevData) => {
      let newData = { ...prevData };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = current[keys[i]] || {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });

    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      let current = newErrors;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = current[keys[i]] || {};
        current = current[keys[i]];
      }
      delete current[keys[keys.length - 1]];
      return newErrors;
    });
  };

  const updateProduct = async () => {
    try {
      const isValid = await validateSchema(
        UpdateProductSchema,
        formData,
        setErrors
      );
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.put(
        AxiosInstancePaths.Products.UPDATE_BY_ID + id,
        formData
      );

      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate("/products");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors));
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const fetchProductData = async () => {
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors));
      }
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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors));
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    fetchCategoryList();
    fetchProductData();
    //eslint-disable-next-line
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
              sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}
            >
              Product Details
            </Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  name={"product_name"}
                  error={errors?.product_name?.message}
                  defaultValue={formData?.product_name || product?.product_name}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <FilledInput
                  style={{ display: "flex", justifyContent: "space-between" }}
                  label={"product_code"}
                  value={product?.product_code}
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12} sm={12}>
                <SelectMultipleInput
                  name="Category"
                  startEdit={true}
                  error={errors?.category_id?.message}
                  defaultValue={formData?.category_id || product?.category_id}
                  seperatedLabel={false}
                  options={createProductOptions(categories, "category_name")}
                  handleChange={(name, value) =>
                    handleSelectChange("category_id", value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  type="number"
                  name={"quantity"}
                  error={errors?.quantity?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.quantity}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  type="number"
                  name={"price"}
                  error={errors?.price?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={handleSelectChange}
                  defaultValue={formData?.price}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold" }}
              sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}
            >
              Description
            </Typography>
            <Editor
              name={"description"}
              error={errors?.description?.message}
              defaultValue={formData?.description || product?.description}
              handleChange={handleSelectChange}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              color: theme.palette.common.white,
              width: "max-content",
              backgroundColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: theme.palette.success.main,
              },
            }}
            onClick={updateProduct}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditProduct;
