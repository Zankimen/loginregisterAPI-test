const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../exceptions/InputError');

const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.STORAGE_ACCESS_KEY,
});

async function registerUser(name, email, password) {
    const userCollection = db.collection('users');

    // Cek apakah email sudah terdaftar
    const userDoc = await userCollection.where('email', '==', email).get();
    if (!userDoc.empty) {
        throw new InputError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat token dengan mengenkripsi email
    const token = crypto.createHash('sha256').update(email).digest('hex');

    // Simpan ke Firestore
    await userCollection.add({ name, email, password: hashedPassword, token });

    return token;
}

async function loginUser(email, password) {
    const userCollection = db.collection('users');

    // Cari user berdasarkan email
    const userSnapshot = await userCollection.where('email', '==', email).get();
    if (userSnapshot.empty) {
        throw new InputError('Invalid email or password');
    }

    const user = userSnapshot.docs[0].data();

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new InputError('Invalid email or password');
    }

    return user.token; // Kembalikan token
}

module.exports = { registerUser, loginUser };
