import Book from "../models/bookModels.js";

//create
const create = async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.content ||
        !req.body.pages ||
        !req.body.author
      ) {
        return res.status(400).json({
          status: "Gagal",
          message: "Title, content, pages, and author are required.",
        });
      }
  
      const newBook = await Book.create(req.body);
  
      res.status(201).json({
        status: "Success",
        data: newBook,
      });
    } catch (error) {
      res.status(400).json({
        status: "Gagal",
        message: error.message,
      });
    }
  };

  // Get
  const index = async (req, res) => {
    try {
      const book = await Book.find();
      res.json({
        status: "success",
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        status: "Gagal",
        message: error.message,
      });
    }
  };
  
  //Get ID
  const indexID = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book)
        return res.status(404).json({
          status: "fail",
          message: "Book not found",
        });
  
      res.json({
        status: "success",
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        status: "Gagal",
        message: error.message,
      });
    }
  };

  // Update
  const update = async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!book)
        return res.status(404).json({
          status: "fail",
          message: "Book not found",
        });
  
      res.json({
        status: "success",
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        status: "Gagal",
        message: error.message,
      });
    }
  };

  const destroy = async (req, res) => {
    try {
      const hapus = await Book.findByIdAndDelete(req.params.id);
      if (!hapus)
        return res.status(404).json({
          status: "fail",
          message: "Book not found",
        });
  
      res.json({
        status: "Content Terhapus",
        data: hapus,
      });
    } catch (error) {
      res.status(400).json({
        status: "Gagal",
        message: error.message,
      });
    }
  };


  const getAllBooksPage = async (req, res) => {
    try {
      const books = await Book.find(); // Mengambil semua buku dari database
      res.render("dashboard", { user: req.user, books }); // Kirim data buku ke halaman EJS
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };

  

export { create, index, indexID, update, destroy, getAllBooksPage};
