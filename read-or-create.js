
var fs = require('fs');

fs.readFile('data.txt', 'utf-8', function (err, data) {

    if (err) {
        data = 'Hello world!';
        fs.writeFile('data.txt', data);
    }

    console.log(data);

});

