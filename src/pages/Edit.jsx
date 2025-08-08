import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://bacand-for-eleven.vercel.app/events/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching task:", err);
                setLoading(false);
                toast.error("Failed to load task");
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const selectedDate = new Date(task.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            return toast.error("Event date must be in the future");
        }

        const { _id, ...updateData } = task;

        fetch(`https://bacand-for-eleven.vercel.app/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Event updated successfully!");
                    navigate("/manageevents");
                } else {
                    toast.error("Failed to update event");
                }
            })
            .catch((err) => {
                console.error("Update error:", err);
                toast.error("Something went wrong");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!task) {
        return (
            <p className="text-center mt-10 text-lg font-semibold text-red-500">
                Task not found.
            </p>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Edit Event</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Event Type</label>
                    <select
                        name="eventType"
                        value={task.eventType || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    >
                        <option value="">Select type</option>
                        <option value="Cleanup">Cleanup</option>
                        <option value="Plantation">Plantation</option>
                        <option value="Donation">Donation</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Awareness">Awareness</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail Image URL</label>
                    <input
                        type="text"
                        name="thumbnailUrl"
                        value={task.thumbnailUrl || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={task.location || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Event Date</label>
                    <input
                        type="date"
                        name="eventDate"
                        value={task.eventDate?.slice(0, 10) || ""}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition"
                >
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default Edit;
