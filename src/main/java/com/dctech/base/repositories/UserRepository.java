package com.dctech.base.repositories;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dctech.base.model.User;

public interface UserRepository extends JpaRepository<User, Serializable>{

	@Query("select u from User u where u.email=?1 and u.password=?2")
	User login(String email, String password);

	User findByEmailAndPassword(String email, String password);

	User findUserByEmail(String email);
	
	@Query("select u from User u where u.email=?1 or u.phone=?1")
	User findUserByEmailOrPhone(String email);
	
	User findUserByPhone(String phone);

}
