import deepl
import os
from dotenv import load_dotenv

load_dotenv()

auth_key = os.getenv("DEEPL_API_KEY")


class Translator:
    def __init__(self, target_language):
        self.target_language = target_language
        self.translator = deepl.Translator(auth_key)

    def deepl_translate(self, text: str):
        result = self.translator.translate_text(text, target_lang=self.target_language)
        return result


if __name__ == "__main__":
    translator_en = Translator(target_language="EN-US")
    translator_en.deepl_translate("Hola, me llamo Charlie. En este momento, estoy escribiendo un ejemplo de texto que se puede traducir con DeepL.")