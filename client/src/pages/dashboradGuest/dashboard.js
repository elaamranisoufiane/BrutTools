import React, { useState, useEffect } from "react";



const Tools = [
    {
        toolName: 'Video Downloader',
        toolUrl: '/tubedownloader-pro'

    }
    ,
    {
        toolName: 'Image to PDF',
        toolUrl: '/imagetopdf'

    }, {
        toolName: 'Word to PDF',
        toolUrl: '/wordtopdf'
    }, {
        toolName: 'PDF to Word',
        toolUrl: '/pdftoword'
    }, {
        toolName: 'Image Compressor',
        toolUrl: '/imagecompressor'
    }, {
        toolName: 'Merge PDF',
        toolUrl: '/mergepdf'
    }
];

export default function Subscription() {

    return (

        <main className="max-w-3/4 h-full flex  flex-col items-center min-h-screen">
            <div className="container bg-white p-10 rounded-lg   mx-auto flex-col transition-all">
                <div className="grid grid-cols-1 md:grid-cols-4 md:h-16 gap-4 pt-20 p-6">

                    {Tools.map((tool) => (

                        <a key={tool.toolUrl} href={tool.toolUrl} className="group flex rounded-md items-center w-full px-2 py-2 text-sm">
                            <p className="text-2xl font-semibold text-blue-600"> {tool.toolName} </p>
                        </a>


                    ))}


                </div >
            </div>
        </main >
    );
}
