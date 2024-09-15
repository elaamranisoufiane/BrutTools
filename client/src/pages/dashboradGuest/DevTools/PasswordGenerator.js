import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useLowercase, setUseLowercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSpecialChars, setUseSpecialChars] = useState(true);

    const generatePassword = () => {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let chars = '';
        if (useUppercase) chars += uppercase;
        if (useLowercase) chars += lowercase;
        if (useNumbers) chars += numbers;
        if (useSpecialChars) chars += specialChars;

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(generatedPassword);
    };

    const handleCopyColor = () => {
        navigator.clipboard.writeText(password)
            .then()
            .catch(err => alert('Failed to copy password code.'));
    };


    return (
        <>
            <Helmet>
                <title>Free Password Generator - Create Secure Passwords Easily</title>
                <meta name="description" content="Generate strong and secure passwords with customizable options including length, uppercase, lowercase, numbers, and special characters." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Password Generator</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Create secure and random passwords with customizable options. Adjust the length and select the characters you want to include.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-gray-800">Password Length: {length}</label>
                                <input
                                    type="range"
                                    min="8"
                                    max="32"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="inline-flex items-center text-gray-800">
                                    <input
                                        type="checkbox"
                                        checked={useUppercase}
                                        onChange={() => setUseUppercase(!useUppercase)}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Uppercase</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center text-gray-800">
                                    <input
                                        type="checkbox"
                                        checked={useLowercase}
                                        onChange={() => setUseLowercase(!useLowercase)}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Lowercase</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center text-gray-800">
                                    <input
                                        type="checkbox"
                                        checked={useNumbers}
                                        onChange={() => setUseNumbers(!useNumbers)}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Numbers</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center text-gray-800">
                                    <input
                                        type="checkbox"
                                        checked={useSpecialChars}
                                        onChange={() => setUseSpecialChars(!useSpecialChars)}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Special Characters</span>
                                </label>
                            </div>
                            <button
                                onClick={generatePassword}
                                className="w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Generate Password
                            </button>
                            {password && (
                                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Generated Password:</h2>
                                    <p className="font-mono text-gray-800">{password}</p>
                                    <button
                                        onClick={handleCopyColor}
                                        className="mt-4 font-bold py-2 px-4 rounded flex items-center justify-center"
                                    >
                                        <svg width="50px" height="50px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M589.3 260.9v30H371.4v-30H268.9v513h117.2v-304l109.7-99.1h202.1V260.9z" fill="#E1F0FF"></path><path d="M516.1 371.1l-122.9 99.8v346.8h370.4V371.1z" fill="#E1F0FF"></path><path d="M752.7 370.8h21.8v435.8h-21.8z" fill="#446EB1"></path><path d="M495.8 370.8h277.3v21.8H495.8z" fill="#446EB1"></path><path d="M495.8 370.8h21.8v124.3h-21.8z" fill="#446EB1"></path><path d="M397.7 488.7l-15.4-15.4 113.5-102.5 15.4 15.4z" fill="#446EB1"></path><path d="M382.3 473.3h135.3v21.8H382.3z" fill="#446EB1"></path><path d="M382.3 479.7h21.8v348.6h-21.8zM404.1 806.6h370.4v21.8H404.1z" fill="#446EB1"></path><path d="M447.7 545.1h261.5v21.8H447.7zM447.7 610.5h261.5v21.8H447.7zM447.7 675.8h261.5v21.8H447.7z" fill="#6D9EE8"></path><path d="M251.6 763h130.7v21.8H251.6z" fill="#446EB1"></path><path d="M251.6 240.1h21.8v544.7h-21.8zM687.3 240.1h21.8v130.7h-21.8zM273.4 240.1h108.9v21.8H273.4z" fill="#446EB1"></path><path d="M578.4 240.1h130.7v21.8H578.4zM360.5 196.5h21.8v108.9h-21.8zM382.3 283.7h196.1v21.8H382.3zM534.8 196.5h65.4v21.8h-65.4z" fill="#446EB1"></path><path d="M360.5 196.5h65.4v21.8h-65.4zM404.1 174.7h152.5v21.8H404.1zM578.4 196.5h21.8v108.9h-21.8z" fill="#446EB1"></path></g></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Generate Strong Passwords Instantly!</h3>
                        <p className="text-gray-600 mb-4">
                            Our password generator helps you create strong and secure passwords tailored to your needs. Customize the length and character types to generate passwords that meet your security requirements.
                        </p>
                        <p className="text-gray-600">
                            For assistance or any inquiries, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're here to help with any questions you may have!
                        </p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default PasswordGenerator;