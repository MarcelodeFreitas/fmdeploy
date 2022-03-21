import { Link } from 'react-router-dom'
import './Footer.css'

function Fotter() {
    return (
        <div className='footer-container'>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <Link to='/' className='social-logo'>
                        <p style={{ backgroundColor: "#0385B0", padding: "2%", borderRadius: "10%" }}>FM</p>&nbsp;deploy
                    </Link>
                    <small className='website-rights'>FMdeploy © 2022</small>
                </div>
            </section>
        </div>
    )
}

export default Fotter
