package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.models.Role;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.util.HashSet;
import java.util.Set;

public class UserDTO {
    private int id;

    @NotEmpty
    private String username;
    @Column
    @Positive
    @Max(value = 120)
    @NotNull
    private int age;
    @Email
    private String email;
    @Column
    @NotEmpty
    private String password;
    @Column
    @NotEmpty
    @Pattern(regexp = "^[a-zA-Z]+$")
    private String name;
    private Set<Role> roles = new HashSet<>();



    public UserDTO() {
    }


    public UserDTO(String username, String name, int age, String email, String password, Set<Role> roles) {
        this.username = username;
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        System.out.println(age);
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        System.out.println(id);
        this.id = id;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        System.out.println(roles);
        this.roles = roles;
    }


}