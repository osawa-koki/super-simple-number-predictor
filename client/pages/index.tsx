import React from 'react'
import Layout from '../components/Layout'

export default function Home (): JSX.Element {
  return (
    <Layout>
      <div className='d-flex flex-column'>
        <h1 className="text-center">🐢 Number Predictor 🐢</h1>
        <img src="./tako.png" alt="Logo" className='mt-5 d-block m-auto' style={{ width: '250px', maxWidth: '100%' }} />
      </div>
    </Layout>
  )
};
