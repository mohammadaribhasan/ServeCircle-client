import React from 'react';

const Subscription = () => {
    return (
        <div>
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-col lg:flex-row gap-8">

                    {/* Gallery Section */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <img
                                src="https://i.ibb.co/yF1R4n9g/download.jpg"
                                alt="event1"
                                className="rounded-lg shadow-md w-full h-48 object-cover"
                            />
                            <img
                                src="https://i.ibb.co/21MLY3vL/download.jpg"
                                alt="event2"
                                className="rounded-lg shadow-md w-full h-48 object-cover"
                            />
                            <img
                                src="https://i.ibb.co/svVq6zV7/download.jpg"
                                alt="event3"
                                className="rounded-lg shadow-md w-full h-48 object-cover"
                            />
                            <img
                                src="https://i.ibb.co/JFrD5xTp/download.png"
                                alt="event4"
                                className="rounded-lg shadow-md w-full h-48 object-cover"
                            />

                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full lg:w-1/2 bg-green-50 p-6 rounded-lg">
                        <div className="text-center">
                            <h2 className="text-3xl text-black font-bold mb-4">Subscribe to Our Newsletter</h2>
                            <p className="text-gray-600 mb-6">
                                Stay updated with upcoming events and community news!
                            </p>
                            <form onSubmit={(e) => {
                                e.preventDefault(); // ✅ prevents reload
                                // You can optionally log or toast here
                                console.log("Subscribed!");
                            }}
                                className="flex flex-col sm:flex-row justify-center gap-4"
                            >
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 border rounded-md w-full sm:w-auto"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-green-700"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Subscription;