import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import DrawPredict from '../components/DrawPredict'

export default function Model1 () {
  return (
    <Layout>
      <DrawPredict
        model_id={1}
        model_name={'Number Predictor'}
        model_description={'手書きの数字を判定するAIです。'}
        model_accuracy={99.9}
        model_loss={0.001}
      />
    </Layout>
  )
};
