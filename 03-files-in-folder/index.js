const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log('\nFiles:');
    files.forEach(file => {
      if (file.isFile()) {
        let fileName = file.name.split('.')[0];
        let fileExtention = (path.extname(file.name)).slice(1);

        fs.stat(path.join(folder, file.name), (error, stats) => {
          if (error) { 
            console.log(error); 
          } else {
            console.log(`${fileName} - ${fileExtention} - ${stats.size}b`);
          }
        });
      }
    });
  }
});

