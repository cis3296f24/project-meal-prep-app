package model.webUser;

public class StringData {
    public String webUserId = ""; // auto-increment primary key
    public String userEmail = ""; // varChar 45, must be unique
    public String userPassword = ""; // varChar 45, required (length >=1)
    public String userPassword2 = ""; // not in DB, but in UI
    public String userImage = ""; // varChar 500, required (length >=1)
    public String birthday = ""; // type date, optional
    public String membershipFee = ""; // type decimal, optional
    public String userRoleId = ""; // foreign key (integer), required by DB
    public String userRoleType = ""; // varChar, joined from user_role table.

    public String errorMsg = ""; // not actually in the database, used by the app
                                 // to convey success or failure.

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    public int characterCount() {
        String s = this.webUserId + this.userEmail + this.userPassword +
                this.userPassword2 + this.userImage + this.birthday +
                this.membershipFee + this.userRoleId + this.userRoleType;
        return s.length();
    }

    // not required, can be useful for debugging, e.g.,
    // System.println(sdObj.toString());
    public String toString() {
        return "Web User Id:" + this.webUserId
                + ", User Email: " + this.userEmail
                + ", User Password: " + this.userPassword
                + ", User Password2: " + this.userPassword2
                + ", User Image: " + this.userImage
                + ", Birthday: " + this.birthday
                + ", Membership Fee: " + this.membershipFee
                + ", User Role Id: " + this.userRoleId
                + ", User Role Type: " + this.userRoleType;
    }
}
