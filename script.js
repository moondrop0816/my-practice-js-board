// ** 선언
const postsContainer = document.querySelector(".posts__container");
// 로컬스토리지에 저장된 데이터가 있으면 파싱해서 가져오고 그렇지 않으면 data.js의 데이터를 가져온다
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
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 1;
    to = data.length - 1;
  }

  // 리렌더링시 모든 게시글 데이터 삭제
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  for (let i = from; i < to; i += 1) {
    element.append(convertToBoard(data[i]));
  }
};

// 페이지네이션
let limit = 10; // 한 페이지에 글은 10개까지만
let page = 1;

render(postsContainer, 0, limit);

const getPageStartEnd = (limit, page) => {
  const len = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  // 한 페이지에 나타날 글 중 첫번째 글의 인덱스
  let pageEnd = Number(pageStart) + Number(limit);
  // 한 페이지에 나타날 글 중 마지막 글의 인덱스
  if (page <= 0) {
    pageStart = 0; // 0이거나 음수이면 첫번째 글부터
  }
  if (pageEnd >= len) {
    pageEnd = len; // 마지막 인덱스까지만 보이게 함
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    // 페이지가 1보다 크면 = 첫페이지가 아니라면
    page = page - 1; // 한페이지씩 감소(=뒤로가기)
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(postsContainer, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    // 보여진 글의 개수가 전체 글의 개수보다 작다면
    page = page + 1; // 한 페이지씩 증가
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(postsContainer, pageStart, pageEnd);
});

buttons.children[2].addEventListener("click", () => {
  // 로컬스토리지의 데이터 초기화 하고 페이지도 초기상태로 되돌림
  localStorage.removeItem("boardData");
  data = boardData.slice();
  limit = 10;
  page = 1;
  render(postsContainer, 0, limit);
});

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
