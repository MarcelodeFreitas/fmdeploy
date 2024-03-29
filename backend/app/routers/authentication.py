from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from .. import database, models, token
from ..hashing import Hash
from sqlalchemy.orm import Session
from .. import oauth2, schemas

router = APIRouter(tags=["Authentication"])

get_db = database.get_db


@router.post("/login")
def login_user(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db),
):
    user = db.query(models.User).filter(models.User.email == request.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
        )
    if not Hash.verify(user.password, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials !"
        )

    access_token = token.create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    print(user.role)
    return {
        "access_token": access_token,
        "user_role": user.role,
        "token_type": "bearer",
    }


@router.get("/login")
async def get_login_info(data: str = Depends(oauth2.get_current_user)):
    return data
