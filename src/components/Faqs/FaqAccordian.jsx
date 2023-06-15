import React,{useState} from 'react'
import Accordion from './Acoordion';
function FaqAccordian() {
    // const [activeItem, setActiveItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const faqs = [
        {
          title: "Student Visa & Permit",
          data: [
            {
              question: "Do I need a visa to study in Turkey or Northern Cyprus?",
              answer: `Yes, international students generally require a visa to study in Turkey or Northern Cyprus. The specific visa requirements may vary depending on your nationality and the duration of your studies. While the exact documents needed can vary, here are some common documents that may be required for a student visa:
              1. Valid passport: Ensure that your passport is valid for at least six months beyond your intended stay.
              2. Letter of acceptance: A formal acceptance letter from a recognized university or educational institution in Turkey or Northern Cyprus (which we will provide for you if you register through us)
              3. Completed visa application form: Fill out the visa application form accurately and provide all the necessary information.
              4. Passport-sized photographs: Recent photographs meeting the specifications set by the embassy or consulate.
              5. Proof of financial means: Documents demonstrating your ability to cover tuition fees, living expenses, and other costs during your studies (in Turkey only)
              6. Health insurance: Proof of health insurance coverage for the duration of your stay.
              7. Academic documents: Transcripts, diplomas, or certificates from previous educational institutions.
              8. Visa application fee: Payment of the required visa application fee.
              For more information on visa regulations in Northern Cyprus, you can visit the following link: https://mfa.gov.ct.tr/consular-info/visa-regulations/. This official resource will provide detailed information specific to the visa requirements in Northern Cyprus.
              It's important to note that visa requirements can change, so it is advisable to consult the Turkish embassy or consulate in your country for the most up-to-date and accurate information regarding the specific documents needed for a student visa.
              If you have any further questions or concerns, please feel free to reach out to our support team. We are here to assist you throughout the process.`,
            },
            {
              question: "How can I obtain a student permit for Turkey or Northern Cyprus?",
              answer: `Once you have been accepted by a university in Turkey or Northern Cyprus, you will need to apply for a student permit. The university's international student office can guide you through the application process and provide the necessary documentation. It is important to start the permit application process well in advance to allow sufficient time for processing.`,
            },
          ],
        },
        {
          title: "Booking Process",
          data: [
            {
              question: "How does the booking process work?",
              answer: "Have a look around to see which dorm you would like then contact us to secure a spot.",
            },
            {
              question: "Can I book a dormitory if I am not yet registered at a university?",
              answer: `Only during the summer period otherwise to book a dormitory through our website, you need to be already registered at a university in Turkey or Northern Cyprus. The booking process requires you to provide details of your current university enrollment.`,
            },
          ],
        },
        {
          title: "Transportation Process",
          data: [
            {
              question: "Will transportation from the airport to the university and dormitory be arranged for me?",
              answer: `Yes, we provide transportation services from the airport to the university and the designated dormitory. Once your booking is confirmed, you will be provided with instructions on how to arrange transportation. We aim to make your arrival and transition to your new accommodation as smooth as possible.`,
            },
            {
              question: "Is there an additional cost for the transportation service?",
              answer: `As long as you book a dorm through us transportation from the airport to the university and dormitory is provided free of charge. We offer complimentary transportation to ensure a smooth and convenient arrival experience for our students.`,
            },
          ],
        },
      ];
      
  return (
    <>
      
<div> 
<input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        style={{display:"flex",margin:"0 auto"}}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
{/* {faqs.map((faqSection, index) => (
                <div key={index}>
                    <h2>{faqSection.title}</h2>
                    {faqSection.data.map((faq, i) => (
                        <Accordion key={i} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            ))} */}
            {faqs.map((faq, i) => {
        const filteredData = faq.data.filter((item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return (
          <div key={i}>
            <h2>{faq.title}</h2>
            {filteredData.length > 0 ? (
              filteredData.map((item, j) => (
                <Accordion key={j} question={item.question} answer={item.answer} />
              ))
            ) : (
              <p>No question answer found</p>
            )}
          </div>
        );
      })}
    </div>
    </>
  )
}

export default FaqAccordian