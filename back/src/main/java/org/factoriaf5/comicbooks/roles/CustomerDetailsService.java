package org.factoriaf5.comicbooks.roles;

import java.util.Optional;

import org.factoriaf5.comicbooks.customers.Customer;
import org.factoriaf5.comicbooks.customers.CustomerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService implements UserDetailsService{

    private final CustomerRepository customerRepository; 

    public CustomerDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Customer> customer = customerRepository.findByEmail(email);
        return new CustomerDetailsImpl(customer);
    }
    
}
