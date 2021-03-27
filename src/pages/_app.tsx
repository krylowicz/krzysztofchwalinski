import { ChakraProvider } from '@chakra-ui/core';
import theme from '../theme';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from 'src/apolloConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp;
