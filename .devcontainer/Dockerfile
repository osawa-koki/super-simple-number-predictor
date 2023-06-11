FROM python:3.11
WORKDIR /app
RUN apt update -y && \
    # OpenCVを使用するために必要。
    apt install libgl1-mesa-dev -y && \
    pip install poetry
