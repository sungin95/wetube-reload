/ -> Home
/join -> Join
/login -> Login
/search -> search

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

오류 해결
package.json scripts dev :저장후 자동 재시작이 안되서 "-L" 을 추가하였더니 되었다. 이전에 할 때는 없던 오류였는데 왜 갑자기 생겼는지 모르겠다. 그리고 저기에 주석을 달면 오류가 된다.
유용해 보이는 정보:
npm install -g --save-dev @babel/node 해당 명령어로 재설치 후에 실행하시면 에러 없이 될겁니다. 여기서 -g는 시스템 변수에 설치하려는 패키지를 추가한다 라는 옵션 명령어 입니다.
#2 정리
npm은 똑똑해서 package.json에
"dependencies": {
"express": "^4.18.1"
가 있다면 npm i 를 하면 자동으로 express까지 설치 해 준다.
scripts에 명령어를 추가 할 수 있다.
ex) "scripts": {
"dev": "nodemon -L --exec babel-node index.js"
},
#3.0 정리
express는 서버를 만들어 준다. listen를 사용하여 서버가 특정 채널에 소통 하도록 한다.
#3.2 정리
.get은 "/"에 들어가면 handleHome호출 + 응답이 있어야 하는데 없어서 무한 로딩
#3.3 정리
req, res를 사용하여 input, output을 정리 할 수 있다.
res.end 끝, res.send 서버에 메시지 호출.
#3.5 정리
req, res, next 이렇게 인자는 3개가 있다.
함수의 마지막이 next이면 다음 함수로 넘어 갈 수 있고, res.end or res.send 등 으로 하면 거기에서 다음 함수로 넘어 가지 않는다.
#3.6 정리
use를 사용하면 middleware을 모든 상황에 쓸 수 있다. 대신 순서는 ues => get순으로.
#3.11 정리 morgan
morgan은 사용할려면 npm i morgan으로 설치 후 import해 준다.
morgan은 5가지 기능이 있다. (각자 콜솔에 나오는 값이 다른데 무슨 차이 인지는 모르겠다. 여기서는 그중 "dev"를 사용하였다. )
morgan은 middleware로 use를 사용하여 나타내 주며니 된다.
#4.1 정리 Router
Router는 일종에 통로 비슷한 느낌이다.
http://localhost:4500/users/edit를 입력하면
app.use("/users", userRouter);를 통해 userRouter로 이동하고
userRouter.get("/edit", handleEditUser);를 통해 handleEditUser를 실행한다.
#4.3 정리 export
export default 는 전체를 보냄. import 함수이름 from ""; 형식을 가진다.
export는 특정 한가지 함수만 보낼 수 있다. import { 함수이름 } from "";형식을 가진다.
./는 현재 폴더, ../는 이전 폴더를 의미한다.
순서는 server.js -> routers -> controllers 이다.
#4.7 정리
req.params.id => ex) #66 (:id를 불러온다. :id는 일종의 변수 :potato도 가능하다. )
근데 :id가 맨 위에 있으면 /upload도 id로 인식해 버리므로 :id는 밑에 두도록 한다.
#4.8 정리
정규식 이용. (https://regex101.com/)
(//d+)는 숫자만 가능하다는 표시.
#5.1 정리 pug
npm i pug로 설치
pug를 view engine으로 설정
pug를 views 폴더 안에 만들고, render을 해 준다.(지금 같이 src안에 views가 있으면 찾기 에러가 뜬다. 확인법 console.log(process.cwd())을 하면 /mnt/c/Users/dlrke/Documents/GitHub/wetube-reloaded cwd(현재 작업 디렉토리)가 뜬다. 왜냐하면 babel-node를 사용하여 끌어오고(?)있기 떄문에 package.json의 위치가 현재 작업 디렉토리가 된다.(server의 위치가 아니라.) )
#5.2 정리 위치 에로 해결
set를 이용 하여 현재 작업 디렉토리 값을 재 설정해 준다.(기본값: /views -> /views/src)
footer처럼 공통으로 사용하는 것은 include를 사용하여 수정하기 간편하게 해 준다.
#5.3 정리
.pug 파일에
include를 활용하여 파일 값을 가져 올 수 있고,
extends(상속)을 활용하여 파일을 연동 시킬 수 있다.
그리고 각 파일마다 다른 값을
block를 사용하여 개성을 줄 수 있다.
#5.4 정리
좀 더 간편하게 만들기 위해 block head를 제거 하고, base.pug 에 title #{pageTitle} | Wetube를 사용한다. {pageTitle}는 변수이다.
render는 두가지를 받는데.
첫번쨰는 랜더링 할 파일.
두번쨰는 변수.ex) res.render("Home", { pageTitle: "Home", potato: "tomato" });(여러개 변수 사용 가능)
#5.6 정리 css MVP
href에 MVP홈페이지에서 주소를 갖고 와준다. 끝
#5.7 정리
#{pageTitle} 이랑 =pageTitle이랑은 같다. 하지만 #은 여러개를 =은 하나만 할 수 있다.
인위적으로 fakeUser를 만든다. (render에 fakeUser을 만들고 fakeUser를 정의해 준다. )
pug의 if를 활용하여 조건이 참이면 아래 식이 render되게 만들어 준다.
#5.8 정리 each in, else
each ? ub ?s : for ? in ?s형식과 비슷한 역할
else만 사용하면 ?s가 비어 있을때 자동으로 작동한다.
#5.9 정리 mixin
mixin 은 똑똑한 partial이다.
partial이랑 비슷하지만 include mixins/video 다음에 원하는 위치에 +video(video)를 해 줘야 한다.
#6.0 정리
const { id } = req.params;
const id = req.params.id;이 둘은 같다.
a(href=`/videos/${info.id}`)=info.title 이걸 통해 클릭하면 들어가는 링크를 만들 수 있다.
(\\d+)는 /가 아니라 \이다(역슬래쉬)
#6.1 정리
video:video 는 같다. video 랑.
a(href="edit") Edit Video &rarr; /edit랑 edit랑 차이는 /는 처음부터 /가 없으면 현재 위치에서.
#{video.views === 1 ? "view" : "views"}이렇게 하면 1이면 view, 1이 아니면 views가 나온다.
#6.2 POST
method로 GET of POST를 선택 할 수 있다.
#6.3 정리
console.log(req.body);을 이해 할려면
app.use(express.urlencoded({ extended: true }));이게 있기 전에는 req.body사용 xxx
그럼
{ title: 'good luck' }이런 식으로 나오는데 여기서 title은 name이다.
주소창이 같을때, route를 쓰면 두 식을 하나로 통합 할 수 있다.\
#6.5 정리
uploud를 추가 하였다.
#6.6 정리 새로운 비디오 추가
const { title } = req.body;가 input에서 작동하기 위해서는 name을 반드시 넣어줘야 한다.
#6.8 정리 moogoose install
on 은 수시로 발동.(error잡는데 사용)
once는 시작할 떄 발동(open할 때 사용)
moogoose설치 db만듬
#6.9정리
CRUD를 할 것이고, DB를 만들 것이다.
#6.10 정리 model, Schema
Schema를 통해 데이터의 형식을 만들고, model화 시켜 보내준다.
#6.11 정리
init정리
model.find({}, )는 콜백 함수로 값을 늦게 받는다.
#6.13 정리
try catch 구문은 자동으로 에로를 잡아준다. (따로 식을 안 넣어도 된다. )
async await 구문은 응답하는데 시간이 걸리는 친구를 기달렸다 같이 출발한다.
#6.14 정리
return은 중요하지 않다. 그냥 끝내는 역할을 한다.
#6.15 정리
video.js에서 비디오 형식을 만들고, videoController.js에서 비디오를 만든다(?)
\_id는 mongo에서 자동으로 부여해 준다.
하지만 여전히 mongodb에는 wetube가 없다.
#6.16 정리 Video.save()
Video.save() 하면 그떄부터 wetube가 생기면서 데이터 베이스에 자료가 저장이 된다.
Video.create방식으로도 할 수 있다.
Video.???형식이면 다 async await형식이 필요하다고 생각하면 될 거 같다.
#6.17 정리
catch (error)를 넣지 않으면 작동하지 않지만, 무한 딜레이는 되지 않는다.
Video형식에서 default값을 주면 만드는 곳에서 신경 안써도 된다.
#6.18 정리
uppercase: true 자동 대문자로 변환.
.trim() 여백 제거
글자수 제한은 만약의 사태를 대비하기 위해 자바스크립트랑 pug 둘다 바꾸어 준다.
#6.19 특정 id의 파일 찾기
:id([0-9a-f]{24})정규식 참고하여 찾음
const { id } = req.params;
const video = await Video.findById(id);이걸로 특정 id를 가진 파일을 찾을 수 있다.
#6.20 정리 hashtags
if (!video)이용해 오류 해결
value=video.hashtags.join() join()을 추가해줘 []를 제거
