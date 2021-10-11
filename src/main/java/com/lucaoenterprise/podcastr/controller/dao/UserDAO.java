package com.lucaoenterprise.podcastr.controller.dao;

import com.lucaoenterprise.podcastr.model.db.UserModel;
import com.lucaoenterprise.podcastr.model.error.UserNotFound;
import org.apache.catalina.User;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

@Component
public class UserDAO {
    public UserDAO() {}

    @Autowired
    EntityManager em;
    public Optional<UserModel> getById(Long id) {
        Query q = em.createQuery("select u from UserModel u where u.id = :id");
        q.setParameter("id", id);
        List<UserModel> l = q.getResultList();
        if (l.size() == 0) {
            return Optional.empty();
        }
        return Optional.of(l.get(0));
    }
    public Optional<UserModel> getByName(String name) {
        Query q = em.createQuery("select u from UserModel u where u.username = :name");
        q.setParameter("name", name);
        List<UserModel> l = q.getResultList();
        if (l.size() == 0) {
            return Optional.empty();
        }
        return Optional.of(l.get(0));
    }
}
