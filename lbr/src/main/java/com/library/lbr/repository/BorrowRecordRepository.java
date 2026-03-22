package com.library.lbr.repository;

import com.library.lbr.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

    // BorrowRecord.user.id  →  user field is User object, id is its PK
    List<BorrowRecord> findByUser_Id(Long userId);

    // BorrowRecord.book.id  →  book field is Book object, id is its PK
    List<BorrowRecord> findByBook_Id(Long bookId);

    List<BorrowRecord> findByStatus(BorrowRecord.Status status);

    // Find active borrow record for return flow
    Optional<BorrowRecord> findByUser_IdAndBook_IdAndStatus(
            Long userId, Long bookId, BorrowRecord.Status status);

    // Check if user already has this book borrowed
    boolean existsByUser_IdAndBook_IdAndStatus(
            Long userId, Long bookId, BorrowRecord.Status status);
}