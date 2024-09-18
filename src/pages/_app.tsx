import GlobalProvider from "@/context/Provider";
import { COOKIES_ACCESS_TOKEN, COOKIES_USER_TYPE } from "@/context/actionTypes";
import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import NProgress from 'nprogress';
import Head from "next/head";
import { parseCookies } from "nookies";
import { Router } from 'next/router';
import { Fragment, ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement,) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  access_token: string,
  user_info:any
  signInPrivacy: string,
  userType: string,
}
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
const MyApp = ({ Component, pageProps, ...props }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <Fragment>
    <GlobalProvider {...props}>
      <Head>
        <title>
          Raize
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Wide Selection of Music Artists." />
        <link rel="stylesheet" href="https://unpkg.com/treeflex/dist/css/treeflex.css"></link>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </GlobalProvider >
  </Fragment> 
}

MyApp.getInitialProps = async (context: any) => {
  const accessToken = parseCookies(context.ctx)[COOKIES_ACCESS_TOKEN]
  const userType = parseCookies(context.ctx)[COOKIES_USER_TYPE]
  try {
    if (accessToken) {
      let apiRes:any = "apicall"
      const user_info = {...apiRes.data}
      return { user_info: { ...user_info, access_token: accessToken,userType } }
    }
    return { user_info: {userType,access_token:accessToken} }

  } catch (error: any) {
    return { user_info: { access_token: accessToken,userType } }
  }
}

export default MyApp

