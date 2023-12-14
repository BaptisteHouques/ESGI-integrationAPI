import {toastHandler} from "@/helper/toastHandler";

export function translateText (text) {
    const PAT = import.meta.env.VITE_PAT;
    const USER_ID = 'openai';
    const APP_ID = 'chat-completion';
    const MODEL_ID = 'GPT-3_5-turbo';
    const MODEL_VERSION_ID = '4471f26b3da942dab367fe85bc0f7d21';

    const language = localStorage.getItem('selectedLanguage')

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "text": {
                        "raw": "Translate the following into " + language + ", return only the translation: " + text
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status.description !== 'Ok') {
                console.log(result)
                toastHandler('error', result.status.description)
            }
            else {
                console.log(result)
                // Traitement du résultat pour extraire les tags
                return result.outputs[0].data.text.raw;
            }
        })
        .catch(error => {
            console.log('error', error)
            return []
        });
}