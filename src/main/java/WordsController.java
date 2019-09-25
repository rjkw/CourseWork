import java.sql.PreparedStatement;
        import java.sql.ResultSet;


public class WordsController

{
    public static void ReadWords() {

        try {

            PreparedStatement ps = main.db.prepareStatement("SELECT WordID,Definition,Difficulty FROM Words"); // This allows me to read the database.

            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int WordID = results.getInt(1);
                String Definition = results.getString(2);
                int Difficulty = results.getInt(3);
                System.out.print("WordID: " + WordID + ",  ");
                System.out.print("Definition: " + Definition + ",  ");
                System.out.print("Difficulty: " + Difficulty + "\n");
            }

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void insertWords(int WordID, String Definition, int Difficulty) { // This allows me to insert words into the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "INSERT INTO Words (WordID, Definition, Difficulty) VALUES (?, ?, ?)");

            ps.setInt(1, WordID);
            ps.setString(2, Definition);
            ps.setInt(3, Difficulty);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void updateWords(int WordID, String Definition, int Difficulty) { // This allows me to update words from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "UPDATE Words SET Definition = ?, Diffculty  = ? WHERE WordID = ?");

            ps.setString(1, Definition);
            ps.setInt(2, Difficulty);
            ps.setInt(3, WordID);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void deleteWord(int WordId) { // This allows me to delete words from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM Words WHERE WordID = ?");

            ps.setInt(1, WordId);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }

}

