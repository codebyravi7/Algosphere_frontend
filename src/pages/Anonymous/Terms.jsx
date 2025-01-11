import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-4">
          Welcome to our website. By accessing and using this website, you agree
          to comply with the following terms and conditions. If you do not
          agree, please do not use this website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          1. Use of Website
        </h2>
        <p className="text-gray-600 mb-4">
          You agree to use this website only for lawful purposes and in a way
          that does not infringe the rights of others or restrict their use and
          enjoyment of the website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          2. Intellectual Property
        </h2>
        <p className="text-gray-600 mb-4">
          All content on this website, including text, graphics, logos, and
          images, is the property of the website owner and protected by
          copyright laws. You may not reproduce or redistribute any content
          without prior written consent.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          3. Limitation of Liability
        </h2>
        <p className="text-gray-600 mb-4">
          We are not responsible for any loss or damage arising from your use of
          this website. Use this website at your own risk.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          4. Third-Party Links
        </h2>
        <p className="text-gray-600 mb-4">
          This website may contain links to third-party websites. We do not
          control or endorse the content of these websites and are not
          responsible for any damages or losses caused by visiting them.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          5. Changes to Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify these terms and conditions at any time.
          Changes will be effective immediately upon posting on this website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          6. Governing Law
        </h2>
        <p className="text-gray-600 mb-4">
          These terms are governed by the laws of [Your Country/State]. Any
          disputes will be resolved in the courts of [Your Jurisdiction].
        </p>

        <p className="text-gray-600 mt-6">
          If you have any questions about these terms and conditions, please
          contact us at [Your Contact Information].
        </p>
      </div>
      <div className="button text-center pt-2">
        <Link to="/login">
          <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white">
            Back to login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
