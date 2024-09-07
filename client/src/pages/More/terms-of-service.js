import { Helmet } from 'react-helmet';

export default function TermsOfService() {

    return (

        <>

            <Helmet>
                <title>Terms & Conditons</title>
                <meta name="description" content="Terms and Conditions on BrutTools." />
            </Helmet>

            <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
                <div className="container bg-white p-10 rounded-lg mx-auto flex-col">

                    <div className="">

                        <div className="md:p-8">
                            <h2 className="text-3xl font-semibold mb-6 text-center">Terms of Service</h2>
                            <p className="text-xl mb-8">
                                Welcome to BrutTools.com. By using our website and services, you agree to these Terms. If you disagree, please refrain from using our services. We may update these terms, and your continued use of BrutTools signifies acceptance of the changes.
                            </p>

                            <div className="mb-4 text-xl font-semibold">1. Definitions</div>
                            <p className="mb-6">
                                <b>(a) “BrutTools,” “we,” “us,” or “our”</b>: Refers to BrutTools.com and its services.
                            </p>
                            <p className="mb-6">
                                <b>(b) “User,” “you,” or “your”</b>: Refers to anyone using our services.
                            </p>
                            <p className="mb-6">
                                <b>(c) “Services”</b>: Includes all products and tools provided by BrutTools.
                            </p>

                            <div className="mb-4 text-xl font-semibold">2. Acceptance of Terms</div>
                            <p className="mb-6">
                                By using BrutTools, you confirm you’ve read and agree to these Terms, which apply to all users, including customers and visitors.
                            </p>

                            <div className="mb-4 text-xl font-semibold">3. Use of the Service</div>
                            <p className="mb-6">
                                <b>(a) Eligibility</b>: You must be at least 13 years old to use our services.
                            </p>
                            <p className="mb-6">
                                <b>(b) Account Responsibility</b>: Maintain your account confidentiality and notify us of any unauthorized use.
                            </p>

                            <div className="mb-4 text-xl font-semibold">4. Subscription Plans</div>
                            <p className="mb-6">
                                <b>(a) Plans</b>: We offer free and paid plans with specific features.
                            </p>
                            <p className="mb-6">
                                <b>(b) Payment and Refunds</b>: Refunds follow our website’s refund policy.
                            </p>

                            <div className="mb-4 text-xl font-semibold">5. User Conduct</div>
                            <p className="mb-6">
                                <b>(a) Acceptable Use</b>: Use our services lawfully and as per these terms.
                            </p>
                            <p className="mb-6">
                                <b>(b) Prohibited Activities</b>: Avoid illegal uses or distributing harmful software.
                            </p>

                            <div className="mb-4 text-lg font-semibold">6. Intellectual Property</div>
                            <p className="mb-6">
                                <b>(a) Content</b>: All content from BrutTools is protected by intellectual property laws.
                            </p>
                            <p className="mb-6">
                                <b>(b) User Content</b>: You retain ownership of your content but grant us a license to use it for providing our services.
                            </p>

                            <div className="mb-4 text-lg font-semibold">7. Privacy Policy</div>
                            <p className="mb-6">
                                Our Privacy Policy details how we handle your personal data. By using our services, you agree to our data practices.
                            </p>

                            <div className="mb-4 text-lg font-semibold">8. Disclaimers and Liability</div>
                            <p className="mb-6">
                                <b>(a) “As Is”</b>: BrutTools is provided without warranties, and we’re not liable for inaccuracies or damages.
                            </p>

                            <div className="mb-4 text-lg font-semibold">9. Indemnification</div>
                            <p className="mb-6">
                                You agree to indemnify us against any claims or damages arising from your use of our services or violation of these terms.
                            </p>

                            <div className="mb-4 text-lg font-semibold">10. Changes to Service and Terms</div>
                            <p className="mb-6">
                                We may modify or discontinue our services and update these Terms. Changes will be posted on our site.
                            </p>

                            <div className="mb-4 text-lg font-semibold">11. Termination</div>
                            <p className="mb-6">
                                We can suspend or terminate your access for violating these terms. Termination will cease your right to use our services.
                            </p>

                            <div className="mb-4 text-lg font-semibold">12. Governing Laws</div>
                            <p className="mb-6">
                                These Terms are governed by Moroccan law. Disputes will be resolved through binding arbitration.
                            </p>

                            <div className="mb-4 text-lg font-semibold">13. Contact Information</div>
                            <p className="mb-6">
                                For questions about these Terms, contact us at support javatp01@gmail.com.
                            </p>
                            <p className="mb-8 text-xl text-center">
                                Thank you for using BrutTools. We strive to provide you with the best experience.
                            </p>
                        </div>

                    </div>



                </div>
            </main>

        </>
    );
}
