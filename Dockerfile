FROM node:20 as client
WORKDIR /src
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install
COPY ./client ./
RUN yarn build

FROM python:3.11 as server
EXPOSE 8000
WORKDIR /app
RUN apt update -y && apt install libgl1-mesa-dev -y
RUN pip install poetry && poetry config virtualenvs.create false
COPY pyproject.toml poetry.lock ./
COPY . .
RUN poetry install
COPY --from=client /src/dist /app/www
CMD ["poetry", "run", "python", "./app/main.py"]
