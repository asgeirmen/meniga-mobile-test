# Meniga Mobile Test
This repository is a proof of concept on how to package Meniga ReactJS frontend as React Native app. 

```mermaid
graph TD;
    subgraph  React Native
    Start(Start)
    HasRefreshToken{Has refresh token?}
    Landing(Landing screen)
    RefreshTokenLogin[Refresh token login]
    SuccessfulLogin[Successful Login]
    UseTokens[Use tokens]
    WebView[WebView]
    DeviceLoginMethod[DeviceLoginMethod]
    HasRefreshToken-->|Get refreshToken| HasRefreshToken
    Start-->HasRefreshToken
    HasRefreshToken-->|No| Landing
    HasRefreshToken-->|Yes| DeviceLoginMethod
    Landing-->Login(Login)
    Landing-->Register(Register)
    Login-->ToSts[Redirect to STS]
    UseTokens-->|Store refreshToken| UseTokens
    UseTokens-->|accessToken| WebView
    DeviceLoginMethod-->|PIN| CheckPin
    DeviceLoginMethod-->|FaceId| CheckFaceId
    CheckPin-->|Success| RefreshTokenLogin
    CheckFaceId-->|Success| RefreshTokenLogin
    end

    subgraph STS
    StsLogin(Login)
    StsLogin --> IsStsLoginOk
    IsStsLoginOk{Login Successful?}
    TokensFromCode[Tokens from code]
    TokensFromRefreshToken[Tokens from refresh token]
    end

    ToSts-->StsLogin(Sts login)
    IsStsLoginOk-->|Yes - Redirect with code| SuccessfulLogin
    SuccessfulLogin-.->|code| TokensFromCode
    TokensFromCode-.-> |accessToken, refreshToken| UseTokens
    RefreshTokenLogin-->|refreshToken| TokensFromRefreshToken
    TokensFromRefreshToken-.-> |accessToken, refreshToken| UseTokens
    
```

Links:
* https://medium.com/swlh/how-to-build-a-react-native-app-with-react-website-and-webview-2ae53594dc07
* https://docs.expo.dev/guides/authentication/#identityserver-4
* https://github.com/daoodaba975/exlogrn/
* https://dev.to/allanloji/setting-up-biometric-login-on-your-react-native-app-4903
* https://www.alto.com/blog/post/part-1-implementing-biometric-login
* https://blog.logrocket.com/implementing-react-native-biometric-authentication-expo/
* https://docs.expo.dev/versions/latest/sdk/local-authentication/
* https://github.com/expo/expo/issues/21694
* https://docs.expo.dev/develop/development-builds/create-a-build/
* https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionexchangecodeasyncconfig-discovery
* https://github.com/FusionAuth/fusionauth-quickstart-react-native/
