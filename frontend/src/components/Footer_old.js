import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Fotter() {
  return (
    <div className="footer-container">
      {/* <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the FMdeploy community, don't let your hard work
                    die in Jupyter Notebooks.
                </p>
                <p className='footer-subscription-text'>
                    You can start in just five minutes.
                </p>
                <div className='input-areas'>
                    <Button buttonStyle='btn--outline' path="/auth">
                        Join Now!
                    </Button>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/auth'>How it works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                        <Link to='/'>Sponsorships</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Videos</h2>
                        <Link to='/'>Tutorial</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div> */}
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <p
                style={{
                  backgroundColor: "#0385B0",
                  padding: "2%",
                  borderRadius: "10%",
                }}
              >
                FM
              </p>
              &nbsp;deploy
            </Link>
          </div>
          <small className="website-rights">FMdeploy © 2023</small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            ></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Fotter;
