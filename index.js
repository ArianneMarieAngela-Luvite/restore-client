const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.fetchCsvFromStorage = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const bucket = admin.storage().bucket();
        const fileName = 'uploaded_csv/hermitimtim23_uploaded_csv/loaded_data.csv'; // Path to your CSV file

        try {
            // Get the file from Firebase Storage
            const file = bucket.file(fileName);
            const [exists] = await file.exists();

            if (!exists) {
                return res.status(404).send('File not found');
            }

            // Get the signed URL to access the file directly
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: Date.now() + 15 * 60 * 1000 // URL expires in 15 minutes
            });

            // Redirect or send the URL to the client
            res.redirect(url);
        } catch (error) {
            console.error('Error fetching file:', error);
            res.status(500).send('Error fetching file');
        }
    });
});
