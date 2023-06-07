import React from 'react'
import './loadingLogoPMS.scss'
import logo from './logo2.svg'

function LoadingLogoS() {
    return (
        <div className='testmodule'>

            <div className='loadingDemo'>
                <div className='loadingContainer'>
                    <div className="testmodule-item1">
                        <img height={15} src={logo}></img>
                    </div>
                    <div className="testmodule-item2"></div>
                    <div className="testmodule-item3"></div>
                    <div className="testmodule-item4"></div>
                </div>
            </div>

        </div>
    )
}

export default LoadingLogoS