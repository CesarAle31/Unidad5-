package org.cesar;

public record Customer(
        Long customerId,
        String emailAddress,
        String fullName) {
}
