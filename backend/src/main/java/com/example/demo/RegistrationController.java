package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public String registerUser(@RequestBody Registration data) {
        User user = new User();
        user.setName(data.getName());
        user.setEmail(data.getEmail());
        user.setPhone(data.getPhone());
        user.setAddress(data.getAddress());
        user.setPassword(data.getPassword());

        registrationService.register(user);
        return "User registered successfully!";
    }
}
