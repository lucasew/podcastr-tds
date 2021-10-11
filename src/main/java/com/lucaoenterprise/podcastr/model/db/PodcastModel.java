package com.lucaoenterprise.podcastr.model.db;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.net.URL;
import java.util.List;

@Data
@Entity
public class PodcastModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private URL feed;

    @Column()
    private URL homepage;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column
    private URL icon;

    @ManyToMany
    private List<UserModel> users;

    @OneToMany
    private List<ListenedModel> listened;

}
