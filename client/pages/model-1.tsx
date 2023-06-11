import React from 'react'
import Layout from '../components/Layout'
import DrawPredict from '../components/DrawPredict'

export default function Model1 (): JSX.Element {
  return (
    <Layout>
      <DrawPredict
        modelId={1}
        modelName={'Number Predictor'}
        modelDescription={'手書きの数字を判定するAIです。'}
        modelAccuracy={99.9}
        modelLoss={0.001}
      />
    </Layout>
  )
};
