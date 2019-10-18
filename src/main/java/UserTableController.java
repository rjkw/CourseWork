import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserTableController {
    public static void ReadUT() {

        try {

            PreparedStatement ps = main.db.prepareStatement("SELECT UserID,FirstName,LastName,UserName,Email,Password FROM UserTable"); // This allows me to read the database.

            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int UserID = results.getInt(1);
                String FirstName = results.getString(2);
                String LastName = results.getString(3);
                String Username = results.getString(4);
                String Email = results.getString(5);
                String Password = results.getString(6);
                System.out.println("UserID: " + UserID + ",  ");
                System.out.println("FirstName: " + FirstName + ",  ");
                System.out.println("LastName : " + LastName + " ");
                System.out.println("UserName :"  + Username + " ");
                System.out.println("Email :" + Email + " ");
                System.out.println("Password :" + Password + " ");
            }

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void insetUT (int UserId,String FirstName, String LastName, String UserName, String Email,String Password) { // This allows me to insert into the database.

        try {

            PreparedStatement ps = main.db.prepareStatement(
                    "INSERT INTO UserTable (UserID,FirstName,LastName,UserName,Email,Password) VALUES (?, ?, ?,?,?,?)");

            ps.setInt(1, UserId);
            ps.setString(2, FirstName);
            ps.setString(3, LastName);
            ps.setString(4, UserName);
            ps.setString(5, Email);
            ps.setString(6, Password);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void updateUT
            (int UserId,String FirstName, String LastName, String UserName, String Email,String Password) { // This allows me to  words from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("UPDATE UserTable SET FirstName = ?, LastName  = ?,UserName = ?, Email = ?, Password = ? WHERE UserID = ?");

            ps.setString(2, FirstName);
            ps.setString(3, LastName);
            ps.setString(4, UserName);
            ps.setString(5, Email);
            ps.setString(6, Password);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void deleteUT(int UserId) { // This allows me to delete  from the database.

        try {

            PreparedStatement ps = main.db.prepareStatement("DELETE FROM UserTable WHERE UserId = ?");

            ps.setInt(1, UserId);

            ps.execute();

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}
