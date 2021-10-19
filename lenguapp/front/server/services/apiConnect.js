const API_KEY = process.env.API_KEY
const CloudmersiveNlpApiClient = require('cloudmersive-nlp-api-client');
const defaultClient = CloudmersiveNlpApiClient.ApiClient.instance;

// Configure API key authorization: Apikey
const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = API_KEY;
console.log(API_KEY)


//instance de la translation
const apiInstance =  new CloudmersiveNlpApiClient.LanguageTranslationApi();


function make_request (data) {
    /*const data = {
        "textToTranslate" : "Hello, How are you?"
    }*/
    console.log("in main request")
    console.log(data)
    const input = new CloudmersiveNlpApiClient.LanguageTranslationRequest(data); 


    const callback = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ' + data);
    }
    };
    
    console.log("request done")
    return apiInstance.languageTranslationTranslateEngToDeu(input, callback);
    
}


module.exports = make_request