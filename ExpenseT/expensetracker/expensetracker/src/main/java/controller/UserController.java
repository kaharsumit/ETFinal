

package com.sumit.expensetracker.controller;

import com.sumit.expensetracker.repository.UserRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.sumit.expensetracker.entity.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class UserController {

    public static class LoginResponse {
        private Long id;
        private String name;

        public LoginResponse(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }
    }

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User user) {

        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());

        if (foundUser.isPresent()) {

            User existingUser = foundUser.get();

            if (existingUser.getPassword().equals(user.getPassword())) {
                return new LoginResponse(
                        existingUser.getId(),
                        existingUser.getName()
                );
            } else {
                return null;
            }

        } else {
            return null;
        }
    }
}