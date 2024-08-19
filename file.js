const http = require('http');
const fs = require('fs');
const formidable = require('formidable');

http.createServer((req, res) => {
    if (req.url === '/upload' && req.method === 'POST') {
        const form = new formidable.IncomingForm();
        
        form.parse(req, (err, fields, files) => {
            const oldPath = files.file.filepath;
            const newPath = './' + files.file.originalFilename;
            
            fs.rename(oldPath, newPath, () => {
                res.write('File uploaded and saved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="/upload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="file"><br>');
        res.write('<input type="submit" value="Upload">');
        res.write('</form>');
        res.end();
    }
}).listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});
