package model.webUser;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.DbConn;
import dbUtils.Format;
import dbUtils.PrepStatement;
import dbUtils.Validate;


public class DbMods {

    public static StringData getMisc(DbConn dbc, String userEmail, String userPassword) {

        StringData sd = new StringData();
    
        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() > 0) { // cant proceed, database error
            return sd;
        }
         
        // fixed 3/14/24. before was trying to pass maxBirthday into convertDecimal

        String sUserEmail = Validate.stringMsg(userEmail, 15, true);
        if (sUserEmail == null) {
            sd.errorMsg += "Cannot get Misc user: error validating String.";
        }
    
        String sUserPassword = Validate.stringMsg(userPassword, 15, true);
        if (sUserPassword  == null) {
            sd.errorMsg += "Cannot get Misc password: error validating String.";
        }
        
        try {
            // Check if both values are not null to avoid NullPointerException when concatenating.
            if (userEmail != null && userPassword != null) {
                System.out.println("Email: " + userEmail + ", Password: " + userPassword);
            } else {
                // If either is null, you might want to handle that case explicitly, maybe print an error or a placeholder.
                if (userEmail == null) {
                    System.out.println("Minimum Membership Fee is null.");
                }
                if (userPassword == null) {
                    System.out.println("Maximum Birthday is null.");
                }
            }
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "
                    + "user_image, web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE user_email = ? "
                    + "AND user_password = ?";
 
 
                   
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setString(1, userEmail);
            stmt.setString(2, userPassword);
            
            

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sd.userPassword = Format.fmtString(results.getObject("user_password"));
                sd.userImage = Format.fmtString(results.getObject("user_image"));
                sd.birthday = Format.fmtDate(results.getObject("birthday"));
                sd.membershipFee = Format.fmtDollar(results.getObject("membership_fee"));
                sd.userRoleId = Format.fmtInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = Format.fmtString(results.getObject("user_role_type"));

            } else {
                sd.errorMsg = "Web User Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.webUser.DbMods.getById(): " + e.getMessage();
        }

        // you fill in the code.
        return sd;
    }

        /*
     * Returns a "StringData" object that is full of field level validation
     * error messages (or "" for any field that passes validation).
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /*
         * Useful to copy field names from StringData as a reference
         * public String webUserId = "";
         * public String userEmail = "";
         * public String userPassword = "";
         * public String userPassword2 = "";
         * public String userImage = "";
         * public String birthday = "";
         * public String membershipFee = "";
         * public String userRoleId = ""; // Foreign Key
         * public String userRoleType = ""; // joined from user_role table
         */
        // Validation
        errorMsgs.userEmail = Validate.stringMsg(inputData.userEmail, 45, true);
        errorMsgs.userPassword = Validate.stringMsg(inputData.userPassword, 45, true);

        if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
            errorMsgs.userPassword2 = "Both passwords must match";
        }

        errorMsgs.userImage = Validate.stringMsg(inputData.userImage, 300, false);

        errorMsgs.birthday = Validate.dateMsg(inputData.birthday, false);
        errorMsgs.membershipFee = Validate.decimalMsg(inputData.membershipFee, false);
        errorMsgs.userRoleId = Validate.integerMsg(inputData.userRoleId, true);

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
             * String sql =
             * "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
             * "web_user.user_role_id, user_role_type "+
             * "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
             * +
             * "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO web_user (user_email, user_password, user_image, membership_fee, birthday, " +
                    "user_role_id) values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.userEmail); // string type is simple
            pStatement.setString(2, inputData.userPassword);
            pStatement.setString(3, inputData.userImage);
            pStatement.setBigDecimal(4, Validate.convertDecimal(inputData.membershipFee));
            pStatement.setDate(5, Validate.convertDate(inputData.birthday));
            pStatement.setInt(6, Validate.convertInteger(inputData.userRoleId));

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
                errorMsgs.errorMsg = "Invalid User Role Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken - " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

        public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that webUserId has been supplied by the user...
        errorMsgs.webUserId = Validate.integerMsg(updateData.webUserId, true);

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

            String sql = "UPDATE web_user SET user_email = ?, user_password = ?, user_image = ?, "+
                    "membership_fee = ?, birthday = ?, user_role_id = ? WHERE web_user_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, updateData.userEmail); // string type is simple
            pStatement.setString(2, updateData.userPassword);
            pStatement.setString(3, updateData.userImage);
            pStatement.setBigDecimal(4, Validate.convertDecimal(updateData.membershipFee));
            pStatement.setDate(5, Validate.convertDate(updateData.birthday));
            pStatement.setInt(6, Validate.convertInteger(updateData.userRoleId));
            pStatement.setInt(7, Validate.convertInteger(updateData.webUserId));

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
                errorMsgs.errorMsg = "Invalid User Role Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken - " + errorMsgs.errorMsg;
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // This case already tested in the controller, but ("belt and suspenders")
        // we are double checking here as well.
        if (id == null) {
            sd.errorMsg = "Cannot getById (user): id is null";
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (user): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "
                    + "user_image, web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND web_user_id = ?";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sd.userPassword = Format.fmtString(results.getObject("user_password"));
                sd.userPassword2 = Format.fmtString(results.getObject("user_password"));
                sd.userImage = Format.fmtString(results.getObject("user_image"));
                sd.birthday = Format.fmtDate(results.getObject("birthday"));
                sd.membershipFee = Format.fmtDollar(results.getObject("membership_fee"));
                sd.userRoleId = Format.fmtInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = Format.fmtString(results.getObject("user_role_type"));

            } else {
                sd.errorMsg = "Web User Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.webUser.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById

} // class