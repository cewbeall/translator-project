from fastapi import APIRouter, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.api.schemas.formality_preference import FormalityPreference
from app.api.schemas.glossary_languages import GlossaryLangs
from app.api.schemas.source_languages import SourceLangs
from app.api.schemas.target_languages import TargetLangs
from app.translation.translator import Translator

app = FastAPI()
router: APIRouter = APIRouter()

translator = Translator()

origins = [
    # TODO: Add url for deployed site
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# TODO: Change to pydantic model input
@router.post("/translate")
def translate(
        text: str,
        source_language: SourceLangs = Query(...),
        target_language: TargetLangs = Query(...),
        context: str | None = None,
        formality: FormalityPreference = Query(...),
        glossary_id: str | None = None
    ):

    # Call the translator function that interacts with the DeepL API
    translated_text = translator.deepl_translate(
        text=text,
        source_lang=source_language.value,
        target_lang=target_language.value,
        context=context,
        formality=formality.value,
        glossary_id=glossary_id
    )
    return {"translated_text": translated_text}


@router.post("/glossary")
def create_glossary(
        name: str,
        entries: dict[str, str],
        source_language: GlossaryLangs = Query(...),
        target_language: GlossaryLangs = Query(...),
    ):
    glossary_info = translator.create_deepl_glossary(
        name=name,
        entries=entries,
        source_lang=source_language,
        target_lang=target_language
    )
    return {"glossary_info": glossary_info}

@router.get("/glossary")
def get_glossaries():
    glossaries = translator.get_glossaries()
    return {"glossaries": glossaries}

@router.delete("/glossary")
def delete_glossary(glossary_id: str):
    translator.delete_glossary(glossary_id=glossary_id)

app.include_router(router)
