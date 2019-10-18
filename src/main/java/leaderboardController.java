import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class leaderboardController {
    public static void readLB() { // This is my read operator it allows me to read the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("SELECT Score,Placement,userID FROM leaderBoard");

            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int Score = results.getInt(1);
                int Placement = results.getInt(2);
                String userID = results.getString(3);
                System.out.print("Score: " + Score + ",  ");
                System.out.print("Position: " + Placement + ",  ");
                System.out.print("UserID: " + userID + "\n");
            }

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }

    public static void createLB(int Score,int Placement,String userName) { // This is my create operator it allows me to create new records in my database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "INSERT INTO leaderBoard (Score, Placement, userName) VALUES (?, ?, ?)");

            ps.setInt(1, Score);
            ps.setInt(2, Placement);
            ps.setString(3, userName);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void updateLB(int Score, int Placement, String userName) { // This lets me update records in the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "UPDATE leaderBoard SET Score = ?, Placement = ? WHERE userName = ?");

            ps.setInt(1,Score);
            ps.setInt(2, Placement);
            ps.setString(3, userName);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void deleteLB(int Placement) { // This lets me delete the placement of a player in my leaderboard table.

        try {

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM leaderBoard WHERE Placement = ?");

            ps.setInt(1, Placement);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }

}