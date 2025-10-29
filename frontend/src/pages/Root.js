import {Outlet, useNavigation, useRouteLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {Expiration} from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
    const token = useRouteLoaderData('root-layout');
    const submit = useSubmit();
    useEffect(() => {

        if(!token){
            return ;
        }

        if(token === 'EXPIRED'){
            submit(null,{action : '/logout',method : 'post'});
            return ;
        }
        const duration = Expiration();

        setTimeout(() =>{
            submit(null,{action : '/logout',method : 'post'});
        }, duration)

    }, [token,submit]);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
