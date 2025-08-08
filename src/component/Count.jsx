import React from "react";
import CountUp from "react-countup";

const Count = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-12">

            <div className="border rounded-3xl p-6 bg-base-200 border-gray-300 shadow text-center">
                <img
                    className="h-20 w-20 mx-auto mb-4"
                    src="https://i.ibb.co/QvyjMcFP/success-review.png"
                    alt="Total Reviews"
                />
                <h2 className="text-3xl font-bold text-purple-600">
                    <CountUp end={467} duration={3} />+
                </h2>
                <p className="text-xl mt-2 font-medium">Total Reviews</p>
            </div>


            <div className="border rounded-3xl p-6 bg-base-200 border-gray-300 shadow text-center">
                <img
                    className="h-20 w-20 mx-auto mb-4"
                    src="https://i.ibb.co/wZzDNKg1/logo.png"
                    alt="Placed Jobs"
                />
                <h2 className="text-3xl font-bold text-purple-600">
                    <CountUp end={1900} duration={3} />+
                </h2>
                <p className="text-xl mt-2 font-medium">SUccessful Events</p>
            </div>


            <div className="border rounded-3xl p-6 bg-base-200 border-gray-300 shadow text-center">
                <img
                    className="h-20 w-20 mx-auto mb-4"
                    src="https://i.ibb.co/rfzSgZ0F/success-staffs.png"
                    alt="Total Companies"
                />
                <h2 className="text-3xl font-bold text-purple-600">
                    <CountUp end={300} duration={3} />+
                </h2>
                <p className="text-xl mt-2 font-medium">Upcoming events</p>
            </div>
        </div>
    );
};

export default Count;
