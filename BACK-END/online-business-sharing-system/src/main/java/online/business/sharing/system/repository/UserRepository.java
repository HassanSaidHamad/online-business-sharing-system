package online.business.sharing.system.repository;


import online.business.sharing.system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);

    User findUserByEmail(String email);

    User findUserByUserId(long userId);


    @Query("SELECT COUNT(*) FROM User c WHERE c.role = 'ROLE_CUSTOMER'")
    Integer getTotalCustomers();
}
