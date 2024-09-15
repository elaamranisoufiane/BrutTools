import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState('en');

    useEffect(() => {
        // Fetch available voices on component mount
        const fetchVoices = async () => {
            try {
                const response = await fetch('/api/voices');
                if (response.ok) {
                    const data = await response.json();
                    setVoices(data.voices);
                } else {
                    throw new Error('Failed to fetch voices');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchVoices();
    }, []);

    const handleSpeak = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/text-to-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, voice: selectedVoice }),
            });

            if (!response.ok) throw new Error('Failed to convert text to speech');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setAudioUrl(url);
            const audio = new Audio(url);
            audio.play();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Free Text to Speech Converter - Convert Your Text to Speech Instantly</title>
                <meta name="description" content="Convert your text into speech instantly with our free text-to-speech tool. Experience seamless audio conversion." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Text to Speech</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convert your text into natural-sounding speech with our easy-to-use text-to-speech converter.
                        </p>
                        <div className="flex flex-col space-y-4">
                            {audioUrl && (
                                <a href={audioUrl} download="speech.mp3" className="mt-2 text-blue-500 hover:underline">
                                    Download Audio
                                </a>
                            )}
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter text to convert to speech"
                                className="w-full p-2 border rounded-md h-40"
                            />
                            <select
                                value={selectedVoice}
                                onChange={(e) => setSelectedVoice(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                {voices.map((voice) => (
                                    <option key={voice.code} value={voice.code}>
                                        {voice.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleSpeak}
                                disabled={isLoading || !text}
                                className="w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                            >
                                {isLoading ? 'Converting...' : 'Speak'}
                            </button>

                            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Instant Speech Conversion!</h3>
                        <p className="text-gray-600 mb-4">
                            Our text-to-speech tool provides an effortless way to convert your text into speech. Simply enter your text and click 'Speak' to hear it in audio form.
                        </p>
                        <p className="text-gray-600">
                            For any assistance or inquiries, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're here to help!
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TextToSpeech;
