const fs = require('fs');
const path = require('path');

const srcProfile = 'C:/Users/USMAN/.gemini/antigravity/brain/e545f0b1-5f1f-4afb-9ab9-60d16495eaa2/profile_photo_1781896967189.png';
const srcCert = 'C:/Users/USMAN/.gemini/antigravity/brain/e545f0b1-5f1f-4afb-9ab9-60d16495eaa2/certificate_placeholder_1781896982141.png';

// Create directories
if (!fs.existsSync('certificates')) {
    fs.mkdirSync('certificates');
}
if (!fs.existsSync('achievements')) {
    fs.mkdirSync('achievements');
}

try {
    // Copy files
    fs.copyFileSync(srcProfile, 'profile.jpg');
    fs.copyFileSync(srcCert, 'certificates/excel2025.jpg');
    fs.copyFileSync(srcCert, 'certificates/tally2025.jpg');
    fs.copyFileSync(srcCert, 'certificates/dca2024.jpg');
    fs.copyFileSync(srcCert, 'certificates/olevel2026.jpg');
    fs.copyFileSync(srcCert, 'certificates/ccc2026.jpg');
    console.log('All placeholder assets copied successfully!');
} catch (err) {
    console.error('Error copying assets:', err.message);
}
