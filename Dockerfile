FROM node:8-alpine as builder

ENV BUILD_ENV=dev

RUN mkdir /runtime
COPY wallboard-app /runtime/
WORKDIR /runtime

RUN npm install
RUN npm run build --${BUILD_ENV}


FROM httpd:2.4-alpine
COPY apache-httpd/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=builder /runtime/dist /usr/local/apache2/htdocs/

EXPOSE 80
