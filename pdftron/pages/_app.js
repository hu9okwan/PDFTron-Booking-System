import Head from 'next/head'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { useSession, signIn } from 'next-auth/react';
import React, {useState} from "react";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { MoonLoader, PulseLoader, SyncLoader } from 'react-spinners';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    )
}

function Auth({ children }) {
    const { data: session, status } = useSession()
    const isUser = !!session?.user
    React.useEffect(() => {
        if (status === "loading") return // Do nothing while loading
        if (!isUser) signIn() // If not authenticated, force log in
        //Going to figure a way to force redirect instead of just button log in.
    }, [isUser, status])

    if (isUser) {
        return children
    }

    // if using a loader that has dots add justify-content: center;
    const override = css`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    `;

    const style = {
        padding: "30px",
        width: "200px",
        height: "20vh",
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "auto"
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div style={style}>
        {/* <MoonLoader color={"#00a5e4"} css={override} size={50} /> */}
        <SyncLoader color={"#00a5e4"} css={override} size={10} margin={5}/>
        </div>
}

