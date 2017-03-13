package com.dctech.base.repositories;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dctech.base.model.Role;

public interface RoleRepository extends JpaRepository<Role, Serializable>
{

}
