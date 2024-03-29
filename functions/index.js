const functions = require('firebase-functions');
const cors = require('cors')({ origin: true }) 
//Liberando para varios dispositivos.
const fs = require('fs') //Trabalhando com arquivos node mesmo.
const uuid = require('uuid-v4') // indenticiador unico.
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'lambe-react-native-code',
    keyFilename: 'lambe-react-native-code-firebase.json'
})



exports.uploadImage = functions.https.onRequest((request, response) => {
 cors(request, response, () => {
     try{
         fs.writeFileSync('/tmp/imageToSave.jpg',
             request.body.image, 'base64')

        const bucket = storage.bucket('lambe-react-native-code.appspot.com')
        const id = uuid()
        bucket.upload('/tmp/imageToSave.jpg', {
            uploadType: 'media',
            destination: `/posts/${id}.jpg`,
            metadata:{
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: id
                }
            }
        }, (err,file) =>{
            if (err) {
                console.log(err)
                return response.status(500).json({ error: err})
                }  else {
                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b'
                        + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                    return response.status(201).json({ imageUrl : imageUrl })    
                }
         })
     } catch (err) {
         console.log(err)
         return response.status(500).json({ error: err})
     }
     
    })
});
