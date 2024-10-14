import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
    return (
        <div className="flex flex-col gap-y-10 justify-center items-center p-5 min-h-screen">
            {/* Renders the current page */}
            <Outlet />
        </div>
    );
};

export default DefaultLayout;