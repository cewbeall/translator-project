from enum import Enum


class GlossaryLangs(str, Enum):
    """Source language options for DeepL translation"""
    danish = "DA"
    german = "DE"
    english = "EN"
    spanish = "ES"
    french = "FR"
    italian = "IT"
    japanese = "JA"
    korean = "KO"
    norwegian_bokmal = "NB"
    dutch = "NL"
    polish = "PL"
    portuguese = "PT"
    romanian = "RO"
    russian = "RU"
    swedish = "SV"
    chinese = "ZH"