import React from 'react'
import AppNavbar from '../../../components/Navigation/AppNavbar';

function Layout() {

    return(
            <div className="Content">
                <AppNavbar />
                <main>
                    {props.children}
                </main>
            </div>
        )
    
}
export default Layout;