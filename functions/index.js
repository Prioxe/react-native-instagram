const functions = require('firebase-functions');
const cors = require('cors')({ origin: true }) 
//Liberando para varios dispositivos.
const fs = require('fs') //Trabalhando com arquivos node mesmo.
const uuid = require('uuid-v4') // indenticiador unico.
const { Storage } = require('google-cloud/storage')
const storage = new Storage({
    projectId: 'lambe-react-native-code',
    keyFilename: 'lambe-react-native-code-firebase.json'
})



exports.uploadImage = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
