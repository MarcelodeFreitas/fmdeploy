import '../../App.css'
import ResponsiveAppBar from '../AppBar'
import Cards from '../Cards'
import Footer from '../Footer'

export default function Documents() {
    return(
    <>
        <ResponsiveAppBar />
        <div className="docs" style={{backgroundImage: "url(/images/img-1.jpg)"}}>
            <h1 style={{ fontSize: "80px"}}>Documentation</h1>
            <p style={{ fontSize: "30px"}}>Coming Soon</p>
        </div>
        <div className="home-padding">
               
        </div>
        <Cards />
        <Footer />
    </>
    )
}