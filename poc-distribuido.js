require ('dotenv').config ({path : './.env.distribuido'})
const axios = require ('axios');
const qs = require ('qs')



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
    // const authorizationCodeVerifier = '4xb2olocytw306hjlfz4f1m5qvyl5wkl0xuiu71b2kfzcgdckfhye6pu9k2ecccvc6cekbrcceop41zm2mvplbixb5kl2mir27a'
    // const codeApp = 'LSHN-BMLP'
    // const token = await getToken(authorizationCodeVerifier, codeApp);
    // console.log(token.data)
    // accessToken = token.data.accessToken
    // console.log (accessToken)


    accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI3NjNjZjZhMy02Yjk3LTQzODAtOGE4Ni1iOTZlNDkwOGUyZmUiLCJhcHBfbmFtZSI6InNwb250b25pdGVzdGVkIiwiYXVkIjpbIm1lcmNoYW50IiwiY2F0YWxvZyIsImZpbmFuY2lhbCIsInJldmlldyIsIm9yZGVyIiwib2F1dGgtc2VydmVyIl0sIm93bmVyX25hbWUiOiJnYWJyaWVsc3BvbnRvbmlkb2VzcGlyaXRvc2FudG8iLCJzY29wZSI6WyJtZXJjaGFudCIsImNhdGFsb2ciLCJyZXZpZXciLCJvcmRlciIsImNvbmNpbGlhdG9yIl0sImlzcyI6ImlGb29kIiwidHlwZSI6ImNvbXBhY3QiLCJleHAiOjE2MjY4MzEwNzgsImlhdCI6MTYyNjgwOTQ3OCwianRpIjoiZGVkOTkyYjctM2VhOC00ZTA0LWIyNGQtZTc2NWExMjkyMzI3IiwibWVyY2hhbnRfc2NvcGVkIjp0cnVlLCJjbGllbnRfaWQiOiI5YzkxMGU1ZC00MDYzLTRiYWQtYjY3Mi0yNmVlM2EzZjNmNWMifQ.NzAJDy4DU3hCn7fdYgote1n5F6GS9iJLjdhLgS11rCnRc_wlwGpgu48wECfKmBKvceyT60tR5Dj7kFkWx-t1VBWInsUk3hTbVgYmQ_roXxC381K-hJeUffIKxlVmWig4PCNxdHoGU_k1APJGgk4BJ3OIrNQ4ijhDWDm5OxNpK-Q';
    //3 - trabalhar na api
    const merchants = await getMerchants(accessToken);
    //console.log (merchants.data);

    const polling = await getPolling(accessToken);
    //console.log (polling.data)


    const orderId = 'b6edc320-7e24-4785-b896-fa68ce11e375'
    const driver = await requestDriver(accessToken,orderId);
    console.log(driver.status, driver.statusText);
    


}
run();