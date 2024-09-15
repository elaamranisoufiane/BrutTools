import "./App.css";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './pages/comps/Navbar';
import Footer from "./pages/comps/Footer";
import axios from 'axios';

// Lazy-loaded components
const Dashboard = lazy(() => import("./pages/dashborad/dashboard"));

//for subscribed users 
const TubeDownloader = lazy(() => import("./pages/dashborad/TubeDownloader"));
//for guests 
const TubeDownloaderGuest = lazy(() => import("./pages/dashboradGuest/TubeDownloader"));
const ImageToPdf = lazy(() => import("./pages/dashboradGuest/files/imageToPdf"));
const WordToPDFConverter = lazy(() => import("./pages/dashboradGuest/files/wordToPDF"));
const PDFToWordConverter = lazy(() => import("./pages/dashboradGuest/files/pdfToWord"));
const ImageCompressor = lazy(() => import("./pages/dashboradGuest/images/imageCompressor"));
const PDFMerger = lazy(() => import("./pages/dashboradGuest/files/mergePDF"));
//DevTools 

const CurrencyConverter = lazy(() => import("./pages/dashboradGuest/DevTools/CurrencyConverter"));
const JSONFormatter = lazy(() => import("./pages/dashboradGuest/DevTools/JSONFormatter"));
const QRCodeGenerator = lazy(() => import("./pages/dashboradGuest/DevTools/QRCodeGenerator"));
const UnitConverter = lazy(() => import("./pages/dashboradGuest/DevTools/UnitConverter"));
const URLShortener = lazy(() => import("./pages/dashboradGuest/DevTools/URLShortener"));
const PasswordGenerator = lazy(() => import("./pages/dashboradGuest/DevTools/PasswordGenerator"));
const MarkdownPreview = lazy(() => import("./pages/dashboradGuest/DevTools/MarkdownPreview"));
const ColorPicker = lazy(() => import("./pages/dashboradGuest/DevTools/ColorPicker"));
// audio tools 
const TextToSpeech = lazy(() => import("./pages/dashboradGuest/Audio/handleSpeak"));
const SpeechToText = lazy(() => import("./pages/dashboradGuest/Audio/SpeechToText"));


//error 404
const NotFoundPage = lazy(() => import("./pages/More/NotFoundPage"));

const Users = lazy(() => import("./pages/admin/index"));
const Add = lazy(() => import("./pages/admin/add"));
const Edit = lazy(() => import("./pages/admin/edit"));
const Home = lazy(() => import("./pages/auth/index"));
const LoginPage = lazy(() => import('./pages/auth/login'));
const RegisterPage = lazy(() => import('./pages/auth/register'));
const About = lazy(() => import('./pages/More/about'));
const Privacy = lazy(() => import("./pages/More/privacy-policy"));
const TermsOfService = lazy(() => import("./pages/More/terms-of-service"));
const CookiesSettings = lazy(() => import("./pages/More/cookiesSettings"));
const RefundPolicy = lazy(() => import("./pages/More/refund-policy"));
const ContactUs = lazy(() => import("./pages/More/contact-us"));
const Gallery = lazy(() => import("./pages/dashborad/gallery"));
const Subscription = lazy(() => import("./pages/profile/subscription"));
const Profile = lazy(() => import("./pages/profile/profile"));
const Setting = lazy(() => import("./pages/profile/setting"));
const AddPaln = lazy(() => import("./pages/profile/plans/addPlan"));
const EditPaln = lazy(() => import("./pages/profile/plans/editPlan"));

const ValidationEmailFail = lazy(() => import("./pages/More/VerificationFailedPage"));
const ValidationEmailSuccess = lazy(() => import("./pages/More/EmailVerifiedPage"));

const AddCreditsPaln = lazy(() => import("./pages/profile/plansCredits/addPlan"));
const EditCreditsPaln = lazy(() => import("./pages/profile/plansCredits/editPlan"));
const ForgetPassword = lazy(() => import("./pages/More/ForgotPasswordForm"));
const ResetPassword = lazy(() => import("./pages/More/resetPassword"));
const Pricing = lazy(() => import("./pages/More/pricing"));


const checkAuth = async () => {
  try {
    const response = await axios.get('/checkAuthUser', {
      withCredentials: true,
    });
    const isAuthenticated = JSON.stringify(response.data);
    return response.data
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

const isAuthenticated = await checkAuth().then((result) => {
  return result;
});

const getUser = async () => {
  try {
    const response = await axios.get('/getuser', {
      withCredentials: true,
    });
    const isAuthenticated = JSON.stringify(response.data.role);

    return response.data.role
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
const role = await getUser().then((result) => {
  return result;
});


const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Home /></Suspense>} />
          {!isAuthenticated ? (
            <>
              <Route path="/tubedownloader" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><TubeDownloaderGuest /></Suspense>} />
              <Route path="/imagetopdf" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ImageToPdf /></Suspense>} />
              <Route path="/wordtopdf" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><WordToPDFConverter /></Suspense>} />
              <Route path="/pdftoword" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><PDFToWordConverter /></Suspense>} />
              <Route path="/imagecompressor" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ImageCompressor /></Suspense>} />
              <Route path="/mergepdf" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><PDFMerger /></Suspense>} />
              <Route path="/currency-converter" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><CurrencyConverter /></Suspense>} />
              <Route path="/json-formatter" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><JSONFormatter /></Suspense>} />
              <Route path="/qr-code-generator" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><QRCodeGenerator /></Suspense>} />
              <Route path="/unit-converter" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><UnitConverter /></Suspense>} />
              <Route path="/color-picker" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ColorPicker /></Suspense>} />
              <Route path="/markdown-preview" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><MarkdownPreview /></Suspense>} />
              <Route path="/password-generator" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><PasswordGenerator /></Suspense>} />
              <Route path="/url-shortener" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><URLShortener /></Suspense>} />

              <Route path="/text-to-speech" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><TextToSpeech /></Suspense>} />
              <Route path="/speech-to-text" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><SpeechToText /></Suspense>} />


              <Route path="/email-verified" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ValidationEmailSuccess /></Suspense>} />
              <Route path="/email-failed" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ValidationEmailFail /></Suspense>} />
              <Route path="/forget-password" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ForgetPassword /></Suspense>} />
              <Route path="/reset-password/:token/:userId" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ResetPassword /></Suspense>} />
              <Route path="/pricing" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Pricing /></Suspense>} />
            </>
          ) : null}

          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Dashboard /></Suspense>} />


              <Route path="/tubedownloader-pro" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><TubeDownloaderGuest /></Suspense>} />


              <Route path="/gallery" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Gallery /></Suspense>} />
              {role === 'admin' ? (
                <>
                  <Route path="/admin/index" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Users /></Suspense>} />
                  <Route path="/admin/add" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Add /></Suspense>} />
                  <Route path="/admin/edit/:id" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Edit /></Suspense>} />
                  <Route path="/setting" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Setting /></Suspense>} />
                  <Route path="/plans/add-plans" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><AddPaln /></Suspense>} />
                  <Route path="/plans/edit-plans/:id" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><EditPaln /></Suspense>} />
                  <Route path="/plans/add-credits-plans" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><AddCreditsPaln /></Suspense>} />
                  <Route path="/plans/edit-credits-plans/:id" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><EditCreditsPaln /></Suspense>} />


                </>
              ) : null}
              <Route path="/profile" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Profile /></Suspense>} />
              <Route path="/subs" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Subscription /></Suspense>} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><LoginPage /></Suspense>} />
              <Route path="/register" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><RegisterPage /></Suspense>} />
            </>
          )}
          <Route path="/about" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><About /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><Privacy /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><TermsOfService /></Suspense>} />
          <Route path="/cookies" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><CookiesSettings /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><ContactUs /></Suspense>} />
          <Route path="/refund-policy" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><RefundPolicy /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<div className="h-full min-h-screen"> </div>}><NotFoundPage /></Suspense>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

{/**
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './pages/comps/Navbar';
import Footer from "./pages/comps/Footer";
import Dashboard from "./pages/dashborad/dashboard";

import Users from "./pages/admin/index";
import Add from "./pages/admin/add";
import Edit from "./pages/admin/edit";

import Home from "./pages/auth/index";
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import About from './pages/More/about';
import axios from 'axios';
import Privacy from "./pages/More/privacy-policy";
import TermsOfService from "./pages/More/terms-of-service";
import CookiesSettings from "./pages/More/cookiesSettings";
import ContactUs from "./pages/More/contact-us";
import Gallery from "./pages/dashborad/gallery"
import Overview from "./pages/More/overview";
import Subscription from "./pages/profile/subscription";
import Profile from "./pages/profile/profile";

const checkAuth = async () => {
  try {
    const response = await axios.get('/checkAuthUser', {
      withCredentials: true,
    });
    const isAuthenticated = JSON.stringify(response.data);
    //console.log('testtqklfhozerjfjerl : ' + isAuthenticated);

    return response.data
    //return isAuthenticated;
  } catch (error) {
    console.error("Login failed:", error);
    //console.log('testtqklfhozerjfjerl : ' + false);
    return false;
  }
};

const isAuthenticated = await checkAuth().then((result) => {
  return result;
});

const getUser = async () => {
  try {
    const response = await axios.get('/getuser', {
      withCredentials: true,
    });
    const isAuthenticated = JSON.stringify(response.data.role);

    return response.data.role
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
const role = await getUser().then((result) => {
  return result;
});

function App() {

  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/gallery" element={<Gallery />} />
              {role == 'admin' ? (
                <>
                  <Route path="/admin/index" element={<Users />} />
                  <Route path="/admin/add" element={<Add />} />
                  <Route path="/admin/edit/:id" element={<Edit />} />
                </>
              ) : null};
              <Route path="/profile" element={<Profile />} />
              <Route path="/subs" element={<Subscription />} />

            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>

          )}
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiesSettings />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/overview" element={<Overview />} />

          <Route path="*" element={<Home />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

*/}