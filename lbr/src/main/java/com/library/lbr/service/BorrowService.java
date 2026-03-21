package com.library.lbr.service;

import com.library.lbr.entity.BorrowRecord;
import com.library.lbr.entity.BorrowRecord.Status;
import com.library.lbr.repository.BorrowRecordRepository;
import com.library.lbr.entity.Book;
import com.library.lbr.repository.BookRepository;
import com.library.lbr.entity.User;
import com.library.lbr.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BorrowService(BorrowRecordRepository borrowRecordRepository,
                         BookRepository bookRepository,
                         UserRepository userRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public BorrowRecord borrowBook(Long userId, Long bookId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book not available");
        }

        boolean alreadyBorrowed = borrowRecordRepository
                .existsByUserUserIdAndBookBookIdAndStatus(userId, bookId, Status.BORROWED);

        if (alreadyBorrowed) {
            throw new RuntimeException("User already borrowed this book");
        }

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        BorrowRecord record = new BorrowRecord();
        record.setUser(user);
        record.setBook(book);
        record.setBorrowDate(LocalDate.now());
        record.setDueDate(LocalDate.now().plusDays(7));
        record.setStatus(Status.BORROWED);

        return borrowRecordRepository.save(record);
    }

    public BorrowRecord returnBook(Long recordId) {

        BorrowRecord record = borrowRecordRepository.findById(recordId)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        if (record.getStatus() == Status.RETURNED) {
            throw new RuntimeException("Book already returned");
        }

        record.setStatus(Status.RETURNED);
        record.setReturnDate(LocalDate.now());

        Book book = record.getBook();
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);

        return borrowRecordRepository.save(record);
    }

    public List<BorrowRecord> getAllRecords() {
        return borrowRecordRepository.findAll();
    }

    public List<BorrowRecord> getUserHistory(Long userId) {
        return borrowRecordRepository.findByUserUserId(userId);
    }

    public List<BorrowRecord> getBookHistory(Long bookId) {
        return borrowRecordRepository.findByBookBookId(bookId);
    }

    public List<BorrowRecord> getActiveBorrows() {
        return borrowRecordRepository.findByStatus(Status.BORROWED);
    }
}