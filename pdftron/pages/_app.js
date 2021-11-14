import Head from 'next/head'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { useSession, signIn } from 'next-auth/react';
import React, {useEffect, useState} from "react";
import {addUserToDatabase, getUserId, isAdmin} from "../database/databaseCRUD";
import Loader from "../components/loader"



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
    useEffect(() => {
        if (status === "loading") return // Do nothing while loading
        if (!isUser) signIn() // If not authenticated, force log in
        //Going to figure a way to force redirect instead of just button log in.


    }, [isUser, status])

    const [gotId, setGotId] = useState(false);
    const [isLoading, setLoading] = useState(true);



    if (isUser) {

        // console.log(gotId, "gotid")
        if (!gotId) {
            let userEmail = session.user.email
            getUserId(userEmail).then(id => {
                // console.log(id)
                if (id) {
                    isAdmin(userEmail).then(bool => {
                        session.user["adminpriv"] = bool
                    })
                    session.user["id"] = id
                } else {
                    addUserToDatabase(userEmail).then(id => {
                        session.user["id"] = id
                    })
                }
                setGotId(true)
                setLoading(false)
            })

        }

        // console.log(session)
        if (isLoading){
            return <Loader />
        }
        return children
    }


    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <Loader />
}

