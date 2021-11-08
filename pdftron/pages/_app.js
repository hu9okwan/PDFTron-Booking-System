import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { SessionProvider } from "next-auth/react"
export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <ChakraProvider>
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
    </ChakraProvider>
  )
}