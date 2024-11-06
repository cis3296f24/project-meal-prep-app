package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.email.*;
import dbUtils.*;

public class EmailView {

    public static StringDataList getAllEmails(DbConn dbc) {

        // sdl will have two properties, a DbError (initially set to "") and an empty array. 
        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        try {
            String sql = "SELECT web_user_id, user_email "
                    + "FROM web_user ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData email = new StringData();
                email.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                email.userEmail = Format.fmtString(results.getObject("user_email"));

                sdl.add(email);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in RoleView.allRolesAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}
