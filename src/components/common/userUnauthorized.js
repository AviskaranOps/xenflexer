import React from 'react';
import { SideNav } from '../widgets/sidenav';

const UserUnauthorized = () => {
    return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <SideNav />
        <div className="pb-20 w-full">
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

export default UserUnauthorized;