package org.factoriaf5.comicbooks.customers;

import java.util.List;
import java.util.Optional;

import org.factoriaf5.comicbooks.login.LoginDTO;
import org.factoriaf5.comicbooks.login.LoginResponse;
import org.factoriaf5.comicbooks.roles.Role;
import org.factoriaf5.comicbooks.roles.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {

    CustomerRepository repository;
    RoleRepository repository2;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public CustomerService(CustomerRepository repository, RoleRepository repository2 ) {
        this.repository = repository;
        this.repository2 = repository2;
    }

    @Transactional
    public Customer addRoleToCustomer(Long idrole, String idcustomer){
          Customer customer = repository.findByEmail(idcustomer).orElseThrow(() -> new RuntimeException("No se encontró la entidad customer"));
          Role role = repository2.findById(idrole).orElseThrow(() -> new RuntimeException("No se encontró la entidad role"));
          role.getCustomer().add(customer);
          customer.getRole().add(role);
          return repository.save(customer); 
         
         
    }

    public Customer create(Customer customer, Long idrole, String idcustomer) {
        customer.setPassword(this.passwordEncoder.encode(customer.getPassword()));
        Role role = repository2.findById(idrole).orElseThrow(() -> new RuntimeException("No se encontró la entidad role"));
          role.getCustomer().add(customer);
          customer.getRole().add(role);
        return repository.save(customer);
    }

    public Customer findByEmail(String email) {
        return repository.findByEmail(email).orElseThrow();
    }

    public Customer update(String email, Customer newCustomer) {

        Customer currentCustomer = repository.findByEmail(email).orElseThrow();

        currentCustomer.setEmail(newCustomer.getEmail());
        currentCustomer.setDni(newCustomer.getDni());
        currentCustomer.setName(newCustomer.getName());
        currentCustomer.setSurname(newCustomer.getSurname());
        currentCustomer.setSurname2(newCustomer.getSurname2());
        currentCustomer.setStreet(newCustomer.getStreet());
        currentCustomer.setNumber(newCustomer.getNumber());
        currentCustomer.setGate(newCustomer.getGate());
        currentCustomer.setStairs(newCustomer.getStairs());
        currentCustomer.setFloor(newCustomer.getFloor());
        currentCustomer.setLetter(newCustomer.getLetter());
        currentCustomer.setPostalcode(newCustomer.getPostalcode());
        currentCustomer.setTown(newCustomer.getTown());
        currentCustomer.setProvince(newCustomer.getProvince());
        currentCustomer.setPassword(newCustomer.getPassword());
        return repository.save(currentCustomer);
    }

    public Customer delete(String email) {
        Customer customer1 = repository.findByEmail(email).orElseThrow();
        repository.delete(customer1);
        return customer1;
    }

    public List<Customer> getAll() {
        return repository.findAll();
    }

    public LoginResponse loginCustomer(LoginDTO loginDTO) {
       Optional<Customer> customerOptional = repository.findByEmail(loginDTO.getEmail());
       
        if(customerOptional.isPresent()){
            Customer customer1 = customerOptional.get();
            String password = loginDTO.getPassword();
            String encodedPassword = customer1.getPassword();
            //Boolean isPasswordRight = true; 
            Boolean isPasswordRight = passwordEncoder.matches(password, encodedPassword);
            if (isPasswordRight){
                Optional<Customer> customer = repository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if(customer.isPresent()){
                    return new LoginResponse("Login Success",true);
                }else{
                    return new LoginResponse("Login Failed", false);
                }
            }else{
                return new LoginResponse("password Not Match", false);
            }
        }else{
            return new LoginResponse("Email not exist", false);
        }         
    }

   public List<Customer> getRoleCustomer() {
        return repository.findAllByCustomerRole();
    } 

}
