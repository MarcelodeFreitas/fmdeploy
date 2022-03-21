import '../../App.css'
import Cards from '../Cards'
import HeroSection from '../HeroSection'
import Footer from '../Footer'
import HomeButtons from '../HomeButtons'
import './Home.css'
import ResponsiveAppBar from '../AppBar'

function Home() {
    return (
        <>
            <ResponsiveAppBar />
            <HeroSection />
            <HomeButtons />
            <div className="home-content">
               
            </div>
            {/* <div className="home-content">
                <Container className="home-content">
                    <Container className="home-content-text">
                        FMdeploy is an open-source project freely available, based on Python for server side computing and React to enabled
                        quick and easy user interaction. It provides the ability to generate an easy-to-use demo
                        for Python scripts, from machine learning projects to simple functions with only a few line of code.
                    </Container>
                    <Container className="home-content-text">
                        FMdeploy also includes tools to enable demo sharing and the creation of public demos,
                        available to anyone that joins the community.
                    </Container>
                    <Container className="home-content-text">
                        This projects aims to enable users to create a simple way for anyone to make use
                        of TensorFlow or XGBoost projects, or any other python functions.
                    </Container>
                </Container>
                <Container className="home-content">
                    <Card className="home-content-card">
                        <div className="home-content-title">
                            OPEN SOURCE
                        </div>
                        <Container className="home-content-text">
                            FMdeploy is an open-source project. It is built on top of FastAPI and React.
                        </Container>
                    </Card>
                    <Card className="home-content-card">
                        <div className="home-content-title">
                            USER FRIENDLY
                        </div>
                        <Container className="home-content-text">
                            Providing user-comprehensible error messages and easy to program API interfaces.
                        </Container>
                    </Card>
                    <Card className="home-content-card">
                        <div className="home-content-title">
                            HIGH QUALITY
                        </div>
                        <Container className="home-content-text">
                            Delivering high-quality software with enterprise-grade development, tutorials for getting started and robust validation & documentation.
                        </Container>
                    </Card>
                </Container>
            </div> */}
            <Cards />
            <Footer />
        </>
    )
}

export default Home