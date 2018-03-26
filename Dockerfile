FROM node:8-alpine as builder

RUN mkdir /runtime
COPY wallboard-app /runtime/
WORKDIR /runtime

RUN npm install
RUN ./node_modules/@angular/cli/bin/ng build --dev


FROM httpd:2.4-alpine
COPY apache-httpd/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=builder /runtime/dist /usr/local/apache2/htdocs/

EXPOSE 80
