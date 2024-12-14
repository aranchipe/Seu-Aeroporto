import React, { useState } from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { poppins } from '@/app/fonts';

interface SegmentButtonProps {
    setSegments: React.Dispatch<React.SetStateAction<string | null>>;
    label: string
    segments: string | null
}

const buttonStyles = {
    base: {
        width: "100%",
        borderRadius: "8px",
        textTransform: "none",
        color: '#525252CC',
        fontFamily: poppins.style.fontFamily, fontWeight: 400,
        height: '100%'
    },
    active: {
        backgroundColor: "#3CA0B917",
        color: "#3CA0B9",
        /* '&:hover': { backgroundColor: "#1565C0" }, */
        border: '1px solid #3CA0B9'
    },
    inactive: {
        border: '1px solid #52525233'
    },
};

const SegmentButton: React.FC<SegmentButtonProps> = ({ setSegments, label, segments }) => {


    return (
        <Button
            /* variant={segments === label ? 'contained' : 'outlined'} */
            onClick={() => {
                setSegments(label.toLocaleLowerCase())
            }}
            sx={{
                ...buttonStyles.base,
                ...(segments === label.toLocaleLowerCase() ? buttonStyles.active : buttonStyles.inactive)
            }}
        >
            {label}
        </Button>
    );
}

export default SegmentButton;
