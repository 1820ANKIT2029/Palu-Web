const ContactSection = () => {
    return (
        <section className="contact-section text-gray-300 px-6 py-16 md:py-24">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
                    Get in Touch
                </h2>
                <p className="text-center text-gray-400 mb-8">
                    Have questions or feedback? We'd love to hear from you!
                </p>
                <form className="p-6 rounded-lg shadow-lg bg-stone-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-500 font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-500 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Your Email"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-500 font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            className="w-full border border-gray-300 rounded-lg py-3 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            rows={5}
                            placeholder="Your Message"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;