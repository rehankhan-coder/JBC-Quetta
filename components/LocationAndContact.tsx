import React from 'react';
import { COMPANY_ADDRESS, EMAIL_ADDRESS, WHATSAPP_NUMBER } from '../constants';

const LocationAndContact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800 inline-block relative">
                Visit or Contact Us
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-blue-600 rounded-full"></span>
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Office</h3>
            <div className="flex items-start space-x-4 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="text-lg text-gray-600">{COMPANY_ADDRESS}</p>
            </div>
            <div className="rounded-lg overflow-hidden h-64 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55027.693354452175!2d66.95350483863524!3d30.422509176464536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed2dfa1122c481d%3A0x8f7a9addf65975e!2sKuchlak%2C%20Balochistan%2C%20Pakistan!5e0!3m2!1sen!2s!4v1689252445123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Company Location"
              ></iframe>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h3>
             <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 w-full bg-green-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path d="M14.015 6.23a1 1 0 00-1.231-1.566L2.699 9.239a1 1 0 00.115 1.914l3.545.986 2.112 4.113a1 1 0 001.815.116l4.729-9.14z" /></svg>
                <span>Chat on WhatsApp</span>
            </a>
            <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center justify-center space-x-3 w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                <span>Send us an Email</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationAndContact;