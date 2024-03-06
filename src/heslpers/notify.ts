import {  toast } from 'react-toastify';


type NotifyProps = {
    position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left',
    type: 'info' | 'success' | 'warning' | 'error' | 'default',
    // progress: boolean,;
    message: string
}

export function Notify(params: NotifyProps){
    toast(params.message, {
        position: params.position,
        type: params.type
    })
}