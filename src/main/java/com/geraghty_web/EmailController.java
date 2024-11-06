package com.geraghty_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dbUtils.*;
import model.email.*;
import view.EmailView;

@RestController
public class EmailController {

    @RequestMapping(value = "/email/getAll", produces = "application/json")
    public String allEmails() {
        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = EmailView.getAllEmails(dbc);
        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).
        return Json.toJson(list);
    }

}
