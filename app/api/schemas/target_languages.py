from enum import Enum


class TargetLangs(str, Enum):
    english_us = "EN-US"
    english_gb = "EN-GB"
    spanish = "ES"
    arabic = "AR"
    geman = "DE"
    chinese_simplified = "ZH-HANS"
    chinese_traditional = "ZH-HANT"
    portuguese_br = "PT-BR"
    italian = "IT"