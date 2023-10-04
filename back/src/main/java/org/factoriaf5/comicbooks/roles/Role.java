package org.factoriaf5.comicbooks.roles;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.factoriaf5.comicbooks.customers.Customer;
import org.factoriaf5.comicbooks.genres.Genre;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    public String getRol() {
        return rolename;
    }

    public void setRol(String rolename) {
        this.rolename = rolename;
    }

   


      //añadido Pablo
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
        @JoinTable(
                name = "customer_role",
                joinColumns = {@JoinColumn(name = "customer_id")},
                inverseJoinColumns = {@JoinColumn(name = "role_id")}
        )
        Set<Customer> customers = new HashSet<>();

}
