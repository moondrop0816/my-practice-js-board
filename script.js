// ** 선언
const postsContainer = document.querySelector(".posts__container");

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
  const repliesCount = document.createElement("span");

  postTitleH2.textContent = obj.title;
  repliesCount.textContent = `[${obj.reply ? obj.reply.length : 0}]`;
  postTitle.append(postTitleH2, repliesCount);

  const postInformation = document.createElement("div");
  postInformation.className = "post__information";
  postInformation.textContent = `${obj.author} | ${obj.createdAt}`;

  postTitleWrapper.append(postTitle, postInformation);

  postContentTop.append(postAvatarWrapper, postTitleWrapper);

  const postContent = document.createElement("div");
  postContent.className = "post__content";
  postContent.textContent = obj.body;

  const repliesWrapper = document.createElement("div");
  repliesWrapper.className = "post__replies--wrapper";

  const repliesContainer = document.createElement("ul");
  repliesContainer.className = "post__replies--container";

  const reply = document.createElement("li");
  reply.className = "post__reply";

  const replyAuthor = document.createElement("p");
  replyAuthor.className = "post__reply--author";

  const replyContent = document.createElement("p");
  replyContent.className = "post__reply--content";

  reply.append(replyAuthor, replyContent);
  repliesContainer.append(reply);

  const replyFormContainer = document.createElement("div");
  replyFormContainer.className = "form__container--reply";

  const replyForm = document.createElement("form");
  replyForm.className = "form reply";
  replyForm.method = "get";

  const replyFormInputWrapper = document.createElement("div");
  replyFormInputWrapper.className = "form__input--wrapper";

  const replyFormInputName = document.createElement("div");
  replyFormInputName.className = "form__input__name";

  const replyFormInputAuthor = document.createElement("input");
  replyFormInputAuthor.type = "text";
  replyFormInputAuthor.name = "replyAuthor";
  replyFormInputAuthor.placeholder = "작성자";

  replyFormInputName.append(replyFormInputAuthor);

  const replyFormInputContent = document.createElement("div");
  replyFormInputContent.className = "form__input--content";

  const replyInputContent = document.createElement("textarea");
  replyInputContent.name = "replyContent";
  replyInputContent.placeholder = "내용을 입력해주세요";

  replyFormInputContent.append(replyInputContent);

  replyFormInputWrapper.append(replyFormInputName, replyFormInputContent);

  const replyFormSubmitWrapper = document.createElement("div");
  replyFormSubmitWrapper.className = "form__submit";

  const replyFormSubmit = document.createElement("input");
  replyFormSubmit.type = "submit";
  replyFormSubmit.value = "submit";

  replyFormSubmitWrapper.append(replyFormSubmit);
  replyForm.append(replyFormInputWrapper, replyFormSubmitWrapper);

  replyFormContainer.append(replyForm);
  repliesWrapper.append(replyFormContainer);

  li.append(postContentTop, postContent, repliesWrapper);

  return li;
};

// 배열의 데이터 렌더링하기
const render = (element) => {
  for (let i = 0; i < boardData.length; i++) {
    element.append(convertToBoard(boardData[i]));
  }

  return;
};

render(postsContainer);
// 게시글 추가기능
// 댓글 추가기능
// 댓글 작성시 게시글 제목 옆에 댓글 개수 등록됨
// 날짜 형식 지정
// 로컬스토리지 기능
// 페이지네이션 기능
