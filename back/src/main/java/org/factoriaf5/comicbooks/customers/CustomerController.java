package org.factoriaf5.comicbooks.customers;

import java.util.List;

import javax.management.relation.Role;

import org.factoriaf5.comicbooks.login.LoginDTO;
import org.factoriaf5.comicbooks.login.LoginResponse;
import org.factoriaf5.comicbooks.roles.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;






@RestController
@CrossOrigin(origins = "http://localhost:4200")
// @CrossOrigin(origins = "*", methods = {RequestMethod.GET,
// RequestMethod.POST})
@RequestMapping("/customers")
public class CustomerController {

    private CustomerService service;
    // private RoleService service2;

    @Autowired
    public CustomerController(CustomerService service) {
        this.service = service;
        // this.service2 = service2;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path = "/{idcustomer}/role/{idrole}")
    public ResponseEntity<Customer> create(@RequestBody Customer customer, @PathVariable(value = "idrole") Long idrole, @PathVariable(value = "idcustomer") String idcustomer) {
        Customer customerSaved = service.create(customer, idrole, idcustomer);
        return ResponseEntity.status(HttpStatus.OK).body(customerSaved);
    }

    @GetMapping("/role")
    public ResponseEntity<List<Customer>> getRoleCustomer() {
        List<Customer> serviceGetAll = service.getRoleCustomer();
        return ResponseEntity.status(HttpStatus.OK).body(serviceGetAll);
    } 
    

    

    @GetMapping(path = { "/{email}" })
    public ResponseEntity<Customer> findOne(@PathVariable("email") String email) {
        Customer findbyemail = service.findByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(findbyemail);
    }

    @PutMapping(path = { "/{email}" })
    public ResponseEntity<Customer> update(@PathVariable("email") String email, @RequestBody Customer newCustomer) {
        Customer serviceupdated = service.update(email, newCustomer);
        return ResponseEntity.status(HttpStatus.OK).body(serviceupdated);
    }

    @DeleteMapping(path = { "/{email}" })
    public ResponseEntity<Customer> delete(@PathVariable("email") String email) {
        Customer serviceDeleted = service.delete(email);
        return ResponseEntity.status(HttpStatus.OK).body(serviceDeleted);
    }

    @GetMapping
    public ResponseEntity<List<Customer>> findAll() {
        List<Customer> serviceGetAll = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(serviceGetAll);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path = "/login")
    public ResponseEntity<LoginResponse> loginCustomer(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = service.loginCustomer(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

  /*   @PostMapping(path = "/{idcustomer}/role/{idrole}")
    public ResponseEntity<Customer> addRoleToCustomer(@PathVariable(value = "idrole") Long idrole, @PathVariable(value = "idcustomer") String idcustomer) {
        return ResponseEntity.ok(service.addRoleToCustomer(idrole, idcustomer));
    } */
}
