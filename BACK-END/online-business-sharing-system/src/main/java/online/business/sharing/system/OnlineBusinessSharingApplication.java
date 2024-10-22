package online.business.sharing.system;

import online.business.sharing.system.model.User;
import online.business.sharing.system.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class OnlineBusinessSharingApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineBusinessSharingApplication.class, args);
    }


//    @Bean
    public User insertAdmin(UserRepository userRepository) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User admin = new User();
        admin.setFirstName("Hassan");
        admin.setSecondName("Said");
        admin.setLastName("Hamad");
        admin.setUsername("Mr_Never5");
        admin.setPassword(passwordEncoder.encode("never123%"));
        admin.setEmail("never@gmail.com");
        admin.setPhoneNumber("0777 914 210");
        admin.setAddress("Kwarara");
        admin.setGender("Male");
        admin.setRole("ROLE_ADMIN");
        admin.setActive(true);
        admin.setNotLocked(true);
        userRepository.save(admin);
        return admin;
    }


    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200"));
        corsConfiguration.setAllowedHeaders(Arrays.asList(
                "Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Jwt-Token", "Authorization", "Origin", "Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"
        ));
        corsConfiguration.setExposedHeaders(Arrays.asList(
                "Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization", "Access-Control-Allow-Origin",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"
        ));
        corsConfiguration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

}
