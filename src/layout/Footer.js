import React from 'react'
import playstore1 from '../images/playstore1.png';
import appstore1 from '../images/appstore1.png';

export default function Footer() {
  return (
    <div >
         <div className="footer">
          <div className="container">
            <div className="row">
              <div className="footer-col-1">
                <h3>Download Our App</h3>
                <p>Download App for Android and ios mobile phone. </p>
                <div className="app-logo">
                  <img src={playstore1} alt="img" />

                  <img src={appstore1} alt="img" />
                </div>
              </div>
              <div className="footer-col-2">
                <h1>Emapris</h1>
                <p>
                  Our purpose is to sustainably make the pleasure and benefits
                  of shopping accessible to the people.{' '}
                </p>
              </div>
              <div className="footer-col-3">
                <h3>Useful Links</h3>
                <ul>
                  <li>coupons</li>
                  <li>Blog Post</li>
                  <li>Return Policy</li>
                  <li>Join Affiliate</li>
                </ul>
              </div>
              <div className="footer-col-4">
                <h3>Follow us on</h3>
                <ul>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>Intstagram</li>
                  <li>YouTube</li>
                </ul>
              </div>
            </div>
            <hr />
            <p className="copyright">All right reserved</p>
          </div>
        </div>
    </div>
  )
}
