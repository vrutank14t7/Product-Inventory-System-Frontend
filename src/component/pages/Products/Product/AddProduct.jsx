import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "../../../Form/TextInput";
import { createProductOptions, formatErrorObject } from "../../../../helpers";
import Editor from "../../../Form/Editor";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/slices/loadingSlice";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../helpers/notificationService";
import {
  ProductSchema,
  validateSchema,
} from "../../../../validation/validationSchema";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import BackNavigate from "../../../Basic/BackNavigate";
import SelectMultipleInput from "../../../Form/SelectMultipleInput";

function AddProduct() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  // const [packingData, setPackingData] = useState({ size: null, amount: null });
  const dispatch = useDispatch();
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

  const addProduct = async () => {
    try {
      const isValid = await validateSchema(ProductSchema, formData, setErrors);
      if (!isValid) {
        return;
      }

      dispatch(startLoading());

      const response = await axiosInstance.post(
        AxiosInstancePaths.Products.ADD,
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
    // eslint-disable-next-line
  }, []);

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
              style={{ fontWeight: "bold", marginBottom: "0.75rem" }}
            >
              Product Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  name={"product_name*"}
                  error={errors?.product_name?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) =>
                    handleSelectChange("product_name", value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <TextInput
                  name={"product_code*"}
                  error={errors?.product_code?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) =>
                    handleSelectChange("product_code", value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <SelectMultipleInput
                  name="Category*"
                  error={errors?.category_id?.message}
                  startEdit={true}
                  seperatedLabel={false}
                  defaultValue={formData?.category_id}
                  options={createProductOptions(categories, "category_name")}
                  handleChange={(name, value) => {
                    handleSelectChange("category_id", value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  type="number"
                  name={"price*"}
                  error={errors?.price?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) =>
                    handleSelectChange("price", value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  type="number"
                  name={"quantity*"}
                  error={errors?.quantity?.message}
                  seperatedLabel={true}
                  startEdit={true}
                  handleChange={(name, value) =>
                    handleSelectChange("quantity", value)
                  }
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
              style={{ fontWeight: "bold", marginBottom: "0.75rem" }}
            >
              Description*
            </Typography>
            <Editor
              name={"description*"}
              error={errors?.description?.message}
              defaultValue={formData?.description || ""}
              handleChange={(name, value) =>
                handleSelectChange("description", value)
              }
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
        <Button
          fullWidth
          variant="contained"
          onClick={addProduct}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Product
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
