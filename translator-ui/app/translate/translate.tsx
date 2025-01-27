import { TextField } from "@mui/material";

export function Translate() {
    return (
        <main>
            <div>
                <div id="banner"></div>
                <h1>
                    Hello there, ready to translate?
                </h1>
                <div id="translate-box-group">
                    <div id="input">
                        <div id="input-lang-selector"></div>
                        <div>
                            <TextField id="outlined-basic" label="Input" variant="outlined" />
                        </div>
                    </div>

                    <div id="output">
                        <div id="output-lang-selector"></div>
                        <div>
                            <TextField id="outlined-basic" label="Translation" variant="outlined" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}