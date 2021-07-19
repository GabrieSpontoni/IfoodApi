require ('dotenv').config ({path: './.env.centralizado'})
const axios = require('axios');
const qs = require('qs')




const getToken = async () => {
    
    const config = {
        method: 'post',
        url : 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token',
        data:qs.stringify({
            grantType : 'client_credentials',
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
        }),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        

      }

      
    const result = await axios(config)
    return(result.data);
}


const getMerchants = async (accessToken) => {
    const config = {
        method:   'get',
        url: 'https://merchant-api.ifood.com.br/merchant/v1.0/merchants',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/x-www-form-urlencoded',
          }


    }
    const result = await axios(config)
    return(result);
}


const run = async() => {
    const token = await getToken();
    //console.log(token);
    
    const accessToken = token.accessToken;
    //console.log(accessToken);

    const merchants = await getMerchants(accessToken);
    console.log (merchants.data);


}
run()