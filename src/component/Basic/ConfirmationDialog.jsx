import React from 'react';
import { Dialog, Button, Grid, useTheme } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, message, onConfirm }) => {
    const theme = useTheme();
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <div style={{ padding: '1rem 2rem' }}>
                <h4 style={{ margin: '0px', textAlign: 'center' }}>Confirm Action</h4>
                <p>{message}</p>
                <Grid container justifyContent="flex-end" spacing={2} style={{ marginBottom: '0.5rem' }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{
                                color: theme.palette.common.white,
                                width: "max-content",
                                backgroundColor: theme.palette.error.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.error.main,
                                },
                            }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleConfirm}
                            sx={{
                                color: theme.palette.common.white,
                                width: "max-content",
                                backgroundColor: theme.palette.success.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.success.main,
                                },
                            }}
                        >
                            Confirm
                        </Button>
                    </Grid>
                </Grid>
            </div>


        </Dialog>
    );
};

export default ConfirmationDialog;
