package ru.kata.spring.boot_security.demo.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/admin/")
public class AdminController {
    private final RoleRepository roleRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;


    @Autowired
    public AdminController(RoleRepository roleRepository, UserService userService, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/api")
    public ResponseEntity<List<User>> index(Principal principal) {
        ArrayList<User> users = new ArrayList<>(userService.getAllUsers());
        users.add(userService.findByUsername(principal.getName()));
        for(User user : users) {
            System.out.println(user);
        }
        return ResponseEntity.ok(users);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable("id") int id) {
        System.out.println(id);
        return ResponseEntity.ok(userService.findById(id));
    }


    //todo dto
    @PostMapping("/new")
    public ResponseEntity<HttpStatus> create(@Valid @RequestBody UserDTO user, BindingResult result) {
        System.out.println("1f alkfajkasd" + user);
        if (result.hasErrors()) {
            System.out.println(result);
            return ResponseEntity.ok(HttpStatus.BAD_GATEWAY);
        }
        System.out.println(modelMapper.map(user, User.class));
        userService.saveUser(modelMapper.map(user, User.class));
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @PostMapping("/edit")
    public ResponseEntity<HttpStatus> update(@Valid @RequestBody UserDTO user, BindingResult result) {
        if (result.hasErrors()) {
            System.out.println(result);
            return ResponseEntity.ok(HttpStatus.BAD_GATEWAY);
        }
        System.out.println(modelMapper.map(user, User.class));
        userService.updateUserById(user.getId(), modelMapper.map(user, User.class));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
