require ('dotenv').config ({path: './.env.centralizado'})
const axios = require('axios');
const qs = require('qs')


//link sobre como pedir autorizacao : https://www.youtube.com/watch?v=vBVzMfejxgY&ab_channel=iFoodDeveloper




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

const getPolling = async (accessToken) => {
    const config = {
        method : 'get',
        url: 'https://merchant-api.ifood.com.br/order/v1.0/events:polling?types=PLC%2CREC%2CCFM&groups=ORDER_STATUS%2CDELIVERY',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const result = await axios(config)
    return(result);
}


const requestDriver = async (accessToken,orderId) => {
    const config = {
        method: 'post',
        url:   'https://merchant-api.ifood.com.br/order/v1.0/orders/'+orderId+'/requestDriver',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const result = await axios(config)
    return(result);
}


const run = async() => {
    const token = await getToken();
    //console.log(token);
    
    const accessToken = token.accessToken;
    console.log(accessToken);

    const merchants = await getMerchants(accessToken);
    //console.log (merchants.data);

    const polling = await getPolling(accessToken);
    console.log (polling.data)

    const orderId = 'e34a3a9d-2af7-458a-a009-4b44147c6965'
    const driver = await requestDriver(accessToken,orderId);
    console.log(driver.status, driver.statusText);


}
run()
