import Head from 'next/head'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import {addUserToDatabase, getUserSessionInfo, isAdmin} from "../database/databaseCRUD";
import Loader from "../components/loader"
import { NavbarBS } from '../components/NavbarBS';


export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
                <Head>
                    <title>PDFTron Reservation System</title>
                    <meta name="description" content="Generated by create next app"
                        key="title" />
                    <link rel="icon" href="/pdftron-icons/PDFtron.ico" />
                </Head>
            {Component.auth ? (
                <Auth>
                    <NavbarBS />
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <>
                <NavbarBS />
                <Component {...pageProps} />
                </>
            )}
        </SessionProvider>
    )
}

function Auth({ children }) {
    const router=useRouter()
    const { data: session, status } = useSession()
    const isUser = !!session?.user
    useEffect(() => {
        if (status === "loading") return // Do nothing while loading
        if (!isUser) router.push('/') // Redirects user to homepage if not logged in
    }, [isUser, status])

    
    
    const [isLoading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(
        {
            userId: undefined,
            teamId: 1,
            isAdmin: false
        }
    )

    if (isUser) {
        if (!userInfo.userId) {
            let userEmail = session.user.email
            getUserSessionInfo(userEmail).then(async existingUserInfo => {
                if (!existingUserInfo) {
                    let newUserInfo = await addUserToDatabase(session)
                    setUserInfo({
                        userId: newUserInfo.id,
                        teamId: newUserInfo.teamId,
                        isAdmin: newUserInfo.isAdmin
                    })
                } else {
                    setUserInfo({
                        userId: existingUserInfo.userId,
                        teamId: existingUserInfo.teamId,
                        isAdmin: existingUserInfo.isAdmin
                    })
                }
                setLoading(false)
            })
        }

        session.user["id"] = userInfo.userId
        session.user["teamId"] = userInfo.teamId
        session.user["isAdmin"] = userInfo.isAdmin

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

