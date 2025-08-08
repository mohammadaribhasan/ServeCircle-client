
import Hero from '../component/Hero';
import Count from '../component/Count';
// ✅ Import
import HowToUse from './HowToUse';
import Subscription from '../component/Subscription';

const Home = () => {

    return (
        <div className="bg-background text-foreground min-h-screen">
            <Hero />


            <HowToUse />
            <Subscription />

            {/* Service Review Section */}
            <section className="mt-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">Our Service Review</h2>
                </div>
                <Count />
            </section>

        </div>
    );
};

export default Home;
