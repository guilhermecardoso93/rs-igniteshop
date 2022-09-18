import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import { stripe } from "../lib/stripe";
import { ImageContainer } from "../styles/pages/success";
import { SuccessContainer } from "../styles/pages/success";
import Stripe from 'stripe'
import Image from "next/future/image";

interface SuccessProps {
  customerName: string,
  product: {
    name: string,
    imageUrl: string
  }
}
export default function Success({customerName, product}: SuccessProps) {
  return (
    <>
        <Head>
            <title>Compra concluída | Ignite Shop</title>
            <meta name="robots" content="noindex" />
        </Head>
        <SuccessContainer>
          
          <h1>Compra efetuada!</h1>
          <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt={product.name} />
          </ImageContainer>
          <p>Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa. </p>

          <Link href="/">
            Voltar ao catálogo
          </Link>
        </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async({query}) => {
  if(!query.session_id || query.session_id.length === 0){
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }

  const sessionId = String(query.session_id)

  
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  if(!session.id){
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };
  }
  const customer = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName: customer,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}