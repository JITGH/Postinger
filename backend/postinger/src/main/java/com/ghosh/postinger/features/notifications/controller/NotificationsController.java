package com.ghosh.postinger.features.notifications.controller;



import org.springframework.web.bind.annotation.*;

import com.ghosh.postinger.features.authentication.model.User;
import com.ghosh.postinger.features.notifications.model.Notification;
import com.ghosh.postinger.features.notifications.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationsController {
    private final NotificationService notificationService;

    public NotificationsController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getUserNotifications(@RequestAttribute("authenticatedUser") User user) {
        return notificationService.getUserNotifications(user);
    }

    @PutMapping("/{notificationId}")
    public Notification markNotificationAsRead(@PathVariable Long notificationId) {
        return notificationService.markNotificationAsRead(notificationId);
    }
}
