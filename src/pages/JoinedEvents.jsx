import React, { useEffect, useState, useContext } from "react";
import { valueConText } from "../rootlayout/RootLayout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const JoinedEvents = () => {
    const { user } = useContext(valueConText);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            toast.error("You must be logged in to view joined events.");
            setLoading(false);
            return;
        }

        const fetchJoinedEvents = async () => {
            try {
                const res = await fetch(`https://bacand-for-eleven.vercel.app/events/joined-events/${user.email}`);
                const data = await res.json();
                if (data.success) {
                    setJoinedEvents(data.events);
                } else {
                    toast.error("Failed to fetch joined events.");
                }
            } catch (error) {
                toast.error("Failed to fetch joined events.");
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [user?.email]);

    const handleCancelJoin = (eventId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel joining this event?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(
                        `https://bacand-for-eleven.vercel.app/events/joined-events/${eventId}?email=${user.email}`,
                        { method: "DELETE" }
                    );
                    const data = await res.json();

                    if (data.success) {
                        setJoinedEvents((prev) =>
                            prev.filter((event) => event._id.toString() !== eventId.toString())
                        );
                        toast.success("You have cancelled your participation.");
                    } else {
                        toast.error(data.message || "Failed to cancel participation.");
                    }
                } catch (error) {
                    toast.error("Something went wrong.");
                    console.error(error);
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!joinedEvents.length) {
        return (
            <p className="text-center mt-10 text-lg text-gray-600 dark:text-gray-300">
                You haven't joined any events yet.
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Joined Events</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Email</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedEvents.map((event) => (
                            <tr key={event._id}>
                                <td>
                                    <img
                                        src={event.thumbnailUrl}
                                        alt={event.title}
                                        className="w-16 h-12 object-cover rounded"
                                    />
                                </td>
                                <td>{event.title}</td>
                                <td>{event.eventType}</td>
                                <td>{event.location}</td>
                                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                                <td>
                                    <a href={`mailto:${event.email}`} className="text-blue-600">
                                        {event.email}
                                    </a>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleCancelJoin(event._id)}
                                        className="text-red-600 font-bold"
                                        aria-label={`Cancel join for ${event.title}`}
                                    >
                                        ×
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JoinedEvents;
