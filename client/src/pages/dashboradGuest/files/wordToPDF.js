import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FileUp, FileDown } from 'lucide-react';

const WordToPDFConverter = () => {
    const [file, setFile] = useState(null);
    const [converting, setConverting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid Word document (.docx)');
        }
    };

    const handleConvert = async () => {
        if (!file) {
            setError('Please select a Word document first.');
            return;
        }

        setConverting(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await axios.post('/api/word-to-pdf', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setFile(null);
            setSuccess('PDF successfully generated!');
        } catch (err) {
            console.error('Conversion failed:', err);
            setError('An error occurred during conversion. Please try again.');
        } finally {
            setConverting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Free Word to PDF Converter</title>
                <meta name="description" content="Convert Word documents to PDF with one click using our free tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Word to PDF Converter</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convert your Word documents to PDF easily. Supports .docx files.
                        </p>

                        <div className="flex flex-col items-center justify-center space-y-4">
                            {!file ? (
                                <>
                                    <input
                                        type="file"
                                        accept=".docx"
                                        className="hidden"
                                        id="file-input"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="file-input"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-flex items-center"
                                    >
                                        <FileUp className="mr-2" size={20} />
                                        Select Word Document
                                    </label>
                                </>
                            ) : (
                                <>
                                    {file && (
                                        <p className="text-sm text-gray-600">
                                            Selected file: {file.name}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleConvert}
                                        disabled={!file || converting}
                                        className={`mt-4 ${!file || converting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 px-6 rounded-lg inline-flex items-center`}
                                    >
                                        <FileDown className="mr-2" size={20} />
                                        {converting ? 'Converting...' : 'Convert to PDF'}
                                    </button>
                                </>
                            )}
                        </div>

                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Easily Convert Word Documents to PDF!</h3>
                        <p className="text-gray-600 mb-4">
                            Our free Word to PDF converter allows you to quickly transform your Word documents into PDF files. Just upload your .docx file and let our tool handle the conversion. Ideal for creating shareable documents, reports, and more.
                        </p>
                        <p className="text-gray-600">
                            If you need any assistance or have questions, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're always here to help!
                        </p>
                    </div>

                </div>
            </main>
        </>
    );
};

export default WordToPDFConverter;