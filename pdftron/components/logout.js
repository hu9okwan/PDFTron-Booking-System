import React from 'react';

import { GoogleLogout } from 'react-google-login';

//const clientId = process.env.CLIENT_ID;
const clientId = '607499516874-k3pchrc1cr1nfj8bqngtoflvdnq8tnlt.apps.googleusercontent.com';

function Logout() {
    const onSuccess = (res) => {
        alert(`Logged out successfully.`);
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                style={{ marginTop: '100px' }}
            ></GoogleLogout>
        </div>
    );
}

export default Logout;
