import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TextInput from "../../../Form/TextInput";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Editor from "../../../Form/Editor";
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
import { useDispatch } from "react-redux";
import {
  updateCategorySchema,
  validateSchema,
} from "../../../../validation/validationSchema";
import { formatErrorObject } from "../../../../helpers";
import { useTheme } from "@mui/material";
import BackNavigate from "../../../Basic/BackNavigate";

function EditCategory() {
  const { id } = useParams();
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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

  const updateCategory = async () => {
    try {
      const isValid = await validateSchema(
        updateCategorySchema,
        formData,
        setErrors
      );
      if (!isValid) {
        return;
      }

      dispatch(startLoading());
      const response = await axiosInstance.put(
        AxiosInstancePaths.Categories.UPDATE_BY_ID + id,
        formData
      );

      showSuccessMessage(response?.data?.message);
      dispatch(stopLoading());
      navigate("/category");
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors));
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

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
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors));
      }
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
              sx={{ marginBottom: "0.5rem", width: "100%", textAlign: "left" }}
            >
              Category Details
            </Typography>
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"category_name"}
                  startEdit={true}
                  error={errors?.category_name?.message}
                  defaultValue={
                    formData?.category_name || category?.category_name
                  }
                  handleChange={handleSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <Editor
                  name={"description"}
                  error={errors?.description?.message}
                  defaultValue={formData?.description || category?.description}
                  handleChange={handleSelectChange}
                />
              </Grid>
            </Grid>
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
            onClick={updateCategory}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditCategory;
