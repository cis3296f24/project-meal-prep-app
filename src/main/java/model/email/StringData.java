package model.email;

/* The purpose of this class is just to "bundle together" all the 
 * data associated with a single role record in the database.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We provide free and easy access to
 * put in or take out the data fields.  */

public class StringData {

    public String webUserId = ""; // Primary Key
    public String userEmail = "";

    public String errorMsg = "";

    public String toString() {
        return "userRoleId: " + this.webUserId
                + ", userRoleType: " + this.userEmail;
    }

}