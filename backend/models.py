from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel, Field


class BlogPost(BaseModel):
    title: str
    content: str
    author: str
    created_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: Optional[datetime] = None
