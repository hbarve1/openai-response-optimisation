import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ApolloProvider } from '@apollo/client';

// import RelayEnvironment from '../components/relay/RelayEnvironment';
import React from 'react';
import { apolloClient } from '../graphql/apolloClient';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to app!</title>
        <script
          src="https://kit.fontawesome.com/b8b2f24996.js"
          crossOrigin="anonymous"
          async
        />
      </Head>

      <ApolloProvider client={apolloClient}>
        {/* <RelayEnvironment> */}
        <main className="app">
          <React.Suspense fallback="Loading...">
            <Component {...pageProps} />
          </React.Suspense>
        </main>
        {/* </RelayEnvironment> */}
      </ApolloProvider>
    </>
  );
}

export default CustomApp;
