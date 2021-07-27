require ('dotenv').config ({path : './.env.distribuido'})
const axios = require ('axios');
const qs = require ('qs')


//link para pedir autorizacao : https://www.youtube.com/watch?v=fzjOrxH5olk&ab_channel=iFoodDeveloper


const userCode = async () => {

    const config = {
        method: 'post',
        url: 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/userCode',
        data: qs.stringify({
            clientId: process.env.clientId,
        }),
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
        },
    }

    const result = await axios (config);
    return (result);
}


const getToken = async (authorizationCodeVerifier,codeApp) => {
    const config = {
        method: 'post',
        url: 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token',
        data:qs.stringify({
            grantType : 'authorization_code',
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            authorizationCode: codeApp,
            authorizationCodeVerifier: authorizationCodeVerifier,
            
        }),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },

    }
    const result = await axios(config);
    return (result);
}

const tokenRefresh = async (refreshToken) => {
    const config = {
        method: 'post',
        url: 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token',
        data:qs.stringify({
            grantType : 'refresh_token',
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
            refreshToken: refreshToken,
            
        }),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },

    }
    const result = await axios(config);
    return (result);
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
        url:   'https://merchant-api.ifood.com.br/order/v1.0/orders/'+ orderId +'/requestDriver',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const result = await axios(config)
    return(result);
}



const run = async () => {

    //1 - gerar codigo de usuario
    // const codeUser = await userCode();
    // console.log (codeUser.data);

    //2 - gerar token unico
    // const authorizationCodeVerifier = 'kotm8nvv8wzfd014rbovssht47if0sx62ntkgtsk6shc0cbwhxn68y9zm1bjaa43t1hekyyh7iom0pxdn6houp2odyw4lljfrdq'
    // const codeApp = 'HTHS-VWPW'
    // const token = await getToken(authorizationCodeVerifier, codeApp);
    // console.log(token.data)
    // accessToken = token.data.accessToken
    // console.log (accessToken)


    refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI3NjNjZjZhMy02Yjk3LTQzODAtOGE4Ni1iOTZlNDkwOGUyZmUiLCJpc3MiOiJpRm9vZCIsImV4cCI6MTYyODAxMDk0NSwiaWF0IjoxNjI3NDA2MTQ1LCJjbGllbnRfaWQiOiI5YzkxMGU1ZC00MDYzLTRiYWQtYjY3Mi0yNmVlM2EzZjNmNWMifQ.ZM0PIdYCuODLfpfb9jMRbQQ_sy2PQR2VWkEW51v6Rp7HDHvFvFyAOva-U0YO2I-tdqyVB1wSJYlc4GnGIQnyO0yz_frasTph0kj2hahIabnhVAyiETfI86ICZF_Xu1wv_NkXqBMm-9d3JfRusjwgaCie1AK8FhV7wKI2dG5fN_Q'
  
    //3- Obter novo token de acesso com refreshToken
    const newToken = await tokenRefresh(refreshToken);
    console.log(newToken.data)
    accessToken = newToken.data.accessToken;
    //4 - trabalhar na api
    const merchants = await getMerchants(accessToken);
    console.log (merchants.data);

    // const polling = await getPolling(accessToken);
    // //console.log (polling.data)


    // const orderId = 'e34a3a9d-2af7-458a-a009-4b44147c6965'
    // const driver = await requestDriver(accessToken,orderId);
    // console.log(driver.status, driver.statusText);
    


}
run();