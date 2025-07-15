import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTheme } from "@mui/material";
import { startLoading, stopLoading } from '../../redux/slices/loadingSlice';
import axiosInstance from '../../config/AxiosConfig';
import AxiosInstancePaths from '../../config/AxiosInstancePaths';
import { showErrorMessage, showSuccessMessage } from '../../helpers/notificationService';
import ImageWithPreview from '../Basic/ImagePreview';
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FileUpload from '../Form/FileUpload';
import SelectInput from '../Form/SelectInput';
import { createGeneralOptions, objectToFormData } from '../../helpers';

function AppBanners() {
    const theme = useTheme();
    const [formData, setFormData] = useState({});
    const [banner, setBanner] = useState({});
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [langCode, setLangCode] = useState("")
    const [languages, setLanguages] = useState([]);

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

    const fetchBannerData = async () => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.AppBanner.GET_BANNER, {
                params: {
                    lang_code: langCode || 'en'
                },
            }
            );
            if (response.data?.payload) {
                setBanner(response.data?.payload?.result);
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };

    const deleteBannerImage = async (src) => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.put(
                AxiosInstancePaths.AppBanner.DELETE_BANNER_IMAGE_BY_ID + banner?._id, {},
                {
                    params: {
                        lang_code: langCode || 'en',
                        payload: JSON.stringify({ src })
                    },
                }
            );
            showSuccessMessage(response?.data?.message);
            dispatch(stopLoading());
            fetchBannerData();
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }

    const deleteBottomImage = async (src) => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.put(
                AxiosInstancePaths.AppBanner.DELETE_BOTTOM_BANNER_IMAGE_BY_ID + banner?._id, {},
                {
                    params: {
                        lang_code: langCode || 'en',
                        payload: JSON.stringify({ src })
                    },
                }
            );
            showSuccessMessage(response?.data?.message);
            dispatch(stopLoading());
            fetchBannerData();
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    }

    // const handleRemoveImages = (index) => {
    //     const files = formData?.images || []
    //     const removedfiles = files.filter((_, i) => i !== index)
    //     handleSelectChange("images", removedfiles);
    // };

    const fetchLanguageData = async () => {
        try {
            dispatch(startLoading());
            const response = await axiosInstance.get(
                AxiosInstancePaths.Languages.GET_LIST
            );
            if (response.data?.payload) {
                setLanguages(response.data?.payload?.result?.data);
                setLangCode(response.data?.payload?.result?.data[0]?.lang_code)
            }
            dispatch(stopLoading());
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };
    const addBanner = async () => {
        try {

            if ((!formData?.images || formData.images.length === 0) && (!formData?.banners || formData.banners.length === 0)) {
                showErrorMessage("Select Images or Banners First");
                return;
            }
            // banners

            dispatch(startLoading());
            const newFormData = new FormData();
            let documents = {}
            let tempFormData = { ...formData };
            if (formData?.images) {
                documents.images = formData.images
                delete tempFormData.images
            }
            if (formData?.banners) {
                documents.banners = formData.banners
                delete tempFormData.banners
            }
            objectToFormData(newFormData, documents);
            const response = await axiosInstance.put(
                AxiosInstancePaths.AppBanner.UPDATE_BANNER_BY_ID + banner?._id,
                newFormData, {
                params: {
                    lang_code: langCode || 'en',
                },
            }
            );
            showSuccessMessage(response?.data?.message);
            dispatch(stopLoading());
            window.location.reload();
        } catch (error) {
            console.log(error);
            showErrorMessage(error?.response?.data?.message);
            dispatch(stopLoading());
        }
    };

    useEffect(() => {
        fetchLanguageData()
        fetchBannerData()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchBannerData()
        // eslint-disable-next-line
    }, [langCode]);

    return (
        <Grid container spacing={2} alignItems="stretch">
            {banner?.images?.length > 0 ?
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
                                Banner Images
                            </Typography>
                            <div style={{ display: 'flex', overflow: 'auto', gap: '0.5rem' }}>
                                {banner?.images?.map((image, imageIndex) => (
                                    <ImageWithPreview
                                        key={imageIndex}
                                        src={AxiosInstancePaths.base_url + image}
                                        deletePath={image}
                                        deleteImage={deleteBannerImage}
                                        isDeletable={true}
                                        alt="User Profile"
                                        height="200px"
                                        width="200px"
                                    />
                                ))}

                                {/* {formData?.images?.map((image, imageIndex) => (
                                    <ImageWithPreview
                                        key={imageIndex}
                                        src={URL.createObjectURL(image)}
                                        deletePath={image}
                                        deleteImage={() => handleRemoveImages(imageIndex)}
                                        isDeletable={true}
                                        alt="User Profile"
                                        height="200px"
                                        width="200px"
                                    />
                                ))} */}
                            </div>
                        </CardContent>
                    </Card>
                </Grid> : ""}
            {banner?.banners?.length > 0 ?
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
                                Bottom Image
                            </Typography>
                            <div style={{ display: 'flex', overflow: 'auto', gap: '0.5rem' }}>
                                {banner?.banners?.map((image, imageIndex) => (
                                    <ImageWithPreview
                                        key={imageIndex}
                                        src={AxiosInstancePaths.base_url + image}
                                        deletePath={image}
                                        deleteImage={deleteBottomImage}
                                        isDeletable={true}
                                        alt="User Profile"
                                        height="200px"
                                        width="200px"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Grid> : ""}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: '0.75rem' }}>
                            Add New Banner
                        </Typography>
                        <Grid container spacing={2} alignItems="stretch">
                            <Grid item xs={12} md={6} lg={4}>
                                <FileUpload
                                    multiple={true}
                                    inputName="images*"
                                    error={errors?.images?.message}
                                    defaultFiles={formData?.images}
                                    handleChange={(name, value) => handleSelectChange('images', value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FileUpload
                                    inputName="banner*"
                                    error={errors?.banners?.message}
                                    defaultFiles={formData?.banners}
                                    handleChange={(name, value) => handleSelectChange('banners', value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <SelectInput
                                    name="language"
                                    startEdit={true}
                                    seperatedLabel={false}
                                    defaultValue={langCode}
                                    options={createGeneralOptions(languages, "lang_name", "lang_code")}
                                    handleChange={(name, value) => setLangCode(value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={1} style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            color: theme.palette.common.white,
                                            width: "max-content",
                                            backgroundColor: theme.palette.warning.main,
                                            "&:hover": {
                                                backgroundColor: theme.palette.warning.main,
                                            },
                                        }}
                                        onClick={addBanner}
                                    >
                                        Add Banner
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default AppBanners
