import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { valueConText } from '../rootlayout/RootLayout'; // Auth context must provide user.email

const CreateEvent = () => {
    const { user } = useContext(valueConText);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventType: '',
        thumbnailUrl: '',
        location: '',
        eventDate: '',
    });

    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedDate = new Date(formData.eventDate);
        const currentDate = new Date(today);

        if (selectedDate <= currentDate) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Please select a future date.',
            });
            return;
        }

        const eventData = {
            ...formData,
            email: user?.email || 'unknown',
        };

        try {
            const res = await fetch('https://bacand-for-eleven.vercel.app/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Created!',
                    text: 'Your event has been added successfully.',
                    confirmButtonColor: '#22c55e',
                }).then(() => {
                    navigate('/manageevents');
                });
            } else {
                throw new Error('Failed to create event');
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: 'Try again later.',
            });
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg border border-green-100">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Tree Plantation Drive"
                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe the purpose, goals, and activities..."
                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                        required
                    />
                </div>

                {/* Event Type */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Event Type</label>
                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-green-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Cleanup">Cleanup</option>
                        <option value="Plantation">Plantation</option>
                        <option value="Donation">Donation</option>
                        <option value="Awareness">Awareness</option>
                        <option value="Workshop">Workshop</option>
                    </select>
                </div>

                {/* Thumbnail URL */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Thumbnail Image URL</label>
                    <input
                        type="text"
                        name="thumbnailUrl"
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                        placeholder="Photo Link"
                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Dhanmondi Lake, Dhaka"
                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        required
                    />
                </div>

                {/* Event Date */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Event Date</label>
                    <input
                        type="date"
                        name="eventDate"
                        min={today}
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        required
                    />
                </div>

                {/* Email (Readonly) */}
                <div>
                    <label className="block mb-1 font-medium text-green-800">Your Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-green-200 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow transition"
                >
                    Submit Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;