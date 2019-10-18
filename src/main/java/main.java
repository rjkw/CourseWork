import org.sqlite.SQLiteConfig;
import java.util.Scanner;

import java.sql.Connection;
import java.sql.DriverManager;


public class main {
    public static Connection db = null;
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        openDatabase("Words.db");
        GameInstanceController.ReadGI();
        closeDatabase();
    }
    private static void openDatabase(String dbFile)
    {

        try  {

            Class.forName("org.sqlite.JDBC");
            SQLiteConfig config = new SQLiteConfig();
            config.enforceForeignKeys(true);
            db = DriverManager.getConnection("jdbc:sqlite:resources/" + dbFile, config.toProperties());
            System.out.println("Database connection successfully established.");

        } catch (Exception exception) {

            System.out.println("Database connection error: " + exception.getMessage());
        }

    }

    private static void closeDatabase()
    {
        try {

            db.close();
            System.out.println("Disconnected from database.");

        } catch (Exception exception) {

            System.out.println("Database disconnection error: " + exception.getMessage());
        }
    }


}

