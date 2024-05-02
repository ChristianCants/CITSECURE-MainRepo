import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

export default function HistoryComponent({ onClose }) {
    const handleArrowClick = () => {
        onClose(); // Close the History component
    };
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const userAction = "updated the first name"; // This can be dynamically set based on user actions

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                backdropFilter: 'blur(5px)', // Add backdrop filter for background blur
            }}
        >
            <Paper elevation={3} sx={{ width: 500, height: 500, border: '2px solid maroon', padding: 1}} 
            >
                <ArrowBackIcon sx={{ width: 35, height: 35, marginBottom: 2}} 
                onClick={handleArrowClick} style={{ cursor: 'pointer' }}/>
                <Chip label="Recent Activity" icon={<HistoryIcon />} sx={{marginLeft: 38, marginBottom: 2}}/>
                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {formattedDate}
                        </AccordionSummary>
                        <AccordionDetails>
                            {`User ${userAction}`} {/* Dynamically set the user action here */}
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Paper> 
        </Box>
    );
}
