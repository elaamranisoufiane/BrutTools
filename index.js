// server/index.js

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('./db');
const crypto = require('crypto');




const fs = require('fs');
const request = require('request-promise');

//const router = express.Router();
const PORT = process.env.SERVER_PORT || 3001;

const app = express();
const expressSession = require('express-session');
const Replicate = require('replicate');
require('dotenv').config();
app.use(express.static('client/build'));
const authMiddleware = require('./authMiddleware');

const axios = require('axios');
const { getUserSubscriptionPlan } = require('./subscription');
//const { POST } = require('./payment/webhook/route');
// const apiKey = process.env.LEMONSQUEEZY_API_KEY;
let apiKey = null;
const authMiddlewareAdmin = require('./authMiddlewareAdmin');


//change api replicate
//const REPLICATE_API_TOKEN = 'r8_DEtHzXdSZPK6Nm01gEcMm5MNprrbdN93d4g3P';

//email verification process 
const nodemailer = require('nodemailer');


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));




//const timeout = require('connect-timeout');
// Set a timeout of 4 minutes (240000 milliseconds)
//const serverTimeout = 240000;

// Apply timeout middleware
//app.use(timeout(serverTimeout));




app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());





require("./passportConfig")(passport);


// Change API replicate
let REPLICATE_API_TOKEN, STRIPE_API_TOKEN, WATERMARK_SIZE, WATERMARK, WATERMARK_POS_X, WATERMARK_POS_Y, WATERMARK_POS_X2, WATERMARK_POS_Y2, WATERMARK_POS_X3, WATERMARK_POS_Y3, UPSACALE_PHOTO_GUEST, OUTPUT_IMAGE_GUEST, BACKGROUND_GENERAL_PHOTO_GUEST, IA_IMAGE_GENERAL_PHOTO_GUEST;
let stripe = null;

db.query('SELECT * FROM settings', async (err, results) => {
    if (err) {
        console.error('Error fetching user data:', err);
    } else {
        if (results && results.length > 0 && results[0].replicate_key !== undefined) {
            REPLICATE_API_TOKEN = results[0].replicate_key;
            // STRIPE_API_TOKEN = results[0].stripe_api;
            // apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI3MDMxZmM2OGYxYzAzOTMwZGZiMmQyYWMxYTk2MGU0NDIxZTY5ZjBjYzM5YjFjZmRkYzE2NmYxMTZiYzlhMzY3N2Y5NjdiOTk5OTUzZTMxMSIsImlhdCI6MTcyMzg4ODI3My41NTY5OTMsIm5iZiI6MTcyMzg4ODI3My41NTY5OTUsImV4cCI6MjAzOTQyMTA3My41MTA1ODEsInN1YiI6IjEzNDA4NjYiLCJzY29wZXMiOltdfQ.ORGGGw9kxZgWrr3w0syjdLqy3gBG73cAVsEJYzwxs6EKHvDsyr4ZU09KeRBCiFerHGeDvjW777r6N-KUrDC5xn_M4Vu0XC_xBVkTVduNT5ffS812ibEuKvJBufKhlj5jfiVFyf8ieN8jKf-bNwy_956JgjMzrRjZOxRDNhhY2x-86-sOe05r9rK9rAOfnaiMXSGUit3roFRmbpisPrX50XA7Jp-h7oVbNVmsyQdLgmwYA2d1Kljj-K8w-57TuKNPRyej99n5uVtXHryexpRYUG-Uf1ShfRdi6wzduJ_3rhY5dfnClIpzLK0P68Nngu9XaY591XMRg-pL70gmIlIAr6-TW7BNgW0CGFfeHe6F5QjbewLNO9_aQQGvH9oNW49WxpqmGM5m_skeH5W_mXvrGf4icWMtKq3vgbMnRrbpyIUGAo-J8ppfFvMNw1WMn9d4TfORjfN3jhD0jqCTJcSZpidZVxxXFrfb9EUJ5LV90X0kUVx5QR81Il3h-L5r9yJ7';
            apiKey = results[0].stripe_api;
            WATERMARK = results[0].watermark_text;
            WATERMARK_POS_X = results[0].watermark_position_x;
            WATERMARK_POS_Y = results[0].watermark_position_y;
            WATERMARK_POS_X2 = results[0].watermark_position_x2;
            WATERMARK_POS_Y2 = results[0].watermark_position_y2;
            WATERMARK_POS_X3 = results[0].watermark_position_x3;
            WATERMARK_POS_Y3 = results[0].watermark_position_y3;
            WATERMARK_SIZE = results[0].watermark_size;
            UPSACALE_PHOTO_GUEST = results[0].upscale_scale_guest;
            IA_IMAGE_GENERAL_PHOTO_GUEST = results[0].nbre_ia_image_guest;
            BACKGROUND_GENERAL_PHOTO_GUEST = results[0].nbre_bk_image_guest;
            OUTPUT_IMAGE_GUEST = results[0].output_image_guest;

            // try {
            //     stripe = require('stripe')(STRIPE_API_TOKEN);

            // } catch (error) {
            //     if (error.code === 'STRIPE_INVALID_API_KEY') {
            //         console.error('Invalid API Key provided:', error.message);
            //     } else {
            //         console.error('Error initializing Stripe:', error);
            //     }
            // }

        } else {
            console.error('No valid data found for the admin user.');
        }
    }
});





//image to PDF 
util = require('util');
const multer1 = require('multer');
const upload1 = multer1({ dest: 'uploads/' });
const PDFDocument = require('pdfkit');
app.post('/api/convert', upload1.array('images'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, 'converted.pdf');
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);

    req.files.forEach((file, index) => {
        if (index > 0) {
            doc.addPage();
        }
        doc.image(file.path, 0, 0, { fit: [doc.page.width, doc.page.height], align: 'center', valign: 'center' });
    });

    doc.end();

    writeStream.on('finish', () => {
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('An error occurred while sending the file.');
            }

            // Clean up temporary files
            try {
                fs.unlinkSync(pdfPath);
                req.files.forEach((file) => fs.unlinkSync(file.path));
            } catch (cleanupErr) {
                console.error('Error during cleanup:', cleanupErr);
            }
        });
    });

    writeStream.on('error', (err) => {
        console.error('Error writing PDF:', err);
        res.status(500).send('An error occurred while generating the PDF.');
    });
});

//PDF to WORD
//sudo apt-get install unoconv
const { exec } = require('child_process');
const execAsync = util.promisify(exec);

app.post('/api/pdf-to-word', upload1.single('document'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const inputPath = req.file.path;
    const outputPath = path.join(__dirname, `${req.file.filename}.docx`);

    try {
        await execAsync(`unoconv -f docx -o "${outputPath}" "${inputPath}"`);

        res.sendFile(outputPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('An error occurred while sending the file.');
            }

            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).send('An error occurred during conversion.');

        fs.unlinkSync(inputPath);
    }
});


//word to pdf 
//sudo apt-get install libreoffice
//npm install libreoffice-convert
const { promisify } = require('util');
const libre = require('libreoffice-convert');
const convertAsync = promisify(libre.convert);

app.post('/api/word-to-pdf', upload1.single('document'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const inputPath = req.file.path;
    const outputPath = path.join(__dirname, `${req.file.filename}.pdf`);

    try {
        const ext = '.pdf'
        const file = await fs.promises.readFile(inputPath);

        let pdfBuf = await convertAsync(file, ext, undefined);

        await fs.promises.writeFile(outputPath, pdfBuf);

        res.sendFile(outputPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('An error occurred while sending the file.');
            }

            // Clean up temporary files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).send('An error occurred during conversion.');

        // Clean up input file on error
        fs.unlinkSync(inputPath);
    }
});

//Image Compressor
//npm install sharp
const sharp = require('sharp');
app.post('/api/compress-image', upload1.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const inputPath = req.file.path;
    const outputPath = path.join(__dirname, `compressed_${req.file.filename}.jpg`);
    const quality = parseInt(req.body.quality) || 80;

    try {
        await sharp(inputPath)
            .jpeg({ quality: quality })
            .toFile(outputPath);

        res.sendFile(outputPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).send('An error occurred while sending the file.');
            }

            // Clean up temporary files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    } catch (error) {
        console.error('Compression error:', error);
        res.status(500).send('An error occurred during compression.');

        // Clean up input file on error
        fs.unlinkSync(inputPath);
    }
});


//PDF Merger using
//npm install pdf-lib

app.post('/api/merge-pdf', upload1.array('pdfs', 10), async (req, res) => {
    try {
        const mergedPdf = await PDFDocument.create();

        for (const file of req.files) {
            const pdfBytes = fs.readFileSync(file.path);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const outputPath = path.join(__dirname, 'merged.pdf');

        fs.writeFileSync(outputPath, mergedPdfBytes);

        res.download(outputPath, 'merged.pdf', () => {
            fs.unlinkSync(outputPath);

            req.files.forEach(file => fs.unlinkSync(file.path));
        });
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Error merging PDFs');
    }
});



// dowload video  
const ytdl = require('ytdl-core');


app.get('/api/downloadVideo', async (req, res) => {


    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // Get video info from ytdl-core
        const videoInfo = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

        if (!format) {
            return res.status(404).send('No suitable format found');
        }

        // Prepare the filename
        const title = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, '');
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        res.header('Content-Type', 'video/mp4');


        // Stream the video to the client
        ytdl(url, { format: format })
            .pipe(res)
            .on('finish', () => {
                console.log('Download completed');
            })
            .on('error', (err) => {
                console.error('Error during download:', err);
                res.status(500).send('An error occurred while downloading the video');
            });

    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).send('An error occurred while downloading the video');
    }


    // ____
    // try {
    //     const { url } = req.query;

    //     if (!url) {
    //         return res.status(400).send('URL is required');
    //     }

    //     console.log('Fetching video info...');
    //     const videoInfo = await ytdl.getInfo(url);
    //     console.log('Video info fetched successfully');

    //     const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

    //     if (!format) {
    //         return res.status(404).send('No suitable format found');
    //     }

    //     const title = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, '');
    //     res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    //     res.header('Content-Type', 'video/mp4');

    //     console.log('Streaming video...');
    //     ytdl(url, { format: format })
    //         .pipe(res)
    //         .on('finish', () => {
    //             console.log('Download completed');
    //         })
    //         .on('error', (err) => {
    //             console.error('Error during download:', err);
    //             res.status(500).send('An error occurred while downloading the video');
    //         });

    // } catch (error) {
    //     console.error('Error downloading video:', error);
    //     res.status(500).send('An error occurred while downloading the video');
    // }
});

//end dowload videos

// npm install gtts @google-cloud/speech 
//npm i stream

// Text to Speech
const gtts = require('gtts');
app.post('/api/text-to-speech', (req, res) => {
    const { text, voice } = req.body;
    const tts = new gtts(text, voice || 'en'); // Default to 'en' if no voice specified

    res.set({ 'Content-Type': 'audio/mpeg' });
    tts.stream().pipe(res);
});

app.get('/api/voices', (req, res) => {
    // Example voice list, replace with actual voices available from your TTS library
    const voices = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'nl', name: 'Dutch' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ar', name: 'Arabic' },
        { code: 'tr', name: 'Turkish' },
        { code: 'pl', name: 'Polish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'da', name: 'Danish' },
        { code: 'no', name: 'Norwegian' },
        { code: 'fi', name: 'Finnish' },
        { code: 'cs', name: 'Czech' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'sk', name: 'Slovak' },
        { code: 'ro', name: 'Romanian' },
        { code: 'sr', name: 'Serbian' },
    ];


    res.json({ voices });
});

// Speech to Text 
/*
befour starting 
install this : pip install deepspeech
create a python  file transcribe.py

and past this code :

import sys
import deepspeech
import numpy as np
import wave

def transcribe_audio(model_path, scorer_path, audio_path):
    model = deepspeech.Model(model_path)
    model.enableExternalScorer(scorer_path)

    with wave.open(audio_path, 'rb') as wf:
        if wf.getsampwidth() != 2:
            raise ValueError("Only 16-bit audio files are supported")
        if wf.getframerate() != 16000:
            raise ValueError("Only 16kHz audio files are supported")

        frames = wf.readframes(wf.getnframes())
        audio = np.frombuffer(frames, dtype=np.int16)

    text = model.stt(audio)
    return text

if __name__ == "__main__":
    model_path = sys.argv[1]
    scorer_path = sys.argv[2]
    audio_path = sys.argv[3]

    transcription = transcribe_audio(model_path, scorer_path, audio_path)
    print(transcription)





*/


const upload2 = multer({ storage: multer.memoryStorage() });
app.post('/api/speech-to-text', upload2.single('audio'), (req, res) => {
    if (!req.file) {
        console.error('No audio file uploaded.');
        return res.status(400).send('No audio file uploaded.');
    }

    const tempFilePath = path.join(__dirname, 'temp.wav');
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const modelPath = 'path/to/deepspeech-model.pbmm';
    const scorerPath = 'path/to/deepspeech-scorer.scorer';

    // Call the Python script
    execFile('python', ['transcribe.py', modelPath, scorerPath, tempFilePath], (error, stdout, stderr) => {
        fs.unlinkSync(tempFilePath); // Clean up the temp file

        if (error) {
            console.error('Error processing audio:', error);
            return res.status(500).send('Error processing audio');
        }
        if (stderr) {
            console.error('stderr:', stderr);
            return res.status(500).send('Error processing audio');
        }

        const transcription = stdout.trim();
        res.json({ text: transcription });
    });
});

//npm install shortid
// to upgrade ... 
const shortid = require('shortid');
app.post('/api/shorten-url', (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: 'Long URL is required' });
    }

    const shortId = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

    let normalizedUrl;
    try {
        const url = new URL(longUrl);
        normalizedUrl = url.href;
    } catch (error) {
        normalizedUrl = longUrl.startsWith('//') ? `https:${longUrl}` : `https://${longUrl}`;
    }

    const query = 'INSERT INTO urls (id, long_url) VALUES (?, ?)';
    db.query(query, [shortId, normalizedUrl], (err, result) => {
        if (err) {
            console.error('Error inserting URL:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.json({ shortUrl });
    });
});

app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;

    const selectQuery = 'SELECT long_url FROM urls WHERE id = ?';
    const deleteQuery = 'DELETE FROM urls WHERE id = ?';

    db.query(selectQuery, [shortId], (err, results) => {
        if (err) {
            console.error('Error querying URL:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).send('URL not found');
        }

        const longUrl = results[0].long_url;

        db.query(deleteQuery, [shortId], (deleteErr) => {
            if (deleteErr) {
                console.error('Error deleting URL:', deleteErr);
                return res.status(500).send('Internal Server Error');
            }

            res.redirect(longUrl);
        });
    });
});


//still some problems here 
app.post('/api/convert-unit', (req, res) => {
    const { fromUnit, toUnit, value } = req.body;

    if (!fromUnit || !toUnit || isNaN(value)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const fromUnitLower = fromUnit.toLowerCase();
    const toUnitLower = toUnit.toLowerCase();

    const conversionRates = {
        // Distance Conversions
        'km_to_m': 1000,
        'km_to_cm': 100000,
        'km_to_mm': 1000000,
        'km_to_miles': 0.621371,
        'km_to_yd': 1093.61,
        'km_to_ft': 3280.84,
        'km_to_in': 39370.1,

        'm_to_km': 0.001,
        'm_to_cm': 100,
        'm_to_mm': 1000,
        'm_to_miles': 0.000621371,
        'm_to_yd': 1.09361,
        'm_to_ft': 3.28084,
        'm_to_in': 39.3701,

        'cm_to_km': 0.00001,
        'cm_to_m': 0.01,
        'cm_to_mm': 10,
        'cm_to_miles': 0.00000621371,
        'cm_to_yd': 0.0109361,
        'cm_to_ft': 0.0328084,
        'cm_to_in': 0.393701,

        'mm_to_km': 0.000001,
        'mm_to_m': 0.001,
        'mm_to_cm': 0.1,
        'mm_to_miles': 0.000000621371,
        'mm_to_yd': 0.00109361,
        'mm_to_ft': 0.00328084,
        'mm_to_in': 0.0393701,

        'miles_to_km': 1.60934,
        'miles_to_m': 1609.34,
        'miles_to_cm': 160934,
        'miles_to_mm': 1609344,
        'miles_to_yd': 1760,
        'miles_to_ft': 5280,
        'miles_to_in': 63360,

        'yd_to_km': 0.0009144,
        'yd_to_m': 0.9144,
        'yd_to_cm': 91.44,
        'yd_to_mm': 914.4,
        'yd_to_miles': 0.000568182,
        'yd_to_ft': 3,
        'yd_to_in': 36,

        'ft_to_km': 0.0003048,
        'ft_to_m': 0.3048,
        'ft_to_cm': 30.48,
        'ft_to_mm': 304.8,
        'ft_to_miles': 0.000189394,
        'ft_to_yd': 0.333333,
        'ft_to_in': 12,

        'in_to_km': 0.0000254,
        'in_to_m': 0.0254,
        'in_to_cm': 2.54,
        'in_to_mm': 25.4,
        'in_to_miles': 0.0000157828,
        'in_to_yd': 0.0277778,
        'in_to_ft': 0.0833333,

        // Weight Conversions
        'kg_to_g': 1000,
        'kg_to_mg': 1000000,
        'kg_to_lbs': 2.20462,
        'kg_to_oz': 35.274,

        'g_to_kg': 0.001,
        'g_to_mg': 1000,
        'g_to_lbs': 0.00220462,
        'g_to_oz': 0.035274,

        'mg_to_g': 0.001,
        'mg_to_kg': 0.000001,
        'mg_to_lbs': 0.00000220462,
        'mg_to_oz': 0.000035274,

        'lbs_to_kg': 0.453592,
        'lbs_to_g': 453.592,
        'lbs_to_mg': 453592.37,
        'lbs_to_oz': 16,

        'oz_to_kg': 0.0283495,
        'oz_to_g': 28.3495,
        'oz_to_mg': 28349.5,
        'oz_to_lbs': 0.0625,

        // Temperature Conversions
        'celsius_to_fahrenheit': (c) => (c * 9 / 5) + 32,
        'fahrenheit_to_celsius': (f) => (f - 32) * 5 / 9,
        'celsius_to_kelvin': (c) => c + 273.15,
        'kelvin_to_celsius': (k) => k - 273.15,
        'fahrenheit_to_kelvin': (f) => (f - 32) * 5 / 9 + 273.15,
        'kelvin_to_fahrenheit': (k) => (k - 273.15) * 9 / 5 + 32,

        // Volume Conversions
        'l_to_ml': 1000,
        'l_to_m3': 0.001,
        'l_to_cm3': 1000,
        'l_to_gal': 0.264172,
        'l_to_pt': 2.11338,
        'l_to_qt': 1.05669,
        'l_to_cup': 4.22675,
        'l_to_fl_oz': 33.814,

        'ml_to_l': 0.001,
        'ml_to_m3': 1e-6,
        'ml_to_cm3': 1,
        'ml_to_gal': 0.000264172,
        'ml_to_pt': 0.00211338,
        'ml_to_qt': 0.00105669,
        'ml_to_cup': 0.00422675,
        'ml_to_fl_oz': 0.033814,

        'm3_to_l': 1000,
        'm3_to_ml': 1000000,
        'm3_to_cm3': 1000000,
        'm3_to_gal': 264.172,
        'm3_to_pt': 2113.38,
        'm3_to_qt': 1056.69,
        'm3_to_cup': 4226.75,
        'm3_to_fl_oz': 33814,

        'cm3_to_l': 0.001,
        'cm3_to_ml': 1,
        'cm3_to_m3': 1e-6,
        'cm3_to_gal': 0.000264172,
        'cm3_to_pt': 0.00211338,
        'cm3_to_qt': 0.00105669,
        'cm3_to_cup': 0.00422675,
        'cm3_to_fl_oz': 0.033814,

        'gal_to_l': 3.78541,
        'gal_to_ml': 3785.41,
        'gal_to_m3': 0.00378541,
        'gal_to_cm3': 3785.41,
        'gal_to_pt': 8,
        'gal_to_qt': 4,
        'gal_to_cup': 16,
        'gal_to_fl_oz': 128,

        'pt_to_l': 0.473176,
        'pt_to_ml': 473.176,
        'pt_to_m3': 0.000473176,
        'pt_to_cm3': 473.176,
        'pt_to_gal': 0.125,
        'pt_to_qt': 0.5,
        'pt_to_cup': 2,
        'pt_to_fl_oz': 16,

        'qt_to_l': 0.946353,
        'qt_to_ml': 946.353,
        'qt_to_m3': 0.000946353,
        'qt_to_cm3': 946.353,
        'qt_to_gal': 0.25,
        'qt_to_pt': 2,
        'qt_to_cup': 4,
        'qt_to_fl_oz': 32,

        'cup_to_l': 0.236588,
        'cup_to_ml': 236.588,
        'cup_to_m3': 0.000236588,
        'cup_to_cm3': 236.588,
        'cup_to_gal': 0.0625,
        'cup_to_pt': 0.5,
        'cup_to_qt': 0.25,
        'cup_to_fl_oz': 8,

        'fl_oz_to_l': 0.0295735,
        'fl_oz_to_ml': 29.5735,
        'fl_oz_to_m3': 2.95735e-5,
        'fl_oz_to_cm3': 29.5735,
        'fl_oz_to_gal': 0.0078125,
        'fl_oz_to_pt': 0.0625,
        'fl_oz_to_qt': 0.03125,
        'fl_oz_to_cup': 0.125,

        // Area Conversions
        'm2_to_cm2': 10000,
        'm2_to_mm2': 1000000,
        'm2_to_km2': 0.000001,
        'm2_to_ac': 0.000247105,
        'm2_to_ha': 0.0001,

        'cm2_to_m2': 0.0001,
        'cm2_to_mm2': 100,
        'cm2_to_km2': 1e-10,
        'cm2_to_ac': 2.471e-8,
        'cm2_to_ha': 1e-6,

        'mm2_to_m2': 1e-6,
        'mm2_to_cm2': 0.01,
        'mm2_to_km2': 1e-12,
        'mm2_to_ac': 2.471e-10,
        'mm2_to_ha': 1e-8,

        'km2_to_m2': 1000000,
        'km2_to_cm2': 1e+10,
        'km2_to_mm2': 1e+12,
        'km2_to_ac': 247.105,
        'km2_to_ha': 100,

        'ac_to_m2': 4046.86,
        'ac_to_cm2': 40468600,
        'ac_to_mm2': 4.04686e+7,
        'ac_to_km2': 0.00404686,
        'ac_to_ha': 0.404686,

        'ha_to_m2': 10000,
        'ha_to_cm2': 1e+8,
        'ha_to_mm2': 1e+10,
        'ha_to_km2': 0.01,
        'ha_to_ac': 2.47105,

        // Speed Conversions
        'km/h_to_m/s': 0.277778,
        'km/h_to_mph': 0.621371,
        'km/h_to_ft/s': 0.911344,

        'm/s_to_km/h': 3.6,
        'm/s_to_mph': 2.23694,
        'm/s_to_ft/s': 3.28084,

        'mph_to_km/h': 1.60934,
        'mph_to_m/s': 0.44704,
        'mph_to_ft/s': 1.46667,

        'ft/s_to_km/h': 1.09728,
        'ft/s_to_m/s': 0.3048,
        'ft/s_to_mph': 0.681818,

        // Energy Conversions
        'j_to_kj': 0.001,
        'j_to_cal': 0.239006,
        'j_to_kcal': 0.000239006,
        'j_to_btu': 0.000947817,

        'kj_to_j': 1000,
        'kj_to_cal': 239.006,
        'kj_to_kcal': 0.239006,
        'kj_to_btu': 0.947817,

        'cal_to_j': 4.184,
        'cal_to_kj': 0.004184,
        'cal_to_kcal': 0.001,
        'cal_to_btu': 0.00396832,

        'kcal_to_j': 4184,
        'kcal_to_kj': 4.184,
        'kcal_to_cal': 1000,
        'kcal_to_btu': 3.96832,

        'btu_to_j': 1055.06,
        'btu_to_kj': 1.05506,
        'btu_to_cal': 252.164,
        'btu_to_kcal': 0.252164,

        // Power Conversions
        'w_to_kw': 0.001,
        'w_to_hp': 0.00134102,

        'kw_to_w': 1000,
        'kw_to_hp': 1.34102,

        'hp_to_w': 745.7,
        'hp_to_kw': 0.7457,

        // Pressure Conversions
        'pa_to_kpa': 0.001,
        'pa_to_bar': 0.00001,
        'pa_to_atm': 0.00000986923,
        'pa_to_psi': 0.000145038,

        'kpa_to_pa': 1000,
        'kpa_to_bar': 0.01,
        'kpa_to_atm': 0.00986923,
        'kpa_to_psi': 0.145038,

        'bar_to_pa': 100000,
        'bar_to_kpa': 100,
        'bar_to_atm': 0.986923,
        'bar_to_psi': 14.5038,

        'atm_to_pa': 101325,
        'atm_to_kpa': 101.325,
        'atm_to_bar': 1.01325,
        'atm_to_psi': 14.696,

        'psi_to_pa': 6894.76,
        'psi_to_kpa': 6.89476,
        'psi_to_bar': 0.0689476,
        'psi_to_atm': 0.068046,

        'torr_to_pa': 133.322,
        'torr_to_bar': 0.00133322,
        'torr_to_psi': 0.0193368,
        'torr_to_atm': 0.00131579,
    };

    const conversionKey = `${fromUnitLower}_to_${toUnitLower}`;
    const conversionFunc = conversionRates[conversionKey];

    if (typeof conversionFunc === 'function') {
        // Handle temperature conversions
        const result = conversionFunc(value);
        return res.json({ result });
    } else if (conversionFunc) {
        // Handle other conversions
        const result = value * conversionFunc;
        return res.json({ result });
    } else {
        return res.status(400).json({ error: 'Conversion not supported' });
    }
});



// Currency Converter
app.post('/api/convert-currency', async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;
    const api = process.env.CONVERT_CURRENCY;

    if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${api}/latest/${fromCurrency}`);
        const rates = response.data.conversion_rates;



        if (rates && rates[toCurrency]) {
            const rate = rates[toCurrency];
            const result = amount * rate;
            res.json({ result: result.toFixed(2) });
        } else {
            res.status(400).json({ error: 'Invalid currency' });
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
});






// db.query('SELECT * FROM settings', async (err, results) => {
//     if (err) {
//         console.error('Error fetching user data:', err);
//     } else {
//         if (results && results.length > 0 && results[0].replicate_key !== undefined) {
//             console.log('Setting API key...');
//             apiKey = results[0].stripe_api;
//             console.log('API key set:', apiKey);
//         } else {
//             console.error('No valid data found for the admin user.');
//         }
//     }
// });



// const initializePaimentGateWay = async () => {
//     return STRIPE_API_TOKEN;
// }


/*
//to update 

function initializeStripe() {
    stripe = require('stripe')(STRIPE_API_TOKEN);
}

initializeStripe();

async function verifyStripeAPIKey(apiKey) {
    try {
        const stripeInstance = require('stripe')(apiKey);
        await stripeInstance.customers.list({ limit: 1 });
        return true;
    } catch (error) {
        return false;
    }
}

app.post('/api/verify-stripe-api-key', async (req, res) => {
    const { apiKey } = req.body;
    try {
        const isValid = await verifyStripeAPIKey(apiKey);
        res.json({ valid: isValid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

*/


////////////////////////////////////////////////////////////////////////////
//const stripe = require('stripe')(STRIPE_API_TOKEN);

// const stripe = require('stripe')(process.env.STRIPE_API_KEY);

//to update 

/*
async function createCustomer(username, email) {
    try {

        if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
            throw new Error('Stripe is not initialized or the API key is invalid.');
        }

        const requestBody = {
            data: {
                type: 'customers',
                attributes: {
                    name: username,
                    email: email
                },

            }
        };


        const customer = await axios.post(`https://api.lemonsqueezy.com/v1/customers`, requestBody, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });


        // const customer = await stripe.customers.create({
        //     name: username,
        //     email: email,
        // });



        return customer;
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

*/



app.get('/api/customer', async (req, res) => {
    try {
        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;


        const response = await axios.post(
            'https://api.lemonsqueezy.com/v1/customers',
            {
                data: {
                    type: "customers",
                    attributes: {
                        name: "Luke Skywalker",
                        email: "lukeskywalker@example.com",
                        city: "New York",
                        region: "NY",
                        country: "US"
                    },
                    relationships: {
                        store: {
                            data: {
                                type: "stores",
                                id: "1"
                            }
                        }
                    }
                }
            },
            {
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
        console.log(response.data);



        res.json({ customer: "createdCustomer" });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/getcustomer', async (req, res) => {

    try {

        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;
        // const apiKey = await initializePaimentGateWay();



        const customer = await axios.get(`https://api.lemonsqueezy.com/v1/customers`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });

        const customerData = customer.data;
        res.json(customerData);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// to update 

/*
async function verifyStripeStripeCustomer(customerID) {
    try {
        const customer = await stripe.customers.retrieve(customerID);
        return true;
    } catch (error) {
        return false;
    }
}


async function deleteCustomer(customerID) {
    try {
        if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
            throw new Error('Stripe is not initialized or the API key is invalid.');
        }

        const isValid = await verifyStripeStripeCustomer(customerID);
        if (!isValid) {
            return;
            //throw new Error('Customer not found in Stripe.');
        }
        const deleted = await stripe.customers.del(customerID);
    } catch (error) {
        console.error('Error deleting customer:', error);
        // Instead of responding with an error here, consider handling it appropriately in the calling function
        throw error;
    }
}
*/

//end changing API key

const { createCanvas, loadImage, registerFont } = require('canvas');

function addWatermarkToImageUrl(imageUrl, watermarkText) {
    return new Promise((resolve, reject) => {
        axios.get(imageUrl, { responseType: 'arraybuffer' })
            .then((response) => {
                const imageBuffer = Buffer.from(response.data);
                const canvas = createCanvas();
                const ctx = canvas.getContext('2d');

                loadImage(imageBuffer).then((image) => {
                    canvas.width = image.width;
                    canvas.height = image.height;

                    if (!WATERMARK_SIZE && WATERMARK_SIZE == 0) {
                        WATERMARK_SIZE = image.width / 40;
                    }
                    ctx.drawImage(image, 0, 0);

                    ctx.font = `${WATERMARK_SIZE}px Arial`;
                    ctx.fillStyle = 'white';
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 3;
                    ctx.textAlign = 'center';

                    const textWidth = ctx.measureText(watermarkText).width;
                    ctx.strokeText(watermarkText, (canvas.width * WATERMARK_POS_X) / 100, (canvas.height * WATERMARK_POS_Y) / 100);
                    ctx.strokeText(watermarkText, (canvas.width * WATERMARK_POS_X2) / 100, (canvas.height * WATERMARK_POS_Y2) / 100);
                    ctx.strokeText(watermarkText, (canvas.width * WATERMARK_POS_X3) / 100, (canvas.height * WATERMARK_POS_Y3) / 100);

                    ctx.fillText(watermarkText, (canvas.width * WATERMARK_POS_X) / 100, (canvas.height * WATERMARK_POS_Y) / 100);
                    ctx.fillText(watermarkText, (canvas.width * WATERMARK_POS_X2) / 100, (canvas.height * WATERMARK_POS_Y2) / 100);
                    ctx.fillText(watermarkText, (canvas.width * WATERMARK_POS_X3) / 100, (canvas.height * WATERMARK_POS_Y3) / 100);

                    const watermarkedImageData = canvas.toBuffer('image/png');

                    const outputPath = 'GeneratedImage-' + Date.now() + '.jpg';
                    fs.writeFileSync('./uploads/' + outputPath, watermarkedImageData);

                    resolve({ status: 'Success', data: outputPath });
                })
                    .catch((error) => {
                        reject({ status: 'Error', data: 'Error processing image: ' + error });
                    });
            })
            .catch((error) => {
                reject({ status: 'Error', data: 'Error fetching image: ' + error });
            });
    });
}






app.post('/register', (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const coupon = req.body.coupon;
        const email = req.body.email;
        const recaptchaToken = req.body.recaptchaToken;

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;



        // axios.post(verificationURL)
        axios.post(verificationURL)
            .then((response) => {
                const data = response.data;
                const success = data.success;
                if (success !== undefined && success === true) {
                    // reCAPTCHA verification passed 
                    const usernameQuery = 'SELECT * FROM user WHERE username = ?';
                    db.query(usernameQuery, [username], (usernameError, usernameResult) => {
                        if (usernameError) {
                            throw usernameError;
                        }

                        if (usernameResult.length > 0) {
                            res.send({ message: "Username already exists" });
                        } else {
                            const emailQuery = 'SELECT * FROM user WHERE email = ?';
                            db.query(emailQuery, [email], async (emailError, emailResult) => {
                                if (emailError) {
                                    throw emailError;
                                }

                                if (emailResult.length > 0) {
                                    res.send({ message: "Email already exists" });
                                } else {
                                    // Username and email are not in use, proceed with registration
                                    // var customer = await createCustomer(username, email);
                                    const hashedPassword = bcrypt.hashSync(password, 10);
                                    const query = 'INSERT INTO `user`(`username`,`password`,`email`,`coupon`,`attempt`, `subscribre`,`customerId`,`credits`,`planName`,`created_at`) VALUES (?,?,?,?,?,?,?,?,?,?)';
                                    db.query(query, [username, hashedPassword, email, coupon, 0, false, /*customer.id*/, 3, "Free Plan", new Date()], (err, result) => {
                                        if (err) {
                                            throw err;
                                        }
                                        res.send({ message: "User Created" });
                                        const randomBytes = crypto.randomBytes(16);
                                        const verificationToken = randomBytes.toString('hex');

                                        // Save the verification token in the database
                                        const updateTokenQuery = 'UPDATE user SET verification_token = ? WHERE email = ?';
                                        db.query(updateTokenQuery, [verificationToken, email], async (updateTokenError, updateTokenResult) => {
                                            if (updateTokenError) {
                                                throw updateTokenError;
                                            }

                                            // Send verification email
                                            const verificationLink = `${process.env.DOMAIN}/verify?token=${verificationToken}`;
                                            //const verificationLink = "testing";


                                            const mailOptions = {
                                                from: process.env.SMTPEMAIL,
                                                to: email,
                                                subject: 'BrutTools Email Verification',
                                                html: `
                                                <!DOCTYPE html>
                                                <html lang="en">
                                                <head>
                                                    <meta charset="UTF-8">
                                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                    <title>Email Verification</title>
                                                    <style>
                                                        @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
                                                    </style>
                                                </head>
                                                <body class="bg-gray-100">
                                                
                                                    <div class="container mx-auto px-4 py-8">
                                                        <div class="bg-white rounded-lg shadow-md p-6">
                                                            <h1 class="text-2xl font-bold text-blue-500 mb-4">Please verify your email address</h1>
                                                            <p class="mb-4">Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
                                                            <a href="${verificationLink}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Verify Email</a>
                                                        </div>
                                                    </div>
                                                
                                                </body>
                                                </html>
                                                `
                                            };


                                            // Create a nodemailer transporter
                                            const transporter = nodemailer.createTransport({
                                                host: 'smtp.gmail.com',
                                                port: 465,
                                                secure: true,
                                                auth: {
                                                    user: process.env.SMTPEMAIL,
                                                    pass: process.env.SMTPPASSWORD
                                                }
                                            });

                                            // Send the email
                                            transporter.sendMail(mailOptions, (emailError, info) => {
                                                if (emailError) {
                                                    throw emailError;
                                                }
                                                res.status(200).send({ message: 'Email sent' });

                                                //console.log('Email sent: ' + info.response);
                                            });
                                        });


                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.send({ message: "reCAPTCHA verification failed" });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).send({ message: 'Verification failed' });
            });



    } catch (err) {
        res.send({ message: err });
    }
});


//send verification email multiple times

app.post('/send-verification-link', async (req, res) => {
    const email = req.body.email;
    const TokenQuery = 'SELECT verification_token from user WHERE email = ? AND is_verified = 0';

    try {
        const TokenResult = await new Promise((resolve, reject) => {
            db.query(TokenQuery, [email], (TokenError, TokenResult) => {
                if (TokenError) {
                    reject(TokenError);
                    return;
                }
                resolve(TokenResult);
            });
        });

        if (TokenResult.length > 0 && TokenResult[0].verification_token) {
            // Send verification email
            const verificationLink = `${process.env.DOMAIN}/verify?token=${TokenResult[0].verification_token}`;
            const mailOptions = {
                from: process.env.SMTPEMAIL,
                to: email,
                subject: 'BrutTools Email Verification',
                html: `
             <!DOCTYPE html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Email Verification</title>
                 <style>
                     @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
                 </style>
             </head>
             <body class="bg-gray-100">
             
                 <div class="container mx-auto px-4 py-8">
                     <div class="bg-white rounded-lg shadow-md p-6">
                         <h1 class="text-2xl font-bold text-blue-500 mb-4">Please verify your email address</h1>
                         <p class="mb-4">Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
                         <a href="${verificationLink}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Verify Email</a>
                     </div>
                 </div>
             
             </body>
             </html>
             `
            };

            // Create a nodemailer transporter
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTPEMAIL,
                    pass: process.env.SMTPPASSWORD
                }
            });

            // Send the email
            await transporter.sendMail(mailOptions);
            res.status(200).send({ message: true });
        } else {
            res.status(200).send({ message: false });
        }
    } catch (error) {
        console.error('Error sending verification link:', error);
        res.status(500).send({ message: 'Error sending verification link.' });
    }
});


//email verification 
app.get('/verify', (req, res) => {
    const verificationToken = req.query.token;

    const verifyQuery = 'UPDATE user SET is_verified = 1 WHERE verification_token = ?';
    db.query(verifyQuery, [verificationToken], (verifyError, verifyResult) => {
        if (verifyError) {
            res.redirect('/email-failed');
            //res.send({ message: 'Verification failed. Invalid token.' });
        } else {
            res.redirect('/email-verified');
            //res.send({ message: 'Email verified successfully.' });
        }
    });
});

//reset password
app.get('/reset-password-page', (req, res) => {
    const verificationToken = req.query.token;
    const verifyQuery = 'SELECT id from user WHERE is_verified = 1 AND verification_token = ?';

    db.query(verifyQuery, [verificationToken], (Error, Result) => {
        if (Error) {
            res.redirect('/');
        } else {
            res.redirect(`/reset-password/${verificationToken}/${Result[0].id}`);
        }
    });
});

//submit new password
app.post('/submit-reset-password', (req, res) => {
    const password = bcrypt.hashSync(req.body.password, 10);
    const userId = req.body.userId;
    const token = req.body.token;

    const query = 'UPDATE user SET password = ? WHERE verification_token = ? AND id = ?'
    db.query(query, [password, token, userId], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({ message: "password reset" });
    });


});

//forget password

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const useremailQuery = 'SELECT * FROM user WHERE email = ?';
    db.query(useremailQuery, [email], (userError, userResult) => {
        if (userError) {
            throw userError;
        }

        if (userResult.length > 0) {

            const randomBytes = crypto.randomBytes(16);
            const verificationToken = randomBytes.toString('hex');

            // Save the verification token in the database
            const updateTokenQuery = 'UPDATE user SET verification_token = ? WHERE email = ?';
            db.query(updateTokenQuery, [verificationToken, email], async (updateTokenError, updateTokenResult) => {
                if (updateTokenError) {
                    throw updateTokenError;
                }

                // Send verification email
                const verificationLink = `${process.env.DOMAIN}/reset-password-page?token=${verificationToken}`;
                //const verificationLink = "testing";


                const mailOptions = {
                    from: process.env.SMTPEMAIL,
                    to: email,
                    subject: 'BrutTools password Reset',
                    html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>You have requested a password reset</title>
                        <style>
                            @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
                        </style>
                    </head>
                    <body class="bg-gray-100">
                    
                        <div class="container mx-auto px-4 py-8">
                            <div class="bg-white rounded-lg shadow-md p-6">
                                <h1 class="text-2xl font-bold text-blue-500 mb-4">Reset your password</h1>
                                <p class="mb-4">Please click here to reset your password.:</p>
                                <a href="${verificationLink}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset your password</a>
                            </div>
                        </div>
                    
                    </body>
                    </html>
                    `
                };


                // Create a nodemailer transporter
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.SMTPEMAIL,
                        pass: process.env.SMTPPASSWORD
                    }
                });

                // Send the email
                transporter.sendMail(mailOptions, (emailError, info) => {
                    if (emailError) {
                        throw emailError;
                    }

                });
            });

            return res.status(200).json({ message: 'Please check your email' });

        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    });



});

//login 
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send('No user exists!');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.send("User Logged in");
        });
    })(req, res, next);
});

//get user information
app.get('/getUser', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        res.json(user);
    } else {
        res.status(401).send('Unauthorized');
    }
});

// logging out
app.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    } else {
        res.send('not loggin');
    }
});

//increment user uses
app.get('/incrementAttempt', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const incrementQuery = 'UPDATE user SET attempt = attempt + 1 WHERE id = ?';

        db.query(incrementQuery, [userId], (err, result) => {
            if (err) {
                console.error('Error incrementing attempt:', err);
                return res.status(500).json({ error: 'An error occurred while incrementing attempt' });
            }

            return res.json({ message: 'Attempt incremented successfully' });
        });
    } else {
        return res.json({ message: 'Login please!' });
    }
});
//get number of attempt 
app.get('/getNumberOfAttempt', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const query = "SELECT * FROM `user` WHERE id = ?";
        db.query(query, [req.user.id], (err, result) => {
            if (err) { throw err; res.json(false); }
            const userInfo = {
                numberOfAttenmt: result[0].attempt,
            }
            res.json(userInfo);
        })
    } else {
        res.json(false);
    }
});

app.get('/getUserCredits', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const query = "SELECT * FROM `user` WHERE id = ?";
        db.query(query, [req.user.id], (err, result) => {
            if (err) { throw err; res.json(false); }
            const userInfo = {
                credits: result[0].credits,
            }
            res.json(userInfo);
        })
    } else {
        res.json(false);
    }
});

app.get('/checkNumberOfAttempt', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const query = "SELECT * FROM `user` WHERE id = ?";
        db.query(query, [req.user.id], (err, result) => {
            if (err) { throw err; res.json(false); }

            if ((result[0].credits < 1 && result[0].subscribre == false) || result[0].subscribre == true) {
                res.json(true);
            } else {
                res.json(false);
            }

        })
    } else {
        res.json(false);
    }
});


async function checkSubscribeStatus(req) {
    if (req.isAuthenticated()) {
        const user = req.user;
        if (user) {
            const UserSubscriptionPlan = await getUserSubscriptionPlan(user.id);

            if (UserSubscriptionPlan.isPro == true) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}


app.get('/checkSubscribe', authMiddleware, async (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        if (user) {
            //if (user && user.subscribed) {
            const UserSubscriptionPlan = await getUserSubscriptionPlan(user.id);

            if (UserSubscriptionPlan.isPro == true) {
                res.json(true);
            } else {
                res.json(false);
            }

        } else {
            res.json('no user connected');
        }
    } else {
        res.json(false);
    }


});
/*** route */
app.get('/checkAuthUser', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(true);
    } else {
        res.json(false);
    }
});

//APIs
//rm bg
app.get('/api/rmbg/', authMiddleware, async (req, res) => {
    const { url, gen, rm } = req.query;
    const decodedUrl = decodeURIComponent(url);
    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,

        });

        const output = await replicate.run(
            "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
            {
                input: {
                    image: decodedUrl,
                }
            }
        );

        const result = checkSubscribeStatus(req);
        result.then((isSubscribed) => {
            if (isSubscribed) {
                res.status(200).json({ newurl: output, newurl2: output });
            } else {
                /*
                   const result = await addWatermarkToImageUrl(output, WATERMARK);
                
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
                */

                addWatermarkToImageUrl(output, WATERMARK)
                    .then((result) => {
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        if (gen && rm) {
                            res.status(200).json({ newurl: watermarkedImageUrl, newurl2: output });
                        } else {
                            res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
                        }
                    })
                    .catch((error) => {
                        console.error(error.status, error.data);
                    });


            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }

});

//


//Gen BG api
app.get('/api/genbg/', authMiddleware, async (req, res) => {
    try {
        const { url, promptDesc, image_number, NpromptDesc, size, scale } = req.query;
        const decodedUrl2 = decodeURIComponent(promptDesc);
        const decodedUrl = decodeURIComponent(url);

        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });
        // "catacolabs/sdxl-ad-inpaint:9c0cb4c579c54432431d96c70924afcca18983de872e8a221777fb1416253359",
        const output = await replicate.run(
            "logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
            // "catacolabs/sdxl-ad-inpaint:9c0cb4c579c54432431d96c70924afcca18983de872e8a221777fb1416253359",
            {
                input: {
                    image_path: decodedUrl,
                    prompt: decodedUrl2,
                    image_num: Number(image_number),
                    //negative_prompt: "cat",
                    //negative_prompt: NegPrompt,
                    //product_size: "Original", //product_size: 0.6 * width 
                    //scale: Number(Dscale),//4,
                    //guidance_scale: Dscale,//7.5,
                    // num_inference_steps: 20,
                    // manual_seed: -1,
                },
            }
        );

        const result = checkSubscribeStatus(req);
        result.then((isSubscribed) => {
            if (isSubscribed) {
                res.status(200).json({ newurl: output });
            } else {

                var watermarkedUrls = [];
                var promises = [];

                for (let k = 0; k < output.length; k++) {
                    const url = output[k];
                    promises.push(
                        addWatermarkToImageUrl(url, WATERMARK)
                            .then((result) => {
                                const watermarkedImageUrl = '/uploads/' + result.data;
                                watermarkedUrls.push(watermarkedImageUrl);
                            })
                            .catch((error) => {
                                console.error(error.status, error.data);
                            })
                    );
                }

                Promise.all(promises)
                    .then(() => {
                        watermarkedUrls.reverse();
                        res.status(200).json({ newurl: watermarkedUrls });
                    })
                    .catch((error) => {
                        console.error('Error processing images:', error);
                        res.status(500).json({ error: 'Error processing images' });
                    });


            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

//add image to gallery
app.post('/addImage', (req, res) => {
    const { url, id_user } = req.body;
    const query = 'INSERT INTO `image` (`url`, `id_user`, `created_at`) VALUES (?, ?, ?)';

    db.query(query, [url, id_user, new Date()], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error inserting data' });
        } else {
            res.json({ message: 'Image saved' });
        }
    });
});


//Connect Lemon Squeezy



// to update 
// async function getPriceFromProductId(productId) {
//     try {
//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }

//         const priceList = await stripe.prices.list({
//             product: productId,
//             active: true,
//         });

//         if (priceList.data.length > 0) {
//             const priceId = priceList.data[0].id;
//             return priceId;
//         } else {
//             console.error('No active prices found for the given product.');
//             return null;
//         }
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }


// app.post('/api/changePlan', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const variantId = await getPriceFromProductId(req.body.variantId);

//         const query = `SELECT subscriptionId FROM user WHERE id = ? AND currentPeriodEnd IS NOT NULL AND DATE(currentPeriodEnd) > ?`;
//         const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];

//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }


//         db.query(query, values, async (error, results) => {
//             if (error) {
//                 console.error('Error executing query:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 if (results.length > 0 && results[0].subscriptionId) {
//                     try {

//                         const subscriptionId = results[0].subscriptionId;

//                         const subscriptionItems = await stripe.subscriptionItems.list({
//                             subscription: subscriptionId,
//                         });

//                         if (subscriptionItems.data.length > 0) {
//                             const subscriptionItemId = subscriptionItems.data[0].id;

//                             const updatedSubscription = await stripe.subscriptionItems.update(
//                                 subscriptionItemId,
//                                 {
//                                     price: variantId,
//                                 }
//                             );

//                             res.status(200).json({ Response: updatedSubscription });
//                         } else {
//                             res.status(404).json({ error: 'No subscription items found for the subscription' });
//                         }
//                     } catch (error) {
//                         console.error('Error updating subscription:', error);
//                         res.status(500).json({ error: 'Error making update request' });
//                     }
//                 } else {
//                     res.status(404).json({ error: 'Subscription not found' });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

//change subscription plan LS

app.post('/api/changePlan', authMiddleware, async (req, res) => {
    try {
        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;
        const userId = req.body.userId;
        const variantId = req.body.variantId;

        const query = `SELECT subscriptionId, variantId FROM user WHERE id = ? AND currentPeriodEnd IS NOT NULL AND DATE(currentPeriodEnd) > ?`;
        const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];

        db.query(query, values, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {


                if (results.length > 0 && results[0].subscriptionId && results[0].variantId) {
                    try {
                        axios.patch(`https://api.lemonsqueezy.com/v1/subscriptions/${results[0].subscriptionId}`,
                            {
                                data: {
                                    type: 'subscriptions',
                                    id: results[0].subscriptionId,
                                    attributes: {
                                        variant_id: variantId,
                                    },
                                }
                            }, {
                            headers: {
                                Accept: 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                Authorization: `Bearer ${apiKey}`,
                            },
                        })
                            .then(response => {
                                res.status(200).json({ Respence: response.data });

                            })
                            .catch(error => {
                                res.status(400).json({ error: error });
                            });


                    } catch (error) {
                        console.error('Error:', error);
                        res.status(500).json({ error: 'Error making delete request' });
                    }

                } else {
                    res.status(404).json({ error: 'Subscription not found' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});



// app.post('/api/changePlan', authMiddlewareAdmin, async (req, res) => {
//     try {
//         // const apiKey = process.env.LEMONSQUEEZY_API_KEY;
//         // const apiKey = await initializePaimentGateWay();

//         const userId = req.body.userId;
//         const variantId = req.body.variantId;
//         // const variantId = '458068';

//         const query = `SELECT subscriptionId, variantId FROM user WHERE id = ? AND currentPeriodEnd IS NOT NULL AND DATE(currentPeriodEnd) > ?`;
//         const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];

//         db.query(query, values, (error, results) => {
//             if (error) {
//                 console.error('Error executing query:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {


//                 if (results.length > 0 && results[0].subscriptionId && results[0].variantId) {
//                     try {
//                         axios.patch(`https://api.lemonsqueezy.com/v1/subscriptions/${results[0].subscriptionId}`,
//                             {
//                                 data: {
//                                     type: 'subscriptions',
//                                     id: results[0].subscriptionId,
//                                     attributes: {
//                                         variant_id: variantId,
//                                     },
//                                 }
//                             }, {
//                             headers: {
//                                 Accept: 'application/vnd.api+json',
//                                 'Content-Type': 'application/vnd.api+json',
//                                 Authorization: `Bearer ${apiKey}`,
//                             },
//                         })
//                             .then(response => {
//                                 console.log(response.data);
//                                 res.status(200).json({ Respence: response.data });

//                             })
//                             .catch(error => {
//                                 console.log(error);
//                                 res.status(400).json({ error: error });
//                             });


//                     } catch (error) {
//                         console.error('Error:', error);
//                         res.status(500).json({ error: 'Error making delete request' });
//                     }

//                 } else {
//                     console.log('Subscription not found');
//                     res.status(404).json({ error: 'Subscription not found' });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }


// });






//checkout links 
// to update
// async function IsCouponValid(coupon) {
//     try {
//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }


//         const checkUserCoupon = await stripe.coupons.retrieve(coupon);
//         return checkUserCoupon.valid || false;
//     } catch (error) {
//         return false;
//     }
// }

// check the coupon validity using LS 

async function IsCouponValid(coupon) {
    try {
        const response = await axios.get(`https://api.lemonsqueezy.com/v1/discounts?filter[code]=${coupon}`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });

        return (response.data.data && response.data.data.length > 0) ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}




//subscription 
// async function createSession(customerID, priceID, usercoupon) {
//     try {
//         const isValidCoupon = usercoupon !== null && usercoupon.trim() !== "" && await IsCouponValid(usercoupon);

//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         const checkout = await stripe.checkout.sessions.create({
//             customer: customerID,
//             success_url: process.env.REDIRECTION_LINK_AFTER_CHECKOUT,
//             line_items: [
//                 {
//                     price: priceID,
//                     quantity: 1,
//                 },
//             ],
//             ...(isValidCoupon && {
//                 discounts: [
//                     {
//                         coupon: usercoupon,
//                     },
//                 ],
//             }),
//             mode: 'subscription',
//         });

//         return checkout;
//     } catch (error) {
//         console.log('error: ', error);
//     }
// }

//payment
// async function createSessionPayment(customerID, priceID, usercoupon) {
//     try {
//         const isValidCoupon = usercoupon !== null && usercoupon.trim() !== "" && await IsCouponValid(usercoupon);

//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         const checkout = await stripe.checkout.sessions.create({
//             customer: customerID,
//             success_url: process.env.REDIRECTION_LINK_AFTER_CHECKOUT,
//             line_items: [
//                 {
//                     price: priceID,
//                     quantity: 1,
//                 },
//             ],
//             ...(isValidCoupon && {
//                 discounts: [
//                     {
//                         coupon: usercoupon,
//                     },
//                 ],
//             }),
//             mode: 'payment',
//         });

//         return checkout;
//     } catch (error) {
//         console.log('error: ', error);
//     }
// }


//for test ...

// app.get('/api/getCheckOutUrl', async (req, res) => {
//     var user = null;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         var checkout = await createSession(user.customerID, 'price_1OnmB8G7wv77vtTGeNefIme2', user.coupon);
//         res.status(201).json(checkout.url);
//     } catch (err) {
//         res.status(500).json({ message: err.message || err });
//     }
// });

// app.get('/api/getCheckOutUrll', async (req, res) => {
//     var user = null;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         var checkout = await createSession(user.customerID, 'price_1Onm8SG7wv77vtTG3feWL5yz', user.coupon);
//         res.status(201).json(checkout.url);
//     } catch (err) {
//         res.status(500).json({ message: err.message || err });
//     }
// });

//end for test ...


//#################### payment  ########################  

// app.get('/api/getCheckOutUrlMiniPayment', async (req, res) => {
//     var user = null;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         var checkout = await createSessionPayment(user.customerID, 'price_1OngAGG7wv77vtTGJwgXp6DX', user.coupon);
//         res.status(201).json(checkout.url);
//     } catch (err) {
//         res.status(500).json({ message: err.message || err });
//     }
// });

// app.get('/api/getCheckOutUrlProPaiment', async (req, res) => {
//     var user = null;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         var checkout = await createSessionPayment(user.customerID, 'price_1OngAsG7wv77vtTGhNTD1JPM', user.coupon);
//         res.status(201).json(checkout.url);
//     } catch (err) {
//         res.status(500).json({ message: err.message || err });
//     }
// });

// app.get('/api/getCheckOutUrlAgencyPaiment', async (req, res) => {
//     var user = null;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         var checkout = await createSessionPayment(user.customerID, 'price_1OngBeG7wv77vtTGouN8RGtu', user.coupon);
//         res.status(201).json(checkout.url);
//     } catch (err) {
//         res.status(500).json({ message: err.message || err });
//     }
// });


//#######################################################



//to delete 
app.get('/api/subscription', authMiddleware, async (req, res) => {
    const user = req.user;
    if (user) {
        const UserSubscriptionPlan = await getUserSubscriptionPlan(user.id);
        res.json(UserSubscriptionPlan);

    } else {
        res.json('no user connected');
    }

});



//get credicts  
async function getCredits(customer_id) {
    const query = 'SELECT credits FROM user WHERE customerId=?';

    try {
        const userResults = await new Promise((resolve, reject) => {
            db.query(query, [customer_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const credits = userResults.length > 0 ? userResults[0].credits : null;
        return credits;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// async function getPricesFromProductIds(productIds) {
//     try {
//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         const prices = await Promise.all(
//             productIds.map(async productId => {
//                 const priceList = await stripe.prices.list({
//                     product: productId,
//                     active: true,
//                 });

//                 // Extract and return an array of price IDs
//                 return priceList.data.map(price => price.id);
//             })
//         );
//         return prices;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

async function getAllMonthPlanProducts() {
    const query = 'SELECT id FROM monthlyplans';

    try {
        const userResults = await new Promise((resolve, reject) => {
            db.query(query, [], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const productIds = userResults.map(item => item.id);
        const prices = await getPricesFromProductIds(productIds);

        // Flatten the nested array to a single array of price IDs
        const flattenedPriceIds = [].concat(...prices);

        return flattenedPriceIds;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// getProductIDFromPrice for stripe

// async function getProductIDFromPrice(priceID) {
//     try {
//         if (!priceID) {
//             return;
//             //  throw new Error('priceID is null or undefined.');
//         }

//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }

//         const price = await stripe.prices.retrieve(priceID);
//         return price.product;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }





// async function getPlanCredits(price_id) {
//     const query = 'SELECT credits FROM creditsplans WHERE id=? UNION  SELECT credits FROM monthlyplans WHERE id=?';

//     try {
//         const product_id = await getProductIDFromPrice(price_id);
//         const userResults = await new Promise((resolve, reject) => {
//             db.query(query, [product_id, product_id], (error, results) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         const credits = userResults.length > 0 ? userResults[0].credits : null;
//         return credits;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }

// }

// async function getCreditsFromPrice(price) {
//     const query = 'SELECT credits FROM creditsplans WHERE price=?';
//     const pre = (price / 100);

//     try {
//         const userResults = await new Promise((resolve, reject) => {
//             db.query(query, [pre], (error, results) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         const credits = userResults.length > 0 ? userResults[0].credits : null;
//         return credits;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }

// }

//get user plan name from price 
// async function getUserPlanNameFromPrice(price_id) {
//     const query = 'SELECT name FROM monthlyplans WHERE id=?';
//     try {
//         const product_id = await getProductIDFromPrice(price_id);
//         const userResults = await new Promise((resolve, reject) => {
//             db.query(query, [product_id, product_id], (error, results) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });
//         const name = userResults.length > 0 ? userResults[0].name : " ";
//         return name;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }

// };


// Create a webhook to handle the subscription process with Stripe
// app.post('/webhook', async (req, res) => {
//     const body = JSON.stringify(req.body);
//     const sig = req.headers['stripe-signature'];

//     const customerID = req.body.data.object.customer;

//     if (!customerID) {
//         return sendResponse(res, 403, { message: 'No userId provided' });
//     }
//     const Credits = await getCredits(customerID);


//     const targetProductIds = await getAllMonthPlanProducts();

//     switch (req.body.type) {
//         case 'customer.subscription.updated':
//             let crd = await getPlanCredits(req.body.data.object.plan.id);
//             if (crd === null) {
//                 crd = 0;
//             }
//             //console.log(crd);
//             const userPlanName = await getUserPlanNameFromPrice(req.body.data.object.items.data[0].plan.id);

//             if (req.body.data.object.cancel_at_period_end == true && req.body.data.object.cancellation_details.reason == "cancellation_requested" && targetProductIds.includes(req.body.data.object.plan.id)) {
//                 const query = 'UPDATE user SET subscribre = 0, variantId = ?,planName = ? ,  currentPeriodEnd = NULL , attempt=0, canceled=?  WHERE customerId=? and  subscriptionId = ?';
//                 //console.log("1");

//                 // const userPlanName = getUserPlanNameFromPrice(req.body.data.object.items.data[0].plan.id);
//                 const values = [
//                     req.body.data.object.items.data[0].plan.id,
//                     "",
//                     req.body.data.object.cancel_at_period_end,
//                     req.body.data.object.customer,
//                     req.body.data.object.id,
//                 ];

//                 db.query(query, values, (err, result) => {
//                     if (err) {
//                         console.error('Error updating user:', err);
//                     }
//                 });
//             } else if (req.body.data.object.cancel_at_period_end == false && req.body.data.object.description == "canceled" && targetProductIds.includes(req.body.data.object.plan.id)) {
//                 const query = 'UPDATE user SET subscribre = 1, variantId = ?,planName = ? , currentPeriodEnd = ? , attempt=0, canceled=?, credits=?   WHERE customerId=? and  subscriptionId = ?';
//                 // const userPlanName = getUserPlanNameFromPrice(req.body.data.object.items.data[0].plan.id);
//                 //console.log("2");

//                 const values = [
//                     req.body.data.object.items.data[0].plan.id,
//                     userPlanName,
//                     new Date(req.body.data.object.current_period_end * 1000).toISOString().slice(0, 19).replace('T', ' '),
//                     req.body.data.object.cancel_at_period_end,
//                     crd,
//                     req.body.data.object.customer,
//                     req.body.data.object.id,
//                 ];

//                 db.query(query, values, (err, result) => {
//                     if (err) {
//                         console.error('Error updating user:', err);
//                     }
//                 });
//             } else if (req.body.data.object.status === 'active' && req.body.data.object.description != "canceled" && targetProductIds.includes(req.body.data.object.plan.id)) {
//                 const query = 'UPDATE user SET subscribre = 1, variantId = ?,planName = ? , currentPeriodEnd = ? , attempt=0, canceled=?, credits=?  WHERE customerId=? and  subscriptionId = ?';
//                 //console.log("3");

//                 // const userPlanName = getUserPlanNameFromPrice(req.body.data.object.items.data[0].plan.id);
//                 const values = [
//                     req.body.data.object.items.data[0].plan.id,
//                     userPlanName,
//                     new Date(req.body.data.object.current_period_end * 1000).toISOString().slice(0, 19).replace('T', ' '),
//                     req.body.data.object.cancel_at_period_end,
//                     crd,
//                     req.body.data.object.customer,
//                     req.body.data.object.id,
//                 ];

//                 db.query(query, values, (err, result) => {
//                     if (err) {
//                         console.error('Error updating user:', err);
//                     }
//                 });
//             }
//             else {

//                 const query = 'UPDATE user SET subscribre = 1, variantId = ?,planName = ? , attempt=0, canceled=?, credits=?   WHERE customerId=? and  subscriptionId = ?';
//                 console.log("4");
//                 // const userPlanName = getUserPlanNameFromPrice(req.body.data.object.items.data[0].plan.id);
//                 const values = [
//                     req.body.data.object.items.data[0].plan.id,
//                     userPlanName,
//                     req.body.data.object.cancel_at_period_end,
//                     crd,
//                     req.body.data.object.customer,
//                     req.body.data.object.id,
//                 ];

//                 db.query(query, values, (err, result) => {
//                     if (err) {
//                         console.error('Error updating user:', err);
//                     }
//                 });
//             }

//             break;

//         // payment 
//         case 'payment_intent.succeeded':
//             let plusCredit = 0;

//             plusCredit = await getCreditsFromPrice(req.body.data.object.amount);

//             if (req.body.data.object.status == 'succeeded' && req.body.data.object.object != 'subscription') {
//                 const query = 'UPDATE user SET attempt=0, credits=?  WHERE customerId=?';

//                 const values = [
//                     Credits + plusCredit,
//                     // plusCredit + " Credits plan",
//                     req.body.data.object.customer
//                 ];

//                 db.query(query, values, (err, result) => {
//                     if (err) {
//                         console.error('Error updating user:', err);
//                     }
//                 });
//             }
//             break;
//         // end payments
//         case 'customer.subscription.paused':
//             if (!customerID) {
//                 return sendResponse(res, 403, { message: 'No userId provided' });
//             }

//             break;
//         case 'customer.subscription.created':
//             if (!customerID) {
//                 return sendResponse(res, 403, { message: 'No userId provided' });
//             }


//             try {
//                 const query = 'UPDATE user SET subscriptionId = ?, variantId = ?, currentPeriodEnd = ?, attempt=0, canceled=? WHERE customerId=? ';

//                 const values = [
//                     req.body.data.object.id,
//                     req.body.data.object.items.data[0].plan.id,
//                     new Date(req.body.data.object.current_period_end * 1000).toISOString().slice(0, 19).replace('T', ' '),
//                     req.body.data.object.cancel_at_period_end,
//                     req.body.data.object.customer
//                 ];

//                 db.query(query, values, (err, result) => {
//                     if (err) {
//                         console.error('Error updating user:', err); //throw err;
//                     }
//                 });

//             } catch (error) {
//                 console.log(error)
//             }


//             break;
//         // default:
//         // console.log(`Unhandled event type: ${req.body.type}`);
//     }

//     // Respond to the webhook request
//     res.json({ received: true });
// });

//create a web hook to handle the subsciption process for LS:
const getPackageSize = async (variantId) => {
    try {
        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;
        // const apiKey = await initializePaimentGateWay();


        const pricesResponse = await axios.get(`https://api.lemonsqueezy.com/v1/prices?filter[variant_id]=${variantId}`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });

        return pricesResponse.data.data[0].attributes.package_size;
    } catch (error) {
        console.error(`Error fetching prices for variant ${variantId}:`, error);
        return 0;
    }

}



// handle the esisting products verification

app.post('/webhook', async (req, res) => {
    try {
        const body = JSON.stringify(req.body);
        const headers = req.headers;
        const sigString = headers['x-signature'];
        // const secret1 = process.env.LEMONS_SQUEEZY_SIGNATURE_SECRET;
        const secret1 = '123456';
        const hmac = crypto.createHmac('sha256', secret1);
        const digest = hmac.update(body).digest('hex');
        const signature = sigString;

        // Check if the webhook event was for this product or not
        // if (parseInt(req.body.data.attributes.product_id) !== parseInt(process.env.LEMONS_SQUEEZY_PRODUCT_ID) && parseInt(req.body.data.attributes.product_id) !== parseInt(process.env.LEMONS_SQUEEZY_PRODUCT_ID2)) {
        //     //console.log('Invalid product');
        //     return sendResponse(res, 403, { message: 'Invalid product' });
        // }

        // console.log("webhook is valid");

        // Validate the signature
        if (!crypto.timingSafeEqual(Buffer.from(digest, 'utf8'), Buffer.from(signature, 'utf8'))) {
            //console.log('Invalid signature');
            // return sendResponse(res, 403, { message: 'Invalid signature' });
        }
        //        console.log('===> ' + digest + '  and  ' + signature);

        const userId = req.body.meta.custom_data[0];
        // console.log(userId);

        // Check if custom defined data, i.e., the `userId`, is present or not
        if (!userId) {
            return sendResponse(res, 403, { message: 'No userId provided' });
        }

        switch (req.body.meta.event_name) {
            case 'subscription_created': {
                const package_size = await getPackageSize(req.body.data.attributes.variant_id);
                const query = 'UPDATE user SET subscriptionId = ?, variantId = ?, currentPeriodEnd = ?, customerId = ?, attempt=0, canceled=?, credits = ?, planName=?  WHERE id = ?';
                const values = [
                    req.body.data.id,
                    req.body.data.attributes.variant_id,
                    new Date(req.body.data.attributes.renews_at),
                    req.body.data.attributes.customer_id,
                    req.body.data.attributes.cancelled,
                    package_size,
                    req.body.data.attributes.product_name,
                    userId];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error updating user:', err); //throw err;
                    }
                    // console.log('Subscribed successfully');
                });
                break;
            }

            case 'subscription_cancelled': {
                const query = 'UPDATE user SET subscribre = 0, variantId = ?, currentPeriodEnd = NULL, attempt=0, canceled=?  WHERE id = ? and  subscriptionId = ?';
                const values = [
                    req.body.data.attributes.variant_id,
                    req.body.data.attributes.cancelled,
                    userId,
                    req.body.data.id
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error canceling user:', err);

                    }
                });

                break;
            }
            case 'subscription_resumed': {
                const query = 'UPDATE user SET subscribre = 0, variantId = ?, currentPeriodEnd = ? , attempt=0, canceled=?  WHERE id = ? and  subscriptionId = ?';
                const renewsAt = new Date(req.body.data.attributes.renews_at);
                const formattedRenewsAt = renewsAt.toISOString().slice(0, 19).replace('T', ' ');
                const values = [
                    req.body.data.attributes.variant_id,
                    formattedRenewsAt,
                    req.body.data.attributes.cancelled,
                    userId,
                    req.body.data.id
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error canceling user:', err);

                    }
                });

                break;
            }
            case 'subscription_updated': {
                if (!req.body.data.attributes.cancelled) {
                    const package_size = await getPackageSize(req.body.data.attributes.variant_id);
                    const query = 'UPDATE user SET subscribre = 1, variantId = ?, currentPeriodEnd = ? , attempt=0, credits = ?,planName=?  WHERE id = ? and  subscriptionId = ?';

                    const renewsAt = new Date(req.body.data.attributes.renews_at);
                    const formattedRenewsAt = renewsAt.toISOString().slice(0, 19).replace('T', ' ');

                    const values = [
                        req.body.data.attributes.variant_id,
                        formattedRenewsAt,
                        package_size,
                        req.body.data.attributes.product_name,
                        userId,
                        req.body.data.id
                    ];

                    db.query(query, values, (err, result) => {
                        if (err) {
                            console.error('Error updating user:', err);
                        }
                    });
                }
                break;
            }

            case 'order_created': {
                if (!req.body.data.attributes.cancelled) {
                    const package_size = await getPackageSize(req.body.data.attributes.first_order_item.variant_id);

                    const query = 'UPDATE user SET credits = credits + ? WHERE id = ?';


                    const values = [
                        package_size,
                        userId
                    ];

                    db.query(query, values, (err, result) => {
                        if (err) {
                            console.error('Error updating user:', err);
                        }
                    });
                }
                break;
            }

            case 'subscription_expired': {
                const query = 'UPDATE user SET subscribre = 0, variantId = ?, currentPeriodEnd = NULL, attempt=0 WHERE id = ? and  subscriptionId = ?';
                const values = [
                    req.body.data.attributes.variant_id,
                    userId,
                    req.body.data.id
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error canceling user:', err);

                    }
                });

                break;
            }


            case 'subscription_paused': {
                const query = 'UPDATE user SET subscribre = 0, variantId = ?, currentPeriodEnd = NULL WHERE id = ? and  subscriptionId = ?';
                const values = [
                    req.body.data.attributes.variant_id,
                    userId,
                    req.body.data.id
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error canceling user:', err);

                    }
                });

                break;
            }

            case 'subscription_unpaused': {
                const query = 'UPDATE user SET subscribre = 1, variantId = ?, currentPeriodEnd = ? WHERE id = ? and  subscriptionId = ?';

                const renewsAt = new Date(req.body.data.attributes.renews_at);
                const formattedRenewsAt = renewsAt.toISOString().slice(0, 19).replace('T', ' ');

                const values = [
                    req.body.data.attributes.variant_id,
                    formattedRenewsAt,
                    userId,
                    req.body.data.id
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error canceling user:', err);

                    }
                });

                break;
            }

            case 'subscription_plan_changed': {
                const query = 'UPDATE user SET subscribre = 1, variantId = ?, currentPeriodEnd = ? WHERE id = ? and  subscriptionId = ?';

                const renewsAt = new Date(req.body.data.attributes.renews_at);
                const formattedRenewsAt = renewsAt.toISOString().slice(0, 19).replace('T', ' ');

                const values = [
                    req.body.data.attributes.variant_id,
                    formattedRenewsAt,
                    userId,
                    req.body.data.id
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error canceling user:', err);

                    }
                });

                break;
            }


            default: {
                break;
            }
        }
        sendResponse(res, 200, { message: 'Success' });

    } catch (err) {
        sendResponse(res, 500, { message: err.message || err });
    }
});

function sendResponse(res, status, data) {
    res.status(status).json(data);
}




// function sendResponse(res, status, data) {
//     res.status(status).json(data);
// }





//user maangement 
//get all users



const ITEMS_PER_PAGE = 10;

app.get('/getAllUsers', authMiddlewareAdmin, async (req, res) => {
    const { page = 1, querySearch = "", statusActive, statusSubscription } = req.query;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    var query = `SELECT * FROM user WHERE username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%' ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;



    if ((!statusSubscription || statusSubscription == -1) && statusActive) {

        if (1 == statusActive) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND (credits > 0 and (currentPeriodEnd IS NULL OR currentPeriodEnd > NOW()))  OR role = 'admin' ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        } else if (0 == statusActive) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND (credits <= 0 OR currentPeriodEnd < NOW()) ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        }

    } else if (statusSubscription && (!statusActive || statusActive == -1)) {
        if (1 == statusSubscription) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND currentPeriodEnd IS NOT NULL AND currentPeriodEnd > NOW() ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        } else if (0 == statusSubscription) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%')  AND (currentPeriodEnd IS NULL OR currentPeriodEnd < NOW()) AND role is null ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        }
    } else if (statusSubscription && statusActive) {

        if (1 == statusSubscription && 1 == statusActive) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND (credits > 0 and (currentPeriodEnd IS NOT NULL OR currentPeriodEnd > NOW())) ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        } else if (0 == statusSubscription && 1 == statusActive) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND (credits > 0 and (currentPeriodEnd IS NULL))  ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        } else if (0 == statusSubscription && 0 == statusActive) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND (credits <= 0 and (currentPeriodEnd IS NULL)) ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        } else if (1 == statusSubscription && 0 == statusActive) {
            query = `SELECT * FROM user WHERE (username LIKE '%${querySearch}%' OR email LIKE '%${querySearch}%') AND (credits <= 0 and (currentPeriodEnd IS NOT NULL OR currentPeriodEnd > NOW()))  ORDER BY created_at DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
        }

    }

    if (req.isAuthenticated()) {
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            res.json(results);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.json({ message: 'Login please!' });
    }
});

app.get('/getTotalUsers', authMiddleware, async (req, res) => {
    const query = 'SELECT COUNT(*) as totalUsers FROM user';

    if (req.isAuthenticated()) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0].totalUsers);
                    }
                });
            });

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.json({ message: 'Login please!' });
    }
});




// this is the working code 

const cancelUser = async (subscriptionId) => {
    try {
        const response = await axios.delete(`https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`, {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });
        return { status: 200, data: response.data };
    } catch (error) {
        console.error(error);
        return { status: 400, error: error.message };
    }
};



app.delete('/deleteUser/:id', authMiddlewareAdmin, async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const userId = req.params.id;
            const currentWorkingDirectory = process.cwd();
            const incrementQuery = 'DELETE FROM user WHERE id = ?';
            const query = 'SELECT url FROM image WHERE id_user = ?';

            const queryCustomerId = 'SELECT customerId, subscriptionId FROM user WHERE id = ?';
            let customerID = null;

            db.query(queryCustomerId, [userId], (error, results) => {
                if (error) {
                    console.error('Error fetching customer ID:', error);
                    return res.status(500).json({ error: 'An error occurred while fetching customer ID' });
                }

                if (results.length > 0) {
                    customerID = results[0].customerId;
                    subscriptionID = results[0].subscriptionId;
                }

                db.query(query, [userId], (error, results) => {
                    if (error) {
                        console.error('Error fetching images:', error);
                        return res.status(500).json({ error: 'An error occurred while fetching images' });
                    }

                    if (results.length > 0) {
                        results.forEach((image) => {
                            const imageUrl = image.url;
                            const filePath = path.join(currentWorkingDirectory, imageUrl);

                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.error('Error deleting image file:', err);
                                    return res.status(500).json({ error: 'An error occurred while deleting the image file' });
                                }
                            });
                        });
                    }

                    db.query(incrementQuery, [userId], (err, result) => {
                        if (err) {
                            console.error('Error deleting user:', err);
                            return res.status(500).json({ error: 'An error occurred while deleting the user' });
                        }
                        if (customerID) {
                            // to update
                            // deleteCustomer(customerID);
                            if (subscriptionID) {
                                cancelUser(subscriptionID);
                            }

                        }
                        return res.json({ message: 'Delete successful' });
                    });
                });
            });
        } catch (error) {
            console.error('Unexpected error occurred:', error);
            return res.status(500).json({ error: 'Unexpected error occurred' });
        }
    } else {
        return res.json({ message: 'Login please!' });
    }
});






//add user
app.post('/adduser', (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const coupon = req.body.coupon;
        const email = req.body.email;


        const usernameQuery = 'SELECT * FROM user WHERE username = ?';
        db.query(usernameQuery, [username], (usernameError, usernameResult) => {
            if (usernameError) {
                throw usernameError;
            }

            if (usernameResult.length > 0) {
                res.send({ message: "Username already exists" });
            } else {
                const emailQuery = 'SELECT * FROM user WHERE email = ?';
                db.query(emailQuery, [email], async (emailError, emailResult) => {
                    if (emailError) {
                        throw emailError;
                    }

                    if (emailResult.length > 0) {
                        res.send({ message: "Email already exists" });
                    } else {

                        // var customer = await createCustomer(username, email);
                        const hashedPassword = bcrypt.hashSync(password, 10);
                        const query = 'INSERT INTO `user`(`username`,`password`,`email`,`attempt`, `subscribre`,`customerId`,`credits`,`planName`,`created_at`) VALUES (?,?,?,?,?,?,?,?,?)';
                        db.query(query, [username, hashedPassword, email, 0, false,/*customer.id*/, 3, "Free Plan", new Date()], (err, result) => {
                            if (err) {
                                throw err;
                            }
                            res.send({ message: "User Created" });

                            const randomBytes = crypto.randomBytes(16);
                            const verificationToken = randomBytes.toString('hex');

                            // Save the verification token in the database
                            const updateTokenQuery = 'UPDATE user SET verification_token = ? WHERE email = ?';
                            db.query(updateTokenQuery, [verificationToken, email], async (updateTokenError, updateTokenResult) => {
                                if (updateTokenError) {
                                    throw updateTokenError;
                                }

                                // Send verification email
                                const verificationLink = `${process.env.DOMAIN}/verify?token=${verificationToken}`;
                                //const verificationLink = "testing";


                                const mailOptions = {
                                    from: process.env.SMTPEMAIL,
                                    to: email,
                                    subject: 'BrutTools Email Verification',
                                    html: `
                                    <!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Email Verification</title>
                                        <style>
                                            @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
                                        </style>
                                    </head>
                                    <body class="bg-gray-100">
                                    
                                        <div class="container mx-auto px-4 py-8">
                                            <div class="bg-white rounded-lg shadow-md p-6">
                                                <h1 class="text-2xl font-bold text-blue-500 mb-4">Please verify your email address</h1>
                                                <p class="mb-4">Thank you for signing up! To complete your registration, please click the button below to verify your email address:</p>
                                                <a href="${verificationLink}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Verify Email</a>
                                            </div>
                                        </div>
                                    
                                    </body>
                                    </html>
                                    `
                                };


                                // Create a nodemailer transporter
                                const transporter = nodemailer.createTransport({
                                    host: 'smtp.gmail.com',
                                    port: 465,
                                    secure: true,
                                    auth: {
                                        user: process.env.SMTPEMAIL,
                                        pass: process.env.SMTPPASSWORD
                                    }
                                });

                                // Send the email
                                transporter.sendMail(mailOptions, (emailError, info) => {
                                    if (emailError) {
                                        throw emailError;
                                    }

                                    //console.log('Email sent: ' + info.response);
                                });
                            });
                        });
                    }
                });
            }
        });

    } catch (err) {
        res.send({ message: err });
    }
});


//edit user add middleware and auth conditions 
app.post('/editUser', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.body.id;
        const updatedUserData = req.body;
        const coupon = req.body.coupon;

        const { username, password, email } = updatedUserData;

        const usernameQuery = 'SELECT * FROM user WHERE username = ? && id != ?';
        db.query(usernameQuery, [username, userId], (usernameError, usernameResult) => {
            if (usernameError) {
                throw usernameError;
            }

            if (usernameResult.length > 0) {
                res.send({ message: "Username already exists" });
            } else {
                const emailQuery = 'SELECT * FROM user WHERE email = ? && id != ?';
                db.query(emailQuery, [email, userId], (emailError, emailResult) => {
                    if (emailError) {
                        throw emailError;
                    }

                    if (emailResult.length > 0) {
                        res.send({ message: "Email already exists" });
                    } else {

                        if (password) {
                            const hashedPassword = bcrypt.hashSync(password, 10);
                            db.query('UPDATE user SET username=?, password=?, email=?, updated_at=? WHERE id = ?',
                                [username, hashedPassword, email, new Date(), userId],
                                (err, result) => {
                                    if (err) {
                                        console.error('Error updating user:', err);
                                        res.status(500).json({ error: 'An error occurred while updating the user' });
                                    } else {
                                        res.json({ message: 'User updated successfully' });
                                    }
                                }
                            );
                        } else {
                            db.query('UPDATE user SET username=?, email=?, updated_at=? WHERE id = ?',
                                [username, email, new Date(), userId],
                                (err, result) => {
                                    if (err) {
                                        console.error('Error updating user:', err);
                                        res.status(500).json({ error: 'An error occurred while updating the user' });
                                    } else {
                                        res.json({ message: 'User updated successfully' });
                                    }
                                }
                            );
                        }

                    }
                });
            }
        });


    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});




//get user number ID  
app.get('/getUserByNumber/:id', authMiddleware, (req, res) => {
    const userId = req.params.id;
    if (req.isAuthenticated()) {
        db.query('SELECT * FROM user WHERE id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error fetching user data:', err);
                res.status(500).json({ error: 'An error occurred while fetching user data' });
            } else {
                const item = results[0];
                res.json(item);
            }
        });
    } else {
        return res.json({ message: 'Login please!' });
    }
});


//image maangement 
//get all logged user images
app.get('/getAllUserImages', authMiddleware, async (req, res) => {
    const userId = req.query.user_id;
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 8;

    if (req.isAuthenticated()) {
        const offset = (page - 1) * itemsPerPage;
        const query = 'SELECT * FROM image WHERE id_user = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
        return new Promise((resolve, reject) => {
            db.query(query, [userId, itemsPerPage, offset], (error, results) => {
                if (error) {
                    res.json(error);
                } else {
                    res.json(results);
                }
            });
        });
    } else {
        return res.json({ message: 'Login please!' });
    }
});
app.get('/getTotalImages', authMiddleware, async (req, res) => {
    const userId = req.query.user_id;
    const query = 'SELECT COUNT(*) as totalImages FROM image WHERE id_user = ?';
    if (req.isAuthenticated()) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query(query, [userId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0].totalImages);
                    }
                });
            });

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.json({ message: 'Login please!' });
    }
});


//delete user  ! rs add middleware + auth consditions 

app.delete('/deleteImage/:id', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const imageId = req.params.id;
        const currentWorkingDirectory = process.cwd();
        // Delete the image file from storage.

        const query = 'SELECT url FROM image WHERE id = ?';
        db.query(query, [imageId], (error, results) => {
            if (error) {
                return res.json(error);
            }

            // Check if any results were returned from the database query.
            if (results.length > 0) {
                const imageUrl = results[0].url; // Assuming the URL is in the first result row.
                const filePath = path.join(currentWorkingDirectory, imageUrl);

                // Delete the image file from storage using the imageUrl.
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:');
                        // console.error('Error deleting image file:', err);
                        return res.status(500).json({ error: 'An error occurred while deleting the image file' });
                    } else {
                        const incrementQuery = 'DELETE FROM image WHERE id = ?';
                        db.query(incrementQuery, [imageId], (err, result) => {
                            if (err) {
                                console.error('Error deleting user :', err);
                                return res.status(500).json({ error: 'An error occurred while Deleting' });
                            }
                            return res.json({ message: 'delete successfully', data: imageId });
                        });
                    }

                });
            }
        });



    } else {
        return res.json({ message: 'Login please!' });
    }

});

//upload images
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create the 'uploads' folder if it doesn't exist
        const uploadFolder = './uploads';
        fs.mkdir(uploadFolder, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating the uploads folder:', err);
            }
            cb(null, uploadFolder);
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const newImageUrl = req.file.filename;
    res.status(200).json({ newImageUrl });
});

//dowload image from url
app.post('/downloadImage', async (req, res) => {
    try {
        const { imageURL } = req.body;

        var imageURL2 = imageURL;
        const result = checkSubscribeStatus(req);
        result.then(async (isSubscribed) => {
            if (isSubscribed) {

                const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
                if (response.status === 200) {
                    const imageName = 'GenratedImage-' + Date.now() + '.jpg';
                    fs.writeFileSync(path.join('./uploads', imageName), response.data);

                    res.status(200).json({ newImageUrl: `/uploads/${imageName}` });

                } else {
                    res.status(response.status).json({ error: 'Error downloading image' });
                }
            } else {
                res.status(200).json({ newImageUrl: imageURL });

            }
        });


    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//delete images for unsubscribed user 
function deleteImagesOfNOSubscribers() {

    const currentWorkingDirectory = process.cwd();
    const currentDate = new Date();
    const query = 'SELECT id, username, subscriptionId, currentPeriodEnd FROM user WHERE (currentPeriodEnd < ? OR currentPeriodEnd IS NULL) AND (role NOT LIKE "admin" OR role IS NULL)';
    db.query(query, [currentDate], (error, userResults) => {
        if (error) {
            return;
        }

        const userIds = userResults.map((user) => user.id);
        const imageQuery = 'SELECT id, url FROM image WHERE (id_user IN (?) and created_at <= NOW() - INTERVAL 10080 MINUTE) OR id_user IS NULL';

        db.query(imageQuery, [userIds], (imageError, imageResults) => {

            if (imageError) {
                // console.error('Error finding images querying database:', imageError);
                return;
            }


            imageResults.forEach((image) => {
                const imageUrl = image.url;
                //console.log(imageUrl);

                const filePath = path.join(currentWorkingDirectory, imageUrl);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        //console.error('Error deleting image file:');
                        console.error('Error deleting image file:', err);
                    } else {
                        const deleteImageQuery = 'DELETE FROM image WHERE id = ?';
                        db.query(deleteImageQuery, [image.id], (deleteError, deleteResult) => {
                            if (deleteError) {
                                console.error('Error deleting image record:', deleteError);
                            }
                        });
                    }
                });
            });

            //console.log({ message: 'Images of unsubscribers deleted successfully' });
        });

    });
}
//delete all unUsed images
function unlinkImagesNotInDatabase() {
    const currentWorkingDirectory = process.cwd() + '/uploads/';

    const databaseQuery = 'SELECT id, url FROM image';
    db.query(databaseQuery, (dbError, dbResults) => {
        if (dbError) {
            console.error('Error querying database:', dbError);
            return;
        }
        fs.readdir(currentWorkingDirectory, (readDirErr, files) => {
            if (readDirErr) {
                console.error('Error reading directory:', readDirErr);
                return;
            }
            files.forEach((file) => {
                const fileUrl = '/uploads/' + file;
                const isInDatabase = dbResults.some((dbImage) => dbImage.url === fileUrl);
                if (!isInDatabase) {
                    const filePath = path.join(currentWorkingDirectory, file);

                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            //console.error('Error deleting image file:');
                            console.error('Error deleting image file:', unlinkErr);
                        }
                    });

                }

            });
        });
    });
}


const cron = require('node-cron');
const { log } = require('console');



cron.schedule('*/5 * * * *', () => {
    deleteImagesOfNOSubscribers();
    unlinkImagesNotInDatabase();
});

cron.schedule('0 0 1 * *', () => {
    const incrementQuery = 'UPDATE user SET credits = 10 WHERE (role NOT LIKE "admin" OR role IS NULL) AND planName like "Free Plan"';

    db.query(incrementQuery, (err, result) => {
        if (err) {
            console.error('Error adding 10 credits:', err);
        }
    });
});



app.post('/addWatermark', (req, res) => {
    const { imageUrl } = req.body;
});


//restore
app.get('/api/restore/', authMiddleware, async (req, res) => {
    const { url } = req.query;


    const decodedUrl = decodeURIComponent(url);
    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
            {
                input: {
                    image: decodedUrl,
                }
            }
        );

        const result = checkSubscribeStatus(req);
        result.then(async (isSubscribed) => {
            if (isSubscribed) {
                res.status(200).json({ newurl: output, newurl2: output });
            } else {

                addWatermarkToImageUrl(output, WATERMARK)
                    .then((result) => {
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
                    })
                    .catch((error) => {
                        console.error(error.status, error.data);
                    });


                /*
                   const result = await addWatermarkToImageUrl(output, WATERMARK);
                
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
                */

            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }

});

// upscale

app.get('/api/upscale/', authMiddleware, async (req, res) => {
    const { url, scale } = req.query;
    const decodedUrl = decodeURIComponent(url);

    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
                input: {
                    image: decodedUrl,
                    scale: Number(scale),
                }
            }
        );

        const result = checkSubscribeStatus(req);
        result.then(async (isSubscribed) => {
            if (isSubscribed) {
                res.status(200).json({ newurl: output, newurl2: output });
            } else {


                addWatermarkToImageUrl(output, WATERMARK)
                    .then((result) => {
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
                    })
                    .catch((error) => {
                        console.error(error.status, error.data);
                    });
            }
        });


        /*
           const result = await addWatermarkToImageUrl(output, WATERMARK);
        
                const watermarkedImageUrl = '/uploads/' + result.data;
                res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
        */

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }

});


app.get('/api/upscale-guest/', async (req, res) => {
    const { url } = req.query;
    //scale = 2;
    const decodedUrl = decodeURIComponent(url);

    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
                input: {
                    image: decodedUrl,
                    scale: Number(UPSACALE_PHOTO_GUEST),
                }
            }
        );


        addWatermarkToImageUrl(output, WATERMARK)
            .then((result) => {
                const watermarkedImageUrl = '/uploads/' + result.data;
                res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
            })
            .catch((error) => {
                console.error(error.status, error.data);
            });



        /*
           const result = await addWatermarkToImageUrl(output, WATERMARK);
        
                const watermarkedImageUrl = '/uploads/' + result.data;
                res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
        */

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }

});

//restore
app.get('/api/restore-guest/', async (req, res) => {
    const { url } = req.query;

    const decodedUrl = decodeURIComponent(url);
    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
            {
                input: {
                    image: decodedUrl,
                }
            }
        );

        await addWatermarkToImageUrl(output, WATERMARK)
            .then((result) => {
                const watermarkedImageUrl = '/uploads/' + result.data;
                res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
            })
            .catch((error) => {
                console.error(error.status, error.data);
                res.status(500).json({ error: 'An error occurred while adding watermark' });
            });

        // res.status(200).json({ newurl: output, newurl2: output });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

//Gen BG api  guest
app.get('/api/genbg-guest/', async (req, res) => {
    try {
        const { url, promptDesc, image_number } = req.query;
        const decodedUrl2 = decodeURIComponent(promptDesc);
        const decodedUrl = decodeURIComponent(url);

        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "logerzhu/ad-inpaint:b1c17d148455c1fda435ababe9ab1e03bc0d917cc3cf4251916f22c45c83c7df",
            {
                input: {
                    image_path: decodedUrl,
                    prompt: decodedUrl2,
                    image_num: Number(image_number),
                    size: OUTPUT_IMAGE_GUEST,
                },
            }
        );

        var watermarkedUrls = [];
        var promises = [];
        for (let k = 0; k < output.length; k++) {
            const url = output[k];
            promises.push(
                addWatermarkToImageUrl(url, WATERMARK)
                    .then((result) => {
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        watermarkedUrls.push(watermarkedImageUrl);
                    })
                    .catch((error) => {
                        console.error(error.status, error.data);
                    })
            );
        }

        Promise.all(promises)
            .then(() => {
                watermarkedUrls.reverse();
                res.status(200).json({ newurl: watermarkedUrls });
            })
            .catch((error) => {
                console.error('Error processing images:', error);
                res.status(500).json({ error: 'Error processing images' });
            });
        // res.status(200).json({ newurl: ["/uploads/GenratedImage-1720136483440.jpg", "/uploads/GenratedImage-1720136483440.jpg"] });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


//remove bg guest
app.get('/api/rmbg-guest/', async (req, res) => {
    const { url } = req.query;
    const decodedUrl = decodeURIComponent(url);
    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,

        });

        const output = await replicate.run(
            "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
            {
                input: {
                    image: decodedUrl,
                    size: OUTPUT_IMAGE_GUEST,
                }
            }
        );



        addWatermarkToImageUrl(output, WATERMARK)
            .then((result) => {
                const watermarkedImageUrl = '/uploads/' + result.data;
                res.status(200).json({ newurl: watermarkedImageUrl });
            })
            .catch((error) => {
                console.error(error.status, error.data);
            });


        /*
           const result = await addWatermarkToImageUrl(output, WATERMARK);
        
                const watermarkedImageUrl = '/uploads/' + result.data;
                res.status(200).json({ newurl: watermarkedImageUrl, newurl2: watermarkedImageUrl });
        */

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }

});

//AI Image Generation without login 
app.get('/api/ai-image-generation-guest/', async (req, res) => {
    try {
        const { promptDesc, image_number } = req.query;
        const promptDescription = decodeURIComponent(promptDesc);


        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
            {
                input: {
                    prompt: promptDescription,
                    num_outputs: Number(image_number),
                    // size: OUTPUT_IMAGE_GUEST,
                    // width: 1024,
                    // height: 1024,
                    // scheduler: "K_EULER",
                    // num_outputs: 1,
                    // guidance_scale: 0,
                    // negative_prompt: "worst quality, low quality",
                    // num_inference_steps: 4
                },
            }
        );

        var watermarkedUrls = [];
        var promises = [];
        for (let k = 0; k < output.length; k++) {
            const url = output[k];
            promises.push(
                addWatermarkToImageUrl(url, WATERMARK)
                    .then((result) => {
                        const watermarkedImageUrl = '/uploads/' + result.data;
                        watermarkedUrls.push(watermarkedImageUrl);
                    })
                    .catch((error) => {
                        console.error(error.status, error.data);
                    })
            );
        }

        Promise.all(promises)
            .then(() => {
                watermarkedUrls.reverse();
                res.status(200).json({ newurl: watermarkedUrls });
            })
            .catch((error) => {
                console.error('Error processing images:', error);
                res.status(500).json({ error: 'Error processing images' });
            });


        // res.status(200).json({ newurl: ["/uploads/GenratedImage-1720136454626.jpg", "/uploads/GenratedImage-1720136454626.jpg"] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// AI image generation with login

app.get('/api/ai-image-generation/', authMiddleware, async (req, res) => {
    try {
        const { promptDesc, image_number } = req.query;
        const promptDescription = decodeURIComponent(promptDesc);
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });
        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
            {
                input: {
                    prompt: promptDescription,
                    num_outputs: Number(image_number),
                    // size: OUTPUT_IMAGE_GUEST,
                    // width: 1024,
                    // height: 1024,
                    // scheduler: "K_EULER",
                    // num_outputs: 1,
                    // guidance_scale: 0,
                    // negative_prompt: "worst quality, low quality",
                    // num_inference_steps: 4
                },
            }
        );
        const result = checkSubscribeStatus(req);
        result.then((isSubscribed) => {
            if (isSubscribed) {
                res.status(200).json({ newurl: output });
            } else {

                var watermarkedUrls = [];
                var promises = [];

                for (let k = 0; k < output.length; k++) {
                    const url = output[k];
                    promises.push(
                        addWatermarkToImageUrl(url, WATERMARK)
                            .then((result) => {
                                const watermarkedImageUrl = '/uploads/' + result.data;
                                watermarkedUrls.push(watermarkedImageUrl);
                            })
                            .catch((error) => {
                                console.error(error.status, error.data);
                            })
                    );
                }

                Promise.all(promises)
                    .then(() => {
                        watermarkedUrls.reverse();
                        res.status(200).json({ newurl: watermarkedUrls });
                    })
                    .catch((error) => {
                        console.error('Error processing images:', error);
                        res.status(500).json({ error: 'Error processing images' });
                    });


            }
        });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


//get settings 
app.get('/getSettings', (req, res) => {
    // if (req.isAuthenticated()) {
    db.query('SELECT * FROM settings', (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).json({ error: 'An error occurred while fetching user data' });
        } else {
            const item = results[0];
            res.status(200).json(item)
        }
    });
    // } else {
    //     return res.json({ message: 'Login please!' });
    // }
});

//set settings 
//change replicate 
app.post('/changeReplicate', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const replicateApi = req.body.token;
        db.query('UPDATE settings SET replicate_key = ?, updated_at = ?',
            [replicateApi, new Date()],
            (err, result) => {

                if (err) {
                    res.status(500).json({ error: 'An error occurred while updating API' });
                } else {
                    REPLICATE_API_TOKEN = replicateApi;
                    res.json({ message: 'Replicate changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});

//change stripe 
// Function to update Stripe API token
function updateStripeToken(newToken, callback) {

    db.query('UPDATE settings SET stripe_api = ?, updated_at = ?', [newToken, new Date()], (err, result) => {
        if (err) {

            callback(err);
        } else {
            // stripe = require('stripe')(newToken);
            apiKey = newToken;
            callback(null);
        }
    });
}

// Endpoint to change Stripe API token
// app.post('/changeStripe', authMiddlewareAdmin, async (req, res) => {
//     if (!req.isAuthenticated()) {
//         return res.status(401).json({ message: 'Login please!' });
//     }

//     const stripeApi = req.body.token;

//     if (!stripeApi || !await verifyStripeAPIKey(stripeApi)) {
//         return res.status(400).json({ error: 'Stripe API token is empty' });
//     }


//     updateStripeToken(stripeApi, (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'An error occurred while updating stripe API' });
//         }
//         delete require.cache[require.resolve('stripe')];
//         stripe = require('stripe')(stripeApi);
//         // Re-initialize Stripe with the new token
//         try {
//             stripe = require('stripe')(stripeApi);
//             return res.json({ message: 'Stripe changed successfully' });
//         } catch (stripeError) {
//             console.error('Failed to initialize Stripe:', stripeError);
//             return res.status(500).json({ error: 'Failed to initialize Stripe: ' + stripeError.message });
//         }
//     });
// });


// paiment gateway api

app.post('/paymentGatewayAPI', authMiddlewareAdmin, async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Login please!' });
    }

    // const stripeApi = req.body.token;
    const paymentGatewayAPI = req.body.token;

    if (!paymentGatewayAPI) {
        return res.status(400).json({ error: 'API token is empty' });
    }


    updateStripeToken(paymentGatewayAPI, (err) => {
        if (err) {
            return res.json({ message: 'Failed to initialize the payment gateway API' });

        }
        return res.json({ message: 'the payment gateway API changed successfully' });

    });
});

//change watermark
app.post('/changeWatermark', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const watermark = req.body.watermarktest;
        db.query('UPDATE settings SET watermark_text = ?, updated_at = ?',
            [watermark, new Date()],
            (err, result) => {

                if (err) {
                    res.status(500).json({ error: 'An error occurred while Watermark' });
                } else {
                    WATERMARK = watermark;
                    res.json({ message: 'Watermarkchanged successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});
//change watermark position 
app.post('/changeWatermarkPosX', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const watermarkPosX = req.body.watermarkPosX;
        const watermarkPosX2 = req.body.watermarkPosX2;
        const watermarkPosX3 = req.body.watermarkPosX3;

        db.query('UPDATE settings SET watermark_position_x = ?, watermark_position_x2 = ?, watermark_position_x3 = ?, updated_at = ?',
            [watermarkPosX, watermarkPosX2, watermarkPosX3, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while  WATERMARK_POS_X' });
                } else {
                    WATERMARK_POS_X = watermarkPosX;
                    res.json({ message: 'WATERMARK_POS_X changed successfully' });
                }
            }
        );
    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});

app.post('/changeWatermarkPosY', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const watermarkPosY = req.body.watermarkPosY;
        const watermarkPosY2 = req.body.watermarkPosY2;
        const watermarkPosY3 = req.body.watermarkPosY3;
        db.query('UPDATE settings SET watermark_position_y = ?, watermark_position_y2 = ?, watermark_position_y3 = ?, updated_at = ?',
            [watermarkPosY, watermarkPosY2, watermarkPosY3, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while WATERMARK_POS_Y' });
                } else {
                    WATERMARK_POS_Y = watermarkPosY;
                    res.json({ message: 'WATERMARK_POS_Y changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});
// upscale photo guest 
app.post('/changeUpscalePhotoGuest', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const upsacalePhotoSacaleGuest = req.body.upsacalePhotoSacaleGuest;
        db.query('UPDATE settings SET upscale_scale_guest = ?, updated_at = ?',
            [upsacalePhotoSacaleGuest, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while UPSACALE_PHOTO_GUEST' });
                } else {
                    UPSACALE_PHOTO_GUEST = upsacalePhotoSacaleGuest;
                    res.json({ message: 'UPSACALE_PHOTO_GUEST changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});

// Background generale photo guest MAX
app.post('/changeBackgroundgeneralPhotoGuest', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const Background_General_PHOTO_GUEST = req.body.Background_General_PHOTO_GUEST;
        db.query('UPDATE settings SET nbre_bk_image_guest = ?, updated_at = ?',
            [Background_General_PHOTO_GUEST, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while Background_General_PHOTO_GUEST' });
                } else {
                    BACKGROUND_GENERAL_PHOTO_GUEST = Background_General_PHOTO_GUEST;
                    res.json({ message: 'Background_General_PHOTO_GUEST changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});


// Ia Image photo guest MAX
app.post('/changeiaimagegeneralPhotoGuest', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const Image_Generator_PHOTO_GUEST = req.body.Image_Generator_PHOTO_GUEST;
        db.query('UPDATE settings SET nbre_ia_image_guest = ?, updated_at = ?',
            [Image_Generator_PHOTO_GUEST, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while Image_Generator_PHOTO_GUEST' });
                } else {
                    IA_IMAGE_GENERAL_PHOTO_GUEST = Image_Generator_PHOTO_GUEST;
                    res.json({ message: 'Image_Generator_PHOTO_GUEST changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});


//output image guest
app.post('/changeOutputImageGuest', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const outputImageGuest = req.body.outputImageGuest;
        db.query('UPDATE settings SET output_image_guest = ?, updated_at = ?',
            [outputImageGuest, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while OUTPUT_IMAGE_GUEST' });
                } else {
                    OUTPUT_IMAGE_GUEST = outputImageGuest;
                    res.json({ message: 'OUTPUT_IMAGE_GUEST changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});

//watermark size 


app.post('/changeWaterMarkSize', authMiddlewareAdmin, (req, res) => {
    if (req.isAuthenticated()) {
        const watermark_size = req.body.watermark_size;
        db.query('UPDATE settings SET watermark_size = ?, updated_at = ?',
            [watermark_size, new Date()],
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while water mark change' });
                } else {
                    WATERMARK_SIZE = watermark_size;
                    res.json({ message: 'Watermark size changed successfully' });
                }
            }
        );

    } else {
        res.status(401).json({ message: 'Login please!' });
    }
});

//##########################################################################

//####################### Plan management Stripe ##############################
//to delete 
// app.get('/api/getAllProductss1', async (req, res) => {
//     var user = null;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }


//         const products = await stripe.products.list({ active: true });

//         const productsWithPrices = await Promise.all(products.data.map(async (product) => {
//             const prices = await stripe.prices.list({
//                 product: product.id,
//                 limit: 1,
//             });
//             const session = await createSession(user.customerID, prices.data[0].id, user.coupon);

//             return {
//                 id: product.id,
//                 priceId: prices.data[0].id,
//                 name: product.name,
//                 description: product.description,
//                 price: prices.data[0].unit_amount / 100,
//                 checkoutUrl: session && session.url ? session.url : "/"

//             };
//         }));

//         res.status(200).json(productsWithPrices);



//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error.message });
//     }


// });

// for LS 

// async function createCheckout(req) {
//     let user = null;
//     let variantId = '456789';
//     let redirectUrl = 'www.google.com';
//     let storeId = '110536';

//     const apiKey = process.env.LEMONSQUEEZY_API_KEY;
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         console.log(user);

//         if (!user) {
//             return res.status(404).json({ message: "Your account was not found" });
//         }
//         var checkout = null;
//         if (user.coupon != null && user.coupon != "") {
//             checkout = await axios.post(
//                 "https://api.lemonsqueezy.com/v1/checkouts",
//                 {
//                     data: {
//                         type: 'checkouts',
//                         attributes: {
//                             checkout_data: {
//                                 discount_code: user.coupon,
//                                 name: user.username,
//                                 email: user.email,
//                                 custom: [`${user.id}`],
//                             }, product_options: {
//                                 redirect_url: redirectUrl,
//                             },
//                             preview: true
//                         },
//                         relationships: {
//                             store: {
//                                 data: {
//                                     type: 'stores',
//                                     id: storeId,
//                                 }
//                             },
//                             variant: {
//                                 data: {
//                                     type: 'variants',
//                                     id: variantId,
//                                 }
//                             }
//                         }
//                     },
//                 },
//                 {
//                     headers: {
//                         Accept: 'application/vnd.api+json',
//                         'Content-Type': 'application/vnd.api+json',
//                         Authorization: `Bearer ${apiKey}`
//                     }
//                 }
//             );
//         } else {
//             checkout = await axios.post(
//                 "https://api.lemonsqueezy.com/v1/checkouts",
//                 {
//                     data: {
//                         type: 'checkouts',
//                         attributes: {
//                             checkout_data: {
//                                 name: user.username,
//                                 email: user.email,
//                                 custom: [`${user.id}`],
//                             }, product_options: {
//                                 redirect_url: redirectUrl,
//                             },
//                             preview: true
//                         },
//                         relationships: {
//                             store: {
//                                 data: {
//                                     type: 'stores',
//                                     id: '110536',
//                                 }
//                             },
//                             variant: {
//                                 data: {
//                                     type: 'variants',
//                                     id: '456789',
//                                 }
//                             }
//                         }
//                     },
//                 },
//                 {
//                     headers: {
//                         Accept: 'application/vnd.api+json',
//                         'Content-Type': 'application/vnd.api+json',
//                         Authorization: `Bearer ${apiKey}`
//                     }
//                 }
//             );
//         }

//         return checkout.data.data.attributes.url;

//     } catch (err) {
//         return err.message || err;
//     }

// }

async function createCheckout(req, variantId, storeId, category) {
    let user = null;

    // const apiKey = process.env.LEMONSQUEEZY_API_KEY; 

    if (req.isAuthenticated()) {
        user = req.user;
    }

    if (!user) {
        return res.status(404).json({ message: "Your account was not found" });
    }
    var checkout = null;

    if (user.coupon != null && (user.coupon).trim() != "" && await IsCouponValid(user.coupon) && user.canceled !== 1 && category === 'subscription') {
        checkout = await axios.post(
            "https://api.lemonsqueezy.com/v1/checkouts",
            {
                data: {
                    type: 'checkouts',
                    attributes: {
                        checkout_data: {
                            discount_code: user.coupon,
                            name: user.username,
                            email: user.email,
                            custom: [`${user.id}`],
                        }, product_options: {
                            redirect_url: process.env.REDIRECTION_LINK_AFTER_CHECKOUT,
                        },
                        preview: true
                    },
                    relationships: {
                        store: {
                            data: {
                                type: 'stores',
                                id: storeId,
                            }
                        },
                        variant: {
                            data: {
                                type: 'variants',
                                id: variantId,
                            }
                        }
                    }
                },
            },
            {
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
    } else {
        checkout = await axios.post(
            "https://api.lemonsqueezy.com/v1/checkouts",
            {
                data: {
                    type: 'checkouts',
                    attributes: {
                        checkout_data: {
                            name: user.username,
                            email: user.email,
                            custom: [`${user.id}`],
                        }, product_options: {
                            redirect_url: process.env.REDIRECTION_LINK_AFTER_CHECKOUT,
                        },
                        preview: true
                    },
                    relationships: {
                        store: {
                            data: {
                                type: 'stores',
                                id: storeId,
                            }
                        },
                        variant: {
                            data: {
                                type: 'variants',
                                id: variantId,
                            }
                        }
                    }
                },
            },
            {
                headers: {
                    Accept: 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
    }


    return checkout.data.data.attributes.url;
}


app.get('/api/getAllProductss', async (req, res) => {
    let user = null;
    try {
        if (!req.isAuthenticated() || !req.user) {
            user = req.user;
            return res.status(404).json({ message: "Unauthorized" });
        }

        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;



        // Fetch products
        const productsResponse = await axios.get('https://api.lemonsqueezy.com/v1/products', {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });



        const products = productsResponse.data.data;

        // Process each product to fetch its variants and prices
        const productsWithVariantsAndPrices = await Promise.all(products.map(async (product) => {
            try {

                // Fetch variants for the current product
                const variantsResponse = await axios.get(`https://api.lemonsqueezy.com/v1/variants?filter[product_id]=${product.id}`, {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                });

                const variants = variantsResponse.data.data;


                // Fetch prices for each variant
                const variantsWithPrices = await Promise.all(variants.map(async (variant) => {
                    try {
                        const pricesResponse = await axios.get(`https://api.lemonsqueezy.com/v1/prices?filter[variant_id]=${variant.id}`, {
                            headers: {
                                Accept: 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                Authorization: `Bearer ${apiKey}`,
                            },
                        });


                        // await createCheckout(req, (variant.id).toString(), (product.attributes.store_id).toString())
                        return { ...variant, prices: pricesResponse.data.data, CHeckURL: await createCheckout(req, (variant.id).toString(), (product.attributes.store_id).toString(), pricesResponse.data.data[0].attributes.category) };
                    } catch (error) {
                        console.error(`Error fetching prices for variant ${variant.id}:`, error);
                        return { ...variant, prices: [] };
                    }
                }));

                return { ...product, variants: variantsWithPrices };
            } catch (error) {
                console.error(`Error fetching variants for product ${product.id}:`, error);
                return { ...product, variants: [] };
            }
        }));

        // // Format the response to remove duplicates and only include necessary fields
        // const formattedProducts = productsWithVariantsAndPrices.flatMap(product =>
        //     product.variants.flatMap(variant =>
        //         variant.prices.map(price => ({
        //             id: product.id,
        //             priceId: price.id,
        //             name: product.attributes.name,
        //             description: product.attributes.description,
        //             price: product.attributes.price / 100, // Convert from cents to dollars
        //             checkoutUrl: product.attributes.buy_now_url
        //         }))
        //     )
        // );

        // res.status(200).json({ formattedProducts });

        const uniqueEntries = new Map();

        productsWithVariantsAndPrices.forEach(async product => {
            // Get the first variant if available

            const firstVariant = product.variants[0];
            const price = product.attributes.price / 100;
            if (firstVariant) {
                // Get the first price if available
                const firstPrice = firstVariant.prices[0];
                if (firstPrice) {
                    const entry = {
                        id: product.id, // Product ID
                        priceId: firstPrice.id, // Price ID
                        name: product.attributes.name, // Product name
                        description: product.attributes.description, // Product description
                        price: price,
                        credits: firstPrice.attributes.package_size,
                        category: firstPrice.attributes.category,
                        checkoutUrl: firstVariant.CHeckURL,
                        variantId: firstVariant.id
                    };


                    // Use a unique key based on product and price ID
                    const key = `${entry.id}-${entry.priceId}`;
                    uniqueEntries.set(key, entry);
                }
            }
        });

        // Convert map to array
        const formattedProducts = Array.from(uniqueEntries.values());

        // Send the array directly in the response
        res.status(200).json(formattedProducts);



    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});



//for guests 

app.get('/api/getAllProductssGuest', async (req, res) => {


    try {
        // Fetch products
        const productsResponse = await axios.get('https://api.lemonsqueezy.com/v1/products', {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${apiKey}`,
            },
        });



        const products = productsResponse.data.data;



        // Process each product to fetch its variants and prices
        const productsWithVariantsAndPrices = await Promise.all(products.map(async (product) => {
            try {

                // Fetch variants for the current product
                const variantsResponse = await axios.get(`https://api.lemonsqueezy.com/v1/variants?filter[product_id]=${product.id}`, {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                });



                const variants = variantsResponse.data.data;


                // Fetch prices for each variant
                const variantsWithPrices = await Promise.all(variants.map(async (variant) => {
                    try {
                        const pricesResponse = await axios.get(`https://api.lemonsqueezy.com/v1/prices?filter[variant_id]=${variant.id}`, {
                            headers: {
                                Accept: 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                Authorization: `Bearer ${apiKey}`,
                            },
                        });

                        return { ...variant, prices: pricesResponse.data.data };
                    } catch (error) {
                        console.error(`Error fetching prices for variant ${variant.id}:`, error);
                        return { ...variant, prices: [] };
                    }
                }));

                return { ...product, variants: variantsWithPrices };
            } catch (error) {
                console.error(`Error fetching variants for product ${product.id}:`, error);
                return { ...product, variants: [] };
            }
        }));



        const uniqueEntries = new Map();
        productsWithVariantsAndPrices.forEach(async product => {
            const firstVariant = product.variants[0];
            const price = product.attributes.price / 100;
            if (firstVariant) {
                const firstPrice = firstVariant.prices[0];
                if (firstPrice) {
                    const entry = {
                        id: product.id,
                        priceId: firstPrice.id,
                        name: product.attributes.name,
                        description: product.attributes.description,
                        price: price,
                        credits: firstPrice.attributes.package_size,
                        category: firstPrice.attributes.category,
                        variantId: firstVariant.id
                    };


                    const key = `${entry.id}-${entry.priceId}`;
                    uniqueEntries.set(key, entry);
                }
            }
        });


        const formattedProducts = Array.from(uniqueEntries.values());

        res.status(200).json(formattedProducts);

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }

});




// app.get('/api/getAllProductssGuest', async (req, res) => {
//     try {
//         // Check if stripe is initialized
//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }

//         var targetProductIds = [];
//         const searchQuery = 'SELECT id FROM monthlyplans';
//         db.query(searchQuery, [], async (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }

//             const ids = result.map(item => item.id);
//             targetProductIds.push(...ids);

//             const products = await stripe.products.list({ active: true });
//             const filteredProducts = products.data.filter(product => targetProductIds.includes(product.id));

//             const productsWithPrices = await Promise.all(filteredProducts.map(async (product) => {
//                 const prices = await stripe.prices.list({
//                     product: product.id,
//                     limit: 1,
//                 });

//                 return {
//                     id: product.id,
//                     priceId: prices.data[0].id,
//                     name: product.name,
//                     description: product.description,
//                     price: prices.data[0].unit_amount / 100
//                 };
//             }));

//             res.status(200).json(productsWithPrices);
//         });
//     } catch (error) {
//         // Handle errors here
//         if (error instanceof stripe.errors.StripeAuthenticationError) {
//             console.error('Invalid API Key provided:', error.raw.message);
//             res.status(401).json({ error: 'Invalid API Key provided' });
//         } else {
//             console.error(error);
//             res.status(400).json({ error: error.message });
//         }
//     }
// });



//for users
// app.get('/api/getAllProductss1', async (req, res) => {

//     var user = null;
//     var targetProductIds = [];
//     const searchQuery = 'SELECT id FROM monthlyplans';
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }

//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         db.query(searchQuery, [], async (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }
//             const ids = result.map(item => item.id);
//             targetProductIds.push(...ids);

//             const products = await stripe.products.list({ active: true });
//             const filteredProducts = products.data.filter(product => targetProductIds.includes(product.id));

//             const productsWithPrices = await Promise.all(filteredProducts.map(async (product) => {
//                 const prices = await stripe.prices.list({
//                     product: product.id,
//                     limit: 1,
//                 });
//                 const session = await createSession(user.customerID, prices.data[0].id, user.coupon);










//                 // axios.get('https://api.lemonsqueezy.com/v1/products', {
//                 //     headers: {
//                 //         Accept: 'application/vnd.api+json',
//                 //         'Content-Type': 'application/vnd.api+json',
//                 //         Authorization: `Bearer ${apiKey}`,
//                 //     },
//                 // })
//                 //     .then(response => {
//                 //         res.status(200).json(response.data.data[0]);
//                 //     })
//                 //     .catch(error => {
//                 //         res.status(400).json({ error: 'error' });
//                 //         console.error(error);
//                 //     });






//                 return {
//                     id: product.id,
//                     priceId: prices.data[0].id,
//                     name: product.name,
//                     description: product.description,
//                     price: prices.data[0].unit_amount / 100,
//                     checkoutUrl: session && session.url ? session.url : "/",
//                 };
//             }));

//             res.status(200).json(productsWithPrices);

//         });

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error.message });
//     }



// });



//for guests 
// app.get('/api/getAllProductsspaymentGuest', async (req, res) => {
//     try {
//         // Check if stripe is initialized
//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }
//         var targetProductIds = [];
//         const searchQuery = 'SELECT id FROM creditsplans';
//         db.query(searchQuery, [], async (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }

//             const ids = result.map(item => item.id);
//             targetProductIds.push(...ids);

//             const products = await stripe.products.list({ active: true });
//             const filteredProducts = products.data.filter(product => targetProductIds.includes(product.id));

//             const productsWithPrices = await Promise.all(filteredProducts.map(async (product) => {
//                 const prices = await stripe.prices.list({
//                     product: product.id,
//                     limit: 1,
//                 });

//                 return {
//                     id: product.id,
//                     priceId: prices.data[0].id,
//                     name: product.name,
//                     description: product.description,
//                     price: prices.data[0].unit_amount / 100
//                 };
//             }));

//             res.status(200).json(productsWithPrices);
//         });
//     } catch (error) {
//         // Handle errors here
//         if (error instanceof stripe.errors.StripeAuthenticationError) {
//             console.error('Invalid API Key provided:', error.raw.message);
//             res.status(401).json({ error: 'Invalid API Key provided' });
//         } else {
//             console.error(error);
//             res.status(400).json({ error: error.message });
//         }
//     }
// });




//for users 
// app.get('/api/getAllProductsspayment', async (req, res) => {
//     var user = null;
//     var targetProductIds = [];
//     const searchQuery = 'SELECT id FROM creditsplans';
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         db.query(searchQuery, [], async (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }
//             const ids = result.map(item => item.id);
//             targetProductIds.push(...ids);

//             const products = await stripe.products.list({ active: true });
//             const filteredProducts = products.data.filter(product => targetProductIds.includes(product.id));

//             const productsWithPrices = await Promise.all(filteredProducts.map(async (product) => {
//                 const prices = await stripe.prices.list({
//                     product: product.id,
//                     limit: 1,
//                 });
//                 const session = await createSessionPayment(user.customerID, prices.data[0].id, user.coupon);

//                 return {
//                     id: product.id,
//                     priceId: prices.data[0].id,
//                     name: product.name,
//                     description: product.description,
//                     price: prices.data[0].unit_amount / 100,
//                     checkoutUrl: session && session.url ? session.url : "/",
//                 };
//             }));

//             res.status(200).json(productsWithPrices);
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error.message });
//     }
// });


//edited for LS code
// app.get('/api/getAllProductsspayment', async (req, res) => {
//     var user = null;
//     var targetProductIds = [];
//     const searchQuery = 'SELECT id FROM creditsplans';
//     try {
//         if (req.isAuthenticated()) {
//             user = req.user;
//         }
//         if (!user) {
//             return res.status(404).json({ message: "Unauthorized" });
//         }
//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         db.query(searchQuery, [], async (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }
//             const ids = result.map(item => item.id);
//             targetProductIds.push(...ids);

//             const products = await stripe.products.list({ active: true });
//             const filteredProducts = products.data.filter(product => targetProductIds.includes(product.id));

//             const productsWithPrices = await Promise.all(filteredProducts.map(async (product) => {
//                 const prices = await stripe.prices.list({
//                     product: product.id,
//                     limit: 1,
//                 });
//                 const session = await createSessionPayment(user.customerID, prices.data[0].id, user.coupon);

//                 return {
//                     id: product.id,
//                     priceId: prices.data[0].id,
//                     name: product.name,
//                     description: product.description,
//                     price: prices.data[0].unit_amount / 100,
//                     checkoutUrl: session && session.url ? session.url : "/",
//                 };
//             }));

//             res.status(200).json(productsWithPrices);
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error.message });
//     }
// });



// //stripe cancel subscription 
// app.delete('/api/cancelSubscription', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.body.userId;

//         const query = `SELECT subscriptionId FROM user WHERE id = ? AND currentPeriodEnd IS NOT NULL AND DATE(currentPeriodEnd) > ?`;
//         const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];
//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }


//         db.query(query, values, async (error, results) => {
//             if (error) {
//                 //console.error('Error executing query:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 if (results.length > 0 && results[0].subscriptionId) {
//                     try {
//                         const subscription = await stripe.subscriptions.update(
//                             results[0].subscriptionId,
//                             {
//                                 cancel_at_period_end: true,

//                             }
//                         ).then(response => {
//                             res.status(200).json({ Response: response });

//                         })
//                             .catch(error => {
//                                 res.status(400).json({ error: error.message });


//                             });

//                     } catch (error) {
//                         // console.error('Error:', error);
//                         res.status(500).json({ error: 'Error making delete request' });
//                     }

//                 } else {
//                     res.status(404).json({ error: 'Subscription not found' });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// });

// //resume stripe subscription 
// app.post('/api/resumingSubscription', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const query = `SELECT subscriptionId FROM user WHERE id = ? `;
//         const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];

//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }


//         db.query(query, values, async (error, results) => {
//             if (error) {
//                 console.error('Error executing query:', error);
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 if (results.length > 0 && results[0].subscriptionId) {

//                     try {

//                         const subscription = await stripe.subscriptions.update(
//                             results[0].subscriptionId,
//                             {
//                                 cancel_at_period_end: false,
//                                 description: "canceled",
//                             }
//                         ).then(response => {
//                             res.status(200).json({ Response: response });
//                         })
//                             .catch(error => {
//                                 res.status(400).json({ error: error.message });
//                             });


//                     } catch (error) {
//                         console.error('Error:', error);
//                         res.status(500).json({ error: 'Error resuming subscription' });
//                     }

//                 } else {
//                     res.status(404).json({ error: 'Subscription not found' });
//                 }

//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }


// });

//cancel subscription
app.delete('/api/cancelSubscription', authMiddleware, async (req, res) => {
    try {
        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;
        // const apiKey = await initializePaimentGateWay();

        const userId = req.body.userId;

        const query = `SELECT subscriptionId FROM user WHERE id = ? AND currentPeriodEnd IS NOT NULL AND DATE(currentPeriodEnd) > ?`;
        const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];

        db.query(query, values, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0 && results[0].subscriptionId) {
                    try {
                        axios.delete(`https://api.lemonsqueezy.com/v1/subscriptions/${results[0].subscriptionId}`, {
                            headers: {
                                Accept: 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                Authorization: `Bearer ${apiKey}`,
                            },
                        })
                            .then(response => {
                                res.status(200).json({ Respence: response.data });
                            })
                            .catch(error => {
                                res.status(400).json({ error: error });
                                console.error(error);
                            });

                    } catch (error) {
                        console.error('Error:', error);
                        res.status(500).json({ error: 'Error making delete request' });
                    }

                } else {
                    res.status(404).json({ error: 'Subscription not found' });
                }
            }
        });
    } catch (error) {



        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});

//resuming sunscription
app.post('/api/resumingSubscription', authMiddleware, async (req, res) => {
    try {
        // const apiKey = process.env.LEMONSQUEEZY_API_KEY;
        // const apiKey = await initializePaimentGateWay();

        const userId = req.body.userId;

        const query = `SELECT subscriptionId FROM user WHERE id = ?`;
        const values = [userId, new Date().toISOString().slice(0, 19).replace('T', ' ')];

        db.query(query, values, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0 && results[0].subscriptionId) {

                    try {
                        axios.patch(`https://api.lemonsqueezy.com/v1/subscriptions/${results[0].subscriptionId}`,
                            {
                                data: {
                                    type: 'subscriptions',
                                    id: results[0].subscriptionId,
                                    attributes: {
                                        cancelled: false,
                                    },
                                }
                            }, {
                            headers: {
                                Accept: 'application/vnd.api+json',
                                'Content-Type': 'application/vnd.api+json',
                                Authorization: `Bearer ${apiKey}`,
                            },
                        })
                            .then(response => {
                                res.status(200).json({ Respence: response.data });
                            })
                            .catch(error => {
                                res.status(400).json({ error: error });
                            });


                    } catch (error) {
                        console.error('Error:', error);
                        res.status(500).json({ error: 'Error resuming subscription' });
                    }

                } else {
                    res.status(404).json({ error: 'Subscription not found' });
                }

            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});




app.get('/descrementCredits', authMiddleware, (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const incrementQuery = 'UPDATE user SET credits = credits - 1 WHERE id = ?';

        db.query(incrementQuery, [userId], (err, result) => {
            if (err) {
                console.error('Error credits decrementing :', err);
                return res.status(500).json({ error: 'An error occurred while decrementing credits' });
            }

            return res.json({ message: 'credits decrementing successfully' });
        });

    } else {
        return res.json({ message: 'Login please!' });
    }
});

//Plans managment 
//delete plans 

// async function deletePlan(productId) {
//     try {
//         if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//             throw new Error('Stripe is not initialized or the API key is invalid.');
//         }

//         const archivedProduct = await stripe.products.update(productId, {
//             active: false,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

//getPlans 
app.get('/getMonthPlans', authMiddlewareAdmin, async (req, res) => {
    //const { page = 1, querySearch = "", statusActive, statusSubscription } = req.query;
    //const offset = (page - 1) * ITEMS_PER_PAGE;
    var query = `SELECT * FROM monthlyplans`;

    if (req.isAuthenticated()) {
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            res.json(results);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.json({ message: 'Login please!' });
    }
});



//delete  plan 
app.delete('/deleteMonthPlan/:id', authMiddlewareAdmin, async (req, res) => {
    if (req.isAuthenticated()) {
        const planId = req.params.id;
        const query = 'DELETE FROM monthlyplans WHERE id = ?';

        db.query(query, [planId], (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                return res.status(500).json({ error: 'An error occurred while deleting the Plan' });
            }

            deletePlan(planId);
            return res.json({ message: 'Delete successful' });

        });

    } else {
        return res.json({ message: 'Login please!' });
    }
});

//update plan 
// app.post('/api/updatePlan', authMiddleware, async (req, res) => {
//     if (req.isAuthenticated()) {
//         try {
//             const planId = req.body.id;
//             const updatedPlanData = req.body;
//             const { name, description, amount, credits } = updatedPlanData;
//             const updateQuery = 'UPDATE monthlyplans SET name=?, description=?, credits=?, price=? WHERE id = ?';

//             if (!stripe) {
//                 throw new Error('Stripe is not initialized. Invalid API key provided.');
//             }

//             db.query(updateQuery, [name, description, credits, Number(amount) / 100, planId],
//                 async (err, result) => {
//                     if (err) {
//                         console.error('Error updating Plan:', err);
//                         res.status(500).json({ error: 'An error occurred while updating the Plan' });
//                     } else {
//                         //Update product details
//                         const updatedProduct = await stripe.products.update(planId, {
//                             name: name,
//                             description: description,
//                         });

//                         // Get the existing prices
//                         const prices = await stripe.prices.list({
//                             product: planId,
//                         });

//                         // Deactivate all existing prices
//                         await Promise.all(prices.data.map(async (price) => {
//                             await stripe.prices.update(price.id, {
//                                 active: false,
//                             });
//                         }));

//                         // Create a new price for the product
//                         const newPrice = await stripe.prices.create({
//                             product: planId,
//                             //unit_amount: Number(amount) * 100,
//                             unit_amount: Number(amount),
//                             //unit_amount: Number(amount.replace(/,/g, '')) * 100,
//                             currency: 'usd',
//                             recurring: {
//                                 interval: 'month',
//                                 interval_count: 1,
//                             },
//                         });


//                     }
//                 }
//             );
//             res.json({ message: 'User updated successfully' });

//             // res.status(200).json({ updatedProduct, newPrice });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Internal server error.' });
//         }
//     } else {
//         res.status(401).json({ message: 'Login please!' });
//     }
// });

// //add plan 
// app.post('/addPlan', async (req, res) => {
//     try {
//         const name = req.body.name;
//         const description = req.body.description;
//         const amount = req.body.amount;
//         const limitation = req.body.limitation;
//         const addQuery = 'INSERT INTO monthlyplans (`id`, `name`, `description`, `price`, `credits`) VALUES (?, ?, ?, ?, ?)';

//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         const product = await stripe.products.create({
//             name: name,
//             description: description,
//         });

//         const price = await stripe.prices.create({
//             product: product.id,
//             unit_amount: Number(amount),
//             currency: 'usd',
//             recurring: {
//                 interval: 'month',
//                 interval_count: 1,
//             },
//         });
//         if (price) {
//             db.query(addQuery, [product.id, name, description, (Number(amount) / 100), limitation], (error, results) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     res.status(200).json({ product, price });

//                 }
//             });

//         }

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//get plan by id 
app.get('/api/getPlanByID/:id', authMiddleware, async (req, res) => {
    const planId = req.params.id;
    const addQuery = 'select * from monthlyplans where id = ?';

    try {
        if (req.isAuthenticated()) {

            db.query(addQuery, [planId], (error, results) => {
                if (error) {
                    console.log(error);
                } else {

                    if (results && results.length > 0) {
                        const planDetails = {
                            id: planId,
                            name: results[0].name,
                            description: results[0].description,
                            amount: results[0].price,
                            credits: results[0].credits
                        };

                        res.status(200).json(planDetails);
                    } else {
                        res.status(404).json({ message: 'Plan not found.' });
                    }
                }
            });


        } else {
            res.status(401).json({ message: 'Please log in.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// credits plan managements 

app.get('/getCreditsPlans', authMiddlewareAdmin, async (req, res) => {

    var query = `SELECT * FROM creditsplans`;

    if (req.isAuthenticated()) {
        try {
            const results = await new Promise((resolve, reject) => {
                db.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            res.json(results);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.json({ message: 'Login please!' });
    }
});

//delete  plan 
app.delete('/deleteCreditsPlan/:id', authMiddlewareAdmin, async (req, res) => {
    if (req.isAuthenticated()) {
        const planId = req.params.id;
        const query = 'DELETE FROM creditsplans WHERE id = ?';

        db.query(query, [planId], (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                return res.status(500).json({ error: 'An error occurred while deleting the Plan' });
            }

            deletePlan(planId);
            return res.json({ message: 'Delete successful' });

        });

    } else {
        return res.json({ message: 'Login please!' });
    }
});

//update plan 
// app.post('/api/updateCreditsPlan', authMiddleware, async (req, res) => {
//     if (req.isAuthenticated()) {
//         try {
//             const planId = req.body.id;
//             const updatedPlanData = req.body;
//             const { name, description, amount, credits } = updatedPlanData;
//             const updateQuery = 'UPDATE creditsplans SET name=?, description=?, credits=?, price=? WHERE id = ?';

//             if (!stripe) {
//                 throw new Error('Stripe is not initialized. Invalid API key provided.');
//             }

//             db.query(updateQuery, [name, description, credits, (Number(amount) / 100), planId],
//                 async (err, result) => {
//                     if (err) {
//                         console.error('Error updating Plan:', err);
//                         res.status(500).json({ error: 'An error occurred while updating the Plan' });
//                     } else {
//                         //Update product details
//                         const updatedProduct = await stripe.products.update(planId, {
//                             name: name,
//                             description: description,
//                         });

//                         // Get the existing prices
//                         const prices = await stripe.prices.list({
//                             product: planId,
//                         });

//                         // Deactivate all existing prices
//                         await Promise.all(prices.data.map(async (price) => {
//                             await stripe.prices.update(price.id, {
//                                 active: false,
//                             });
//                         }));

//                         // Create a new price for the product
//                         const newPrice = await stripe.prices.create({
//                             product: planId,
//                             //unit_amount: Number(amount) * 100,
//                             unit_amount: Number(amount),
//                             currency: 'usd',

//                         });


//                     }
//                 }
//             );
//             res.json({ message: 'User updated successfully' });

//             // res.status(200).json({ updatedProduct, newPrice });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Internal server error.' });
//         }
//     } else {
//         res.status(401).json({ message: 'Login please!' });
//     }
// });

//add plan 
// app.post('/addCreditsPlan', async (req, res) => {
//     try {
//         const name = req.body.name;
//         const description = req.body.description;
//         const amount = req.body.amount;
//         const limitation = req.body.limitation;
//         const addQuery = 'INSERT INTO creditsplans (`id`, `name`, `description`, `price`, `credits`) VALUES (?, ?, ?, ?, ?)';

//         // if (!stripe || !await verifyStripeAPIKey(STRIPE_API_TOKEN)) {
//         //     throw new Error('Stripe is not initialized or the API key is invalid.');
//         // }


//         const product = await stripe.products.create({
//             name: name,
//             description: description,
//         });

//         const price = await stripe.prices.create({
//             product: product.id,
//             unit_amount: Number(amount),
//             currency: 'usd',

//         });
//         if (price) {
//             db.query(addQuery, [product.id, name, description, (Number(amount) / 100), limitation], (error, results) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     res.status(200).json({ product, price });

//                 }
//             });

//         }

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//get plan by id 
app.get('/api/getCreditsPlanByID/:id', authMiddleware, async (req, res) => {
    const planId = req.params.id;
    const addQuery = 'select * from creditsplans where id = ?';

    try {
        if (req.isAuthenticated()) {

            db.query(addQuery, [planId], (error, results) => {
                if (error) {
                    console.log(error);
                } else {

                    if (results && results.length > 0) {
                        const planDetails = {
                            id: planId,
                            name: results[0].name,
                            description: results[0].description,
                            amount: results[0].price,
                            credits: results[0].credits
                        };

                        res.status(200).json(planDetails);
                    } else {
                        res.status(404).json({ message: 'Plan not found.' });
                    }
                }
            });


        } else {
            res.status(401).json({ message: 'Please log in.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


//get current user plan  for admin
//to update
// app.get('/getCurrentUserIdProduct/:id', authMiddlewareAdmin, (req, res) => {
//     const userId = req.params.id;
//     if (req.isAuthenticated()) {
//         db.query('SELECT variantId FROM user WHERE id = ?', [userId], async (err, results) => {
//             if (err) {
//                 console.error('Error fetching user data:', err);
//                 res.status(500).json({ error: 'An error occurred while fetching user data' });
//             } else {
//                 const productid = await getProductIDFromPrice(results[0].variantId);
//                 res.json(productid);
//             }
//         });
//     } else {
//         return res.json({ message: 'Login please!' });
//     }
// });

//get current user plan for USER for STRIPE 
// app.get('/getUserIdProduct', authMiddleware, (req, res) => {
//     const userId = req.query.userId;
//     if (req.isAuthenticated()) {
//         db.query('SELECT variantId FROM user WHERE id = ?', [userId], async (err, results) => {
//             if (err) {
//                 console.error('Error fetching user data:', err);
//                 res.status(500).json({ error: 'An error occurred while fetching user data' });
//             } else {
//                 const productid = await getProductIDFromPrice(results[0].variantId);
//                 res.json(productid);
//             }
//         });
//     } else {
//         return res.json({ message: 'Login please!' });
//     }
// });

//get current user plan for USER for LS i use variant instead
app.get('/getUserIdProduct', authMiddleware, (req, res) => {
    const userId = req.query.userId;
    if (req.isAuthenticated()) {
        db.query('SELECT variantId FROM user WHERE id = ?', [userId], async (err, results) => {
            if (err) {
                console.error('Error fetching user data:', err);
                res.status(500).json({ error: 'An error occurred while fetching user data' });
            } else {
                //const productid = await getProductIDFromPrice(results[0].variantId);
                res.json(results[0].variantId);
            }
        });
    } else {
        return res.json({ message: 'Login please!' });
    }
});


app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});
