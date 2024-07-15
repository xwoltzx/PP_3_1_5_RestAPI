package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private PasswordEncoder passwordEncoder;


    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    public User findByUsername(String username) {
        System.out.println("lox" + username);
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(int id) { return userRepository.findById(id);}


    @Transactional
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getRoles() + "!!!!!!!!!!!!!!!!!1");
        user.setRoles(user.getRoles());
        userRepository.save(user);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User showUserById(int id) {
        Optional<User> userById = userRepository.findById(id);
        return userById.orElse(null);
    }


    @Transactional
    public void updateUserById(int id, User updateUser) {
        updateUser.setId(id);
        updateUser.setRoles(updateUser.getRoles());
        System.out.println(updateUser);
        updateUser.setPassword(passwordEncoder.encode(updateUser.getPassword()));
        userRepository.save(updateUser);
    }

    @Transactional
    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
}