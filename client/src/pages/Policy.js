import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout>
    <div className="contact-page mt-5">
      
      <div className="contact-content">
        <div className="row">
          <div className="col-md-6 mt-3">
            <img
              src="/images/privacy.jpg"
              alt="Privacy Policy"
              className="contact-image"
            />
          </div>
          <div className="col-md-6">
          <div className="contact-header">
        <h1 className="bg-dark p-3 text-white text-center">Privacy Policy</h1>
      </div>
            <div className="contact-info">
              <div className="contact-item">
                <p>
                  This Privacy Policy outlines our commitment to protecting your
                  personal information and ensuring its confidentiality.
                </p>
              </div>
  
              <div className="contact-item">
                <p>
                  We collect information such as your name, email address, and
                  browsing behavior to provide you with a better experience on
                  our website.
                </p>
              </div>
  
              <div className="contact-item">
                <p>
                  Rest assured that your information is securely stored and will
                  never be shared with third parties without your consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  
  )
}




Layout.defaultProps={
  title:"Privacy ",
  description:"shopping privacy",
  keywords:"tshirt ,shirt, jeans ,huddies",
  author:"Anurag",
}
 
export default Policy