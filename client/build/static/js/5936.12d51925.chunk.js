"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[5936],{5936:function(e,t,n){n.r(t);var r=n(9439),s=n(2791),o=n(4270),c=n(184);t.default=function(){var e=(0,s.useState)(!1),t=(0,r.Z)(e,2),n=t[0],i=t[1],a=(0,s.useState)(""),l=(0,r.Z)(a,2),x=l[0],d=l[1],u=(0,s.useState)(""),h=(0,r.Z)(u,2),m=h[0],p=h[1],g=(0,s.useRef)(null);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(o.q,{children:[(0,c.jsx)("title",{children:"Free Speech to Text Converter - Convert Your Speech to Text Easily"}),(0,c.jsx)("meta",{name:"description",content:"Convert your speech into text effortlessly with our speech-to-text converter. Experience accurate transcription instantly."})]}),(0,c.jsx)("main",{className:"max-w-3/4 h-full flex flex-col items-center min-h-screen p-2",children:(0,c.jsxs)("div",{className:"container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col",children:[(0,c.jsxs)("div",{className:"max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl",children:[(0,c.jsx)("h1",{className:"text-4xl font-bold text-center mb-4 text-gray-800",children:"Speech to Text"}),(0,c.jsx)("p",{className:"text-center text-gray-600 mb-8",children:"Convert your speech into text with our easy-to-use tool. Start and stop recording to transcribe your speech instantly."}),(0,c.jsxs)("div",{className:"text-center flex flex-col space-y-4",children:[(0,c.jsx)("button",{onClick:n?function(){g.current&&g.current.stop()}:function(){if("webkitSpeechRecognition"in window||"SpeechRecognition"in window){p("");var e=new(window.SpeechRecognition||window.webkitSpeechRecognition);e.lang="en-US",e.interimResults=!1,e.onresult=function(e){var t=e.results[0][0].transcript;d(t)},e.onerror=function(e){d(""),p("Error occurred: "+e.error)},e.onend=function(){i(!1)},g.current=e,e.start(),i(!0)}else p("Speech Recognition API is not supported in this browser.")},className:"w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg ".concat(n?"bg-red-500":""),children:n?"Stop Recording":"Start Recording"}),x&&(0,c.jsxs)("div",{className:"mt-4 p-4 bg-gray-100 rounded-md",children:[(0,c.jsx)("h2",{className:"text-xl font-semibold mb-2 text-gray-800",children:"Transcribed Text:"}),(0,c.jsx)("p",{className:"text-gray-800",children:x})]}),m&&(0,c.jsx)("p",{className:"text-red-500 mt-2 text-center",children:m})]})]}),(0,c.jsxs)("div",{className:"mt-10 max-w-2xl mx-auto text-center",children:[(0,c.jsx)("h3",{className:"text-xl font-semibold mb-4 text-gray-800",children:"Instant Speech Conversion!"}),(0,c.jsx)("p",{className:"text-gray-600 mb-4",children:"Our speech-to-text tool enables you to convert your spoken words into written text quickly and accurately. Click 'Start Recording' to begin, and 'Stop Recording' to finish."}),(0,c.jsxs)("p",{className:"text-gray-600",children:["For any assistance or questions, feel free to ",(0,c.jsx)("a",{href:"mailto:javatp01@gmail.com",className:"text-blue-500 hover:underline",children:"contact us"}),". We\u2019re here to assist you!"]})]})]})})]})}}}]);
//# sourceMappingURL=5936.12d51925.chunk.js.map