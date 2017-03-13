/**
 * 
 */
package com.dctech.base.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Siva
 *
 */
@Entity
@Table(name = "ROLES")
public class Role implements Serializable
{
	private static final long serialVersionUID = 1L;

	private Integer id;

	private String roleName;
	
	public Role() {
	}
	
	public Role(String roleName) {
		this.roleName = roleName;
	}
	public Role(Integer id, String roleName) {
		this.id = id;
		this.roleName = roleName;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(nullable=false)
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
