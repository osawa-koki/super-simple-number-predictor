# super-simple-number-predictor

💤💤💤 手書き文字を識別するサンプルプログラム。  

## 実行方法

```shell
docker build -t super-simple-number-predictor .
docker run -it --rm -p 8000:8000 --name super-simple-number-predictor super-simple-number-predictor
```

## モデルの生成

以下のコードを実行すると、モデルが生成されます。  

```python
import tensorflow as tf
import numpy as np

# MNISTデータセットをロードします
mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# 画像データを正規化する
x_train = x_train / 255.0
x_test = x_test / 255.0

# ラベルをone-hotエンコーディングする
y_train = np.eye(10)[y_train]
y_test = np.eye(10)[y_test]

# モデルを構築する
model = tf.keras.Sequential()
model.add(tf.keras.layers.Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2)))
model.add(tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation='relu'))
model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2)))
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(128, activation='relu'))
model.add(tf.keras.layers.Dense(10, activation='softmax'))

# モデルをコンパイルする
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# モデルを学習させる
model.fit(x_train, y_train, epochs=⭐️エポック数⭐️, batch_size=64)

# モデルをテストする
loss, accuracy = model.evaluate(x_test, y_test)
print('loss:', loss)
print('accuracy:', accuracy)

model.save("⭐️モデル名⭐️.h5")
```

エポック数は、以下の3種類で設定しました。  

- Model-1: 1
- Model-2: 10
- Model-3: 100
