package dbUtils;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.math.BigDecimal;

/**
 * Collection of static methods that format various data types (all passed in as
 * objects). For each data type, there is a method that formats the data type
 * and an associated method that wraps that formatted data in an HTML <td> tag.
 */
public class Format {

    // DecimalFormat percentFormat = new DecimalFormat("%###.##");
    // Turns a date into a nicely formatted String.
    public static String fmtDate(Object obj) {
        if (obj == null) {
            return "";
        }
        try {
            java.util.Date dateval = (java.util.Date) obj;
            SimpleDateFormat dateformat = new SimpleDateFormat("MM/dd/yyyy");
            dateformat.setLenient(false);
            return dateformat.format(dateval);
        } catch (Exception e) {
            return "bad date in FormatUtils.formatDate: " + obj.toString() + ". Error: " + e.getMessage();
        }
    } // formatDate

    public static String fmtDollar(Object obj) {

        // null gets converted to empty string
        if (obj == null) {
            return "";
        }
        try {
            BigDecimal bd = (BigDecimal) obj;
            DecimalFormat intFormat = new DecimalFormat("$###,###,###,##0.00");
            return intFormat.format(bd);
        } catch (Exception e) {
            return "bad Dollar Amount in FormatUtils:" + obj.toString() + ". Error:" + e.getMessage();
        }
    } // formatDollar

    public static String fmtIntegerCommas(Object obj) {
        if (obj == null) {
            return "";
        }
        try {
            Integer ival = (Integer) obj;
            DecimalFormat intFormat = new DecimalFormat("###,###,###,##0");
            return intFormat.format(ival);
        } catch (Exception e) {
            return "bad Integer in FormatUtils:" + obj.toString() + ". Error:" + e.getMessage();
        }
    } // formatInteger

    // plainInteger returns integer converted to string with no commas.
    public static String fmtInteger(Object obj) {
        if (obj == null) {
            return "";
        }
        try {
            Integer ival = (Integer) obj;
            return ival.toString();
        } catch (Exception e) {
            return "bad Integer in FormatUtils:" + obj.toString() + ". Error:" + e.getMessage();
        }
    } // formatInteger

    // this is not really formatting, but just converting to string type.
    public static String fmtString(Object obj) {
        if (obj == null) {
            return "";
        }
        try {
            return (String) obj;
        } catch (Exception e) {
            return "bad String in FormatUtils:" + obj.toString() + ". Error:" + e.getMessage();
        }
    } // formatString

} // Format class