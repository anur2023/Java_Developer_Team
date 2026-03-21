package com.library.lbr.repository;

import com.library.lbr.entity.BorrowRecord;
import com.library.lbr.entity.BorrowRecord.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUserUserId(Long userId);

    List<BorrowRecord> findByBookBookId(Long bookId);

    List<BorrowRecord> findByStatus(Status status);
}