FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=new
ENV MYSQL_DATABASE=users
ENV MYSQL_USER=kayttaja
ENV MYSQL_PASSWORD=1234
ADD data.sql /docker-entrypoint-initdb.d

EXPOSE 3306
