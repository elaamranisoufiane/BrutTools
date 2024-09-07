import axios from 'axios';
import React, { useState } from 'react';
const getUsername = async () => {
    try {
        const response = await axios.get('/getUser', {
            withCredentials: true,
        });
        const isAuthenticated = JSON.stringify(response.data);

        return response.data
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
};

const username = await getUsername().then((result) => {
    return result.username;
});

export default function Overview() {

    return (


        <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
            <div className="container bg-white p-10 rounded-lg mx-auto flex-col">
                <div className="">

                    <div className="md:p-8">
                        <h2 className="text-3xl font-semibold mb-6 text-center">Overview</h2>

                        <p className="text-xl mb-8 text-center">
                            Welcome to BrutTools.com - Your Ultimate Tool for Creativity and Innovation!
                            At BrutTools, we believe in providing innovative tools that empower creators to bring their ideas to life. Whether you're looking for AI-powered image generation or custom creative solutions, BrutTools is here to elevate your projects with ease.
                            Why Choose BrutTools.com?
                        </p>

                        <div className="pr-10">
                            <p className="mb-6">
                                Unique Customization: With BrutTools, you can personalize your projects effortlessly. Our tools allow you to generate unique visuals, designs, and more, tailored to your specific needs. Stand out with creative, high-quality outputs that reflect your vision.
                                Loved by Professionals: Join our growing community of professionals who trust BrutTools. Our platform has been embraced by designers, developers, entrepreneurs, and creators looking for streamlined, powerful solutions.
                            </p>

                            <p className="mb-6">
                                Effortless Creativity: Unleash your creativity with a suite of innovative tools, from AI-powered image generation to custom templates. Whether you're working on visual content or building an app, BrutTools simplifies the process, making it easier than ever to bring your ideas to life.
                            </p>
                        </div>

                        <div className="mb-4 text-lg font-semibold">Key Features:</div>
                        <div className="pr-10">
                            <p className="mb-6">
                                Instant AI-Driven Tools: Generate custom visuals, designs, or solutions in seconds with BrutTools' innovative tools.
                            </p>

                            <p className="mb-6">
                                Endless Creative Possibilities: Explore a vast selection of tools designed to support a wide range of creative styles and needs.
                            </p>

                            <p className="mb-6">
                                High-Quality Outputs: Export your work in crystal-clear, high-resolution formats to ensure professional-grade results.
                            </p>
                        </div>

                        <div className="mb-4 text-lg font-semibold">Get Started:</div>
                        <p className="mb-6">
                            Ready to explore the future of creativity and innovation? Get started with BrutTools.com for free and unlock a world of possibilities.
                        </p>

                        {!username ? (
                            <a className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded" href="/register">Get started for free</a>
                        ) :
                            <a className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded" href="/dashboard">Go to Dashboard</a>
                        }
                    </div>



                </div>
            </div>
        </main>


    );
}
