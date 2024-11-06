package com.geraghty_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import dbUtils.DbConn;
import dbUtils.Json;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import model.webUser.DbMods;
import model.webUser.StringData;
import model.webUser.StringDataList;
import view.WebUserView;


@RestController
public class WebUserController {

    @RequestMapping(value = "/webUser/getAll", produces = "application/json")
    public String allUsers() {

        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = WebUserView.getAllUsers(dbc);

        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).

        return Json.toJson(list); // convert sdl obj to JSON Format and return that.
    }

    @RequestMapping(value = "/webUser/getMisc", params = { "userEmail", "userPassword" }, produces = "application/json")
    public String getByMisc(
        HttpServletRequest request,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("userPassword") String userPassword) {

        HttpSession session = request.getSession();
        StringData sd = new StringData();

        if (userEmail == null) {
            sd.errorMsg = "Error: URL must be user/getById?userId=xx " + "where xx is the web_user_id of the desired web_user record.";
        } else {
            DbConn dbc = new DbConn();
            sd = DbMods.getMisc(dbc, userEmail, userPassword);
            try {
                session.setAttribute("loggedOnUser", sd); // write object to JSP session object
            } catch (Exception e) {
                System.out.println("webUser/getMisc controller error: " + e.getMessage());
                sd.errorMsg += ". " + e.getMessage();
            }
            dbc.close();
        }
        // Log whether sd object is null or not
        System.out.println("MG! sd object before returning: " + sd.toString());
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/session/read", produces = "application/json")
    public String readController(HttpServletRequest request) {
        HttpSession session = request.getSession();
        StringData sd = new StringData(); // Step 1: Instantiate a default StringData object

        try {
            sd = (StringData) session.getAttribute("loggedOnUser");
            if (sd != null) {
                System.out.println("Above data was read from the session");
            } else {
                sd = new StringData();
                sd.errorMsg = "Sorry but there is no web user in the session right now";
            }
        } catch (Exception e) {
            System.out.println("session/read controller error: " + e.getMessage());
            sd.errorMsg += ". " + e.getMessage();
        }

        // Step 3: Convert the StringData object to JSON and return it
        
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/session/invalidate", produces = "application/json")
    public String invalidateController(HttpServletRequest request) {
        HttpSession session = request.getSession();

        StringData sd = new StringData(); // all fields now set to ""

        try {
            session.invalidate();
            sd.errorMsg = "Session has been invalidated";
        } catch (Exception e) {
            System.out.println("session/invalidate controller error: " + e.getMessage());
            sd.errorMsg += ". " + e.getMessage();
        }

        return Json.toJson(sd);
    }

    @RequestMapping(value = "/webUser/insert", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No user data was provided in JSON format";
        } else {
            System.out.println("user data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("user data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // db connection OK
                    errorMsgs = DbMods.insert(insertData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.webUser.StringData obj: "+
                jsonInsertData+ " - or other error in controller for 'user/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }
    
    @RequestMapping(value = "/webUser/getById", params = {
            "userId" }, produces = "application/json")
    public String getById(@RequestParam("userId") String userId) {
        StringData sd = new StringData();
        if (userId == null) {
            sd.errorMsg = "Error: URL must be user/getById/xx " +
                    "where xx is the web_user_id of the desired web_user record.";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr();
            if (sd.errorMsg.length() == 0) {
                System.out.println("*** Ready to call DbMods.getById");
                sd = DbMods.getById(dbc, userId);
            }
            dbc.close(); // EVERY code path that opens a db connection must close it
            // (or else you have a database connection leak).
        }
        return Json.toJson(sd);
    }

    @RequestMapping(value = "/webUser/update", params = { "jsonData" }, produces = "application/json")
    public String update(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorData = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorData.errorMsg = "Cannot update. No user data was provided in JSON format";
        } else {
            System.out.println("user data for update (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData updateData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("user data for update (java obj): " + updateData.toString());

                // The next 3 statements handle their own exceptions (so should not throw any
                // exception).
                DbConn dbc = new DbConn();
                errorData = DbMods.update(updateData, dbc);
                dbc.close();
            } catch (Exception e) {
                String msg = "Unexpected error in controller for 'webUser/insert'... " +
                        e.getMessage();
                System.out.println(msg);
                errorData.errorMsg = msg;
            }
        }
        return Json.toJson(errorData);
    }




    


}

