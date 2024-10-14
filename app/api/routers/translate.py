from fastapi import APIRouter, FastAPI, Query

from app.api.schemas.formality_preference import FormalityPreference
from app.api.schemas.source_languages import SourceLangs
from app.api.schemas.target_languages import TargetLangs
from app.translation.translator import Translator

app = FastAPI()
router: APIRouter = APIRouter()

@router.post("/")
def translate(
        text: str,
        source_language: SourceLangs = Query(...),
        target_language: TargetLangs = Query(...),
        context: str | None = None,
        formality: FormalityPreference = Query(...)
    ):

    translator = Translator()

    # Call the translator function that interacts with the DeepL API
    translated_text = translator.deepl_translate(
        text=text,
        source_lang=source_language.value,
        target_lang=target_language.value,
        context=context,
        formality=formality.value
    )
    return {"translated_text": translated_text}

app.include_router(router)
