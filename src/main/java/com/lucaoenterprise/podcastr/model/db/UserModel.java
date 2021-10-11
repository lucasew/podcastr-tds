package com.lucaoenterprise.podcastr.model.db;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
public class UserModel implements Serializable, UserDetails {
    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(unique = true)
    @NotNull
    @NotEmpty
    private String username;

    @Column
    private String password;

    @ManyToMany
    private List<ListenedModel> listened;

    @ManyToMany
    private List<PodcastModel> podcasts;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<String> l = new ArrayList<String>();
        l.add("USER");
        return l
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
