import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div className='lg:w-2/3 mx-auto my-8'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;