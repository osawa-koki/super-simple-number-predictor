import React from 'react'
import Layout from '../components/Layout'
import DrawPredict from '../components/DrawPredict'

export default function Model2 (): JSX.Element {
  return (
    <Layout>
      <DrawPredict
        modelId={2}
      />
    </Layout>
  )
};
