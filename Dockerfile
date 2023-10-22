FROM node:18.17.0-alpine

# app 환경 설정
ENV TZ 'Asia/Seoul'
# Language
ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

# 배포
COPY . /

WORKDIR /

RUN npm install

EXPOSE 7001

CMD [ "npm", "run", "start" ]