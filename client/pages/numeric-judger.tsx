import React, { useState, useEffect } from 'react';
import { fabric } from "fabric";
import Button from 'react-bootstrap/Button';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  ...registerables,
);

const options = {
  scales: {
    y: {
      ticks: {
        callback: function(value: number, _: any) {
          return `${value} %`;
        },
      },
    },
  },
};

function MyDrawing() {

  const [canvas, setCanvas] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [predicted, setPredicted] = useState<number[]>([]);

  const ClearCanvas = () => {
    canvas.remove.apply(canvas, canvas.getObjects());
    canvas.backgroundColor = 'white';
  }

  const Judge = async () => {
    try {
      setPredicted([]);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 10)); // ちょっと待つ
      // 画像をバイナリに変換
      // create a new canvas element to store the data
      const dataCanvas = document.createElement('canvas');
      dataCanvas.width = canvas.getWidth();
      dataCanvas.height = canvas.getHeight();

      // copy the data from the original canvas to the new canvas
      const ctx = dataCanvas.getContext('2d');
      ctx.drawImage(canvas.getElement(), 0, 0);

      // get the data from the new canvas as a binary data
      const data = dataCanvas.toDataURL('image/png');
      const binaryData = atob(data.split(',')[1]);
      const buffer = new Uint8Array(binaryData.length);
      for (var i = 0; i < binaryData.length; i++) {
        buffer[i] = binaryData.charCodeAt(i);
      }
      // Blobを作成
      const blob = new Blob([buffer.buffer]);

      // Create a new FileReader
      const reader = new FileReader();

      // Add an event listener for when the file is loaded
      reader.addEventListener("load", function () {
        const imageBytes = new Uint8Array(reader.result as ArrayBuffer);
        // Create FormData object
        const formData = new FormData();
        formData.append('image', new File([imageBytes], "image.png", { type: "image/png" }));
        // Perform the fetch request
        fetch('/api/numeric-judge', {
          method: 'POST',
          body: formData,
        })
        .then(res => res.json())
        .then(data => {
          let predicted: number[] = [];
          for (let i = 0; i < 10; i++) {
            predicted.push(data[i]);
          }
          setPredicted(predicted);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
      }, false);

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(blob);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    if (canvas === null) return;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width=10;
    canvas.freeDrawingBrush.color="black";
    canvas.isDrawingMode = true;
    ClearCanvas();
  }, [canvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas('myCanvas');
    setCanvas(canvas);
  }, []);

  return (
    <div id='NumericJudger'>
      <div id='CnavasDiv'>
        <div id='Canvas'><canvas id="myCanvas" width={300} height={300} /></div>
        <div id='ButtonContainer'>
          <Button variant="outline-secondary" onClick={ClearCanvas} disabled={loading}>Delete</Button>
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
                data: predicted,
              }
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default MyDrawing;
