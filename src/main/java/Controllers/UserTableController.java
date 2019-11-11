package Controllers;

import Server.main;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.eclipse.jetty.server.Authentication;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import java.util.UUID;
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
           @FormDataParam("firstName") String firstName, @FormDataParam("lastName") String lastName, @FormDataParam("userName") String userName, @FormDataParam("Email")String Email,@FormDataParam("Password")String Password) {
        try {
            if (firstName == null || lastName == null || Email == null || Password == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("New user added" + userName);

            PreparedStatement ps = main.db.prepareStatement("INSERT INTO UserTable (firstName,lastName,userName,Email,Password) VALUES (?, ?, ?, ?, ?)");
            ps.setString(1, firstName);
            ps.setString(2, lastName);
            ps.setString(3, userName);
            ps.setString(4, Email);
            ps.setString(5, Password);
            ps.execute();
            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to create new user, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("changepass")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String changepass( @FormDataParam("UserID") Integer UserID, @FormDataParam("password") String Password) {
        try {
            if (UserID == null || Password == null ) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("user updated at UserID =" + UserID);

            PreparedStatement ps = main.db.prepareStatement("UPDATE UserTable SET Password = ? WHERE UserID = ?");
            ps.setString(1, Password);
            ps.setInt(2, UserID);

            ps.executeUpdate();
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
    public String deleteUser(@FormDataParam("UserID") Integer UserID) {

        try {
            if (UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("User deleted. UserId =" + UserID);

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM UserTable WHERE UserID = ?");

            ps.setInt(1, UserID);

            ps.execute();

            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("login")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String attemptLogin(@FormDataParam("username") String userName,
                               @FormDataParam("password") String Password) {

        try {

            if (userName == null ||
                    Password == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }

            System.out.println("/user/login - Attempt by " + userName);

            PreparedStatement statement1 = main.db.prepareStatement(
                    "SELECT userName, Password, sessionToken FROM UserTable WHERE userName = ?"
            );
            statement1.setString(1, userName.toLowerCase());
            ResultSet results = statement1.executeQuery();

            if (results != null && results.next()) {
                if (!Password.equals(results.getString("Password"))) {
                    return "{\"error\": \"Incorrect password\"}";
                }

                String token = UUID.randomUUID().toString();
                PreparedStatement statement2 = main.db.prepareStatement(
                        "UPDATE UserTable SET SessionToken = ? WHERE LOWER(userName) = ?"
                );
                statement2.setString(1, token);
                statement2.setString(2, userName.toLowerCase());
                statement2.executeUpdate();
                return "{\"token\": \"" + token + "\"}";

            } else {
                return "{\"error\": \"Can't find user account.\"}";
            }

        } catch (Exception resultsException) {
            String error = "Database error - can't process login: " + resultsException.getMessage();
            System.out.println(error);
            return "{\"error\": \"" + error + "\"}";
        }

    }
    @POST
    @Path("logout")
    public void logout(@CookieParam("sessionToken") String token) {

        System.out.println("/admin/logout - Logging out user: ");

        try {
            PreparedStatement statement = main.db.prepareStatement("Update UserTable SET sessionToken = NULL WHERE sessionToken = ?");
            statement.setString(1, token);
            statement.executeUpdate();
        } catch (Exception resultsException) {
            String error = "Database error - can't update 'Admins' table: " + resultsException.getMessage();
            System.out.println(error);
        }

    }
}



