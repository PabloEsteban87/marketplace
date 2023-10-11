package org.factoriaf5.comicbooks.roles;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.factoriaf5.comicbooks.comics.Comic;
import org.factoriaf5.comicbooks.customers.Customer;
import org.factoriaf5.comicbooks.genres.Genre;
import org.factoriaf5.comicbooks.orders.Order;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="roles")
@NoArgsConstructor  
@AllArgsConstructor
public class Role{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role")
    private String rolename;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return rolename;
    }

    public void setRole(String rolename) {
        this.rolename = rolename;
    }

 /*    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    private Customer customer;  */

    /* @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "customer_role",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "customer_id", referencedColumnName = "email")
    )
    private Set<Customer> customer; */

    @ManyToMany(mappedBy = "role")
    private Set<Customer> customer;

    public Set<Customer> getCustomer() {
        return customer;
    }


      //añadido Pablo
     /*  @OneToMany(mappedBy = "role")
      public Set<Customer> customer = new HashSet<>(); */
    /*  public List<Customer> customer = new ArrayList<>(); */

    /* @ManyToOne
    @JoinColumn(name="customer_id",nullable=false)
    private Customer customer;  */ 


}
