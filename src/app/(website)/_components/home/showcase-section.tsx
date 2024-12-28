const ShowcaseSection = () => {
    return (
        <section className="showcase-section text-white-900 px-6 py-16 md:py-24">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="feature-card p-6 bg-zinc-900 rounded-lg shadow-lg text-center hover:bg-zinc-950">
                        <img
                            height="100"
                            width="100"
                            src="showcase1.svg"
                            alt="Feature Icon 1"
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                        <p className="text-gray-600">
                            A user-friendly interface that makes recording and sharing effortless.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-card p-6 bg-zinc-900 rounded-lg shadow-lg text-center hover:bg-zinc-950">
                        <img
                            height="100"
                            width="100"
                            src="showcase2.svg"
                            alt="Feature Icon 2"
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">High Quality</h3>
                        <p className="text-gray-600">
                            Crystal-clear video and audio to ensure your message is understood.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-card p-6 bg-zinc-900 rounded-lg shadow-lg text-center hover:bg-zinc-950">
                        <img
                            height="100"
                            width="100"
                            src="showcase3.svg"
                            alt="Feature Icon 3"
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">Fast Sharing</h3>
                        <p className="text-gray-600">
                            Share your recordings instantly with just a few clicks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;