// import React from 'react'
// import playstore1 from '../images/playstore1.png';
// import appstore1 from '../images/appstore1.png';
// import { Link } from 'react-router-dom';
// import emalogo from "../images/emalogo.png"

// export default function Footer() {
//   return (
//     <div >
//          <div className="footer">
//           <div className="container">
//             <div className="row">
//               <div className="footer-col-1">
//                 <h3>Download Our App</h3>
//                 <p>Download App for Android and ios mobile phone. </p>
//                 <div className="app-logo">
//                   <img src={playstore1} alt="img" />

//                   <img src={appstore1} alt="img" />
//                 </div>
//               </div>
//               <div className="footer-col-2">
//                 {/* <h1>Emapris</h1> */}
//                <Link to="/"><img src={emalogo} style={{height:"60px", width:"60%"}} alt="brand" /></Link>
//                 <p>
//                   Our purpose is to sustainably make the pleasure and benefits
//                   of shopping accessible to the people.{' '}
//                 </p>
//               </div>
//               <div className="footer-col-3">
//                 <h3>Useful Links</h3>
//                 <ul>

//                   <Link to="#"> <li>coupons</li></Link>
//                   <Link to="#"><li>Blog Post</li></Link>
//                   <Link to="#"> <li>Return Policy</li></Link>
//                  <Link to="#"><li>Join Affiliate</li></Link>

//                 </ul>
//               </div>
//               <div className="footer-col-4">
//                 <h3>Follow us on</h3>
//                 <ul>
//                   <li>Facebook</li>
//                   <li>Twitter</li>
//                   <li>Intstagram</li>
//                   <li>YouTube</li>
//                 </ul>
//               </div>
//             </div>
//             <hr />
//             <p className="copyright">All right reserved</p>
//           </div>
//         </div>
//     </div>
//   )
// }

import React from 'react';
import playstore1 from '../images/playstore1.png';
import appstore1 from '../images/appstore1.png';
import { Link } from 'react-router-dom';
import emalogo from '../images/emalogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Our App</h3>
              <p>Download App for Android and iOS mobile phone. </p>
              <div className="app-logo">
                <img src={playstore1} alt="img" />
                <img src={appstore1} alt="img" />
              </div>
            </div>
            <div className="footer-col-2">
              <Link to="/">
                <img
                  src={emalogo}
                  style={{ height: '60px', width: '60%' }}
                  alt="brand"
                />
              </Link>
              <p>
                Our purpose is to sustainably make the pleasure and benefits of
                shopping accessible to the people.{' '}
              </p>
            </div>
            <div className="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li>
                  <Link to="/coupons">Coupons</Link>
                </li>
                <li>
                  <Link to="/blog">Blog Post</Link>
                </li>
                <li>
                  <Link to="/policy">Return Policy</Link>
                </li>
                <li>
                  {' '}
                  <Link to="/affiliate">Join Affiliate</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col-4">
              <h3>Follow Us On</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faFacebook} />
                  <Link to="#">Facebook</Link>{' '}
                </li>
                <li>
                  <FontAwesomeIcon icon={faTwitter} />
                  <Link to="#"> X </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faInstagram} />
                  <Link to="#"> Instagram</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faYoutube} />
                  <Link to="#"> YouTube</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="copyright">Powered by Doetek Technologies.</p>
        </div>
      </div>
    </div>
  );
}
