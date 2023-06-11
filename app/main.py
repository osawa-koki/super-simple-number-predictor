from fastapi import FastAPI, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid

# from predict import predict

app = FastAPI()

# CORSを許可する。
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

# @app.post("/api/numeric-judge")
# def receive_image(image: bytes = File(...)):
#     # GUIDを生成する。
#     guid = uuid.uuid4()
#     # GUIDを小文字に変換する。
#     guid = guid.hex.lower()

#     # ファイル名を定義する。
#     filename = f"./tmp/{guid}.png"

#     # 画像を保存する。
#     with open(filename, "wb") as f:
#         f.write(image)

#     # 画像を予測する。
#     result = predict(filename)

#     # 予測結果を返す。
#     return result

# # Serve static files from the "www" directory and set index.html as the default file
# app.mount("/api", app)
# app.mount("/", StaticFiles(directory="www", html=True), name="www")

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
