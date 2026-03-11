from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import BlogPost
from database import post_collection
from bson import ObjectId
from bson.errors import InvalidId
from fastapi.exceptions import HTTPException
from pymongo.errors import PyMongoError

app = FastAPI()


def raise_db_unavailable(exc: PyMongoError) -> None:
    raise HTTPException(
        status_code=503,
        detail=f"Database unavailable: {exc}",
    ) from exc


def parse_object_id(post_id: str) -> ObjectId:
    try:
        return ObjectId(post_id)
    except InvalidId as exc:
        raise HTTPException(status_code=400, detail="Invalid post id") from exc

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Routes (create, read, update, delete)


@app.post("/posts/")
async def create_post(post: BlogPost):
    try:
        new_post = post.model_dump()
        result = await post_collection.insert_one(new_post)
        return {"id": str(result.inserted_id)}
    except PyMongoError as exc:
        raise_db_unavailable(exc)


@app.get("/posts/")
async def get_posts():
    try:
        posts = await post_collection.find().to_list(100)
        for post in posts:
            post["_id"] = str(post["_id"])
        return posts
    except PyMongoError as exc:
        raise_db_unavailable(exc)


@app.get("/posts/{post_id}")
async def get_post(post_id: str):
    try:
        post = await post_collection.find_one({"_id": parse_object_id(post_id)})
        if post:
            post["_id"] = str(post["_id"])
            return post
        raise HTTPException(status_code=404, detail="Post not found")
    except PyMongoError as exc:
        raise_db_unavailable(exc)


@app.put("/posts/{post_id}")
async def update_post(post_id: str, post: BlogPost):
    try:
        object_id = parse_object_id(post_id)
        result = await post_collection.update_one(
            {"_id": object_id},
            {"$set": post.model_dump(exclude_unset=True)}
        )
        if result.matched_count:
            return {"message": "Post updated"}
        raise HTTPException(status_code=404, detail="Post not found")
    except PyMongoError as exc:
        raise_db_unavailable(exc)


@app.delete("/posts/{post_id}")
async def delete_post(post_id: str):
    try:
        result = await post_collection.delete_one({"_id": parse_object_id(post_id)})
        if result.deleted_count:
            return {"message": "Post deleted"}
        raise HTTPException(status_code=404, detail="Post not found")
    except PyMongoError as exc:
        raise_db_unavailable(exc)
