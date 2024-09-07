import { Helmet } from 'react-helmet';

export default function CookiesSettings() {

    return (

        <>

            <Helmet>
                <title>Cookies</title>
                <meta name="description" content="Cookies - BrutTools" />
            </Helmet>

            <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
                <div className="container bg-white p-10 rounded-lg mx-auto flex-col">
                    <div className="">

                        <div className="md:p-8">
                            <h2 className="text-3xl font-semibold mb-6 text-center">Cookies</h2>

                            <p className="mb-6">
                                Welcome to BrutTools.com. This Cookies Policy explains how we use cookies and similar tracking technologies on our website. By using BrutTools, you agree to the use of cookies as described in this policy. If you do not agree with the use of cookies, you may disable them through your browser settings. Please note that disabling cookies may affect your experience on our website.
                            </p>

                            <div className="mb-4 text-xl font-semibold">1. What are Cookies?</div>
                            <p className="mb-6">
                                Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, provide personalized experiences, and gather information about users’ browsing habits.
                            </p>

                            <div className="mb-4 text-xl font-semibold">2. How We Use Cookies</div>
                            <p className="mb-6">
                                We use cookies for various purposes, including:
                            </p>
                            <p className="mb-6">
                                <b>(a) Essential Cookies</b>: These cookies are necessary for the functioning of our website and cannot be disabled.
                            </p>
                            <p className="mb-6">
                                <b>(b) Performance Cookies</b>: These cookies help us analyze how users interact with our website, so we can improve its performance.
                            </p>
                            <p className="mb-6">
                                <b>(c) Functional Cookies</b>: These cookies enable enhanced functionality and personalization, such as remembering preferences you have selected.
                            </p>
                            <p className="mb-6">
                                <b>(d) Targeting/Advertising Cookies</b>: These cookies are used to deliver advertisements relevant to your interests based on your browsing activities.
                            </p>

                            <div className="mb-4 text-xl font-semibold">3. Managing Cookies</div>
                            <p className="mb-6">
                                You can control and manage cookies through your browser settings. Here’s how you can do it:
                            </p>
                            <p className="mb-6">
                                <b>(a) Browser Settings</b>: You can set your browser to accept or reject cookies, or to notify you when a cookie is being sent.
                            </p>
                            <p className="mb-6">
                                <b>(b) Blocking Cookies</b>: If you choose to block cookies, please note that some parts of our website may not function properly.
                            </p>

                            <div className="mb-4 text-xl font-semibold">4. Third-Party Cookies</div>
                            <p className="mb-6">
                                We may also use third-party cookies on our website for various purposes, including analytics and advertising. These cookies are governed by the privacy policies of the respective third parties.
                            </p>

                            <div className="mb-4 text-xl font-semibold">5. Changes to Cookie Policy</div>
                            <p className="mb-6">
                                We reserve the right to update or change this Cookies Policy at any time. Any changes will be effective immediately upon posting the revised policy on our website.
                            </p>

                            <div className="mb-4 text-xl font-semibold">6. Contact Information</div>
                            <p className="mb-6">
                                If you have any questions or concerns about our use of cookies or this Cookies Policy, please contact us at:
                            </p>
                            <p className="mb-6">
                                <b>Email</b>: javatp01@gmail.com
                            </p>

                            <p className="md-8 text-xl text-center">
                                Thank you for using BrutTools. We are committed to protecting your privacy and providing you with a secure and enjoyable experience.
                            </p>
                        </div>

                    </div>
                </div>
            </main>

        </>

    );
}
