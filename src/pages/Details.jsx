import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { valueConText } from "../rootlayout/RootLayout"; // Adjust if needed

const Details = () => {
    const { id } = useParams();
    const { user } = useContext(valueConText); // Get logged-in user
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleJoinEvent = () => {
        if (!user?.email) {
            toast.error("You must be logged in to join.");
            return;
        }

        const joinData = {
            eventId: task._id,         // ✅ Only send _id
            userEmail: user.email,
        };

        fetch("https://bacand-for-eleven.vercel.app/events/joined-events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(joinData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.alreadyJoined) {
                    toast.error("You already joined this event.");
                } else {
                    toast.success("You joined the event!");
                }
            })
            .catch((err) => {
                console.error("Error joining event:", err);
                toast.error("Failed to join event.");
            });
    };

    useEffect(() => {
        fetch(`https://bacand-for-eleven.vercel.app/events/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching event details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-center text-2xl font-semibold text-green-700">
                    Event not found
                </p>
            </div>
        );
    }

    return (
        <div className="relative  px-4 py-12">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                theme="colored"
            />

            <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-8"
                style={{ backgroundImage: "url('https://i.ibb.co/kspNj5RP/Gemini-Generated-Image-z3avfbz3avfbz3av6.png')" }}>
                {/* Thumbnail */}
                <img
                    src={task.thumbnailUrl}
                    alt={task.title}
                    className="w-full h-64 object-cover rounded mb-6"
                />

                {/* Title */}
                <h2 className="text-4xl font-extrabold mb-6 text-green-200">
                    {task.title}
                </h2>

                {/* Details */}
                <div className="space-y-4 text-gray-800 dark:text-gray-300 text-lg">
                    <p><strong>Type:</strong> {task.eventType}</p>
                    <p><strong>Description:</strong> <br /><span className="whitespace-pre-wrap">{task.description}</span></p>
                    <p><strong>Location:</strong> {task.location}</p>
                    <p><strong>Date:</strong> <time>{new Date(task.eventDate).toLocaleDateString()}</time></p>
                    <p><strong>Organizer Email:</strong> <a href={`mailto:${task.email}`} className="text-blue-600 dark:text-blue-400 hover:underline break-words">{task.email}</a></p>
                </div>

                {/* Join Button */}
                <div className="mt-8">
                    <button
                        onClick={handleJoinEvent}
                        className="bg-green-600 hover:bg-green-700 text-white cursor-pointer w-full font-bold py-2 px-6 rounded-lg transition"
                    >
                        Join Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Details;
