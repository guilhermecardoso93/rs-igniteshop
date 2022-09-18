import { AppProps } from "next/app"
import {globalStyles} from '../styles/global'

import { Container } from "../styles/pages/app"
import {CartProvider, useShoppingCart} from 'use-shopping-cart'
import {Header} from '../components/header'

//Carregando estilos globais
globalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  
  return( 
    <CartProvider
    cartMode="checkout-session"
    stripe={process.env.STRIPE_SECRET_KEY}
    currency="BRL"
    >
      <Container>
        <Header />
        
        <Component {...pageProps} />    
        
      </Container>
    </CartProvider>
    )
}