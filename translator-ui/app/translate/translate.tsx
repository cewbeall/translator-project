import { Select, TextField, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import { type SelectChangeEvent } from '@mui/material/Select';
import React, {useState} from 'react';

// Defining an interface for passing props to the Select module from MUI
interface CustomSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
}

// Controls the interaction with the API
export function Translate() {
    const [phrase, setPhrase] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState("Any");
    const [targetLanguage, setTargetLanguage] = useState("EN-US");
    const [formality, setFormality] = useState("default");
    const [context, setContext] = useState("");

    const handleSourceLanguageChange = (event: SelectChangeEvent) => {
        setSourceLanguage(event.target.value)
    }

    const handleTargetLanguageChange = (event: SelectChangeEvent) => {
        setTargetLanguage(event.target.value)
    }

    const handleFormalityChange = (event: SelectChangeEvent) => {
        setFormality(event.target.value)
    }

    const swapSourceAndTarget = () => {
        // Save languages in vars before they are swapped
        var newSource
        var newTarget

        // Logic to check if the new language is available as source/target
        switch (sourceLanguage) {
            case 'Any':
                newTarget = 'EN-US'
                break
            case 'EN':
                newTarget = 'EN-US'
                break
            case 'PT':
                newTarget = 'PT-BR'
                break
            case 'ZH':
                newTarget = 'ZH-HANT'
                break
            default:
                newTarget = sourceLanguage

        }

        switch (targetLanguage) {
            case 'EN-US':
                newSource = 'EN'
                break
            case 'EN-GB':
                newSource = 'EN'
                break
            case 'PT-BR':
                newSource = 'PT'
                break
            case 'PT-PT':
                newSource = 'PT'
                break
            case 'ZH-HANT':
                newSource = 'ZH'
                break
            case 'ZH-HANS':
                newSource = 'ZH'
                break
            default:
                newSource = targetLanguage
        }

        // Swap the languages
        setSourceLanguage(newSource)
        setTargetLanguage(newTarget)
    }

    const requestTranslation = async (
        translationPhrase: string,
        sourceLanguage: string,
        targetLanguage: string,
        formality: string,
        context: string
    ) => {
        // End function if the text is empty
        if (!translationPhrase) {
            setPhrase("")
            return
        }

        const params = new URLSearchParams({
            text: translationPhrase,
            source_language: sourceLanguage,
            target_language: targetLanguage,
            formality: formality,
            context: context
        })
        const url = `http://localhost:9000/translate?${params.toString()}`

        // Send translation to API
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json()
            const translatedText = responseData["translated_text"]["text"]
            setPhrase(translatedText)
        } catch (error) {
            console.error("There was an error retrieving the translation.")
        }
    }

    return (
        <main>
            <div id="everything">
                <div id="banner">
                    <h1>
                        Translation Station
                    </h1>
                </div>
                <div id="translate-box-group">
                    <div id="selectors">
                        <div id="lang-selector">
                            <SourceLanguageSelector value={sourceLanguage} onChange={handleSourceLanguageChange}/>
                        </div>
                        <Button onClick={swapSourceAndTarget}>Switch</Button>
                        <div id="lang-selector">
                            <TargetLanguageSelector value={targetLanguage} onChange={handleTargetLanguageChange}/>
                        </div>
                    </div>

                    <div id="text-fields">
                        <div>
                            <TextField
                                id="outlined-basic"
                                label="Input"
                                variant="outlined"
                                multiline={true}
                                rows={3}
                                onChange={(e) => requestTranslation(e.target.value, sourceLanguage, targetLanguage, formality, context)}
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-basic"
                                label="Translation"
                                variant="outlined"
                                multiline={true}
                                rows={3}
                                value={phrase}
                            />
                        </div>
                    </div>
                    <div>
                        <FormalitySelector value={formality} onChange={handleFormalityChange}/>
                    </div>
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Context"
                            variant="outlined"
                            multiline={true}
                            rows={2}
                            onChange={(e) => setContext(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

// Controls the values of the translation formality
export const FormalitySelector: React.FC<CustomSelectProps> = ({ onChange, value }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="formality-select">Formality Level</InputLabel>
            <Select
                onChange={onChange}
                defaultValue="default"
            >
                <MenuItem value={"default"}>Default</MenuItem>
                <MenuItem value={"more"}>More Formal</MenuItem>
                <MenuItem value={"less"}>Less Formal</MenuItem>
                <MenuItem value={"prefer_more"}>Prefer More Formal</MenuItem>
                <MenuItem value={"prefer_less"}>Prefer Less Formal</MenuItem>
            </Select>
        </FormControl>
    )
}


// Controls the values of the source language
export const SourceLanguageSelector: React.FC<CustomSelectProps> = ({ onChange, value }) => {

    return (
        <FormControl fullWidth>
            <InputLabel id="lang-select">Source Language</InputLabel>
            <Select
                labelId="lang-select"
                label="language"
                defaultValue="Any"
                value={value}
                onChange={onChange}
            >
                <MenuItem value={"Any"}>Any</MenuItem>
                <MenuItem value={"AR"}>Arabic</MenuItem>
                <MenuItem value={"BG"}>Bulgarian</MenuItem>
                <MenuItem value={"CS"}>Czech</MenuItem>
                <MenuItem value={"DA"}>Danish</MenuItem>
                <MenuItem value={"DE"}>German</MenuItem>
                <MenuItem value={"EL"}>Greek</MenuItem>
                <MenuItem value={"EN"}>English</MenuItem>
                <MenuItem value={"ES"}>Spanish</MenuItem>
                <MenuItem value={"ET"}>Estonian</MenuItem>
                <MenuItem value={"FI"}>Finnish</MenuItem>
                <MenuItem value={"FR"}>French</MenuItem>
                <MenuItem value={"HU"}>Hungarian</MenuItem>
                <MenuItem value={"ID"}>Indonesian</MenuItem>
                <MenuItem value={"IT"}>Italian</MenuItem>
                <MenuItem value={"JA"}>Japanese</MenuItem>
                <MenuItem value={"KO"}>Korean</MenuItem>
                <MenuItem value={"LT"}>Lithuanian</MenuItem>
                <MenuItem value={"LV"}>Latvian</MenuItem>
                <MenuItem value={"NB"}>Norwegian</MenuItem>
                <MenuItem value={"NL"}>Dutch</MenuItem>
                <MenuItem value={"PL"}>Polish</MenuItem>
                <MenuItem value={"PT"}>Portuguese</MenuItem>
                <MenuItem value={"RO"}>Romanian</MenuItem>
                <MenuItem value={"RU"}>Russian</MenuItem>
                <MenuItem value={"SK"}>Slovak</MenuItem>
                <MenuItem value={"SL"}>Slovenian</MenuItem>
                <MenuItem value={"SV"}>Swedish</MenuItem>
                <MenuItem value={"TR"}>Turkish</MenuItem>
                <MenuItem value={"UK"}>Ukrainian</MenuItem>
                <MenuItem value={"ZH"}>Chinese</MenuItem>
            </Select>
        </FormControl>
    )
}

// Controls the values of the target language
export const TargetLanguageSelector: React.FC<CustomSelectProps> = ({ onChange, value }) => {

    return (
        <FormControl fullWidth>
            <InputLabel id="lang-select">Target Language</InputLabel>
            <Select
                labelId="lang-select"
                label="language"
                defaultValue="EN-US"
                value={value}
                onChange={onChange}
            >
                <MenuItem value={"AR"}>Arabic</MenuItem>
                <MenuItem value={"BG"}>Bulgarian</MenuItem>
                <MenuItem value={"CS"}>Czech</MenuItem>
                <MenuItem value={"DA"}>Danish</MenuItem>
                <MenuItem value={"DE"}>German</MenuItem>
                <MenuItem value={"EL"}>Greek</MenuItem>
                <MenuItem value={"EN-GB"}>English (UK)</MenuItem>
                <MenuItem value={"EN-US"}>English (US)</MenuItem>
                <MenuItem value={"ES"}>Spanish</MenuItem>
                <MenuItem value={"ET"}>Estonian</MenuItem>
                <MenuItem value={"FI"}>Finnish</MenuItem>
                <MenuItem value={"FR"}>French</MenuItem>
                <MenuItem value={"HU"}>Hungarian</MenuItem>
                <MenuItem value={"ID"}>Indonesian</MenuItem>
                <MenuItem value={"IT"}>Italian</MenuItem>
                <MenuItem value={"JA"}>Japanese</MenuItem>
                <MenuItem value={"KO"}>Korean</MenuItem>
                <MenuItem value={"LT"}>Lithuanian</MenuItem>
                <MenuItem value={"LV"}>Latvian</MenuItem>
                <MenuItem value={"NB"}>Norwegian (Bokmal)</MenuItem>
                <MenuItem value={"NL"}>Dutch</MenuItem>
                <MenuItem value={"PT-BR"}>Portuguese (Brazil)</MenuItem>
                <MenuItem value={"PT-PT"}>Portuguese (Portugal)</MenuItem>
                <MenuItem value={"RO"}>Romanian</MenuItem>
                <MenuItem value={"RU"}>Russian</MenuItem>
                <MenuItem value={"SK"}>Slovak</MenuItem>
                <MenuItem value={"SL"}>Slovenian</MenuItem>
                <MenuItem value={"SV"}>Swedish</MenuItem>
                <MenuItem value={"TR"}>Turkish</MenuItem>
                <MenuItem value={"UK"}>Ukranian</MenuItem>
                <MenuItem value={"ZH-HANT"}>Chinese (Traditional)</MenuItem>
                <MenuItem value={"ZH-HANS"}>Chinese (Simplified)</MenuItem>
            </Select>
        </FormControl>
    )
}