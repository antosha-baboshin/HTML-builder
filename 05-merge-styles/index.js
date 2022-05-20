const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');

fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), (err, file) => {
  if (file) {
    if (err) throw err;
  }
});

fs.readdir(stylesFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (file.isFile() & path.extname(file.name) === '.css') {
        const input = fs.createReadStream(path.join(stylesFolder, file.name));
        let array = [];
        input.on('data', chunk => array.push(chunk.toString()));
        input.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), array.join(''), err => {
          if (err) throw err;
        }));        
      }
    });
  }
});
