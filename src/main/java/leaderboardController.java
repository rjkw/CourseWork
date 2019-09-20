import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class leaderboardController {
    public static void listThings() {

        try {

            PreparedStatement ps = main.db.prepareStatement("SELECT Id, Name, Quantity FROM Things");

            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int Score = results.getInt(1);
                int Placement = results.getInt(2);
                String userName = results.getString(3);
                System.out.print("Id: " + Score + ",  ");
                System.out.print("Name: " + Placement + ",  ");
                System.out.print("Quantity: " + userName + "\n");
            }

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }


}
