# Use uma imagem base com o JDK
FROM openjdk:17-jdk-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo de build (JAR) para o contêiner
COPY target/livechat-0.0.1-SNAPSHOT.jar /app/app.jar

# Exponha a porta em que sua API estará rodando
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]