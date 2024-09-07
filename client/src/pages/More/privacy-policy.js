import { Helmet } from 'react-helmet';

export default function Privacy() {

    return (

        <>

            <Helmet>
                <title>Privacy Policy</title>
                <meta name="description" content="Privacy Policy." />
            </Helmet>

            <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
                <div className="container bg-white p-10 rounded-lg mx-auto flex-col">
                    <div className="">

                        <div className="md:p-8">
                            <h2 className="text-3xl font-semibold mb-6 text-center">Privacy Policy</h2>
                            <p className="mb-6 text-xl">
                                Last updated: Sep 7, 2024.
                            </p>
                            <p className="mb-6">
                                Welcome to BrutTools.com. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website and services. By accessing or using BrutTools, you agree to the terms of this policy. If you do not agree with these terms, please do not use our services. We may update this policy from time to time, and any changes will be posted on this page.
                            </p>

                            <div className="mb-4 text-xl font-semibold">1. Information We Collect</div>
                            <p className="mb-6">
                                <b>(a) Personal Information</b>: When you create an account, subscribe to our services, or contact us, we may collect personal information such as your name, email address, and payment details.
                            </p>
                            <p className="mb-6">
                                <b>(b) Non-Personal Information</b>: We also collect non-personal information, including browser type, device information, IP address, and usage data through cookies and other tracking technologies.
                            </p>
                            <p className="mb-6">
                                <b>(c) How Information is Collected</b>: Information is collected through account creation, service usage, direct interactions, and automated technologies such as cookies.
                            </p>

                            <div className="mb-4 text-xl font-semibold">2. How We Use Your Information</div>
                            <p className="mb-6">
                                <b>(a) To Provide and Improve Services</b>: We use your information to deliver and enhance our services, ensuring you have the best possible experience.
                            </p>
                            <p className="mb-6">
                                <b>(b) To Personalize User Experience</b>: Your information helps us tailor our services to your preferences and needs.
                            </p>
                            <p className="mb-6">
                                <b>(c) For Communication Purposes</b>: We use your contact information to communicate with you about updates, offers, and support.
                            </p>
                            <p className="mb-6">
                                <b>(d) For Security and Fraud Prevention</b>: Your information is used to protect against, identify, and prevent fraudulent activities and security threats.
                            </p>

                            <div className="mb-4 text-xl font-semibold">3. Sharing Your Information</div>
                            <p className="mb-6">
                                <b>(a) With Third-Party Service Providers</b>: We may share your information with trusted third-party providers who assist us in operating our website and services.
                            </p>
                            <p className="mb-6">
                                <b>(b) For Legal Purposes</b>: We may disclose your information if required by law or to protect our rights and the rights of others.
                            </p>
                            <p className="mb-6">
                                <b>(c) In Case of Business Transfer</b>: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.
                            </p>

                            <div className="mb-4 text-xl font-semibold">4. Cookies and Tracking Technologies</div>
                            <p className="mb-6">
                                <b>(a) Types of Cookies Used</b>: We use cookies to collect information about your browsing activities to enhance your experience on our site.
                            </p>
                            <p className="mb-6">
                                <b>(b) Purpose of Cookies</b>: Cookies help us understand how you use our site, remember your preferences, and improve our services.
                            </p>
                            <p className="mb-6">
                                <b>(c) Managing Cookie Preferences</b>: You can manage your cookie preferences through your browser settings. However, disabling cookies may affect your experience on our site.
                            </p>

                            <div className="mb-4 text-xl font-semibold">5. Data Security</div>
                            <p className="mb-6">
                                <b>(a) Measures Taken to Protect Your Information</b>: We implement a variety of security measures to safeguard your personal information from unauthorized access, use, or disclosure.
                            </p>
                            <p className="mb-6">
                                <b>(b) Security Practices and Protocols</b>: Our security practices include encryption, secure servers, and regular security assessments.
                            </p>
                            <p className="mb-6">
                                <b>(c) User Responsibilities for Maintaining Security</b>: You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                            </p>

                            <div className="mb-4 text-xl font-semibold">6. Data Retention</div>
                            <p className="mb-6">
                                <b>(a) How Long We Retain Your Information</b>: We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy.
                            </p>
                            <p className="mb-6">
                                <b>(b) Criteria for Data Retention Periods</b>: Retention periods are determined based on the type of information, the purpose for its use, and legal requirements.
                            </p>
                            <p className="mb-6">
                                <b>(c) Deletion of User Data</b>: You can request the deletion of your personal data by contacting us at support [@] bruttools.com. We will respond to your request in accordance with applicable laws.
                            </p>

                            <div className="mb-4 text-xl font-semibold">7. Changes to This Policy</div>
                            <p className="mb-6">
                                <b>(a) Right to Modify the Policy</b>: We reserve the right to update or change this Privacy Policy at any time.
                            </p>
                            <p className="mb-6">
                                <b>(b) Notification of Changes</b>: We will notify you of significant changes by posting the new policy on this page and updating the effective date.
                            </p>
                            <p className="mb-6">
                                <b>(c) Effective Date of Changes</b>: Changes to the policy will be effective immediately upon posting, unless otherwise stated.
                            </p>

                            <div className="mb-4 text-xl font-semibold">8. Contact Information</div>
                            <p className="mb-6">
                                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
