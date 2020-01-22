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

@Path("words")
public class WordsController {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String readWC() {
        System.out.println("Listing all words.");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT WordID, Definition, Difficulty FROM Words");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("WordID", results.getInt(1));
                item.put("Definition", results.getString(2));
                item.put("Difficulty", results.getString(3));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("single/{WordID}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getWordWC(@PathParam("WordID") Integer WordID){
        System.out.println("Single Word listed - WordID:" + WordID);
        JSONObject item = new JSONObject();
        try {
            if (WordID == null) {
                throw new Exception("WordID does not match any existing WordID");
            }
            PreparedStatement ps = main.db.prepareStatement("SELECT Definition, Difficulty FROM Words WHERE WordID = ?");
            ps.setInt(1, WordID);
            ResultSet results = ps.executeQuery();

            if (results.next()) {
                item.put("Definition", results.getString(1));
                item.put("Difficulty", results.getInt(2));
            }
            return item.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("create   ")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String createWC(
          @FormDataParam("Definition") String Definition, @FormDataParam("Difficulty") Integer Difficulty) {
        try {
            if (Definition == null || Difficulty == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("New Word Added " + Definition);

            PreparedStatement ps = main.db.prepareStatement("INSERT INTO Words (Definition, Difficulty) VALUES (?, ?)");
            ps.setString(1, Definition);
            ps.setInt(2, Difficulty);
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
    public String updateWC(
            @FormDataParam("WordID") Integer WordID, @FormDataParam("Definition") String Definition, @FormDataParam("Difficulty") Integer Difficulty) {
        try {
            if (WordID == null || Definition == null || Difficulty == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("Word Updated at WordID: " + WordID);

            PreparedStatement ps = main.db.prepareStatement("UPDATE Words SET Definition = ?,Difficulty = ? WHERE WordID = ?");
            ps.setString(1, Definition);
            ps.setInt(2, Difficulty);
            ps.setInt(3, WordID);
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
    public String deleteword(@FormDataParam("WordID") Integer WordID) {

        try {
            if (WordID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("Word deleted successfully at WordID: " + WordID);

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM Words WHERE WordID = ?");

            ps.setInt(1, WordID);

            ps.execute();

            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }


}

