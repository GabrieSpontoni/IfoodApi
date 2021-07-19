require ('dotenv').config ({path: './.env.centralizado'})
const express = require('express')
const axios = require('axios');
const qs = require('qs')

const app = express();



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

const run = async() => {
    const token = await getToken();
    console.log(token);
}
run()