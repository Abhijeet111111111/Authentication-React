import AuthForm from '../components/AuthForm';
import {redirect} from "react-router-dom";
import {getToken} from "../util/auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request,params}){
    const data = await request.formData();
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode');
    const authForm = {
        email : data.get('email'),
        password : data.get('password')
    }
    if(mode !== 'login' && mode !== 'signup'){
        throw new Response(JSON.stringify({message : 'dont do that !'}),{status : 500});
    }
    const response = await fetch('http://localhost:8080/' + mode,{
        method : 'POST',
        body : JSON.stringify(authForm),
        headers : {
            'Content-Type' : 'application/json',
        }
    });
    if(response.status === 401){
        return response;
    }
    else if(response.status === 422){
        return response;
    }

    if(!response.ok){
        throw new Response(JSON.stringify({message : "oh something is wrong!"}),{status : 500});
    }
    const res = await response.json();
    localStorage.setItem('token' , res.token);
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 10);
    localStorage.setItem('expiration',expiration.toISOString());

    return redirect('/');
}