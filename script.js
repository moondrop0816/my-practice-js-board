// ** 선언
const postsContainer = document.querySelector(".posts__container");
let data = localStorage.getItem("boardData")
  ? JSON.parse(localStorage.getItem("boardData"))
  : boardData;

// 데이터를 dom으로 바꾸기
const convertToBoard = (obj) => {
  const li = document.createElement("li"); // li 생성
  li.className = "post__container";

  const postContentTop = document.createElement("div");
  postContentTop.className = "post__content--top";

  const postAvatarWrapper = document.createElement("div");
  postAvatarWrapper.className = "post__avatar--wrapper";

  const postAvatarImg = document.createElement("img");
  postAvatarImg.src = obj.avatarUrl;
  postAvatarImg.alt = `avatar of ${obj.author}`;
  postAvatarWrapper.append(postAvatarImg);

  const postTitleWrapper = document.createElement("div");
  postTitleWrapper.className = "post__title--wrapper";

  const postTitle = document.createElement("div");
  postTitle.className = "post__title";

  const postTitleH2 = document.createElement("h2");

  postTitleH2.textContent = obj.title;
  postTitle.append(postTitleH2);

  const postInformation = document.createElement("div");
  postInformation.className = "post__information";
  postInformation.textContent = `${obj.author} | ${new Date(
    obj.createdAt
  ).toLocaleString()}`;

  postTitleWrapper.append(postTitle, postInformation);

  postContentTop.append(postAvatarWrapper, postTitleWrapper);

  const postContent = document.createElement("div");
  postContent.className = "post__content";
  postContent.textContent = obj.body;

  li.append(postContentTop, postContent);

  return li;
};

// 배열의 데이터 렌더링하기
const render = (element) => {
  // 리렌더링시 모든 게시글 데이터 삭제
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  for (let i = 0; i < data.length; i++) {
    element.append(convertToBoard(data[i]));
  }
};

render(postsContainer);

// 게시글 추가기능
// 게시글 정보 가져오기
const postform = document.querySelector(".form.post");
const postAuther = document.querySelector("#postAuther");
const postTitle = document.querySelector("#postTitle");
const postContent = document.querySelector("#postContent");
postform.addEventListener("submit", (event) => {
  event.preventDefault(); // 기본 이벤트 발생
  const obj = {
    id: 0,
    createdAt: new Date().toISOString(),
    title: postTitle.value,
    author: postAuther.value,
    body: postContent.value,
    avatarUrl: "http://dummyimage.com/205x100.png/ff4444/ffffff",
    reply: false,
  };

  data.unshift(obj); // 데이터를 최신순으로 정렬
  localStorage.setItem("boardData", JSON.stringify(data));
  render(postsContainer);

  // 추가시 입력창 초기화
  postAuther.value = "";
  postTitle.value = "";
  postContent.value = "";
});
