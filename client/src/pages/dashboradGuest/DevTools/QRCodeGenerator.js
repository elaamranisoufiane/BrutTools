import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Helmet } from 'react-helmet';

const QRCodeGenerator = () => {
    const [qrValue, setQRValue] = useState('');

    const qrRef = useRef();
    const handleCopyQRCode = () => {
        const svgElement = qrRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    // alert('QR code copied as an image!');
                }).catch((error) => {
                    console.error('Error copying QR code:', error);
                });
            });
        };
    };

    return (
        <>
            <Helmet>
                <title>Free QR Code Generator - Create QR Codes Instantly</title>
                <meta name="description" content="Generate QR codes easily for any text or URL with our free QR code generator tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">QR Code Generator</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Generate QR codes easily for any text or URL. Simply enter your content, and get a QR code instantly.
                        </p>
                        <div className="flex flex-col items-center">
                            <input
                                type="text"
                                value={qrValue}
                                onChange={(e) => setQRValue(e.target.value)}
                                placeholder="Enter text for QR code"
                                className="w-full p-2 mb-4 border rounded-md"
                            />
                            {qrValue && (
                                <div className="mt-4 flex flex-col items-center" ref={qrRef}>
                                    <QRCodeSVG value={qrValue} size={256} />
                                    <button
                                        onClick={handleCopyQRCode}
                                        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center hover:bg-blue-700 focus:outline-none"
                                    >
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 1024 1024"
                                            className="icon mr-2"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#ffffff"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M589.3 260.9v30H371.4v-30H268.9v513h117.2v-304l109.7-99.1h202.1V260.9z"
                                                    fill="#E1F0FF"
                                                ></path>
                                                <path
                                                    d="M516.1 371.1l-122.9 99.8v346.8h370.4V371.1z"
                                                    fill="#E1F0FF"
                                                ></path>
                                                <path
                                                    d="M752.7 370.8h21.8v435.8h-21.8z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M495.8 370.8h277.3v21.8H495.8z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M495.8 370.8h21.8v124.3h-21.8z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M397.7 488.7l-15.4-15.4 113.5-102.5 15.4 15.4z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M382.3 473.3h135.3v21.8H382.3z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M382.3 479.7h21.8v348.6h-21.8zM404.1 806.6h370.4v21.8H404.1z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M447.7 545.1h261.5v21.8H447.7zM447.7 610.5h261.5v21.8H447.7zM447.7 675.8h261.5v21.8H447.7z"
                                                    fill="#6D9EE8"
                                                ></path>
                                                <path
                                                    d="M251.6 763h130.7v21.8H251.6z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M251.6 240.1h21.8v544.7h-21.8zM687.3 240.1h21.8v130.7h-21.8zM273.4 240.1h108.9v21.8H273.4z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M578.4 240.1h130.7v21.8H578.4zM360.5 196.5h21.8v108.9h-21.8zM382.3 283.7h196.1v21.8H382.3zM534.8 196.5h65.4v21.8h-65.4z"
                                                    fill="#446EB1"
                                                ></path>
                                                <path
                                                    d="M360.5 196.5h65.4v21.8h-65.4zM404.1 174.7h152.5v21.8H404.1zM578.4 196.5h21.8v108.9h-21.8z"
                                                    fill="#446EB1"
                                                ></path>
                                            </g>
                                        </svg>
                                        Copy QR Code
                                    </button>
                                </div>

                            )}
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Instant QR Code Creation!</h3>
                        <p className="text-gray-600 mb-4">
                            Our QR code generator allows you to create QR codes for any text or URL with ease. Enter the information you need to encode, and generate a QR code in seconds.
                        </p>
                        <p className="text-gray-600">
                            If you have any questions or need assistance, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're here to help!
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default QRCodeGenerator;
