const PricingSection = () => {
    return (
        <section className="pricing-section text-violet-900 px-6 py-16 md:py-24">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-12">
                    Choose Your Plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Basic Plan */}
                    <div className="pricing-card p-6 bg-zinc-800 text-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Basic</h3>
                        <p className="text-gray-600 mb-6">Great for individuals starting out.</p>
                        <div className="text-4xl font-bold mb-6">Free</div>
                        <ul className="text-gray-600 mb-6">
                            <li className="mb-2">Up to 5 minutes per video</li>
                            <li className="mb-2">Basic sharing options</li>
                            <li className="mb-2">Community support</li>
                        </ul>
                        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="pricing-card p-6 bg-zinc-800 text-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Pro</h3>
                        <p className="text-gray-600 mb-6">Perfect for professionals.</p>
                        <div className="text-4xl font-bold mb-6">$15/mo</div>
                        <ul className="text-gray-600 mb-6">
                            <li className="mb-2">Unlimited video length</li>
                            <li className="mb-2">Advanced sharing options</li>
                            <li className="mb-2">Priority support</li>
                        </ul>
                        <button className="bg-amber-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700">
                            Get Pro
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="pricing-card p-6 bg-zinc-800 text-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
                        <p className="text-gray-600 mb-6">Tailored for teams and businesses.</p>
                        <div className="text-4xl font-bold mb-6">Contact Us</div>
                        <ul className="text-gray-600 mb-6">
                            <li className="mb-2">Custom video solutions</li>
                            <li className="mb-2">Team collaboration tools</li>
                            <li className="mb-2">Dedicated support</li>
                        </ul>
                        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
