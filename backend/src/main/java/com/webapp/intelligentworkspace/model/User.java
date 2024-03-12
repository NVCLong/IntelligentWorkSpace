package com.webapp.intelligentworkspace.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String numberPhone;

}