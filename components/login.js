import { GoogleButton } from 'react-google-button';
import {signIn} from "next-auth/react";
import React from "react";

export default function Login () {
  return <GoogleButton onClick={() => signIn("google", { callbackUrl: 'https://obs.pdftron.com/book' })}>Sign in with Google</GoogleButton>
}
