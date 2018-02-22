FROM httpd:2.4

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN mkdir /runtime
COPY wallboard-app /runtime/
WORKDIR /runtime

RUN npm install
RUN npm run build --prod
RUN cp -pr /runtime/dist/* /usr/local/apache2/htdocs/

EXPOSE 80
