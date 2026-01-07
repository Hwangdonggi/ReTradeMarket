package com.example.retradeshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    // 메인 홈페이지
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "중고거래 사이트 ReTreadMarket");
        return "index"; // index.html
    }

    // 로그인 페이지
    @GetMapping("/login")
    public String loginPage() {
        return "login"; // login.html
    }

    // 로그인 처리 (일단 형식만)
    @PostMapping("/login")
    public String loginSubmit(String username, String password, Model model) {
        // TODO: 나중에 DB랑 연동해서 로그인 검증
        System.out.println("로그인 요청: " + username + " / " + password);
        model.addAttribute("message", "아직 로그인 기능은 구현 전입니다.");
        return "login";
    }

    // 회원가입 페이지
    @GetMapping("/register")
    public String registerPage() {
        return "register"; // register.html
    }

    // 회원가입 처리 (형식만)
    @PostMapping("/register")
    public String registerSubmit(
            String nickname,
            String username,
            String password,
            Model model
    ) {
        // TODO: 나중에 DB에 저장
        System.out.println("회원가입 요청: " + nickname + " / " + username);
        model.addAttribute("message", "아직 회원가입 기능은 구현 전입니다.");
        return "register";
    }
}
