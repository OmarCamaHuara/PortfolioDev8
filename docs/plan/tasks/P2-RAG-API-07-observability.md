---
id: P2-RAG-API-07
title: Observability — actuator health, Prometheus endpoint, JSON logs
category: RAG-API
priority: P2
estimate_hours: 2
depends_on: [P2-RAG-API-01]
blocks: [P2-RAG-API-09, P4-OPS-09]
status: pending
---

# P2-RAG-API-07 — Observability

## Context

Production-grade signals: liveness (Fly.io health check), Prometheus scrape endpoint (metrics), structured JSON logs (grepable in production). This is the task that sets rag-api apart from toy portfolio projects — explicit signal of senior engineering.

**References:**
- `docs/plan/rag-architecture.md` § v1 Observabilidade

## Inputs

**Files to read:**
- `rag-api/src/main/resources/application.yml`

## Outputs

**Files to create:**
- `rag-api/src/main/resources/logback-spring.xml` — JSON appender via logstash-logback-encoder
- `rag-api/src/main/java/dev/ohmar/rag/obs/RequestLoggingFilter.java` — adds req_id, ip_hash, latency to MDC

**Files to modify:**
- `rag-api/src/main/resources/application.yml` — expose health + prometheus + info endpoints

## Implementation steps

1. `logback-spring.xml`:
   ```xml
   <configuration>
     <appender name="STDOUT_JSON" class="ch.qos.logback.core.ConsoleAppender">
       <encoder class="net.logstash.logback.encoder.LogstashEncoder">
         <includeContext>false</includeContext>
         <includeMdc>true</includeMdc>
       </encoder>
     </appender>
     <root level="INFO"><appender-ref ref="STDOUT_JSON"/></root>
   </configuration>
   ```
2. `RequestLoggingFilter.java`:
   - Generate `req_id` (UUID) per request, put in MDC.
   - Put `ip_hash`, `endpoint`, `method` in MDC.
   - Log `request_start` and `request_end` (with latency_ms, status).
   - Clear MDC in finally.
3. `application.yml` — exposure:
   ```yaml
   management:
     endpoints:
       web:
         exposure:
           include: health,info,prometheus
     endpoint:
       health:
         show-details: when-authorized
     metrics:
       distribution:
         percentiles-histogram:
           http.server.requests: true
     prometheus:
       metrics:
         export:
           enabled: true
   ```
4. Protect `/actuator/prometheus` with basic auth (env var `METRICS_PASSWORD`). `/actuator/health` stays public (Fly needs it).
5. Custom metric via Micrometer: `search_latency_seconds` histogram in `SearchService`.
6. No commit.

## Verification

```bash
curl -s http://localhost:8080/actuator/health
# expected: {"status":"UP"}
curl -s -u admin:$METRICS_PASSWORD http://localhost:8080/actuator/prometheus | head
# expected: metrics lines (http_server_requests_seconds etc.)
# Logs should be JSON:
curl -s -X POST http://localhost:8080/api/search -d '{"query":"test"}' -H 'Content-Type: application/json'
# server log line should be JSON with fields req_id, ip_hash, endpoint, latency_ms
```

## Non-goals

- Do NOT ship Prometheus or Grafana config (that's P4-OPS-09).
- Do NOT send logs to a managed service.
- Do NOT commit.

## Open questions

None.
