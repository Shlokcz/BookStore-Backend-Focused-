const express = require("express");
const PORT = 5000;
require("./db/config");
const Books = require("./db/Books.js");
const cors = require("cors");

const app = express();

app.use(express.json()); /*Converts that string data coming from req.body
                            to JSON format so that the machine can understand it.*/
app.use(cors());

//Finding each and every book inside a databse
app.get("/", async (req, res) => {
  // res.send("Hi Shlok!");
  let data = await Books.find({});
  if (data.length > 0) {
    res.send(data);
    // res.send({count:data.length, data: data});
  } else {
    res.send({ data: "No Books found" });
  }
});

//Adding new books inside a database
app.post("/add", async (req, res) => {
  const time = new Date();
  let book = new Books(req.body);
  book.createTime = time;
  book.updateTime = time;
  console.log(book.createTime);
  let result = await book.save();
  console.log(book);
  res.send(result);
});

//Filtering a Single book with an ID
app.get("/book/:id", async (req, res) => {
  let book = await Books.findOne({ _id: req.params.id });
  res.send(book);
});

app.put("/update/:id", async (req, res) => {
  try {
    // if(!req.body.title || !req.body.author || !req.body.year){
    //     return res.status(400).send({message: "Please give all required fields"});
    // }
    const time = new Date();
    let updatedData = req.body;
    updatedData.updateTime = time;
    let book = await Books.updateOne(
      { _id: req.params.id },
      { $set: updatedData }
    );
    console.log(req.body);
    // console.log(time);
    // console.log(book.updateTime);
    if (book.modifiedCount > 0) {
      res.send({ message: "Book updated succesfully" });
    } else {
      res.send({ message: "books are as it is" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let book = await Books.deleteOne({ _id: req.params.id });
    if (book.acknowledged) {
      res.send({
        message: "Deletion successful",
        acknowledged: book.acknowledged,
      });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
