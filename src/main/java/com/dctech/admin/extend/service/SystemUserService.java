package com.dctech.admin.extend.service;

import org.springframework.data.domain.Page;

import com.dctech.admin.extend.model.SystemUser;

public interface SystemUserService {

	Page<SystemUser> getPageList(SystemUser systemUser);

	Page<SystemUser> getPageListByAccountOrUserId(SystemUser systemUser);
}
