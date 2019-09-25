import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class GameInstanceController {
    public static void ReadGI() {

        try {

            PreparedStatement ps = main.db.prepareStatement("SELECT WordID,Score,UserID FROM Words"); // This allows me to read the database.

            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int WordID = results.getInt(1);
                int Score = results.getInt(2);
                int UserID = results.getInt(3);
                System.out.print("WordID: " + WordID + ",  ");
                System.out.print("Definition: " + Score + ",  ");
                System.out.print("Difficulty: " + UserID + "\n");
            }

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void insertGI (int WordID, int Score, int UserID) { // This allows me to  words into the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "INSERT INTO Words (WordID, Score, UserID) VALUES (?, ?, ?)");

            ps.setInt(1, WordID);
            ps.setInt(2, Score);
            ps.setInt(3, UserID);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void updateGI(int WordId, int Score, int UserID) { // This allows me to  words from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "UPDATE Words SET WordId = ?, Score  = ? WHERE UserID = ?");

            ps.setInt(1, WordId);
            ps.setInt(2, Score);
            ps.setInt(3, UserID);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void deleteGI(int WordId) { // This allows me to delete  from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM Words WHERE WordID = ?");

            ps.setInt(1, WordId);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}
