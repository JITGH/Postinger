package com.ghosh.postinger.features.notifications.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.ghosh.postinger.features.authentication.model.User;
import com.ghosh.postinger.features.notifications.model.Notification;
public interface NotificationRepository extends JpaRepository <Notification,Long>{
    List<Notification> findByRecipient(User recipient);
    List<Notification> findByRecipientOrderByCreationDateDesc(User user);
}
