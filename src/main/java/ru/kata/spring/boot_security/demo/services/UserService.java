package ru.kata.spring.boot_security.demo.services;

import org.springframework.data.jpa.repository.Query;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User findByUsername(String username);

    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u = :user")
    void saveUser(User user);

    List<User> getAllUsers();

    User showUserById(int id);

    void updateUserById(int id, User updateUser);

    void deleteUserById(int id);
    Optional<User> findById(int id);
}
