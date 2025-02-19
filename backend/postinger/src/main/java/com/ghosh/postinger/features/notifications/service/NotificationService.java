package com.ghosh.postinger.features.notifications.service;

import com.ghosh.postinger.features.notifications.repository.NotificationRepository;
import com.ghosh.postinger.features.notifications.model.NotificationType;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.ghosh.postinger.features.authentication.model.User;
import com.ghosh.postinger.features.feed.model.Comment;
import com.ghosh.postinger.features.notifications.model.Notification;
import java.util.List;
import java.util.Set;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(NotificationRepository notificationRepository, SimpMessagingTemplate messagingTemplate) {
        this.notificationRepository = notificationRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findByRecipientOrderByCreationDateDesc(user);
    }

    public void sendLikeToPost(Long postId, Set<User> likes) {
        messagingTemplate.convertAndSend("/topic/likes/" + postId, likes);
    }

    public void sendCommentToPost(Long postId, Comment comment) {
        messagingTemplate.convertAndSend("/topic/comments/" + postId, comment);
    }

    public void sendDeleteCommentToPost(Long postId, Comment comment) {
        messagingTemplate.convertAndSend("/topic/comments/" + postId + "/delete", comment);
    }

    public void sendCommentNotification(User author, User recipient, Long resourceId) {
        if (author.getId().equals(recipient.getId())) {
            return;
        }

        Notification notification = new Notification(
                author,
                recipient,
                NotificationType.COMMENT,
                resourceId
        );
        notificationRepository.save(notification);

        messagingTemplate.convertAndSend("/topic/users/" + recipient.getId() + "/notifications", notification);
    }


    public void sendLikeNotification(User author, User recipient, Long resourceId) {
        if (author.getId().equals(recipient.getId())) {
            return;
        }

        Notification notification = new Notification(
                author,
                recipient,
                NotificationType.LIKE,
                resourceId
        );
        notificationRepository.save(notification);

        messagingTemplate.convertAndSend("/topic/users/" + recipient.getId() + "/notifications", notification);
    }

    public Notification markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        notification.setRead(true);
        messagingTemplate.convertAndSend("/topic/users/" + notification.getRecipient().getId() + "/notifications", notification);
        return notificationRepository.save(notification);
    }


//    public void sendConversationToUsers(Long senderId, Long receiverId, Conversation conversation) {
//        messagingTemplate.convertAndSend("/topic/users/" + senderId + "/conversations", conversation);
//        messagingTemplate.convertAndSend("/topic/users/" + receiverId + "/conversations", conversation);
//    }
//
//
//    public void sendMessageToConversation(Long conversationId, Message message) {
//        messagingTemplate.convertAndSend("/topic/conversations/" + conversationId + "/messages", message);
//    }

}

