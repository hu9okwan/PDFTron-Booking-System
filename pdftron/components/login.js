import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { GoogleButton } from 'react-google-button';

//const clientId = process.env.CLIENT_ID;
const clientId = '607499516874-k3pchrc1cr1nfj8bqngtoflvdnq8tnlt.apps.googleusercontent.com';

function Login() {
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert(`Logged in successfully welcome ${res.profileObj.name}.\nSee console for full profile object.`);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(`Failed to login.`);
    };

    return (
        <div>
        <GoogleLogin
            clientId={clientId}
            hostedDomain="pdftron.com"
            buttonText="Login"
            render={renderProps => (
            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton> )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn="True"
        />
        </div>
    );
}

export default Login;
