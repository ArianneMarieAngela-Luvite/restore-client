const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const fetchCsvFromStorage = async (fileName) => {
    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);
    const [exists] = await file.exists();

    if (!exists) {
        throw new Error(`File not found: ${fileName}`);
    }

    // Read the contents of the file
    const [contents] = await file.download();
    return contents.toString('utf-8'); // Convert buffer to string
};

exports.fetchLoadedDataCsv = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const name = req.query.name;
        if (!name) {
            return res.status(400).send('Username is required');
        }

        const fileName = `uploaded_csv/${name}_uploaded_csv/loaded_data.csv`;

        try {
            const csvData = await fetchCsvFromStorage(fileName);
            res.status(200).send(csvData); // Send CSV data as plain text
        } catch (error) {
            console.error('Error fetching loaded_data.csv:', error);
            res.status(500).send(error.message);
        }
    });
});

exports.fetchProductDemandFinalsCsv = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const name = req.query.name;
        if (!name) {
            return res.status(400).send('Username is required');
        }

        const fileName = `uploaded_csv/${name}_uploaded_csv/productdemandfinals.csv`;

        try {
            const csvData = await fetchCsvFromStorage(fileName);
            res.status(200).send(csvData); // Send CSV data as plain text
        } catch (error) {
            console.error('Error fetching productdemandfinals.csv:', error);
            res.status(500).send(error.message);
        }
    });
});
