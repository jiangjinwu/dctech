package com.dctech.admin.extend.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dctech.admin.extend.dao.SystemUserRepository;
import com.dctech.admin.extend.model.SystemUser;

@Service
public class SystemUserServiceImpl implements SystemUserService {

	@Autowired
	SystemUserRepository repository;
	
	@Override
	public Page<SystemUser> getPageList(SystemUser systemUser) {
		 
      PageRequest pageRequest = new PageRequest(0, 10);
		
		Specification specification = new Specification<SystemUser> () {  
			@Override
			   public Predicate toPredicate(Root<SystemUser> root,  
			    CriteriaQuery<?> query, CriteriaBuilder builder) {  
			   
				List<Predicate> predicateList= new  ArrayList<Predicate>();
				
				if(!StringUtils.isEmpty(systemUser.getAccount())){
					   Predicate p1 = builder.equal(root.get("account"), systemUser.getAccount());  
					    predicateList.add(builder.or(p1));  
				}
				if(!StringUtils.isEmpty(systemUser.getUser_id())){
					 Predicate p2 = builder.equal((Path)root.get("user_id"), systemUser.getUser_id());  
		                predicateList.add(p2);
				}
			 
				 Predicate p3 = builder.equal((Path)root.get("customerId"), 43);  
	             predicateList.add(builder.and(p3));
	             
                query.where(predicateList.toArray(new Predicate[]{} ));
			    return query.getRestriction();
			   }
			  };
		
		
		return repository.findAll(specification, pageRequest);
	}

	@Override
	public Page<SystemUser> getPageListByAccountOrUserId(SystemUser systemUser) {
		 PageRequest pageRequest = new PageRequest(0, 10);
			
			Specification specification = new Specification<SystemUser> () {  
				@Override
				   public Predicate toPredicate(Root<SystemUser> root,  
				    CriteriaQuery<?> query, CriteriaBuilder builder) {  
				   
					List<Predicate> predicateList= new  ArrayList<Predicate>();
					if(!StringUtils.isEmpty(systemUser.getAccount()) && !StringUtils.isEmpty(systemUser.getUser_id())){
						  Predicate p1 = builder.equal(root.get("account"), systemUser.getAccount());  
						  
						    Predicate p2 = builder.equal((Path)root.get("user_id"), systemUser.getUser_id());  
			         
			                
			                builder.or(p1,p2);
			                query.where( builder.or(p1,p2));
						    return query.getRestriction();
					}else if(!StringUtils.isEmpty(systemUser.getAccount())){
						   Predicate p1 = builder.equal(root.get("account"), systemUser.getAccount());  
						    predicateList.add(builder.or(p1));  
					}
					else if(!StringUtils.isEmpty(systemUser.getUser_id())){
						 Predicate p2 = builder.equal((Path)root.get("user_id"), systemUser.getUser_id());  
			                predicateList.add(builder.or(p2));
			          
					}
				 
					 Predicate p3 = builder.equal((Path)root.get("customerId"), systemUser.getCustomerId());  
		             predicateList.add(builder.and(p3));
		             
	                query.where(predicateList.toArray(new Predicate[]{} ));
				    return query.getRestriction();
				   }
				  };
			
			
			return repository.findAll(specification, pageRequest);
	}

	
	
}
