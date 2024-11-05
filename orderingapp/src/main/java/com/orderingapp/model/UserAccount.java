package com.orderingapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.orderingapp.validation.group.Create;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
// import jakarta.validation.constraints.NotNull;
// import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public abstract class UserAccount extends BaseEntity implements UserDetails {

    @NotEmpty
    protected String firstName;

    @NotEmpty
    protected String lastName;

    @Email
    protected String email;

    @NotEmpty(groups = Create.class)
    protected String password;

    protected LocalDate birthDate;

    protected String phoneNumber;

    @JsonIgnore
    @Transient
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @JsonIgnore
    @Transient
    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Transient
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Transient
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Transient
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Transient
    @Override
    public boolean isEnabled() {
        return true;
    }

}