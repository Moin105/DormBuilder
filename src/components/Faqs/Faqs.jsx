import React from 'react';
import './faqs.css'
// import Faqse from './Faqse'; // update the path as needed
import FaqAccordian from './FaqAccordian';
import Header from '../Header/Header';
import Footer from '../utils/Footer/Footer';
const FAQs = () => {
  return (
    <>
    <Header/>
      <h1>Frequently Asked Questions</h1>
      <div className='container'>

      <FaqAccordian />
      </div>
    <Footer/>  
    </>
  );
}

export default FAQs;
