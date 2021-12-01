const express = require("express");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/myget", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.post("/mypost", (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let file = req.files.samplefile;
  let results = cloudinary.uploader.upload(file, {
    folder: "users",
  });

  details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  res.send(details);
});

app.get("/mygetform", (req, res) => {
  res.render("getform");
});

app.get("/mypostform", (req, res) => {
  res.render("postform");
});

app.listen(4000, () => {
  console.log("Server is running at 4000");
});
