package com.library.lbr.controller;


import com.library.lbr.entity.BorrowRecord;
import com.library.lbr.service.BorrowService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/borrow")
    public BorrowRecord borrowBook(@RequestParam Long userId,
                                   @RequestParam Long bookId) {
        return borrowService.borrowBook(userId, bookId);
    }

    @PostMapping("/return")
    public BorrowRecord returnBook(@RequestParam Long recordId) {
        return borrowService.returnBook(recordId);
    }

    @GetMapping("/borrow-records")
    public List<BorrowRecord> getAllRecords() {
        return borrowService.getAllRecords();
    }

    @GetMapping("/borrow-records/user/{userId}")
    public List<BorrowRecord> getUserHistory(@PathVariable Long userId) {
        return borrowService.getUserHistory(userId);
    }

    @GetMapping("/borrow-records/book/{bookId}")
    public List<BorrowRecord> getBookHistory(@PathVariable Long bookId) {
        return borrowService.getBookHistory(bookId);
    }

    @GetMapping("/borrow-records/active")
    public List<BorrowRecord> getActiveBorrows() {
        return borrowService.getActiveBorrows();
    }
}