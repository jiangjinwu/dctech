package com.dctech.admin.extend.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.dctech.admin.extend.model.SystemUser;

public interface SystemUserRepository extends PagingAndSortingRepository<SystemUser, Integer> {

	List<SystemUser> getSystemUserByAccount(String account);
	
	Page<SystemUser> findAll(Specification<SystemUser> spec, Pageable pageable);
	
}
