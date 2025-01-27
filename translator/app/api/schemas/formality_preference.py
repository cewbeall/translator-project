from enum import Enum


class FormalityPreference(str, Enum):
    """List of options when selecting formality of DeepL translation"""
    default = "default"
    more = "more"
    less = "less"
    prefer_more = "prefer_more"
    prefer_less = "prefer_less"
