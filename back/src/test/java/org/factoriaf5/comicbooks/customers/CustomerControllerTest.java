package org.factoriaf5.comicbooks.customers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class CustomerControllerTest {
    @Mock
    private CustomerService CustomerService;

    @InjectMocks
    private CustomerController CustomerController;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<Customer> Customers = new ArrayList<>();
        Customers.add(new Customer("user3@user.com", "29920371A", "Lola", "Flores", "Rosas", "La buenecita", 14, "3",
                "dcha", "3", "A", 30033, "Madrid", "Madrid",
                "$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO"));
        Customers.add(new Customer("user4@user.com", "29920371A", "Lola", "Flores", "Rosas", "La buenecita", 14, "3",
                "dcha", "3", "A", 30033, "Madrid", "Madrid",
                "$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO"));
        when(CustomerService.getAll()).thenReturn(Customers);

        ResponseEntity<List<Customer>> response = CustomerController.findAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(Customers, response.getBody());
    }

    @Test
    public void testCreate() {
        Customer customerToCreate = new Customer("user5@user.com", "29920371A", "Lola", "Flores", "Rosas",
                "La buenecita", 14, "3", "dcha", "3", "A", 30033, "Madrid", "Madrid",
                "$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO");

        when(CustomerService.create(customerToCreate, 1L, "USER")).thenReturn(customerToCreate);

        ResponseEntity<Customer> response = CustomerController.create(customerToCreate, 1L, "USER");

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(customerToCreate, response.getBody());
    }

    @Test
    public void testFindOne() {

        String email = "user@user.com";

        Customer Customer = new Customer(email);

        when(CustomerService.findByEmail(email)).thenReturn(Customer);

        ResponseEntity<Customer> response = CustomerController.findOne(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(Customer, response.getBody());
    }

    @Test
    public void testUpdate() {

        String email = "user@user.com";

        Customer customerToModify = new Customer("user@user.com", "29920371A", "Lola", "Flores", "Rosas",
                "La buenecita", 14, "3", "dcha", "3", "A", 30033, "Madrid", "Madrid",
                "$2a$12$BwyEzyYm8ssMjYY9HLvrq.LwIxYbfApeAM41kyP7o6ZyYq8B542wO");

        when(CustomerService.update(email, customerToModify)).thenReturn(customerToModify);

        ResponseEntity<Customer> response = CustomerController.update(email, customerToModify);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(customerToModify, response.getBody());
    }

    @Test
    public void testDelete() {

        String email = "user@user.com";

        Customer Customer = new Customer(email);

        when(CustomerService.findByEmail(email)).thenReturn(Customer);

        ResponseEntity<Customer> response = CustomerController.delete(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        /* assertEquals(Customer, response.getBody()); */
    }
}
