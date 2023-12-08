import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>
    <div className="contact-page mt-5">
      
      <div className="contact-content">
        <div className="row">
          <div className="col-md-6 mt-3">
            <img
              src="/images/about.jpg"
              alt="About Us"
              className="contact-image"
            />
          </div>
          <div className="col-md-6">
          <div className="contact-header">
        <h1 className="bg-dark p-3 text-white text-center">About Us</h1>
      </div>
            <div className="contact-info">
              <div className="contact-item">
                <p>
                  Welcome to our online store! We are dedicated to providing you
                  with the best shopping experience, offering a wide range of
                  high-quality products at affordable prices.
                </p>
              </div>
  
              <div className="contact-item">
                <p>
                  Our team is committed to ensuring that you find exactly what
                  you're looking for. Whether it's the latest fashion trends,
                  electronics, home essentials, or more, we have it all.
                </p>
              </div>
  
              <div className="contact-item">
                <p>
                  Thank you for choosing us for your shopping needs. Happy
                  shopping!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  
  );

   
};

Layout.defaultProps={
  title:"about",
  description:"about us ",
  keywords:"message,phone, contact ,email",
  author:"Anurag",
}

export default About