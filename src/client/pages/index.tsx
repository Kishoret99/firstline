import React from 'react'
import { NextPage } from 'next'

type HomePageProps = {
  name: string;
}

const Home: NextPage<HomePageProps> = ({name}) => {
  return <h1>Name: {name}</h1>
}

Home.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;

  let name;
  if (isServer) {
    name = query.name;
  }

  return {
    name,
  };
};



export default Home
