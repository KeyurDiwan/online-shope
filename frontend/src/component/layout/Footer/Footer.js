import React from 'react';
import './Footer.css'
// import playStore from '../../../images/playStore.png';
// import appStore from '../../../images/appStore.png';

function Footer() {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download app from playStore </h4>
                <p>Download app for android and ios mobile.</p>
                {/* <img src = {playStore} alt = "playstore" /> */}
                {/* <img src = {appStore} alt = "appstore" /> */}
            </div>

            <div className="midFooter">
                <h1> Developed by Keyur Diwan</h1>
                <p>Copyrights 2022 &copy; Keyur Diwan</p>
            </div>

            <div className="rightFooter">
                <h3> connect me</h3>
                <h2>Linkedin</h2>  
                <h2>Linkedin</h2>
                <h2>Linkedin</h2>
            </div>
        </footer>
    );
};

export default Footer;
