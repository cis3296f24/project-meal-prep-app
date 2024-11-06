package model.formulaFile;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.DbConn;
import dbUtils.Format;
import dbUtils.PrepStatement;
import dbUtils.Validate;

public class DbMods {
    /*
     * Returns a "StringData" object that is full of field level validation
     * error messages (or "" for any field that passes validation).
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*
        public class StringData {
            public String formulaId = "";     // auto-increment primary key
            public String serviceType = "";     // varChar 45, must be unique
            public String serviceImg = "";  // varChar 45, required (length >=1)
            public String serviceDate = "";     // varChar 500, required (length >=1)
            public String serviceCharge = "";      // type date, optional
            public String formula = ""; // type decimal, optional
            public String webUserId = "";    // foreign key (integer), required by DB
            public String userEmail = "";  // varChar, joined from user_role table.

            public String errorMsg = "";      // not actually in the database, used by the app 
                                            // to convey success or failure.    
        }
         */
        // Validation
        errorMsgs.serviceType = Validate.stringMsg(inputData.serviceType, 45, true);
        errorMsgs.serviceImg = Validate.stringMsg(inputData.serviceImg, 200, false);
        errorMsgs.formula = Validate.stringMsg(inputData.formula, 200, false);
  
        errorMsgs.formulaId = Validate.integerMsg(inputData.formulaId, false);
        errorMsgs.webUserId = Validate.integerMsg(inputData.webUserId, true);

        errorMsgs.serviceDate = Validate.dateMsg(inputData.serviceDate, false);
        errorMsgs.serviceCharge = Validate.decimalMsg(inputData.serviceCharge, false);

        
        

        return errorMsgs;
    } // validate

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
            String sql = "SELECT formula_id, service_type, service_img, service_date, service_charge, formula, "
                    + "formula_file.web_user_id, user_email "
                    + "FROM formula_file, web_user where formula_file.web_user_id = web_user.web_user_id "
                    + "ORDER BY formula_id ";  // always order by something, not just random order.
             */


            String sql = "INSERT INTO formula_file (service_type, service_img, service_date, service_charge, formula, "
            + "formula_file.web_user_id) values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.serviceType); // string type is simple
            pStatement.setString(2, inputData.serviceImg);
            pStatement.setDate(3, Validate.convertDate(inputData.serviceDate));
            pStatement.setBigDecimal(4, Validate.convertDecimal(inputData.serviceCharge));
            pStatement.setString(5, inputData.formula);
            pStatement.setInt(6, Validate.convertInteger(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Formula Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That service type is already taken - " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

        public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that formulaId has been supplied by the user...
        errorMsgs.webUserId = Validate.integerMsg(updateData.formulaId, true);

        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /* Useful to know the exact field names in the database... 
             * String sql =
             * "SELECT web_user_id, user_email, user_password, user_image, membership_fee, "
             * "birthday, web_user.user_role_id, user_role_type "+
             * "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
             * "ORDER BY web_user_id ";
             */

            String sql = "UPDATE formula_file SET service_type = ?, service_img = ?, service_date = ?, "
                        + "service_charge = ?,formula = ?, web_user_id = ? WHERE formula_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, updateData.serviceType); // string type is simple
            pStatement.setString(2, updateData.serviceImg);
            pStatement.setDate(3, Validate.convertDate(updateData.serviceDate));
            pStatement.setBigDecimal(4, Validate.convertDecimal(updateData.serviceCharge));
            pStatement.setString(5, updateData.formula);
            pStatement.setInt(6, Validate.convertInteger(updateData.webUserId));
            pStatement.setInt(7, Validate.convertInteger(updateData.formulaId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update OR the web User id (supplied by the client side) does not exist.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "Already taken - " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

        public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // This case already tested in the controller, but ("belt and suspenders")
        // we are double checking here as well.
        if (id == null) {
            sd.errorMsg = "Cannot getById (formula): id is null";
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (formula): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
        try {


            String sql = "SELECT formula_id, service_type, service_img, service_date, service_charge, formula, "
                    + "formula_file.web_user_id, user_email "
                    + "FROM formula_file, web_user WHERE formula_file.web_user_id = web_user.web_user_id "
                    + "AND formula_id = ?";


            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.formulaId= Format.fmtInteger(results.getObject("formula_id"));
                sd.serviceType = Format.fmtString(results.getObject("service_type"));
                sd.serviceImg = Format.fmtString(results.getObject("service_img"));
                sd.serviceDate = Format.fmtDate(results.getObject("service_date"));
                sd.serviceCharge = Format.fmtDollar(results.getObject("service_charge"));
                sd.formula = Format.fmtString(results.getObject("formula"));
                sd.webUserId = Format.fmtInteger(results.getObject("formula_file.web_user_id "));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
 

            } else {
                sd.errorMsg = "Formula File Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.formulaFile.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById

}
