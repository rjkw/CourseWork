package Controllers;

import Server.main;
import com.sun.jersey.multipart.FormDataParam;
import org.eclipse.jetty.server.Authentication;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserTableController {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String readUT() {
        System.out.println("read");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT UserID, FirstName, LastName, UserName, Email, Password FROM UserTable");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("UserID", results.getInt(1));
                item.put("FirstName"), results.getString(2);
                item.put("LastName"), results.getString(3 );
                item.put("UserName"), results.getString(4);
                item.put("Email"), results.getString(5);
                item.put("Password"), results.getString(6);

                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    public static void insetUT (int UserId,String FirstName, String LastName, String UserName, String Email,String Password) { // This allows me to insert into the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "INSERT INTO UserTable (UserID,FirstName,LastName,UserName,Email,Password) VALUES (?, ?, ?,?,?,?)");

            ps.setInt(1, UserId);
            ps.setString(2, FirstName);
            ps.setString(3, LastName);
            ps.setString(4, UserName);
            ps.setString(5, Email);
            ps.setString(6, Password);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void updateUT
            (int UserId,String FirstName, String LastName, String UserName, String Email,String Password) { // This allows me to  words from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("UPDATE UserTable SET FirstName = ?, LastName  = ?,UserName = ?, Email = ?, Password = ? WHERE UserID = ?");

            ps.setString(2, FirstName);
            ps.setString(3, LastName);
            ps.setString(4, UserName);
            ps.setString(5, Email);
            ps.setString(6, Password);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void deleteUT(int UserId) { // This allows me to delete  from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM UserTable WHERE UserId = ?");

            ps.setInt(1, UserId);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}
