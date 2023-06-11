FROM python:3.11
EXPOSE 8000
WORKDIR /app
RUN pip install poetry && poetry config virtualenvs.create false
COPY pyproject.toml poetry.lock ./
COPY . .
RUN poetry install
CMD ["python", "./app/main.py"]
