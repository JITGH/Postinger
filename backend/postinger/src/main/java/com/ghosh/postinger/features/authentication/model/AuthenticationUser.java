package com.ghosh.postinger.features.authentication.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.ghosh.postinger.features.feed.model.Post;
//import com.ghosh.postinger.features.messaging.model.Conversation;
//import com.ghosh.postinger.backend.features.notifications.model.Notification;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "users")
public class AuthenticationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Email
    @Column(unique = true)
    private String email;
    private Boolean emailVerified = false;
    private String emailVerificationToken = null;
    private LocalDateTime emailVerificationTokenExpiryDate = null;
    @JsonIgnore
    private String password;
    private String passwordResetToken = null;
    private LocalDateTime passwordResetTokenExpiryDate = null;

    private String firstName = null;
    private String lastName = null;
    private String company = null;
    private String position = null;
    private String location = null;
    private String profilePicture = null;
    private Boolean profileComplete = false;


//    @JsonIgnore
//    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Notification> receivedNotifications;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "actor", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Notification> actedNotifications;
//
    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;
//
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Conversation> conversationsAsAuthor;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Conversation> conversationsAsRecipient;


    public AuthenticationUser(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public AuthenticationUser() {
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getEmail() {
        return email;
    }

    public String getEmailVerificationToken() {
        return emailVerificationToken;
    }

    public void setEmailVerificationToken(String emailVerificationToken) {
        this.emailVerificationToken = emailVerificationToken;
    }

    public LocalDateTime getEmailVerificationTokenExpiryDate() {
        return emailVerificationTokenExpiryDate;
    }

    public void setEmailVerificationTokenExpiryDate(LocalDateTime emailVerificationTokenExpiryDate) {
        this.emailVerificationTokenExpiryDate = emailVerificationTokenExpiryDate;
    }

    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    public LocalDateTime getPasswordResetTokenExpiryDate() {
        return passwordResetTokenExpiryDate;
    }

    public void setPasswordResetTokenExpiryDate(LocalDateTime passwordResetTokenExpiryDate) {
        this.passwordResetTokenExpiryDate = passwordResetTokenExpiryDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
        updateProfileCompletionStatus();
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        updateProfileCompletionStatus();
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
        updateProfileCompletionStatus();
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
        updateProfileCompletionStatus();
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public void updateProfileCompletionStatus() {
        this.profileComplete = (this.firstName != null && this.lastName != null && this.company != null && this.position != null && this.location != null);
    }

    public Boolean getProfileComplete() {
        return profileComplete;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

//    public List<Notification> getReceivedNotifications() {
//        return receivedNotifications;
//    }
//
//    public void setReceivedNotifications(List<Notification> receivedNotifications) {
//        this.receivedNotifications = receivedNotifications;
//    }
//
//    public List<Notification> getActedNotifications() {
//        return actedNotifications;
//    }
//
//    public void setActedNotifications(List<Notification> actedNotifications) {
//        this.actedNotifications = actedNotifications;
//    }
//
//    public List<Conversation> getConversationsAsAuthor() {
//        return conversationsAsAuthor;
//    }
//
//    public void setConversationsAsAuthor(List<Conversation> conversationsAsAuthor) {
//        this.conversationsAsAuthor = conversationsAsAuthor;
//    }
//
//    public List<Conversation> getConversationsAsRecipient() {
//        return conversationsAsRecipient;
//    }
//
//    public void setConversationsAsRecipient(List<Conversation> conversationsAsRecipient) {
//        this.conversationsAsRecipient = conversationsAsRecipient;
//    }
}