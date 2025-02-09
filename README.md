# translator-project

## About
This project is an application that performs translation on bodies of text using DeepL via a wrapper API.

## How to start
1. Clone this repo
2. Sign up for a DeepL account (free tier) [here](https://www.deepl.com/en/pro/change-plan?utm_source=github&utm_medium=github-python-readme#developer) and copy the generated API key to a `.env` file.
3. Go to the backend directory of the repo
```
cd translator
```
3. run `pip install .` to install all dependencies
```
pip install .
```
4. Run `make start` to build the app's image and start the docker container
```
make start
```
5. Navigate to the FastAPI docs [here](http://localhost:9000/docs#/)
6. Go to the frontend directory of the repo
```
cd ../translator-ui
```
7. Start the application
```
npm run dev
```
8. Navigate to the webpage at http://localhost:3000/translate

## How to use
* Translate a body of text
    * Submit text to the translator in FastAPI, receive the translation result in the target language
* Specify other parameters
    * Source language: from the list of source languages, or can be left up to the translation tool to detect the source language
    * Target language: from the list of target languages, must be specified
    * Formality: the desired level of formality of the translation for the target language 
    * Context: extra information can be submitted along with the text to help the translation tool perform a more accurate translation. The context is not translated and does not bill any characters to DeepL
* Glossary: see below (only via FastAPI)
    * Create, read, or delete a Glossary
    * Creates a mapping between words to override the DeepL translations
    * Users can create their own glossaries and instruct the text translator to use it
