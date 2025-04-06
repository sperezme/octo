import type { AppProps } from 'next/app'
import "../styles/globals.css";
import './product.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;
