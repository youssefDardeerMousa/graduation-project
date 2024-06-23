import React from 'react'
import "./styles/green.css"
 
import lo1 from "./assets/images/greentree.png"
import lo2 from "./assets/images/whiteBasket.png"
import lo3 from "./assets/images/photo_٢٠٢٤-٠٦-١٨_١١-٤١-٠٧.jpg"
import lo4 from "./assets/images/Doha.jpg"
import lo5 from "./assets/images/Fatma.jpg"
import lo6 from "./assets/images/youssef.jpg"
import lo7 from "./assets/images/Shimaa.jpg"
import lo8 from "./assets/images/ahmedabd.jpg"
import lo9 from "./assets/images/ahmedali.jpg"
import lo10 from "./assets/images/we.png"
export default function Aboutus() {
  return (
    <> 
  
  <div className="html">
<div className="body">
<section className="container plants">
    <img src={lo1} alt className="plants__green-tree" />
    <h4 className="plants__first-heading">HOUSEPLANTS</h4>
    <h3 className="plants__second-heading">Fresh Your Space</h3>
    <p className="plants__letter">
      Houseplants breathe life into indoor spaces, purifying air and adding
      vibrant greenery. Their presence enhances aesthetics and promotes a
      sense of tranquility, revitalizing any environment.
    </p>
  </section>
  <section className="sharing container">
    <div className="sharing__content">
      <p className="sharing__title">Clean &amp; Green</p>
      <h4 className="sharing__heading">Sharing plant happiness</h4>
      <p className="sharing__text">
        Clean &amp; Green website cultivates joy through plant care tips,
        eco-friendly practices, and a community fostering plant enthusiasts'
        happiness and connection to nature.
      </p>
    </div>
    <img src= {lo2} alt="sharing" className="sharing__image" />
  </section>
  <section className="experience">
    <div className="experience__text container">
      <p className="first-experience">EXPERIENCE</p>
      <p className="lower-experience">
        We come from strong background in the field of plants
      </p>
    </div>
  </section>
  <section className="we container">
    <img src={lo10} alt="we are" className="we__photo" />
    <div className="we_content">
      <h4 className="we__heading">Who we are ?</h4>
      <p className="we__text">
        We are a group of seven students from the College of Computers and Information <br /> 
        who are interested in integrating agriculture <br /> with technology 
        , and creating a website that provides agricultural services.
      </p>
    </div>
  </section>
  <section className="team">
    <p className="team__title">OUR TEAM</p>
    <h4 className="team__heading">Meet Our Greatnessmakers</h4>
    <p className="team__text">
      Join our family of plants lovers and be the first to see our <br />
      new releases and attend special events.
    </p>
    <div id="no">
      <div className="container">
        <div className="team-centent">
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src= {lo8} alt />
              <div className="team-overlay">
                <a href="#"><i className="fa-brands fa-facebook" /></a>
                <a href="#"><i className="fa-brands fa-twitter" /></a>
                <a href="#"><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Ahmed Abd Elkareem</h3>
              <span className="team-info-text">Front End Developer</span>
            </div>
          </div>
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src={lo3} alt />
              <div className="team-overlay">
                <a href="https://www.facebook.com/profile.php?id=100008507147930&mibextid=ZbWKwL"><i className="fa-brands fa-facebook" /></a>
                <a href="#"><i className="fa-brands fa-twitter" /></a>
                <a href="https://www.linkedin.com/in/rokaya-ghallab-76385721b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Rokaya Ali</h3>
              <span className="team-info-text">Front End Developer</span>
            </div>
          </div>
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src= {lo9} alt />
              <div className="team-overlay">
                <a href="#"><i className="fa-brands fa-facebook" /></a>
                <a href="https://x.com/Ahmed_Ali236?t=8ct4wRGuJiVld0fNARhbhg&s=09"><i className="fa-brands fa-twitter" /></a>
                <a href="https://www.linkedin.com/in/ahmed-ali-689aa522a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Ahmed ALi</h3>
              <span className="team-info-text">Front End/UIUX Designer</span>
            </div>
          </div>
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src={lo4} alt />
              <div className="team-overlay">
                <a href="#"><i className="fa-brands fa-facebook" /></a>
                <a href><i className="fa-brands fa-twitter" /></a>
                <a href><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Doha Ali</h3>
              <span className="team-info-text">UI/UX Designer</span>
            </div>
          </div>
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src= {lo5} alt />
              <div className="team-overlay">
                <a href="#"><i className="fa-brands fa-facebook" /></a>
                <a href="#"><i className="fa-brands fa-twitter" /></a>
                <a href="#"><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Zahraa Nagy</h3>
              <span className="team-info-text">Software Tester</span>
            </div>
          </div>
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src= {lo6} alt />
              <div className="team-overlay">
                <a href="#"><i className="fa-brands fa-facebook" /></a>
                <a href="#"><i className="fa-brands fa-twitter" /></a>
                <a href="#"><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Youssef Darder</h3>
              <span className="team-info-text">Back End Developer</span>
            </div>
          </div>
          <div className="team-item tb-effect">
            <div className="team-img">
              <img src= {lo7} alt />
              <div className="team-overlay">
                <a href="https://www.facebook.com/profile.php?id=100038404907949&mibextid=ZbWKwL"><i className="fa-brands fa-facebook" /></a>
                <a href="#"><i className="fa-brands fa-twitter" /></a>
                <a href="https://www.linkedin.com/in/shimaa-emam-778643315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="fa-brands fa-linkedin fa-lg" /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-info-title">Shimaa Emam</h3>
              <span className="team-info-text">Front End Developer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  </div>

 

    </>
  )
}
