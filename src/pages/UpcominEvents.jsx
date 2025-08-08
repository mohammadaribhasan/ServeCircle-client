import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Typewriter } from 'react-simple-typewriter';

const loaderStyle = {
    transform: "rotateZ(45deg)",
    perspective: "1000px",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    color: "#008000",
    position: "relative",
};

const beforeAfterStyle = {
    content: "''",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "inherit",
    height: "inherit",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
};

const beforeStyle = {
    ...beforeAfterStyle,
    transform: "rotateX(70deg)",
};

const afterStyle = {
    ...beforeAfterStyle,
    color: "#FF3D00",
    transform: "rotateY(70deg)",
    animationDelay: "0.4s",
};

const UpcominEvents = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://bacand-for-eleven.vercel.app/events`);
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.eventType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <section className="mt-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-green-300 to-purple-600 bg-clip-text text-transparent">
                        Here You Can Join Us <br />
                        With
                        <Typewriter
                            words={[' Workshop', ' Awareness', ' Donation', ' Plantation', ' Cleanup']}
                            loop={0}
                            cursor
                            cursorStyle="...."
                            typeSpeed={80}
                            deleteSpeed={60}
                            delaySpeed={1500}
                        />
                    </h2>
                    <p className="mt-3 max-w-xl mx-auto text-muted text-lg">
                        Join us and be part of something great...!
                    </p>

                    {/* 🔍 Search Input */}
                    <div className="mt-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title or type..."
                            className="w-full sm:w-96 p-2 border border-gray-300 rounded-lg shadow-sm text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-lg font-semibold">
                        <style>{`
                            @keyframes spin {
                              0%, 100% {
                                box-shadow: .2em 0px 0 0px currentColor;
                              }
                              12% {
                                box-shadow: .2em .2em 0 0 currentColor;
                              }
                              25% {
                                box-shadow: 0 .2em 0 0px currentColor;
                              }
                              37% {
                                box-shadow: -.2em .2em 0 0 currentColor;
                              }
                              50% {
                                box-shadow: -.2em 0 0 0 currentColor;
                              }
                              62% {
                                box-shadow: -.2em -.2em 0 0 currentColor;
                              }
                              75% {
                                box-shadow: 0px -.2em 0 0 currentColor;
                              }
                              87% {
                                box-shadow: .2em -.2em 0 0 currentColor;
                              }
                            }
                        `}</style>
                        <span style={loaderStyle}>
                            <span style={beforeStyle}></span>
                            <span style={afterStyle}></span>
                        </span>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center text-lg font-semibold">No events found.</div>
                ) : (
                    <Card tasks={filteredEvents} />
                )}
            </section>
        </div>
    );
};

export default UpcominEvents;
