package codes.snowy.superstudy.database.Account;

import java.util.List;
import org.springframework.data.annotation.id;
import org.springframework.data.mongodb.core.mapping.Document;


public class Account{


    private String id;
    private String username;
    private String password;
    private List<String> classes;
}