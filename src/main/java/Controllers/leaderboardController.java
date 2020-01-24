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
@Path("leaderboard")
public class leaderboardController {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String ReadLB() {
        System.out.println("Listing the leaderboards");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = main.db.prepareStatement("SELECT Score, Placement, UserID FROM Leaderboard");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("Score", results.getInt(1));
                item.put("Placement", results.getInt(2));
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
    @Path("new")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertLB(
            @FormDataParam("Score") Integer Score, @FormDataParam("Placement") Integer Placement, @FormDataParam("UserID") Integer UserID) {
        try {
            if (Score == null || Placement == null || UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("New ranking made placement=" + Placement);

            PreparedStatement ps = main.db.prepareStatement("INSERT INTO Things (Id, Name, Quantity) VALUES (?, ?, ?)");
            ps.setInt(1, Score);
            ps.setInt(2, Placement);
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
    public String updateLB(
            @FormDataParam("Score") Integer Score, @FormDataParam("Placement") Integer Placement, @FormDataParam("UserID") Integer UserID) {
        try {
            if (Score == null || Placement == null || UserID == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("Ranking Updated placement = " + Placement);

            PreparedStatement ps = main.db.prepareStatement("UPDATE Leaderboard SET Score = ?,Placement = ? WHERE UserID = ?");
            ps.setInt(1, Score);
            ps.setInt(2, Placement);
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
    public String deleteLB(@FormDataParam("Placement") Integer Placement) {

        try {
            if (Placement == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            System.out.println("Ranking deleted placement = " + Placement);

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM Leaderboard WHERE Placement = ?");

            ps.setInt(1, Placement);

            ps.execute();

            return "{\"status\": \"OK\"}";

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }


}