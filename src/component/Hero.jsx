import { BsListNested } from "react-icons/bs";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div
            className="py-12 md:py-20 px-6 text-center rounded-lg shadow-lg bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://i.ibb.co/gHSLkg5/Screenshot-2025-07-13-001353.png')",
            }}
        >
            <div className="max-w-4xl mx-auto   p-6 rounded-md">
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-200 leading-tight mb-4">
                    🌱 Join Hands to Build a Better Tomorrow!
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                    Connect with your community and contribute to events that bring
                    positive change — from{" "}
                    <span className="font-semibold text-emerald-600 dark:text-lime-300">
                        Tree Plantations
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-emerald-600 dark:text-lime-300">
                        Road Cleanups
                    </span>
                    !
                </p>
                <Link
                    to="/upcominevents"
                    className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md"
                >
                    🌿 Explore Upcoming Events
                </Link>
            </div>


        </div>
    );
};

export default Hero;
