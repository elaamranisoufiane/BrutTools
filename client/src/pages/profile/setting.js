import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Setting() {
    const [ReplicateApi, setReplicateApi] = useState('');
    const [paymentGatewayAPI, setpaymentGatewayAPI] = useState('');
    const [WATERMARK, setWATERMARK] = useState('');
    const [WATERMARK_POS_X, setWATERMARK_POS_X] = useState(null);
    const [WATERMARK_POS_Y, setWATERMARK_POS_Y] = useState(null);
    const [WATERMARK_POS_X2, setWATERMARK_POS_X2] = useState(null);
    const [WATERMARK_POS_Y2, setWATERMARK_POS_Y2] = useState(null);
    const [WATERMARK_POS_X3, setWATERMARK_POS_X3] = useState(null);
    const [WATERMARK_POS_Y3, setWATERMARK_POS_Y3] = useState(null);
    const [WATERMARK_SIZE, setWATERMARK_SIZE] = useState(null);

    const [UPSACALE_PHOTO_GUEST, setUPSACALE_PHOTO_GUEST] = useState(null);
    const [Background_General_PHOTO_GUEST, setBackground_General_PHOTO_GUEST] = useState(null);
    const [Image_Generator_PHOTO_GUEST, setImage_Generator_PHOTO_GUEST] = useState(null);
    const [OUTPUT_IMAGE_GUEST, setOUTPUT_IMAGE_GUEST] = useState('');

    const [loading, setLoading] = useState(false);
    const [LoadingpaymentGatewayAPI, setLoadingpaymentGatewayAPI] = useState(false);
    const [loadingW, setLoadingW] = useState(false);
    const [loadingWs, setLoadingWs] = useState(false);
    const [LoadingWPosX, setLoadingWPosX] = useState(false);
    const [LoadingWPosY, setLoadingWPosY] = useState(false);
    const [LoadingUPSACALE_PHOTO_GUEST, setLoadingUPSACALE_PHOTO_GUEST] = useState(false);
    const [LoadingBackground_General_PHOTO_GUEST, setLoadingBackground_General_PHOTO_GUEST] = useState(false);
    const [LoadingImage_Generator_PHOTO_GUEST, setLoadingImage_Generator_PHOTO_GUEST] = useState(false);
    const [LoadingOUTPUT_IMAGE_GUEST, setLoadingOUTPUT_IMAGE_GUEST] = useState(false);

    //const { id } = useParams();

    //fill in the inputs 
    useEffect(() => {
        axios.get('/getSettings')
            .then(response => {
                setReplicateApi(response.data.replicate_key);
                setpaymentGatewayAPI(response.data.stripe_api);
                setWATERMARK(response.data.watermark_text);
                setWATERMARK_POS_X(response.data.watermark_position_x);
                setWATERMARK_POS_Y(response.data.watermark_position_y);
                setWATERMARK_POS_X2(response.data.watermark_position_x2);
                setWATERMARK_POS_Y2(response.data.watermark_position_y2);
                setWATERMARK_POS_X3(response.data.watermark_position_x3);
                setWATERMARK_POS_Y3(response.data.watermark_position_y3);
                setUPSACALE_PHOTO_GUEST(response.data.upscale_scale_guest);
                setOUTPUT_IMAGE_GUEST(response.data.output_image_guest);
                setWATERMARK_SIZE(response.data.watermark_size);
                setBackground_General_PHOTO_GUEST(response.data.nbre_bk_image_guest);
                setImage_Generator_PHOTO_GUEST(response.data.nbre_ia_image_guest);
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });

    }, []);


    const [replicateApiKeyError, setReplicateApiKeyError] = useState("");
    const [replicateApiKeySuccess, setReplicateApiKeySuccess] = useState("");

    const [paymentGatewayAPIKeyError, setpaymentGatewayAPIKeyError] = useState("");
    const [paymentGatewayAPIKeySuccess, setpaymentGatewayAPIKeySuccess] = useState("");

    const [WATERMARKError, setWATERMARKError] = useState("");
    const [WATERMARKSuccess, setWATERMARKSuccess] = useState("");
    const [WATERMARK_POS_XError, setWATERMARK_POS_XError] = useState("");
    const [WATERMARK_POS_XSuccess, setWATERMARK_POS_XSuccess] = useState("");
    const [WATERMARK_POS_YError, setWATERMARK_POS_YError] = useState("");
    const [WATERMARK_POS_YSuccess, setWATERMARK_POS_YSuccess] = useState("");
    const [WATERMARK_SIZE_YError, setWATERMARK_SIZE_YError] = useState("");
    const [WATERMARK_SIZE_YSuccess, setWATERMARK_SIZE_YSuccess] = useState("");
    const [OUTPUT_IMAGE_GUESTError, setOUTPUT_IMAGE_GUESTError] = useState("");
    const [OUTPUT_IMAGE_GUESTSuccess, setOUTPUT_IMAGE_GUESTSuccess] = useState("");
    // const [MonthPlansError, setMonthPlansError] = useState("");
    // const [MonthPlansSuccess, setMonthPlansSuccess] = useState("");
    // const [credistPlansError, setCreditsPlansError] = useState("");
    // const [credistPlansSuccess, setCreditsPansSuccess] = useState("");


    const [UPSACALE_PHOTO_GUESTError, setUPSACALE_PHOTO_GUESTError] = useState("");
    const [UPSACALE_PHOTO_GUESTSuccess, setUPSACALE_PHOTO_GUESTSuccess] = useState("");

    const [Background_General_PHOTO_GUESTError, setBackground_General_PHOTO_GUESTError] = useState("");
    const [Background_General_PHOTO_GUESTSuccess, setBackground_General_PHOTO_GUESTSuccess] = useState("");

    const [Image_Generator_PHOTO_GUESTError, setImage_Generator_PHOTO_GUESTError] = useState("");
    const [Image_Generator_PHOTO_GUESTSuccess, setImage_Generator_PHOTO_GUESTSuccess] = useState("");


    const validateFormReplicate = () => {
        let isValid = true;
        if (!ReplicateApi.trim()) {
            setReplicateApiKeySuccess("");
            setReplicateApiKeyError("Replicate API key is required.");
            isValid = false;
        } else {
            setReplicateApiKeyError("");

        }
        return isValid;
    };

    // const verifyApiKey = async () => {
    //     try {
    //         const response = await axios.post('/api/verify-stripe-api-key', { apiKey: paymentGatewayAPI });
    //         return response.data.valid;
    //     } catch (error) {
    //         console.error('Error verifying Stripe API key:', error);
    //         return false;
    //     }
    // };

    const validateFormPaymentGatewayAPI = async () => {
        let isValid = true;
        if (!paymentGatewayAPI.trim()) {
            setpaymentGatewayAPIKeySuccess("");
            setpaymentGatewayAPIKeyError("The payment gateway API key is required.");
            isValid = false;
        } else {
            // const isApiKeyValid = await verifyApiKey();
            // if (!isApiKeyValid) {
            setpaymentGatewayAPIKeySuccess("");
            //setpaymentGatewayAPIKeyError("The payment gateway API key provided is not valid.");
            isValid = false;

            // } else {
            //     setpaymentGatewayAPIKeyError("");
            // }
        }
        return isValid;
    };

    const validateFormWatermark = () => {
        let isValid = true;
        if (!WATERMARK.trim()) {
            setWATERMARKSuccess("");
            setWATERMARKError("The watermark text is required.");
            isValid = false;
        } else {
            setWATERMARKError("");
        }
        return isValid;
    };

    const validateFormWatermarkSize = () => {
        let isValid = true;
        if (WATERMARK_SIZE == 0) {
            setWATERMARK_SIZE_YSuccess("");
            setWATERMARK_SIZE_YError("The watermark size is required.");
            isValid = false;
        } else {
            setWATERMARK_SIZE_YError("");
        }
        return isValid;
    };

    const validateFormWatermarkPosX = () => {
        let isValid = true;
        if (!WATERMARK_POS_X && !WATERMARK_POS_X2 && !WATERMARK_POS_X3) {
            if (WATERMARK_POS_X == 0 || WATERMARK_POS_X2 == 0 || WATERMARK_POS_X3 == 0) {
                setWATERMARK_POS_XSuccess("");
                setWATERMARK_POS_XError("The watermark position X coordinate is required.");
                isValid = false;
            } else {
                setWATERMARK_POS_XError("");
            }
        } else {
            setWATERMARK_POS_XError("");
        }
        return isValid;
    };

    const validateFormWatermarkPosY = () => {
        let isValid = true;
        if (!WATERMARK_POS_Y || !WATERMARK_POS_Y2 || !WATERMARK_POS_Y3) {
            if (WATERMARK_POS_Y == 0 && WATERMARK_POS_Y2 == 0 && WATERMARK_POS_Y3 == 0) {
                setWATERMARK_POS_YSuccess("");
                setWATERMARK_POS_YError("The watermark position Y coordinate is required.");
                isValid = false;
            } else {
                setWATERMARK_POS_YError("");
            }
        } else {
            setWATERMARK_POS_YError("");

        }
        return isValid;
    };


    const validateFormUPSACALE_PHOTO_GUEST = () => {
        let isValid = true;
        if (UPSACALE_PHOTO_GUEST == null || UPSACALE_PHOTO_GUEST < 2 || UPSACALE_PHOTO_GUEST > 10) {
            if (UPSACALE_PHOTO_GUEST < 2 || UPSACALE_PHOTO_GUEST > 10) {
                setUPSACALE_PHOTO_GUESTSuccess("");
                setUPSACALE_PHOTO_GUESTError("The scale of upscale photo guests should be between 2 and 10.");
            } else {
                setUPSACALE_PHOTO_GUESTSuccess("");
                setUPSACALE_PHOTO_GUESTError("The Upscale Photo text is required");
            }
            isValid = false;
        } else {
            setUPSACALE_PHOTO_GUESTError("");
        }
        return isValid;
    };

    const validateFormBackground_General_PHOTO_GUEST = () => {
        let isValid = true;
        if (Background_General_PHOTO_GUEST == null || Background_General_PHOTO_GUEST < 1 || Background_General_PHOTO_GUEST > 4) {
            if (Background_General_PHOTO_GUEST < 1 || Background_General_PHOTO_GUEST > 4) {
                setBackground_General_PHOTO_GUESTSuccess("");
                setBackground_General_PHOTO_GUESTError("The number of background general photo guests should be between 1 and 4.");
            } else {
                setBackground_General_PHOTO_GUESTSuccess("");
                setBackground_General_PHOTO_GUESTError("The background generale Photo number is required");
            }
            isValid = false;
        } else {
            setBackground_General_PHOTO_GUESTError("");
        }
        return isValid;
    };
    const validateFormImage_Generator_PHOTO_GUEST = () => {
        let isValid = true;
        if (Image_Generator_PHOTO_GUEST == null || Image_Generator_PHOTO_GUEST < 1 || Image_Generator_PHOTO_GUEST > 4) {
            if (Image_Generator_PHOTO_GUEST < 1 || Image_Generator_PHOTO_GUEST > 4) {
                setImage_Generator_PHOTO_GUESTSuccess("");
                setImage_Generator_PHOTO_GUESTError("The number of IA image general photo guests should be between 1 and 4.");
            } else {
                setImage_Generator_PHOTO_GUESTSuccess("");
                setImage_Generator_PHOTO_GUESTError("The IA image general Photo number is required");
            }
            isValid = false;
        } else {
            setImage_Generator_PHOTO_GUESTError("");
        }
        return isValid;
    };

    const validateFormOUTPUT_IMAGE_GUEST = () => {
        let isValid = true;
        if (!OUTPUT_IMAGE_GUEST.trim()) {
            setOUTPUT_IMAGE_GUESTError("");
            setOUTPUT_IMAGE_GUESTError("The Output Image Guests field is required.");
            isValid = false;
        } else {
            setOUTPUT_IMAGE_GUESTError("");
        }
        return isValid;
    };



    const changeReplicateApi = () => {
        if (validateFormReplicate()) {
            setLoading(true);
            axios({
                method: "post",
                data: {
                    token: ReplicateApi,
                },
                withCredentials: true,
                url: "/changeReplicate"
            })
                .then(response => {
                    setReplicateApiKeySuccess("The Replicate API Key has been successfully updated.");
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoading(false);
                });
        }
    }

    const changepaymentGatewayAPI = () => {
        if (validateFormPaymentGatewayAPI()) {
            setLoadingpaymentGatewayAPI(true);
            axios({
                method: "post",
                data: {
                    token: paymentGatewayAPI,
                },
                withCredentials: true,
                url: "/paymentGatewayAPI"
                // url: "/changeStripe"
            })
                .then(response => {
                    setpaymentGatewayAPIKeyError("");
                    setpaymentGatewayAPIKeySuccess("The payment gateway API Key has been successfully updated");
                    setLoadingpaymentGatewayAPI(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingpaymentGatewayAPI(false);
                });
        }
    }

    const changeWatermarkText = () => {
        if (validateFormWatermark()) {
            setLoadingW(true);
            axios({
                method: "post",
                data: {
                    watermarktest: WATERMARK,
                },
                withCredentials: true,
                url: "/changeWatermark"
            })
                .then(response => {
                    setWATERMARKSuccess("The watermark text has been successfully updated.");
                    setLoadingW(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingW(false);
                });
        }
    }

    const changeWatermarkSize = () => {
        if (validateFormWatermarkSize()) {
            setLoadingWs(true);
            axios({
                method: "post",
                data: {
                    watermark_size: WATERMARK_SIZE,
                },
                withCredentials: true,
                url: "/changeWaterMarkSize"
            })
                .then(response => {
                    setWATERMARK_SIZE_YSuccess("The watermark size has been successfully updated.");
                    setLoadingWs(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingWs(false);
                });
        }
    }

    const changeWatermarkPosX = () => {
        if (validateFormWatermarkPosX()) {
            setLoadingWPosX(true);
            axios({
                method: "post",
                data: {
                    watermarkPosX: WATERMARK_POS_X,
                    watermarkPosX2: WATERMARK_POS_X2,
                    watermarkPosX3: WATERMARK_POS_X3
                },
                withCredentials: true,
                url: "/changeWatermarkPosX"
            })
                .then(response => {
                    setWATERMARK_POS_XSuccess("The watermark position X coordinate has been successfully updated.");
                    setLoadingWPosX(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingWPosX(false);
                });
        }
    }
    const changeWatermarkPosY = () => {
        if (validateFormWatermarkPosY()) {
            setLoadingWPosY(true);
            axios({
                method: "post",
                data: {
                    watermarkPosY: WATERMARK_POS_Y,
                    watermarkPosY2: WATERMARK_POS_Y2,
                    watermarkPosY3: WATERMARK_POS_Y3,

                },
                withCredentials: true,
                url: "/changeWatermarkPosY"
            })
                .then(response => {
                    setWATERMARK_POS_YSuccess("The watermark position Y coordinate has been successfully updated.");
                    setLoadingWPosY(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingWPosY(false);
                });
        }
    }

    const changeUPSACALE_PHOTO_GUEST = () => {
        if (validateFormUPSACALE_PHOTO_GUEST()) {
            setLoadingUPSACALE_PHOTO_GUEST(true);
            axios({
                method: "post",
                data: {
                    upsacalePhotoSacaleGuest: UPSACALE_PHOTO_GUEST,
                },
                withCredentials: true,
                url: "/changeUpscalePhotoGuest"
            })
                .then(response => {
                    setUPSACALE_PHOTO_GUESTSuccess("The upscale photo guest setting has been successfully updated.");
                    setLoadingUPSACALE_PHOTO_GUEST(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingUPSACALE_PHOTO_GUEST(false);
                });
        }
    }


    const changeBackground_General_PHOTO_GUEST = () => {
        if (validateFormBackground_General_PHOTO_GUEST()) {
            setLoadingBackground_General_PHOTO_GUEST(true);
            axios({
                method: "post",
                data: {
                    Background_General_PHOTO_GUEST: Background_General_PHOTO_GUEST,
                },
                withCredentials: true,
                url: "/changeBackgroundgeneralPhotoGuest"
            })
                .then(response => {
                    setBackground_General_PHOTO_GUESTSuccess("The background general photo guest setting has been successfully updated.");
                    setLoadingBackground_General_PHOTO_GUEST(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingBackground_General_PHOTO_GUEST(false);
                });
        }
    }

    const changeImage_Generator_PHOTO_GUEST = () => {
        if (validateFormImage_Generator_PHOTO_GUEST()) {
            setLoadingImage_Generator_PHOTO_GUEST(true);
            axios({
                method: "post",
                data: {
                    Image_Generator_PHOTO_GUEST: Image_Generator_PHOTO_GUEST,
                },
                withCredentials: true,
                url: "/changeiaimagegeneralPhotoGuest"
            })
                .then(response => {
                    setImage_Generator_PHOTO_GUESTSuccess("The IA image general photo guest setting has been successfully updated.");
                    setLoadingImage_Generator_PHOTO_GUEST(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingImage_Generator_PHOTO_GUEST(false);
                });
        }
    }


    const changeOUTPUT_IMAGE_GUEST = () => {
        if (validateFormOUTPUT_IMAGE_GUEST()) {
            setLoadingOUTPUT_IMAGE_GUEST(true);
            axios({
                method: "post",
                data: {
                    outputImageGuest: OUTPUT_IMAGE_GUEST,
                },
                withCredentials: true,
                url: "/changeOutputImageGuest"
            })
                .then(response => {
                    setOUTPUT_IMAGE_GUESTSuccess("Upscale photo guests setting has been successfully updated");
                    setLoadingOUTPUT_IMAGE_GUEST(false);
                })
                .catch(error => {
                    console.error("Edit failed:", error);
                    setLoadingOUTPUT_IMAGE_GUEST(false);
                });
        }
    }

    //menu 
    const [replicateApiOpen, setReplicateApiMenuOpen] = useState(true);
    const [paymentGatewayAPIOpen, setpaymentGatewayAPIMenuOpen] = useState(false);
    const [watermarkTextOpen, setWatermarkTextMenuOpen] = useState(false);
    const [watermarkPositionOpen, setWatermarkPositionMenuOpen] = useState(false);
    const [upscaleOpen, setUpscaleMenuOpen] = useState(false);

    // const [monthPlansOpen, setMonthPlansOpen] = useState(false);
    // const [credistPlansOpen, setCredistPlansOpen] = useState(false);

    const resetAllSubMenus = () => {
        setReplicateApiMenuOpen(null);
        setpaymentGatewayAPIMenuOpen(null);
        setWatermarkTextMenuOpen(null);
        setWatermarkPositionMenuOpen(null);
        setUpscaleMenuOpen(null);
        // setCredistPlansOpen(false);
        // setMonthPlansOpen(false);

        setReplicateApiKeyError(false);
        setReplicateApiKeySuccess(false);
        setpaymentGatewayAPIKeyError(false);
        setpaymentGatewayAPIKeySuccess(false);
        setWATERMARKError(false);
        setWATERMARKSuccess(false);
        setWATERMARK_POS_XError(false);
        setWATERMARK_POS_YError(false);
        setWATERMARK_POS_XSuccess(false);
        setWATERMARK_POS_YSuccess(false);
        setUPSACALE_PHOTO_GUESTError(false);
        setUPSACALE_PHOTO_GUESTSuccess(false);
        setWATERMARK_SIZE_YError(false);
        setWATERMARK_SIZE_YSuccess(false);

        // setMonthPlansError(false);
        // setMonthPlansSuccess(false);
        // setCreditsPlansError(false);
        // setCreditsPansSuccess(false);

    };

    // const [monthPlans, setMonthPlans] = useState(null);
    // const [creditsPlans, setCreditsPlans] = useState(null);
    //get plans from db 
    // const getMonthPlans = async () => {
    //     try {
    //         const response = await axios.get(`/getMonthPlans`, {
    //             withCredentials: true,
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching users:", error);
    //         return [];
    //     }
    // };

    // const getCreditsPlans = async () => {
    //     try {
    //         const response = await axios.get(`/getCreditsPlans`, {
    //             withCredentials: true,
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching users:", error);
    //         return [];
    //     }
    // };
    // useEffect(() => {
    //     getMonthPlans().then((result) => {
    //         setMonthPlans(result);
    //     });
    //     getCreditsPlans().then((results) => {
    //         setCreditsPlans(results);
    //     });
    // }, []);

    const [isButtonDisabled, setButtonDisabled] = useState(false);

    // delete plan
    // const deletePlan = (planId) => {
    //     setButtonDisabled(true);
    //     axios.delete(`/deleteMonthPlan/${planId}`)
    //         .then((response) => {
    //             console.log('Item deleted successfully', response.data);
    //             // Update state only after successful deletion
    //             setMonthPlans((prevMonthPlans) => prevMonthPlans.filter(plan => plan.id !== planId));
    //             setButtonDisabled(false);
    //             setMonthPlansOpen(true);
    //         })
    //         .catch((error) => {
    //             setButtonDisabled(false);
    //             console.error('Error deleting item', error);
    //         });
    // };

    // const deleteCredtsPlan = (planId) => {
    //     setButtonDisabled(true);
    //     axios.delete(`/deleteCreditsPlan/${planId}`)
    //         .then((response) => {
    //             console.log('Item deleted successfully', response.data);
    //             // Update state only after successful deletion
    //             setCreditsPlans((prevCreditsPlans) => prevCreditsPlans.filter(plan => plan.id !== planId));
    //             setButtonDisabled(false);
    //             setCredistPlansOpen(true);
    //         })
    //         .catch((error) => {
    //             setButtonDisabled(false);
    //             console.error('Error deleting item', error);
    //         });
    // };






    return (

        <body className="max-w-3/4 flex flex-col items-center h-auto md:min-h-screen">
            <div className="container bg-white p-10 rounded-lg mx-auto flex-col">
                <h2 className="text-2xl font-semibold"> Settings </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 py-6">
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 p-6 flex-grow"> */}

                    {/* text */}
                    <div className={`md:col-span-3 gap-2 md:ml-8 grid grid-cols-4 md:inline-block`}>

                        {/* Sidebar */}
                        {/**Replicate APi */}
                        <div className={`flex items-center justify-center font-bold md:p-2 rounded-l-lg  ${replicateApiOpen ? 'bg-gray-100' : 'bg-transparent'}`}>
                            {/* Adjust Menu */}
                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setReplicateApiMenuOpen(!replicateApiOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.3,19a2.42,2.42,0,0,1-2.5.56l-2.35,2.35a.34.34,0,0,1-.49,0l-1-1a.36.36,0,0,1,0-.49l2.36-2.35a2.39,2.39,0,0,1,3.39-2.91L19.12,16.8l1,1,1.62-1.62A2.39,2.39,0,0,1,21.3,19ZM22,8v5.76A4.47,4.47,0,0,0,19.5,13a4.57,4.57,0,0,0-1.29.19V9.29H16.66V14A4.5,4.5,0,0,0,15,17.5a4.07,4.07,0,0,0,0,.5H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H20A2,2,0,0,1,22,8ZM11,15,9.09,9.27H7L5.17,15h1.7l.29-1.07H9L9.29,15Zm4.77-3.89a1.67,1.67,0,0,0-.55-1.35,2.43,2.43,0,0,0-1.62-.47h-2V15h1.54V13.11h.44a2.75,2.75,0,0,0,1-.17,1.82,1.82,0,0,0,.67-.44,1.63,1.63,0,0,0,.36-.64A2.36,2.36,0,0,0,15.75,11.11Zm-7.3.62-.12-.44-.15-.58c0-.21-.08-.37-.11-.5a4.63,4.63,0,0,1-.1.48c0,.19-.08.38-.13.57s-.08.34-.12.47l-.24.93H8.69Zm5.59-1a.63.63,0,0,0-.5-.17h-.4v1.31h.31a.9.9,0,0,0,.37-.07.59.59,0,0,0,.27-.22.75.75,0,0,0,.11-.42A.57.57,0,0,0,14,10.71Z"></path><rect width="24" height="24" fill="none"></rect></g></svg>
                                        </span>
                                        <span className="icon-menu-title">Replicate Api</span>
                                    </span>
                                </button>
                            </div>

                        </div>

                        {/**Stripe APi */}
                        <div className={`flex items-center justify-center font-bold md:p-2 rounded-l-lg  ${paymentGatewayAPIOpen ? 'bg-gray-100' : 'bg-transparent'}`}>
                            {/* Adjust Menu */}
                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setpaymentGatewayAPIMenuOpen(!paymentGatewayAPIOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.25 10.435l-2.165 0.46-0.010 7.12c0 1.315 0.99 2.165 2.305 2.165 0.73 0 1.265-0.135 1.56-0.295v-1.69c-0.285 0.115-1.685 0.525-1.685-0.785v-3.16h1.685v-1.89h-1.685zM12.705 13.015l-0.135-0.655h-1.92v7.66h2.215v-5.155c0.525-0.69 1.41-0.555 1.695-0.465v-2.040c-0.3-0.105-1.335-0.3-1.855 0.655zM17.32 9.4l-2.23 0.475v1.81l2.23-0.475zM2.245 14.615c0-0.345 0.29-0.48 0.755-0.485 0.675 0 1.535 0.205 2.21 0.57v-2.090c-0.735-0.29-1.47-0.405-2.205-0.405-1.8 0-3 0.94-3 2.51 0 2.46 3.375 2.060 3.375 3.12 0 0.41-0.355 0.545-0.85 0.545-0.735 0-1.685-0.305-2.43-0.71v2c0.825 0.355 1.66 0.505 2.425 0.505 1.845 0 3.115-0.79 3.115-2.39 0-2.645-3.395-2.17-3.395-3.17zM32 16.28c0-2.275-1.1-4.070-3.21-4.070s-3.395 1.795-3.395 4.055c0 2.675 1.515 3.91 3.675 3.91 1.060 0 1.855-0.24 2.46-0.575v-1.67c-0.605 0.305-1.3 0.49-2.18 0.49-0.865 0-1.625-0.305-1.725-1.345h4.345c0.010-0.115 0.030-0.58 0.030-0.795zM27.605 15.44c0-1 0.615-1.42 1.17-1.42 0.545 0 1.125 0.42 1.125 1.42zM21.96 12.21c-0.87 0-1.43 0.41-1.74 0.695l-0.115-0.55h-1.955v10.24l2.22-0.47 0.005-2.51c0.32 0.235 0.795 0.56 1.57 0.56 1.59 0 3.040-1.16 3.040-3.98 0.005-2.58-1.465-3.985-3.025-3.985zM21.43 18.335c-0.52 0-0.83-0.19-1.045-0.42l-0.015-3.3c0.23-0.255 0.55-0.44 1.060-0.44 0.81 0 1.37 0.91 1.37 2.070 0.005 1.195-0.545 2.090-1.37 2.090zM15.095 20.020h2.23v-7.66h-2.23z"></path> </g></svg>
                                        </span>
                                        <span className="icon-menu-title">Payment Gateway API</span>
                                    </span>
                                </button>
                            </div>

                        </div>

                        {/** watermark text  */}
                        <div className={`flex items-center justify-center font-bold  md:p-2 rounded-l-lg ${watermarkTextOpen ? 'bg-gray-100' : 'bg-transparent'}`}>
                            {/* Adjust Menu */}
                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setWatermarkTextMenuOpen(!watermarkTextOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.334 21.39a6.165 6.165 0 0 1-1.151-.317 4.233 4.233 0 0 1-2.014-1.575 3.945 3.945 0 0 1 .575-4.804 13.407 13.407 0 0 1 3.549-2.401c1.133-.607 2.337-1.328 2.458-2.122.073-.411-.072-.67-.52-1.024a7.44 7.44 0 0 0-1.631-.82c-.61-.243-1.25-.463-1.903-.766a5.266 5.266 0 0 1-.99-.578 1.985 1.985 0 0 1-.786-1.19 1.525 1.525 0 0 1 .09-.828 1.803 1.803 0 0 1 .426-.606 3.478 3.478 0 0 1 1.022-.645 7.692 7.692 0 0 1 2.105-.529 10.899 10.899 0 0 1 4.193.338.5.5 0 0 1-.265.965 9.856 9.856 0 0 0-3.787-.207 6.593 6.593 0 0 0-1.774.49 2.353 2.353 0 0 0-.665.433c-.164.187-.174.241-.154.37.023.236.537.597 1.107.822.572.244 1.21.443 1.854.675a8.646 8.646 0 0 1 1.979.932 2.906 2.906 0 0 1 .907.96 2.275 2.275 0 0 1 .25 1.423 3.454 3.454 0 0 1-1.347 2.122 14.091 14.091 0 0 1-1.778 1.182 12.172 12.172 0 0 0-3.041 2.157 2.45 2.45 0 0 0-.617 1.33 1.794 1.794 0 0 0 .295 1.28A3.3 3.3 0 0 0 5.5 19.5a.99.99 0 0 1 .363.063 2.958 2.958 0 0 1-.755.639 1.493 1.493 0 0 0-.774 1.189zM22.11 6.018L18.4 9.35l-7.45 7.25 1.4 1.4 7.25-7.449 3.383-3.661a.626.626 0 0 0-.873-.873zM9.368 17.619l1.439 1.738a2.94 2.94 0 0 1-1.63 2.234 3.92 3.92 0 0 1-1.626.359 3.598 3.598 0 0 1-1.733-.427s1.8-.968 1.809-2.464c.006-1.38 1.451-1.44 1.703-1.44zm.35 1.99l-.78-.94a.379.379 0 0 0-.311.395 3.191 3.191 0 0 1-.633 1.85 3.042 3.042 0 0 0 .772-.234 1.823 1.823 0 0 0 .952-1.07zM19 15h-1v3h-3v.999h3V22h1v-3.001h3V18h-3z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                        </span>
                                        <span className="icon-menu-title">Watermark Text</span>
                                    </span>
                                </button>
                            </div>

                        </div>

                        {/** Watermark Position  */}
                        <div className={`flex items-center justify-center font-bold  md:p-2 rounded-l-lg ${watermarkPositionOpen ? 'bg-gray-100' : 'bg-transparent'}`}>
                            {/* Adjust Menu */}
                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setWatermarkPositionMenuOpen(!watermarkPositionOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22 23H2v-1h20zM16 9.981V8.567l-.5-.501-2.979 2.995L6.5 5 1.983 9.543v1.44L6.5 6.45l5.307 5.33-3.038 3.055.716.716L15.5 9.48zm3 1.593v1.415l3 3.008v-1.416zM21 1h-7v1h7zm-3 18.293V4.707l2.646 2.646.707-.707L17.5 2.793l-3.854 3.853.707.707L17 4.707v14.586l-2.646-2.646-.707.707 3.853 3.853 3.854-3.854-.707-.707z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                        </span>
                                        <span className="icon-menu-title">Watermark Position</span>
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/** Upscale  scale  */}
                        <div className={`flex items-center justify-center font-bold  md:p-2 rounded-l-lg ${upscaleOpen ? 'bg-gray-100' : 'bg-transparent'}`}>
                            {/* Adjust Menu */}
                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setUpscaleMenuOpen(!upscaleOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        </span>
                                        {/* <span className="icon-menu-title">Upscale Photo Guest</span> */}
                                        <span className="icon-menu-title">Maximum Number of Images for Guest</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                        {/** Month Plans   */}
                        {/* <div className={`flex items-center justify-center font-bold  md:p-2 rounded-l-lg ${monthPlansOpen ? 'bg-gray-100' : 'bg-transparent'}`}>

                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setMonthPlansOpen(!monthPlansOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" fill="#000000" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z"></path></g></svg>
                                        </span>

                                        <span className="icon-menu-title">Month Plans</span>
                                    </span>
                                </button>
                            </div>
                        </div> */}
                        {/** Creidts Plans   */}
                        {/* <div className={`flex items-center justify-center font-bold  md:p-2 rounded-l-lg ${credistPlansOpen ? 'bg-gray-100' : 'bg-transparent'}`}>
                           
                            <div>
                                <button
                                    id="tn-adjust"
                                    type="button"
                                    onClick={() => { resetAllSubMenus(); setCredistPlansOpen(!credistPlansOpen) }}
                                >
                                    <span className="material-icons">
                                        <span className="material-icons flex justify-center items-center">
                                            <svg width="30px" height="30px" fill="#000000" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z"></path></g></svg>
                                        </span>
                                        <span className="icon-menu-title">Credits Plans</span>
                                    </span>
                                </button>
                            </div>
                        </div> */}

                    </div>

                    <div className={`md:col-span-9 bg-white rounded-r-lg md:p-5 md:space-x-4`}>
                        {/* Content of menu  */}
                        {replicateApiOpen && (

                            <div className={`col-span-3 bg-white rounded-r-lg p-5 space-x-4`}>

                                <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">

                                    <div className="mb-4">

                                        <label htmlFor="text-input" className="m-4 text-center text-2xl font-extrabold text-gray-700">
                                            Replicate API KEY
                                        </label>
                                        <hr className="my-4 border-t" />

                                        <div className="max-w-md mx-auto  bg-gray-100 rounded-md shadow-md gap-2">

                                            {replicateApiKeyError && (
                                                <p className="text-red-500 text-sm mt-2">{replicateApiKeyError}</p>
                                            )}
                                            {replicateApiKeySuccess && (
                                                <p className="text-green-500 text-sm mt-2">{replicateApiKeySuccess}</p>
                                            )}

                                            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                <div>
                                                    <input
                                                        id="replicateApi"
                                                        name="replicateApi"
                                                        type="text"
                                                        required
                                                        value={ReplicateApi}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Replicate Api token"
                                                        onChange={e => setReplicateApi(e.target.value)}
                                                    />
                                                </div>

                                            </div>

                                            <div className="items-center mt-4">

                                                {loading ? (
                                                    <button
                                                        type=""
                                                        disabled={loading}
                                                        className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type=""
                                                        disabled={loading}
                                                        onClick={changeReplicateApi}
                                                        className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        Change
                                                    </button>

                                                )}

                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>


                        )}

                        {paymentGatewayAPIOpen && (

                            <div className={`col-span-3 bg-white rounded-r-lg p-5 space-x-4`}>

                                <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">

                                    <div className="mb-4">

                                        <label htmlFor="text-input" className="m-6 text-center text-2xl font-extrabold text-gray-700">
                                            Payment Gateway API KEY
                                        </label>
                                        <hr className="my-4 border-t" />

                                        <div className="max-w-md mx-auto  bg-gray-100 rounded-md shadow-md gap-2">

                                            {paymentGatewayAPIKeyError && (
                                                <p className="text-red-500 text-sm mt-2">{paymentGatewayAPIKeyError}</p>
                                            )}
                                            {paymentGatewayAPIKeySuccess && (
                                                <p className="text-green-500 text-sm mt-2">{paymentGatewayAPIKeySuccess}</p>
                                            )}

                                            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                <div>
                                                    <input
                                                        id="paymentGatewayAPI"
                                                        name="paymentGatewayAPI"
                                                        type="text"
                                                        required
                                                        value={paymentGatewayAPI}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Payment Gateway API Api token"
                                                        onChange={e => setpaymentGatewayAPI(e.target.value)}
                                                    />
                                                </div>

                                            </div>

                                            <div className="items-center mt-4">

                                                {LoadingpaymentGatewayAPI ? (
                                                    <button
                                                        type=""
                                                        disabled={LoadingpaymentGatewayAPI}
                                                        className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type=""
                                                        disabled={LoadingpaymentGatewayAPI}
                                                        onClick={changepaymentGatewayAPI}
                                                        className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        Change
                                                    </button>

                                                )}

                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>


                        )}


                        {watermarkTextOpen && (
                            <div className={`col-span-3 bg-white rounded-r-lg p-5 space-x-4`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className=" bg-gray-100  p-6  rounded-md shadow-md">
                                        <div className="mb-4">

                                            <label htmlFor="text-input" className="m-6 text-center text-2xl font-extrabold text-gray-700">
                                                Watermark Text
                                            </label>
                                            <hr className="my-4 border-t" />

                                            <div className="max-w-md mx-auto  bg-gray-100 rounded-md shadow-md gap-2">

                                                {WATERMARKError && (
                                                    <p className="text-red-500 text-sm mt-2">{WATERMARKError}</p>
                                                )}
                                                {WATERMARKSuccess && (
                                                    <p className="text-green-500 text-sm mt-2">{WATERMARKSuccess}</p>
                                                )}

                                                <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                    <div>
                                                        <input
                                                            id="watermark"
                                                            name="watermark"
                                                            type="text"
                                                            required
                                                            value={WATERMARK}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="Watermark Text"
                                                            onChange={e => setWATERMARK(e.target.value)}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="items-center mt-4">

                                                    {loadingW ? (
                                                        <button
                                                            type=""
                                                            disabled={loadingW}
                                                            className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                        >
                                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type=""
                                                            disabled={loadingW}
                                                            onClick={changeWatermarkText}
                                                            className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                        >
                                                            Change
                                                        </button>
                                                    )}

                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 p-6  rounded-md shadow-md">
                                        <div className="mb-4">

                                            <label htmlFor="text-input" className="m-6 text-center text-2xl font-extrabold text-gray-700">
                                                Watermark Size
                                            </label>
                                            <hr className="my-4 border-t" />

                                            {WATERMARK_SIZE_YError && (
                                                <p className="text-red-500 text-sm mt-2">{WATERMARK_SIZE_YError}</p>
                                            )}
                                            {WATERMARK_SIZE_YSuccess && (
                                                <p className="text-green-500 text-sm mt-2">{WATERMARK_SIZE_YSuccess}</p>
                                            )}

                                            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                <div>
                                                    <input
                                                        id="watermarksize"
                                                        name="watermarsize"
                                                        type="number"
                                                        required
                                                        value={WATERMARK_SIZE}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Watermark Size"
                                                        onChange={e => setWATERMARK_SIZE(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="items-center mt-4">

                                                {loadingWs ? (
                                                    <button
                                                        type=""
                                                        disabled={loadingWs}
                                                        className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type=""
                                                        disabled={loadingWs}
                                                        onClick={changeWatermarkSize}
                                                        className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        Change
                                                    </button>
                                                )}




                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}


                        {watermarkPositionOpen && (

                            <div className={`col-span-3 bg-white rounded-r-lg p-3 space-x-4`}>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-100 p-5  rounded-md shadow-md">
                                        <div className="mb-4">

                                            <label htmlFor="text-input" className="text-center text-2xl font-extrabold text-gray-700">
                                                Watermark Position X
                                            </label>
                                            <hr className="my-4 border-t" />

                                            <div className="max-w-md mx-auto  bg-gray-100 rounded-md shadow-md gap-2">

                                                {WATERMARK_POS_XError && (
                                                    <p className="text-red-500 text-sm mt-2">{WATERMARK_POS_XError}</p>
                                                )}
                                                {WATERMARK_POS_XSuccess && (
                                                    <p className="text-green-500 text-sm mt-2">{WATERMARK_POS_XSuccess}</p>
                                                )}

                                                <div className="rounded-md shadow-sm h-auto grid grid-cols-1 gap-2">

                                                    <div>
                                                        <input
                                                            id="watermarkx"
                                                            name="watermarkx"
                                                            type="number"
                                                            required
                                                            value={WATERMARK_POS_X}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="1st Watermark Position X"
                                                            onChange={e => setWATERMARK_POS_X(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            id="watermarkx2"
                                                            name="watermarkx2"
                                                            type="number"
                                                            required
                                                            value={WATERMARK_POS_X2}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="2nd Watermark Position X"
                                                            onChange={e => setWATERMARK_POS_X2(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <input
                                                            id="watermarkx3"
                                                            name="watermarkx3"
                                                            type="number"
                                                            required
                                                            value={WATERMARK_POS_X3}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="3nd Watermark Position X"
                                                            onChange={e => setWATERMARK_POS_X3(e.target.value)}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="items-center mt-4">

                                                    {LoadingWPosX ? (
                                                        <button
                                                            type=""
                                                            disabled={LoadingWPosX}
                                                            className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                        >
                                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type=""
                                                            disabled={LoadingWPosX}
                                                            onClick={changeWatermarkPosX}
                                                            className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                        >
                                                            Change
                                                        </button>
                                                    )}




                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 p-5  rounded-md shadow-md">
                                        <div className="mb-4">
                                            <label htmlFor="text-input" className="text-center text-2xl font-extrabold text-gray-700">
                                                Watermark Position Y
                                            </label>
                                            <hr className="my-4 border-t" />

                                            <div className="max-w-md mx-auto  bg-gray-100 rounded-md shadow-md gap-2">


                                                {WATERMARK_POS_YError && (
                                                    <p className="text-red-500 text-sm mt-2">{WATERMARK_POS_YError}</p>
                                                )}
                                                {WATERMARK_POS_YSuccess && (
                                                    <p className="text-green-500 text-sm mt-2">{WATERMARK_POS_YSuccess}</p>
                                                )}

                                                <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                    <div>
                                                        <input
                                                            id="watermarky"
                                                            name="watermarky"
                                                            type="number"
                                                            required
                                                            value={WATERMARK_POS_Y}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="1st Watermark Position Y"
                                                            onChange={e => setWATERMARK_POS_Y(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <input
                                                            id="watermarky2"
                                                            name="watermarky2"
                                                            type="number"
                                                            required
                                                            value={WATERMARK_POS_Y2}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="2nd Watermark Position Y"
                                                            onChange={e => setWATERMARK_POS_Y2(e.target.value)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <input
                                                            id="watermarky3"
                                                            name="watermarky3"
                                                            type="number"
                                                            required
                                                            value={WATERMARK_POS_Y3}
                                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                            placeholder="3rd Watermark Position Y"
                                                            onChange={e => setWATERMARK_POS_Y3(e.target.value)}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="items-center mt-4">

                                                    {LoadingWPosY ? (
                                                        <button
                                                            type=""
                                                            disabled={LoadingWPosY}
                                                            className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                        >
                                                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type=""
                                                            disabled={LoadingWPosY}
                                                            onClick={changeWatermarkPosY}
                                                            className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                        >
                                                            Change
                                                        </button>
                                                    )}




                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>


                        )}

                        {upscaleOpen && (

                            <div className={`col-span-3 bg-white rounded-r-lg p-5 space-x-4`}>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="max-w-md mx-3.5 mt-6 md:mt-0 p-6 bg-gray-100 rounded-md shadow-md">
                                        <label htmlFor="text-input" className="text-center text-2xl font-extrabold text-gray-700">
                                            Upscale Photo Guest
                                        </label>

                                        <hr className="my-4 border-t" />
                                        <div className="mb-4">

                                            {UPSACALE_PHOTO_GUESTError && (
                                                <p className="text-red-500 text-sm mt-2">{UPSACALE_PHOTO_GUESTError}</p>
                                            )}
                                            {UPSACALE_PHOTO_GUESTSuccess && (
                                                <p className="text-green-500 text-sm mt-2">{UPSACALE_PHOTO_GUESTSuccess}</p>
                                            )}

                                            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                <div>
                                                    <input
                                                        id="upscalescale"
                                                        name="upscalescale"
                                                        type="number"
                                                        min="2"
                                                        max="10"
                                                        required
                                                        value={UPSACALE_PHOTO_GUEST}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="UPSACALE PHOTO GUEST"
                                                        onChange={e => setUPSACALE_PHOTO_GUEST(e.target.value)}
                                                    />
                                                </div>

                                            </div>

                                            <div className="items-center mt-4">

                                                {LoadingUPSACALE_PHOTO_GUEST ? (
                                                    <button
                                                        type=""
                                                        disabled={LoadingUPSACALE_PHOTO_GUEST}
                                                        className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type=""
                                                        disabled={LoadingUPSACALE_PHOTO_GUEST}
                                                        onClick={changeUPSACALE_PHOTO_GUEST}
                                                        className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        Change
                                                    </button>
                                                )}




                                            </div>

                                        </div>
                                    </div>

                                    <div className="max-w-md mx-3.5 mt-6 md:mt-0 p-6 bg-gray-100 rounded-md shadow-md">
                                        <label htmlFor="text-input" className="text-center text-2xl font-extrabold text-gray-700">
                                            Background General Guest
                                        </label>

                                        <hr className="my-4 border-t" />
                                        <div className="mb-4">

                                            {Background_General_PHOTO_GUESTError && (
                                                <p className="text-red-500 text-sm mt-2">{Background_General_PHOTO_GUESTError}</p>
                                            )}
                                            {Background_General_PHOTO_GUESTSuccess && (
                                                <p className="text-green-500 text-sm mt-2">{Background_General_PHOTO_GUESTSuccess}</p>
                                            )}

                                            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                <div>
                                                    <input
                                                        id="upscalescale"
                                                        name="upscalescale"
                                                        type="number"
                                                        min="1"
                                                        max="4"
                                                        required
                                                        value={Background_General_PHOTO_GUEST}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Background General PHOTO GUEST"
                                                        onChange={e => setBackground_General_PHOTO_GUEST(e.target.value)}
                                                    />
                                                </div>

                                            </div>

                                            <div className="items-center mt-4">

                                                {LoadingBackground_General_PHOTO_GUEST ? (
                                                    <button
                                                        type=""
                                                        disabled={LoadingBackground_General_PHOTO_GUEST}
                                                        className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type=""
                                                        disabled={LoadingBackground_General_PHOTO_GUEST}
                                                        onClick={changeBackground_General_PHOTO_GUEST}
                                                        className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        Change
                                                    </button>
                                                )}




                                            </div>

                                        </div>
                                    </div>


                                    <div className="max-w-md mx-3.5 mt-6 md:mt-3 p-6 bg-gray-100 rounded-md shadow-md">
                                        <label htmlFor="text-input" className="text-center text-2xl font-extrabold text-gray-700">
                                            Image Generator Guest
                                        </label>

                                        <hr className="my-4 border-t" />
                                        <div className="mb-4">

                                            {Image_Generator_PHOTO_GUESTError && (
                                                <p className="text-red-500 text-sm mt-2">{Image_Generator_PHOTO_GUESTError}</p>
                                            )}
                                            {Image_Generator_PHOTO_GUESTSuccess && (
                                                <p className="text-green-500 text-sm mt-2">{Image_Generator_PHOTO_GUESTSuccess}</p>
                                            )}

                                            <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">

                                                <div>
                                                    <input
                                                        id="upscalescale"
                                                        name="upscalescale"
                                                        type="number"
                                                        min="1"
                                                        max="4"
                                                        required
                                                        value={Image_Generator_PHOTO_GUEST}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Image Generator PHOTO GUEST"
                                                        onChange={e => setImage_Generator_PHOTO_GUEST(e.target.value)}
                                                    />
                                                </div>

                                            </div>

                                            <div className="items-center mt-4">

                                                {LoadingImage_Generator_PHOTO_GUEST ? (
                                                    <button
                                                        type=""
                                                        disabled={LoadingImage_Generator_PHOTO_GUEST}
                                                        className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type=""
                                                        disabled={LoadingImage_Generator_PHOTO_GUEST}
                                                        onClick={changeImage_Generator_PHOTO_GUEST}
                                                        className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                    >
                                                        Change
                                                    </button>
                                                )}




                                            </div>

                                        </div>
                                    </div>


                                </div>

                            </div>
                        )}

                        {/* month plans */}

                        {/* {monthPlansOpen && (

                            <div className={`col-span-3 bg-white rounded-r-lg p-5 space-x-4`}>
                                <div className="max-w-md mx-auto md:max-w-none p-6 bg-gray-100 rounded-md shadow-md">

                                    <div className="md:grid grid-cols-3">
                                        <div className="col-span-2">
                                            <label htmlFor="text-input" className="m-6 text-center text-2xl font-extrabold text-gray-700">
                                                Month Plans
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <a className="font-bold py-2 px-4 mt-6 mr-6 items-center tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                href="/plans/add-plans">Add Month Plan</a>
                                        </div>
                                    </div>

                                    <hr className="my-4 border-t" />

                                    {MonthPlansError && (
                                        <p className="text-red-500 text-sm mt-2">{MonthPlansError}</p>
                                    )}
                                    {MonthPlansSuccess && (
                                        <p className="text-green-500 text-sm mt-2">{MonthPlansSuccess}</p>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {monthPlans.map(plan => (
                                            <div key={plan.id} className="p-6 rounded-md shadow-md">
                                                <div className="rounded w-full flex flex-col border-solid">
                                                    <span className="font-medium">
                                                        {plan.name}
                                                    </span>

                                                    <div className="col-span-11 text-l flex  pl-2">
                                                        {plan.description}
                                                    </div>


                                                    <div className="flex flex-row items-center pt-3 pl-6 pr-6 gap-3 pb-3 text-primary-500">
                                                        <div className="flex flex-row gap-1">
                                                            <span className="font-normal">$</span>
                                                            <p className="text-5xl font-semibold">
                                                                {plan.price}
                                                            </p>
                                                        </div>
                                                        <p className="font-normal">/ month</p>
                                                    </div>

                                                    <div className="flex items-center justify-between mb-4">
                                                        <p className="text-lg font-semibold text-green-500">
                                                            Credits: {plan.credits}
                                                        </p>
                                                    </div>
                                                </div>


                                                <div className="items-center mt-4">
                                                    <div className="">

                                                        <a className="float-left bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md focus:shadow-outline focus:outline-none  rounded cursor-pointer" href={`/plans/edit-plans/${plan.id}`}>Edit</a>



                                                        <button disabled={isButtonDisabled} className="float-right bg-red-500 hover:bg-red-800 font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md focus:shadow-outline focus:outline-none  rounded cursor-pointer" onClick={() => deletePlan(plan.id)}>
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>


                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        )} */}

                        {/* crdits plans */}
                        {/* {credistPlansOpen && (

                            <div className={`col-span-3 bg-white rounded-r-lg p-6 space-x-4`}>
                                <div className="max-w-md mx-auto md:max-w-none p-6 bg-gray-100 rounded-md shadow-md">



                                    <div className="md:grid grid-cols-3">
                                        <div className="col-span-2">
                                            <label htmlFor="text-input" className="m-6 text-center text-2xl font-extrabold text-gray-700">
                                                Credits Plans
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <a className="font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"
                                                href="/plans/add-credits-plans">Add Credits Plan</a>
                                        </div>
                                    </div>






                                    <hr className="my-4 border-t" />

                                    {credistPlansError && (
                                        <p className="text-red-500 text-sm mt-2">{credistPlansError}</p>
                                    )}
                                    {credistPlansSuccess && (
                                        <p className="text-green-500 text-sm mt-2">{credistPlansSuccess}</p>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {creditsPlans.map(plan => (

                                            <div key={plan.id} className="p-6 rounded-md shadow-md">
                                                <div className="rounded w-full flex flex-col border-solid">
                                                    <span className="font-medium">
                                                        {plan.name}
                                                    </span>

                                                    <div className="col-span-11 text-l flex  pl-2">
                                                        {plan.description}
                                                    </div>


                                                    <div className="flex flex-row items-center pt-3 pl-6 pr-6 gap-3 pb-3 text-primary-500">
                                                        <div className="flex flex-row gap-1">
                                                            <span className="font-normal">$</span>
                                                            <p className="text-5xl font-semibold">
                                                                {plan.price}
                                                            </p>
                                                        </div>
                                                        <p className="font-normal"></p>
                                                    </div>

                                                    <div className="flex items-center justify-between mb-4">
                                                        <p className="text-lg font-semibold text-green-500">
                                                            Credits: {plan.credits}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="items-center mt-4">
                                                    <div className="">

                                                        <a className="float-left bg-blue-500 hover:bg-blue-800 font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md focus:shadow-outline focus:outline-none  rounded" href={`/plans/edit-credits-plans/${plan.id}`}>Edit</a>

                                                        <a disabled={isButtonDisabled} className="float-right bg-red-500 hover:bg-red-800 font-bold py-2 px-4 roundedmt-4  items-center  tracking-wide text-white transition duration-200 shadow-md focus:shadow-outline focus:outline-none  rounded cursor-pointer" onClick={() => deleteCredtsPlan(plan.id)}>
                                                            Delete
                                                        </a>
                                                    </div>
                                                </div>


                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        )} */}
                    </div>


                </div>
            </div >
            <style>{`

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
       
      `}</style>
        </body >
    );
}
