from enum import Enum


class SourceLangs(str, Enum):
    """Source language options for DeepL translation"""
    any = "Any"
    english_us = "EN-US"
    english_gb = "EN-GB"
    spanish = "ES"
    arabic = "AR"
    german = "DE"
    chinese_simplified = "ZH-HANS"
    chinese_traditional = "ZH-HANT"
    portuguese_br = "PT-BR"
    italian = "IT"
