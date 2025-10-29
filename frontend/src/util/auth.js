import {redirect} from "react-router-dom";

export function getToken(){
    const token =  localStorage.getItem('token');
    if(!token) {
        return null;
    }
    const duration = Expiration();
    if(duration < 0) {
        return 'EXPIRED';
    }
    return token;
}
export function loader(){
    const token = getToken();
    if(!token){
        return redirect('/auth?mode=login');
    }
    return null;
}
export function tokenLoader(){
    return getToken();
}

export function Expiration(){
    const expiration = localStorage.getItem('expiration');
    const expirationDate = new Date(expiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}