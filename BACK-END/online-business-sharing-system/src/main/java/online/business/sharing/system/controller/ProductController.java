package online.business.sharing.system.controller;

import lombok.RequiredArgsConstructor;
import online.business.sharing.system.constant.FileConstant;
import online.business.sharing.system.model.Product;
import online.business.sharing.system.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;


    //    add room
    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("price") double price,
            @RequestParam(value = "productImage", required = false) MultipartFile productImage) throws IOException {

        Product newProduct = productService.createProduct(productName, productDescription, price, productImage);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }


    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("price") double price,
            @RequestParam(value = "productImage", required = false) MultipartFile productImage,
            @PathVariable long productId) throws IOException {

        Product updateRoom = productService.updateProduct(productName, productDescription, price, productImage, productId);
        return new ResponseEntity<>(updateRoom, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }



    @GetMapping("/{productId}")
    public ResponseEntity<Product> findProduct(@PathVariable long productId) {
        Product room = productService.findByProduct(productId);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //    display room image
    @GetMapping(path = "/image/{productId}/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getProfileImage(@PathVariable String productId, @PathVariable String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(FileConstant.PRODUCT_FOLDER + productId + "/" + fileName));
    }


    @GetMapping("/total-products")
    public ResponseEntity<Integer> getTotalProducts() {
        Integer totalProducts = productService.getTotalProducts();
        return new ResponseEntity<>(totalProducts, HttpStatus.OK);
    }


}
