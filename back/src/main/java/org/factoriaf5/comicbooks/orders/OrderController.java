package org.factoriaf5.comicbooks.orders;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService service){
        this.orderService = service;
    }
    
    @GetMapping
    public List<Order> index(){
        return orderService.getAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id){
        Optional<Order> optionalOrder = orderService.getOrderById(id);
        if(optionalOrder.isPresent()){
            Order Order = optionalOrder.get();
            return ResponseEntity.ok(Order);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    // @GetMapping(path = "customer/{email}")
    // public ResponseEntity<List<Order>> getOrdersByEmail(@PathVariable String email){
    //     Optional<List<Order>> optionalOrders = orderService.getAllFromCustomer(email);
    //     if(optionalOrders.isPresent()){
    //         List<Order> orders = optionalOrders.get();
    //         return ResponseEntity.ok(orders);
    //     }else{
    //         return ResponseEntity.notFound().build();
    //     }        
    // }
    @GetMapping(path = "customer/{email}")
    public ResponseEntity<List<Order>> getOrdersByEmail(@PathVariable String email){
        List<Order> orders = orderService.getAllFromCustomer(email);
        if(orders!=null){
            return ResponseEntity.ok(orders);
        }else{
            return ResponseEntity.notFound().build();
        }        
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order order) {
        Order serviceSaved = orderService.create(order);
        return ResponseEntity.status(HttpStatus.OK).body(serviceSaved);
    }



    /*  @GetMapping(path = "customer/{email}/{date}")
    public ResponseEntity<List<Order>> getOrdersByDate(@PathVariable("email") String email, @PathVariable("date") Date date){
        List<Order> orders = orderService.getAllFromCustomer(email);
        if(orders!=null){
            return ResponseEntity.ok(orders);
        }else{
            return ResponseEntity.notFound().build();
        }        
    } */

}
