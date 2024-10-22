package online.business.sharing.system.repository;

import online.business.sharing.system.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(long productId);

    @Query("SELECT COUNT(*) FROM Product p")
    Integer getTotalProducts();
}
