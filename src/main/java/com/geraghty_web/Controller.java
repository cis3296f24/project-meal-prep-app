package com.geraghty_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.webUser.StringData;

@RestController
public class Controller {

    @RequestMapping("/hello")
    public String helloController() {
        return "<h1>Hello World</h1>";
    }

    //added to controller for Web API connection 
    @RequestMapping(value="/jsonClass", produces="application/json")
    public String jsonClassController () {
        StringData sd = new StringData();
        sd.userEmail = "tup13771@temple.edu";
        sd.userPassword = "chuib3Ma";
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writer().writeValueAsString(sd);
        } catch (Exception e) {
            return "Cannot convert object to JSON";
        }
    }

}
