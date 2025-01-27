import deepl
import os
from dotenv import load_dotenv

load_dotenv()

auth_key = os.getenv("DEEPL_API_KEY")


class Translator:
    """Class to manage the DeepL translator"""

    def __init__(self):
        self.translator = deepl.Translator(auth_key)

    def deepl_translate(
            self,
            text: str,
            source_lang: str,
            target_lang: str,
            context: str | None,
            formality: str,
            glossary_id: str | None
    ):
        """
        Translate a body of text using DeepL
        :param text: the text to be translated
        :param source_lang: the language to translate from
        :param target_lang: the language to translate to
        :param context: context provided to the translator to aid in the translation
        :param formality: the desired formality of the translation
        :param glossary_id: the ID of the desired glossary
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
            formality=formality,
            glossary=glossary_id
        )
        return result

    def create_deepl_glossary(
            self,
            name: str,
            source_lang: str,
            target_lang: str,
            entries: dict[str, str]
        ):
        """
        Create a glossary: a mapping of customizable translations
        :param name: Name of the glossary
        :param source_lang: Language to map from
        :param target_lang: Language to map to
        :param entries: Glossary mappings between the source and target languages
        """
        return self.translator.create_glossary(
            name=name,
            source_lang=source_lang.value,
            target_lang=target_lang.value,
            entries=entries
        )

    def get_glossaries(self):
        """Get all glossaries"""
        return self.translator.list_glossaries()

    def delete_glossary(self, glossary_id: str):
        """
        Delete specified glossary
        :param glossary_id: id of the glossary to delete
        """
        self.translator.delete_glossary(glossary=glossary_id)
