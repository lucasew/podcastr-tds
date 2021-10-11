package com.lucaoenterprise.podcastr.model.db;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.net.URL;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class EpisodeModel implements Serializable {
    @Column(unique = true, nullable = false)
    @NotEmpty
    @Size(min = 5)
    @Id
    private String guid;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private URL mp3url;

    @Column(nullable = false)
    private Date pubDate;

    @Column(nullable = false)
    @Min(1)
    private int duration;

    @OneToMany
    private List<ListenedModel> listeners;

    @ManyToOne
    @NotNull
    private PodcastModel podcast;
}
