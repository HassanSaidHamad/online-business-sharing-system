package online.business.sharing.system.controller;


import lombok.RequiredArgsConstructor;
import online.business.sharing.system.model.User;
import online.business.sharing.system.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        authenticateUser(user.getUsername(), user.getPassword());
        User loginUser = userService.findUserByUsername(user.getUsername());
        return new ResponseEntity<>(loginUser, HttpStatus.OK);
    }


    private void authenticateUser(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
