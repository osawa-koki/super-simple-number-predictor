import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { fabric } from 'fabric'
import Button from 'react-bootstrap/Button'
import {
  Chart as ChartJS,
  registerables
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import setting from '../setting'

ChartJS.register(
  ...registerables
)

const options = {
  scales: {
    y: {
      ticks: {
        callback: function (value: number, _: any) {
          return `${value} %`
        }
      }
    }
  }
}

export default function DrawPredict (props: {
  modelId: number
}): JSX.Element {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modelId
  } = props

  const [canvas, setCanvas] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [predicted, setPredicted] = useState<number[]>([])

  const ClearCanvas = (): void => {
    canvas.remove.apply(canvas, canvas.getObjects())
    canvas.backgroundColor = 'white'
  }

  const Judge = async (): Promise<void> => {
    try {
      setPredicted([])
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 10)) // ちょっと待つ。
      // 画像をバイナリに変換。
      // create a new canvas element to store the data
      const dataCanvas = document.createElement('canvas')
      const size = canvas.getWidth() * 2 // TODO: なぜか、canvasのサイズが半分になってしまうので、2倍にしておく。
      dataCanvas.width = size
      dataCanvas.height = size

      // copy the data from the original canvas to the new canvas
      const ctx = dataCanvas.getContext('2d')
      if (ctx == null) {
        console.error('ctx is null.')
        return
      }
      ctx.drawImage(canvas.getElement(), 0, 0)

      // get the data from the new canvas as a binary data
      const data = dataCanvas.toDataURL('image/png')
      const binaryData = atob(data.split(',')[1])
      const buffer = new Uint8Array(binaryData.length)
      for (let i = 0; i < binaryData.length; i++) {
        buffer[i] = binaryData.charCodeAt(i)
      }
      // Blobを作成
      const blob = new Blob([buffer.buffer])

      // Create a new FileReader
      const reader = new FileReader()

      // Add an event listener for when the file is loaded
      reader.addEventListener('load', function () {
        const imageBytes = new Uint8Array(reader.result as ArrayBuffer)
        // Create FormData object
        const formData = new FormData()
        formData.append('image', new File([imageBytes], 'image.png', { type: 'image/png' }))
        // Perform the fetch request
        fetch(`${setting.apiPath}/api/numeric-judge/${modelId}`, {
          method: 'POST',
          body: formData
        })
          .then(async res => {
            if (!res.ok) {
              const text = await res.text()
              throw new Error(text)
            }
            return await res.json()
          })
          .then((data) => {
            const predicted: number[] = []
            for (let i = 0; i < 10; i++) {
              predicted.push(data[i])
            }
            setPredicted(predicted)
          })
          .catch((err: Error) => {
            console.error(err)
            toast.error(err.message)
          })
          .finally(() => {
            setLoading(false)
          })
      }, false)

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(blob)
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        toast.error(ex.message)
      }
    }
  }

  useEffect(() => {
    if (canvas === null) return
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.width = 10
    canvas.freeDrawingBrush.color = 'black'
    canvas.isDrawingMode = true
    ClearCanvas()
  }, [canvas])

  useEffect(() => {
    const canvas = new fabric.Canvas('myCanvas')
    setCanvas(canvas)
  }, [])

  return (
      <div id="DrawPredict">
        <div id='CnavasDiv'>
          <div id='Canvas'><canvas id="myCanvas" width={300} height={300} /></div>
          <div id='ButtonContainer'>
            <Button variant="outline-secondary" onClick={ClearCanvas} disabled={loading}>Delete</Button>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button variant="outline-primary" onClick={Judge} disabled={loading}>
              {loading ? 'Loading………' : '🦁 Judge 🦁'}
            </Button>
          </div>
        </div>
        <div id='ChartDiv'>
          <Bar
            data={{
              labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
              datasets: [
                {
                  label: 'Probability',
                  data: predicted
                }
              ]
            }}
            options={options}
          />
        </div>
      </div>
  )
}
