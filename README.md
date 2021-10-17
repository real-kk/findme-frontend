# Find Me

# 프로젝트
![realKK 메인](https://user-images.githubusercontent.com/52418706/137633445-7cc495a3-88f5-4ea0-aefb-60723ea3e28f.JPG)

```
프로젝트 이름: Find Me
팀원: 김도현(FE), 서지용(FE), 최성우(BE), 김태윤(BE)
사용언어: JavaScript, Html, Css
사용 프레임워크: React Native
```

# 프로젝트 기획(문제 정의)
<img src="https://user-images.githubusercontent.com/52418706/137633485-982ce633-4c09-4bf0-bc99-db9b63274c61.JPG" alt="회원가입 및 로그인" width="85%">  

# 프로젝트 목표
<img src="https://user-images.githubusercontent.com/52418706/137633489-c4b696ee-dc76-4884-a416-5d7e147f63dd.JPG" alt="회원가입 및 로그인" width="85%">  

# 핵심 기능
```
1. 감정일기 작성 및 감정일기 분석(워드 클라우드, 감정 분석 그래프 제공)
2. 심리 상담 신청 및 수락
3. 상담사의 질문에 대한 내담자의 동영상 촬영을 통한 답변 기능(동영상의 표정 감정 분석 결과 그래프 제공)
4. 상담 녹음 기능 및 녹음 파일의 텍스트 변환 후 이메일 전송 기능
```

# 사용 기술 스택
```
FE: React Native, JavaScript, Html, Css
BE: Django, Docker, Nginx, Amazon EC2, MySQL, Google Cloud Natural Language API
기타: openCV, Amazon S3, Amazon CloudWatch, Amazon Lambda, Microsoft Cognitive Services
```
___

# 시스템 구조
<img src="https://user-images.githubusercontent.com/52418706/137353666-5210c0f0-d5a7-4920-92cd-e64d719fe0eb.PNG" alt="시스템 개요" width="100%">

___
# 기능 소개

### 회원가입 및 로그인
<img src="https://user-images.githubusercontent.com/52418706/137360792-234b8b9e-f274-49c9-a0c8-e9c23dbbaca9.PNG" alt="회원가입 및 로그인" width="85%">  

# 
## ※내담자 계정
### A. 감정일기 작성 및 분석 결과 조회
- 감정일기 작성
<img src="https://user-images.githubusercontent.com/52418706/137361273-ff2e0da7-caa2-42ed-9324-ae6d86f1ab0b.PNG" alt="내담자 감정일기 작성" width="85%">  
- 감정일기 조회 
<img src="https://user-images.githubusercontent.com/52418706/137361520-a2db73d5-1ec9-4a26-ad1e-8c8287cdddb4.PNG" alt="내담자 감정일기 조회" width="85%">
- 감정일기 분석 결과 조회
<img src="https://user-images.githubusercontent.com/52418706/137361521-2a59b0f1-481a-4f00-81b7-8c0ef1c3febb.PNG" alt="감정일기 분석 결과 조회" width="85%">

### B. 상담 신청
- 상담사 조회  
<img src="https://user-images.githubusercontent.com/52418706/137362450-a242df4d-275f-4627-896f-bee0c417e1e8.PNG" alt="상담신청1" width="85%">  
- 상담 신청서 작성  
<img src="https://user-images.githubusercontent.com/52418706/137362467-66c72120-9592-4c00-bd04-4956bf25608f.PNG" alt="상담신청2" width="85%">  

### C. 상담사의 질문 확인 및 답변 영상 촬영
<img src="https://user-images.githubusercontent.com/52418706/137362473-6ee1e638-e73a-4784-9942-5b960dcf2227.PNG" alt="영상질문 확인 및 촬영" width="85%">

### D. 영상의 분석된 감정 그래프 및 감정 변화 수치 확인
<img src="https://user-images.githubusercontent.com/52418706/137362479-c6601889-613f-4831-8eed-b65aed002f98.PNG" alt="영상분석 결과" width="85%">

### E. 마이페이지
<img src="https://user-images.githubusercontent.com/52418706/137362489-0856266e-fddf-40db-8833-c8319dce75ca.PNG" alt="마이페이지" width="85%">  

# 
## ※상담사 계정
### A. 상담 신청 확인
<img src="https://user-images.githubusercontent.com/52418706/137362501-00769c95-2a4f-45dc-8e3c-6a1ddd81d87b.PNG" alt="상담신청 확인" width="85%">

### B. 내담자의 감정일기 분석 결과 확인
<img src="https://user-images.githubusercontent.com/52418706/137363624-2876b938-1745-489a-a18a-341687854a52.PNG" alt="내담자 감정일기 결과 확인" width="85%">

### C. 영상 질문 등록 및 영상 분석 결과 확인
- 영상 질문 등록 
<img src="https://user-images.githubusercontent.com/52418706/137363628-3515df97-13fe-4ce7-b8c6-7de3097454c3.PNG" alt="영상 질문 등록" width="85%">
- 영상 분석 결과 확인 
<img src="https://user-images.githubusercontent.com/52418706/137364132-65ce81ca-d6d2-4b42-ac89-59311b8b2328.PNG" alt="상담사의 영상 결과 확인" width="85%">

### D. 상담 녹음 및 텍스트 파일 변환 후 이메일 전송
<img src="https://user-images.githubusercontent.com/52418706/137363633-7ad86473-ebe3-49ee-aff1-8d3f2975f84d.PNG" alt="상담 녹음 및 텍스트 변환" width="85%">

### E. 마이페이지
<img src="https://user-images.githubusercontent.com/52418706/137363638-79e6f7a2-6555-4085-a5c6-238d9b2ef125.PNG" alt="상담사 마이페이지" width="85%">

___
# 프로젝트 일정 관리
```
- 애자일 방법론 활용 및 Burn Down Chart 이용
- 총 6개의 iteration으로 설정
```
**1. iteration 1 (2020.09.21~2020.10.07)**
<img src="https://user-images.githubusercontent.com/52418706/137363644-3c8c5d90-6eb5-4aba-894a-238ec7de4eb0.PNG" alt="iter1" width="85%">

**2. iteration 2 (2020.10.08~2020.10.23)**
<img src="https://user-images.githubusercontent.com/52418706/137363659-bad21c51-3f1e-4ca3-afc6-e8b8eccc1bcd.PNG" alt="iter2" width="85%">

**3. iteration 3 (2020.10.24~2020.11.08)**
<img src="https://user-images.githubusercontent.com/52418706/137363660-b3065e16-aa32-45f9-ba17-1bec3c519bf0.PNG" alt="iter3" width="85%">

**4. iteration 4 (2020.11.09~2020.11.21)**
<img src="https://user-images.githubusercontent.com/52418706/137363668-f6907483-7e34-4803-bbd5-e871a55111b4.PNG" alt="iter4" width="85%">

**5. iteration 5 (2020.11.21~2020.12.06)**
<img src="https://user-images.githubusercontent.com/52418706/137363673-4745ef7f-9d7a-4f62-802e-1f477cb9d78a.PNG" alt="iter5" width="85%">

**6. iteration 6 (2020.12.07~2020.12.18)**
<img src="https://user-images.githubusercontent.com/52418706/137363677-a7195a38-2bc0-4b5b-b5b5-b80b3bdf1f18.PNG" alt="iter6" width="85%">

___

# 수상
### ※ LINC+ 캡스톤디자인 경진대회 우수상 수상
<img src="https://user-images.githubusercontent.com/52418706/137366502-b70012f9-6bfc-43af-a91f-155aca055109.PNG" width="60%">
<img src="https://user-images.githubusercontent.com/52418706/137366517-ff2c966a-661d-4d46-8808-e54330d49646.PNG" width="60%">

#
### ※ AJOU SOFTCON 장려상 수상
<img src="https://user-images.githubusercontent.com/52418706/137366513-89644700-c9ba-4ff1-b844-73270d002de4.PNG" width="60%">

___
#### Backend 깃 주소: https://github.com/real-kk/findme-backend
#### 프로젝트 깃 주소: https://github.com/real-kk