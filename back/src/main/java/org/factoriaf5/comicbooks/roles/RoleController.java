package org.factoriaf5.comicbooks.roles;

import java.util.List;

import org.factoriaf5.comicbooks.genres.Genre;
import org.factoriaf5.comicbooks.genres.GenresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/roles")
public class RoleController {
     private RoleService service;
    
    @Autowired
    public RoleController(RoleService service){
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Role>>  findAll(){
        List<Role> serviceGetAll = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(serviceGetAll);
    }
}
