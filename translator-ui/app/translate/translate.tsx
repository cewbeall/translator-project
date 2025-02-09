import { Select, TextField, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import {useState} from 'react';

export function Translate() {
    const [phrase, setPhrase] = useState("");

    const requestTranslation = async (
        translationPhrase: string,
        sourceLanguage: string = 'EN',
        targetLanguage: string = 'ES',
        formality: string = 'default'
    ) => {

        const params = new URLSearchParams({
            text: translationPhrase,
            source_language: sourceLanguage,
            target_language: targetLanguage,
            formality: formality
        })
        const url = `http://localhost:9000/translate?${params.toString()}`

        // Send translation to API
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                //     text: translationPhrase,
                //     source_language: sourceLanguage,
                //     target_language: targetLanguage,
                //     formality: formality
                // })
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
                            <LanguageSelector 
                                sourceOrTarget={"Source"}
                            />
                        </div>
                        <Button>Switch</Button>
                        <div id="lang-selector">
                            <LanguageSelector
                                sourceOrTarget={"Target"}
                            />
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
                                onChange={(e) => requestTranslation(e.target.value)}
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
                </div>
            </div>
        </main>
    )
}

function LanguageSelector({sourceOrTarget}: {sourceOrTarget: string}) {
    // const [sourceLanguage, setSourceLanguage] = useState("")
    // const [targetLanguage, setTargetLanguage] = useState("")

    return (
        <FormControl fullWidth>
            <InputLabel id="lang-select">{sourceOrTarget} Language</InputLabel>
            <Select
                labelId="lang-select"
                label="language"
            >
                <MenuItem value={"EN"}>English</MenuItem>
                <MenuItem value={"SP"}>Spanish</MenuItem>
                <MenuItem value={"IT"}>Italian</MenuItem>
            </Select>
        </FormControl>
    )
}