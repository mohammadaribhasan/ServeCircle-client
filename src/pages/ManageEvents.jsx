import React, { useContext, useEffect, useState } from "react";
import { valueConText } from "../rootlayout/RootLayout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageEvents = () => {
    const { user } = useContext(valueConText);
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://bacand-for-eleven.vercel.app/events`)
                .then((res) => res.json())
                .then((data) => {
                    const userEvents = data.filter(event => event.email === user.email);
                    setMyEvents(userEvents);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching events:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://bacand-for-eleven.vercel.app/events/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setMyEvents((prev) => prev.filter((event) => event._id !== id));
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your event has been deleted.",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                } else {
                    Swal.fire("Failed!", "Failed to delete the event.", "error");
                }
            } catch (error) {
                console.error("Error deleting event:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 text-base-content">
            <h2 className="text-3xl font-bold mb-6">My Created Events</h2>

            {myEvents.length === 0 ? (
                <p className="text-center text-lg text-base-content opacity-70">
                    You haven’t posted any events yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-base-100 border border-base-300 rounded-xl overflow-hidden text-sm">
                        <thead className="bg-base-200 text-left">
                            <tr>
                                <th className="py-3 px-4">Thumbnail</th>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Type</th>
                                <th className="py-3 px-4">Location</th>
                                <th className="py-3 px-4">Event Date</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myEvents.map((event) => (
                                <tr key={event._id} className="border-t border-base-300 hover:bg-base-200 transition-colors">
                                    <td className="py-3 px-4">
                                        <img
                                            src={event.thumbnailUrl}
                                            alt={event.title}
                                            className="w-20 h-14 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-3 px-4 font-semibold">{event.title}</td>
                                    <td className="py-3 px-4">{event.eventType}</td>
                                    <td className="py-3 px-4">{event.location}</td>
                                    <td className="py-3 px-4">
                                        <time dateTime={event.eventDate}>
                                            {new Date(event.eventDate).toLocaleDateString()}
                                        </time>
                                    </td>
                                    <td className="py-3 px-4 break-words">{event.email}</td>
                                    <td className="py-3 px-4 text-center space-x-2">
                                        <button
                                            onClick={() => navigate(`/edit/${event._id}`)}
                                            className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-base-700 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
