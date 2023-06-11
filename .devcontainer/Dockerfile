FROM python:3.11
WORKDIR /app
RUN apt update -y && \
    # OpenCVを使用するために必要。
    apt install libgl1-mesa-dev -y && \
    # 判定プログラムの動作確認用。
    apt install jq -y && \
    pip install poetry
