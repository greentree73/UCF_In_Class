# Middleware Flow Diagrams

These diagrams visualize how middleware works in Express applications.

## 1. Basic Middleware Execution Flow

```
┌─────────────────┐
│  Client Request │
│  GET /about     │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│ Middleware 1             │
│ (express.json)           │
│ Parses request body      │
│ Calls next()? YES        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Middleware 2             │
│ (Request Logger)         │
│ Logs: GET /about         │
│ Calls next()? YES        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Middleware 3             │
│ (Request ID Generator)   │
│ Generates ID             │
│ Calls next()? YES        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Route Handler            │
│ app.get('/about', ...)   │
│ Sends Response           │
└──────────┬───────────────┘
           │
           ▼
┌─────────────────┐
│  Server sends   │
│  JSON response  │
│  to client      │
└─────────────────┘
```

## 2. Middleware that Blocks Request

```
┌─────────────────┐
│  Client Request │
│  GET /admin     │
│  No API Key     │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│ Middleware 1             │
│ (express.json)           │
│ Calls next()? YES        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Middleware 2             │
│ (Auth Check)             │
│ Checks API Key           │
│ NO KEY FOUND!            │
│ res.status(403)          │
│ Calls next()? NO ❌      │
│ RESPONSE SENT            │
└──────────┬───────────────┘
           │
           ▼ (Route never executes)
           │
           ▼
┌─────────────────┐
│  Server sends   │
│  403 Forbidden  │
│  to client      │
└─────────────────┘
```

## 3. Request-Response Cycle with Timing

```
TIME 0ms → Request arrives
    ↓
TIME 5ms → Middleware 1 executes
    ↓       (parsing takes 5ms)
TIME 10ms → Middleware 2 executes
    ↓       (logging takes 5ms)
TIME 15ms → Route handler executes
    ↓       (processing takes 10ms)
TIME 25ms → Response sent
    ↓
TIME 25ms → Client receives response
```

## 4. Global vs Route-Specific Middleware

```
GLOBAL MIDDLEWARE (runs for ALL routes)

app.use(express.json());         ← ALL requests
app.use(requestLogger);          ← ALL requests
app.use(authCheck);              ← ALL requests

        ↓
        
app.get('/', handler1);          Routes only hit global middleware
app.post('/data', handler2);
app.get('/public', handler3);


ROUTE-SPECIFIC MIDDLEWARE (runs for SPECIFIC routes)

app.get('/admin', adminMiddleware, handler);
                   ↑
           Only /admin requests 
           hit this middleware

Route:  GET / → No adminMiddleware
        GET /admin → adminMiddleware runs first
        GET /public → No adminMiddleware
```

## 5. Middleware Chain in Our Example

```
REQUEST IN
   │
   ├─→ express.json()              │ Built-in
   │                                │ Middleware
   ├─→ express.text()              │
   │                                │
   ├─→ express.urlencoded()        │
   │
   ├─→ Request Logger              │ Custom Global
   │   (all requests)              │ Middleware
   │
   ├─→ Request ID Generator        │
   │   (adds ID to req)            │
   │
   ├─→ Auth Check                  │
   │   (checks Authorization)      │
   │
   ├─→ Performance Monitor         │
   │   (tracks request time)       │
   │
   ├─→ [Route Handler] ◄─── If route matches
   │   (GET /, POST /echo, etc.)
   │
   ├─→ 404 Handler                 │ Error Handling
   │   (catches unmatched routes)  │ Middleware
   │
   └─→ Global Error Handler        │
       (catches any errors)        │

RESPONSE OUT
```

## 6. Middleware Order Impact

```
SCENARIO A: CORRECT ORDER
════════════════════════════════

1. app.use(express.json());  ← Parse body FIRST
2. app.use(logger);          ← Can access parsed body in logs
3. app.get('/route', h);     ← Can access body in handler

Result: ✅ Works perfectly


SCENARIO B: WRONG ORDER
════════════════════════════════

1. app.get('/route', h);     ← Handler runs first
2. app.use(express.json());  ← Added AFTER route
3. app.use(logger);

Result: ❌ JSON parsing doesn't run before handler!
           Handler can't access parsed req.body
           Middleware never affects this route
```

## 7. Custom Request Properties Flow

```
REQUEST
  │
  ├─→ Middleware 1: Generate ID
  │   (req as any).requestId = "abc123"
  │
  ├─→ Middleware 2: Generate timestamp
  │   (req as any).startTime = Date.now()
  │
  ├─→ Middleware 3: Check auth
  │   if (!token) return res.status(401)
  │
  ├─→ Route Handler
  │   Accesses: req.requestId ✅
  │   Accesses: req.startTime ✅
  │   Sends: { data, requestId: "abc123" }
  │
RESPONSE
```

## 8. Multiple Middleware for One Route

```
Route Definition:
  app.get('/admin', [auth, isAdmin, logAccess], handler);

Request Process:
  
  Request arrives
       │
       ├─→ Global Middleware
       │   (express.json, etc.)
       │
       ├─→ Route-specific: auth
       │   Check API key
       │   next() if valid
       │
       ├─→ Route-specific: isAdmin
       │   Check user role
       │   next() if admin
       │
       ├─→ Route-specific: logAccess
       │   Log admin access
       │   next()
       │
       ├─→ Route Handler
       │   Send response
       │
       Response sent
```

## 9. Error Handling Flow

```
REQUEST
  │
  ├─→ Middleware
  │
  ├─→ Route Handler
  │   try {
  │     // some code throws error
  │   } catch (err) {
  │     next(err);  ← Pass error to error handler
  │   }
  │
  ├─→ Global Error Handler
  │   app.use((err, req, res, next) => {
  │     res.status(500).json({ error: err.message })
  │   })
  │
  └─→ RESPONSE with error info
```

## 10. Middleware vs Route Handler Timing

```
MIDDLEWARE EXECUTION                ROUTE HANDLER EXECUTION

TIME                                TIME
│                                   │
├─ express.json()                   ├─ Runs when request
│  (5ms)                            │   matches route
│                                   │
├─ logger                           ├─ Only one route
│  (2ms)                            │   handler per request
│                                   │
├─ auth                             ├─ Receives modified
│  (10ms)                           │   request from
│                                   │   middleware
│                                   │
│  ALL MIDDLEWARE                   ROUTE HANDLER
│  runs for EVERY                   runs for MATCHING
│  request                          route only
│
```

## 11. The Complete Server Flow

```
┌───────────────────────────────────────────────────────────────┐
│                    CLIENT REQUEST                             │
│                   GET /profile/john                           │
│              Authorization: Bearer token123                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
    ┌────────────────┐       ┌────────────────────┐
    │ BUILT-IN       │       │ CUSTOM GLOBAL      │
    │ MIDDLEWARE     │       │ MIDDLEWARE         │
    ├────────────────┤       ├────────────────────┤
    │• json()        │───┬───│• logger            │
    │• text()        │   │   │• requestId         │
    │• urlencoded()  │   │   │• auth check        │
    │                │   │   │• performance       │
    └────────────────┘   │   │  monitor           │
                         │   └────────────────────┘
                         │
                         ▼
              ┌─────────────────────────┐
              │ ROUTE MATCHES?          │
              │ GET /profile/:username  │
              └────────┬────────┬───────┘
                       │        │
                    YES│        │NO
                       │        │
                       ▼        ▼
              ┌─────────────┐  ┌──────────────┐
              │ ROUTE       │  │ 404 HANDLER  │
              │ HANDLER     │  └──────────────┘
              │ (sends      │         │
              │  response)  │         ▼
              └────┬────────┘  ┌──────────────┐
                   │           │ Send 404     │
                   │           │ Response     │
                   └─────┬─────┘              │
                         │                    │
                         └────────┬───────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ CLIENT RECEIVES RESPONSE │
                    └──────────────────────────┘
```

## Key Takeaways from Diagrams

✅ **Middleware order matters** - built-in first, then custom
✅ **Middleware runs for all requests** - before any route handler
✅ **Middleware can block requests** - by not calling next()
✅ **Route handlers only run** - when route matches AND previous middleware passed
✅ **Error handlers need 4 params** - (err, req, res, next)
✅ **Request properties accumulate** - each middleware can add data
✅ **Global middleware > route-specific** - define in that order

---

**Tip**: Print these diagrams and refer to them when working with middleware!
