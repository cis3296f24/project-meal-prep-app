package model.role;

import java.util.ArrayList;

// This class holds a possible database error message followed by an array of objects 
// (each object being a single row in a result set extracted from a database). 

public class StringDataList {

    public String dbError = "";
    public ArrayList <StringData> roleList = new ArrayList <StringData>();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataList() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringData stringData) {
        this.roleList.add(stringData);
    }
}
