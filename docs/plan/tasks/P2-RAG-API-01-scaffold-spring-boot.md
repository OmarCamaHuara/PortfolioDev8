---
id: P2-RAG-API-01
title: Scaffold Spring Boot project at rag-api/ with Maven + Dockerfile
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P0-DOC-06]
blocks: [P2-RAG-API-02, P2-RAG-API-03, P2-RAG-API-04, P2-RAG-API-05, P2-RAG-API-06, P2-RAG-API-07, P2-RAG-API-08]
status: pending
---

# P2-RAG-API-01 — Scaffold Spring Boot project

## Context

Create the `rag-api/` directory in the monorepo with a Spring Boot 3.3+ project targeting Java 17. Minimal setup: pom.xml, main class, application.yml, Dockerfile multi-stage. This task gives all subsequent RAG-API tasks a working project to extend.

**References:**
- `docs/plan/rag-architecture.md` § Repositório + § Stack técnico
- `docs/adr/0007-backend-scope-spring-rag.md` (post P0-DOC-06)

## Inputs

**External dependencies:**
- Java 17 JDK installed
- Maven 3.9+ installed
- Docker installed for building

## Outputs

**Files to create:**
- `rag-api/pom.xml` — Maven project with Spring Boot 3.3+, Spring Web, Spring Data JPA, Spring AI 1.0.0-M3+ (Vertex AI or Google provider), pgvector-java, Flyway, Bucket4j, Micrometer Prometheus
- `rag-api/src/main/java/dev/ohmar/rag/RagApiApplication.java` — main class with `@SpringBootApplication`
- `rag-api/src/main/resources/application.yml` — base config
- `rag-api/src/main/resources/application-prod.yml` — prod overrides
- `rag-api/Dockerfile` — multi-stage (maven:3.9-eclipse-temurin-17 build → eclipse-temurin:17-jre-alpine runtime)
- `rag-api/.dockerignore`
- `rag-api/.gitignore` — target/, *.log

**Files to modify:**
- `.gitignore` (root) — add `rag-api/target/` and `rag-api/.env`

## Implementation steps

1. Create `rag-api/pom.xml` with Spring Boot parent 3.3.x, Java 17 target, dependencies:
   - spring-boot-starter-web
   - spring-boot-starter-data-jpa
   - spring-boot-starter-actuator
   - org.postgresql:postgresql
   - com.pgvector:pgvector:0.1.4
   - org.flywaydb:flyway-core
   - org.springframework.ai:spring-ai-vertex-ai-embedding-spring-boot-starter (or openai-starter as fallback)
   - com.bucket4j:bucket4j-core:8.10.1
   - io.micrometer:micrometer-registry-prometheus
   - net.logstash.logback:logstash-logback-encoder (JSON logs)
   - org.springframework.boot:spring-boot-starter-test (test scope)
   - org.testcontainers:postgresql:1.19.8 (test scope)
2. Create `RagApiApplication.java`:
   ```java
   package dev.ohmar.rag;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   @SpringBootApplication
   public class RagApiApplication {
     public static void main(String[] args) {
       SpringApplication.run(RagApiApplication.class, args);
     }
   }
   ```
3. `application.yml`:
   ```yaml
   server:
     port: 8080
   spring:
     application:
       name: rag-api
     datasource:
       url: ${DB_URL:jdbc:postgresql://localhost:5432/rag}
       username: ${DB_USER:rag}
       password: ${DB_PASSWORD:rag}
     flyway:
       enabled: true
       locations: classpath:db/migration
     jpa:
       hibernate:
         ddl-auto: validate
       properties:
         hibernate.dialect: org.hibernate.dialect.PostgreSQLDialect
   management:
     endpoints:
       web:
         exposure:
           include: health,info,prometheus
   logging:
     config: classpath:logback-spring.xml
   ```
4. Dockerfile multi-stage:
   ```dockerfile
   FROM maven:3.9-eclipse-temurin-17 AS build
   WORKDIR /app
   COPY pom.xml .
   RUN mvn dependency:go-offline
   COPY src ./src
   RUN mvn package -DskipTests

   FROM eclipse-temurin:17-jre-alpine
   WORKDIR /app
   COPY --from=build /app/target/rag-api-*.jar app.jar
   EXPOSE 8080
   HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://localhost:8080/actuator/health || exit 1
   ENTRYPOINT ["java","-XX:+UseContainerSupport","-XX:MaxRAMPercentage=75","-jar","app.jar"]
   ```
5. Add logback-spring.xml for structured JSON logs.
6. Verify build: `cd rag-api && mvn package -DskipTests`.
7. No commit.

## Verification

```bash
test -f rag-api/pom.xml && echo OK
test -f rag-api/src/main/java/dev/ohmar/rag/RagApiApplication.java && echo OK
test -f rag-api/Dockerfile && echo OK
cd rag-api && mvn package -DskipTests
# expected: BUILD SUCCESS
docker build -t rag-api:test rag-api/
# expected: image built
```

## Non-goals

- Do NOT add endpoints yet (P2-RAG-API-05).
- Do NOT add Flyway migrations yet (P2-RAG-API-02).
- Do NOT add rate limit yet (P2-RAG-API-06).
- Do NOT commit.

## Open questions

- Spring AI version — pin to the latest 1.0 GA at time of execution. If still RC/M, use the latest milestone and document in a comment.
