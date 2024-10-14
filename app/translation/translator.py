import deepl
import os
from dotenv import load_dotenv

load_dotenv()

auth_key = os.getenv("DEEPL_API_KEY")


class Translator:
    """Class to manage the DeepL translator"""

    def __init__(self):
        self.translator = deepl.Translator(auth_key)

    def deepl_translate(self,
                        text: str,
                        source_lang: str,
                        target_lang: str,
                        context: str | None,
                        formality: str
    ):
        """
        Translate a body of text using DeepL
        :param text: the text to be translated
        :param source_lang: the language to translate from
        :param target_lang: the language to translate to
        :param context: context provided to the translator to aid in the translation
        :param formality: the desired formality of the translation
        """

        # Reassign source language to none if there is no preference
        if source_lang == "Any":
            source_lang = None

        # Call the DeepL translation and return the result
        result = self.translator.translate_text(
            text=text,
            source_lang=source_lang,
            target_lang=target_lang,
            context=context,
            formality=formality
        )
        return result
