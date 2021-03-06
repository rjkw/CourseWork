package Controllers;



import Server.main;
import jdk.jshell.Snippet;
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
        System.out.println("Printing users");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT UserID, firstName, lastName, userName, Email,Password,userType FROM UserTable");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("UserID", results.getInt(1));
                item.put("firstName", results.getString(2));
                item.put("lastName", results.getString(3));
                item.put("userName", results.getString(4));
                item.put("Email", results.getString(5));
                item.put("Password", results.getString(6));
                item.put("userType", results.getString(7));

                list.add(item);
            }
            return list.toString();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("update")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateUser(
            @FormDataParam("UserID") Integer UserID,
            @FormDataParam("firstName") String firstName,
            @FormDataParam("lastName") String lastName,
            @FormDataParam("userName") String userName,
            @FormDataParam("Email") String Email,
            @FormDataParam("Password") String Password) {
        try {
            if (UserID == null || firstName == null || lastName == null || userName == null || Email == null || Password == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");

            }
            System.out.println("User Updated at UserID: " + UserID);

            PreparedStatement ps = main.db.prepareStatement("UPDATE UserTable SET firstName = ?,lastName = ?,userName = ?,Email = ?, Password = ?  WHERE UserID = ?");
            ps.setString(1, firstName);
            ps.setString(2, lastName);
            ps.setString(3, userName);
            ps.setString(4, Email);
            ps.setString(5, Password);
            ps.setInt(6, UserID);

            ps.execute();
            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to update item, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("emails")
    @Produces(MediaType.APPLICATION_JSON)
    public String listemails() {
        System.out.println("List of all emails");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT Email FROM UserTable");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("Email", results.getString(1));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("userName/{UserID}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUserName(@PathParam("UserID") Integer UserID){
        System.out.println("Username Associated with this UserID - " + UserID);
        JSONObject item = new JSONObject();
        try {
            if (UserID == null) {
                throw new Exception("WordID does not match any existing WordID");
            }
            PreparedStatement ps = main.db.prepareStatement("SELECT userName FROM UserTable WHERE UserID = ?");
            ps.setInt(1, UserID);
            ResultSet results = ps.executeQuery();

            if (results.next()) {
                item.put("userName", results.getString(1));
            }
            return item.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("User/{UserID}")
    @Produces(MediaType.APPLICATION_JSON)
    public String GetUser(@PathParam("UserID") Integer UserID){
        System.out.println("User Associated with this UserID - " + UserID);
        JSONObject item = new JSONObject();
        try {
            if (UserID == null) {
                throw new Exception("UserID does not match any existing UserID");
            }
            PreparedStatement ps = main.db.prepareStatement("SELECT firstName,lastName,userName,Email,Password FROM UserTable WHERE UserID = ?");
            ps.setInt(1, UserID);
            ResultSet results = ps.executeQuery();

            if (results.next()) {
                item.put("firstName", results.getString(1));
                item.put("lastName", results.getString(2));
                item.put("userName", results.getString(3));
                item.put("Email", results.getString(4));
                item.put("Password", results.getString(5));

            }
            return item.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }


    @GET
    @Path("UserID/{sessionToken}")
    @Produces(MediaType.APPLICATION_JSON)
    public String sessionTokenUserID(@PathParam("sessionToken") String sessionToken){
        System.out.println("See console - UserID Associated with this sessionToken: " + sessionToken);
        JSONObject item = new JSONObject();
        try {
            if (sessionToken == null) {
                throw new Exception("Session Token is not valid.");
            }
            PreparedStatement ps = main.db.prepareStatement("SELECT UserID FROM UserTable WHERE SessionToken = ?");
            ps.setString(1, sessionToken);
            ResultSet results = ps.executeQuery();

            if (results.next()) {
                item.put("UserID", results.getInt(1));
            }
            return item.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("UserName/{sessionToken}")
    @Produces(MediaType.APPLICATION_JSON)
    public String sessionTokenUserName(@PathParam("sessionToken") String sessionToken){
        System.out.println("See console - Username Associated with this sessionToken: " + sessionToken);
        JSONObject item = new JSONObject();
        try {
            if (sessionToken == null) {
                throw new Exception("Session Token is not valid.");
            }
            PreparedStatement ps = main.db.prepareStatement("SELECT userName FROM UserTable WHERE SessionToken = ?");
            ps.setString(1, sessionToken);
            ResultSet results = ps.executeQuery();

            if (results.next()) {
                item.put("userName", results.getString(1));
            }
            return item.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("create")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertGi(
            @FormDataParam("firstName") String firstName,
            @FormDataParam("lastName") String lastName,
            @FormDataParam("userName") String userName,
            @FormDataParam("Email") String Email,
            @FormDataParam("Password") String Password) {
        try {
            if (firstName == null || lastName == null || Email == null || Password == null || userName == null) {
                System.out.println(firstName);
                System.out.println(lastName);
                System.out.println(Email);
                System.out.println(Password);
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("New user added " + userName);

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
    public String changepass(@FormDataParam("UserID") Integer UserID, @FormDataParam("password") String Password) {
        try {
            if (UserID == null || Password == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("users password changed at UserID =" + UserID);

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
    @Path("login") // The name of the actual path used for calling my API in git bash
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String attemptLogin(@FormDataParam("username") String userName, @FormDataParam("password") String Password) { // The data that needs entering by the user to actually use the API

        try { // The try statement allows me to define a block of code that is being tested for errors while it is being executed this allows me to 'catch' the error during run time rather than having the API crash the website.

            if (userName == null || // Verification to ensure the data isnt null
                    Password == null) {// Verification to ensure the data isnt null
                throw new Exception("One or more form data parameters are missing in the HTTP request."); // The throw statement returns an error to the console allowing me to troubleshoot the issue
            }

            System.out.println("/user/login - Attempt by " + userName); // Confirmation of an attempt printed in the intellij console

            PreparedStatement statement1 = main.db.prepareStatement(
                    "SELECT userName, Password FROM UserTable WHERE userName = ?" // The actual SQL statement that is run allowing me to communicate with my database and validate the the data entered is consistent and correct
            );
            statement1.setString(1, userName);
            ResultSet results = statement1.executeQuery();

            if (results != null && results.next()) {
                if (!Password.equals(results.getString("Password"))) { // This is the validation of the password to ensure that the password is correct
                    return "{\"error\": \"Incorrect password\"}"; // Prints password wrong to the git bash terminal
                }

                String sessionToken = UUID.randomUUID().toString(); // This assigns the session token to the user allowing me to have different access levels etc..
                PreparedStatement statement2 = main.db.prepareStatement(
                        "UPDATE UserTable SET SessionToken = ? WHERE LOWER(userName) = ?"
                );
                statement2.setString(1, sessionToken);
                statement2.setString(2, userName.toLowerCase());
                statement2.executeUpdate();
                return "{\"sessionToken\": \"" + sessionToken + "\"}"; // Prints to the gitbash terminal showing the new token for the user.

            } else {
                return "{\"error\": \"Can't find user account.\"}"; // Prints the issue that the account doesnt exist to the terminal
            }

        } catch (Exception resultsException) { // Final error catching will output to the  console allowing me to troubleshoot
            String error = "Database error - can't process login: " + resultsException.getMessage(); // Prints to the console telling me the error.
            System.out.println(error);
            return "{\"error\": \"" + error + "\"}";
        }

    }

    @GET
    @Path("logout")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String logout(@CookieParam("sessionToken") String sessionToken) {

        System.out.println("/logout - User Logged out");

        try {
            PreparedStatement statement = main.db.prepareStatement("UPDATE UserTable SET sessionToken = null WHERE sessionToken = ?");
            statement.setString(1, sessionToken);
            statement.executeUpdate();

            return "{\"status\": \"OK\"}";

        } catch (Exception resultsException) {
            String error = "Database error - can't update 'Users' table: " + resultsException.getMessage();
            System.out.println(error);
            return "{\"error\": \"" + error + "\"}";
        }

    }


    @POST
    @Path("makeadmin")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String makeAdmin(@FormDataParam("targetuser") Integer UserID) {
        try {
            if (UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("User has been made an admin at userID: " + UserID);
            PreparedStatement ps = main.db.prepareStatement("UPDATE UserTable SET userType=? WHERE UserID=?");
            ps.setString(1, "Admin");
            ps.setInt(2, UserID);
            ps.executeUpdate();
            return "{\"User - MadeAdmin, User:\": \"" + UserID + "\"}";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "{\"error\": \"Unable to change item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("makeuser")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String makeUser(@FormDataParam("targetuser") Integer UserID) {
        try {
            if (UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("/user/makeuser");
            PreparedStatement ps = main.db.prepareStatement("UPDATE UserTable SET userType=? WHERE UserID=?");
            ps.setString(1, "User");
            ps.setInt(2, UserID);
            ps.executeUpdate();
            return "{\"User - MadeUser, UserID:\": \"" + UserID + "\"}";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "{\"error\": \"Unable to change item, please see server console for more info.\"}";
        }
    }

    public static String validateSessionCookie(String sessionToken) {
        try {
            PreparedStatement statement = main.db.prepareStatement(
                    "SELECT userName FROM UserTable WHERE sessionToken = ?"
            );
            statement.setString(1, sessionToken);
            ResultSet results = statement.executeQuery();
            if (results != null && results.next()) {
                return results.getString("Username");
            }
        } catch (Exception resultsException) {
            String error = "Database error - can't select by id from 'Admins' table: " + resultsException.getMessage();

            System.out.println(error);
        }
        return null;
    }

    @GET
    @Path("checkAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public String checkAdmin(@CookieParam("sessionToken") String sessionToken) {

        System.out.println("/users/checkAdmin");

        String currentUser = validateAdmin(sessionToken);
        if (currentUser == null || currentUser.equals("User")) {
            return "{\"UserType\": \"" + currentUser + "\"}"; // user
        } else {
            return "{\"UserType\": \"" + currentUser + "\"}"; // admin
        }
    }

    public static String validateAdmin(String sessionToken) {
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT userType FROM UserTable WHERE sessionToken=?");
            ps.setString(1, sessionToken);
            ResultSet results = ps.executeQuery();
            if (results != null && results.next()) {
                System.out.println("idk" + results.getString("userType"));
                return results.getString("userType");

            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }
}

