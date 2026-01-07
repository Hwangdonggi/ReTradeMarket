(function () {
  const USERS_KEY = "retrade_users";
  const SESSION_KEY = "retrade_session";

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function setMsg(el, text, type = "info") {
    if (!el) return;
    el.textContent = text;
    el.dataset.type = type;
  }

  // 로그인 처리
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const msg = document.getElementById("loginMsg");
      const formData = new FormData(loginForm);
      const username = (formData.get("username") || "").toString().trim();
      const password = (formData.get("password") || "").toString();

      const users = loadUsers();
      const user = users.find((u) => u.username === username);

      if (!user) {
        setMsg(msg, "등록된 아이디가 없습니다. 회원가입을 진행해 주세요.", "error");
        return;
      }

      if (user.password !== password) {
        setMsg(msg, "비밀번호가 올바르지 않습니다.", "error");
        return;
      }

      // 세션 저장
      localStorage.setItem(SESSION_KEY, JSON.stringify({ username, loginAt: Date.now() }));
      setMsg(msg, "로그인 성공! 메인 페이지로 이동합니다.", "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 700);
    });
  }

  // 회원가입 처리
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const msg = document.getElementById("signupMsg");
      const formData = new FormData(signupForm);
      const username = (formData.get("username") || "").toString().trim();
      const password = (formData.get("password") || "").toString();
      const password2 = (formData.get("password2") || "").toString();

      if (username.length < 4) {
        setMsg(msg, "아이디는 4자 이상으로 입력해 주세요.", "error");
        return;
      }
      if (password.length < 4) {
        setMsg(msg, "비밀번호는 4자 이상으로 입력해 주세요.", "error");
        return;
      }
      if (password !== password2) {
        setMsg(msg, "비밀번호가 서로 일치하지 않습니다.", "error");
        return;
      }

      const users = loadUsers();
      const exists = users.some((u) => u.username === username);
      if (exists) {
        setMsg(msg, "이미 사용 중인 아이디입니다.", "error");
        return;
      }

      users.push({ username, password, createdAt: Date.now() });
      saveUsers(users);

      setMsg(msg, "회원가입 완료! 로그인 페이지로 이동합니다.", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 700);
    });
  }
})();
