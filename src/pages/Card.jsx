import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ tasks }) => {
    const navigate = useNavigate();

    const sortedTasks = [...tasks].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {sortedTasks.map((task) => (
                <article
                    key={task._id}

                    className="border border-green-600 bg-card-bg  bg-opacity-40 backdrop-blur-md rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg hover:scale-[1.04] transition-transform duration-300 "
                >
                    <div>
                        {/* Thumbnail Image */}
                        <img
                            src={task.thumbnailUrl}
                            alt={task.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        {/* Title
                        <h2 className="text-2xl font-extrabold text-primary mb-2 hover:text-primary-hover transition-colors duration-200">
                            {task.title}
                        </h2> */}

                        {/* Event Type */}
                        <p className="text-secondary font-semibold mb-1 uppercase tracking-wide">
                            {task.eventType}
                        </p>

                        {/* Description */}
                        {/* <p className="text-muted mb-4 line-clamp-4">{task.description}</p> */}

                        {/* Location & Date */}
                        {/* <p className="text-sm text-muted-light">
                            <span className="font-semibold">Location:</span> {task.location}
                        </p> */}
                        <p className="text-sm text-muted-light">
                            <span className="font-semibold">Date:</span>{" "}
                            <time dateTime={task.eventDate}>
                                {new Date(task.eventDate).toLocaleDateString()}
                            </time>
                        </p>
                    </div>

                    {/* Creator Email */}
                    {/* <div className="mt-6 border-t border-border pt-4">
                        <p className="text-sm text-muted-light">
                            <span className="font-semibold">Created By:</span> {task.email}
                        </p>
                    </div> */}

                    {/* View Event Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the article's navigate
                            navigate(`/events/${task._id}`);
                        }}
                        className="mt-4 cursor-pointer py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-primary-hover transition-colors duration-200"
                    >
                        View Event
                    </button>
                </article>

            ))}
        </div>
    );
};

export default Card;
