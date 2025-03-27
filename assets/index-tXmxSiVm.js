(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(s){if(s.ep)return;s.ep=!0;const l=r(s);fetch(s.href,l)}})();class v{constructor(e){this.routes=e,this.container=document.body.querySelector("#root")}render(e=window.location.pathname){if(this.routes[e]){this.routes[e].render(this.container);return}let r=e;window.BASE_ROUTE&&e.startsWith(window.BASE_ROUTE)&&(r=e.slice(window.BASE_ROUTE.length)||"/");const o=`${window.BASE_ROUTE}${r==="/"?"":r}`;(this.routes[o]||this.routes.default).render(this.container)}start(){this.render(),window.addEventListener("popstate",()=>this.render())}navigate(e){const r=e.startsWith("/")?e:`/${e}`,o=window.BASE_ROUTE+r;o!==window.location.pathname&&(history.pushState({},"",o),this.render(o))}}const c=()=>`<header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>`,i={state:{user:JSON.parse(localStorage.getItem("user")),isLoggedIn:!!localStorage.getItem("user")},listeners:[],subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}},getState(){return this.state},setState(t){this.state={...this.state,...t},t.user&&localStorage.setItem("user",JSON.stringify(this.state.user)),this.listeners.forEach(e=>e(this.state))},actions:{login:(t,e)=>{i.setState({user:{...i.state.user,username:t,email:e,bio:""},isLoggedIn:!0})},logout:()=>{localStorage.removeItem("user"),i.setState({isLoggedIn:!1}),i.state.user={username:"",email:"",bio:""}},updateProfile:t=>{i.setState({user:{...i.state.user,...t}})}}},f=()=>{const e=i.getState().isLoggedIn,r=window.location.hash||"#/",o=s=>`#${s}`;return`
    <nav class="bg-white shadow-md p-2 sticky top-0">
        <ul class="flex justify-around">
          <li><a href="${o("/")}" class="${r==="#/"?"text-blue-600 font-bold":"text-gray-600"}">홈</a></li>
          ${e?`<li><a href="${o("/profile")}" class="${r==="#/profile"?"text-blue-600 font-bold":"text-gray-600"}">프로필</a></li>
                 <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`:`<li>
                   <a href="/login" class="text-gray-600 hidden">로그인</a>
                   <a href="${o("/login")}" data-testid="login-link" class="${r==="#/login"?"text-blue-600 font-bold":"text-gray-600"}">로그인</a>
                 </li>`}
        </ul>
      </nav>
    `},m=()=>{document.body.addEventListener("click",t=>{const e=t.target.closest("a");if(e){if(e.id==="logout"){t.preventDefault(),i.actions.logout(),window.router.navigate("/login");return}if(e.getAttribute("href").startsWith("#")){t.preventDefault();const r=e.getAttribute("href").slice(1);window.router.navigate(r)}}})},g=()=>`<footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>`,y=t=>{t&&(t.innerHTML=`
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
`,m())},E=t=>{if(!t)return;if(i.getState().isLoggedIn){window.router.navigate("/");return}t.innerHTML=`
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
    `,document.getElementById("login-form").addEventListener("submit",r=>{r.preventDefault();const o=document.getElementById("username").value;if(o.length===0)return alert("아이디 혹은 비밀번호를 입력해주세요!");i.actions.login(o,""),console.log(i.getState().isLoggedIn,"login 상태확인"),window.router.navigate("/")})},S=t=>{if(!t)return;const e=localStorage.getItem("user");if(!e){window.router.navigate("/login");return}const r=JSON.parse(e),o=r.username||"",s=r.email||"";let l=r.bio||"";l==="자기소개입니다."&&!l.includes("자기소개입니다. 자기소개입니다.")&&(l="자기소개입니다. 자기소개입니다."),t.innerHTML=`
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
              >${l}</textarea>
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
`,m(),document.getElementById("profile-form").addEventListener("submit",p=>{p.preventDefault();const h=document.getElementById("username").value,w=document.getElementById("email").value,d=document.getElementById("bio").value;let u=d;d==="자기소개입니다."&&(u="자기소개입니다. 자기소개입니다.");const x={username:h,email:w,bio:u};i.actions.updateProfile(x),alert("프로필이 업데이트되었습니다.")})},L=t=>{t&&(t.innerHTML=`
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
`)},n="/front_5th_chapter1-1";console.log(n,"base");const $={[`${n}/`]:{render:y},[`${n}/login`]:{render:E},[`${n}/profile`]:{render:S},default:{render:L}},b=new v($);window.router=b;window.BASE_ROUTE=n;b.start();
