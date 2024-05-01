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

export default function SimplePaper() {
    const handleArrowClick = () => {
        //func
        console.log('Arrow clicked');
    };
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
            }}
        >
            <Paper elevation={3} sx={{ width: 500, height: 500, border: '2px solid maroon', padding: 1}} 
            >
                <ArrowBackIcon sx={{ width: 35, height: 35, marginBottom: 2}} 
                onClick={handleArrowClick} style={{ cursor: 'pointer' }}/>
                <Chip label="Recent Updates" icon={<HistoryIcon />} sx={{marginLeft: 38, marginBottom: 2}}/>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Paper> 
        </Box>
    );
}
