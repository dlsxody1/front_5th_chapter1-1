(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();class y{constructor(t){this.routes=t,this.container=document.body.querySelector("#root")}render(t=window.location.pathname){(this.routes[t]||this.routes.default).render(this.container)}start(){this.render(),window.addEventListener("popstate",()=>this.render())}navigate(t){t!==window.location.pathname&&(history.pushState({},"",t),this.render(t))}}const c=()=>`<header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>`,l={state:{user:JSON.parse(localStorage.getItem("user")),isLoggedIn:!!localStorage.getItem("user")},listeners:[],subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}},getState(){return this.state},setState(e){this.state={...this.state,...e},e.user&&localStorage.setItem("user",JSON.stringify(this.state.user)),this.listeners.forEach(t=>t(this.state))},actions:{login:(e,t)=>{l.setState({user:{...l.state.user,username:e,email:t,bio:""},isLoggedIn:!0})},logout:()=>{localStorage.removeItem("user"),l.setState({isLoggedIn:!1}),l.state.user={username:"",email:"",bio:""}},updateProfile:e=>{l.setState({user:{...l.state.user,...e}})}}},f=()=>{const t=l.getState().isLoggedIn,o=window.location.hash||"#/",a=s=>`#${s}`;return`
    <nav class="bg-white shadow-md p-2 sticky top-0">
        <ul class="flex justify-around">
          <li><a href="${a("/")}" class="${o==="#/"?"text-blue-600 font-bold":"text-gray-600"}">홈</a></li>
          ${t?`<li><a href="${a("/profile")}" class="${o==="#/profile"?"text-blue-600 font-bold":"text-gray-600"}">프로필</a></li>
                 <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`:`<li>
                   <a href="/login" class="text-gray-600 hidden">로그인</a>
                   <a href="${a("/login")}" data-testid="login-link" class="${o==="#/login"?"text-blue-600 font-bold":"text-gray-600"}">로그인</a>
                 </li>`}
        </ul>
      </nav>
    `},m=()=>{document.body.addEventListener("click",e=>{const t=e.target.closest("a");if(t){if(t.id==="logout"){e.preventDefault(),l.actions.logout(),window.router.navigate("/login");return}if(t.getAttribute("href").startsWith("#")){e.preventDefault();const o=t.getAttribute("href").slice(1);window.router.navigate(o)}}})},g=()=>`<footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>`,L=e=>{e&&(e.innerHTML=`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    
    ${c()}
     ${f()}

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">홍길동</p>
                <p class="text-sm text-gray-500">5분 전</p>
              </div>
            </div>
            <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <!-- 다른 게시물들... 간략화를 위해 생략 -->
        </div>
      </main>
${g()}
   
    </div>
  </div>
`,m())},S=e=>{if(!e)return;if(l.getState().isLoggedIn){window.router.navigate("/");return}e.innerHTML=`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
        <div class="mt-4 text-center">
          <a href="/" class="text-blue-600">홈으로 돌아가기</a>
        </div>
      </div>
    </main>
    `,document.getElementById("login-form").addEventListener("submit",o=>{o.preventDefault();const a=document.getElementById("username").value;if(a.length===0)return alert("아이디 혹은 비밀번호를 입력해주세요!");l.actions.login(a,""),console.log(l.getState().isLoggedIn,"login 상태확인"),window.router.navigate("/")})},I=e=>{if(!e)return;const t=localStorage.getItem("user");if(!t){window.router.navigate("/login");return}const o=JSON.parse(t),a=o.username||"",s=o.email||"";let r=o.bio||"";r==="자기소개입니다."&&!r.includes("자기소개입니다. 자기소개입니다.")&&(r="자기소개입니다. 자기소개입니다."),e.innerHTML=`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
${c()}
    ${f()}

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
            내 프로필
          </h2>
          <form id="profile-form">
            <div class="mb-4">
              <label
                for="username"
                class="block text-gray-700 text-sm font-bold mb-2"
                >사용자 이름</label
              >
              <input
                type="text"
                id="username"
                name="username"
                value="${a}"
                class="w-full p-2 border rounded"
                aria-label="사용자 이름"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-bold mb-2"
                >이메일</label
              >
              <input
                type="email"
                id="email"
                name="email"
                value="${s}"
                class="w-full p-2 border rounded"
                aria-label="이메일"
              />
            </div>
            <div class="mb-6">
              <label
                for="bio"
                class="block text-gray-700 text-sm font-bold mb-2"
                >자기소개</label
              >
              <textarea
                id="bio"
                name="bio"
                rows="4"
                class="w-full p-2 border rounded"
                aria-label="자기소개"
              >${r}</textarea>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
            >
              프로필 업데이트
            </button>
          </form>
        </div>
      </main>

      ${g()}
    </div>
  </div>
`,m(),document.getElementById("profile-form").addEventListener("submit",h=>{h.preventDefault();const x=document.getElementById("username").value,v=document.getElementById("email").value,d=document.getElementById("bio").value;let u=d;d==="자기소개입니다."&&(u="자기소개입니다. 자기소개입니다.");const w={username:x,email:v,bio:u};l.actions.updateProfile(w),alert("프로필이 업데이트되었습니다.")})},$=e=>{e&&(e.innerHTML=`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`)},b="/front_5th_chapter1-1",i=e=>`${b}${e}`,E={[i("/")]:{render:L},[i("/login")]:{render:S},[i("/profile")]:{render:I},default:{render:$}},p=new y(E);window.router=p;window.BASE_ROUTE=b;p.start();
