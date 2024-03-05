import React from 'react';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';


const Layout = (props) => {
    return (
        <div>
            <Stack direction="row">
                <Outlet/>
            </Stack>
        </div>
    );
};

export default Layout;