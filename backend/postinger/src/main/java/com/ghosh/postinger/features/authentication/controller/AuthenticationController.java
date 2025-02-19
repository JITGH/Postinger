
package com.ghosh.postinger.features.authentication.controller;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import com.ghosh.postinger.dto.Response;
import com.ghosh.postinger.features.authentication.dto.AuthenticationRequestBody;
import com.ghosh.postinger.features.authentication.dto.AuthenticationResponseBody;
import com.ghosh.postinger.features.authentication.model.User;

import com.ghosh.postinger.features.authentication.service.AuthenticationService;



@RestController
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationUserService;

    public AuthenticationController(AuthenticationService authenticationUserService) {
        this.authenticationUserService = authenticationUserService;
    }

    @PostMapping("/login")
    public AuthenticationResponseBody loginPage(@Valid @RequestBody AuthenticationRequestBody loginRequestBody) {
        return authenticationUserService.login(loginRequestBody);
    }

    @PostMapping("/register")
    public AuthenticationResponseBody registerPage(@Valid @RequestBody AuthenticationRequestBody registerRequestBody) {
        return authenticationUserService.register(registerRequestBody);
    }

    @DeleteMapping("/delete")
    public Response deleteUser(@RequestAttribute("authenticatedUser") User user) {
        authenticationUserService.deleteUser(user.getId());
        return new Response("User deleted successfully.");
    }

    @GetMapping("/user")
    public User getUser(@RequestAttribute("authenticatedUser") User user) {
        return user;
    }

    @PutMapping("/validate-email-verification-token")
    public Response verifyEmail(@RequestParam String token, @RequestAttribute("authenticatedUser") User user) {
        authenticationUserService.validateEmailVerificationToken(token, user.getEmail());
        return new Response("Email verified successfully.");
    }

    @GetMapping("/send-email-verification-token")
    public Response sendEmailVerificationToken(@RequestAttribute("authenticatedUser") User user) {
        authenticationUserService.sendEmailVerificationToken(user.getEmail());
        return new Response("Email verification token sent successfully.");
    }

    @PutMapping("/send-password-reset-token")
    public Response sendPasswordResetToken(@RequestParam String email) {
        authenticationUserService.sendPasswordResetToken(email);
        return new Response("Password reset token sent successfully.");
    }

    @PutMapping("/reset-password")
    public Response resetPassword(@RequestParam String newPassword, @RequestParam String token, @RequestParam String email) {
        authenticationUserService.resetPassword(email, newPassword, token);
        return new Response("Password reset successfully.");
    }

    @PutMapping("/profile/{id}")
    public User updateUserProfile(
            @RequestAttribute("authenticatedUser") User user,
            @PathVariable Long id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String location,
             @RequestParam(required = false) String profilePicture) {

        if (!user.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission to update this profile.");
        }

        return authenticationUserService.updateUserProfile(id, firstName, lastName, company, position, location, profilePicture);
    }


    @GetMapping("/users")
    public List<User> getUsersWithoutAuthenticated(@RequestAttribute("authenticatedUser") User user) {
        return authenticationUserService.getUsersWithoutAuthenticated(user);
    }
}