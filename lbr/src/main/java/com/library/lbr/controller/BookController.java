package com.library.lbr.controller;



import com.library.lbr.entity.Book;
import com.library.lbr.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;

    // POST /api/books - Add new book
    @PostMapping
    public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    // GET /api/books - Get all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    // GET /api/books/{id} - Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    // GET /api/books/search?keyword= - Search books
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(bookService.searchBooks(keyword));
    }

    // PUT /api/books/{id} - Update book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                           @Valid @RequestBody Book book) {
        return ResponseEntity.ok(bookService.updateBook(id, book));
    }

    // DELETE /api/books/{id} - Delete book
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok(Map.of("message", "Book deleted successfully"));
    }
}