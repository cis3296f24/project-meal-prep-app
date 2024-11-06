package model.formulaFile;
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
                                      
                                      
        // default constructor leaves all data members with empty string (Nothing null).
        public StringData() {
        }
    
        public int characterCount() {
            String s = this.formulaId + this.serviceType + this.serviceImg +
                    this.serviceDate + this.serviceCharge + this.formula +
                    this.webUserId + this.userEmail;
            return s.length();
        }
    
        // not required, can be useful for debugging, e.g.,
        // System.println(sdObj.toString());
        public String toString() {
            return "Formula Id:" + this.formulaId
                    + ", Service Type: " + this.serviceType
                    + ", Image: " + this.serviceImg
                    + ", Web User Id: " + this.webUserId
                    + ", Charge: " + this.serviceCharge
                    + ", User Image: " + this.formula
                    + ", Web User ID: " + this.webUserId 
                    + ", Email: " + this.userEmail;

                
        }
}