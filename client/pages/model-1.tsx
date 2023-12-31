import React from 'react'
import Layout from '../components/Layout'
import DrawPredict from '../components/DrawPredict'

export default function Model1 (): JSX.Element {
  return (
    <Layout>
      <DrawPredict
        modelId={1}
      />
    </Layout>
  )
};
