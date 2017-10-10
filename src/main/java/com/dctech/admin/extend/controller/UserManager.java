package com.dctech.admin.extend.controller;

import java.sql.Timestamp;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.dctech.admin.extend.dao.SystemUserRepository;
import com.dctech.admin.extend.model.SystemUser;
import com.dctech.admin.extend.service.SystemUserService;
import com.dctech.base.web.webEntities.JsonHolder;

@Controller
@RequestMapping
public class UserManager {
	
	@Autowired
	SystemUserRepository systemUserRepository;
	
	@Autowired
	SystemUserService systemUserService;

	String index(){
		
		
		return "/admin/userManager";
	}
	@RequestMapping("/userSearch")
	public String userSearch(@ModelAttribute("msg") String msg,SystemUser systemUser,Model model){

		Page<SystemUser> systemUserPage = systemUserService.getPageList(systemUser);

		model.addAttribute("userList", systemUserPage.getContent());
		model.addAttribute("msg", msg);
		return "/admin/userManager";
	}
	
	@RequestMapping("/systemUserSave")
	public String userSave(SystemUser user,  RedirectAttributes redirectAttributes){
		String msg ="";
		Page<SystemUser> userPage = systemUserService.getPageListByAccountOrUserId(user);
		if(userPage.getContent().size()==0){
			user.setIsBind(1);
			user.setCreatetime( new Timestamp( Calendar.getInstance().getTime().getTime()));
			user.setCustomerId(43);
			user.setIsLoginApp(1);
			user.setIsvalid(1);
			user.setPassWord("oh no");
		   systemUserRepository.save(user);
		}else{
			msg="用户Id或手机号已存在！";
			redirectAttributes.addFlashAttribute("msg", msg);
		}
	 
		return "redirect:userSearch";
	}
	@RequestMapping("/systemUserSaveIndex")
	public String userSaveIndex(SystemUser user){
		return "/admin/systemUserSave";
	}
	@RequestMapping("/updateAccount")
	@ResponseBody
	public JsonHolder updateAccount(SystemUser user,  RedirectAttributes redirectAttributes){
		String msg ="bind 成功";
		SystemUser userdb = systemUserRepository.findOne(user.getId());
		userdb.setAccount(user.getAccount());
		userdb.setCreatetime( new Timestamp( Calendar.getInstance().getTime().getTime()));
		 systemUserRepository.save(userdb);
		 JsonHolder jh = new JsonHolder(msg);
		return jh;
	}
	
	@RequestMapping("/deleteAccount")
	@ResponseBody
	public JsonHolder deleteAccount(SystemUser user,  RedirectAttributes redirectAttributes){
		String msg ="删除 成功";
	 
	 
		 systemUserRepository.delete(user.getId());
		 JsonHolder jh = new JsonHolder(msg);
		return jh;
	}
}
