import React from 'react';

const steps = [
    {
        id: 1,
        title: "Post Your event",
        description: "Post a detailed event for social work and make mental peace.",
    },
    {
        id: 2,
        title: "Browse events",
        description: "Explore events and watch the details of events.",
    },
    {
        id: 3,
        title: "Join events",
        description: "You can join social events of random catagory.",
    },
    {
        id: 4,
        title: "Edit",
        description: "You can edit your event and you can cencle your joined events.",
    },
];

const HowToUse = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
                What you can do...
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {steps.map(({ id, title, description }) => (
                    <div
                        key={id}
                        className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-700 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="font-extrabold text-xl mb-3 text-black">
                            {title}
                        </div>
                        <p className="text-black dark:text-white">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowToUse;
