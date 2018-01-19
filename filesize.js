var express = require('express')
var app = express()

var path = require('path')
var multer  = require('multer')

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
    callback(null, './uploads')
  },
	filename: function(req, file, callback) { 
    callback(null, file.originalname.substring(0, file.originalname.indexOf('.')) + '_' + Date.now() + path.extname(file.originalname)) 
  }
});

var upload = multer({ 
  storage  : storage,
  limits   : { fileSize: 50 }      // Max file size <= 50 bytes
});


/*
app.post('/upload/file', function(req, res) {
  upload.post(req, res, function(result){
		res.end('File is uploaded' + JSON.stringify(result));
	});
});
*/

/*
app.post('/upload/file',function(req,res){
  upload2(req,res,function(err){
    if(err)
      throw err;
      return 
  });
  res.send("your post req reached server");
});
*/

//Possible Non-error End Point
app.post("/upload/file", upload.single('fileinput'), function(request,response){
  if(request.file ===  undefined){
    response.status(400).send("You didnot provide file");
  } else {
    console.log("File Details " + request.file);
    response.json({size: request.file.size});
  }
});

//Error Middleware
app.use("/upload/file",function(err,req,res,next){
  if(err.message === "File too large")
    res.send("File size is too large to upload");
  else
    next(err);
});


module.exports = app;