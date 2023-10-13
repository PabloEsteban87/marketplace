package org.factoriaf5.comicbooks.customers;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

   Optional<Customer> findByEmail(String email);

   @Query(value = "SELECT * FROM customers t1 INNER JOIN customer_role t2 ON t1.email = t2.customer_id WHERE t2.role_id = ?2")
   List<Customer> findAllByCustomerRole();
 

   Optional<Customer> findOneByEmailAndPassword(String email, String password);

}
