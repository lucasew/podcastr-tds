package com.lucaoenterprise.podcastr.model.error;

public class UserNotFound extends Exception {
    public UserNotFound() {
        super("User not found");
    }
}
