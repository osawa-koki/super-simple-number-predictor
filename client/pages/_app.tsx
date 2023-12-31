import React from 'react'
import { type AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/styles.scss'
import '../styles/menu.scss'
import '../styles/draw_predict.scss'

import Head from 'next/head'

import setting from '../setting'

export default function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>💓 Numeric Judger 💓</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href={`${setting.basePath}favicon.ico`} type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  )
};
