package Controllers;

import Server.main;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.eclipse.jetty.server.Authentication;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
@Path("users")
public class UserTableController {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String readUT() {
        System.out.println("read");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT UserID, firstName, lastName, userName, Email, Password FROM UserTable");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("UserID", results.getInt(1));
                item.put("firstName", results.getString(2));
                item.put("lastName", results.getString(3 ));
                item.put("userName", results.getString(4));
                item.put("Email", results.getString(5));
                item.put("Password", results.getString(6));

                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("insert")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertGi(
            @FormDataParam("UserID") Integer UserID, @FormDataParam("firstName") String firstName, @FormDataParam("lastName") String lastName, @FormDataParam("userName") String userName, @FormDataParam("Email")String Email,@FormDataParam("Password")String Password) {
        try {
            if (UserID == null ||firstName == null || lastName == null || Email == null || Password == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("New user added" + UserID);

            PreparedStatement ps = main.db.prepareStatement("INSERT INTO UserTable (UserID,firstName,lastName,userName,Email,Password) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, UserID);
            ps.setString(2, firstName);
            ps.setString(3, lastName);
            ps.setString(4, userName);
            ps.setString(5, Email);
            ps.setString(6, Password);
            ps.execute();
            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to create new user, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("update")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateGI(
            @FormDataParam("UserID") Integer UserID, @FormDataParam("firstName") String firstName, @FormDataParam("lastName") String lastName, @FormDataParam("userName") String userName, @FormDataParam("Email")String Email,@FormDataParam("Password")String Password) {
        try {
            if (UserID == null ||firstName == null || lastName == null || Email == null || Password == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("user updated" + UserID);

            PreparedStatement ps = main.db.prepareStatement("INSERT INTO UserTable (UserID,firstName,lastName,userName,Email,Password) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, UserID);
            ps.setString(2, firstName);
            ps.setString(3, lastName);
            ps.setString(4, userName);
            ps.setString(5, Email);
            ps.setString(6, Password);
            ps.execute();
            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to update item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("delete")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteThing(@FormDataParam("UserID") Integer UserID) {

        try {
            if (UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("thing/delete id=" + UserID);

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM Things WHERE Id = ?");

            ps.setInt(1, UserID);

            ps.execute();

            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }

}
