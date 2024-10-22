package online.business.sharing.system.controller;


import lombok.RequiredArgsConstructor;
import online.business.sharing.system.constant.FileConstant;
import online.business.sharing.system.model.User;
import online.business.sharing.system.service.UserService;
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
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @PostMapping("/register-customer")
    public ResponseEntity<User> registerNewCustomer(@RequestBody User visitor) {
        User newVisitor = userService.registerNewCustomer(visitor);
        return new ResponseEntity<>(newVisitor, HttpStatus.CREATED);
    }


    @PostMapping("/add-new-user")
    public ResponseEntity<User> addNewUser(@RequestBody User user) {
        User users = userService.addNewUser(user);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    //    UPDATE USER
    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(
            @RequestParam(value = "currentUsername", required = false) String currentUsername,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "secondName", required = false) String secondName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "isActive", required = false) boolean isActive,
            @RequestParam(value = "isNotLocked", required = false) boolean isNotLocked,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {

        User updateUser = userService.updateUser(currentUsername, firstName, secondName, lastName, username, email, phoneNumber, dateOfBirth, gender, address, role, isActive, isNotLocked, profileImage);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<User> findUserById(@PathVariable long userId) {
        User userByUserId = userService.findUserByUserId(userId);
        return new ResponseEntity<>(userByUserId, HttpStatus.OK);
    }


    //    DELETE USER
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //    UPDATE PROFILE IMAGE
    @PutMapping("/updateProfileImage")
    public ResponseEntity<User> updateProfileImage(
            @RequestParam("username") String username,
            @RequestParam(value = "profileImage") MultipartFile profileImage) throws IOException {

        User user = userService.updateProfileImage(username, profileImage);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    //    DISPLAY PROFILE IMAGE
    @GetMapping(path = "/image/{username}/{fileName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getProfileImage(@PathVariable String username, @PathVariable String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(FileConstant.USER_FOLDER + username + "/" + fileName));
    }


    @GetMapping("/total-customers")
    public ResponseEntity<Integer> getTotalCustomers() {
        Integer totalRecipients = userService.getTotalCustomers();
        return new ResponseEntity<>(totalRecipients, HttpStatus.OK);
    }

}
