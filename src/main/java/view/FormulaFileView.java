package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.formulaFile.*;
import dbUtils.*;

public class FormulaFileView {

    public static StringDataList getAllUsers(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 

        sdl.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (sdl.dbError.length() > 0) {
            return sdl; // cannot proceed, db error (and that's been recorded in return object).
        }
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT formula_id, service_type, service_img, service_date, service_charge, formula, "
                    + "formula_file.web_user_id, user_email "
                    + "FROM formula_file, web_user where formula_file.web_user_id = web_user.web_user_id "
                    + "ORDER BY formula_id ";  // always order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the Format methods do not throw exceptions. If they find illegal data (like you 
                // tried to format a date as an integer), they return an error message (instead of 
                // returning the formatted value). So, you'll see these error messages right in the 
                // API output (JSON data) and/or you'll see it on the page in the UI.

                sd.formulaId = Format.fmtInteger(results.getObject("formula_id"));
                sd.serviceType = Format.fmtString(results.getObject("service_type"));
                sd.serviceImg = Format.fmtString(results.getObject("service_img"));
                sd.serviceDate = Format.fmtDate(results.getObject("service_date"));
                sd.serviceCharge = Format.fmtDollar(results.getObject("service_charge"));
                sd.formula = Format.fmtString(results.getObject("formula"));
                sd.webUserId = Format.fmtInteger(results.getObject("formula_file.web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in FormulaFileView.getAllUsers(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
