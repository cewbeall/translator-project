from fastapi import APIRouter, FastAPI, Query

from app.api.schemas.target_languages import TargetLangs
from app.translation.translator import Translator

app = FastAPI()
router: APIRouter = APIRouter()

@router.post("/")
def translate(text: str, target_language: TargetLangs = Query(...)):
    translator = Translator(target_language.value)
    translated_text = translator.deepl_translate(text)
    return {"translated_text": translated_text}

app.include_router(router)
