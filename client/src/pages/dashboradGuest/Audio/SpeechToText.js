import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';

const SpeechToText = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const mediaRecorder = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);

            mediaRecorder.current.ondataavailable = async (event) => {
                if (event.data.size > 0) {
                    const formData = new FormData();
                    formData.append('audio', event.data, 'recording.wav');

                    try {
                        const response = await fetch('/api/speech-to-text', {
                            method: 'POST',
                            body: formData,
                        });

                        if (!response.ok) throw new Error('Failed to convert speech to text');

                        const result = await response.json();
                        setText(result.text);
                    } catch (err) {
                        setError('Error sending audio to server: ' + err.message);
                    }
                }
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (err) {
            setError('Error starting recording: ' + err.message);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Free Speech to Text Converter - Convert Your Speech to Text Easily</title>
                <meta name="description" content="Convert your speech into text effortlessly with our speech-to-text converter. Experience accurate transcription instantly." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Speech to Text</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convert your speech into text with our easy-to-use tool. Start and stop recording to transcribe your speech instantly.
                        </p>
                        <div className="text-center flex flex-col space-y-4">
                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg ${isRecording ? 'bg-red-500' : ''}`}
                            >
                                {isRecording ? 'Stop Recording' : 'Start Recording'}
                            </button>
                            {text && (
                                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Transcribed Text:</h2>
                                    <p className="text-gray-800">{text}</p>
                                </div>
                            )}
                            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Instant Speech Conversion!</h3>
                        <p className="text-gray-600 mb-4">
                            Our speech-to-text tool enables you to convert your spoken words into written text quickly and accurately. Click 'Start Recording' to begin, and 'Stop Recording' to finish.
                        </p>
                        <p className="text-gray-600">
                            For any assistance or questions, feel free to <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We’re here to assist you!
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SpeechToText;
