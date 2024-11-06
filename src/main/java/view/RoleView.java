package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.role.*;
import dbUtils.*;

public class RoleView {

    public static StringDataList getAllRoles(DbConn dbc) {

        // sdl will have two properties, a DbError (initially set to "") and an empty array. 
        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        try {
            String sql = "SELECT user_role_id, user_role_type "
                    + "FROM user_role ORDER BY user_role_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData role = new StringData();
                role.userRoleId = Format.fmtInteger(results.getObject("user_role_id"));
                role.userRoleType = Format.fmtString(results.getObject("user_role_type"));

                sdl.add(role);
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
