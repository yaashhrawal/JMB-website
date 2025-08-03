#!/usr/bin/env python3
"""
Simple HTTP Server for JMB Udaipur Website
Run this script to serve the website locally
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files with proper MIME types"""
    
    def end_headers(self):
        # Enable CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Change to the website directory
    os.chdir(script_dir)
    
    # Create server
    Handler = CustomHTTPRequestHandler
    
    try:
        with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
            server_url = f"http://{HOST}:{PORT}"
            print("=" * 60)
            print("🍯 JMB UDAIPUR WEBSITE - LOCAL SERVER")
            print("=" * 60)
            print(f"Server started at: {server_url}")
            print(f"Serving directory: {script_dir}")
            print("=" * 60)
            print("📋 Available URLs:")
            print(f"   🏠 Homepage: {server_url}")
            print(f"   🛒 Direct file access: {server_url}/index.html")
            print("=" * 60)
            print("Press Ctrl+C to stop the server")
            print("=" * 60)
            
            # Try to open the browser automatically
            try:
                webbrowser.open(server_url)
                print("✅ Website opened in your default browser!")
            except Exception as e:
                print(f"⚠️  Could not auto-open browser: {e}")
                print(f"Please manually open: {server_url}")
            
            print("=" * 60)
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print(f"Try a different port or kill the process using port {PORT}")
        else:
            print(f"❌ Server error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()