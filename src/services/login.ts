import { Notify } from "../heslpers/notify"
import { loginAction } from "../store/reducers/authReducer"
import { store } from "../store/store"
import service from "./api"

export async function Login (user:{email: string, password: string}) {
    
try {
    const response = await service.post('/auth/login/',user)  
    store.dispatch(loginAction({
        token: response.data.token
    }))
    
    Notify({
        message: 'Login realizado com sucesso!',
        position: 'top-right',
        type: 'success'
    })




    return response.data
} catch (error) {
    console.log(error)
}
 
}

export async function Logout (user: {userId: number}) {
  return await service({
    url: '/auth/logout/',
    method: 'post',
    data: user
  })
}

export async function RefreshToken () {
  return await service({
    url: '/auth/refresh_token',
    method: 'post'
  })
}
