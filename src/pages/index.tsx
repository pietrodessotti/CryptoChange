import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { api } from '../services/api';

export const Home = () => {
//   useEffect(() => {
//     api.get('coins?currency=BRL').then(response => console.log(response.data))
// }, [])

return (
    <>
       <Head>
        <title>Home - CryptoChange</title>
      </Head>
      <h1>
        Hello World Next.Js
      </h1>
    </>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await api.get('coins?currency=BRL')

  console.log(price.data)

  return {
    props: {
      price: 'Pietro'
    }
  }
}

export default Home
