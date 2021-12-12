from typing import Optional

from fastapi import FastAPI

from config import client_id, client_secret, redirect_uri

app = FastAPI(root_path="/api/v1")


@app.get("/login")
def read_root():
    return { client_id, client_secret, redirect_uri}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
