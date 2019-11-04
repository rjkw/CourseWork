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
@Path("gameinstance")
public class GameInstanceController {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String ReadGI() {
        System.out.println("Game Instance List");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT WordID, Score, UserID FROM GameInstance");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("WordID", results.getInt(1));
                item.put("Score", results.getInt(2));
                item.put("UserID", results.getInt(3));
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
    public String insertGI(
            @FormDataParam("WordID") Integer WordID, @FormDataParam("Score") Integer Score, @FormDataParam("UserID") Integer UserID) {
        try {
            if (WordID == null || Score == null || UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("New Word =" + WordID);

            PreparedStatement ps = main.db.prepareStatement("INSERT INTO GameInstance (WordID, Score, UserID) VALUES (?, ?, ?)");
            ps.setInt(1, WordID);
            ps.setInt(2, Score);
            ps.setInt(3, UserID);
            ps.execute();
            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to create new item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("update")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateGI(
            @FormDataParam("WordID") Integer WordID, @FormDataParam("Score") Integer Score, @FormDataParam("UserID") Integer UserID) {
        try {
            if (WordID == null || Score == null || UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("update id=" + WordID);

            PreparedStatement ps = main.db.prepareStatement("UPDATE GameInstance SET Name = ?, Quantity = ? WHERE Id = ?");
            ps.setInt(1, WordID);
            ps.setInt(2, Score);
            ps.setInt(3, UserID);
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
    public String deleteGI(@FormDataParam("WordID") Integer WordID) {

        try {
            if (WordID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("thing/delete WordID=" + WordID);

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM GameInstance WHERE WordID = ?");

            ps.setInt(1, WordID);

            ps.execute();

            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }

}

