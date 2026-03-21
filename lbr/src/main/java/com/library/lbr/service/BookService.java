package com.library.lbr.service;



import com.library.lbr.entity.Book;
import com.library.lbr.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Add new book
    public Book addBook(Book book) {
        if (bookRepository.findByIsbn(book.getIsbn()).isPresent()) {
            throw new RuntimeException("Book with ISBN " + book.getIsbn() + " already exists");
        }
        return bookRepository.save(book);
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get book by ID
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + id));
    }

    // Search books by keyword (title or author)
    public List<Book> searchBooks(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return bookRepository.findAll();
        }
        return bookRepository.searchBooks(keyword.trim());
    }

    // Update book
    public Book updateBook(Long id, Book updatedBook) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + id));

        // Check ISBN conflict with other books
        Optional<Book> existingIsbn = bookRepository.findByIsbn(updatedBook.getIsbn());
        if (existingIsbn.isPresent() && !existingIsbn.get().getId().equals(id)) {
            throw new RuntimeException("ISBN already used by another book");
        }

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setIsbn(updatedBook.getIsbn());
        book.setQuantity(updatedBook.getQuantity());

        return bookRepository.save(book);
    }

    // Delete book
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with ID: " + id);
        }
        bookRepository.deleteById(id);
    }
}