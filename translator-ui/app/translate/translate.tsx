import { Select, TextField, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import {useState} from 'react';

export function Translate() {
    const [phrase, setPhrase] = useState("");

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
                            <LanguageSelector sourceOrTarget={"Source"}/>
                        </div>
                        <Button>Switch</Button>
                        <div id="lang-selector">
                            <LanguageSelector sourceOrTarget={"Target"}/>
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
                                onChange={(e) => setPhrase(e.target.value)}
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
    return (
        <FormControl fullWidth>
            <InputLabel id="source-lang-select">{sourceOrTarget} Language</InputLabel>
            <Select
                labelId="source-lang-select"
                label="SourceLanguage"
            >
                <MenuItem value={"EN"}>English</MenuItem>
                <MenuItem value={"SP"}>Spanish</MenuItem>
                <MenuItem value={"IT"}>Italian</MenuItem>
            </Select>
        </FormControl>
    )
}