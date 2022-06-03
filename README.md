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
