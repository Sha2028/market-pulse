import os
import uvicorn
from fastapi import FastAPI
from starlette.responses import PlainTextResponse, JSONResponse

app = FastAPI()

PREFIX = os.environ.get('BASE_PATH', "")


@app.get(PREFIX + "/version", response_class=PlainTextResponse)
def version_response():
    version = os.environ.get('RELEASE_VERSION', '1')
    return version


@app.get(PREFIX + "/health", response_class=PlainTextResponse)
def health_response():
    return "Target is healthy"


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=3334)

