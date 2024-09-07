import { Helmet } from 'react-helmet';

export default function About() {

    return (

        <>

            <Helmet>
                <title>About Us</title>
                <meta name="description" content="About BrutTools." />
            </Helmet>

            <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
                <div className="container bg-white p-10 rounded-lg  mx-auto flex-col">
                    <div className="">

                        <div className="md:p-8">
                            <h2 className="text-3xl font-semibold mb-6 text-center">About Us</h2>

                            <p className="text-xl mb-8">
                                Welcome to <span className='font-bold'>BrutTools</span>, your destination for a suite of innovative tools designed to simplify your digital tasks. Founded in 2024, BrutTools is dedicated to providing powerful, intuitive solutions that enhance productivity and creativity. Our goal is to build a platform that offers versatile, easy-to-use tools for individuals and professionals alike.
                            </p>

                            <div className="mb-4 text-xl font-semibold">Our Story</div>
                            <p className="mb-6">
                                In 2024, BrutTools was created with the mission to offer a comprehensive set of tools that cater to various needs. From its humble beginnings, BrutTools has grown by focusing on innovation and user satisfaction. Our platform is continually evolving to meet the diverse needs of our users, and we are committed to expanding our range of offerings.
                            </p>

                            <div className="mb-4 text-xl font-semibold">Our Technologies</div>
                            <p className="mb-6">
                                At BrutTools, we leverage the latest technologies and follow the best coding practices. Our current and upcoming tools include powerful features that allow you to streamline your tasks. Our existing toolset includes:</p>
                            <p className="mb-6">
                                <b>1. [Tube Downloader]</b>: Brief description of the tool.
                            </p>

                            And more tools.

                            <div className="mb-4 text-xl font-semibold">Our Values</div>
                            <p className="mb-6">
                                We are driven by our core values of innovation, quality, and user satisfaction. Our commitment includes:
                            </p>
                            <p className="mb-6">
                                <b>•</b> Constantly improving and expanding our tools.
                            </p>
                            <p className="mb-6">
                                <b>•</b> Providing reliable, high-quality solutions.
                            </p>
                            <p className="mb-6">
                                <b>•</b> Offering exceptional customer support and listening to user feedback.
                            </p>

                            <div className="mb-4 text-xl font-semibold">Support & Community</div>
                            <p className="mb-6">
                                We believe in fostering a strong community of users who can share their experiences and insights. Our support team is always here to assist you with any questions or issues. Feel free to contact us at [javatp01@gmail.com].
                            </p>

                            <div className="mb-4 text-xl font-semibold">What's Next?</div>
                            <p className="mb-6">
                                We have exciting plans to introduce even more tools that cater to your evolving needs. Stay tuned for future updates as we continue to expand BrutTools into a comprehensive platform for all your digital needs.
                            </p>

                            <div className="mb-4 text-xl font-semibold">Contact Us</div>
                            <p className="mb-6">
                                We'd love to hear from you! For inquiries, support, or feedback, reach out to us at support bruttools.com. Follow us on social media to stay updated on our latest news and updates.
                            </p>

                            <div className="text-xl text-center mb-8">Ready to explore BrutTools? <a href="/register">Sign up </a>today and unlock a world of possibilities!</div>

                            <p className="text-center">Thank you for choosing BrutTools. Together, we can create something amazing!</p>
                        </div>


                    </div>
                </div>
            </main>

        </>

    );
}
