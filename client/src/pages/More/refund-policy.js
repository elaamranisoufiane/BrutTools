import { Helmet } from 'react-helmet';

export default function Refund() {

    return (

        <>

            <Helmet>
                <title>Refund Policy</title>
                <meta name="description" content="Refund Policy of BrutTools." />
            </Helmet>

            <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
                <div className="container bg-white p-10 rounded-lg  mx-auto flex-col">
                    <div className="">

                        <div className="md:p-8">
                            <h2 className="text-3xl font-semibold mb-6 text-center">Refund Policy</h2>

                            <p className="text-xl mb-8">
                                Welcome to BrutTools.com. This Refund Policy outlines the conditions under which you may request a refund for services purchased through our website. By using our services, you agree to this policy. If you do not agree with these terms, please do not use our services.
                            </p>

                            <div className="mb-4 text-xl font-semibold">1. Eligibility for Refunds</div>
                            <p className="mb-6">
                                Refunds are applicable under the following conditions:
                            </p>
                            <ul className="list-disc pl-5 mb-6">
                                <li>If you experience technical issues that prevent you from using our services as described.</li>
                                <li>If you cancel your subscription within 03 days of purchase and have used less than 10% of the service quota (monthly subscription only).</li>
                            </ul>
                            <p className="mb-6">Refunds are not applicable if:</p>
                            <ul className="list-disc pl-5 mb-6">
                                <li>You have used more than 10% of the service quota (monthly subscription only).</li>
                                <li>The refund request is made after 03 days from the date of purchase.</li>
                                <li>The request is for a non-refundable service (see Section 6).</li>
                            </ul>

                            <div className="mb-4 text-xl font-semibold">2. Types of Refunds</div>
                            <ul className="list-disc pl-5 mb-6">
                                <li><b>Full Refunds</b>: Issued if you cancel your subscription within 03 days of purchase and have not used more than 10% of the service quota (monthly subscription only).</li>
                                <li><b>Partial Refunds</b>: Issued on a case-by-case basis for services partially used or if there are minor technical issues.</li>
                                <li><b>Pro-Rata Refunds</b>: Issued if you cancel an annual subscription partway through the year, based on the remaining months.</li>
                            </ul>

                            <div className="mb-4 text-xl font-semibold">3. Refund Request Process</div>
                            <p className="mb-6">To request a refund:</p>
                            <ul className="list-disc pl-5 mb-6">
                                <li>Contact us at [support javatp01@gmail.com] within 03 days of your purchase.</li>
                                <li>Provide your BrutTools account details (Email & Username), purchase information, and reason for the refund request.</li>
                                <li>Our team will review your request and respond within 5 business days.</li>
                            </ul>

                            <div className="mb-4 text-xl font-semibold">4. Timeframe for Refund Processing</div>
                            <ul className="list-disc pl-5 mb-6">
                                <li><b>Refund Approval</b>: Typically within 5 business days of receiving your request.</li>
                                <li><b>Refund Issuance</b>: Once approved, refunds will be processed and returned to your original payment method within 07 business days.</li>
                            </ul>

                            <div className="mb-4 text-xl font-semibold">5. Refund Method</div>
                            <ul className="list-disc pl-5 mb-6">
                                <li>Refunds will be issued to the original payment method used at the time of purchase.</li>
                                <li>Alternative refund methods may be considered on a case-by-case basis.</li>
                            </ul>

                            <div className="mb-4 text-xl font-semibold">6. Non-Refundable Services</div>
                            <p className="mb-6">The following services/products are non-refundable:</p>
                            <ul className="list-disc pl-5 mb-6">
                                <li>One-time purchases that have been used.</li>
                                <li>Customized services or special orders.</li>
                                <li>Any promotional or discounted services marked as non-refundable.</li>
                            </ul>

                            <div className="mb-4 text-xl font-semibold">7. Contact Information</div>
                            <p className="mb-6">If you have any questions or concerns about our Refund Policy, please contact us at:</p>
                            <ul className="list-disc pl-5 mb-6">
                                <li><b>Email</b>: support : javatp01@gmail.com</li>
                            </ul>

                            <p className="text-center">Thank you for choosing BrutTools. We are committed to providing you with high-quality services and support.</p>
                        </div>



                    </div>
                </div>
            </main>

        </>

    );
}
