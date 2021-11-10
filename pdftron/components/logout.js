import React from 'react';
import {signOut} from "next-auth/react";

export default function Logout () {
    return <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Sign Out</button>
  }
  
