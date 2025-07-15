import React from 'react';
import { useTheme, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back icon

function BackNavigate() {
    const theme = useTheme();

    return (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
            <IconButton
                variant="contained"
                sx={{
                    color: theme.palette.common.white,
                    width: "max-content",
                    backgroundColor: theme.palette.error.main,
                    "&:hover": {
                        backgroundColor: theme.palette.error.main,
                    },
                }}
                onClick={() => window.history.back()}
            >
                <ArrowBackIcon /> {/* Icon with some margin on the right */}
            </IconButton>
        </div>
    );
}

export default BackNavigate;
