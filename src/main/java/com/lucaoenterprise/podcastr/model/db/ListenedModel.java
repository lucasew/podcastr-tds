package com.lucaoenterprise.podcastr.model.db;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
public class ListenedModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private int position = 0;

    @Column
    private boolean isListened = true;
    @Column
    private Date lastActivity = new Date();

    @ManyToOne
    private UserModel user;

    @ManyToOne
    private EpisodeModel episode;
}
