package com.geraghty_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dbUtils.*;
import model.role.*;
import view.RoleView;

@RestController
public class RoleController {

    @RequestMapping(value = "/role/getAll", produces = "application/json")
    public String allRoles() {
        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = RoleView.getAllRoles(dbc);
        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).
        return Json.toJson(list);
    }
}
