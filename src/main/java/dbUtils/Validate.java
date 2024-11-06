package dbUtils;

public class Validate {

       /* Check string "val" to see if it has a valid java.sql.Date in it.
     * Return "" if the input is OK. Otherwise, return error message. */
    public static String dateMsg(String val, boolean required) {
        // System.out.println("*************trying to convert ["+val+"] to date");

        if (val == null) {
            return "Validate.dateMsg(): Programmer error - should not be trying to validate null.";
        }
        if ((val.length() == 0) && !required) {
            return "";  // Since this field is not required, empty string is valid user entry.
        }
        try {
            java.text.SimpleDateFormat dateformat = new java.text.SimpleDateFormat("MM/dd/yyyy"); //please notice the capital M
            dateformat.setLenient(false);
            java.util.Date myDate = dateformat.parse(val);
            java.sql.Date convertedDate = new java.sql.Date(myDate.getTime()); // // not using (on purpose).
            return ""; // means date is good
        } catch (Exception e) {
            return "Please enter a valid date (MM/DD/YYYY)";  // can also add (to debug) + e.getMessage();
        }
    } // dateMsg

    /* Convert "val" (String) to java.sql.Date and return the converted date. */
    public static java.sql.Date convertDate(String val) {

        if ((val == null) || (val.length() == 0)) {
            return null;
        }
        try {
            java.text.SimpleDateFormat dateformat = new java.text.SimpleDateFormat("MM/dd/yyyy"); //please notice the capital M
            dateformat.setLenient(false);
            java.util.Date myDate = dateformat.parse(val);
            return new java.sql.Date(myDate.getTime());
            //return d.toString(); // debugging...
        } catch (Exception e) {
            System.out.println("Validate.convertDate(): cannot convert " + val + " to date.");
            return null;
        }
    } // dateConversion()


    /* Check string "val" to see if it has a valid BigDecimal in it.
     * Return "" if the input is OK. Otherwise, return error message. */
    public static String decimalMsg(String val, boolean required) {

        if (val == null) {
            return "Validate.decimalMsg(): Programmer error - should not be trying to validate null.";
        }
        if ((val.length() == 0) && !required) {
            return "";  // Since this field is not required, empty string is valid user entry.
        }
        val = val.replace("$", ""); // removes $
        val = val.replace(",", ""); // removes ,
        try {
            java.math.BigDecimal convertedDecimal = new java.math.BigDecimal(val); // not using (on purpose).
            return "";
        } catch (Exception e) {
            return "Please enter a dollar amount";
        }
    } // decimalMsg()

    /* Convert "val" (String) to java.math.BigDecimal and return the converted BigDecimal. */
    public static java.math.BigDecimal convertDecimal(String val) {

        if ((val == null) || (val.length() == 0)) {
            return null;  // Since this field is not required, empty string is valid user entry.
        }
        val = val.replace("$", ""); // removes $
        val = val.replace(",", ""); // removes ,
        try {
            return new java.math.BigDecimal(val);
        } catch (Exception e) {
            System.out.println("Validate.convertDecimal(): cannot convert " + val + " to java.math.BigDecimal.");
            return null;
        }
    } // decimalMsg()
    
    /* Check string "val" to see if it has a valid integer in it.
     * Return "" if the input is OK. Otherwise, return error message. */
    public static String integerMsg(String val, boolean required) {
        if (val == null) {
            return "Validate.integerMsg(): Programmer error - should not be trying to validate null.";
        }
        if ((val.length() == 0) && !required) {
            return "";  // Since this field is not required, empty string is a valid user entry.
        }
        try {
            Integer convertedInteger = Integer.valueOf(val); // not using (on purpose).
            return "";
        } catch (Exception e) {
            return "Please enter an integer";
        }
    } // integerMsg()

    /* Convert "val" (String) to Integer and return the converted Integer. */
    public static Integer convertInteger(String val) {

        if ((val == null) || (val.length() == 0)) {
            return null;
        }
        try {
            return Integer.valueOf(val);
        } catch (Exception e) {
            System.out.println("Validate.convertInteger(): cannot convert " + val + " to Integer.");
            return null;
        }
    } // integerConversion()   

    /* Check string "val" to see if it meets the db constraints (e.g., not emtpy string 
     * if it is a required field, not longer than db allows). If OK, return "". 
     * Otherwise, return error message. */
    public static String stringMsg(String val, int maxlen, boolean required) {

        if (val == null) {
            return "Validate.stringMsg(): Programmer error - should not be trying to validate null.";
        }
        if (val.length() == 0) {
            if (required) {
                return "Input is required";
            } else {
                return ""; // Empty string OK if fld not req'd.
            }
        }

        if (val.length() > maxlen) {
            return "Please shorten to [" + val.substring(0, maxlen) + "]";
        } else {
            return ""; // input is good
        }
    }
    
}
