const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
const port = process.env.PORT || 3000;
app.use("/static", express.static("public"));

const mergePdfs = require("./pdfmerge");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async function (req, res, next) {
  // console.log(req.files);
  let d = await mergePdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  //   res.send({ data: req.files });
  // res.redirect(`http://localhost:3000/static/${d}.pdf`);
  res.redirect(`https://pdfmerger.up.railway.app/static/${d}.pdf`);
});
app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
