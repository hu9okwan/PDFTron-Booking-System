import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loader from "./loader"


export default function AuthZ({ children }) {

    const { data: session, status } = useSession()
    const router = useRouter()
    const isAdmin = session.user.isAdmin
    useEffect(() => {
        if (status === "loading") return
        if (!isAdmin) router.push('/book')
    }, [isAdmin, status])

    if (isAdmin) {
        return children
    }

    return <Loader />
}