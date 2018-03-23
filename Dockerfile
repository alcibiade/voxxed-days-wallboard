FROM node:8 as builder

RUN mkdir /runtime
COPY wallboard-app /runtime/
WORKDIR /runtime

RUN npm install
RUN npm run build --prod
#RUN cp -pr /runtime/dist/* /usr/local/apache2/htdocs/


FROM httpd:2.4
COPY apache-httpd/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=builder /runtime/dist/* /usr/local/apache2/htdocs/

EXPOSE 80
