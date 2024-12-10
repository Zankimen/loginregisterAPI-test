const { registerUser, loginUser } = require('../services/authService');
const InputError = require('../exceptions/InputError');
const storeData = require('../services/storeData');
const crypto = require('crypto');

// Handler untuk registrasi
async function registerHandler(request, h) {
    const { name, email, password } = request.payload;

    if (!name || !email || !password) {
        throw new InputError('Name, email, and password are required');
    }

    const token = await registerUser(name, email, password);

    const response = h.response({           
        status: 'success',
        message: 'User registered successfully',
        data: { token },
    });
    response.type('application/json');
    response.code(201);
    return response;
}

// Handler untuk login
async function loginHandler(request, h) {
    const { email, password } = request.payload;

    if (!email || !password) {
        throw new InputError('Email and password are required');
    }

    const { token, name } = await loginUser(email, password);

    const response = h.response({
        status: 'success',
        message: 'Login successful',
        data: { token, name  },
    });
    response.code(200);
    return response;
}

module.exports = {registerHandler, loginHandler };
