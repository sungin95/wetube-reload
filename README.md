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
#6.21 정리
hashtags: hashtags
.split(",")
.map((word) => (word.startsWith("#") ? word : `#${word}`)),
그리고 update
#6.22 정리 exists findByIdAndUpdate
findByIdAndUpdate를 사용하여 save과정 없이 바로 업데이트를 할 수 있다.
exists + 원하는 조건 을 사용하면 해당 비디오가 있는지 없는지 바로 체크 할 수 있다.
ex) const video = await Video.exists({\_id: id });
다만 video를 다른 곳에 보내 줘야 한다면 사용할 수 없다. 오직 true or false 용이다.
#6.23 정리 pre
기존의 postUpload를 손보고
모델이 생기기 전에 해야 되서 video.js 모델 전 위치로 만듬.
#6.24 정리
postUpload
hashtags: formatHashtags(hashtags),이곳에 붙이면 나는 오류가 발생하는데 니코쌤 코딩에서는 발생하지 않는다. 버전의 차이가 아닌가 생각한다.
videoSchema가 많은걸 하네
each in을 이용하면 하나의 li를 여러개로 만들 수 있다.
.static는 왼쪽 이름에 오른쪽 인자를 받는 함수를 만들어준다.
#6.25 정리 findByIdAndDeㅉlete
삭제하는거 만듬
#6.26 정리 search
sort이용하여 최신업데이트한 파일 맨 위로 오게 바꿀 수 있다.
console.log(req.query);를 사용하면 검색한 값을 알수 있다.
form(method="GET") 검색은 바꾸는게 아니니까 GET를 사용한다.
#6.27 정리 RegExp
^처음 $마지막 i대소문자 구분X
RegExp정규식을 사용 할 수 있게???
let videos = [];
videos = await Video.find를 사용 하여 videos가 닿을 수 없는 곳 까지 닿게 했음.
#7.0 정리 user
유저를 만듬
#7.1 정리 회원가입
홈페이지에서 회원가입 정보 만들기
#7.2 정리 비밀번호 hash
비밀번호 데이터베이스에서 안보이게 하기.
npm i bcrypt
비밀번호를 hash처리 하여 알수 없게 만들기
#7.3 정리 $or Confirm password 
const exists = await User.exists({
$or: [{ username }, { email }],
}); 이 기능을 사용하면 여러개 조건을 한번에 할 수 있다.
#7.4 정리 status(400).
status(400).를 하면 더 이상 비밀번호 저장하냐를 문구가 안나온다.
문제 되는 상황이 히스토리에 남아 대응 하기가 더욱 쉬워진다.
#7.5 정리
Join and Login, getLogin, postLogin 만들기
#7.6 정리 비밀번호 체크
비밀번호를 같은지 체크 하는 방법은 해쉬한 번호가 내 비밀번호랑 같은지 체크하는 것이다.
const ok = await bcrypt.compare(password, user.password);
여기서 user는 wait User.findOne({ username });한 것이다.
#7.7정리 세션
브라우저와 백엔드 사이 존재 하는것. 예를 들어 로그인 상태가 세션이다.
세션을 쓰면 매번 쿠키 자료가 온다.
req.sessionStore.all((error, sessions)
확인법은 console.log(req.headers);
다른 브라우저로 오면 쿠키에 2개의 자료가 온다.
#7.8 정리
세션 아이디로 내가 누구인지 알 수 있다.
#7.9 정리
서버는 1초마다 까먹는 치매 환자이다.
res.locals.loggedIn = Boolean(req.session.loggedIn);
locals.를 이용하여 middleWare에 값을 넣을 수 있다.
#7.12 정리
npm install connect-mongo
store: MongoStore.create를 활용하여 로그인 정보를 데이터 베이스에서 저장 할 수 있게 한다.
#7.13 정리
쿠키를 지우면 새로운 유저가 나온다.
근데 모두에게 쿠키를 주면 과부화가 오니까 로그인 한 유저에게만 주기로 한다. (2개 false)
그리고 userController.js에
req.session.loggedIn = true;
req.session.user = user; 59줄
이 로그인 하면 쿠키를 부여 해 줄 것이다.
#7.14 정리
쿠키의 유효 시간을 설정 할 수 있다.
들키기 싫은 파일이 .env 파일에 변수화 시킬 수 있다. 이때, .gitignore에 추가 하는거 잊지 말자.
활용법: precess.env.DB_URL
그리고 mongoose.connect(process.env.DB_URL); db.js 여기까지 바꾸는 걸 잊지 말자.
#7.15 정리 env 불러오기
npm i dotenv  
require("dotenv").config(); 가 env를 읽을 수 있게 해 준다.
이게 server -> init -> env를 쓰는 모든 파일, 하지만 이 방법은 번거로우니까.
import "dotenv/config"; 방법 사용
#7.16 정리 깃이랑 계정 연결?
&allow_signup=false 계정 있는 사람만 or 없는 사람도
?client_id= (본인 Client ID)
#7.17 정리 scope
scope는 유저에게서 얼마나 많이 정보를 읽어내고 어떤 정보를 가져올 것에 대한것.
client_id 이건 정해진 거라서 철자가 틀리면 안된다.
scope: "read:user user:email",이렇게 두개를 설정 해 주고 연결해 주면 된다.
Authorization callback URL
http://localhost:4500/users/github/finish 로 이동하게 된다. (처음 설정)
#7.18 정리
참고: https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
참고: https://github.com/settings/applications/1926230
POST 할 곳에다가 id랑 secret를 정보화 해서 보내준다.
그리고 fetch, DataTransfer.json() 등을 사용했는데. 솔직히 뭔지 모르겠다.
#7.19 정리 fetch
npm i node fetch (fetch가 사용 안되니까.)
npm install node-fetch@2.6.1 (현재 버전에서는 안된다. )
여기는 걍 외우는것이 답인듯하다.
#7.20 정리 userData emailData
userData 이런식으로 식을 만들면 내 데이터가 나옴.
그리고
emails.find(email => email.primary === true && email.verified === true)
이걸 만들기 위해
emailData
만들었음.

#7.21 정리
여기부터 현재 프로그램이 이상해서 npm을 사용 못한채로 하고 있다.
여기 부분에서 이론상 깃허브로 계속하기 하면 쿠키가 생기고 데이터베이스에 uesrs 가 생기고 해야 하지만 쿠키만 생기고 데이터베이스에 안생겼다. 이유를 모르겠다. 몽고db의 문제라 생각해 손보다가 결국 모든 파일을 날리고 말았다....
#7.22 정리
socialOnly는 따로 로그인하지 않고 깃허브를 통해 들어왔다는 뜻이다.
그리고 joy페이지에서 가입해서 들어와도 users 가 생기고 로그인이 된다.
근데 로그인하고 깃에 들어가면 만들었던 정보로 유저가 생성된네.
remove를 없애고
Session.destroy(callback)
세션을 파괴하고 req.session 속성을 설정 해제합니다. 완료되면 콜백이 호출됩니다.
destroy사용.
#7.23 정리
access_token 는 Github API와 상호작용 할 때 쓴다.
socialOnly가 true이면 Github 로그인을 통해 만들어진 계정이라는 의미. (이메일은 다르다. )
#8.0 정리
getEdit, postEdit 를 만들고, base 손보기. 이 베이스의 loggedIn은 middlewares.js에 의해 정해진다.
edit-profile을 만들고 loggedInUser.name을 사용한다.
다음시간에는 /users/edit 에 로그인을 해야 들어갈 수 있게 해야 하고, loggedInUser.name이 정의가 안 되어 있다.
#8.1 정리
route랑 all은 공통분모를 만든다는 점에서 비슷하지만 route은 /edit같은 공간?이고, all은 함수이다.
userRouter에 이렇게 바꿈으로써 홈페이지에 로그인이 안된 상태로 가면 바로 로그인 페이지로 이동하게 된다.
#8.2 정리 비디오는 유저의 소유
ID같은 경우 req.body가 아니라 req.session.user에서 얻어준다.
name, email, username, location들은 edit-profile의 name에서 온 것들이고 이걸들을 안써주면 안된다.
주의: mongod의 id는 \_id를 쓴다.
데이터 베이스 값은 바뀌었지만 loggedInUser는 로그인 할때 값이다.
user는 db와 연결이 되어 있지만, session은 db랑 연결이 안 되 있다.
#8.3 정리 session업데이트하기
방법1. 바로 아래에 바꾸는 식 하나 더 만들기.
...req.session.user는 그외 정보는 이전과 동일하다를 나타낸다.
{ new: true } 사용하면 findByIdAndUpdaterk 업데이트된 데이터를 return.
#8.4 비밀번호 중복 체크
pug가 너무 많아져서 users를 하나 만들어 줬다.
#8.5 비밀번호 변경
(1)비밀번호랑 비밀번호 재확인 이랑 같은지 비교.
status(400)을 추가 하는 이유는 비밀번호가 중복될시, 브라우저에게 알려 주기 위해서이다.
(2)기존의 비밀번호가 올바른지 확인.
(3)비밀번호 바꾸기.(가끔 User가 어떤건지 까먹는데 기억하자! User.js에서 왔고, userSchema를 User로 모델화 시킨 거다. (참고로 moogoose이다. ))
pre save middleware 거치고 User.create를 사용하는 것이다. 그리고 user.save()를 해도 pre save moddleware를 작동시킬거다.
save를 거치면서 비밀번호가 hash가 되어 나온다.
이때 방금 전 바꾼 비밀번호로 변경을 하면 문제가 발생하는데. 이유는 form에서 가져온 비밀번호랑, 현재 로그인된 사용자의 비밀번호를 비교해서 이다. 그러므로 session 업데이트 필수.
#8.6 파일 업로드
input(type="file"을 하면 파일을 선택해서 올릴 수 있는 파일이 나온다.
npm i multer
step1)enctype="multipart/form-data"파일을 업로드 하기 위한 조건.(설치, form에 enctype="multipart/form-data"추가)
step2)middlewares에 (req, res, next) 대신 multer를 쓰는 함수를 추가한다.
그리고 나중에는 바꾸겠지만 현재는 파일들을 하드드라이브에 저장하는걸 한다.
const upload = multer({dest: 'uploads/'})
uploads파일이 생긴걸 볼 수 있다. (이 부분은 다 실현된게 아니라서 다시 손좀 봐야 한다. )

#현재 약간의 문제가 있지만, 이걸 고칠거면 너무 시간이 많이 걸리므로 일단 진도를 나가고 나중에 복습할때 제대로 확인하는 걸로 하자!
현재 에러: 깃허브를 통한 로그인이 안됨.

#8.7 정리
현재 file: { path },가 프로필 사진을 바꾸지 않고 업데이트를 했을때 오류를 발생시킨다.
Cannot read properties of undefined (reading 'path')
avatarUrl: file ? file.path : avatarUrl,이걸로 문제를 해결
그리고 절!대! DB에는 파일을 저장하지 않는다.
DB에는 파일 위치만 저장한다.
src="/" + loggedInUser.avatarUrl
파일은 갔지만 express한테 uploads간다 말한적 없다.(브라우저가 서버에 있는 파일에 접근할 수 없으니까) 다음시간에
#8.8 정리
브라우저가 어떤 페이지와 폴더를 볼 수 있는지 알려줘야함.
app.use("/uploads", express.static("uploads"));
/uploads 로 오면 "uploads"파일로 가라는 소리임.
이 방법의 문제점은 파일이 서버에 저장된다는 것이고, 서버가 죽었을때 ㅇㅂ로드된 파일들이 있다면, 파일은 날린다.
#8.9 정리
multer는 req.file을 제공해 준다. 그리고 limits랑 같이 쓰면 용량 제한 가능
video(src="/" + video.fileUrl, controls)이게 동영상을 재생할 수 있게 해 주는 pug명령어.
#8.10 정리 다른유저 보기, 누가 올린 영상인지 알려주기
우리가 올린 영상을 다른 유저가 볼 수 있고, 누가 올린 영상인지 보여주는 방법.
video: owner, user: videoList를 가져야 한다.
userController.js const see
1 id를 갖고 와야 하는데 session이 아니라, 모든 사람들이 볼 수 있는 URL에서 갖고 온다.
url를 갖고 있으면 로그아웃 된 상태에서도 들어 올 수 있다.
다음시간 어떻게 video를 user와 연결 시킬 수 있을까?(그 전에 비디오랑 유저데이터 모두 삭제해야 한다. )
#8.11 정리 user랑 video랑 연결하기
owner을 추가 하고 비디오를 새롭게 업로드 하고 find해 보면 owner가 추가 되어 있는것을 볼 수 있다.
#8.12 owner 대신 populate를 사용하기
mongoose가 video를 찾고 그 안에 owner도 찾아 준다.
populate가 user정보 모두를 갖고 와 준다.
owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
위 문장이 id를 저장(?)하고 mongoose에 이 id가 User model에서 왔다는 뜻
video에 owner추가 하는 작업끝
2단계 특정 사용자가 업로드한 모든 영상을 볼 수 있게 만드는것!
profile의 videos가 특정 유저의 id와 owner id 가 같은 video만 가져온다.
#8.13 one owner는 여러개의 video를 가진다.
비디오를 만들면 그걸 user의 videos.push를 하고 저장을 해 준다.
그리고 user/profile에서 user.videos를 이용하여 보여준다.
다음 영상은 owner만이 영상을 수정하거나 삭제 할 수 있게 하는 것이다. 그리고 영상을 업로드 할 때마다 비밀번호가 바뀌는 버그까지 수정.
#8.14
(1)버그의 원인은 save()를 실행 할 때마다 User.js의 pre코드가 실현이 되서 나타나는 문제이다. 그래서 이전 비밀번호 해쉬한게 비밀번호가 된다.
해결방법으로 비밀번호를 수정했을 떄만 hash하게 하는 것이다.
(2)아이디를 비교하는데 !==는 내용 뿐만 아니라 데이터 형식도 비교한다.
typeof를 통해 비교 해 본다. 타입이 다른걸 볼 수 있다.
그러므로 둘다 String으로 타입을 같게 해 준 다음 비교하면 잘 되는 것을 볼 수 있다.
참고로, ObjectId("62b1906b69b3acaf53adbded")랑 62b1906b69b3acaf53adbded으로 버전이 바뀌어서 인지를 모르겠지만 형식을 바로 확인 할 수 있다. 이 둘은 같은 값이다.
deletevideo에도 똑같이 넣으주는데, 기존의 비디오가 있는지 체크하는 것도 넣어야 한다.
populate는 전체를 다 갖고 오는데 데이터 비교는 id만으로 충분히 가능하므로 데이터를 낭비 하지 말자.
