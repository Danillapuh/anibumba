import { Avatar, Box, Grid, Typography } from '@mui/material';
import { ClubsArray, ShikiDomain, UsersArray } from '../constants/mock.anime';
import { isMobile } from 'react-device-detect';
import { LongTile } from '../components/LongTile';
import { ImgLoad } from '../components/ImgLoad';
import { LineDivider } from '../components/LineDivider';
import { RemoveRedEye } from '@mui/icons-material';
import { BoxTile } from './BoxTile';

export function SideBars() {
    return (
        <>
            <BoxTile sx={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '5px', background: '#ffff', minHeight: '200px', borderRadius: '5px' }}>
                <Typography variant='h6'>Клубы</Typography>
                <LineDivider color="gray" />
                {ClubsArray.filter((_, idx) => idx >= 23 && idx <=28).map(club => (
                    <LongTile maxWidth="200px" content={club.name} img={<Avatar variant='square' sx={{ borderRadius: '3px', width: '35px', height: '35px' }}><ImgLoad src={ShikiDomain + club.logo.x96} /></Avatar>} />
                ))}
            </BoxTile>
            <BoxTile sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px', padding: '5px', background: '#ffff', minHeight: '200px', borderRadius: '5px' }}>
                <Typography variant='h6'>Пользователи</Typography>
                <LineDivider color="gray" />
                {UsersArray.filter((_, idx) => idx >= 20 && idx <=28).map(user => (
                    <LongTile title={user.nickname} content={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RemoveRedEye sx={{ opacity: '0.5', height: '15px', width: '15px' }} />
                        <Typography variant='h8'>{new Date(user.last_online_at).toDateString()}</Typography>
                    </Box>} img={<Avatar variant='square' sx={{ borderRadius: '3px', width: '35px', height: '35px' }}><ImgLoad src={user.avatar} /></Avatar>} />
                ))}
            </BoxTile>
        </>
    )
}