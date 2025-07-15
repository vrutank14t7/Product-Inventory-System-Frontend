import React, { useState } from "react";
import TextInput from "../../../Form/TextInput";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

import Editor from "../../../Form/Editor";
import { useDispatch } from "react-redux";
import {
  CategorySchema,
  validateSchema,
} from "../../../../validation/validationSchema";
import { formatErrorObject } from "../../../../helpers";
import {
  startLoading,
  stopLoading,
} from "../../../../redux/slices/loadingSlice";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../../helpers/notificationService";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../../config/AxiosInstancePaths";

import { useTheme } from "@mui/material";

import BackNavigate from "../../../Basic/BackNavigate";

function AddCategory() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const addCategory = async () => {
    try {
      const isValid = await validateSchema(CategorySchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Categories.ADD,
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
              style={{ fontWeight: "bold", marginBottom: "0.75rem" }}
            >
              Category Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6} sm={12}>
                <TextInput
                  name={"category_name*"}
                  error={errors?.category_name?.message}
                  startEdit={true}
                  handleChange={(name, value) =>
                    handleSelectChange("category_name", value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sm={12}>
                <Editor
                  name={"description*"}
                  error={errors?.description?.message}
                  defaultValue={formData?.description || ""}
                  handleChange={(name, value) =>
                    handleSelectChange("description", value)
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} display="flex" gap={"1rem"} justifyContent="end">
        <Button
          fullWidth
          variant="contained"
          onClick={addCategory}
          sx={{
            color: theme.palette.common.white,
            width: "max-content",
            backgroundColor: theme.palette.success.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
            },
          }}
        >
          Add Category
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddCategory;
