//'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import video from '../../assets/Video.mp4'

const Home = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  //go to top of the page button
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust the threshold as needed
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPlay(true);
        } else {
          setPlay(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);




  return (

    <>
      <Helmet>
        <title>BrutTools - Free Tools</title>
        <meta name="description" content="deffrent degital Tools - defferet tools that can each internet user need." />
      </Helmet>

      <main className={`max-w-3/4 h-full flex flex-col items-center min-h-screen ${false ? 'bg-gray-900 text-white' : 'bg-white text-slate-900'}`}>
        <div className="container">

          <section className="min-h-screen  flex flex-col items-center justify-center">

            <div className="max-w-4xl w-full space-y-8">
              {/* Header */}
              <h1 className="text-5xl font-bold text-center">
                Transform Your <span className="text-blue-500">Ideas</span> into Reality with Ease and Excellence
              </h1>

              {/* Subheader */}
              <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
                Empowering Your Digital Experience with Effortless Solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex justify-center space-x-4">
                <a href="/register" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                  Start Free Trial
                </a>
                <a href="/" className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition duration-300">
                  Learn More
                </a>
              </div>

              {/* Main Visual */}
              <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                <div className="relative h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md overflow-hidden">

                  <video
                    className="w-full h-full object-cover"
                    src={video}
                    autoPlay
                    muted
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

              </div>


            </div>


          </section>



          <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-14">


            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
              <div className="max-w-xl mb-10 text-center md:mx-auto md:mb-12 lg:max-w-2xl">
                <h2 className="max-w-lg mb-6 font-sans font-bold leading-none tracking-tight text-slate-900 text-2xl md:mx-auto lg:text-3xl">FAQs</h2>
              </div>
              <div>
                <div className={`border-b ${open1 ? 'open' : ''}`}>
                  <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen1(!open1)}>
                    What are your services?

                  </div>
                  {open1 && (
                    <div className="px-4 mb-4 mt-2">
                      We offer a range of services designed to help you with your needs. For more details, please refer to our services page.
                    </div>
                  )}
                </div>

                <div className={`border-b ${open2 ? 'open' : ''}`}>
                  <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen2(!open2)}>
                    Are there any costs associated with your services?

                  </div>
                  {open2 && (
                    <div className="px-4 mb-4 mt-2">
                      We offer both free and premium options. Details about pricing and features can be found on our pricing page.
                    </div>
                  )}
                </div>

                <div className={`border-b ${open3 ? 'open' : ''}`}>
                  <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen3(!open3)}>
                    How can I contact support?

                  </div>
                  {open3 && (
                    <div className="px-4 mb-4 mt-2">
                      For support, you can reach out to us via email or through our contact form on the website.
                    </div>
                  )}
                </div>

                <div className={`border-b ${open4 ? 'open' : ''}`}>
                  <div className="flex text-lg font-medium py-4 flex-row text-left px-4 w-full items-center justify-between hover:bg-slate-100" onClick={() => setOpen4(!open4)}>
                    How do I get started?

                  </div>
                  {open4 && (
                    <div className="px-4 mb-4 mt-2">
                      To get started, visit our registration page and follow the instructions to create an account.
                    </div>
                  )}
                </div>
              </div>
            </div>



          </div>
        </div>

      </main >

      <button
        className={`${isVisible ? 'block' : 'hidden'
          } fixed bottom-4 right-4 p-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full w-10 h-10 text-xl flex items-center justify-center`}
        onClick={scrollToTop}
      >
        <span>^</span>
      </button>



      <style>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        
      `}</style>



    </>
  );

};
export default Home; 