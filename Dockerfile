FROM node:20 as client
WORKDIR /src
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install
COPY ./client ./
RUN yarn build

FROM python:3.11 as server
EXPOSE 8000
WORKDIR /app
RUN pip install poetry && poetry config virtualenvs.create false
COPY pyproject.toml poetry.lock ./
RUN poetry install
COPY . .
COPY --from=client /src/dist /app/www
CMD ["poetry", "run", "python", "./app/main.py"]
