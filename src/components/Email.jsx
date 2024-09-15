import React, { useState } from "react";
import axios from "axios";

function Email() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    // Create an object with EmailJS service ID, template ID, Public Key, and Template params
    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: "Visitor",
        from_email: email,
        to_name: "RaviKant",
        message: message,
      },
    };

    // Send the email using EmailJS
    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );

      setMessage("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <section className="w-full max-w-5xl mx-auto lg:px-0">
        <div className="bg-gray-800 p-6 md:p-10 rounded-2xl mx-auto flex flex-col gap-y-5 justify-center items-center relative">
          <svg
            className="absolute right-0 top-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="227"
            height="223"
            viewBox="0 0 227 223"
            fill="none"
          >
            <path
              opacity="0.21"
              d="M163.766 -28.3772C163.766 -31.8935 161.662 -35.0699 158.422 -36.4473C155.181 -37.8247 151.429 -37.1368 148.891 -34.6996L117.649 -4.71041C71.1338 39.9411 31.8296 91.5182 1.13522 148.185C0.412538 149.459 0 150.932 0 152.501C0 157.345 3.9335 161.271 8.78571 161.271H84.5186V287.378C84.5186 290.852 86.5716 293.998 89.754 295.401C92.9365 296.805 96.6487 296.201 99.2207 293.862L113.199 281.15C162.13 236.652 203.656 184.662 236.217 127.133L244.863 111.856C246.4 109.141 246.377 105.814 244.802 103.121C243.228 100.427 240.339 98.7703 237.214 98.7703H163.766V-28.3772Z"
              fill="#F2F9FB"
              fillOpacity="0.4"
            />
          </svg>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
            Join our beta program for more features
          </h3>
          <div className="input-form max-w-2xl mx-auto w-full flex flex-col md:flex-row gap-y-2 items-center justify-center lg:justify-start gap-x-5 lg:gap-x-5 mt-5">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className=" py-2.5 px-5 placeholder:text-sm rounded-lg bg-white/20 border border-zinc-400/40 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ring-offset-2 ring-offset-white transition duration-200 mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  cols="30"
                  rows="5"
                  value={message}
                  placeholder="Enter your message"
                  className=" py-2.5 px-5 placeholder:text-sm rounded-lg bg-white/20 border border-zinc-400/40 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ring-offset-2 ring-offset-white transition duration-200 resize-none"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button className="bg-white w-full md:w-1/3 hover:shadow-md focus:ring-2 focus:ring-indigo-500/50 ring-offset-2 ring-offset-[#EAE8FF] hover:drop-shadow transition duration-200 lg:w-1/3 text-zinc-800 text-sm rounded-lg px-5 py-2.5 shadow-md group font-clash font-[500]">
                Send an Email
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="inline-block ml-2"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Email;
