package com.lucaoenterprise.podcastr.controller.www;

import com.lucaoenterprise.podcastr.model.db.UserModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Hello {
    @GetMapping(value = "/demo/hello")
    String henlo() {
        return "Hello";
    }

    @GetMapping(value = "/demo/json")
    Object json() {
        Map<String, String> s = new HashMap<>();
        s.put("nome", "Lucas");
        s.put("hello", "World");
        return s;
    }

    @GetMapping(value = "/demo/class")
    UserModel cls() {
        UserModel u = new UserModel();
        u.setId(1);
        u.setUsername("Jamelão");
        return u;
    }
}
