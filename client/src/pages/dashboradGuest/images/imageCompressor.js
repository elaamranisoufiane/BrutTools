import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FileUp, FileDown, Settings } from 'lucide-react';

const ImageCompressor = () => {
    const [file, setFile] = useState(null);
    const [quality, setQuality] = useState(80);
    const [compressing, setCompressing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid image file.');
        }
    };

    const handleCompress = async () => {
        if (!file) {
            setError('Please select an image file first.');
            return;
        }

        setCompressing(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('image', file);
        formData.append('quality', quality);

        try {
            const response = await axios.post('/api/compress-image', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `compressed_${file.name}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            setFile(null);
            setSuccess('Image successfully compressed!');
        } catch (err) {
            console.error('Compression failed:', err);
            setError('An error occurred during compression. Please try again.');
        } finally {
            setCompressing(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Free Image Compressor</title>
                <meta name="description" content="Compress your images easily with our free tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Image Compressor</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Compress your images easily. Adjust quality to balance size and image quality.
                        </p>

                        <div className="flex flex-col items-center justify-center space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="file-input"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-input"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer inline-flex items-center"
                            >
                                <FileUp className="mr-2" size={20} />
                                Select Image
                            </label>

                            {file && (
                                <p className="text-sm text-gray-600">
                                    Selected file: {file.name}
                                </p>
                            )}

                            <div className="flex items-center space-x-2">
                                <Settings size={20} className="text-gray-600" />
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={quality}
                                    onChange={(e) => setQuality(e.target.value)}
                                    className="w-48"
                                />
                                <span className="text-sm text-gray-600">{quality}%</span>
                            </div>

                            <button
                                onClick={handleCompress}
                                disabled={!file || compressing}
                                className={`mt-4 ${!file || compressing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 px-6 rounded-lg inline-flex items-center`}
                            >
                                <FileDown className="mr-2" size={20} />
                                {compressing ? 'Compressing...' : 'Compress Image'}
                            </button>
                        </div>

                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ImageCompressor;