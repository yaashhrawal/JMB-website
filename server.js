#!/usr/bin/env node
/**
 * Simple HTTP Server for JMB Udaipur Website
 * Alternative Node.js server implementation
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const HOST = 'localhost';

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    // Parse URL and remove query string
    let filePath = req.url.split('?')[0];
    
    // Default to index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Build full file path
    const fullPath = path.join(__dirname, filePath);
    
    // Get file extension
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    // Check if file exists
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Page Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #8B0000; }
                        a { color: #B8860B; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404 - Page Not Found</h1>
                    <p>The requested file <code>${filePath}</code> was not found.</p>
                    <p><a href="/">← Back to Homepage</a></p>
                </body>
                </html>
            `);
            return;
        }
        
        // Read and serve file
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Internal Server Error</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #8B0000; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - Internal Server Error</h1>
                        <p>Sorry, there was an error reading the file.</p>
                    </body>
                    </html>
                `);
                return;
            }
            
            // Set CORS headers for local development
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            
            // Serve file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Start server
server.listen(PORT, HOST, () => {
    const serverUrl = `http://${HOST}:${PORT}`;
    
    console.log('='.repeat(60));
    console.log('🍯 JMB UDAIPUR WEBSITE - LOCAL SERVER (Node.js)');
    console.log('='.repeat(60));
    console.log(`Server started at: ${serverUrl}`);
    console.log(`Serving directory: ${__dirname}`);
    console.log('='.repeat(60));
    console.log('📋 Available URLs:');
    console.log(`   🏠 Homepage: ${serverUrl}`);
    console.log(`   🛒 Direct file access: ${serverUrl}/index.html`);
    console.log('='.repeat(60));
    console.log('Press Ctrl+C to stop the server');
    console.log('='.repeat(60));
    
    // Try to open browser automatically
    const openCommand = process.platform === 'darwin' ? 'open' : 
                       process.platform === 'win32' ? 'start' : 'xdg-open';
    
    exec(`${openCommand} ${serverUrl}`, (error) => {
        if (error) {
            console.log(`⚠️  Could not auto-open browser: ${error.message}`);
            console.log(`Please manually open: ${serverUrl}`);
        } else {
            console.log('✅ Website opened in your default browser!');
        }
    });
    
    console.log('='.repeat(60));
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use!`);
        console.log(`Try a different port or kill the process using port ${PORT}`);
    } else {
        console.log(`❌ Server error: ${err.message}`);
    }
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Server stopped by user');
    process.exit(0);
});