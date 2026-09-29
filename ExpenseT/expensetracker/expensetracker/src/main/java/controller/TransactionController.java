package com.sumit.expensetracker.controller;

import com.sumit.expensetracker.entity.Transaction;
import com.sumit.expensetracker.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class TransactionController {

    private TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @PostMapping("/transaction")
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @GetMapping("/transactions/{userId}")
    public List<Transaction> getTransactions(@PathVariable Long userId) {
        return transactionRepository.findByUserId(userId);
    }


    @DeleteMapping("/transaction/{id}/{userId}")
    public String deleteTransaction(
            @PathVariable Long id,
            @PathVariable Long userId) {

        Optional<Transaction> transaction =
                transactionRepository.findByIdAndUserId(id, userId);

        if (transaction.isPresent()) {
            transactionRepository.deleteById(id);
            return "Transaction deleted";
        }

        return "Transaction not found";
    }
}