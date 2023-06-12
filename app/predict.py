from tensorflow import keras
import cv2

# モデルをロード
model_1 = keras.models.load_model('./models/model-1.h5')
model_2 = keras.models.load_model('./models/model-2.h5')
model_3 = keras.models.load_model('./models/model-3.h5')

def predict(filename: str, modelId: int) -> dict:
    image = cv2.imread(filename)

    image = 255 - image

    image = image[:, :, 0].astype('uint8') # 0番目のチャンネルだけ取り出して，白黒画像にする。
    image = cv2.resize(image, dsize=(28, 28))
    image = image.astype('float32')
    image /= 255
    image = image.reshape(1, 28, 28, 1)

    # 画像を予測する。
    if modelId == 1:
        predictions = model_1.predict(image)[0]
    elif modelId == 2:
        predictions = model_2.predict(image)[0]
    elif modelId == 3:
        predictions = model_3.predict(image)[0]

    # 予測結果を格納するための連想配列を作成する。
    result = {}

    # 予測の確率を表示する。
    for i in range(10):
        result[i] = round(predictions[i] * 100)

    # 予測結果を返す。
    return result
