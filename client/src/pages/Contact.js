import React from 'react'
import Layout from '../components/Layout/Layout'
import {BsFileEarmarkTextFill} from  'react-icons/bs';
import{AiOutlineMail} from 'react-icons/ai';
import{IoIosContact } from 'react-icons/io';
import {FaMobileAlt} from 'react-icons/fa';
const Contact = () => {
  return (
    <Layout>
  <div className="contact-page mt-5">
    
    <div className="contact-content">
      <div className="row">
        <div className="col-md-6 mt-3">
          <img
            src="/images/contact.jpg"
            alt="contactus"
            className="contact-image"
          />
        </div>
        <div className="col-md-6">
        <div className="contact-header">
      <h1 className="bg-dark p-3 text-white text-center">CONTACT US</h1>
    </div>
          <div className="contact-info">
            <div className="contact-item">
              <BsFileEarmarkTextFill className="cicon" />
              <p className="text-justify mt-2">
                Any query and information about our products, feel free to call
                anytime. We are available 24x7.
              </p>
            </div>

            <div className="contact-item">
              <AiOutlineMail className="cicon" />
              <p className="mt-3">anurag2426yadav@gmail.com</p>
            </div>

            <div className="contact-item">
              <IoIosContact className="cicon" />
              <p className="mt-3">9324458678</p>
            </div>

            <div className="contact-item">
              <FaMobileAlt className="cicon" />
              <p className="mt-3">1800-0000-0000 (toll-free)</p>
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
  title:"Contact",
  description:"contact us",
  keywords:"message,phone,email",
  author:"Anurag",
}
export default Contact