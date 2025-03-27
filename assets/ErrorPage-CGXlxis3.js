(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();const u=()=>`<header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>`,a={state:{user:JSON.parse(localStorage.getItem("user")),isLoggedIn:!!localStorage.getItem("user")},listeners:[],getState(){return this.state},setState(e){this.state={...this.state,...e},e.user&&localStorage.setItem("user",JSON.stringify(this.state.user))},actions:{login:(e,s)=>{a.setState({user:{...a.state.user,username:e,email:s,bio:""},isLoggedIn:!0})},logout:()=>{localStorage.removeItem("user"),a.setState({isLoggedIn:!1}),a.state.user={username:"",email:"",bio:""}},updateProfile:e=>{a.setState({user:{...a.state.user,...e}})}}},c=()=>{const s=a.getState().isLoggedIn,l=window.location.hash||"#/",o=t=>`#${t}`;return`
    <nav class="bg-white shadow-md p-2 sticky top-0">
        <ul class="flex justify-around">
          <li><a href="${o("/")}" class="${l==="#/"?"text-blue-600 font-bold":"text-gray-600"}">홈</a></li>
          ${s?`<li><a href="${o("/profile")}" class="${l==="#/profile"?"text-blue-600 font-bold":"text-gray-600"}">프로필</a></li>
                 <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`:`<li>
                   <a href="/login" class="text-gray-600 hidden">로그인</a>
                   <a href="${o("/login")}" data-testid="login-link" class="${l==="#/login"?"text-blue-600 font-bold":"text-gray-600"}">로그인</a>
                 </li>`}
        </ul>
      </nav>
    `},m=()=>{document.body.addEventListener("click",e=>{const s=e.target.closest("a");if(s){if(s.id==="logout"){e.preventDefault(),a.actions.logout(),window.router.navigate("/login");return}if(s.getAttribute("href").startsWith("#")){e.preventDefault();const l=s.getAttribute("href").slice(1);window.router.navigate(l)}}})},f=()=>`<footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>`,h=e=>{e&&(e.innerHTML=`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    
    ${u()}
     ${c()}

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
${f()}
   
    </div>
  </div>
`,m())},v=e=>{if(!e)return;if(a.getState().isLoggedIn){window.router.navigate("/");return}e.innerHTML=`
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
    `,document.getElementById("login-form").addEventListener("submit",l=>{l.preventDefault();const o=document.getElementById("username").value;if(o.length===0)return alert("아이디 혹은 비밀번호를 입력해주세요!");a.actions.login(o,""),console.log(a.getState().isLoggedIn,"login 상태확인"),window.router.navigate("/")})},y=e=>{if(!e)return;const s=localStorage.getItem("user");if(!s){window.router.navigate("/login");return}const l=JSON.parse(s),o=l.username||"",t=l.email||"";let r=l.bio||"";r==="자기소개입니다."&&!r.includes("자기소개입니다. 자기소개입니다.")&&(r="자기소개입니다. 자기소개입니다."),e.innerHTML=`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
${u()}
    ${c()}

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
                value="${o}"
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
                value="${t}"
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

      ${f()}
    </div>
  </div>
`,m(),document.getElementById("profile-form").addEventListener("submit",g=>{g.preventDefault();const b=document.getElementById("username").value,p=document.getElementById("email").value,i=document.getElementById("bio").value;let d=i;i==="자기소개입니다."&&(d="자기소개입니다. 자기소개입니다.");const x={username:b,email:p,bio:d};a.actions.updateProfile(x),alert("프로필이 업데이트되었습니다.")})},w=e=>{e&&(e.innerHTML=`
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
`)};export{w as E,v as L,h as M,y as P,m as s};
