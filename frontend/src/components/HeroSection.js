import "./HeroSection.css"
import "../App.css"


const HeroSection = () => {
  return (
    <div className="hero-container">
      <video className="hero-video" src="/videos/video-4.mp4" autoPlay loop muted />
      <div className="hero-text">
        <p className="fm-logo">FM</p>
        <p style={{ padding: "2%" }}>&nbsp;deploy</p>
      </div>
      <p className="hero-subtext">FAST MODEL DEPLOYMENT</p>
    </div>
  )
}

export default HeroSection
