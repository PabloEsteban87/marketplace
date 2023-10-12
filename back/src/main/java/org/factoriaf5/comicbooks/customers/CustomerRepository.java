package org.factoriaf5.comicbooks.customers;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

   Optional<Customer> findByEmail(String email);

   
 

   Optional<Customer> findOneByEmailAndPassword(String email, String password);

}
