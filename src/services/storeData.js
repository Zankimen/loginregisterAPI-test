const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.STORAGE_ACCESS_KEY,
});

async function storeData(id, data) {
    try {
        const profileCollection = db.collection('profile');
        return profileCollection.doc(id).set(data);
    } catch (e) {
        console.error(e);
    }
};

module.exports = storeData;