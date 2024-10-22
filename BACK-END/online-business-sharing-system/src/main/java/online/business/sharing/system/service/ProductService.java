package online.business.sharing.system.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.business.sharing.system.constant.FileConstant;
import online.business.sharing.system.model.Product;
import online.business.sharing.system.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;


    //    add Product
    public Product createProduct(String productName, String productDescription, double price, MultipartFile productImage) throws IOException {
        Product addNewProduct = new Product();
        addNewProduct.setProductName(productName);
        addNewProduct.setProductDescription(productDescription);
        addNewProduct.setPrice(price);
        log.info("Product added successfully");
        productRepository.save(addNewProduct);
        saveProductImage(addNewProduct, productImage);
        return addNewProduct;
    }


    //    update Product info
    public Product updateProduct(String productName, String productDescription, double price, MultipartFile productImage, long productId) throws IOException {
        Product updateProduct = findByProduct(productId);
        updateProduct.setProductName(productName);
        updateProduct.setProductDescription(productDescription);
        updateProduct.setPrice(price);
        log.info("Product updated successfully");
        productRepository.save(updateProduct);
        saveProductImage(updateProduct, productImage);
        return updateProduct;
    }


    public List<Product> getProducts() {
        return productRepository.findAll();
    }


    //    findByProductId
    public Product findByProduct(long roomId) {
        Product product = productRepository.findByProductId(roomId);
        if (product == null) {
            throw new RuntimeException("Product by ID: " + roomId + " not found");
        } else {
            return product;
        }
    }


    //    deleteProduct
    public void deleteProduct(long productId) {
        Product product = findByProduct(productId);
        log.info("Product deleted successfully.");
        productRepository.deleteById(product.getProductId());
    }


    //    product image
    private void saveProductImage(Product product, MultipartFile productImage) throws IOException {
        if (productImage != null) {
            Path productFolder = Paths.get(FileConstant.PRODUCT_FOLDER + product.getProductId()).toAbsolutePath().normalize();
            if (!Files.exists(productFolder)) {
                Files.createDirectories(productFolder);
                log.info("Directory created for " + productFolder);
            }

            Files.deleteIfExists(Paths.get(FileConstant.PRODUCT_FOLDER + product.getProductId() + "." + "jpg"));
            Files.copy(productImage.getInputStream(), productFolder.resolve(product.getProductId() + "." + "jpg"), REPLACE_EXISTING);
            product.setProductImage(setProductImage(product.getProductId()));
            productRepository.save(product);
            log.info(productImage.getOriginalFilename());
        }
    }


    private String setProductImage(long productId) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(FileConstant.PRODUCT_IMAGE_PATH + productId + "/" + productId + "." + "jpg").toUriString();
    }


    public Integer getTotalProducts() {
        return productRepository.getTotalProducts();
    }
}



