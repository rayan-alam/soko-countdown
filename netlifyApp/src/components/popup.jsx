import { useState } from 'react';

const Popup = ({ onClose }) => {
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setStatus('Subscribed successfully!');
        setTimeout(onClose, 2000); // Close popup after 2 seconds
      } else {
        setStatus(`Error: ${result.error || 'Failed to subscribe'}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full relative flex">
        {/* Left Side (Text & Input) */}
        <div className="w-1/2 flex flex-col justify-center text-center p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold uppercase">Join the Movement</h2>
          <p className="text-gray-600 text-sm mt-2">and get 10% off on your first order</p>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-4 w-full p-2 border border-gray-300 rounded-md text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Subscribe Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800"
            >
              Subscribe Now
            </button>
          </form>

          {/* Status Message */}
          {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
        </div>

        {/* Right Side (Full Image Cover) */}
        <div className="w-1/2 relative">
          <img
            src="/pk-84-compress.jpg" // Replace with the actual image path
            alt="Popup Banner"
            className="w-full h-full object-cover rounded-r-lg"
          />

          {/* Close Button Positioned Over Image */}
          <button
            className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;