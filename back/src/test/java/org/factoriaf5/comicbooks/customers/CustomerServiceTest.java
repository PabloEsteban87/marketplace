package org.factoriaf5.comicbooks.customers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import org.factoriaf5.comicbooks.config.SecurityConfiguration;

public class CustomerServiceTest {
    private CustomerService service;
    private CustomerRepository repository;

    @Test
    public void testCreateCustomer() {
        repository = mock(CustomerRepository.class);

       SecurityConfiguration configuration = new SecurityConfiguration();



  

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode("password"); 

        Customer savedCustomer = new Customer("user5@user.com", "29920371A", "Lola", "Flores", "Rosas", "La buenecita",
                14, "3", "dcha", "3", "A", 30033, "Madrid", "Madrid",
                password);

        when(repository.save(any(Customer.class))).thenReturn(savedCustomer);
        when(repository.findByEmail("user5@user.com")).thenReturn(java.util.Optional.of(savedCustomer));
        when(configuration.passwordEncoder()).thenReturn(new BCryptPasswordEncoder());

        service = new CustomerService(repository);
        Customer response = service.create(savedCustomer);

        assertNotNull(response);

        assertEquals("user5@user.com", response.getEmail());
        assertEquals("29920371A", response.getDni());
        assertEquals("Lola", response.getName());
        assertEquals("Flores", response.getSurname());
        assertEquals("Rosas", response.getSurname2());
        assertEquals("La buenecita", response.getStreet());
        assertEquals(14, response.getNumber());
        assertEquals("3", response.getGate());
        assertEquals("dcha", response.getStairs());
        assertEquals("3", response.getFloor());
        assertEquals("A", response.getLetter());
        assertEquals(30033, response.getPostalcode());
        assertEquals("Madrid", response.getTown());
        assertEquals("Madrid", response.getProvince());
        assertEquals("$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO", response.getPassword());

        Customer retrievedCustomer = service.findByEmail("user5@user.com");
        assertEquals(savedCustomer, retrievedCustomer);
    }

    @Test
    public void testGetAllCustomer() {

        repository = mock(CustomerRepository.class);

        java.util.List<Customer> CustomerGetAll = repository.findAll();

        when(repository.findAll()).thenReturn(CustomerGetAll);

        service = new CustomerService(repository);
        java.util.List<Customer> response = service.getAll();

        assertNotNull(response);

        assertEquals(response, CustomerGetAll);
    }

    @Test
    public void testUpdateCustomer() {
        repository = mock(CustomerRepository.class);

        Customer newCustomer = new Customer("user@user.com", "29920371A", "Lola", "Flores", "Rosas", "La buenecita", 14,
                "3", "dcha", "3", "A", 30033, "Madrid", "Madrid",
                "$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO");

        when(repository.save(any(Customer.class))).thenReturn(newCustomer);
        when(repository.findByEmail("user@user.com")).thenReturn(java.util.Optional.of(newCustomer));

        service = new CustomerService(repository);
        Customer response = service.update("user@user.com", newCustomer);

        assertNotNull(response);

        response.setEmail("user@user.com");
        response.setDni("29920371A");
        response.setName("nombre");
        response.setSurname("apellido1");
        response.setSurname2("Rosas");
        response.setStreet("La buenecita");
        response.setNumber(14);
        response.setGate("3");
        response.setStairs("dcha");
        response.setFloor("3");
        response.setLetter("A");
        response.setPostalcode(30033);
        response.setTown("Madrid");
        response.setProvince("Madrid");
        response.setPassword("$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO");

        Customer retrievedCustomer = service.findByEmail("user@user.com");
        assertEquals(newCustomer, retrievedCustomer);
    }

    @Test
    public void testDeleteCustomer() {
        repository = mock(CustomerRepository.class);

        Customer Customer = new Customer("user@user.com", "29920371A", "Lola", "Flores", "Rosas", "La buenecita", 14,
                "3", "dcha", "3", "A", 30033, "Madrid", "Madrid",
                "$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO");

        when(repository.findByEmail("user@user.com")).thenReturn(java.util.Optional.of(Customer));

        service = new CustomerService(repository);

        Customer response = service.delete("user@user.com");

        Customer retrievedCustomer = service.findByEmail("user@user.com");

       response.equals(retrievedCustomer); 

    }
}
