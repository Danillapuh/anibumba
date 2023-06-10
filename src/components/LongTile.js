import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";


export function LongTile({title, content, img, maxWidth}) {
    const theme = useTheme()
    return (
        <Box sx={{overflow:'hidden', padding:'5px',transition:'0.3s','&:hover':{cursor:'pointer', background:theme.custom.hoverLighter},display: 'flex', justifyContent: 'space-between', minWidth: '150px' }}>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {img}
                <Box sx={{display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h8" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: maxWidth || '350px', flexShrink:'1',flexGrow:'1', overflow: 'hidden', fontWeight:'500'}}>{title}</Typography>
                    <Typography variant="h8" sx={{ color: theme.palette.text.secondary,whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: maxWidth || '350px', overflow: 'hidden' }}>{content}</Typography>
                </Box>
            </Box>
        </Box>
    )
}