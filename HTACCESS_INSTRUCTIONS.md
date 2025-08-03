# .htaccess File Instructions for Hostinger

## The .htaccess File Location
The `.htaccess` file is in your upload-package folder but is **HIDDEN** because it starts with a dot.

## How to See Hidden Files:
- **Mac Finder**: Press `Cmd + Shift + .` (dot) to show hidden files
- **Windows Explorer**: Enable "Show hidden files" in View options
- **File Manager**: Look for ".htaccess" in the file list

## Two Ways to Upload .htaccess:

### Option 1: Upload the hidden .htaccess file
1. Make sure to show hidden files in your file browser
2. Upload the `.htaccess` file directly to `public_html/`

### Option 2: Use the visible copy (htaccess-file.txt)
1. Upload `htaccess-file.txt` to your Hostinger `public_html/` folder
2. In Hostinger File Manager, rename `htaccess-file.txt` to `.htaccess`

## .htaccess File Contents:
```apache
# JMB Udaipur Website - Hostinger Configuration
DirectoryIndex index.html

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
</IfModule>

# Error pages
ErrorDocument 404 /index.html
ErrorDocument 403 /index.html
```

## Why This Fixes 403 Errors:
- Sets proper DirectoryIndex
- Handles error pages correctly
- Ensures proper file access permissions
- Redirects errors to working pages

## Upload Priority:
**MOST IMPORTANT**: The `.htaccess` file must be in the root `public_html/` folder, not in a subfolder!