import React from 'react';
import { SideNavAdmin } from '../widgets/sideNavAdmin';

const AdminUnauthorized = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="flex w-full">
                <div className="py-16 px-10 w-full">
                    <SideNavAdmin />
                    <div style={{ textAlign: 'center' }}>
                        {/* <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} /> */}
                        <h2>Unauthorized Access</h2>
                        <p>You do not have permission to access this page.</p>
                        {/* Add any additional content or links here */}
                    </div>
                </div>
            </div>
        </div>
      );
};

export default AdminUnauthorized;