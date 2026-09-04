This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed, line numbers have been added.

# File Summary

## Purpose

This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format

The content is organized as follows:

1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
   a. A header with the file path (## File: path/to/file)
   b. The full contents of the file in a code block

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/node_modules/**, **/.git/**, **/dist/**, **/build/**, **/.next/**, **/.cache/**, **/venv/**, **/.venv/**, **/**pycache**/**, **/*.pyc, repomix-output.md, *.log
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure

```
.agents/
  rules/
    graphify.md
  skills/
    better-auth-best-practices/
      SKILL.md
    better-auth-security-best-practices/
      SKILL.md
    create-auth/
      SKILL.md
    email-and-password-best-practices/
      SKILL.md
    organization-best-practices/
      SKILL.md
    two-factor-authentication-best-practices/
      SKILL.md
  workflows/
    graphify.md
.github/
  workflows/
    ci.yml
.husky/
  pre-commit
.kilo/
  skills/
    better-auth-best-practices/
      SKILL.md
    better-auth-security-best-practices/
      SKILL.md
    create-auth/
      SKILL.md
    email-and-password-best-practices/
      SKILL.md
    organization-best-practices/
      SKILL.md
    two-factor-authentication-best-practices/
      SKILL.md
  AGENTS.md
docs/
  ADR/
    001-use-layered-architecture.md
    002-use-neon-with-prisma.md
    003-use-shadcn-ui.md
  API/
    Database.md
  audits/
    Brand Fidelity Audit.md
    Impeccable Audit and Detect.md
    MIFB Review Checklist.md
    Pre-Flight Check (Section 14).md
    Preservation Audit.md
    Vercel Audit Guidelines.md
  concepts/
    AI Slop.md
    Coaxing Beats Constraint.md
    Design Review as Infrastructure.md
    Interruptible Animation.md
    Optical Alignment.md
    Press Feedback and Hit Areas.md
  decisions/
    Enforcement Layer Overlap.md
    Font Ban Conflicts.md
    Motion Doctrine Conflicts.md
    Prompt Layer vs Toolchain Layer.md
  deliverables/
    Design Skills Cheat Sheet.md
    Quickstart.md
    Unified Pre-Flight Mega Checklist.md
  Development/
    Auth Doctor.md
    Dead Doctor.md
    Git.md
    Neat Doctor.md
    NoctisNova Doctor Suite.md
    ORM Doctor.md
  flows/
    Audit Pipeline Flow.md
    Build Greenfield (Prompt 1).md
    Full Stack Build Flow.md
    Install and Load.md
    Redesign First-Audit (Prompt 2).md
  meta/
    CONVENTIONS.md
    Dashboard.md
    Start Here.md
    Tag Taxonomy.md
  reference/
    Entities.md
    Gaps.md
    Questions.md
    Source Ledger.md
  rules/
    AI Tells (Forbidden Patterns).md
    Anthropic Frontend Design Rules.md
    Architecture and Stack.md
    Dark Mode Protocol.md
    Em-Dash Ban.md
    Hero Discipline.md
    Taste Skill Color Rules.md
    Vercel Interface Rule Categories.md
  skills/
    Impeccable Toolchain.md
    Make Interfaces Feel Better.md
    Taste Skill Project.md
    Vercel Web Design Guidelines.md
  AI Instructions.md
  Architecture.md
  Authentication.md
  Coding Standards.md
  Components.md
  Design Rules.md
  DEVELOPMENT.md
  Home.md
  Project Context.md
  Tech Stack.md
prisma/
  migrations/
    20260719134020_test1/
      migration.sql
    20260722213711_add_better_auth_and_rbac/
      migration.sql
    migration_lock.toml
  schema.prisma
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
src/
  actions/
    auth.ts
  app/
    api/
      auth/
        [...all]/
          route.ts
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  components/
    layout/
      footer.tsx
      header.tsx
    sections/
      cta.tsx
      features.tsx
      hero.tsx
      stats.tsx
    theme/
      mode-toggle.tsx
    ui/
      __tests__/
        card.test.tsx
      badge.tsx
      button.tsx
      card.tsx
      input.tsx
      label.tsx
      separator.tsx
  lib/
    __tests__/
      utils.test.ts
    errors/
      index.ts
    validations/
      auth.ts
      user.ts
    auth-client.ts
    auth.ts
    db.ts
    env.ts
    utils.ts
  providers/
    theme-provider.tsx
  repositories/
    permission.ts
    role-permission.ts
    role.ts
    session.ts
    user-role.ts
    user.ts
  services/
    auth.ts
    authorization.ts
    session.ts
    user.ts
.env.example
.gitignore
AGENTS.md
components.json
eslint.config.mjs
jest.config.ts
jest.setup.ts
knip.json
next.config.ts
package.json
pnpm-workspace.yaml
postcss.config.mjs
prisma.config.ts
proxy.ts
README.md
skills-lock.json
tsconfig.json
```

# Files

## File: .agents/rules/graphify.md

```markdown
1: ---
2: trigger: always_on
3: description: Consult the graphify knowledge graph at graphify-out/ for codebase and architecture questions.
4: ---
5:
6: ## graphify
7:
8: This project has a graphify knowledge graph at graphify-out/.
9:
10: Rules:
11:
12: - For codebase or architecture questions, when `graphify-out/graph.json` exists, first run `graphify query "<question>"` (CLI) or `query_graph` (MCP). Use `graphify path "<A>" "<B>"` / `shortest_path` for relationships and `graphify explain "<concept>"` / `get_node` for focused concepts. These return a scoped subgraph, usually much smaller than `GRAPH_REPORT.md` or raw grep output.
13: - If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
14: - Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context
15: - After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
```

## File: .agents/skills/better-auth-best-practices/SKILL.md

```markdown
1: ---
2: name: better-auth-best-practices
3: description: Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables. Use when users mention Better Auth, betterauth, auth.ts, or need to set up TypeScript authentication with email/password, OAuth, or plugin configuration.
4: ---
5:
6: # Better Auth Integration Guide
7:
8: **Always consult [better-auth.com/docs](https://better-auth.com/docs) for code examples and latest API.**
9:
10: ---
11:
12: ## Setup Workflow
13:
14: 1. Install: `npm install better-auth`
15: 2. Set env vars: `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`
16: 3. Create `auth.ts` with database + config
17: 4. Create route handler for your framework
18: 5. Run migrations:
19: - **Built-in adapter:** `npx @better-auth/cli@latest migrate`
20: - **Drizzle:** `npx @better-auth/cli@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit push` (dev) or `npx drizzle-kit generate && npx drizzle-kit migrate` (prod)
21: - **Prisma:** `npx @better-auth/cli@latest generate --output prisma/schema.prisma` then `npx prisma migrate dev`
22: 6. Verify: call `GET /api/auth/ok` — should return `{ status: "ok" }`
23:
24: ---
25:
26: ## Quick Reference
27:
28: ### Environment Variables
29:
30: - `BETTER_AUTH_SECRET` - Encryption secret (min 32 chars). Generate: `openssl rand -base64 32`
31: - `BETTER_AUTH_URL` - Base URL (e.g., `https://example.com`)
32:
33: Only define `baseURL`/`secret` in config if env vars are NOT set.
34:
35: ### File Location
36:
37: CLI looks for `auth.ts` in: `./`, `./lib`, `./utils`, or under `./src`. Use `--config` for custom path.
38:
39: ### CLI Commands
40:
41: - `npx @better-auth/cli@latest migrate` - Apply schema (built-in adapter)
42: - `npx @better-auth/cli@latest generate` - Generate schema for Prisma/Drizzle
43: - `npx @better-auth/cli mcp --cursor` - Add MCP to AI tools
44:
45: **Re-run after adding/changing plugins.**
46:
47: ---
48:
49: ## Core Config Options
50:
51: | Option | Notes |
52: | ------------------ | ---------------------------------------------- |
53: | `appName` | Optional display name |
54: | `baseURL` | Only if `BETTER_AUTH_URL` not set |
55: | `basePath` | Default `/api/auth`. Set `/` for root. |
56: | `secret` | Only if `BETTER_AUTH_SECRET` not set |
57: | `database` | Required for most features. See adapters docs. |
58: | `secondaryStorage` | Redis/KV for sessions & rate limits |
59: | `emailAndPassword` | `{ enabled: true }` to activate |
60: | `socialProviders` | `{ google: { clientId, clientSecret }, ... }` |
61: | `plugins` | Array of plugins |
62: | `trustedOrigins` | CSRF whitelist |
63:
64: ---
65:
66: ## Database
67:
68: **Direct connections:** Pass `pg.Pool`, `mysql2` pool, `better-sqlite3`, or `bun:sqlite` instance. For Postgres, also supports `postgres` (postgres.js) and `@neondatabase/serverless`.
69:
70: **ORM adapters:** Import from `better-auth/adapters/drizzle`, `better-auth/adapters/prisma`, `better-auth/adapters/mongodb`.
71:
72: **Drizzle provider values:** `"pg"` (PostgreSQL), `"mysql"` (MySQL), `"sqlite"` (SQLite). Must match the driver used.
73:
74: **Critical:** Better Auth uses adapter model names, NOT underlying table names. If Prisma model is `User` mapping to table `users`, use `modelName: "user"` (Prisma reference), not `"users"`.
75:
76: ---
77:
78: ## Session Management
79:
80: **Storage priority:**
81:
82: 1. If `secondaryStorage` defined → sessions go there (not DB)
83: 2. Set `session.storeSessionInDatabase: true` to also persist to DB
84: 3. No database + `cookieCache` → fully stateless mode
85:
86: **Cookie cache strategies:**
87:
88: - `compact` (default) - Base64url + HMAC. Smallest.
89: - `jwt` - Standard JWT. Readable but signed.
90: - `jwe` - Encrypted. Maximum security.
91:
92: **Key options:** `session.expiresIn` (default 7 days), `session.updateAge` (refresh interval), `session.cookieCache.maxAge`, `session.cookieCache.version` (change to invalidate all sessions).
93:
94: ---
95:
96: ## User & Account Config
97:
98: **User:** `user.modelName`, `user.fields` (column mapping), `user.additionalFields`, `user.changeEmail.enabled` (disabled by default), `user.deleteUser.enabled` (disabled by default).
99:
100: **Account:** `account.modelName`, `account.accountLinking.enabled`, `account.storeAccountCookie` (for stateless OAuth).
101:
102: **Required for registration:** `email` and `name` fields.
103:
104: ---
105:
106: ## Email Flows
107:
108: - `emailVerification.sendVerificationEmail` - Must be defined for verification to work
109: - `emailVerification.sendOnSignUp` / `sendOnSignIn` - Auto-send triggers
110: - `emailAndPassword.sendResetPassword` - Password reset email handler
111:
112: ---
113:
114: ## Security
115:
116: **In `advanced`:**
117:
118: - `useSecureCookies` - Force HTTPS cookies
119: - `disableCSRFCheck` - ⚠️ Security risk
120: - `disableOriginCheck` - ⚠️ Security risk
121: - `crossSubDomainCookies.enabled` - Share cookies across subdomains
122: - `ipAddress.ipAddressHeaders` - Custom IP headers for proxies
123: - `database.generateId` - Custom ID generation or `"serial"`/`"uuid"`/`false`
124:
125: **Rate limiting:** `rateLimit.enabled`, `rateLimit.window`, `rateLimit.max`, `rateLimit.storage` ("memory" | "database" | "secondary-storage").
126:
127: ---
128:
129: ## Hooks
130:
131: **Endpoint hooks:** `hooks.before` / `hooks.after` - Array of `{ matcher, handler }`. Use `createAuthMiddleware`. Access `ctx.path`, `ctx.context.returned` (after), `ctx.context.session`.
132:
133: **Database hooks:** `databaseHooks.user.create.before/after`, same for `session`, `account`. Useful for adding default values or post-creation actions.
134:
135: **Hook context (`ctx.context`):** `session`, `secret`, `authCookies`, `password.hash()`/`verify()`, `adapter`, `internalAdapter`, `generateId()`, `tables`, `baseURL`.
136:
137: ---
138:
139: ## Plugins
140:
141: **Import from dedicated paths for tree-shaking:**
142:
143: `144: import { twoFactor } from "better-auth/plugins/two-factor"
145:`
146:
147: NOT `from "better-auth/plugins"`.
148:
149: **Popular plugins:** `twoFactor`, `organization`, `passkey`, `magicLink`, `emailOtp`, `username`, `phoneNumber`, `admin`, `apiKey`, `bearer`, `jwt`, `multiSession`, `sso`, `oauthProvider`, `oidcProvider`, `openAPI`, `genericOAuth`.
150:
151: Client plugins go in `createAuthClient({ plugins: [...] })`.
152:
153: ---
154:
155: ## Client
156:
157: Import from: `better-auth/client` (vanilla), `better-auth/react`, `better-auth/vue`, `better-auth/svelte`, `better-auth/solid`.
158:
159: Key methods: `signUp.email()`, `signIn.email()`, `signIn.social()`, `signOut()`, `useSession()`, `getSession()`, `revokeSession()`, `revokeSessions()`.
160:
161: ---
162:
163: ## Type Safety
164:
165: Infer types: `typeof auth.$Infer.Session`, `typeof auth.$Infer.Session.user`.
166:
167: For separate client/server projects: `createAuthClient<typeof auth>()`.
168:
169: ---
170:
171: ## Common Gotchas
172:
173: 1. **Model vs table name** - Config uses ORM model name, not DB table name
174: 2. **Plugin schema** - Re-run CLI after adding plugins
175: 3. **Secondary storage** - Sessions go there by default, not DB
176: 4. **Cookie cache** - Custom session fields NOT cached, always re-fetched
177: 5. **Stateless mode** - No DB = session in cookie only, logout on cache expiry
178: 6. **Change email flow** - Sends to current email first, then new email
179: 7. **Drizzle: db not initialized** - `drizzleAdapter(db, ...)` requires a `db` instance from `drizzle()`. See `create-auth` skill for setup examples (node-postgres, postgres.js, Neon).
180: 8. **Drizzle: missing drizzle.config.ts** - `drizzle-kit` commands require a `drizzle.config.ts` pointing to the generated schema file and DB credentials.
181:
182: ---
183:
184: ## Resources
185:
186: - [Docs](https://better-auth.com/docs)
187: - [Options Reference](https://better-auth.com/docs/reference/options)
188: - [LLMs.txt](https://better-auth.com/llms.txt)
189: - [GitHub](https://github.com/better-auth/better-auth)
190: - [Init Options Source](https://github.com/better-auth/better-auth/blob/main/packages/core/src/types/init-options.ts)
```

## File: .agents/skills/better-auth-security-best-practices/SKILL.md

```markdown
1: ---
2: name: better-auth-security-best-practices
3: description: Configure rate limiting, manage auth secrets, set up CSRF protection, define trusted origins, secure sessions and cookies, encrypt OAuth tokens, track IP addresses, and implement audit logging for Better Auth. Use when users need to secure their auth setup, prevent brute force attacks, or harden a Better Auth deployment.
4: ---
5:
6: ## Secret Management
7:
8: ### Configuring the Secret
9:
10: ``ts
 11: import { betterAuth } from "better-auth";
 12: 
 13: export const auth = betterAuth({
 14:   secret: process.env.BETTER_AUTH_SECRET, // or via `BETTER_AUTH_SECRET` env
 15: });
 16: ``
17:
18: Better Auth looks for secrets in this order:
19:
20: 1. `options.secret` in your config
21: 2. `BETTER_AUTH_SECRET` environment variable
22: 3. `AUTH_SECRET` environment variable
23:
24: ### Secret Requirements
25:
26: - Rejects default/placeholder secrets in production
27: - Warns if shorter than 32 characters or entropy below 120 bits
28: - Generate: `openssl rand -base64 32`
29: - Never commit secrets to version control
30:
31: ## Rate Limiting
32:
33: Enabled in production by default. Applies to all endpoints. Plugins can override per-endpoint.
34:
35: ### Default Configuration
36:
37: `ts
 38: import { betterAuth } from "better-auth";
 39: 
 40: export const auth = betterAuth({
 41:   rateLimit: {
 42:     enabled: true, // Default: true in production
 43:     window: 10, // Time window in seconds (default: 10)
 44:     max: 100, // Max requests per window (default: 100)
 45:   },
 46: });
 47: `
48:
49: ### Storage Options
50:
51: Options: `"memory"` (resets on restart, avoid on serverless), `"database"` (persistent), `"secondary-storage"` (Redis, default when available).
52:
53: `ts
 54: rateLimit: {
 55:   storage: "database",
 56: }
 57: `
58:
59: ### Custom Storage
60:
61: Implement your own rate limit storage:
62:
63: `ts
 64: rateLimit: {
 65:   customStorage: {
 66:     get: async (key) => {
 67:       // Return { count: number, expiresAt: number } or null
 68:     },
 69:     set: async (key, data) => {
 70:       // Store the rate limit data
 71:     },
 72:   },
 73: }
 74: `
75:
76: ### Per-Endpoint Rules
77:
78: Sensitive endpoints default to 3 requests per 10 seconds (`/sign-in`, `/sign-up`, `/change-password`, `/change-email`). Override:
79:
80: `ts
 81: rateLimit: {
 82:   customRules: {
 83:     "/api/auth/sign-in/email": {
 84:       window: 60, // 1 minute window
 85:       max: 5, // 5 attempts
 86:     },
 87:     "/api/auth/some-safe-endpoint": false, // Disable rate limiting
 88:   },
 89: }
 90: `
91:
92: ## CSRF Protection
93:
94: Multi-layer protection: origin header validation, Fetch Metadata checks, and first-login protection.
95:
96: ### Configuration
97:
98: `ts
 99: import { betterAuth } from "better-auth";
100: 
101: export const auth = betterAuth({
102:   advanced: {
103:     disableCSRFCheck: false, // Default: false (keep enabled)
104:   },
105: });
106: `
107:
108: Only disable for testing or with an alternative CSRF mechanism.
109:
110: ## Trusted Origins
111:
112: ### Configuring Trusted Origins
113:
114: `ts
115: import { betterAuth } from "better-auth";
116: 
117: export const auth = betterAuth({
118:   baseURL: "https://api.example.com",
119:   trustedOrigins: ["https://app.example.com", "https://admin.example.com"],
120: });
121: `
122:
123: The `baseURL` origin is automatically trusted. Also configurable via env: `BETTER_AUTH_TRUSTED_ORIGINS=https://app.example.com,https://admin.example.com`
124:
125: ### Wildcard Patterns
126:
127: `ts
128: trustedOrigins: [
129:   "*.example.com", // Matches any subdomain
130:   "https://*.example.com", // Protocol-specific wildcard
131:   "exp://192.168.*.*:*/*", // Custom schemes (e.g., Expo)
132: ];
133: `
134:
135: ### Dynamic Trusted Origins
136:
137: Compute trusted origins based on the request:
138:
139: ``ts
140: trustedOrigins: async (request) => {
141:   // Validate against database, header, etc.
142:   const tenant = getTenantFromRequest(request);
143:   return [`https://${tenant}.myapp.com`];
144: };
145: ``
146:
147: Validates `callbackURL`, `redirectTo`, `errorCallbackURL`, `newUserCallbackURL`, and `origin` against trusted origins. Invalid URLs receive 403.
148:
149: ## Session Security
150:
151: ### Session Expiration
152:
153: `ts
154: import { betterAuth } from "better-auth";
155: 
156: export const auth = betterAuth({
157:   session: {
158:     expiresIn: 60 * 60 * 24 * 7, // 7 days (default)
159:     updateAge: 60 * 60 * 24, // Refresh session every 24 hours (default)
160:   },
161: });
162: `
163:
164: ### Session Caching Strategies
165:
166: Cache session data in cookies to reduce database queries:
167:
168: `ts
169: session: {
170:   cookieCache: {
171:     enabled: true,
172:     maxAge: 60 * 5, // 5 minutes
173:     strategy: "compact", // Options: "compact", "jwt", "jwe"
174:   },
175: }
176: `
177:
178: Strategies: `"compact"` (Base64url + HMAC, smallest), `"jwt"` (HS256, standard), `"jwe"` (encrypted, use when session has sensitive data).
179:
180: ## Cookie Security
181:
182: Defaults: `secure: true` (HTTPS/production), `sameSite: "lax"`, `httpOnly: true`, `path: "/"`, prefix `__Secure-`.
183:
184: ### Custom Cookie Configuration
185:
186: `ts
187: import { betterAuth } from "better-auth";
188: 
189: export const auth = betterAuth({
190:   advanced: {
191:     useSecureCookies: true, // Force secure cookies
192:     cookiePrefix: "myapp", // Custom prefix (default: "better-auth")
193:     defaultCookieAttributes: {
194:       sameSite: "strict", // Stricter CSRF protection
195:       path: "/auth", // Limit cookie scope
196:     },
197:   },
198: });
199: `
200:
201: ### Cross-Subdomain Cookies
202:
203: `ts
204: advanced: {
205:   crossSubDomainCookies: {
206:     enabled: true,
207:     domain: ".example.com", // Note the leading dot
208:     additionalCookies: ["session_token", "session_data"],
209:   },
210: }
211: `
212:
213: Only enable if you need authentication sharing and trust all subdomains.
214:
215: ## OAuth / Social Provider Security
216:
217: PKCE is automatic for all OAuth flows. State tokens are 32-char random strings expiring after 10 minutes.
218:
219: ### State Parameter Storage
220:
221: `ts
222: import { betterAuth } from "better-auth";
223: 
224: export const auth = betterAuth({
225:   account: {
226:     storeStateStrategy: "cookie", // Options: "cookie" (default), "database"
227:   },
228: });
229: `
230:
231: ### Encrypting OAuth Tokens
232:
233: `ts
234: account: {
235:   encryptOAuthTokens: true, // Uses AES-256-GCM
236: }
237: `
238:
239: Enable if storing OAuth tokens for API access on behalf of users. Use `skipStateCookieCheck: true` only for mobile apps that cannot maintain cookies.
240:
241: ## IP-Based Security
242:
243: ### IP Address Configuration
244:
245: `ts
246: import { betterAuth } from "better-auth";
247: 
248: export const auth = betterAuth({
249:   advanced: {
250:     ipAddress: {
251:       ipAddressHeaders: ["x-forwarded-for", "x-real-ip"], // Headers to check
252:       disableIpTracking: false, // Keep enabled for rate limiting
253:     },
254:   },
255: });
256: `
257:
258: Set `ipv6Subnet` (128, 64, 48, 32; default 64) to group IPv6 addresses. Enable `trustedProxyHeaders: true` only if behind a trusted reverse proxy.
259:
260: ## Database Hooks for Security Auditing
261:
262: `ts
263: import { betterAuth } from "better-auth";
264: 
265: export const auth = betterAuth({
266:   databaseHooks: {
267:     session: {
268:       create: {
269:         after: async ({ data, ctx }) => {
270:           await auditLog("session.created", {
271:             userId: data.userId,
272:             ip: ctx?.request?.headers.get("x-forwarded-for"),
273:             userAgent: ctx?.request?.headers.get("user-agent"),
274:           });
275:         },
276:       },
277:       delete: {
278:         before: async ({ data }) => {
279:           await auditLog("session.revoked", { sessionId: data.id });
280:         },
281:       },
282:     },
283:     user: {
284:       update: {
285:         after: async ({ data, oldData }) => {
286:           if (oldData?.email !== data.email) {
287:             await auditLog("user.email_changed", {
288:               userId: data.id,
289:               oldEmail: oldData?.email,
290:               newEmail: data.email,
291:             });
292:           }
293:         },
294:       },
295:     },
296:     account: {
297:       create: {
298:         after: async ({ data }) => {
299:           await auditLog("account.linked", {
300:             userId: data.userId,
301:             provider: data.providerId,
302:           });
303:         },
304:       },
305:     },
306:   },
307: });
308: `
309:
310: Return `false` from a `before` hook to prevent an operation.
311:
312: ## Background Tasks
313:
314: `ts
315: import { betterAuth } from "better-auth";
316: 
317: export const auth = betterAuth({
318:   advanced: {
319:     backgroundTasks: {
320:       handler: (promise) => {
321:         // Platform-specific handler
322:         // Vercel: waitUntil(promise)
323:         // Cloudflare: ctx.waitUntil(promise)
324:         waitUntil(promise);
325:       },
326:     },
327:   },
328: });
329: `
330:
331: Ensures operations like sending emails don't affect response timing.
332:
333: ## Account Enumeration Prevention
334:
335: Built-in: consistent response messages, dummy operations on invalid requests, background email sending. Return generic error messages ("Invalid credentials") rather than specific ones ("User not found").
336:
337: ## Complete Security Configuration Example
338:
339: ``ts
340: import { betterAuth } from "better-auth";
341: 
342: export const auth = betterAuth({
343:   secret: process.env.BETTER_AUTH_SECRET,
344:   baseURL: "https://api.example.com",
345:   trustedOrigins: ["https://app.example.com", "https://*.preview.example.com"],
346: 
347:   // Rate limiting
348:   rateLimit: {
349:     enabled: true,
350:     storage: "secondary-storage",
351:     customRules: {
352:       "/api/auth/sign-in/email": { window: 60, max: 5 },
353:       "/api/auth/sign-up/email": { window: 60, max: 3 },
354:     },
355:   },
356: 
357:   // Session security
358:   session: {
359:     expiresIn: 60 * 60 * 24 * 7, // 7 days
360:     updateAge: 60 * 60 * 24, // 24 hours
361:     freshAge: 60 * 60, // 1 hour for sensitive actions
362:     cookieCache: {
363:       enabled: true,
364:       maxAge: 300,
365:       strategy: "jwe", // Encrypted session data
366:     },
367:   },
368: 
369:   // OAuth security
370:   account: {
371:     encryptOAuthTokens: true,
372:     storeStateStrategy: "cookie",
373:   },
374: 
375:   // Advanced settings
376:   advanced: {
377:     useSecureCookies: true,
378:     cookiePrefix: "myapp",
379:     defaultCookieAttributes: {
380:       sameSite: "lax",
381:     },
382:     ipAddress: {
383:       ipAddressHeaders: ["x-forwarded-for"],
384:       ipv6Subnet: 64,
385:     },
386:     backgroundTasks: {
387:       handler: (promise) => waitUntil(promise),
388:     },
389:   },
390: 
391:   // Security auditing
392:   databaseHooks: {
393:     session: {
394:       create: {
395:         after: async ({ data, ctx }) => {
396:           console.log(`New session for user ${data.userId}`);
397:         },
398:       },
399:     },
400:     user: {
401:       update: {
402:         after: async ({ data, oldData }) => {
403:           if (oldData?.email !== data.email) {
404:             console.log(`Email changed for user ${data.id}`);
405:           }
406:         },
407:       },
408:     },
409:   },
410: });
411: ``
412:
413: ## Security Checklist
414:
415: Before deploying to production:
416:
417: - [ ] **Secret**: Use a strong, unique secret (32+ characters, high entropy)
418: - [ ] **HTTPS**: Ensure `baseURL` uses HTTPS
419: - [ ] **Trusted Origins**: Configure all valid origins (frontend, mobile apps)
420: - [ ] **Rate Limiting**: Keep enabled with appropriate limits
421: - [ ] **CSRF Protection**: Keep enabled (`disableCSRFCheck: false`)
422: - [ ] **Secure Cookies**: Enabled automatically with HTTPS
423: - [ ] **OAuth Tokens**: Consider `encryptOAuthTokens: true` if storing tokens
424: - [ ] **Background Tasks**: Configure for serverless platforms
425: - [ ] **Audit Logging**: Implement via `databaseHooks` or `hooks`
426: - [ ] **IP Tracking**: Configure headers if behind a proxy
```

## File: .agents/skills/create-auth/SKILL.md

```markdown
1: ---
2: name: create-auth
3: description: Scaffold and implement authentication in TypeScript/JavaScript apps using Better Auth. Detect frameworks, configure database adapters, set up route handlers, add OAuth providers, and create auth UI pages. Use when users want to add login, sign-up, or authentication to a new or existing project with Better Auth.
4: ---
5:
6: # Create Auth Skill
7:
8: Guide for adding authentication to TypeScript/JavaScript applications using Better Auth.
9:
10: **For code examples and syntax, see [better-auth.com/docs](https://better-auth.com/docs).**
11:
12: ---
13:
14: ## Phase 1: Planning (REQUIRED before implementation)
15:
16: Before writing any code, gather requirements by scanning the project and asking the user structured questions. This ensures the implementation matches their needs.
17:
18: ### Step 1: Scan the project
19:
20: Analyze the codebase to auto-detect:
21:
22: - **Framework** — Look for `next.config`, `svelte.config`, `nuxt.config`, `astro.config`, `vite.config`, or Express/Hono entry files.
23: - **Database/ORM** — Look for `prisma/schema.prisma`, `drizzle.config.ts`, `package.json` deps (`pg`, `postgres`, `@neondatabase/serverless`, `mysql2`, `better-sqlite3`, `mongoose`, `mongodb`). If `drizzle.config.ts` exists, read its `dialect` field to determine the DB type (e.g., `"postgresql"` → Drizzle + Postgres). Also check which Drizzle driver is installed (`drizzle-orm/node-postgres` → `pg`, `drizzle-orm/postgres-js` → `postgres`, `drizzle-orm/neon-http` → Neon).
24: - **Existing auth** — Look for existing auth libraries (`next-auth`, `lucia`, `clerk`, `supabase/auth`, `firebase/auth`) in `package.json` or imports.
25: - **Package manager** — Check for `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`, or `package-lock.json`.
26:
27: Use what you find to pre-fill defaults and skip questions you can already answer.
28:
29: ### Step 2: Ask planning questions
30:
31: Use the `AskQuestion` tool to ask the user **all applicable questions in a single call**. Skip any question you already have a confident answer for from the scan. Group them under a title like "Auth Setup Planning".
32:
33: **Questions to ask:**
34:
35: 1. **Project type** (skip if detected)
36: - Prompt: "What type of project is this?"
37: - Options: New project from scratch | Adding auth to existing project | Migrating from another auth library
38:
39: 2. **Framework** (skip if detected)
40: - Prompt: "Which framework are you using?"
41: - Options: Next.js (App Router) | Next.js (Pages Router) | SvelteKit | Nuxt | Astro | Express | Hono | SolidStart | Other
42:
43: 3. **Database & ORM** (skip if detected)
44: - Prompt: "Which database setup will you use?"
45: - Options: PostgreSQL (Prisma) | PostgreSQL (Drizzle) | PostgreSQL (pg driver) | MySQL (Prisma) | MySQL (Drizzle) | MySQL (mysql2 driver) | SQLite (Prisma) | SQLite (Drizzle) | SQLite (better-sqlite3 driver) | MongoDB (Mongoose) | MongoDB (native driver)
46:
47: 4. **Authentication methods** (always ask, allow multiple)
48: - Prompt: "Which sign-in methods do you need?"
49: - Options: Email & password | Social OAuth (Google, GitHub, etc.) | Magic link (passwordless email) | Passkey (WebAuthn) | Phone number
50: - `allow_multiple: true`
51:
52: 5. **Social providers** (only if they selected Social OAuth above — ask in a follow-up call)
53: - Prompt: "Which social providers do you need?"
54: - Options: Google | GitHub | Apple | Microsoft | Discord | Twitter/X
55: - `allow_multiple: true`
56:
57: 6. **Email verification** (only if Email & password was selected above — ask in a follow-up call)
58: - Prompt: "Do you want to require email verification?"
59: - Options: Yes | No
60:
61: 7. **Email provider** (only if email verification is Yes, or if Password reset is selected in features — ask in a follow-up call)
62: - Prompt: "How do you want to send emails?"
63: - Options: Resend | Mock it for now (console.log)
64:
65: 8. **Features & plugins** (always ask, allow multiple)
66: - Prompt: "Which additional features do you need?"
67: - Options: Two-factor authentication (2FA) | Organizations / teams | Admin dashboard | API bearer tokens | Password reset | None of these
68: - `allow_multiple: true`
69:
70: 9. **Auth pages** (always ask, allow multiple — pre-select based on earlier answers)
71: - Prompt: "Which auth pages do you need?"
72: - Options vary based on previous answers:
73: - Always available: Sign in | Sign up
74: - If Email & password selected: Forgot password | Reset password
75: - If email verification enabled: Email verification
76: - `allow_multiple: true`
77:
78: 10. **Auth UI style** (always ask)
79:
80: - Prompt: "What style do you want for the auth pages? Pick one or describe your own."
81: - Options: Minimal & clean | Centered card with background | Split layout (form + hero image) | Floating / glassmorphism | Other (I'll describe)
82:
83: ### Step 3: Summarize the plan
84:
85: After collecting answers, present a concise implementation plan as a markdown checklist. Example:
86:
87: `` 88: ## Auth Implementation Plan
 89: 
 90: - **Framework:** Next.js (App Router)
 91: - **Database:** PostgreSQL via Prisma
 92: - **Auth methods:** Email/password, Google OAuth, GitHub OAuth
 93: - **Plugins:** 2FA, Organizations, Email verification
 94: - **UI:** Custom forms
 95: 
 96: ### Steps
 97: 1. Install `better-auth` and `@better-auth/cli`
 98: 2. Create `lib/auth.ts` with server config
 99: 3. Create `lib/auth-client.ts` with React client
100: 4. Set up route handler at `app/api/auth/[...all]/route.ts`
101: 5. Configure Prisma adapter and generate schema
102: 6. Add Google & GitHub OAuth providers
103: 7. Enable `twoFactor` and `organization` plugins
104: 8. Set up email verification handler
105: 9. Run migrations
106: 10. Create sign-in / sign-up pages
107:``
108:
109: Ask the user to confirm the plan before proceeding to Phase 2.
110:
111: ---
112:
113: ## Phase 2: Implementation
114:
115: Only proceed here after the user confirms the plan from Phase 1.
116:
117: Follow the decision tree below, guided by the answers collected above.
118:
119: `120: Is this a new/empty project?
121: ├─ YES → New project setup
122: │   1. Install better-auth (+ scoped packages per plan)
123: │   2. Create auth.ts with all planned config
124: │   3. Create auth-client.ts with framework client
125: │   4. Set up route handler
126: │   5. Set up environment variables
127: │   6. Run CLI migrate/generate
128: │   7. Add plugins from plan
129: │   8. Create auth UI pages
130: │
131: ├─ MIGRATING → Migration from existing auth
132: │   1. Audit current auth for gaps
133: │   2. Plan incremental migration
134: │   3. Install better-auth alongside existing auth
135: │   4. Migrate routes, then session logic, then UI
136: │   5. Remove old auth library
137: │   6. See migration guides in docs
138: │
139: └─ ADDING → Add auth to existing project
140:     1. Analyze project structure
141:     2. Install better-auth
142:     3. Create auth config matching plan
143:     4. Add route handler
144:     5. Run schema migrations
145:     6. Integrate into existing pages
146:     7. Add planned plugins and features
147:`
148:
149: At the end of implementation, guide users thoroughly on remaining next steps (e.g., setting up OAuth app credentials, deploying env vars, testing flows).
150:
151: ---
152:
153: ## Installation
154:
155: **Core:** `npm install better-auth`
156:
157: **Scoped packages (as needed):**
158:
159: | Package | Use case |
160: | ---------------------- | ------------------------ |
161: | `@better-auth/passkey` | WebAuthn/Passkey auth |
162: | `@better-auth/sso` | SAML/OIDC enterprise SSO |
163: | `@better-auth/stripe` | Stripe payments |
164: | `@better-auth/scim` | SCIM user provisioning |
165: | `@better-auth/expo` | React Native/Expo |
166:
167: ---
168:
169: ## Environment Variables
170:
171: `env
172: BETTER_AUTH_SECRET=<32+ chars, generate with: openssl rand -base64 32>
173: BETTER_AUTH_URL=http://localhost:3000
174: DATABASE_URL=<your database connection string>
175: `
176:
177: Add OAuth secrets as needed: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, etc.
178:
179: ---
180:
181: ## Server Config (auth.ts)
182:
183: **Location:** `lib/auth.ts` or `src/lib/auth.ts`
184:
185: **Minimal config needs:**
186:
187: - `database` - Connection or adapter
188: - `emailAndPassword: { enabled: true }` - For email/password auth
189:
190: **Standard config adds:**
191:
192: - `socialProviders` - OAuth providers (google, github, etc.)
193: - `emailVerification.sendVerificationEmail` - Email verification handler
194: - `emailAndPassword.sendResetPassword` - Password reset handler
195:
196: **Full config adds:**
197:
198: - `plugins` - Array of feature plugins
199: - `session` - Expiry, cookie cache settings
200: - `account.accountLinking` - Multi-provider linking
201: - `rateLimit` - Rate limiting config
202:
203: **Export types:** `export type Session = typeof auth.$Infer.Session`
204:
205: ---
206:
207: ## Client Config (auth-client.ts)
208:
209: **Import by framework:**
210:
211: | Framework | Import |
212: | ------------- | -------------------- |
213: | React/Next.js | `better-auth/react` |
214: | Vue | `better-auth/vue` |
215: | Svelte | `better-auth/svelte` |
216: | Solid | `better-auth/solid` |
217: | Vanilla JS | `better-auth/client` |
218:
219: **Client plugins** go in `createAuthClient({ plugins: [...] })`.
220:
221: **Common exports:** `signIn`, `signUp`, `signOut`, `useSession`, `getSession`
222:
223: ---
224:
225: ## Route Handler Setup
226:
227: | Framework | File | Handler |
228: | ------------------ | -------------------------------- | ------------------------------------------------ |
229: | Next.js App Router | `app/api/auth/[...all]/route.ts` | `toNextJsHandler(auth)` → export `{ GET, POST }` |
230: | Next.js Pages | `pages/api/auth/[...all].ts` | `toNextJsHandler(auth)` → default export |
231: | Express | Any file | `app.all("/api/auth/*", toNodeHandler(auth))` |
232: | SvelteKit | `src/hooks.server.ts` | `svelteKitHandler(auth)` |
233: | SolidStart | Route file | `solidStartHandler(auth)` |
234: | Hono | Route file | `auth.handler(c.req.raw)` |
235:
236: **Next.js Server Components:** Add `nextCookies()` plugin to auth config.
237:
238: ---
239:
240: ## Database Migrations
241:
242: | Adapter | Command |
243: | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
244: | Built-in Kysely | `npx @better-auth/cli@latest migrate` (applies directly) |
245: | Prisma | `npx @better-auth/cli@latest generate --output prisma/schema.prisma` then `npx prisma migrate dev` |
246: | Drizzle (dev) | `npx @better-auth/cli@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit push` |
247: | Drizzle (prod) | `npx @better-auth/cli@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit generate` then `npx drizzle-kit migrate` |
248:
249: > **Note:** `drizzle-kit push` skips migration files and is only safe for development. Use `drizzle-kit generate` + `drizzle-kit migrate` in production.
250:
251: **Re-run after adding plugins.**
252:
253: ---
254:
255: ## Database Adapters
256:
257: | Database | Setup |
258: | ---------------- | -------------------------------------------------------------------------------------- |
259: | SQLite | Pass `better-sqlite3` or `bun:sqlite` instance directly |
260: | PostgreSQL | Pass `pg.Pool` instance directly |
261: | MySQL | Pass `mysql2` pool directly |
262: | Prisma | `prismaAdapter(prisma, { provider: "postgresql" })` from `better-auth/adapters/prisma` |
263: | Drizzle (pg) | `drizzleAdapter(db, { provider: "pg" })` from `better-auth/adapters/drizzle` |
264: | Drizzle (mysql) | `drizzleAdapter(db, { provider: "mysql" })` from `better-auth/adapters/drizzle` |
265: | Drizzle (sqlite) | `drizzleAdapter(db, { provider: "sqlite" })` from `better-auth/adapters/drizzle` |
266: | MongoDB | `mongodbAdapter(db)` from `better-auth/adapters/mongodb` |
267:
268: ### Drizzle + PostgreSQL Setup
269:
270: Before using `drizzleAdapter`, initialize the `db` instance:
271:
272: `ts
273: // Option 1: node-postgres (pg)
274: import { drizzle } from "drizzle-orm/node-postgres";
275: import { Pool } from "pg";
276: import * as schema from "./auth-schema";
277: 
278: const pool = new Pool({ connectionString: process.env.DATABASE_URL });
279: export const db = drizzle(pool, { schema });
280: `
281:
282: `ts
283: // Option 2: postgres.js
284: import { drizzle } from "drizzle-orm/postgres-js";
285: import postgres from "postgres";
286: import * as schema from "./auth-schema";
287: 
288: const client = postgres(process.env.DATABASE_URL!);
289: export const db = drizzle(client, { schema });
290: `
291:
292: `ts
293: // Option 3: Neon serverless
294: import { drizzle } from "drizzle-orm/neon-http";
295: import { neon } from "@neondatabase/serverless";
296: import * as schema from "./auth-schema";
297: 
298: const sql = neon(process.env.DATABASE_URL!);
299: export const db = drizzle(sql, { schema });
300: `
301:
302: Then pass to Better Auth:
303:
304: `ts
305: import { betterAuth } from "better-auth";
306: import { drizzleAdapter } from "better-auth/adapters/drizzle";
307: import { db } from "./db";
308: 
309: export const auth = betterAuth({
310:   database: drizzleAdapter(db, { provider: "pg" }),
311:   // ...
312: });
313: `
314:
315: ### Drizzle Config (`drizzle.config.ts`)
316:
317: Required for `drizzle-kit` commands to find your schema:
318:
319: `ts
320: import { defineConfig } from "drizzle-kit";
321: 
322: export default defineConfig({
323:   schema: "./src/db/auth-schema.ts",
324:   out: "./drizzle",
325:   dialect: "postgresql",
326:   dbCredentials: {
327:     url: process.env.DATABASE_URL!,
328:   },
329: });
330: `
331:
332: ---
333:
334: ## Common Plugins
335:
336: | Plugin | Server Import | Client Import | Purpose |
337: | -------------- | ---------------------- | -------------------- | ----------------- |
338: | `twoFactor` | `better-auth/plugins` | `twoFactorClient` | 2FA with TOTP/OTP |
339: | `organization` | `better-auth/plugins` | `organizationClient` | Teams/orgs |
340: | `admin` | `better-auth/plugins` | `adminClient` | User management |
341: | `bearer` | `better-auth/plugins` | - | API token auth |
342: | `openAPI` | `better-auth/plugins` | - | API docs |
343: | `passkey` | `@better-auth/passkey` | `passkeyClient` | WebAuthn |
344: | `sso` | `@better-auth/sso` | - | Enterprise SSO |
345:
346: **Plugin pattern:** Server plugin + client plugin + run migrations.
347:
348: ---
349:
350: ## Auth UI Implementation
351:
352: **Sign in flow:**
353:
354: 1. `signIn.email({ email, password })` or `signIn.social({ provider, callbackURL })`
355: 2. Handle `error` in response
356: 3. Redirect on success
357:
358: **Session check (client):** `useSession()` hook returns `{ data: session, isPending }`
359:
360: **Session check (server):** `auth.api.getSession({ headers: await headers() })`
361:
362: **Protected routes:** Check session, redirect to `/sign-in` if null.
363:
364: ---
365:
366: ## Security Checklist
367:
368: - [ ] `BETTER_AUTH_SECRET` set (32+ chars)
369: - [ ] `advanced.useSecureCookies: true` in production
370: - [ ] `trustedOrigins` configured
371: - [ ] Rate limits enabled
372: - [ ] Email verification enabled
373: - [ ] Password reset implemented
374: - [ ] 2FA for sensitive apps
375: - [ ] CSRF protection NOT disabled
376: - [ ] `account.accountLinking` reviewed
377:
378: ---
379:
380: ## Troubleshooting
381:
382: | Issue | Fix |
383: | ------------------------------- | ------------------------------------------------------------- |
384: | "Secret not set" | Add `BETTER_AUTH_SECRET` env var |
385: | "Invalid Origin" | Add domain to `trustedOrigins` |
386: | Cookies not setting | Check `baseURL` matches domain; enable secure cookies in prod |
387: | OAuth callback errors | Verify redirect URIs in provider dashboard |
388: | Type errors after adding plugin | Re-run CLI generate/migrate |
389:
390: ---
391:
392: ## Resources
393:
394: - [Docs](https://better-auth.com/docs)
395: - [Examples](https://github.com/better-auth/examples)
396: - [Plugins](https://better-auth.com/docs/concepts/plugins)
397: - [CLI](https://better-auth.com/docs/concepts/cli)
398: - [Migration Guides](https://better-auth.com/docs/guides)
```

## File: .agents/skills/email-and-password-best-practices/SKILL.md

```markdown
1: ---
2: name: email-and-password-best-practices
3: description: Configure email verification, implement password reset flows, set password policies, and customise hashing algorithms for Better Auth email/password authentication. Use when users need to set up login, sign-in, sign-up, credential authentication, or password security with Better Auth.
4: ---
5:
6: ## Quick Start
7:
8: 1. Enable email/password: `emailAndPassword: { enabled: true }`
9: 2. Configure `emailVerification.sendVerificationEmail`
10: 3. Add `sendResetPassword` for password reset flows
11: 4. Run `npx @better-auth/cli@latest migrate`
12: 5. Verify: attempt sign-up and confirm verification email triggers
13:
14: ---
15:
16: ## Email Verification Setup
17:
18: Configure `emailVerification.sendVerificationEmail` to verify user email addresses.
19:
20: ``ts
 21: import { betterAuth } from "better-auth";
 22: import { sendEmail } from "./email"; // your email sending function
 23: 
 24: export const auth = betterAuth({
 25:   emailVerification: {
 26:     sendVerificationEmail: async ({ user, url, token }, request) => {
 27:       await sendEmail({
 28:         to: user.email,
 29:         subject: "Verify your email address",
 30:         text: `Click the link to verify your email: ${url}`,
 31:       });
 32:     },
 33:   },
 34: });
 35: ``
36:
37: **Note**: The `url` parameter contains the full verification link. The `token` is available if you need to build a custom verification URL.
38:
39: ### Requiring Email Verification
40:
41: For stricter security, enable `emailAndPassword.requireEmailVerification` to block sign-in until the user verifies their email. When enabled, unverified users will receive a new verification email on each sign-in attempt.
42:
43: `ts
 44: export const auth = betterAuth({
 45:   emailAndPassword: {
 46:     requireEmailVerification: true,
 47:   },
 48: });
 49: `
50:
51: **Note**: This requires `sendVerificationEmail` to be configured and only applies to email/password sign-ins.
52:
53: ## Client Side Validation
54:
55: Implement client-side validation for immediate user feedback and reduced server load.
56:
57: ## Callback URLs
58:
59: Always use absolute URLs (including the origin) for callback URLs in sign-up and sign-in requests. This prevents Better Auth from needing to infer the origin, which can cause issues when your backend and frontend are on different domains.
60:
61: `ts
 62: const { data, error } = await authClient.signUp.email({
 63:   callbackURL: "https://example.com/callback", // absolute URL with origin
 64: });
 65: `
66:
67: ## Password Reset Flows
68:
69: Provide `sendResetPassword` in the email and password config to enable password resets.
70:
71: ``ts
 72: import { betterAuth } from "better-auth";
 73: import { sendEmail } from "./email"; // your email sending function
 74: 
 75: export const auth = betterAuth({
 76:   emailAndPassword: {
 77:     enabled: true,
 78:     // Custom email sending function to send reset-password email
 79:     sendResetPassword: async ({ user, url, token }, request) => {
 80:       void sendEmail({
 81:         to: user.email,
 82:         subject: "Reset your password",
 83:         text: `Click the link to reset your password: ${url}`,
 84:       });
 85:     },
 86:     // Optional event hook
 87:     onPasswordReset: async ({ user }, request) => {
 88:       // your logic here
 89:       console.log(`Password for user ${user.email} has been reset.`);
 90:     },
 91:   },
 92: });
 93: ``
94:
95: ### Security Considerations
96:
97: Built-in protections: background email sending (timing attack prevention), dummy operations on invalid requests, constant response messages regardless of user existence.
98:
99: On serverless platforms, configure a background task handler:
100:
101: `ts
102: export const auth = betterAuth({
103:   advanced: {
104:     backgroundTasks: {
105:       handler: (promise) => {
106:         // Use platform-specific methods like waitUntil
107:         waitUntil(promise);
108:       },
109:     },
110:   },
111: });
112: `
113:
114: #### Token Security
115:
116: Tokens expire after 1 hour by default. Configure with `resetPasswordTokenExpiresIn` (in seconds):
117:
118: `ts
119: export const auth = betterAuth({
120:   emailAndPassword: {
121:     enabled: true,
122:     resetPasswordTokenExpiresIn: 60 * 30, // 30 minutes
123:   },
124: });
125: `
126:
127: Tokens are single-use — deleted immediately after successful reset.
128:
129: #### Session Revocation
130:
131: Enable `revokeSessionsOnPasswordReset` to invalidate all existing sessions on password reset:
132:
133: `ts
134: export const auth = betterAuth({
135:   emailAndPassword: {
136:     enabled: true,
137:     revokeSessionsOnPasswordReset: true,
138:   },
139: });
140: `
141:
142: #### Password Requirements
143:
144: Password length limits (configurable):
145:
146: `ts
147: export const auth = betterAuth({
148:   emailAndPassword: {
149:     enabled: true,
150:     minPasswordLength: 12,
151:     maxPasswordLength: 256,
152:   },
153: });
154: `
155:
156: ### Sending the Password Reset
157:
158: Call `requestPasswordReset` to send the reset link. Triggers the `sendResetPassword` function from your config.
159:
160: `ts
161: const data = await auth.api.requestPasswordReset({
162:   body: {
163:     email: "john.doe@example.com", // required
164:     redirectTo: "https://example.com/reset-password",
165:   },
166: });
167: `
168:
169: Or authClient:
170:
171: `ts
172: const { data, error } = await authClient.requestPasswordReset({
173:   email: "john.doe@example.com", // required
174:   redirectTo: "https://example.com/reset-password",
175: });
176: `
177:
178: **Note**: While the `email` is required, we also recommend configuring the `redirectTo` for a smoother user experience.
179:
180: ## Password Hashing
181:
182: Default: `scrypt` (Node.js native, no external dependencies).
183:
184: ### Custom Hashing Algorithm
185:
186: To use Argon2id or another algorithm, provide custom `hash` and `verify` functions:
187:
188: `ts
189: import { betterAuth } from "better-auth";
190: import { hash, verify, type Options } from "@node-rs/argon2";
191: 
192: const argon2Options: Options = {
193:   memoryCost: 65536, // 64 MiB
194:   timeCost: 3, // 3 iterations
195:   parallelism: 4, // 4 parallel lanes
196:   outputLen: 32, // 32 byte output
197:   algorithm: 2, // Argon2id variant
198: };
199: 
200: export const auth = betterAuth({
201:   emailAndPassword: {
202:     enabled: true,
203:     password: {
204:       hash: (password) => hash(password, argon2Options),
205:       verify: ({ password, hash: storedHash }) =>
206:         verify(storedHash, password, argon2Options),
207:     },
208:   },
209: });
210: `
211:
212: **Note**: If you switch hashing algorithms on an existing system, users with passwords hashed using the old algorithm won't be able to sign in. Plan a migration strategy if needed.
```

## File: .agents/skills/organization-best-practices/SKILL.md

```markdown
1: ---
2: name: organization-best-practices
3: description: Configure multi-tenant organizations, manage members and invitations, define custom roles and permissions, set up teams, and implement RBAC using Better Auth's organization plugin. Use when users need org setup, team management, member roles, access control, or the Better Auth organization plugin.
4: ---
5:
6: ## Setup
7:
8: 1. Add `organization()` plugin to server config
9: 2. Add `organizationClient()` plugin to client config
10: 3. Run `npx @better-auth/cli@latest migrate` (built-in adapter) or generate + push for Drizzle/Prisma
11: 4. Verify: check that organization, member, invitation tables exist in your database
12:
13: `ts
 14: import { betterAuth } from "better-auth";
 15: import { organization } from "better-auth/plugins";
 16: 
 17: export const auth = betterAuth({
 18:   plugins: [
 19:     organization({
 20:       allowUserToCreateOrganization: true,
 21:       organizationLimit: 5, // Max orgs per user
 22:       membershipLimit: 100, // Max members per org
 23:     }),
 24:   ],
 25: });
 26: `
27:
28: ### Client-Side Setup
29:
30: `ts
 31: import { createAuthClient } from "better-auth/client";
 32: import { organizationClient } from "better-auth/client/plugins";
 33: 
 34: export const authClient = createAuthClient({
 35:   plugins: [organizationClient()],
 36: });
 37: `
38:
39: ## Creating Organizations
40:
41: The creator is automatically assigned the `owner` role.
42:
43: `ts
 44: const createOrg = async () => {
 45:   const { data, error } = await authClient.organization.create({
 46:     name: "My Company",
 47:     slug: "my-company",
 48:     logo: "https://example.com/logo.png",
 49:     metadata: { plan: "pro" },
 50:   });
 51: };
 52: `
53:
54: ### Controlling Organization Creation
55:
56: Restrict who can create organizations based on user attributes:
57:
58: `ts
 59: organization({
 60:   allowUserToCreateOrganization: async (user) => {
 61:     return user.emailVerified === true;
 62:   },
 63:   organizationLimit: async (user) => {
 64:     // Premium users get more organizations
 65:     return user.plan === "premium" ? 20 : 3;
 66:   },
 67: });
 68: `
69:
70: ### Creating Organizations on Behalf of Users
71:
72: Administrators can create organizations for other users (server-side only):
73:
74: ``ts
 75: await auth.api.createOrganization({
 76:   body: {
 77:     name: "Client Organization",
 78:     slug: "client-org",
 79:     userId: "user-id-who-will-be-owner", // `userId` is required
 80:   },
 81: });
 82: ``
83:
84: **Note**: The `userId` parameter cannot be used alongside session headers.
85:
86: ## Active Organizations
87:
88: Stored in the session and scopes subsequent API calls. Set after user selects one.
89:
90: `ts
 91: const setActive = async (organizationId: string) => {
 92:   const { data, error } = await authClient.organization.setActive({
 93:     organizationId,
 94:   });
 95: };
 96: `
97:
98: Many endpoints use the active organization when `organizationId` is not provided (`listMembers`, `listInvitations`, `inviteMember`, etc.).
99:
100: Use `getFullOrganization()` to retrieve the active org with all members, invitations, and teams.
101:
102: ## Members
103:
104: ### Adding Members (Server-Side)
105:
106: `ts
107: await auth.api.addMember({
108:   body: {
109:     userId: "user-id",
110:     role: "member",
111:     organizationId: "org-id",
112:   },
113: });
114: `
115:
116: For client-side member additions, use the invitation system instead.
117:
118: ### Assigning Multiple Roles
119:
120: `ts
121: await auth.api.addMember({
122:   body: {
123:     userId: "user-id",
124:     role: ["admin", "moderator"],
125:     organizationId: "org-id",
126:   },
127: });
128: `
129:
130: ### Removing Members
131:
132: Use `removeMember({ memberIdOrEmail })`. The last owner cannot be removed — assign ownership to another member first.
133:
134: ### Updating Member Roles
135:
136: Use `updateMemberRole({ memberId, role })`.
137:
138: ### Membership Limits
139:
140: `ts
141: organization({
142:   membershipLimit: async (user, organization) => {
143:     if (organization.metadata?.plan === "enterprise") {
144:       return 1000;
145:     }
146:     return 50;
147:   },
148: });
149: `
150:
151: ## Invitations
152:
153: ### Setting Up Invitation Emails
154:
155: ``ts
156: import { betterAuth } from "better-auth";
157: import { organization } from "better-auth/plugins";
158: import { sendEmail } from "./email";
159: 
160: export const auth = betterAuth({
161:   plugins: [
162:     organization({
163:       sendInvitationEmail: async (data) => {
164:         const { email, organization, inviter, invitation } = data;
165: 
166:         await sendEmail({
167:           to: email,
168:           subject: `Join ${organization.name}`,
169:           html: `
170:             <p>${inviter.user.name} invited you to join ${organization.name}</p>
171:             <a href="https://yourapp.com/accept-invite?id=${invitation.id}">
172:               Accept Invitation
173:             </a>
174:           `,
175:         });
176:       },
177:     }),
178:   ],
179: });
180: ``
181:
182: ### Sending Invitations
183:
184: `ts
185: await authClient.organization.inviteMember({
186:   email: "newuser@example.com",
187:   role: "member",
188: });
189: `
190:
191: ### Shareable Invitation URLs
192:
193: `ts
194: const { data } = await authClient.organization.getInvitationURL({
195:   email: "newuser@example.com",
196:   role: "member",
197:   callbackURL: "https://yourapp.com/dashboard",
198: });
199: 
200: // Share data.url via any channel
201: `
202:
203: This endpoint does not call `sendInvitationEmail` — handle delivery yourself.
204:
205: ### Invitation Configuration
206:
207: `ts
208: organization({
209:   invitationExpiresIn: 60 * 60 * 24 * 7, // 7 days (default: 48 hours)
210:   invitationLimit: 100, // Max pending invitations per org
211:   cancelPendingInvitationsOnReInvite: true, // Cancel old invites when re-inviting
212: });
213: `
214:
215: ## Roles & Permissions
216:
217: Default roles: `owner` (full access), `admin` (manage members/invitations/settings), `member` (basic access).
218:
219: ### Checking Permissions
220:
221: `ts
222: const { data } = await authClient.organization.hasPermission({
223:   permission: "member:write",
224: });
225: 
226: if (data?.hasPermission) {
227:   // User can manage members
228: }
229: `
230:
231: Use `checkRolePermission({ role, permissions })` for client-side UI rendering (static only). For dynamic access control, use the `hasPermission` endpoint.
232:
233: ## Teams
234:
235: ### Enabling Teams
236:
237: `ts
238: import { organization } from "better-auth/plugins";
239: 
240: export const auth = betterAuth({
241:   plugins: [
242:     organization({
243:       teams: {
244:         enabled: true,
245:       },
246:     }),
247:   ],
248: });
249: `
250:
251: ### Creating Teams
252:
253: `ts
254: const { data } = await authClient.organization.createTeam({
255:   name: "Engineering",
256: });
257: `
258:
259: ### Managing Team Members
260:
261: Use `addTeamMember({ teamId, userId })` (member must be in org first) and `removeTeamMember({ teamId, userId })` (stays in org).
262:
263: Set active team with `setActiveTeam({ teamId })`.
264:
265: ### Team Limits
266:
267: `ts
268: organization({
269:   teams: {
270:     maximumTeams: 20, // Max teams per org
271:     maximumMembersPerTeam: 50, // Max members per team
272:     allowRemovingAllTeams: false, // Prevent removing last team
273:   },
274: });
275: `
276:
277: ## Dynamic Access Control
278:
279: ### Enabling Dynamic Access Control
280:
281: `ts
282: import { organization } from "better-auth/plugins";
283: import { dynamicAccessControl } from "@better-auth/organization/addons";
284: 
285: export const auth = betterAuth({
286:   plugins: [
287:     organization({
288:       dynamicAccessControl: {
289:         enabled: true,
290:       },
291:     }),
292:   ],
293: });
294: `
295:
296: ### Creating Custom Roles
297:
298: `ts
299: await authClient.organization.createRole({
300:   role: "moderator",
301:   permission: {
302:     member: ["read"],
303:     invitation: ["read"],
304:   },
305: });
306: `
307:
308: Use `updateRole({ roleId, permission })` and `deleteRole({ roleId })`. Pre-defined roles (owner, admin, member) cannot be deleted. Roles assigned to members cannot be deleted until reassigned.
309:
310: ## Lifecycle Hooks
311:
312: Execute custom logic at various points in the organization lifecycle:
313:
314: ``ts
315: organization({
316:   hooks: {
317:     organization: {
318:       beforeCreate: async ({ data, user }) => {
319:         // Validate or modify data before creation
320:         return {
321:           data: {
322:             ...data,
323:             metadata: { ...data.metadata, createdBy: user.id },
324:           },
325:         };
326:       },
327:       afterCreate: async ({ organization, member }) => {
328:         // Post-creation logic (e.g., send welcome email, create default resources)
329:         await createDefaultResources(organization.id);
330:       },
331:       beforeDelete: async ({ organization }) => {
332:         // Cleanup before deletion
333:         await archiveOrganizationData(organization.id);
334:       },
335:     },
336:     member: {
337:       afterCreate: async ({ member, organization }) => {
338:         await notifyAdmins(organization.id, `New member joined`);
339:       },
340:     },
341:     invitation: {
342:       afterCreate: async ({ invitation, organization, inviter }) => {
343:         await logInvitation(invitation);
344:       },
345:     },
346:   },
347: });
348: ``
349:
350: ## Schema Customization
351:
352: Customize table names, field names, and add additional fields:
353:
354: `ts
355: organization({
356:   schema: {
357:     organization: {
358:       modelName: "workspace", // Rename table
359:       fields: {
360:         name: "workspaceName", // Rename fields
361:       },
362:       additionalFields: {
363:         billingId: {
364:           type: "string",
365:           required: false,
366:         },
367:       },
368:     },
369:     member: {
370:       additionalFields: {
371:         department: {
372:           type: "string",
373:           required: false,
374:         },
375:         title: {
376:           type: "string",
377:           required: false,
378:         },
379:       },
380:     },
381:   },
382: });
383: `
384:
385: ## Security Considerations
386:
387: ### Owner Protection
388:
389: - The last owner cannot be removed from an organization
390: - The last owner cannot leave the organization
391: - The owner role cannot be removed from the last owner
392:
393: Always ensure ownership transfer before removing the current owner:
394:
395: `ts
396: // Transfer ownership first
397: await authClient.organization.updateMemberRole({
398:   memberId: "new-owner-member-id",
399:   role: "owner",
400: });
401: 
402: // Then the previous owner can be demoted or removed
403: `
404:
405: ### Organization Deletion
406:
407: Deleting an organization removes all associated data (members, invitations, teams). Prevent accidental deletion:
408:
409: `ts
410: organization({
411:   disableOrganizationDeletion: true, // Disable via config
412: });
413: `
414:
415: Or implement soft delete via hooks:
416:
417: `ts
418: organization({
419:   hooks: {
420:     organization: {
421:       beforeDelete: async ({ organization }) => {
422:         // Archive instead of delete
423:         await archiveOrganization(organization.id);
424:         throw new Error("Organization archived, not deleted");
425:       },
426:     },
427:   },
428: });
429: `
430:
431: ### Invitation Security
432:
433: - Invitations expire after 48 hours by default
434: - Only the invited email address can accept an invitation
435: - Pending invitations can be cancelled by organization admins
436:
437: ## Complete Configuration Example
438:
439: ``ts
440: import { betterAuth } from "better-auth";
441: import { organization } from "better-auth/plugins";
442: import { sendEmail } from "./email";
443: 
444: export const auth = betterAuth({
445:   plugins: [
446:     organization({
447:       // Organization limits
448:       allowUserToCreateOrganization: true,
449:       organizationLimit: 10,
450:       membershipLimit: 100,
451:       creatorRole: "owner",
452: 
453:       // Slugs
454:       defaultOrganizationIdField: "slug",
455: 
456:       // Invitations
457:       invitationExpiresIn: 60 * 60 * 24 * 7, // 7 days
458:       invitationLimit: 50,
459:       sendInvitationEmail: async (data) => {
460:         await sendEmail({
461:           to: data.email,
462:           subject: `Join ${data.organization.name}`,
463:           html: `<a href="https://app.com/invite/${data.invitation.id}">Accept</a>`,
464:         });
465:       },
466: 
467:       // Hooks
468:       hooks: {
469:         organization: {
470:           afterCreate: async ({ organization }) => {
471:             console.log(`Organization ${organization.name} created`);
472:           },
473:         },
474:       },
475:     }),
476:   ],
477: });
478: ``
```

## File: .agents/skills/two-factor-authentication-best-practices/SKILL.md

```markdown
1: ---
2: name: two-factor-authentication-best-practices
3: description: Configure TOTP authenticator apps, send OTP codes via email/SMS, manage backup codes, handle trusted devices, and implement 2FA sign-in flows using Better Auth's twoFactor plugin. Use when users need MFA, multi-factor authentication, authenticator setup, or login security with Better Auth.
4: ---
5:
6: ## Setup
7:
8: 1. Add `twoFactor()` plugin to server config with `issuer`
9: 2. Add `twoFactorClient()` plugin to client config
10: 3. Run `npx @better-auth/cli@latest migrate` (built-in adapter) or generate + push for Drizzle/Prisma
11: 4. Verify: check that `twoFactorSecret` column exists on user table
12:
13: `ts
 14: import { betterAuth } from "better-auth";
 15: import { twoFactor } from "better-auth/plugins";
 16: 
 17: export const auth = betterAuth({
 18:   appName: "My App",
 19:   plugins: [
 20:     twoFactor({
 21:       issuer: "My App",
 22:     }),
 23:   ],
 24: });
 25: `
26:
27: ### Client-Side Setup
28:
29: `ts
 30: import { createAuthClient } from "better-auth/client";
 31: import { twoFactorClient } from "better-auth/client/plugins";
 32: 
 33: export const authClient = createAuthClient({
 34:   plugins: [
 35:     twoFactorClient({
 36:       onTwoFactorRedirect() {
 37:         window.location.href = "/2fa";
 38:       },
 39:     }),
 40:   ],
 41: });
 42: `
43:
44: ## Enabling 2FA for Users
45:
46: Requires password verification. Returns TOTP URI (for QR code) and backup codes.
47:
48: `ts
 49: const enable2FA = async (password: string) => {
 50:   const { data, error } = await authClient.twoFactor.enable({
 51:     password,
 52:   });
 53: 
 54:   if (data) {
 55:     // data.totpURI — generate a QR code from this
 56:     // data.backupCodes — display to user
 57:   }
 58: };
 59: `
60:
61: `twoFactorEnabled` is not set to `true` until first TOTP verification succeeds. Override with `skipVerificationOnEnable: true` (not recommended).
62:
63: ## TOTP (Authenticator App)
64:
65: ### Displaying the QR Code
66:
67: `tsx
 68: import QRCode from "react-qr-code";
 69: 
 70: const TotpSetup = ({ totpURI }: { totpURI: string }) => {
 71:   return <QRCode value={totpURI} />;
 72: };
 73: `
74:
75: ### Verifying TOTP Codes
76:
77: Accepts codes from one period before/after current time:
78:
79: `ts
 80: const verifyTotp = async (code: string) => {
 81:   const { data, error } = await authClient.twoFactor.verifyTotp({
 82:     code,
 83:     trustDevice: true,
 84:   });
 85: };
 86: `
87:
88: ### TOTP Configuration Options
89:
90: `ts
 91: twoFactor({
 92:   totpOptions: {
 93:     digits: 6, // 6 or 8 digits (default: 6)
 94:     period: 30, // Code validity period in seconds (default: 30)
 95:   },
 96: });
 97: `
98:
99: ## OTP (Email/SMS)
100:
101: ### Configuring OTP Delivery
102:
103: ``ts
104: import { betterAuth } from "better-auth";
105: import { twoFactor } from "better-auth/plugins";
106: import { sendEmail } from "./email";
107: 
108: export const auth = betterAuth({
109:   plugins: [
110:     twoFactor({
111:       otpOptions: {
112:         sendOTP: async ({ user, otp }, ctx) => {
113:           await sendEmail({
114:             to: user.email,
115:             subject: "Your verification code",
116:             text: `Your code is: ${otp}`,
117:           });
118:         },
119:         period: 5, // Code validity in minutes (default: 3)
120:         digits: 6, // Number of digits (default: 6)
121:         allowedAttempts: 5, // Max verification attempts (default: 5)
122:       },
123:     }),
124:   ],
125: });
126: ``
127:
128: ### Sending and Verifying OTP
129:
130: Send: `authClient.twoFactor.sendOtp()`. Verify: `authClient.twoFactor.verifyOtp({ code, trustDevice: true })`.
131:
132: ### OTP Storage Security
133:
134: Configure how OTP codes are stored in the database:
135:
136: `ts
137: twoFactor({
138:   otpOptions: {
139:     storeOTP: "encrypted", // Options: "plain", "encrypted", "hashed"
140:   },
141: });
142: `
143:
144: For custom encryption:
145:
146: `ts
147: twoFactor({
148:   otpOptions: {
149:     storeOTP: {
150:       encrypt: async (token) => myEncrypt(token),
151:       decrypt: async (token) => myDecrypt(token),
152:     },
153:   },
154: });
155: `
156:
157: ## Backup Codes
158:
159: Generated automatically when 2FA is enabled. Each code is single-use.
160:
161: ### Displaying Backup Codes
162:
163: `tsx
164: const BackupCodes = ({ codes }: { codes: string[] }) => {
165:   return (
166:     <div>
167:       <p>Save these codes in a secure location:</p>
168:       <ul>
169:         {codes.map((code, i) => (
170:           <li key={i}>{code}</li>
171:         ))}
172:       </ul>
173:     </div>
174:   );
175: };
176: `
177:
178: ### Regenerating Backup Codes
179:
180: Invalidates all previous codes:
181:
182: `ts
183: const regenerateBackupCodes = async (password: string) => {
184:   const { data, error } = await authClient.twoFactor.generateBackupCodes({
185:     password,
186:   });
187:   // data.backupCodes contains the new codes
188: };
189: `
190:
191: ### Using Backup Codes for Recovery
192:
193: `ts
194: const verifyBackupCode = async (code: string) => {
195:   const { data, error } = await authClient.twoFactor.verifyBackupCode({
196:     code,
197:     trustDevice: true,
198:   });
199: };
200: `
201:
202: ### Backup Code Configuration
203:
204: `ts
205: twoFactor({
206:   backupCodeOptions: {
207:     amount: 10, // Number of codes to generate (default: 10)
208:     length: 10, // Length of each code (default: 10)
209:     storeBackupCodes: "encrypted", // Options: "plain", "encrypted"
210:   },
211: });
212: `
213:
214: ## Handling 2FA During Sign-In
215:
216: Response includes `twoFactorRedirect: true` when 2FA is required:
217:
218: ### Sign-In Flow
219:
220: 1. Call `signIn.email({ email, password })`
221: 2. Check `context.data.twoFactorRedirect` in `onSuccess`
222: 3. If `true`, redirect to `/2fa` verification page
223: 4. Verify via TOTP, OTP, or backup code
224: 5. Session cookie is created on successful verification
225:
226: `ts
227: const signIn = async (email: string, password: string) => {
228:   const { data, error } = await authClient.signIn.email(
229:     { email, password },
230:     {
231:       onSuccess(context) {
232:         if (context.data.twoFactorRedirect) {
233:           window.location.href = "/2fa";
234:         }
235:       },
236:     },
237:   );
238: };
239: `
240:
241: Server-side: check `"twoFactorRedirect" in response` when using `auth.api.signInEmail`.
242:
243: ## Trusted Devices
244:
245: Pass `trustDevice: true` when verifying. Default trust duration: 30 days (`trustDeviceMaxAge`). Refreshes on each sign-in.
246:
247: ## Security Considerations
248:
249: ### Session Management
250:
251: Flow: credentials → session removed → temporary 2FA cookie (10 min default) → verify → session created.
252:
253: `ts
254: twoFactor({
255:   twoFactorCookieMaxAge: 600, // 10 minutes in seconds (default)
256: });
257: `
258:
259: ### Rate Limiting
260:
261: Built-in: 3 requests per 10 seconds for all 2FA endpoints. OTP has additional attempt limiting:
262:
263: `ts
264: twoFactor({
265:   otpOptions: {
266:     allowedAttempts: 5, // Max attempts per OTP code (default: 5)
267:   },
268: });
269: `
270:
271: ### Encryption at Rest
272:
273: TOTP secrets: encrypted with auth secret. Backup codes: encrypted by default. OTP: configurable (`"plain"`, `"encrypted"`, `"hashed"`). Uses constant-time comparison for verification.
274:
275: 2FA can only be enabled for credential (email/password) accounts.
276:
277: ## Disabling 2FA
278:
279: Requires password confirmation. Revokes trusted device records:
280:
281: `ts
282: const disable2FA = async (password: string) => {
283:   const { data, error } = await authClient.twoFactor.disable({
284:     password,
285:   });
286: };
287: `
288:
289: ## Complete Configuration Example
290:
291: ``ts
292: import { betterAuth } from "better-auth";
293: import { twoFactor } from "better-auth/plugins";
294: import { sendEmail } from "./email";
295: 
296: export const auth = betterAuth({
297:   appName: "My App",
298:   plugins: [
299:     twoFactor({
300:       // TOTP settings
301:       issuer: "My App",
302:       totpOptions: {
303:         digits: 6,
304:         period: 30,
305:       },
306:       // OTP settings
307:       otpOptions: {
308:         sendOTP: async ({ user, otp }) => {
309:           await sendEmail({
310:             to: user.email,
311:             subject: "Your verification code",
312:             text: `Your code is: ${otp}`,
313:           });
314:         },
315:         period: 5,
316:         allowedAttempts: 5,
317:         storeOTP: "encrypted",
318:       },
319:       // Backup code settings
320:       backupCodeOptions: {
321:         amount: 10,
322:         length: 10,
323:         storeBackupCodes: "encrypted",
324:       },
325:       // Session settings
326:       twoFactorCookieMaxAge: 600, // 10 minutes
327:       trustDeviceMaxAge: 30 * 24 * 60 * 60, // 30 days
328:     }),
329:   ],
330: });
331: ``
```

## File: .agents/workflows/graphify.md

```markdown
1: ---
2: name: graphify
3: description: Turn any folder of files into a navigable knowledge graph
4: ---
5:
6: # Workflow: graphify
7:
8: Follow the graphify skill installed at ~/.gemini/config/skills/graphify/SKILL.md to run the full pipeline.
9:
10: If no path argument is given, use `.` (current directory).
```

## File: .husky/pre-commit

```
1: #!/bin/dash
2: pnpm exec lint-staged
```

## File: .kilo/skills/better-auth-best-practices/SKILL.md

```markdown
1: ---
2: name: better-auth-best-practices
3: description: Configure Better Auth server and client, set up database adapters, manage sessions, add plugins, and handle environment variables. Use when users mention Better Auth, betterauth, auth.ts, or need to set up TypeScript authentication with email/password, OAuth, or plugin configuration.
4: ---
5:
6: # Better Auth Integration Guide
7:
8: **Always consult [better-auth.com/docs](https://better-auth.com/docs) for code examples and latest API.**
9:
10: ---
11:
12: ## Setup Workflow
13:
14: 1. Install: `npm install better-auth`
15: 2. Set env vars: `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`
16: 3. Create `auth.ts` with database + config
17: 4. Create route handler for your framework
18: 5. Run migrations:
19: - **Built-in adapter:** `npx @better-auth/cli@latest migrate`
20: - **Drizzle:** `npx @better-auth/cli@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit push` (dev) or `npx drizzle-kit generate && npx drizzle-kit migrate` (prod)
21: - **Prisma:** `npx @better-auth/cli@latest generate --output prisma/schema.prisma` then `npx prisma migrate dev`
22: 6. Verify: call `GET /api/auth/ok` — should return `{ status: "ok" }`
23:
24: ---
25:
26: ## Quick Reference
27:
28: ### Environment Variables
29:
30: - `BETTER_AUTH_SECRET` - Encryption secret (min 32 chars). Generate: `openssl rand -base64 32`
31: - `BETTER_AUTH_URL` - Base URL (e.g., `https://example.com`)
32:
33: Only define `baseURL`/`secret` in config if env vars are NOT set.
34:
35: ### File Location
36:
37: CLI looks for `auth.ts` in: `./`, `./lib`, `./utils`, or under `./src`. Use `--config` for custom path.
38:
39: ### CLI Commands
40:
41: - `npx @better-auth/cli@latest migrate` - Apply schema (built-in adapter)
42: - `npx @better-auth/cli@latest generate` - Generate schema for Prisma/Drizzle
43: - `npx @better-auth/cli mcp --cursor` - Add MCP to AI tools
44:
45: **Re-run after adding/changing plugins.**
46:
47: ---
48:
49: ## Core Config Options
50:
51: | Option | Notes |
52: | ------------------ | ---------------------------------------------- |
53: | `appName` | Optional display name |
54: | `baseURL` | Only if `BETTER_AUTH_URL` not set |
55: | `basePath` | Default `/api/auth`. Set `/` for root. |
56: | `secret` | Only if `BETTER_AUTH_SECRET` not set |
57: | `database` | Required for most features. See adapters docs. |
58: | `secondaryStorage` | Redis/KV for sessions & rate limits |
59: | `emailAndPassword` | `{ enabled: true }` to activate |
60: | `socialProviders` | `{ google: { clientId, clientSecret }, ... }` |
61: | `plugins` | Array of plugins |
62: | `trustedOrigins` | CSRF whitelist |
63:
64: ---
65:
66: ## Database
67:
68: **Direct connections:** Pass `pg.Pool`, `mysql2` pool, `better-sqlite3`, or `bun:sqlite` instance. For Postgres, also supports `postgres` (postgres.js) and `@neondatabase/serverless`.
69:
70: **ORM adapters:** Import from `better-auth/adapters/drizzle`, `better-auth/adapters/prisma`, `better-auth/adapters/mongodb`.
71:
72: **Drizzle provider values:** `"pg"` (PostgreSQL), `"mysql"` (MySQL), `"sqlite"` (SQLite). Must match the driver used.
73:
74: **Critical:** Better Auth uses adapter model names, NOT underlying table names. If Prisma model is `User` mapping to table `users`, use `modelName: "user"` (Prisma reference), not `"users"`.
75:
76: ---
77:
78: ## Session Management
79:
80: **Storage priority:**
81:
82: 1. If `secondaryStorage` defined → sessions go there (not DB)
83: 2. Set `session.storeSessionInDatabase: true` to also persist to DB
84: 3. No database + `cookieCache` → fully stateless mode
85:
86: **Cookie cache strategies:**
87:
88: - `compact` (default) - Base64url + HMAC. Smallest.
89: - `jwt` - Standard JWT. Readable but signed.
90: - `jwe` - Encrypted. Maximum security.
91:
92: **Key options:** `session.expiresIn` (default 7 days), `session.updateAge` (refresh interval), `session.cookieCache.maxAge`, `session.cookieCache.version` (change to invalidate all sessions).
93:
94: ---
95:
96: ## User & Account Config
97:
98: **User:** `user.modelName`, `user.fields` (column mapping), `user.additionalFields`, `user.changeEmail.enabled` (disabled by default), `user.deleteUser.enabled` (disabled by default).
99:
100: **Account:** `account.modelName`, `account.accountLinking.enabled`, `account.storeAccountCookie` (for stateless OAuth).
101:
102: **Required for registration:** `email` and `name` fields.
103:
104: ---
105:
106: ## Email Flows
107:
108: - `emailVerification.sendVerificationEmail` - Must be defined for verification to work
109: - `emailVerification.sendOnSignUp` / `sendOnSignIn` - Auto-send triggers
110: - `emailAndPassword.sendResetPassword` - Password reset email handler
111:
112: ---
113:
114: ## Security
115:
116: **In `advanced`:**
117:
118: - `useSecureCookies` - Force HTTPS cookies
119: - `disableCSRFCheck` - ⚠️ Security risk
120: - `disableOriginCheck` - ⚠️ Security risk
121: - `crossSubDomainCookies.enabled` - Share cookies across subdomains
122: - `ipAddress.ipAddressHeaders` - Custom IP headers for proxies
123: - `database.generateId` - Custom ID generation or `"serial"`/`"uuid"`/`false`
124:
125: **Rate limiting:** `rateLimit.enabled`, `rateLimit.window`, `rateLimit.max`, `rateLimit.storage` ("memory" | "database" | "secondary-storage").
126:
127: ---
128:
129: ## Hooks
130:
131: **Endpoint hooks:** `hooks.before` / `hooks.after` - Array of `{ matcher, handler }`. Use `createAuthMiddleware`. Access `ctx.path`, `ctx.context.returned` (after), `ctx.context.session`.
132:
133: **Database hooks:** `databaseHooks.user.create.before/after`, same for `session`, `account`. Useful for adding default values or post-creation actions.
134:
135: **Hook context (`ctx.context`):** `session`, `secret`, `authCookies`, `password.hash()`/`verify()`, `adapter`, `internalAdapter`, `generateId()`, `tables`, `baseURL`.
136:
137: ---
138:
139: ## Plugins
140:
141: **Import from dedicated paths for tree-shaking:**
142:
143: `144: import { twoFactor } from "better-auth/plugins/two-factor"
145:`
146:
147: NOT `from "better-auth/plugins"`.
148:
149: **Popular plugins:** `twoFactor`, `organization`, `passkey`, `magicLink`, `emailOtp`, `username`, `phoneNumber`, `admin`, `apiKey`, `bearer`, `jwt`, `multiSession`, `sso`, `oauthProvider`, `oidcProvider`, `openAPI`, `genericOAuth`.
150:
151: Client plugins go in `createAuthClient({ plugins: [...] })`.
152:
153: ---
154:
155: ## Client
156:
157: Import from: `better-auth/client` (vanilla), `better-auth/react`, `better-auth/vue`, `better-auth/svelte`, `better-auth/solid`.
158:
159: Key methods: `signUp.email()`, `signIn.email()`, `signIn.social()`, `signOut()`, `useSession()`, `getSession()`, `revokeSession()`, `revokeSessions()`.
160:
161: ---
162:
163: ## Type Safety
164:
165: Infer types: `typeof auth.$Infer.Session`, `typeof auth.$Infer.Session.user`.
166:
167: For separate client/server projects: `createAuthClient<typeof auth>()`.
168:
169: ---
170:
171: ## Common Gotchas
172:
173: 1. **Model vs table name** - Config uses ORM model name, not DB table name
174: 2. **Plugin schema** - Re-run CLI after adding plugins
175: 3. **Secondary storage** - Sessions go there by default, not DB
176: 4. **Cookie cache** - Custom session fields NOT cached, always re-fetched
177: 5. **Stateless mode** - No DB = session in cookie only, logout on cache expiry
178: 6. **Change email flow** - Sends to current email first, then new email
179: 7. **Drizzle: db not initialized** - `drizzleAdapter(db, ...)` requires a `db` instance from `drizzle()`. See `create-auth` skill for setup examples (node-postgres, postgres.js, Neon).
180: 8. **Drizzle: missing drizzle.config.ts** - `drizzle-kit` commands require a `drizzle.config.ts` pointing to the generated schema file and DB credentials.
181:
182: ---
183:
184: ## Resources
185:
186: - [Docs](https://better-auth.com/docs)
187: - [Options Reference](https://better-auth.com/docs/reference/options)
188: - [LLMs.txt](https://better-auth.com/llms.txt)
189: - [GitHub](https://github.com/better-auth/better-auth)
190: - [Init Options Source](https://github.com/better-auth/better-auth/blob/main/packages/core/src/types/init-options.ts)
```

## File: .kilo/skills/better-auth-security-best-practices/SKILL.md

```markdown
1: ---
2: name: better-auth-security-best-practices
3: description: Configure rate limiting, manage auth secrets, set up CSRF protection, define trusted origins, secure sessions and cookies, encrypt OAuth tokens, track IP addresses, and implement audit logging for Better Auth. Use when users need to secure their auth setup, prevent brute force attacks, or harden a Better Auth deployment.
4: ---
5:
6: ## Secret Management
7:
8: ### Configuring the Secret
9:
10: ``ts
 11: import { betterAuth } from "better-auth";
 12: 
 13: export const auth = betterAuth({
 14:   secret: process.env.BETTER_AUTH_SECRET, // or via `BETTER_AUTH_SECRET` env
 15: });
 16: ``
17:
18: Better Auth looks for secrets in this order:
19:
20: 1. `options.secret` in your config
21: 2. `BETTER_AUTH_SECRET` environment variable
22: 3. `AUTH_SECRET` environment variable
23:
24: ### Secret Requirements
25:
26: - Rejects default/placeholder secrets in production
27: - Warns if shorter than 32 characters or entropy below 120 bits
28: - Generate: `openssl rand -base64 32`
29: - Never commit secrets to version control
30:
31: ## Rate Limiting
32:
33: Enabled in production by default. Applies to all endpoints. Plugins can override per-endpoint.
34:
35: ### Default Configuration
36:
37: `ts
 38: import { betterAuth } from "better-auth";
 39: 
 40: export const auth = betterAuth({
 41:   rateLimit: {
 42:     enabled: true, // Default: true in production
 43:     window: 10, // Time window in seconds (default: 10)
 44:     max: 100, // Max requests per window (default: 100)
 45:   },
 46: });
 47: `
48:
49: ### Storage Options
50:
51: Options: `"memory"` (resets on restart, avoid on serverless), `"database"` (persistent), `"secondary-storage"` (Redis, default when available).
52:
53: `ts
 54: rateLimit: {
 55:   storage: "database",
 56: }
 57: `
58:
59: ### Custom Storage
60:
61: Implement your own rate limit storage:
62:
63: `ts
 64: rateLimit: {
 65:   customStorage: {
 66:     get: async (key) => {
 67:       // Return { count: number, expiresAt: number } or null
 68:     },
 69:     set: async (key, data) => {
 70:       // Store the rate limit data
 71:     },
 72:   },
 73: }
 74: `
75:
76: ### Per-Endpoint Rules
77:
78: Sensitive endpoints default to 3 requests per 10 seconds (`/sign-in`, `/sign-up`, `/change-password`, `/change-email`). Override:
79:
80: `ts
 81: rateLimit: {
 82:   customRules: {
 83:     "/api/auth/sign-in/email": {
 84:       window: 60, // 1 minute window
 85:       max: 5, // 5 attempts
 86:     },
 87:     "/api/auth/some-safe-endpoint": false, // Disable rate limiting
 88:   },
 89: }
 90: `
91:
92: ## CSRF Protection
93:
94: Multi-layer protection: origin header validation, Fetch Metadata checks, and first-login protection.
95:
96: ### Configuration
97:
98: `ts
 99: import { betterAuth } from "better-auth";
100: 
101: export const auth = betterAuth({
102:   advanced: {
103:     disableCSRFCheck: false, // Default: false (keep enabled)
104:   },
105: });
106: `
107:
108: Only disable for testing or with an alternative CSRF mechanism.
109:
110: ## Trusted Origins
111:
112: ### Configuring Trusted Origins
113:
114: `ts
115: import { betterAuth } from "better-auth";
116: 
117: export const auth = betterAuth({
118:   baseURL: "https://api.example.com",
119:   trustedOrigins: ["https://app.example.com", "https://admin.example.com"],
120: });
121: `
122:
123: The `baseURL` origin is automatically trusted. Also configurable via env: `BETTER_AUTH_TRUSTED_ORIGINS=https://app.example.com,https://admin.example.com`
124:
125: ### Wildcard Patterns
126:
127: `ts
128: trustedOrigins: [
129:   "*.example.com", // Matches any subdomain
130:   "https://*.example.com", // Protocol-specific wildcard
131:   "exp://192.168.*.*:*/*", // Custom schemes (e.g., Expo)
132: ];
133: `
134:
135: ### Dynamic Trusted Origins
136:
137: Compute trusted origins based on the request:
138:
139: ``ts
140: trustedOrigins: async (request) => {
141:   // Validate against database, header, etc.
142:   const tenant = getTenantFromRequest(request);
143:   return [`https://${tenant}.myapp.com`];
144: };
145: ``
146:
147: Validates `callbackURL`, `redirectTo`, `errorCallbackURL`, `newUserCallbackURL`, and `origin` against trusted origins. Invalid URLs receive 403.
148:
149: ## Session Security
150:
151: ### Session Expiration
152:
153: `ts
154: import { betterAuth } from "better-auth";
155: 
156: export const auth = betterAuth({
157:   session: {
158:     expiresIn: 60 * 60 * 24 * 7, // 7 days (default)
159:     updateAge: 60 * 60 * 24, // Refresh session every 24 hours (default)
160:   },
161: });
162: `
163:
164: ### Session Caching Strategies
165:
166: Cache session data in cookies to reduce database queries:
167:
168: `ts
169: session: {
170:   cookieCache: {
171:     enabled: true,
172:     maxAge: 60 * 5, // 5 minutes
173:     strategy: "compact", // Options: "compact", "jwt", "jwe"
174:   },
175: }
176: `
177:
178: Strategies: `"compact"` (Base64url + HMAC, smallest), `"jwt"` (HS256, standard), `"jwe"` (encrypted, use when session has sensitive data).
179:
180: ## Cookie Security
181:
182: Defaults: `secure: true` (HTTPS/production), `sameSite: "lax"`, `httpOnly: true`, `path: "/"`, prefix `__Secure-`.
183:
184: ### Custom Cookie Configuration
185:
186: `ts
187: import { betterAuth } from "better-auth";
188: 
189: export const auth = betterAuth({
190:   advanced: {
191:     useSecureCookies: true, // Force secure cookies
192:     cookiePrefix: "myapp", // Custom prefix (default: "better-auth")
193:     defaultCookieAttributes: {
194:       sameSite: "strict", // Stricter CSRF protection
195:       path: "/auth", // Limit cookie scope
196:     },
197:   },
198: });
199: `
200:
201: ### Cross-Subdomain Cookies
202:
203: `ts
204: advanced: {
205:   crossSubDomainCookies: {
206:     enabled: true,
207:     domain: ".example.com", // Note the leading dot
208:     additionalCookies: ["session_token", "session_data"],
209:   },
210: }
211: `
212:
213: Only enable if you need authentication sharing and trust all subdomains.
214:
215: ## OAuth / Social Provider Security
216:
217: PKCE is automatic for all OAuth flows. State tokens are 32-char random strings expiring after 10 minutes.
218:
219: ### State Parameter Storage
220:
221: `ts
222: import { betterAuth } from "better-auth";
223: 
224: export const auth = betterAuth({
225:   account: {
226:     storeStateStrategy: "cookie", // Options: "cookie" (default), "database"
227:   },
228: });
229: `
230:
231: ### Encrypting OAuth Tokens
232:
233: `ts
234: account: {
235:   encryptOAuthTokens: true, // Uses AES-256-GCM
236: }
237: `
238:
239: Enable if storing OAuth tokens for API access on behalf of users. Use `skipStateCookieCheck: true` only for mobile apps that cannot maintain cookies.
240:
241: ## IP-Based Security
242:
243: ### IP Address Configuration
244:
245: `ts
246: import { betterAuth } from "better-auth";
247: 
248: export const auth = betterAuth({
249:   advanced: {
250:     ipAddress: {
251:       ipAddressHeaders: ["x-forwarded-for", "x-real-ip"], // Headers to check
252:       disableIpTracking: false, // Keep enabled for rate limiting
253:     },
254:   },
255: });
256: `
257:
258: Set `ipv6Subnet` (128, 64, 48, 32; default 64) to group IPv6 addresses. Enable `trustedProxyHeaders: true` only if behind a trusted reverse proxy.
259:
260: ## Database Hooks for Security Auditing
261:
262: `ts
263: import { betterAuth } from "better-auth";
264: 
265: export const auth = betterAuth({
266:   databaseHooks: {
267:     session: {
268:       create: {
269:         after: async ({ data, ctx }) => {
270:           await auditLog("session.created", {
271:             userId: data.userId,
272:             ip: ctx?.request?.headers.get("x-forwarded-for"),
273:             userAgent: ctx?.request?.headers.get("user-agent"),
274:           });
275:         },
276:       },
277:       delete: {
278:         before: async ({ data }) => {
279:           await auditLog("session.revoked", { sessionId: data.id });
280:         },
281:       },
282:     },
283:     user: {
284:       update: {
285:         after: async ({ data, oldData }) => {
286:           if (oldData?.email !== data.email) {
287:             await auditLog("user.email_changed", {
288:               userId: data.id,
289:               oldEmail: oldData?.email,
290:               newEmail: data.email,
291:             });
292:           }
293:         },
294:       },
295:     },
296:     account: {
297:       create: {
298:         after: async ({ data }) => {
299:           await auditLog("account.linked", {
300:             userId: data.userId,
301:             provider: data.providerId,
302:           });
303:         },
304:       },
305:     },
306:   },
307: });
308: `
309:
310: Return `false` from a `before` hook to prevent an operation.
311:
312: ## Background Tasks
313:
314: `ts
315: import { betterAuth } from "better-auth";
316: 
317: export const auth = betterAuth({
318:   advanced: {
319:     backgroundTasks: {
320:       handler: (promise) => {
321:         // Platform-specific handler
322:         // Vercel: waitUntil(promise)
323:         // Cloudflare: ctx.waitUntil(promise)
324:         waitUntil(promise);
325:       },
326:     },
327:   },
328: });
329: `
330:
331: Ensures operations like sending emails don't affect response timing.
332:
333: ## Account Enumeration Prevention
334:
335: Built-in: consistent response messages, dummy operations on invalid requests, background email sending. Return generic error messages ("Invalid credentials") rather than specific ones ("User not found").
336:
337: ## Complete Security Configuration Example
338:
339: ``ts
340: import { betterAuth } from "better-auth";
341: 
342: export const auth = betterAuth({
343:   secret: process.env.BETTER_AUTH_SECRET,
344:   baseURL: "https://api.example.com",
345:   trustedOrigins: ["https://app.example.com", "https://*.preview.example.com"],
346: 
347:   // Rate limiting
348:   rateLimit: {
349:     enabled: true,
350:     storage: "secondary-storage",
351:     customRules: {
352:       "/api/auth/sign-in/email": { window: 60, max: 5 },
353:       "/api/auth/sign-up/email": { window: 60, max: 3 },
354:     },
355:   },
356: 
357:   // Session security
358:   session: {
359:     expiresIn: 60 * 60 * 24 * 7, // 7 days
360:     updateAge: 60 * 60 * 24, // 24 hours
361:     freshAge: 60 * 60, // 1 hour for sensitive actions
362:     cookieCache: {
363:       enabled: true,
364:       maxAge: 300,
365:       strategy: "jwe", // Encrypted session data
366:     },
367:   },
368: 
369:   // OAuth security
370:   account: {
371:     encryptOAuthTokens: true,
372:     storeStateStrategy: "cookie",
373:   },
374: 
375:   // Advanced settings
376:   advanced: {
377:     useSecureCookies: true,
378:     cookiePrefix: "myapp",
379:     defaultCookieAttributes: {
380:       sameSite: "lax",
381:     },
382:     ipAddress: {
383:       ipAddressHeaders: ["x-forwarded-for"],
384:       ipv6Subnet: 64,
385:     },
386:     backgroundTasks: {
387:       handler: (promise) => waitUntil(promise),
388:     },
389:   },
390: 
391:   // Security auditing
392:   databaseHooks: {
393:     session: {
394:       create: {
395:         after: async ({ data, ctx }) => {
396:           console.log(`New session for user ${data.userId}`);
397:         },
398:       },
399:     },
400:     user: {
401:       update: {
402:         after: async ({ data, oldData }) => {
403:           if (oldData?.email !== data.email) {
404:             console.log(`Email changed for user ${data.id}`);
405:           }
406:         },
407:       },
408:     },
409:   },
410: });
411: ``
412:
413: ## Security Checklist
414:
415: Before deploying to production:
416:
417: - [ ] **Secret**: Use a strong, unique secret (32+ characters, high entropy)
418: - [ ] **HTTPS**: Ensure `baseURL` uses HTTPS
419: - [ ] **Trusted Origins**: Configure all valid origins (frontend, mobile apps)
420: - [ ] **Rate Limiting**: Keep enabled with appropriate limits
421: - [ ] **CSRF Protection**: Keep enabled (`disableCSRFCheck: false`)
422: - [ ] **Secure Cookies**: Enabled automatically with HTTPS
423: - [ ] **OAuth Tokens**: Consider `encryptOAuthTokens: true` if storing tokens
424: - [ ] **Background Tasks**: Configure for serverless platforms
425: - [ ] **Audit Logging**: Implement via `databaseHooks` or `hooks`
426: - [ ] **IP Tracking**: Configure headers if behind a proxy
```

## File: .kilo/skills/create-auth/SKILL.md

```markdown
1: ---
2: name: create-auth
3: description: Scaffold and implement authentication in TypeScript/JavaScript apps using Better Auth. Detect frameworks, configure database adapters, set up route handlers, add OAuth providers, and create auth UI pages. Use when users want to add login, sign-up, or authentication to a new or existing project with Better Auth.
4: ---
5:
6: # Create Auth Skill
7:
8: Guide for adding authentication to TypeScript/JavaScript applications using Better Auth.
9:
10: **For code examples and syntax, see [better-auth.com/docs](https://better-auth.com/docs).**
11:
12: ---
13:
14: ## Phase 1: Planning (REQUIRED before implementation)
15:
16: Before writing any code, gather requirements by scanning the project and asking the user structured questions. This ensures the implementation matches their needs.
17:
18: ### Step 1: Scan the project
19:
20: Analyze the codebase to auto-detect:
21:
22: - **Framework** — Look for `next.config`, `svelte.config`, `nuxt.config`, `astro.config`, `vite.config`, or Express/Hono entry files.
23: - **Database/ORM** — Look for `prisma/schema.prisma`, `drizzle.config.ts`, `package.json` deps (`pg`, `postgres`, `@neondatabase/serverless`, `mysql2`, `better-sqlite3`, `mongoose`, `mongodb`). If `drizzle.config.ts` exists, read its `dialect` field to determine the DB type (e.g., `"postgresql"` → Drizzle + Postgres). Also check which Drizzle driver is installed (`drizzle-orm/node-postgres` → `pg`, `drizzle-orm/postgres-js` → `postgres`, `drizzle-orm/neon-http` → Neon).
24: - **Existing auth** — Look for existing auth libraries (`next-auth`, `lucia`, `clerk`, `supabase/auth`, `firebase/auth`) in `package.json` or imports.
25: - **Package manager** — Check for `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`, or `package-lock.json`.
26:
27: Use what you find to pre-fill defaults and skip questions you can already answer.
28:
29: ### Step 2: Ask planning questions
30:
31: Use the `AskQuestion` tool to ask the user **all applicable questions in a single call**. Skip any question you already have a confident answer for from the scan. Group them under a title like "Auth Setup Planning".
32:
33: **Questions to ask:**
34:
35: 1. **Project type** (skip if detected)
36: - Prompt: "What type of project is this?"
37: - Options: New project from scratch | Adding auth to existing project | Migrating from another auth library
38:
39: 2. **Framework** (skip if detected)
40: - Prompt: "Which framework are you using?"
41: - Options: Next.js (App Router) | Next.js (Pages Router) | SvelteKit | Nuxt | Astro | Express | Hono | SolidStart | Other
42:
43: 3. **Database & ORM** (skip if detected)
44: - Prompt: "Which database setup will you use?"
45: - Options: PostgreSQL (Prisma) | PostgreSQL (Drizzle) | PostgreSQL (pg driver) | MySQL (Prisma) | MySQL (Drizzle) | MySQL (mysql2 driver) | SQLite (Prisma) | SQLite (Drizzle) | SQLite (better-sqlite3 driver) | MongoDB (Mongoose) | MongoDB (native driver)
46:
47: 4. **Authentication methods** (always ask, allow multiple)
48: - Prompt: "Which sign-in methods do you need?"
49: - Options: Email & password | Social OAuth (Google, GitHub, etc.) | Magic link (passwordless email) | Passkey (WebAuthn) | Phone number
50: - `allow_multiple: true`
51:
52: 5. **Social providers** (only if they selected Social OAuth above — ask in a follow-up call)
53: - Prompt: "Which social providers do you need?"
54: - Options: Google | GitHub | Apple | Microsoft | Discord | Twitter/X
55: - `allow_multiple: true`
56:
57: 6. **Email verification** (only if Email & password was selected above — ask in a follow-up call)
58: - Prompt: "Do you want to require email verification?"
59: - Options: Yes | No
60:
61: 7. **Email provider** (only if email verification is Yes, or if Password reset is selected in features — ask in a follow-up call)
62: - Prompt: "How do you want to send emails?"
63: - Options: Resend | Mock it for now (console.log)
64:
65: 8. **Features & plugins** (always ask, allow multiple)
66: - Prompt: "Which additional features do you need?"
67: - Options: Two-factor authentication (2FA) | Organizations / teams | Admin dashboard | API bearer tokens | Password reset | None of these
68: - `allow_multiple: true`
69:
70: 9. **Auth pages** (always ask, allow multiple — pre-select based on earlier answers)
71: - Prompt: "Which auth pages do you need?"
72: - Options vary based on previous answers:
73: - Always available: Sign in | Sign up
74: - If Email & password selected: Forgot password | Reset password
75: - If email verification enabled: Email verification
76: - `allow_multiple: true`
77:
78: 10. **Auth UI style** (always ask)
79:
80: - Prompt: "What style do you want for the auth pages? Pick one or describe your own."
81: - Options: Minimal & clean | Centered card with background | Split layout (form + hero image) | Floating / glassmorphism | Other (I'll describe)
82:
83: ### Step 3: Summarize the plan
84:
85: After collecting answers, present a concise implementation plan as a markdown checklist. Example:
86:
87: `` 88: ## Auth Implementation Plan
 89: 
 90: - **Framework:** Next.js (App Router)
 91: - **Database:** PostgreSQL via Prisma
 92: - **Auth methods:** Email/password, Google OAuth, GitHub OAuth
 93: - **Plugins:** 2FA, Organizations, Email verification
 94: - **UI:** Custom forms
 95: 
 96: ### Steps
 97: 1. Install `better-auth` and `@better-auth/cli`
 98: 2. Create `lib/auth.ts` with server config
 99: 3. Create `lib/auth-client.ts` with React client
100: 4. Set up route handler at `app/api/auth/[...all]/route.ts`
101: 5. Configure Prisma adapter and generate schema
102: 6. Add Google & GitHub OAuth providers
103: 7. Enable `twoFactor` and `organization` plugins
104: 8. Set up email verification handler
105: 9. Run migrations
106: 10. Create sign-in / sign-up pages
107:``
108:
109: Ask the user to confirm the plan before proceeding to Phase 2.
110:
111: ---
112:
113: ## Phase 2: Implementation
114:
115: Only proceed here after the user confirms the plan from Phase 1.
116:
117: Follow the decision tree below, guided by the answers collected above.
118:
119: `120: Is this a new/empty project?
121: ├─ YES → New project setup
122: │   1. Install better-auth (+ scoped packages per plan)
123: │   2. Create auth.ts with all planned config
124: │   3. Create auth-client.ts with framework client
125: │   4. Set up route handler
126: │   5. Set up environment variables
127: │   6. Run CLI migrate/generate
128: │   7. Add plugins from plan
129: │   8. Create auth UI pages
130: │
131: ├─ MIGRATING → Migration from existing auth
132: │   1. Audit current auth for gaps
133: │   2. Plan incremental migration
134: │   3. Install better-auth alongside existing auth
135: │   4. Migrate routes, then session logic, then UI
136: │   5. Remove old auth library
137: │   6. See migration guides in docs
138: │
139: └─ ADDING → Add auth to existing project
140:     1. Analyze project structure
141:     2. Install better-auth
142:     3. Create auth config matching plan
143:     4. Add route handler
144:     5. Run schema migrations
145:     6. Integrate into existing pages
146:     7. Add planned plugins and features
147:`
148:
149: At the end of implementation, guide users thoroughly on remaining next steps (e.g., setting up OAuth app credentials, deploying env vars, testing flows).
150:
151: ---
152:
153: ## Installation
154:
155: **Core:** `npm install better-auth`
156:
157: **Scoped packages (as needed):**
158:
159: | Package | Use case |
160: | ---------------------- | ------------------------ |
161: | `@better-auth/passkey` | WebAuthn/Passkey auth |
162: | `@better-auth/sso` | SAML/OIDC enterprise SSO |
163: | `@better-auth/stripe` | Stripe payments |
164: | `@better-auth/scim` | SCIM user provisioning |
165: | `@better-auth/expo` | React Native/Expo |
166:
167: ---
168:
169: ## Environment Variables
170:
171: `env
172: BETTER_AUTH_SECRET=<32+ chars, generate with: openssl rand -base64 32>
173: BETTER_AUTH_URL=http://localhost:3000
174: DATABASE_URL=<your database connection string>
175: `
176:
177: Add OAuth secrets as needed: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, etc.
178:
179: ---
180:
181: ## Server Config (auth.ts)
182:
183: **Location:** `lib/auth.ts` or `src/lib/auth.ts`
184:
185: **Minimal config needs:**
186:
187: - `database` - Connection or adapter
188: - `emailAndPassword: { enabled: true }` - For email/password auth
189:
190: **Standard config adds:**
191:
192: - `socialProviders` - OAuth providers (google, github, etc.)
193: - `emailVerification.sendVerificationEmail` - Email verification handler
194: - `emailAndPassword.sendResetPassword` - Password reset handler
195:
196: **Full config adds:**
197:
198: - `plugins` - Array of feature plugins
199: - `session` - Expiry, cookie cache settings
200: - `account.accountLinking` - Multi-provider linking
201: - `rateLimit` - Rate limiting config
202:
203: **Export types:** `export type Session = typeof auth.$Infer.Session`
204:
205: ---
206:
207: ## Client Config (auth-client.ts)
208:
209: **Import by framework:**
210:
211: | Framework | Import |
212: | ------------- | -------------------- |
213: | React/Next.js | `better-auth/react` |
214: | Vue | `better-auth/vue` |
215: | Svelte | `better-auth/svelte` |
216: | Solid | `better-auth/solid` |
217: | Vanilla JS | `better-auth/client` |
218:
219: **Client plugins** go in `createAuthClient({ plugins: [...] })`.
220:
221: **Common exports:** `signIn`, `signUp`, `signOut`, `useSession`, `getSession`
222:
223: ---
224:
225: ## Route Handler Setup
226:
227: | Framework | File | Handler |
228: | ------------------ | -------------------------------- | ------------------------------------------------ |
229: | Next.js App Router | `app/api/auth/[...all]/route.ts` | `toNextJsHandler(auth)` → export `{ GET, POST }` |
230: | Next.js Pages | `pages/api/auth/[...all].ts` | `toNextJsHandler(auth)` → default export |
231: | Express | Any file | `app.all("/api/auth/*", toNodeHandler(auth))` |
232: | SvelteKit | `src/hooks.server.ts` | `svelteKitHandler(auth)` |
233: | SolidStart | Route file | `solidStartHandler(auth)` |
234: | Hono | Route file | `auth.handler(c.req.raw)` |
235:
236: **Next.js Server Components:** Add `nextCookies()` plugin to auth config.
237:
238: ---
239:
240: ## Database Migrations
241:
242: | Adapter | Command |
243: | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
244: | Built-in Kysely | `npx @better-auth/cli@latest migrate` (applies directly) |
245: | Prisma | `npx @better-auth/cli@latest generate --output prisma/schema.prisma` then `npx prisma migrate dev` |
246: | Drizzle (dev) | `npx @better-auth/cli@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit push` |
247: | Drizzle (prod) | `npx @better-auth/cli@latest generate --output src/db/auth-schema.ts` then `npx drizzle-kit generate` then `npx drizzle-kit migrate` |
248:
249: > **Note:** `drizzle-kit push` skips migration files and is only safe for development. Use `drizzle-kit generate` + `drizzle-kit migrate` in production.
250:
251: **Re-run after adding plugins.**
252:
253: ---
254:
255: ## Database Adapters
256:
257: | Database | Setup |
258: | ---------------- | -------------------------------------------------------------------------------------- |
259: | SQLite | Pass `better-sqlite3` or `bun:sqlite` instance directly |
260: | PostgreSQL | Pass `pg.Pool` instance directly |
261: | MySQL | Pass `mysql2` pool directly |
262: | Prisma | `prismaAdapter(prisma, { provider: "postgresql" })` from `better-auth/adapters/prisma` |
263: | Drizzle (pg) | `drizzleAdapter(db, { provider: "pg" })` from `better-auth/adapters/drizzle` |
264: | Drizzle (mysql) | `drizzleAdapter(db, { provider: "mysql" })` from `better-auth/adapters/drizzle` |
265: | Drizzle (sqlite) | `drizzleAdapter(db, { provider: "sqlite" })` from `better-auth/adapters/drizzle` |
266: | MongoDB | `mongodbAdapter(db)` from `better-auth/adapters/mongodb` |
267:
268: ### Drizzle + PostgreSQL Setup
269:
270: Before using `drizzleAdapter`, initialize the `db` instance:
271:
272: `ts
273: // Option 1: node-postgres (pg)
274: import { drizzle } from "drizzle-orm/node-postgres";
275: import { Pool } from "pg";
276: import * as schema from "./auth-schema";
277: 
278: const pool = new Pool({ connectionString: process.env.DATABASE_URL });
279: export const db = drizzle(pool, { schema });
280: `
281:
282: `ts
283: // Option 2: postgres.js
284: import { drizzle } from "drizzle-orm/postgres-js";
285: import postgres from "postgres";
286: import * as schema from "./auth-schema";
287: 
288: const client = postgres(process.env.DATABASE_URL!);
289: export const db = drizzle(client, { schema });
290: `
291:
292: `ts
293: // Option 3: Neon serverless
294: import { drizzle } from "drizzle-orm/neon-http";
295: import { neon } from "@neondatabase/serverless";
296: import * as schema from "./auth-schema";
297: 
298: const sql = neon(process.env.DATABASE_URL!);
299: export const db = drizzle(sql, { schema });
300: `
301:
302: Then pass to Better Auth:
303:
304: `ts
305: import { betterAuth } from "better-auth";
306: import { drizzleAdapter } from "better-auth/adapters/drizzle";
307: import { db } from "./db";
308: 
309: export const auth = betterAuth({
310:   database: drizzleAdapter(db, { provider: "pg" }),
311:   // ...
312: });
313: `
314:
315: ### Drizzle Config (`drizzle.config.ts`)
316:
317: Required for `drizzle-kit` commands to find your schema:
318:
319: `ts
320: import { defineConfig } from "drizzle-kit";
321: 
322: export default defineConfig({
323:   schema: "./src/db/auth-schema.ts",
324:   out: "./drizzle",
325:   dialect: "postgresql",
326:   dbCredentials: {
327:     url: process.env.DATABASE_URL!,
328:   },
329: });
330: `
331:
332: ---
333:
334: ## Common Plugins
335:
336: | Plugin | Server Import | Client Import | Purpose |
337: | -------------- | ---------------------- | -------------------- | ----------------- |
338: | `twoFactor` | `better-auth/plugins` | `twoFactorClient` | 2FA with TOTP/OTP |
339: | `organization` | `better-auth/plugins` | `organizationClient` | Teams/orgs |
340: | `admin` | `better-auth/plugins` | `adminClient` | User management |
341: | `bearer` | `better-auth/plugins` | - | API token auth |
342: | `openAPI` | `better-auth/plugins` | - | API docs |
343: | `passkey` | `@better-auth/passkey` | `passkeyClient` | WebAuthn |
344: | `sso` | `@better-auth/sso` | - | Enterprise SSO |
345:
346: **Plugin pattern:** Server plugin + client plugin + run migrations.
347:
348: ---
349:
350: ## Auth UI Implementation
351:
352: **Sign in flow:**
353:
354: 1. `signIn.email({ email, password })` or `signIn.social({ provider, callbackURL })`
355: 2. Handle `error` in response
356: 3. Redirect on success
357:
358: **Session check (client):** `useSession()` hook returns `{ data: session, isPending }`
359:
360: **Session check (server):** `auth.api.getSession({ headers: await headers() })`
361:
362: **Protected routes:** Check session, redirect to `/sign-in` if null.
363:
364: ---
365:
366: ## Security Checklist
367:
368: - [ ] `BETTER_AUTH_SECRET` set (32+ chars)
369: - [ ] `advanced.useSecureCookies: true` in production
370: - [ ] `trustedOrigins` configured
371: - [ ] Rate limits enabled
372: - [ ] Email verification enabled
373: - [ ] Password reset implemented
374: - [ ] 2FA for sensitive apps
375: - [ ] CSRF protection NOT disabled
376: - [ ] `account.accountLinking` reviewed
377:
378: ---
379:
380: ## Troubleshooting
381:
382: | Issue | Fix |
383: | ------------------------------- | ------------------------------------------------------------- |
384: | "Secret not set" | Add `BETTER_AUTH_SECRET` env var |
385: | "Invalid Origin" | Add domain to `trustedOrigins` |
386: | Cookies not setting | Check `baseURL` matches domain; enable secure cookies in prod |
387: | OAuth callback errors | Verify redirect URIs in provider dashboard |
388: | Type errors after adding plugin | Re-run CLI generate/migrate |
389:
390: ---
391:
392: ## Resources
393:
394: - [Docs](https://better-auth.com/docs)
395: - [Examples](https://github.com/better-auth/examples)
396: - [Plugins](https://better-auth.com/docs/concepts/plugins)
397: - [CLI](https://better-auth.com/docs/concepts/cli)
398: - [Migration Guides](https://better-auth.com/docs/guides)
```

## File: .kilo/skills/email-and-password-best-practices/SKILL.md

```markdown
1: ---
2: name: email-and-password-best-practices
3: description: Configure email verification, implement password reset flows, set password policies, and customise hashing algorithms for Better Auth email/password authentication. Use when users need to set up login, sign-in, sign-up, credential authentication, or password security with Better Auth.
4: ---
5:
6: ## Quick Start
7:
8: 1. Enable email/password: `emailAndPassword: { enabled: true }`
9: 2. Configure `emailVerification.sendVerificationEmail`
10: 3. Add `sendResetPassword` for password reset flows
11: 4. Run `npx @better-auth/cli@latest migrate`
12: 5. Verify: attempt sign-up and confirm verification email triggers
13:
14: ---
15:
16: ## Email Verification Setup
17:
18: Configure `emailVerification.sendVerificationEmail` to verify user email addresses.
19:
20: ``ts
 21: import { betterAuth } from "better-auth";
 22: import { sendEmail } from "./email"; // your email sending function
 23: 
 24: export const auth = betterAuth({
 25:   emailVerification: {
 26:     sendVerificationEmail: async ({ user, url, token }, request) => {
 27:       await sendEmail({
 28:         to: user.email,
 29:         subject: "Verify your email address",
 30:         text: `Click the link to verify your email: ${url}`,
 31:       });
 32:     },
 33:   },
 34: });
 35: ``
36:
37: **Note**: The `url` parameter contains the full verification link. The `token` is available if you need to build a custom verification URL.
38:
39: ### Requiring Email Verification
40:
41: For stricter security, enable `emailAndPassword.requireEmailVerification` to block sign-in until the user verifies their email. When enabled, unverified users will receive a new verification email on each sign-in attempt.
42:
43: `ts
 44: export const auth = betterAuth({
 45:   emailAndPassword: {
 46:     requireEmailVerification: true,
 47:   },
 48: });
 49: `
50:
51: **Note**: This requires `sendVerificationEmail` to be configured and only applies to email/password sign-ins.
52:
53: ## Client Side Validation
54:
55: Implement client-side validation for immediate user feedback and reduced server load.
56:
57: ## Callback URLs
58:
59: Always use absolute URLs (including the origin) for callback URLs in sign-up and sign-in requests. This prevents Better Auth from needing to infer the origin, which can cause issues when your backend and frontend are on different domains.
60:
61: `ts
 62: const { data, error } = await authClient.signUp.email({
 63:   callbackURL: "https://example.com/callback", // absolute URL with origin
 64: });
 65: `
66:
67: ## Password Reset Flows
68:
69: Provide `sendResetPassword` in the email and password config to enable password resets.
70:
71: ``ts
 72: import { betterAuth } from "better-auth";
 73: import { sendEmail } from "./email"; // your email sending function
 74: 
 75: export const auth = betterAuth({
 76:   emailAndPassword: {
 77:     enabled: true,
 78:     // Custom email sending function to send reset-password email
 79:     sendResetPassword: async ({ user, url, token }, request) => {
 80:       void sendEmail({
 81:         to: user.email,
 82:         subject: "Reset your password",
 83:         text: `Click the link to reset your password: ${url}`,
 84:       });
 85:     },
 86:     // Optional event hook
 87:     onPasswordReset: async ({ user }, request) => {
 88:       // your logic here
 89:       console.log(`Password for user ${user.email} has been reset.`);
 90:     },
 91:   },
 92: });
 93: ``
94:
95: ### Security Considerations
96:
97: Built-in protections: background email sending (timing attack prevention), dummy operations on invalid requests, constant response messages regardless of user existence.
98:
99: On serverless platforms, configure a background task handler:
100:
101: `ts
102: export const auth = betterAuth({
103:   advanced: {
104:     backgroundTasks: {
105:       handler: (promise) => {
106:         // Use platform-specific methods like waitUntil
107:         waitUntil(promise);
108:       },
109:     },
110:   },
111: });
112: `
113:
114: #### Token Security
115:
116: Tokens expire after 1 hour by default. Configure with `resetPasswordTokenExpiresIn` (in seconds):
117:
118: `ts
119: export const auth = betterAuth({
120:   emailAndPassword: {
121:     enabled: true,
122:     resetPasswordTokenExpiresIn: 60 * 30, // 30 minutes
123:   },
124: });
125: `
126:
127: Tokens are single-use — deleted immediately after successful reset.
128:
129: #### Session Revocation
130:
131: Enable `revokeSessionsOnPasswordReset` to invalidate all existing sessions on password reset:
132:
133: `ts
134: export const auth = betterAuth({
135:   emailAndPassword: {
136:     enabled: true,
137:     revokeSessionsOnPasswordReset: true,
138:   },
139: });
140: `
141:
142: #### Password Requirements
143:
144: Password length limits (configurable):
145:
146: `ts
147: export const auth = betterAuth({
148:   emailAndPassword: {
149:     enabled: true,
150:     minPasswordLength: 12,
151:     maxPasswordLength: 256,
152:   },
153: });
154: `
155:
156: ### Sending the Password Reset
157:
158: Call `requestPasswordReset` to send the reset link. Triggers the `sendResetPassword` function from your config.
159:
160: `ts
161: const data = await auth.api.requestPasswordReset({
162:   body: {
163:     email: "john.doe@example.com", // required
164:     redirectTo: "https://example.com/reset-password",
165:   },
166: });
167: `
168:
169: Or authClient:
170:
171: `ts
172: const { data, error } = await authClient.requestPasswordReset({
173:   email: "john.doe@example.com", // required
174:   redirectTo: "https://example.com/reset-password",
175: });
176: `
177:
178: **Note**: While the `email` is required, we also recommend configuring the `redirectTo` for a smoother user experience.
179:
180: ## Password Hashing
181:
182: Default: `scrypt` (Node.js native, no external dependencies).
183:
184: ### Custom Hashing Algorithm
185:
186: To use Argon2id or another algorithm, provide custom `hash` and `verify` functions:
187:
188: `ts
189: import { betterAuth } from "better-auth";
190: import { hash, verify, type Options } from "@node-rs/argon2";
191: 
192: const argon2Options: Options = {
193:   memoryCost: 65536, // 64 MiB
194:   timeCost: 3, // 3 iterations
195:   parallelism: 4, // 4 parallel lanes
196:   outputLen: 32, // 32 byte output
197:   algorithm: 2, // Argon2id variant
198: };
199: 
200: export const auth = betterAuth({
201:   emailAndPassword: {
202:     enabled: true,
203:     password: {
204:       hash: (password) => hash(password, argon2Options),
205:       verify: ({ password, hash: storedHash }) =>
206:         verify(storedHash, password, argon2Options),
207:     },
208:   },
209: });
210: `
211:
212: **Note**: If you switch hashing algorithms on an existing system, users with passwords hashed using the old algorithm won't be able to sign in. Plan a migration strategy if needed.
```

## File: .kilo/skills/organization-best-practices/SKILL.md

```markdown
1: ---
2: name: organization-best-practices
3: description: Configure multi-tenant organizations, manage members and invitations, define custom roles and permissions, set up teams, and implement RBAC using Better Auth's organization plugin. Use when users need org setup, team management, member roles, access control, or the Better Auth organization plugin.
4: ---
5:
6: ## Setup
7:
8: 1. Add `organization()` plugin to server config
9: 2. Add `organizationClient()` plugin to client config
10: 3. Run `npx @better-auth/cli@latest migrate` (built-in adapter) or generate + push for Drizzle/Prisma
11: 4. Verify: check that organization, member, invitation tables exist in your database
12:
13: `ts
 14: import { betterAuth } from "better-auth";
 15: import { organization } from "better-auth/plugins";
 16: 
 17: export const auth = betterAuth({
 18:   plugins: [
 19:     organization({
 20:       allowUserToCreateOrganization: true,
 21:       organizationLimit: 5, // Max orgs per user
 22:       membershipLimit: 100, // Max members per org
 23:     }),
 24:   ],
 25: });
 26: `
27:
28: ### Client-Side Setup
29:
30: `ts
 31: import { createAuthClient } from "better-auth/client";
 32: import { organizationClient } from "better-auth/client/plugins";
 33: 
 34: export const authClient = createAuthClient({
 35:   plugins: [organizationClient()],
 36: });
 37: `
38:
39: ## Creating Organizations
40:
41: The creator is automatically assigned the `owner` role.
42:
43: `ts
 44: const createOrg = async () => {
 45:   const { data, error } = await authClient.organization.create({
 46:     name: "My Company",
 47:     slug: "my-company",
 48:     logo: "https://example.com/logo.png",
 49:     metadata: { plan: "pro" },
 50:   });
 51: };
 52: `
53:
54: ### Controlling Organization Creation
55:
56: Restrict who can create organizations based on user attributes:
57:
58: `ts
 59: organization({
 60:   allowUserToCreateOrganization: async (user) => {
 61:     return user.emailVerified === true;
 62:   },
 63:   organizationLimit: async (user) => {
 64:     // Premium users get more organizations
 65:     return user.plan === "premium" ? 20 : 3;
 66:   },
 67: });
 68: `
69:
70: ### Creating Organizations on Behalf of Users
71:
72: Administrators can create organizations for other users (server-side only):
73:
74: ``ts
 75: await auth.api.createOrganization({
 76:   body: {
 77:     name: "Client Organization",
 78:     slug: "client-org",
 79:     userId: "user-id-who-will-be-owner", // `userId` is required
 80:   },
 81: });
 82: ``
83:
84: **Note**: The `userId` parameter cannot be used alongside session headers.
85:
86: ## Active Organizations
87:
88: Stored in the session and scopes subsequent API calls. Set after user selects one.
89:
90: `ts
 91: const setActive = async (organizationId: string) => {
 92:   const { data, error } = await authClient.organization.setActive({
 93:     organizationId,
 94:   });
 95: };
 96: `
97:
98: Many endpoints use the active organization when `organizationId` is not provided (`listMembers`, `listInvitations`, `inviteMember`, etc.).
99:
100: Use `getFullOrganization()` to retrieve the active org with all members, invitations, and teams.
101:
102: ## Members
103:
104: ### Adding Members (Server-Side)
105:
106: `ts
107: await auth.api.addMember({
108:   body: {
109:     userId: "user-id",
110:     role: "member",
111:     organizationId: "org-id",
112:   },
113: });
114: `
115:
116: For client-side member additions, use the invitation system instead.
117:
118: ### Assigning Multiple Roles
119:
120: `ts
121: await auth.api.addMember({
122:   body: {
123:     userId: "user-id",
124:     role: ["admin", "moderator"],
125:     organizationId: "org-id",
126:   },
127: });
128: `
129:
130: ### Removing Members
131:
132: Use `removeMember({ memberIdOrEmail })`. The last owner cannot be removed — assign ownership to another member first.
133:
134: ### Updating Member Roles
135:
136: Use `updateMemberRole({ memberId, role })`.
137:
138: ### Membership Limits
139:
140: `ts
141: organization({
142:   membershipLimit: async (user, organization) => {
143:     if (organization.metadata?.plan === "enterprise") {
144:       return 1000;
145:     }
146:     return 50;
147:   },
148: });
149: `
150:
151: ## Invitations
152:
153: ### Setting Up Invitation Emails
154:
155: ``ts
156: import { betterAuth } from "better-auth";
157: import { organization } from "better-auth/plugins";
158: import { sendEmail } from "./email";
159: 
160: export const auth = betterAuth({
161:   plugins: [
162:     organization({
163:       sendInvitationEmail: async (data) => {
164:         const { email, organization, inviter, invitation } = data;
165: 
166:         await sendEmail({
167:           to: email,
168:           subject: `Join ${organization.name}`,
169:           html: `
170:             <p>${inviter.user.name} invited you to join ${organization.name}</p>
171:             <a href="https://yourapp.com/accept-invite?id=${invitation.id}">
172:               Accept Invitation
173:             </a>
174:           `,
175:         });
176:       },
177:     }),
178:   ],
179: });
180: ``
181:
182: ### Sending Invitations
183:
184: `ts
185: await authClient.organization.inviteMember({
186:   email: "newuser@example.com",
187:   role: "member",
188: });
189: `
190:
191: ### Shareable Invitation URLs
192:
193: `ts
194: const { data } = await authClient.organization.getInvitationURL({
195:   email: "newuser@example.com",
196:   role: "member",
197:   callbackURL: "https://yourapp.com/dashboard",
198: });
199: 
200: // Share data.url via any channel
201: `
202:
203: This endpoint does not call `sendInvitationEmail` — handle delivery yourself.
204:
205: ### Invitation Configuration
206:
207: `ts
208: organization({
209:   invitationExpiresIn: 60 * 60 * 24 * 7, // 7 days (default: 48 hours)
210:   invitationLimit: 100, // Max pending invitations per org
211:   cancelPendingInvitationsOnReInvite: true, // Cancel old invites when re-inviting
212: });
213: `
214:
215: ## Roles & Permissions
216:
217: Default roles: `owner` (full access), `admin` (manage members/invitations/settings), `member` (basic access).
218:
219: ### Checking Permissions
220:
221: `ts
222: const { data } = await authClient.organization.hasPermission({
223:   permission: "member:write",
224: });
225: 
226: if (data?.hasPermission) {
227:   // User can manage members
228: }
229: `
230:
231: Use `checkRolePermission({ role, permissions })` for client-side UI rendering (static only). For dynamic access control, use the `hasPermission` endpoint.
232:
233: ## Teams
234:
235: ### Enabling Teams
236:
237: `ts
238: import { organization } from "better-auth/plugins";
239: 
240: export const auth = betterAuth({
241:   plugins: [
242:     organization({
243:       teams: {
244:         enabled: true,
245:       },
246:     }),
247:   ],
248: });
249: `
250:
251: ### Creating Teams
252:
253: `ts
254: const { data } = await authClient.organization.createTeam({
255:   name: "Engineering",
256: });
257: `
258:
259: ### Managing Team Members
260:
261: Use `addTeamMember({ teamId, userId })` (member must be in org first) and `removeTeamMember({ teamId, userId })` (stays in org).
262:
263: Set active team with `setActiveTeam({ teamId })`.
264:
265: ### Team Limits
266:
267: `ts
268: organization({
269:   teams: {
270:     maximumTeams: 20, // Max teams per org
271:     maximumMembersPerTeam: 50, // Max members per team
272:     allowRemovingAllTeams: false, // Prevent removing last team
273:   },
274: });
275: `
276:
277: ## Dynamic Access Control
278:
279: ### Enabling Dynamic Access Control
280:
281: `ts
282: import { organization } from "better-auth/plugins";
283: import { dynamicAccessControl } from "@better-auth/organization/addons";
284: 
285: export const auth = betterAuth({
286:   plugins: [
287:     organization({
288:       dynamicAccessControl: {
289:         enabled: true,
290:       },
291:     }),
292:   ],
293: });
294: `
295:
296: ### Creating Custom Roles
297:
298: `ts
299: await authClient.organization.createRole({
300:   role: "moderator",
301:   permission: {
302:     member: ["read"],
303:     invitation: ["read"],
304:   },
305: });
306: `
307:
308: Use `updateRole({ roleId, permission })` and `deleteRole({ roleId })`. Pre-defined roles (owner, admin, member) cannot be deleted. Roles assigned to members cannot be deleted until reassigned.
309:
310: ## Lifecycle Hooks
311:
312: Execute custom logic at various points in the organization lifecycle:
313:
314: ``ts
315: organization({
316:   hooks: {
317:     organization: {
318:       beforeCreate: async ({ data, user }) => {
319:         // Validate or modify data before creation
320:         return {
321:           data: {
322:             ...data,
323:             metadata: { ...data.metadata, createdBy: user.id },
324:           },
325:         };
326:       },
327:       afterCreate: async ({ organization, member }) => {
328:         // Post-creation logic (e.g., send welcome email, create default resources)
329:         await createDefaultResources(organization.id);
330:       },
331:       beforeDelete: async ({ organization }) => {
332:         // Cleanup before deletion
333:         await archiveOrganizationData(organization.id);
334:       },
335:     },
336:     member: {
337:       afterCreate: async ({ member, organization }) => {
338:         await notifyAdmins(organization.id, `New member joined`);
339:       },
340:     },
341:     invitation: {
342:       afterCreate: async ({ invitation, organization, inviter }) => {
343:         await logInvitation(invitation);
344:       },
345:     },
346:   },
347: });
348: ``
349:
350: ## Schema Customization
351:
352: Customize table names, field names, and add additional fields:
353:
354: `ts
355: organization({
356:   schema: {
357:     organization: {
358:       modelName: "workspace", // Rename table
359:       fields: {
360:         name: "workspaceName", // Rename fields
361:       },
362:       additionalFields: {
363:         billingId: {
364:           type: "string",
365:           required: false,
366:         },
367:       },
368:     },
369:     member: {
370:       additionalFields: {
371:         department: {
372:           type: "string",
373:           required: false,
374:         },
375:         title: {
376:           type: "string",
377:           required: false,
378:         },
379:       },
380:     },
381:   },
382: });
383: `
384:
385: ## Security Considerations
386:
387: ### Owner Protection
388:
389: - The last owner cannot be removed from an organization
390: - The last owner cannot leave the organization
391: - The owner role cannot be removed from the last owner
392:
393: Always ensure ownership transfer before removing the current owner:
394:
395: `ts
396: // Transfer ownership first
397: await authClient.organization.updateMemberRole({
398:   memberId: "new-owner-member-id",
399:   role: "owner",
400: });
401: 
402: // Then the previous owner can be demoted or removed
403: `
404:
405: ### Organization Deletion
406:
407: Deleting an organization removes all associated data (members, invitations, teams). Prevent accidental deletion:
408:
409: `ts
410: organization({
411:   disableOrganizationDeletion: true, // Disable via config
412: });
413: `
414:
415: Or implement soft delete via hooks:
416:
417: `ts
418: organization({
419:   hooks: {
420:     organization: {
421:       beforeDelete: async ({ organization }) => {
422:         // Archive instead of delete
423:         await archiveOrganization(organization.id);
424:         throw new Error("Organization archived, not deleted");
425:       },
426:     },
427:   },
428: });
429: `
430:
431: ### Invitation Security
432:
433: - Invitations expire after 48 hours by default
434: - Only the invited email address can accept an invitation
435: - Pending invitations can be cancelled by organization admins
436:
437: ## Complete Configuration Example
438:
439: ``ts
440: import { betterAuth } from "better-auth";
441: import { organization } from "better-auth/plugins";
442: import { sendEmail } from "./email";
443: 
444: export const auth = betterAuth({
445:   plugins: [
446:     organization({
447:       // Organization limits
448:       allowUserToCreateOrganization: true,
449:       organizationLimit: 10,
450:       membershipLimit: 100,
451:       creatorRole: "owner",
452: 
453:       // Slugs
454:       defaultOrganizationIdField: "slug",
455: 
456:       // Invitations
457:       invitationExpiresIn: 60 * 60 * 24 * 7, // 7 days
458:       invitationLimit: 50,
459:       sendInvitationEmail: async (data) => {
460:         await sendEmail({
461:           to: data.email,
462:           subject: `Join ${data.organization.name}`,
463:           html: `<a href="https://app.com/invite/${data.invitation.id}">Accept</a>`,
464:         });
465:       },
466: 
467:       // Hooks
468:       hooks: {
469:         organization: {
470:           afterCreate: async ({ organization }) => {
471:             console.log(`Organization ${organization.name} created`);
472:           },
473:         },
474:       },
475:     }),
476:   ],
477: });
478: ``
```

## File: .kilo/skills/two-factor-authentication-best-practices/SKILL.md

```markdown
1: ---
2: name: two-factor-authentication-best-practices
3: description: Configure TOTP authenticator apps, send OTP codes via email/SMS, manage backup codes, handle trusted devices, and implement 2FA sign-in flows using Better Auth's twoFactor plugin. Use when users need MFA, multi-factor authentication, authenticator setup, or login security with Better Auth.
4: ---
5:
6: ## Setup
7:
8: 1. Add `twoFactor()` plugin to server config with `issuer`
9: 2. Add `twoFactorClient()` plugin to client config
10: 3. Run `npx @better-auth/cli@latest migrate` (built-in adapter) or generate + push for Drizzle/Prisma
11: 4. Verify: check that `twoFactorSecret` column exists on user table
12:
13: `ts
 14: import { betterAuth } from "better-auth";
 15: import { twoFactor } from "better-auth/plugins";
 16: 
 17: export const auth = betterAuth({
 18:   appName: "My App",
 19:   plugins: [
 20:     twoFactor({
 21:       issuer: "My App",
 22:     }),
 23:   ],
 24: });
 25: `
26:
27: ### Client-Side Setup
28:
29: `ts
 30: import { createAuthClient } from "better-auth/client";
 31: import { twoFactorClient } from "better-auth/client/plugins";
 32: 
 33: export const authClient = createAuthClient({
 34:   plugins: [
 35:     twoFactorClient({
 36:       onTwoFactorRedirect() {
 37:         window.location.href = "/2fa";
 38:       },
 39:     }),
 40:   ],
 41: });
 42: `
43:
44: ## Enabling 2FA for Users
45:
46: Requires password verification. Returns TOTP URI (for QR code) and backup codes.
47:
48: `ts
 49: const enable2FA = async (password: string) => {
 50:   const { data, error } = await authClient.twoFactor.enable({
 51:     password,
 52:   });
 53: 
 54:   if (data) {
 55:     // data.totpURI — generate a QR code from this
 56:     // data.backupCodes — display to user
 57:   }
 58: };
 59: `
60:
61: `twoFactorEnabled` is not set to `true` until first TOTP verification succeeds. Override with `skipVerificationOnEnable: true` (not recommended).
62:
63: ## TOTP (Authenticator App)
64:
65: ### Displaying the QR Code
66:
67: `tsx
 68: import QRCode from "react-qr-code";
 69: 
 70: const TotpSetup = ({ totpURI }: { totpURI: string }) => {
 71:   return <QRCode value={totpURI} />;
 72: };
 73: `
74:
75: ### Verifying TOTP Codes
76:
77: Accepts codes from one period before/after current time:
78:
79: `ts
 80: const verifyTotp = async (code: string) => {
 81:   const { data, error } = await authClient.twoFactor.verifyTotp({
 82:     code,
 83:     trustDevice: true,
 84:   });
 85: };
 86: `
87:
88: ### TOTP Configuration Options
89:
90: `ts
 91: twoFactor({
 92:   totpOptions: {
 93:     digits: 6, // 6 or 8 digits (default: 6)
 94:     period: 30, // Code validity period in seconds (default: 30)
 95:   },
 96: });
 97: `
98:
99: ## OTP (Email/SMS)
100:
101: ### Configuring OTP Delivery
102:
103: ``ts
104: import { betterAuth } from "better-auth";
105: import { twoFactor } from "better-auth/plugins";
106: import { sendEmail } from "./email";
107: 
108: export const auth = betterAuth({
109:   plugins: [
110:     twoFactor({
111:       otpOptions: {
112:         sendOTP: async ({ user, otp }, ctx) => {
113:           await sendEmail({
114:             to: user.email,
115:             subject: "Your verification code",
116:             text: `Your code is: ${otp}`,
117:           });
118:         },
119:         period: 5, // Code validity in minutes (default: 3)
120:         digits: 6, // Number of digits (default: 6)
121:         allowedAttempts: 5, // Max verification attempts (default: 5)
122:       },
123:     }),
124:   ],
125: });
126: ``
127:
128: ### Sending and Verifying OTP
129:
130: Send: `authClient.twoFactor.sendOtp()`. Verify: `authClient.twoFactor.verifyOtp({ code, trustDevice: true })`.
131:
132: ### OTP Storage Security
133:
134: Configure how OTP codes are stored in the database:
135:
136: `ts
137: twoFactor({
138:   otpOptions: {
139:     storeOTP: "encrypted", // Options: "plain", "encrypted", "hashed"
140:   },
141: });
142: `
143:
144: For custom encryption:
145:
146: `ts
147: twoFactor({
148:   otpOptions: {
149:     storeOTP: {
150:       encrypt: async (token) => myEncrypt(token),
151:       decrypt: async (token) => myDecrypt(token),
152:     },
153:   },
154: });
155: `
156:
157: ## Backup Codes
158:
159: Generated automatically when 2FA is enabled. Each code is single-use.
160:
161: ### Displaying Backup Codes
162:
163: `tsx
164: const BackupCodes = ({ codes }: { codes: string[] }) => {
165:   return (
166:     <div>
167:       <p>Save these codes in a secure location:</p>
168:       <ul>
169:         {codes.map((code, i) => (
170:           <li key={i}>{code}</li>
171:         ))}
172:       </ul>
173:     </div>
174:   );
175: };
176: `
177:
178: ### Regenerating Backup Codes
179:
180: Invalidates all previous codes:
181:
182: `ts
183: const regenerateBackupCodes = async (password: string) => {
184:   const { data, error } = await authClient.twoFactor.generateBackupCodes({
185:     password,
186:   });
187:   // data.backupCodes contains the new codes
188: };
189: `
190:
191: ### Using Backup Codes for Recovery
192:
193: `ts
194: const verifyBackupCode = async (code: string) => {
195:   const { data, error } = await authClient.twoFactor.verifyBackupCode({
196:     code,
197:     trustDevice: true,
198:   });
199: };
200: `
201:
202: ### Backup Code Configuration
203:
204: `ts
205: twoFactor({
206:   backupCodeOptions: {
207:     amount: 10, // Number of codes to generate (default: 10)
208:     length: 10, // Length of each code (default: 10)
209:     storeBackupCodes: "encrypted", // Options: "plain", "encrypted"
210:   },
211: });
212: `
213:
214: ## Handling 2FA During Sign-In
215:
216: Response includes `twoFactorRedirect: true` when 2FA is required:
217:
218: ### Sign-In Flow
219:
220: 1. Call `signIn.email({ email, password })`
221: 2. Check `context.data.twoFactorRedirect` in `onSuccess`
222: 3. If `true`, redirect to `/2fa` verification page
223: 4. Verify via TOTP, OTP, or backup code
224: 5. Session cookie is created on successful verification
225:
226: `ts
227: const signIn = async (email: string, password: string) => {
228:   const { data, error } = await authClient.signIn.email(
229:     { email, password },
230:     {
231:       onSuccess(context) {
232:         if (context.data.twoFactorRedirect) {
233:           window.location.href = "/2fa";
234:         }
235:       },
236:     },
237:   );
238: };
239: `
240:
241: Server-side: check `"twoFactorRedirect" in response` when using `auth.api.signInEmail`.
242:
243: ## Trusted Devices
244:
245: Pass `trustDevice: true` when verifying. Default trust duration: 30 days (`trustDeviceMaxAge`). Refreshes on each sign-in.
246:
247: ## Security Considerations
248:
249: ### Session Management
250:
251: Flow: credentials → session removed → temporary 2FA cookie (10 min default) → verify → session created.
252:
253: `ts
254: twoFactor({
255:   twoFactorCookieMaxAge: 600, // 10 minutes in seconds (default)
256: });
257: `
258:
259: ### Rate Limiting
260:
261: Built-in: 3 requests per 10 seconds for all 2FA endpoints. OTP has additional attempt limiting:
262:
263: `ts
264: twoFactor({
265:   otpOptions: {
266:     allowedAttempts: 5, // Max attempts per OTP code (default: 5)
267:   },
268: });
269: `
270:
271: ### Encryption at Rest
272:
273: TOTP secrets: encrypted with auth secret. Backup codes: encrypted by default. OTP: configurable (`"plain"`, `"encrypted"`, `"hashed"`). Uses constant-time comparison for verification.
274:
275: 2FA can only be enabled for credential (email/password) accounts.
276:
277: ## Disabling 2FA
278:
279: Requires password confirmation. Revokes trusted device records:
280:
281: `ts
282: const disable2FA = async (password: string) => {
283:   const { data, error } = await authClient.twoFactor.disable({
284:     password,
285:   });
286: };
287: `
288:
289: ## Complete Configuration Example
290:
291: ``ts
292: import { betterAuth } from "better-auth";
293: import { twoFactor } from "better-auth/plugins";
294: import { sendEmail } from "./email";
295: 
296: export const auth = betterAuth({
297:   appName: "My App",
298:   plugins: [
299:     twoFactor({
300:       // TOTP settings
301:       issuer: "My App",
302:       totpOptions: {
303:         digits: 6,
304:         period: 30,
305:       },
306:       // OTP settings
307:       otpOptions: {
308:         sendOTP: async ({ user, otp }) => {
309:           await sendEmail({
310:             to: user.email,
311:             subject: "Your verification code",
312:             text: `Your code is: ${otp}`,
313:           });
314:         },
315:         period: 5,
316:         allowedAttempts: 5,
317:         storeOTP: "encrypted",
318:       },
319:       // Backup code settings
320:       backupCodeOptions: {
321:         amount: 10,
322:         length: 10,
323:         storeBackupCodes: "encrypted",
324:       },
325:       // Session settings
326:       twoFactorCookieMaxAge: 600, // 10 minutes
327:       trustDeviceMaxAge: 30 * 24 * 60 * 60, // 30 days
328:     }),
329:   ],
330: });
331: ``
```

## File: docs/ADR/001-use-layered-architecture.md

```markdown
1: # ADR-001: Use Layered Architecture
2:
3: ## Status
4:
5: Accepted
6:
7: ## Date
8:
9: 2026-07-20
10:
11: ## Context
12:
13: The project needs a clear separation of concerns to maintain code quality as it grows. Business logic must be isolated from the presentation layer.
14:
15: ## Decision
16:
17: We will follow a layered architecture:
18:
19: `20: UI (Server Components)
21: ↓
22: Actions / Routes
23: ↓
24: Services
25: ↓
26: Repositories
27: ↓
28: Database (Prisma + Neon PostgreSQL)
29:`
30:
31: ## Consequences
32:
33: ### Positive
34:
35: - Clear separation of concerns.
36: - Business logic is testable in isolation.
37: - Database access is centralized in repositories.
38: - UI remains a thin presentation layer.
39:
40: ### Negative
41:
42: - More files and folders for simple features.
43: - Requires discipline to maintain the layers.
44: - Adds indirection for simple data fetching.
45:
46: ## Alternatives Considered
47:
48: - **Direct Prisma in components**: Rejected. Violates separation of concerns.
49: - **Service-only architecture**: Rejected. Mixes data access with business logic.
50: - **Feature-based architecture**: Future consideration. Can coexist with layers.
```

## File: docs/ADR/002-use-neon-with-prisma.md

```markdown
1: # ADR-002: Use Neon PostgreSQL with Prisma
2:
3: ## Status
4:
5: Accepted
6:
7: ## Date
8:
9: 2026-07-20
10:
11: ## Context
12:
13: The project needs a reliable, scalable database that works well with TypeScript and serverless deployment.
14:
15: ## Decision
16:
17: We will use Neon PostgreSQL as the database provider with Prisma as the ORM.
18:
19: ## Consequences
20:
21: ### Positive
22:
23: - Serverless PostgreSQL scales automatically.
24: - Prisma provides type-safe database access.
25: - Neon adapter works with connection pooling.
26: - WebSocket support for serverless environments.
27:
28: ### Negative
29:
30: - Neon-specific configuration required.
31: - Connection pooling adds complexity.
32: - WebSocket setup in `lib/db.ts` adds boilerplate.
33:
34: ## Alternatives Considered
35:
36: - **Supabase**: Rejected. Prisma integration is less mature.
37: - **PlanetScale**: Rejected. MySQL, not PostgreSQL.
38: - **Railway**: Rejected. Not serverless-native.
```

## File: docs/ADR/003-use-shadcn-ui.md

```markdown
1: # ADR-003: Use shadcn/ui for Component Library
2:
3: ## Status
4:
5: Accepted
6:
7: ## Date
8:
9: 2026-07-20
10:
11: ## Context
12:
13: The project needs a reusable component library that is accessible, customizable, and works with Tailwind CSS.
14:
15: ## Decision
16:
17: We will use shadcn/ui with the base-nova style and lucide-react icons.
18:
19: ## Consequences
20:
21: ### Positive
22:
23: - Components are accessible by default.
24: - Full control over component code.
25: - No vendor lock-in.
26: - Works with Tailwind CSS v4.
27:
28: ### Negative
29:
30: - Components must be manually updated.
31: - No automatic updates from upstream.
32: - Requires understanding of component internals.
33:
34: ## Alternatives Considered
35:
36: - **Radix UI**: Rejected. shadcn/ui wraps Radix with better defaults.
37: - **Headless UI**: Rejected. Less opinionated, more work.
38: - **Mantine**: Rejected. Too heavy, less customizable.
```

## File: docs/audits/Brand Fidelity Audit.md

```markdown
1: # Brand Fidelity Audit
2:
3: Verify that redesigns preserve brand identity and URLs.
4:
5: ---
6:
7: # Rules
8:
9: - Never change existing URLs without explicit decision.
10: - Never change brand identity without explicit decision.
11: - Document every change that affects brand or routing.
12: - Record the before and after state.
13:
14: ---
15:
16: # What to Check
17:
18: ## URLs
19:
20: - [ ] All existing URLs preserved.
21: - [ ] New URLs follow existing patterns.
22: - [ ] Redirects in place for any changed URLs.
23:
24: ## Brand Identity
25:
26: - [ ] Logo and wordmark unchanged.
27: - [ ] Brand colors preserved (unless explicitly updated).
28: - [ ] Brand typography preserved (unless explicitly updated).
29: - [ ] Brand voice and tone consistent.
30:
31: ## Visual Identity
32:
33: - [ ] Consistent visual language across pages.
34: - [ ] No jarring style changes between sections.
35: - [ ] Transition between old and new design is smooth.
36:
37: ---
38:
39: # Documentation
40:
41: Record all changes:
42:
43: - What changed.
44: - Why it changed.
45: - Who approved the change.
46: - Impact on existing users.
47:
48: ---
49:
50: # Sources
51:
52: - Gogh maturity gates - Brand preservation rules.
53: - Taste Skill v2 - Redesign protocol.
```

## File: docs/audits/Impeccable Audit and Detect.md

```markdown
1: # Impeccable Audit and Detect
2:
3: Automated visual and engineering defect detection using Impeccable.
4:
5: ---
6:
7: # Installation
8:
9: `bash
10: npx impeccable install
11: `
12:
13: ---
14:
15: # Running Detection
16:
17: `bash
18: npx impeccable detect
19: `
20:
21: This runs 45 deterministic rules without an LLM.
22:
23: ---
24:
25: # What It Detects
26:
27: - Typography violations.
28: - Color violations.
29: - Layout violations.
30: - Interaction violations.
31: - Performance violations.
32: - Accessibility violations.
33:
34: ---
35:
36: # Named Anti-Slop Tells
37:
38: - Inter for everything without justification.
39: - Purple-to-blue gradients.
40: - Cards nested in cards.
41: - Decorative grid backgrounds.
42: - Two-axis gradient overlay patterns.
43:
44: ---
45:
46: # CI/CD Integration
47:
48: Add to your CI pipeline:
49:
50: `bash
51: npx impeccable detect --ci
52: `
53:
54: Fails the build if any critical violations are found.
55:
56: ---
57:
58: # Manual Review
59:
60: After automated detection:
61:
62: 1. Review findings.
63: 2. Fix critical violations first.
64: 3. Address warnings based on priority.
65: 4. Document any intentional deviations.
66:
67: ---
68:
69: # Sources
70:
71: - pbakaus/impeccable (Apache-2.0).
72: - impeccable.style.
```

## File: docs/audits/MIFB Review Checklist.md

```markdown
1: # MIFB Review Checklist
2:
3: Micro-interaction and visual polish review based on Make Interfaces Feel Better.
4:
5: ---
6:
7: # Shadow Review
8:
9: - [ ] Shadows composed from three layers (ambient, key, rim).
10: - [ ] Shadows used instead of borders for depth.
11: - [ ] Shadow color adjusted for dark mode.
12: - [ ] No single-layer box-shadow.
13:
14: ---
15:
16: # Border Radius Review
17:
18: - [ ] Concentric radius formula applied: outer = inner + padding.
19: - [ ] Consistent radius scale across the page.
20: - [ ] No mixed radius scales.
21:
22: ---
23:
24: # Press State Review
25:
26: - [ ] All buttons have press feedback.
27: - [ ] Press feedback: `scale(0.96)`.
28: - [ ] Never below `scale(0.95)`.
29: - [ ] Hover states present on all interactive elements.
30:
31: ---
32:
33: # Hit Area Review
34:
35: - [ ] All interactive elements: 40x40px minimum.
36: - [ ] Smaller elements extended with pseudo-elements.
37: - [ ] Touch targets meet mobile requirements.
38:
39: ---
40:
41: # Animation Review
42:
43: - [ ] Icon animations: scale 0.25->1, opacity 0->1, blur 4px->0.
44: - [ ] Stagger delay: ~100ms between items.
45: - [ ] Enter duration: ~800ms.
46: - [ ] Exit subtler than enter.
47: - [ ] `prefers-reduced-motion` honored.
48: - [ ] Spring settings: duration 0.3, bounce 0.
49:
50: ---
51:
52: # Typography Review
53:
54: - [ ] Font smoothing: `-webkit-font-smoothing: antialiased`.
55: - [ ] Tabular nums for numeric data.
56: - [ ] Optical alignment applied.
57: - [ ] Line length: 45-90 characters.
58:
59: ---
60:
61: # Image Review
62:
63: - [ ] Image outlines: 1px at 10% opacity.
64: - [ ] Black outline in light mode, white in dark mode.
65:
66: ---
67:
68: # Sources
69:
70: - jakubkrehel/make-interfaces-feel-better.
71: - jakub.kr/writing/details-that-make-interfaces-feel-better.
```

## File: docs/audits/Pre-Flight Check (Section 14).md

```markdown
1: # Pre-Flight Check (Section 14)
2:
3: Mandatory checklist before completing any page or component.
4:
5: Every box must pass. Any failure blocks completion.
6:
7: ---
8:
9: # Design Dials
10:
11: - [ ] Three dials set (Design Variance, Motion Intensity, Visual Density).
12: - [ ] Dials committed before touching layout.
13:
14: ---
15:
16: # Color
17:
18: - [ ] One accent color per page.
19: - [ ] No purple-to-blue gradients.
20: - [ ] No banned palettes (cream+terracotta, black+acid-green).
21: - [ ] Design tokens from globals.css used consistently.
22: - [ ] No hardcoded color values in Tailwind classes.
23:
24: ---
25:
26: # Typography
27:
28: - [ ] Headlines use `text-wrap: balance`.
29: - [ ] Body text uses `text-wrap: pretty`.
30: - [ ] Body text: `max-w-[65ch]`.
31: - [ ] Font smoothing enabled.
32: - [ ] Tabular nums for numeric data.
33: - [ ] No em-dashes or en-dashes in visible text.
34: - [ ] Inter not used for everything without justification.
35:
36: ---
37:
38: # Hero
39:
40: - [ ] Headline: max 2 lines.
41: - [ ] Subtext: max 20 words.
42: - [ ] CTA visible without scrolling.
43: - [ ] Top padding: max `pt-24`.
44: - [ ] Max 4 text elements.
45:
46: ---
47:
48: # Navigation
49:
50: - [ ] Single line at desktop.
51: - [ ] Height cap: 80px.
52: - [ ] No hamburger on desktop.
53:
54: ---
55:
56: # Layout
57:
58: - [ ] At least 4 layout families in 8-section pages.
59: - [ ] Bento grids: exactly N cells for N items.
60: - [ ] No cards nested inside cards.
61: - [ ] Grid broken intentionally at least once.
62: - [ ] Spacing feels deliberate, not uniform.
63:
64: ---
65:
66: # Interactions
67:
68: - [ ] Interactive elements: 40x40px minimum hit area.
69: - [ ] Press states: `scale(0.96)`.
70: - [ ] Shadows: three-layer composition.
71: - [ ] Borders avoided in favor of shadows.
72: - [ ] Animations honor `prefers-reduced-motion`.
73: - [ ] Icon animations: scale, opacity, blur with stagger.
74:
75: ---
76:
77: # Accessibility
78:
79: - [ ] Focus rings visible on all interactive elements.
80: - [ ] ARIA labels on icon-only buttons.
81: - [ ] Semantic HTML elements.
82: - [ ] Color contrast meets WCAG AA.
83: - [ ] Keyboard navigation works.
84:
85: ---
86:
87: # Documentation Rules
88:
89: Every significant change should update the relevant documentation.
90:
91: Architecture decisions should be documented before implementation whenever possible.
92:
93: Documentation should always reflect the current state of the project.
```

## File: docs/audits/Preservation Audit.md

```markdown
1: # Preservation Audit
2:
3: Ensure existing functionality is not broken during redesigns.
4:
5: ---
6:
7: # Rules
8:
9: - Never destroy existing functionality without explicit decision.
10: - Never break existing tests without explicit decision.
11: - Never remove existing features without explicit decision.
12: - Document every removal or change.
13:
14: ---
15:
16: # What to Check
17:
18: ## Functionality
19:
20: - [ ] All existing features still work.
21: - [ ] No regression in existing behavior.
22: - [ ] All existing tests still pass.
23:
24: ## Data
25:
26: - [ ] No data loss.
27: - [ ] No schema changes without migration.
28: - [ ] No breaking changes to API contracts.
29:
30: ## Performance
31:
32: - [ ] No performance regression.
33: - [ ] Bundle size does not increase significantly.
34: - [ ] No new client-side JavaScript without justification.
35:
36: ## Accessibility
37:
38: - [ ] No accessibility regression.
39: - [ ] All existing ARIA attributes preserved.
40: - [ ] Focus management unchanged or improved.
41:
42: ---
43:
44: # Documentation
45:
46: Record all changes:
47:
48: - What was preserved.
49: - What was changed.
50: - Why the change was necessary.
51: - Impact assessment.
52:
53: ---
54:
55: # Sources
56:
57: - Gogh maturity gates - Preservation rules.
58: - Taste Skill v2 - Section 11 redesign protocol.
```

## File: docs/audits/Vercel Audit Guidelines.md

```markdown
1: # Vercel Audit Guidelines
2:
3: Performance and accessibility audit based on Vercel's web design guidelines.
4:
5: ---
6:
7: # Audit Process
8:
9: 1. Read the target files.
10: 2. Check all rules from `docs/rules/Vercel Interface Rule Categories.md`.
11: 3. Output findings grouped by file in `file:line` format.
12: 4. Mark each finding as pass/fail.
13:
14: ---
15:
16: # Accessibility Rules
17:
18: - Icon-only buttons: `aria-label` present.
19: - No `outline-none` without focus replacement.
20: - No paste blocking on inputs.
21: - `prefers-reduced-motion` honored.
22: - Semantic HTML used.
23: - Color contrast meets WCAG AA.
24:
25: ---
26:
27: # Performance Rules
28:
29: - Server Components used by default.
30: - Below-the-fold content lazy loaded.
31: - Client JS minimized.
32: - Streaming and Suspense used.
33: - Critical navigation links prefetched.
34:
35: ---
36:
37: # Form Rules
38:
39: - Labels associated with inputs.
40: - Error messages linked via `aria-describedby`.
41: - Required fields indicated.
42: - Inline validation on blur.
43: - No accidental state clearing.
44:
45: ---
46:
47: # Image Rules
48:
49: - `width` and `height` on all images.
50: - `next/image` used for optimization.
51: - Alt text on meaningful images.
52: - Decorative images: `alt=""`.
53:
54: ---
55:
56: # Output Format
57:
58: `59: file:line - PASS/FAIL - Description
60:`
61:
62: Example:
63:
64: `65: app/page.tsx:42 - FAIL - Icon button missing aria-label
66: components/ui/button.tsx:15 - PASS - Focus ring present
67:`
68:
69: ---
70:
71: # Sources
72:
73: - vercel-labs/web-interface-guidelines (MIT).
74: - vercel.com/design/guidelines.
```

## File: docs/concepts/AI Slop.md

```markdown
1: # AI Slop
2:
3: Understanding and preventing generic AI-generated UI output.
4:
5: ---
6:
7: # What Is AI Slop
8:
9: AI slop is the distributional convergence of LLM-generated frontends. Because LLMs are statistical pattern matchers, they reach for the median of their training corpus.
10:
11: The result: Inter for everything, purple-to-blue gradients, cards nested in cards, and minimal animations.
12:
13: ---
14:
15: # Why It Happens
16:
17: - LLMs default to safe, common patterns.
18: - Training data is dominated by tutorial and template outputs.
19: - The median of training data is generic, not distinctive.
20: - Without constraints, agents produce the same layouts.
21:
22: ---
23:
24: # The Fix
25:
26: Constraint, not prompting.
27:
28: - Forbidden patterns (anti-slop tells).
29: - Committed aesthetic direction (three dials).
30: - Pre-flight checks (Section 14).
31: - Evidence-gated claims (source-ledger).
32:
33: ---
34:
35: # Named Tells
36:
37: From Impeccable's 45-rule detector:
38:
39: - Inter for everything.
40: - Purple-to-blue gradients.
41: - Cards nested in cards.
42: - Decorative grid backgrounds.
43: - Two-axis gradient overlays.
44: - Uniform spacing everywhere.
45: - No micro-interactions.
46: - Generic hero sections.
47:
48: ---
49:
50: # Prevention Strategy
51:
52: 1. Set the three dials before building.
53: 2. Commit to a palette and direction.
54: 3. Check against anti-slop tells.
55: 4. Run pre-flight before shipping.
56: 5. Document design decisions.
57:
58: ---
59:
60: # Sources
61:
62: - Taste Skill v2 (Leon Lin) - Anti-slop framework.
63: - Anthropic frontend-design - Distributional convergence research.
64: - prg.sh - "Why Your AI Keeps Building the Same Purple Gradient Website."
```

## File: docs/concepts/Coaxing Beats Constraint.md

```markdown
1: # Coaxing Beats Constraint
2:
3: Why gentle guidance produces better design output than rigid rules.
4:
5: ---
6:
7: # The Problem
8:
9: Rigid rules produce rigid output. When you tell an agent "use exactly 16px padding everywhere," you get uniform, lifeless layouts.
10:
11: ---
12:
13: # The Solution
14:
15: Coaxing: setting direction and letting the agent fill in the details.
16:
17: - Set the three dials (direction).
18: - Define the palette (constraints).
19: - Let the agent compose within those constraints.
20: - Review and refine, not dictate.
21:
22: ---
23:
24: # How It Works
25:
26: 1. Commit to a direction (three dials).
27: 2. Define boundaries (palette, typography, radius).
28: 3. Let the agent build within boundaries.
29: 4. Critique and revise.
30: 5. Never dictate every pixel.
31:
32: ---
33:
34: # When to Use Coaxing
35:
36: - New features and components.
37: - Landing pages and marketing sites.
38: - Creative layouts and editorial designs.
39:
40: ---
41:
42: # When to Use Constraint
43:
44: - Accessibility rules (non-negotiable).
45: - Security rules (non-negotiable).
46: - Architecture rules (non-negotiable).
47: - Anti-slop tells (non-negotiable).
48:
49: ---
50:
51: # The Balance
52:
53: - Coax for aesthetics.
54: - Constrain for quality.
55: - The three dials are coaxing tools.
56: - The anti-slop tells are constraint tools.
57:
58: ---
59:
60: # Sources
61:
62: - Taste Skill v2 (Leon Lin) - Coaxing vs constraint philosophy.
```

## File: docs/concepts/Design Review as Infrastructure.md

```markdown
1: # Design Review as Infrastructure
2:
3: Making design review a systematic, repeatable process rather than a one-time check.
4:
5: ---
6:
7: # The Problem
8:
9: Design review is typically ad-hoc: someone looks at the UI and gives subjective feedback. This does not scale and is not repeatable.
10:
11: ---
12:
13: # The Solution
14:
15: Treat design review as infrastructure:
16:
17: - Automated checks (Impeccable detector, ESLint, TypeScript).
18: - Manual checklists (Section 14 pre-flight).
19: - Source-gated claims (every rule cites a source).
20: - Repeatable pipelines (audit pipeline flow).
21:
22: ---
23:
24: # Layers of Review
25:
26: ## Automated
27:
28: - TypeScript type checking.
29: - ESLint linting.
30: - Impeccable 45-rule detector.
31: - Knip dead code detection.
32:
33: ## Semi-Automated
34:
35: - Section 14 pre-flight checklist.
36: - Vercel audit guidelines.
37: - MIFB review checklist.
38:
39: ## Manual
40:
41: - Brand fidelity audit.
42: - Preservation audit.
43: - Accessibility testing.
44: - Performance profiling.
45:
46: ---
47:
48: # Integration
49:
50: Design review should be part of:
51:
52: - Pre-commit hooks (Husky).
53: - CI/CD pipeline (automated checks).
54: - Pull request review (manual checks).
55: - Release process (full audit).
56:
57: ---
58:
59: # Documentation
60:
61: Every review finding should be:
62:
63: - Documented in the relevant docs folder.
64: - Tracked to resolution.
65: - Linked to the source rule.
66:
67: ---
68:
69: # Sources
70:
71: - Developers Digest - "Taste Skills Are Turning Agent Review Into Infrastructure."
72: - Impeccable - Deterministic detector as infrastructure.
```

## File: docs/concepts/Interruptible Animation.md

```markdown
1: # Interruptible Animation
2:
3: Making animations that can be interrupted without breaking the interface.
4:
5: ---
6:
7: # The Problem
8:
9: Non-interruptible animations frustrate users. When a user clicks a new target while an animation is running, the animation should stop cleanly and start the new one.
10:
11: ---
12:
13: # Rules
14:
15: - All animations must be interruptible.
16: - Use `transition` instead of `animation` when possible.
17: - Prefer `transform` and `opacity` (GPU-accelerated).
18: - Never animate layout properties (width, height, padding).
19:
20: ---
21:
22: # Implementation
23:
24: `tsx
25: <div className="transition-all duration-300 ease-out">Content</div>
26: `
27:
28: ---
29:
30: # Animation Values
31:
32: | Property | Value |
33: | --------------- | ------------------ |
34: | Enter duration | ~800ms |
35: | Exit duration | Subtler than enter |
36: | Stagger delay | ~100ms |
37: | Icon scale | 0.25 -> 1 |
38: | Icon opacity | 0 -> 1 |
39: | Icon blur | 4px -> 0 |
40: | Spring duration | 0.3 |
41: | Spring bounce | 0 |
42:
43: ---
44:
45: # Reduced Motion
46:
47: Always honor `prefers-reduced-motion`:
48:
49: `tsx
50: @media (prefers-reduced-motion: reduce) {
51:   * {
52:     animation-duration: 0.01ms !important;
53:     transition-duration: 0.01ms !important;
54:   }
55: }
56: `
57:
58: ---
59:
60: # Sources
61:
62: - Make Interfaces Feel Better (Jakub Krehel) - Interruptible animations.
63: - Vercel web-design-guidelines - Animation rules.
```

## File: docs/concepts/Optical Alignment.md

```markdown
1: # Optical Alignment
2:
3: Making interfaces feel visually correct, not just mathematically correct.
4:
5: ---
6:
7: # The Problem
8:
9: Mathematical centering does not always look centered. Elements with different visual weights appear off-center when mathematically centered.
10:
11: ---
12:
13: # The Solution
14:
15: Optical alignment adjusts elements based on their visual weight, not their mathematical position.
16:
17: ---
18:
19: # Rules
20:
21: - Heavier elements shift slightly toward center.
22: - Lighter elements shift slightly away from center.
23: - Icons align with text baselines, not bounding boxes.
24: - Circular elements align by visual center, not bounding box.
25:
26: ---
27:
28: # Examples
29:
30: - A circle next to text: shift the circle down 1-2px to align optical center with text baseline.
31: - An icon next to text: shift the icon down to align with the text's x-height.
32: - A heavy headline above light body text: shift headline slightly down.
33:
34: ---
35:
36: # Application
37:
38: - Check every composition for optical alignment.
39: - Adjust padding and margin for visual balance.
40: - Do not rely solely on Tailwind's default spacing.
41: - Use arbitrary values when optical correction is needed.
42:
43: ---
44:
45: # Sources
46:
47: - Make Interfaces Feel Better (Jakub Krehel) - Optical alignment rules.
48: - Refactoring UI (Wathan & Schoger) - Visual hierarchy principles.
```

## File: docs/concepts/Press Feedback and Hit Areas.md

```markdown
1: # Press Feedback and Hit Areas
2:
3: Rules for making interactive elements feel responsive and accessible.
4:
5: ---
6:
7: # Press Feedback
8:
9: Every interactive element should provide visual feedback when pressed.
10:
11: ## Rules
12:
13: - Button press: `transform: scale(0.96)`.
14: - Never go below `scale(0.95)`.
15: - Apply via CSS transition for smoothness.
16: - Duration: ~100ms.
17:
18: ## Implementation
19:
20: `tsx
21: <Button className="active:scale-[0.96] transition-transform duration-100">
22:   Click me
23: </Button>
24: `
25:
26: ---
27:
28: # Hit Areas
29:
30: Interactive elements must have sufficient touch/click targets.
31:
32: ## Rules
33:
34: - Minimum 40x40px hit area.
35: - Extend with pseudo-element when visible element is smaller.
36: - Apply `min-h-[40px] min-w-[40px]` for minimum sizing.
37:
38: ## Implementation
39:
40: `tsx
41: <Button className="min-h-[40px] min-w-[40px]">
42:   <span className="sr-only">Label</span>
43:   <Icon className="h-4 w-4" />
44: </Button>
45: `
46:
47: ---
48:
49: # Hover States
50:
51: - Use `@media (hover: hover)` for hover styles.
52: - Hover should enhance, not replace, the base state.
53: - Transition between states smoothly.
54:
55: ---
56:
57: # Focus States
58:
59: - Visible focus ring on all interactive elements.
60: - Never use `outline-none` without a replacement.
61: - Focus ring should be consistent across the application.
62:
63: ---
64:
65: # Sources
66:
67: - Make Interfaces Feel Better (Jakub Krehel) - Press states and hit areas.
68: - Vercel web-design-guidelines - Focus management.
```

## File: docs/decisions/Enforcement Layer Overlap.md

```markdown
1: # Enforcement Layer Overlap
2:
3: Comparing enforcement approaches across Impeccable, Vercel, and Taste Skill.
4:
5: ---
6:
7: # Overlap Map
8:
9: | Category | Taste Skill | Impeccable | Vercel |
10: | --------------- | ----------------------- | ----------------- | ----------------- |
11: | Anti-slop tells | Section 14 | 45-rule detector | Audit findings |
12: | Typography | Balance/pretty wrapping | Type scale rules | Line length rules |
13: | Color | One accent, one palette | Color violations | Contrast rules |
14: | Layout | 4+ layout families | Layout violations | Responsive rules |
15: | Interactions | Hit areas, press states | Interaction rules | Touch targets |
16: | Accessibility | Minimal | Minimal | Comprehensive |
17: | Performance | Minimal | Minimal | Comprehensive |
18:
19: ---
20:
21: # Resolution
22:
23: When rules overlap:
24:
25: 1. Project rules in `docs/rules/` take precedence.
26: 2. Accessibility: Vercel guidelines are most comprehensive.
27: 3. Aesthetic direction: Taste Skill is most comprehensive.
28: 4. Anti-pattern detection: Impeccable is most comprehensive.
29: 5. Micro-interactions: MIFB is most comprehensive.
30:
31: ---
32:
33: # Conflict Resolution
34:
35: When skills conflict:
36:
37: 1. Document the conflict.
38: 2. Choose the rule that best fits the project.
39: 3. Record the decision in `docs/decisions/`.
40: 4. Apply consistently.
41:
42: ---
43:
44: # Sources
45:
46: - Gogh - Enforcement layer overlap analysis.
47: - Taste Skill v2, Impeccable, Vercel web-design-guidelines.
```

## File: docs/decisions/Font Ban Conflicts.md

```markdown
1: # Font Ban Conflicts
2:
3: Resolving conflicts between font-related rules across design skills.
4:
5: ---
6:
7: # The Conflict
8:
9: Different skills have different opinions about font usage:
10:
11: - Taste Skill: Bans Inter for everything without justification.
12: - Impeccable: Flags Inter as an anti-slop tell.
13: - Anthropic: Recommends committing to a type direction.
14: - Vercel: Focuses on typography rules (balance, pretty, line length).
15:
16: ---
17:
18: # Resolution
19:
20: - Inter is not banned outright, but using it for everything without justification is flagged.
21: - Every project should commit to a type direction before building.
22: - Use the project's chosen font consistently.
23: - Apply typography rules (balance, pretty, line length) regardless of font choice.
24:
25: ---
26:
27: # Application
28:
29: - Choose a font that fits the project's brand and audience.
30: - Document the choice in `DESIGN.md` or equivalent.
31: - Apply typography rules from all skills.
32: - Do not switch fonts mid-project without explicit decision.
33:
34: ---
35:
36: # Sources
37:
38: - Taste Skill v2 - Inter ban rule.
39: - Impeccable - Named anti-slop tells.
40: - Anthropic frontend-design - Typography direction.
```

## File: docs/decisions/Motion Doctrine Conflicts.md

```markdown
1: # Motion Doctrine Conflicts
2:
3: Resolving conflicts between animation and motion rules.
4:
5: ---
6:
7: # The Conflict
8:
9: Different skills have different motion philosophies:
10:
11: - Taste Skill: Motion Intensity dial (1-10).
12: - MIFB: Specific animation values (duration, stagger, spring).
13: - Impeccable: Minimal motion rules.
14: - Vercel: Comprehensive animation rules (reduced motion, duration limits).
15:
16: ---
17:
18: # Resolution
19:
20: - The Motion Intensity dial sets the overall animation level.
21: - MIFB provides the specific values when animations are used.
22: - Vercel rules for accessibility (reduced motion) are non-negotiable.
23: - Impeccable flags excessive or broken animations.
24:
25: ---
26:
27: # Application
28:
29: 1. Set the Motion Intensity dial before building.
30: 2. Apply MIFB animation values for micro-interactions.
31: 3. Always honor `prefers-reduced-motion`.
32: 4. Keep animations under 300ms for micro-interactions.
33: 5. Use `transform` and `opacity` for GPU-accelerated animations.
34:
35: ---
36:
37: # Sources
38:
39: - Taste Skill v2 - Motion Intensity dial.
40: - MIFB - Animation values.
41: - Vercel web-design-guidelines - Animation rules.
```

## File: docs/decisions/Prompt Layer vs Toolchain Layer.md

```markdown
1: # Prompt Layer vs Toolchain Layer
2:
3: When to use prompt-based guidance vs persistent toolchain enforcement.
4:
5: ---
6:
7: # Prompt Layer
8:
9: Prompt-based guidance is conversational:
10:
11: - Three dials (set in conversation).
12: - Aesthetic direction (committed verbally).
13: - Hero thesis (defined in conversation).
14: - Design rules (read from documentation).
15:
16: ## When to Use
17:
18: - Setting aesthetic direction.
19: - Defining project-specific rules.
20: - Creative decisions.
21: - One-time setup.
22:
23: ---
24:
25: # Toolchain Layer
26:
27: Toolchain enforcement is persistent:
28:
29: - Impeccable detector (45 rules).
30: - ESLint rules (automated).
31: - TypeScript checks (automated).
32: - Pre-commit hooks (automated).
33:
34: ## When to Use
35:
36: - Code quality enforcement.
37: - Anti-pattern detection.
38: - CI/CD checks.
39: - Ongoing validation.
40:
41: ---
42:
43: # The Balance
44:
45: - Use prompts for direction and creativity.
46: - Use toolchain for enforcement and consistency.
47: - Prompts set the rules; toolchain enforces them.
48: - Neither is sufficient alone.
49:
50: ---
51:
52: # Application
53:
54: 1. Use prompts to set the three dials and aesthetic direction.
55: 2. Use toolchain to enforce anti-slop rules and code quality.
56: 3. Document decisions in `docs/decisions/`.
57: 4. Update toolchain rules when project rules change.
58:
59: ---
60:
61: # Sources
62:
63: - Gogh - Prompt layer vs toolchain layer analysis.
64: - Taste Skill v2, Impeccable, Vercel web-design-guidelines.
```

## File: docs/deliverables/Design Skills Cheat Sheet.md

```markdown
1: # Design Skills Cheat Sheet
2:
3: Quick reference for daily work with design skills.
4:
5: ---
6:
7: # Three Dials
8:
9: | Dial | Default | Scale |
10: | ---------------- | ------- | ----- |
11: | Design Variance | 8 | 1-10 |
12: | Motion Intensity | 6 | 1-10 |
13: | Visual Density | 4 | 1-10 |
14:
15: ---
16:
17: # Anti-Slop Quick Check
18:
19: - No Inter for everything.
20: - No purple-to-blue gradients.
21: - No cards in cards.
22: - No uniform spacing.
23: - No em-dashes in text.
24: - No boilerplate in production.
25:
26: ---
27:
28: # Typography Quick Rules
29:
30: - Headlines: `text-wrap: balance`.
31: - Body: `text-wrap: pretty`, `max-w-[65ch]`.
32: - Numbers: `font-variant-numeric: tabular-nums`.
33: - Smoothing: `-webkit-font-smoothing: antialiased`.
34:
35: ---
36:
37: # Interaction Quick Rules
38:
39: - Hit areas: 40x40px minimum.
40: - Press: `scale(0.96)`.
41: - Shadows: three layers.
42: - Animation: ~100ms stagger, ~800ms enter.
43:
44: ---
45:
46: # Color Quick Rules
47:
48: - One accent per page.
49: - One radius scale per page.
50: - One theme per page.
51: - Tokens from globals.css.
52:
53: ---
54:
55: # Hero Quick Rules
56:
57: - Headline: 2 lines max.
58: - Subtext: 20 words max.
59: - CTA: above fold.
60: - Padding: `pt-24` max.
61: - Elements: 4 max.
62:
63: ---
64:
65: # Build Quick Flow
66:
67: 1. Set three dials.
68: 2. Pick palette.
69: 3. Define hero thesis.
70: 4. Build with direction.
71: 5. Run pre-flight.
72: 6. Revise if needed.
73:
74: ---
75:
76: # Audit Quick Commands
77:
78: `bash
79: pnpm run typecheck    # TypeScript
80: pnpm run lint         # ESLint
81: pnpm run build        # Build
82: pnpm run test         # Tests
83: pnpm run knip         # Dead code
84: `
85:
86: ---
87:
88: # Sources
89:
90: - Taste Skill v2 (Leon Lin).
91: - Impeccable (Paul Bakaus).
92: - Make Interfaces Feel Better (Jakub Krehel).
93: - Vercel web-design-guidelines.
94: - Anthropic frontend-design.
```

## File: docs/deliverables/Unified Pre-Flight Mega Checklist.md

```markdown
1: # Unified Pre-Flight Mega Checklist
2:
3: Combined checklist from all design skills. Run before every deliverable.
4:
5: ---
6:
7: # Architecture
8:
9: - [ ] Follows layered architecture (UI -> Actions -> Services -> Repositories -> DB).
10: - [ ] Business logic not in UI components.
11: - [ ] Database access not in UI components.
12: - [ ] Zod validation on all external input.
13: - [ ] No `any` types.
14: - [ ] Server Components by default.
15:
16: ---
17:
18: # TypeScript
19:
20: - [ ] `pnpm run typecheck` passes.
21: - [ ] No `any` types.
22: - [ ] Inferred types preferred.
23: - [ ] Reusable types exported.
24: - [ ] Types close to the feature.
25:
26: ---
27:
28: # ESLint
29:
30: - [ ] `pnpm run lint` passes.
31: - [ ] No disabled rules without justification.
32: - [ ] No warnings.
33:
34: ---
35:
36: # Build
37:
38: - [ ] `pnpm run build` succeeds.
39: - [ ] No build errors.
40: - [ ] No build warnings.
41:
42: ---
43:
44: # Tests
45:
46: - [ ] `pnpm run test` passes.
47: - [ ] Critical business logic tested.
48: - [ ] Component tests for interactive UI.
49:
50: ---
51:
52: # Dead Code
53:
54: - [ ] `pnpm run knip` passes.
55: - [ ] No unused files.
56: - [ ] No unused exports.
57: - [ ] No unused dependencies.
58:
59: ---
60:
61: # Design: Color
62:
63: - [ ] One accent color per page.
64: - [ ] No purple-to-blue gradients.
65: - [ ] No banned palettes.
66: - [ ] Design tokens from globals.css.
67: - [ ] No hardcoded colors.
68:
69: ---
70:
71: # Design: Typography
72:
73: - [ ] `text-wrap: balance` on headlines.
74: - [ ] `text-wrap: pretty` on body text.
75: - [ ] Body: `max-w-[65ch]`.
76: - [ ] Font smoothing enabled.
77: - [ ] Tabular nums for numbers.
78: - [ ] No em-dashes or en-dashes.
79:
80: ---
81:
82: # Design: Hero
83:
84: - [ ] Headline: max 2 lines.
85: - [ ] Subtext: max 20 words.
86: - [ ] CTA above fold.
87: - [ ] Top padding: max `pt-24`.
88: - [ ] Max 4 text elements.
89:
90: ---
91:
92: # Design: Layout
93:
94: - [ ] 4+ layout families in 8-section pages.
95: - [ ] No cards in cards.
96: - [ ] Grid broken intentionally.
97: - [ ] Spacing deliberate.
98:
99: ---
100:
101: # Design: Interactions
102:
103: - [ ] 40x40px hit areas.
104: - [ ] `scale(0.96)` press feedback.
105: - [ ] Three-layer shadows.
106: - [ ] Shadows over borders.
107: - [ ] `prefers-reduced-motion` honored.
108: - [ ] Icon animations with stagger.
109:
110: ---
111:
112: # Accessibility
113:
114: - [ ] Focus rings visible.
115: - [ ] ARIA labels on icon buttons.
116: - [ ] Semantic HTML.
117: - [ ] WCAG AA contrast.
118: - [ ] Keyboard navigation works.
119:
120: ---
121:
122: # Performance
123:
124: - [ ] Server Components used.
125: - [ ] Lazy loading for below-fold.
126: - [ ] Minimal client JS.
127: - [ ] Images optimized with next/image.
128: - [ ] Bundle size acceptable.
129:
130: ---
131:
132: # Documentation
133:
134: - [ ] Relevant docs updated.
135: - [ ] Architecture decisions documented.
136: - [ ] Component inventory updated.
137:
138: ---
139:
140: # Anti-Slop
141:
142: - [ ] No Inter for everything.
143: - [ ] No purple gradients.
144: - [ ] No cards in cards.
145: - [ ] No uniform spacing.
146: - [ ] No generic AI layouts.
147: - [ ] No boilerplate left in production.
```

## File: docs/flows/Audit Pipeline Flow.md

```markdown
1: # Audit Pipeline Flow
2:
3: Workflow for running quality audits on the project.
4:
5: ---
6:
7: # Pipeline Steps
8:
9: ## 1. TypeScript Check
10:
11: `bash
12: pnpm run typecheck
13: `
14:
15: Verify: no errors, no warnings.
16:
17: ## 2. ESLint Check
18:
19: `bash
20: pnpm run lint
21: `
22:
23: Verify: no errors, no warnings.
24:
25: ## 3. Build Check
26:
27: `bash
28: pnpm run build
29: `
30:
31: Verify: successful production build.
32:
33: ## 4. Test Check
34:
35: `bash
36: pnpm run test
37: `
38:
39: Verify: all tests pass.
40:
41: ## 5. Dead Code Check
42:
43: `bash
44: pnpm run knip
45: `
46:
47: Verify: no unused files, exports, or dependencies.
48:
49: ## 6. Design Audit
50:
51: - Run Section 14 pre-flight.
52: - Check against anti-slop patterns.
53: - Verify typography rules.
54: - Verify color rules.
55:
56: ## 7. Accessibility Audit
57:
58: - Check focus management.
59: - Check ARIA attributes.
60: - Check color contrast.
61: - Check keyboard navigation.
62:
63: ## 8. Performance Audit
64:
65: - Check bundle size.
66: - Check Server Component usage.
67: - Check lazy loading.
68: - Check image optimization.
69:
70: ---
71:
72: # Audit Results
73:
74: Document findings in the relevant documentation:
75:
76: - Architecture issues: `docs/rules/Architecture and Stack.md`.
77: - Design issues: `docs/rules/AI Tells (Forbidden Patterns).md`.
78: - Accessibility issues: `docs/rules/Vercel Interface Rule Categories.md`.
79:
80: ---
81:
82: # Documentation Rules
83:
84: Every significant change should update the relevant documentation.
85:
86: Architecture decisions should be documented before implementation whenever possible.
87:
88: Documentation should always reflect the current state of the project.
```

## File: docs/flows/Build Greenfield (Prompt 1).md

```markdown
1: # Build Greenfield (Prompt 1)
2:
3: Workflow for building new components and features from scratch.
4:
5: ---
6:
7: # Steps
8:
9: ## 1. Set the Three Dials
10:
11: Before writing any code, commit to:
12:
13: - Design Variance (1-10, default 8).
14: - Motion Intensity (1-10, default 6).
15: - Visual Density (1-10, default 4).
16:
17: ## 2. Define the Direction
18:
19: - Pick a 4-6 value named hex palette.
20: - Define the hero thesis (one sentence).
21: - Identify the primary CTA.
22: - Choose one justified aesthetic risk.
23:
24: ## 3. Read Existing Patterns
25:
26: - Check `components/ui/` for existing primitives.
27: - Check `docs/rules/` for applicable rules.
28: - Check `docs/skills/` for design skill references.
29:
30: ## 4. Build the Component
31:
32: - Start with Server Components.
33: - Use shadcn/ui primitives where possible.
34: - Apply Tailwind utilities consistently.
35: - Use `cn()` for conditional classes.
36: - Follow the layered architecture.
37:
38: ## 5. Apply Design Rules
39:
40: - Check against `docs/rules/AI Tells (Forbidden Patterns).md`.
41: - Apply micro-interaction rules from `docs/skills/Make Interfaces Feel Better.md`.
42: - Ensure typography follows `docs/rules/Anthropic Frontend Design Rules.md`.
43:
44: ## 6. Run Pre-Flight
45:
46: - Complete the Section 14 checklist.
47: - Verify all checks pass.
48: - If any check fails, revise and re-check.
49:
50: ## 7. Document
51:
52: - Update relevant documentation.
53: - Add to component inventory if new.
54: - Document any design decisions.
55:
56: ---
57:
58: # Architecture Flow
59:
60: `61: Page (Server Component)
62: ↓
63: Layout Component
64: ↓
65: Feature Component
66: ↓
67: Shared Component
68: ↓
69: UI Primitive (shadcn/ui)
70:`
71:
72: ---
73:
74: # Documentation Rules
75:
76: Every significant change should update the relevant documentation.
77:
78: Architecture decisions should be documented before implementation whenever possible.
79:
80: Documentation should always reflect the current state of the project.
```

## File: docs/flows/Full Stack Build Flow.md

```markdown
1: # Full Stack Build Flow
2:
3: Workflow for building full-stack features with React 19, Server Actions, and Prisma.
4:
5: ---
6:
7: # Steps
8:
9: ## 1. Define the Feature
10:
11: - What does the user need?
12: - What data is required?
13: - What interactions are needed?
14:
15: ## 2. Design the Data Model
16:
17: - Add Prisma schema changes.
18: - Run `pnpm prisma migrate dev`.
19: - Update `lib/db.ts` if needed.
20:
21: ## 3. Create the Repository
22:
23: - File: `lib/repositories/[feature].ts`.
24: - CRUD operations only.
25: - No business logic.
26: - Use Prisma Client.
27:
28: ## 4. Create the Service
29:
30: - File: `lib/services/[feature].ts`.
31: - Business rules and workflows.
32: - Coordinate between repositories.
33: - Validate with Zod.
34:
35: ## 5. Create the Server Action
36:
37: - File: `app/[route]/actions.ts`.
38: - Input validation with Zod.
39: - Authentication check.
40: - Call service layer.
41: - Return typed response.
42:
43: ## 6. Create the UI
44:
45: - Server Component by default.
46: - Client Component only when required.
47: - Use shadcn/ui primitives.
48: - Apply design rules.
49:
50: ## 7. Wire It Together
51:
52: `53: UI Component
54: ↓
55: Server Action
56: ↓
57: Service
58: ↓
59: Repository
60: ↓
61: Prisma
62: ↓
63: PostgreSQL (Neon)
64:`
65:
66: ## 8. Test
67:
68: - Unit tests for service logic.
69: - Integration tests for actions.
70: - Component tests for UI.
71:
72: ## 9. Document
73:
74: - Update API documentation.
75: - Update component inventory.
76: - Document design decisions.
77:
78: ---
79:
80: # Documentation Rules
81:
82: Every significant change should update the relevant documentation.
83:
84: Architecture decisions should be documented before implementation whenever possible.
85:
86: Documentation should always reflect the current state of the project.
```

## File: docs/flows/Redesign First-Audit (Prompt 2).md

```markdown
1: # Redesign First-Audit (Prompt 2)
2:
3: Workflow for redesigning existing interfaces after auditing them.
4:
5: ---
6:
7: # Steps
8:
9: ## 1. Audit the Existing Interface
10:
11: Before changing anything, evaluate:
12:
13: - Run Section 14 pre-flight on the existing page.
14: - Identify all failed checks.
15: - Document what works and what does not.
16: - Check against `docs/rules/AI Tells (Forbidden Patterns).md`.
17:
18: ## 2. Classify the Redesign
19:
20: Choose one mode:
21:
22: ### Preserve Mode
23:
24: - Keep the existing structure.
25: - Fix specific violations.
26: - Improve micro-interactions.
27: - Update typography and spacing.
28:
29: ### Overhaul Mode
30:
31: - Redesign from scratch.
32: - Keep brand identity and URLs.
33: - Set new three dials.
34: - Apply new design direction.
35:
36: ## 3. Never Change Silently
37:
38: - Document every change.
39: - Explain why each change was made.
40: - Preserve existing URLs and routes.
41: - Preserve brand identity unless explicitly told to change.
42:
43: ## 4. Set the Three Dials
44:
45: For the new direction:
46:
47: - Design Variance.
48: - Motion Intensity.
49: - Visual Density.
50:
51: ## 5. Build the Redesign
52:
53: - Follow the Greenfield workflow for new elements.
54: - Respect preserved elements.
55: - Apply all design rules.
56:
57: ## 6. Run Pre-Flight
58:
59: - Complete Section 14 checklist.
60: - Verify all checks pass.
61: - If any check fails, revise and re-check.
62:
63: ## 7. Document Changes
64:
65: - Update all affected documentation.
66: - Record the redesign decision.
67: - Update the component inventory.
68:
69: ---
70:
71: # Documentation Rules
72:
73: Every significant change should update the relevant documentation.
74:
75: Architecture decisions should be documented before implementation whenever possible.
76:
77: Documentation should always reflect the current state of the project.
```

## File: docs/meta/CONVENTIONS.md

```markdown
1: # Conventions
2:
3: Coding and naming conventions followed throughout the project.
4:
5: ---
6:
7: # File Naming
8:
9: Components: `PascalCase.tsx`
10:
11: Hooks: `useSomething.ts`
12:
13: Utilities: `camelCase.ts`
14:
15: Constants: `UPPER_SNAKE_CASE.ts`
16:
17: Types: `types.ts`
18:
19: Actions: `action.ts` or `actions.ts`
20:
21: Services: `service.ts` or `services.ts`
22:
23: Repositories: `repository.ts` or `repositories.ts`
24:
25: ---
26:
27: # Component Naming
28:
29: - PascalCase for component files and exports.
30: - One component per file.
31: - Named exports preferred over default exports.
32: - Co-locate related types in the same file or `types.ts`.
33:
34: ---
35:
36: # Import Conventions
37:
38: Always use path aliases:
39:
40: `ts
 41: import { Button } from "@/components/ui/button";
 42: import { cn } from "@/lib/utils";
 43: import { prisma } from "@/lib/db";
 44: `
45:
46: Never use relative paths that traverse multiple directories:
47:
48: `ts
 49: // Avoid
 50: import Button from "../../../../components/ui/button";
 51: `
52:
53: ---
54:
55: # Tailwind Conventions
56:
57: - Use the `cn()` utility for conditional classes.
58: - Never hardcode color values. Use design tokens.
59: - Avoid arbitrary values unless justified.
60: - Prefer Tailwind utilities over custom CSS.
61: - Use `@apply` sparingly and only for repeated patterns.
62:
63: ---
64:
65: # TypeScript Conventions
66:
67: - Never use `any`.
68: - Prefer inferred types.
69: - Export reusable types.
70: - Keep types close to the feature.
71: - Use Zod for runtime validation.
72:
73: ---
74:
75: # Server vs Client Components
76:
77: Server Components (default):
78:
79: - Data fetching.
80: - Database access.
81: - Static content.
82: - SEO-critical pages.
83:
84: Client Components (when required):
85:
86: - State management.
87: - Browser APIs.
88: - Event handlers.
89: - Interactive UI.
90:
91: ---
92:
93: # Documentation Tags
94:
95: Use these tags when updating documentation:
96:
97: - `feat` - New feature documentation.
98: - `fix` - Bug fix documentation.
99: - `docs` - Documentation-only changes.
100: - `refactor` - Architecture or convention changes.
101: - `perf` - Performance-related documentation.
102: - `test` - Testing documentation.
```

## File: docs/meta/Tag Taxonomy.md

```markdown
1: # Tag Taxonomy
2:
3: Documentation tag system for categorizing and finding documentation.
4:
5: ---
6:
7: # Priority Tags
8:
9: - `P1` - Priority 1: Rules and Architecture (highest importance).
10: - `P2` - Priority 2: Workflows and Quality Audits (very high importance).
11: - `P3` - Priority 3: Concepts and Micro-details (medium importance).
12: - `P4` - Priority 4: References and Research (low/reference importance).
13:
14: ---
15:
16: # Category Tags
17:
18: - `architecture` - Architecture decisions and patterns.
19: - `design` - UI/UX design rules and guidelines.
20: - `quality` - Code quality and testing standards.
21: - `workflow` - Development workflows and processes.
22: - `security` - Security rules and practices.
23: - `performance` - Performance optimization rules.
24: - `accessibility` - Accessibility standards and guidelines.
25:
26: ---
27:
28: # Technology Tags
29:
30: - `nextjs` - Next.js specific rules.
31: - `react` - React specific rules.
32: - `typescript` - TypeScript specific rules.
33: - `tailwind` - Tailwind CSS specific rules.
34: - `prisma` - Prisma ORM specific rules.
35: - `shadcn` - shadcn/ui specific rules.
36: - `zod` - Zod validation specific rules.
37:
38: ---
39:
40: # Skill Tags
41:
42: - `taste-skill` - Taste Skill framework rules.
43: - `impeccable` - Impeccable toolchain rules.
44: - `mifb` - Make Interfaces Feel Better rules.
45: - `vercel-guidelines` - Vercel web design guidelines.
46: - `anthropic` - Anthropic frontend design rules.
47:
48: ---
49:
50: # Status Tags
51:
52: - `active` - Currently in use and enforced.
53: - `draft` - Under development, not yet enforced.
54: - `deprecated` - No longer recommended.
55: - `reference` - For reference only, not enforced.
```

## File: docs/reference/Entities.md

```markdown
1: # Entities
2:
3: Documentation of foundational tools and frameworks used in this project.
4:
5: ---
6:
7: # Next.js
8:
9: - Version: 16.2.10
10: - Role: React framework for server rendering, routing, and API.
11: - Repository: vercel/next.js.
12: - License: MIT.
13:
14: ---
15:
16: # React
17:
18: - Version: 19.2.4
19: - Role: UI library.
20: - Repository: facebook/react.
21: - License: MIT.
22:
23: ---
24:
25: # Tailwind CSS
26:
27: - Version: v4
28: - Role: Utility-first CSS framework.
29: - Repository: tailwindlabs/tailwindcss.
30: - License: MIT.
31:
32: ---
33:
34: # shadcn/ui
35:
36: - Style: base-nova
37: - Role: Reusable UI components.
38: - Repository: shadcn-ui/ui.
39: - License: MIT.
40:
41: ---
42:
43: # Prisma
44:
45: - Version: 7.8.0
46: - Role: TypeScript ORM for PostgreSQL.
47: - Repository: prisma/prisma.
48: - License: Apache-2.0.
49:
50: ---
51:
52: # Zod
53:
54: - Version: 4.4.3
55: - Role: Runtime validation.
56: - Repository: colinhacks/zod.
57: - License: MIT.
58:
59: ---
60:
61: # React Hook Form
62:
63: - Version: 7.81.0
64: - Role: Form management.
65: - Repository: react-hook-form/react-hook-form.
66: - License: MIT.
67:
68: ---
69:
70: # Jest
71:
72: - Version: 30.4.2
73: - Role: Unit testing.
74: - Repository: jestjs/jest.
75: - License: MIT.
76:
77: ---
78:
79: # ESLint
80:
81: - Version: 9.x
82: - Role: Static analysis.
83: - Repository: eslint/eslint.
84: - License: MIT.
85:
86: ---
87:
88: # Prettier
89:
90: - Version: 3.9.x
91: - Role: Code formatting.
92: - Repository: prettier/prettier.
93: - License: MIT.
```

## File: docs/reference/Gaps.md

```markdown
1: # Gaps
2:
3: Identified gaps and areas for future improvement.
4:
5: ---
6:
7: # Documentation Gaps
8:
9: - ADR/ folder is empty. First architecture decision record needed.
10: - Features/ folder is empty. Feature documentation needed as features are built.
11: - No testing documentation beyond basic setup.
12:
13: ---
14:
15: # Toolchain Gaps
16:
17: - Impeccable not installed yet.
18: - Taste Skill not installed yet.
19: - No automated design audit in CI/CD.
20: - No visual regression testing.
21:
22: ---
23:
24: # Knowledge Gaps
25:
26: - Token cost measurement not implemented.
27: - Performance baseline not established.
28: - Accessibility audit not run.
29:
30: ---
31:
32: # Process Gaps
33:
34: - No formal release process documented.
35: - No deployment pipeline documented.
36: - No monitoring setup documented.
37:
38: ---
39:
40: # Future Work
41:
42: - Install and configure Impeccable.
43: - Install and configure Taste Skill.
44: - Set up visual regression testing.
45: - Establish performance baseline.
46: - Run full accessibility audit.
47: - Document deployment pipeline.
```

## File: docs/reference/Questions.md

```markdown
1: # Questions
2:
3: Frequently asked questions about the design skill system.
4:
5: ---
6:
7: # General
8:
9: ## What is the design skill system?
10:
11: A collection of rules, workflows, and tools for building high-quality, intentional UI with AI coding agents.
12:
13: ## Why not just use one skill?
14:
15: Each skill covers different aspects:
16:
17: - Taste Skill: Aesthetic direction.
18: - Impeccable: Anti-pattern detection.
19: - MIFB: Micro-interactions.
20: - Vercel: Accessibility and performance.
21: - Anthropic: Taste prompting baseline.
22:
23: Using all six provides comprehensive coverage.
24:
25: ## How do I get started?
26:
27: Read `docs/meta/Start Here.md` and `docs/deliverables/Quickstart.md`.
28:
29: ---
30:
31: # Technical
32:
33: ## What are the three dials?
34:
35: Design Variance, Motion Intensity, and Visual Density. They set the aesthetic direction before building.
36:
37: ## What is Section 14?
38:
39: The mandatory pre-flight checklist from Taste Skill. Every box must pass before shipping.
40:
41: ## What is the em-dash ban?
42:
43: A rule from Taste Skill that bans em-dashes and en-dashes in visible text. Use hyphens instead.
44:
45: ---
46:
47: # Process
48:
49: ## When do I run the pre-flight?
50:
51: Before every deliverable. It is mandatory.
52:
53: ## What if skills conflict?
54:
55: Follow the resolution order in `docs/decisions/Enforcement Layer Overlap.md`.
56:
57: ## How do I document decisions?
58:
59: Create a new file in `docs/decisions/` following the existing format.
```

## File: docs/reference/Source Ledger.md

```markdown
1: # Source Ledger
2:
3: Evidence-gated source tracking for design rules and claims.
4:
5: ---
6:
7: # Schema
8:
9: Every source entry includes:
10:
11: - `id`: Unique identifier.
12: - `title`: Source title.
13: - `url`: Source URL.
14: - `source_type`: primary, official, supporting, market, practitioner.
15: - `retrieved`: Date retrieved.
16: - `refresh_due`: Date for refresh check.
17: - `confidence`: high, medium, low.
18: - `claims`: Array of verified claims.
19:
20: ---
21:
22: # Source Types
23:
24: - `official` - Vendor documentation, official sites.
25: - `primary` - Repository source, canonical skill files.
26: - `supporting` - Articles, reviews, blog posts.
27: - `market` - Market snapshots, comparison articles.
28: - `practitioner` - Independent practitioner work.
29:
30: ---
31:
32: # Current Sources
33:
34: ## Taste Skill v2
35:
36: - Source: Leonxlnx/taste-skill (MIT).
37: - URL: https://github.com/Leonxlnx/taste-skill.
38: - Claims: Three dials, Section 14, anti-slop rules, em-dash ban.
39: - Confidence: high.
40:
41: ## Impeccable
42:
43: - Source: pbakaus/impeccable (Apache-2.0).
44: - URL: https://github.com/pbakaus/impeccable.
45: - Claims: 45-rule detector, 23 commands, named anti-slop tells.
46: - Confidence: high.
47:
48: ## Make Interfaces Feel Better
49:
50: - Source: jakubkrehel/make-interfaces-feel-better.
51: - URL: https://github.com/jakubkrehel/make-interfaces-feel-better.
52: - Claims: 16 rule categories, concentric radius, press states, shadow layers.
53: - Confidence: high.
54:
55: ## Vercel Web Design Guidelines
56:
57: - Source: vercel-labs/web-interface-guidelines (MIT).
58: - URL: https://github.com/vercel-labs/web-interface-guidelines.
59: - Claims: 90-110 rules across 16+ categories.
60: - Confidence: high.
61:
62: ## Anthropic Frontend Design
63:
64: - Source: anthropics/skills (Apache-2.0).
65: - URL: https://github.com/anthropics/skills.
66: - Claims: Taste prompting, aesthetic direction, two-pass build-critique.
67: - Confidence: high.
68:
69: ## UI/UX Pro Max
70:
71: - Source: nextlevelbuilder/ui-ux-pro-max-skill (MIT).
72: - URL: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.
73: - Claims: 67 styles, 161 palettes, 57 font pairs, 99 UX guidelines.
74: - Confidence: high.
75:
76: ---
77:
78: # Refresh Cadence
79:
80: - On-changelog for skill repos.
81: - Monthly for rule captures.
82: - Quarterly for ecosystem coverage.
83:
84: ---
85:
86: # Sources
87:
88: - Gogh source-ledger.json (brainstein/source-ledger@2).
```

## File: docs/rules/AI Tells (Forbidden Patterns).md

```markdown
1: # AI Tells (Forbidden Patterns)
2:
3: This document lists UI patterns that signal generic AI-generated output.
4:
5: These patterns are banned. If you see them, flag and remove immediately.
6:
7: ---
8:
9: # Color Tells
10:
11: - Purple-to-blue gradient backgrounds as a default.
12: - Near-black with acid-green or vermilion accents.
13: - Warm cream (#F4F1EA) with serif display and terracotta accent.
14: - Default Tailwind color palette used without customization.
15: - Multiple accent colors on a single page.
16: - Random gradient overlays without design justification.
17:
18: ---
19:
20: # Layout Tells
21:
22: - Cards nested inside cards.
23: - Uniform equal spacing everywhere.
24: - Perfectly centered hero with no asymmetric element.
25: - Every section using the same layout family.
26: - Bento grids with mismatched cell counts.
27: - Generic "Welcome to Next.js" boilerplate left in production.
28: - Sections that all look like stacked cards.
29:
30: ---
31:
32: # Typography Tells
33:
34: - Inter used for every project without justification.
35: - Em-dash (U+2014) or en-dash (U+2013) in visible text.
36: - No `text-wrap: balance` on headlines.
37: - No `text-wrap: pretty` on body text.
38: - Body text exceeding 65ch line length.
39: - Inconsistent type scale across sections.
40:
41: ---
42:
43: # Interaction Tells
44:
45: - No animation or transition on any interactive element.
46: - No visible press states on buttons.
47: - Hit areas smaller than 40x40px.
48: - Borders used instead of shadows for visual separation.
49: - Single-layer box-shadow instead of three-layer composition.
50: - No `prefers-reduced-motion` support.
51:
52: ---
53:
54: # Component Tells
55:
56: - Huge monolithic components.
57: - Business logic mixed into UI components.
58: - Database queries inside components.
59: - Inline styles instead of Tailwind.
60: - Disabled ESLint or TypeScript rules.
61: - Unused imports or dead code.
62:
63: ---
64:
65: # Content Tells
66:
67: - Generic placeholder text left in production.
68: - "Lorem ipsum" or "Your content here."
69: - Overly verbose hero sections.
70: - CTAs hidden below the fold.
71: - Navigation with more than 7 items.
72:
73: ---
74:
75: # How to Use
76:
77: Before shipping any UI, scan against this list.
78:
79: If any tell is found:
80:
81: 1. Identify the root cause.
82: 2. Apply the fix from `docs/Design Rules.md`.
83: 3. Document the decision if it conflicts with an existing pattern.
84:
85: ---
86:
87: # Sources
88:
89: Adapted from:
90:
91: - Taste Skill v2 (Leon Lin) - Anti-slop ruleset.
92: - Impeccable (Paul Bakaus) - 45-rule detector, named anti-slop tells.
93: - Anthropic frontend-design - Distributional convergence research.
94: - Vercel web-design-guidelines - Audit layer findings.
```

## File: docs/rules/Anthropic Frontend Design Rules.md

```markdown
1: # Anthropic Frontend Design Rules
2:
3: Standards from Anthropic's frontend-design skill for building distinctive, high-quality web interfaces.
4:
5: ---
6:
7: # Core Principle
8:
9: The more aesthetic improvements map to implementable frontend code, the better the output.
10:
11: Design taste is articulable logic, not vibes.
12:
13: ---
14:
15: # Aesthetic Direction
16:
17: Before building, commit to a direction:
18:
19: - Pick a 4-6 value named hex palette.
20: - Choose one justified aesthetic risk.
21: - Define a hero thesis (one sentence that captures the page intent).
22: - Avoid default palettes: warm cream + serif + terracotta, near-black + acid-green, broadsheet hairline-rule layouts.
23:
24: ---
25:
26: # Process
27:
28: Two-pass build-critique:
29:
30: 1. Build the interface with committed direction.
31: 2. Critique against the design rules. Revise.
32:
33: Never ship on the first pass.
34:
35: ---
36:
37: # Typography
38:
39: - Use `text-wrap: balance` on headlines.
40: - Use `text-wrap: pretty` on body text.
41: - Line length: 45-90 characters (max-w-[65ch]).
42: - Enable font smoothing: `-webkit-font-smoothing: antialiased`.
43: - Use `font-variant-numeric: tabular-nums` for numeric data.
44:
45: ---
46:
47: # Restraint and Self-Critique
48:
49: - Every element must earn its place.
50: - If an element does not serve the hero thesis, remove it.
51: - Default to more whitespace than feels necessary.
52: - Add density deliberately, not by default.
53: - Use fewer borders. Prefer shadows, color contrast, and spacing.
54:
55: ---
56:
57: # Writing in Design
58:
59: - Headlines: max 2 lines.
60: - Subtext: max 20 words.
61: - CTA visible without scrolling.
62: - No em-dashes or en-dashes in visible text.
63: - Body text should feel conversational, not corporate.
64:
65: ---
66:
67: # Anti-Patterns
68:
69: - Inter for everything without justification.
70: - Purple-to-blue gradients as default.
71: - Cards nested in cards.
72: - Uniform equal spacing everywhere.
73: - Generic AI-generated layouts.
74:
75: ---
76:
77: # Sources
78:
79: - Anthropic frontend-design skill (Apache-2.0).
80: - Anthropic blog: "Improving frontend design through Skills" (2025-11-12).
81: - anthropics/skills repository.
```

## File: docs/rules/Dark Mode Protocol.md

```markdown
1: # Dark Mode Protocol
2:
3: Rules for implementing and maintaining dark mode across the project.
4:
5: ---
6:
7: # Implementation
8:
9: - Dark mode uses the `.dark` class on the root element.
10: - Toggle at the layout level, not per component.
11: - Persist user preference in localStorage.
12: - Respect `prefers-color-scheme` as the default.
13:
14: ---
15:
16: # Color Tokens
17:
18: - All colors defined as CSS custom properties in `globals.css`.
19: - Light and dark variants for each token.
20: - Use oklch color space for perceptually uniform colors.
21: - Never hardcode color values in components.
22:
23: ---
24:
25: # Background Rules
26:
27: - Never use pure black (#000) for backgrounds.
28: - Use dark grays (e.g., oklch(0.15 0.01 250)) for surfaces.
29: - Layer surfaces with subtle lightness differences.
30: - Use shadows (white at low opacity) for depth in dark mode.
31:
32: ---
33:
34: # Text Rules
35:
36: - Primary text: near-white, not pure white (#FFF).
37: - Secondary text: medium gray with sufficient contrast.
38: - Ensure WCAG AA contrast ratios in both modes.
39: - Never use color alone to convey meaning.
40:
41: ---
42:
43: # Border and Shadow Rules
44:
45: - Borders: use white at 8-12% opacity in dark mode.
46: - Shadows: compose from three layers (ambient, key, rim).
47: - Prefer shadows over borders for visual separation.
48: - Adjust shadow color for dark mode (use lighter shadows).
49:
50: ---
51:
52: # Component Rules
53:
54: - Every component must work in both themes.
55: - Test all interactive states (hover, focus, active) in both modes.
56: - Use `cn()` utility for conditional theme classes.
57: - Never use `dark:` prefix on every property. Use token-based theming.
58:
59: ---
60:
61: # Image Treatment
62:
63: - Image outlines: 1px at 10% opacity (white in dark mode, black in light mode).
64: - Avoid bright images on dark backgrounds without subtle containment.
65: - Use `next/image` with `dark:` variants when needed.
66:
67: ---
68:
69: # Documentation Rules
70:
71: Every significant change should update the relevant documentation.
72:
73: Architecture decisions should be documented before implementation whenever possible.
74:
75: Documentation should always reflect the current state of the project.
```

## File: docs/rules/Em-Dash Ban.md

```markdown
1: # Em-Dash Ban
2:
3: The em-dash (U+2014) and en-dash (U+2013) are banned anywhere in visible text.
4:
5: ---
6:
7: # Rules
8:
9: - Never use em-dash (U+2014) in visible text.
10: - Never use en-dash (U+2013) in visible text.
11: - Use the hyphen (-) for all dash-like purposes.
12: - Use the math minus sign only in mathematical expressions.
13:
14: ---
15:
16: # Why
17:
18: This rule comes from the Taste Skill framework (Leon Lin).
19:
20: LLMs default to em-dashes and en-dashes because they appear frequently in training data. Banning them forces more deliberate punctuation and breaks the generic AI writing pattern.
21:
22: ---
23:
24: # Examples
25:
26: Incorrect:
27:
28: `29: The feature supports authentication - including OAuth and magic links.
30:`
31:
32: Correct:
33:
34: `35: The feature supports authentication - including OAuth and magic links.
36:`
37:
38: Incorrect:
39:
40: `41: Our platform offers three tiers - Basic, Pro, and Enterprise.
42:`
43:
44: Correct:
45:
46: `47: Our platform offers three tiers - Basic, Pro, and Enterprise.
48:`
49:
50: ---
51:
52: # Enforcement
53:
54: - Check all visible text in components.
55: - Check markdown documentation (internal only).
56: - Do not check code comments or string literals that are not rendered.
57:
58: ---
59:
60: # Sources
61:
62: - Taste Skill v2 (Leon Lin) - Em-dash and en-dash ban.
```

## File: docs/rules/Hero Discipline.md

```markdown
1: # Hero Discipline
2:
3: Rules for building effective hero sections.
4:
5: ---
6:
7: # Constraints
8:
9: - Headline: max 2 lines.
10: - Subtext: max 20 words.
11: - CTA visible without scrolling.
12: - Top padding: max `pt-24`.
13: - Max 4 text elements in the hero.
14:
15: ---
16:
17: # Structure
18:
19: A hero section contains:
20:
21: 1. Headline (thesis of the page).
22: 2. Subtext (supporting the headline).
23: 3. CTA (primary action).
24: 4. Optional: secondary action or supporting visual.
25:
26: ---
27:
28: # Layout
29:
30: - Hero must be visible above the fold.
31: - Never hide the CTA below the fold.
32: - Use `text-wrap: balance` on the headline.
33: - Use `text-wrap: pretty` on subtext.
34: - Body text: `max-w-[65ch]`.
35:
36: ---
37:
38: # Anti-Patterns
39:
40: - Hero with more than 4 text elements.
41: - CTA pushed below the fold by excessive padding.
42: - Headline that spans more than 2 lines.
43: - Subtext that exceeds 20 words.
44: - Hero with no clear visual hierarchy.
45: - Generic "Welcome to [Framework]" boilerplate.
46:
47: ---
48:
49: # Design Variance
50:
51: - Hero should set the tone for the entire page.
52: - At least one asymmetric element in the hero.
53: - Break the grid intentionally.
54: - Use the three dials to calibrate hero intensity.
55:
56: ---
57:
58: # Sources
59:
60: - Taste Skill v2 (Leon Lin) - Hero constraints and Section 14 pre-flight.
```

## File: docs/rules/Taste Skill Color Rules.md

```markdown
1: # Taste Skill Color Rules
2:
3: Color system rules adapted from the Taste Skill framework.
4:
5: ---
6:
7: # One Accent Per Page
8:
9: - Every page has exactly one accent color.
10: - The accent color is used for CTAs, active states, and highlights.
11: - Never use multiple accent colors on a single page.
12:
13: ---
14:
15: # Color Palette
16:
17: - Define a 4-6 value named hex palette per project.
18: - Use oklch color space in `globals.css` for perceptually uniform colors.
19: - Never use default Tailwind colors without customization.
20: - Never use purple-to-blue gradients as a default.
21:
22: ---
23:
24: # Banned Palettes
25:
26: - Warm cream (#F4F1EA) with serif display and terracotta accent.
27: - Near-black with acid-green or vermilion accents.
28: - Purple-to-blue gradient backgrounds.
29: - Broad hairline-rule layouts with serif typography.
30:
31: ---
32:
33: # Radius Scale
34:
35: - One radius scale per page.
36: - Define in `globals.css` via CSS custom properties.
37: - Concentric radius formula: outer radius = inner radius + padding.
38: - Never mix radius scales within a page.
39:
40: ---
41:
42: # Theme Locks
43:
44: - One theme (light or dark) per page.
45: - Switch themes at the layout level, not per component.
46: - Test both themes before shipping.
47:
48: ---
49:
50: # Token Usage
51:
52: - Always use design tokens from `globals.css`.
53: - Never hardcode color values in Tailwind classes.
54: - Update tokens at the source, not in individual components.
55:
56: ---
57:
58: # Sources
59:
60: - Taste Skill v2 (Leon Lin) - Color/Shape/Page-Theme locks.
61: - W3C Design Tokens Community Group - First stable specification.
```

## File: docs/rules/Vercel Interface Rule Categories.md

```markdown
1: # Vercel Interface Rule Categories
2:
3: Performance and accessibility rules adapted from Vercel's web design guidelines.
4:
5: ---
6:
7: # Accessibility
8:
9: - Icon-only buttons need `aria-label`.
10: - Never use `outline-none` without a focus replacement.
11: - Never block paste on password or input fields.
12: - Honor `prefers-reduced-motion`.
13: - Use semantic HTML elements.
14: - Ensure color contrast meets WCAG AA.
15:
16: ---
17:
18: # Focus Management
19:
20: - Visible focus rings on all interactive elements.
21: - Focus should follow logical tab order.
22: - Skip links for keyboard navigation.
23: - Focus trapping in modals and dialogs.
24:
25: ---
26:
27: # Forms
28:
29: - Labels associated with inputs.
30: - Error messages linked to inputs via `aria-describedby`.
31: - Required fields indicated visually and programmatically.
32: - Inline validation on blur, not on every keystroke.
33: - Never clear form state on accidental navigation.
34:
35: ---
36:
37: # Animation
38:
39: - Always honor `prefers-reduced-motion`.
40: - Keep animations under 300ms for micro-interactions.
41: - Use `ease-out` for enter, `ease-in` for exit.
42: - Virtualize lists over 50 items.
43: - Avoid layout-triggering animations (use `transform` and `opacity`).
44:
45: ---
46:
47: # Typography
48:
49: - Use `text-wrap: balance` on headlines.
50: - Use `text-wrap: pretty` on body text.
51: - Line length: 45-90 characters.
52: - Consistent type scale across the application.
53:
54: ---
55:
56: # Content
57:
58: - Use `Intl.DateTimeFormat` for dates.
59: - Destructive actions need confirmation or undo.
60: - URL should reflect application state.
61: - Loading states for all async operations.
62:
63: ---
64:
65: # Images
66:
67: - Explicit `width` and `height` on all images.
68: - Use `next/image` for optimized delivery.
69: - Alt text on all meaningful images.
70: - Decorative images: `alt=""` and `role="presentation"`.
71:
72: ---
73:
74: # Performance
75:
76: - Server Components by default.
77: - Lazy load below-the-fold content.
78: - Minimize client-side JavaScript.
79: - Use streaming and Suspense boundaries.
80: - Prefetch critical navigation links.
81:
82: ---
83:
84: # Touch
85:
86: - Minimum 40x40px touch targets.
87: - Avoid hover-only interactions on touch devices.
88: - Use `@media (hover: hover)` for hover styles.
89: - Safe areas for mobile notches.
90:
91: ---
92:
93: # Dark Mode
94:
95: - Use CSS custom properties for theme switching.
96: - Test both light and dark modes.
97: - Avoid pure black (#000) for backgrounds. Use dark grays.
98: - Ensure sufficient contrast in both modes.
99:
100: ---
101:
102: # Sources
103:
104: - Vercel web-interface-guidelines (MIT).
105: - Vercel web-design-guidelines agent skill.
106: - vercel.com/design/guidelines.
```

## File: docs/skills/Impeccable Toolchain.md

```markdown
1: # Impeccable Toolchain
2:
3: Automated visual and engineering defect detection for AI-generated frontend code.
4:
5: ---
6:
7: # Overview
8:
9: - 23 commands organized by discipline.
10: - 45 deterministic anti-pattern rules.
11: - Runs without an LLM for detection.
12: - Live iteration mode for HMR-based design.
13:
14: ---
15:
16: # Installation
17:
18: `bash
19: npx impeccable install
20: `
21:
22: Then inside your AI coding tool:
23:
24: `25: /impeccable init
26:`
27:
28: This creates `PRODUCT.md` and optionally `DESIGN.md`.
29:
30: ---
31:
32: # Key Commands
33:
34: | Command | Purpose |
35: | ---------------------- | ------------------------------------------------ |
36: | `/impeccable init` | Initialize project with PRODUCT.md and DESIGN.md |
37: | `/impeccable detect` | Run 45-rule detector |
38: | `/impeccable bolder` | Respect existing design systems |
39: | `/impeccable critique` | Independent critique mode |
40:
41: ---
42:
43: # PRODUCT.md
44:
45: Defines:
46:
47: - Audience and user persona.
48: - Brand/product lane.
49: - Voice and tone.
50: - Anti-references (what NOT to build).
51:
52: ---
53:
54: # DESIGN.md
55:
56: Defines:
57:
58: - Color palette (named hex values).
59: - Typography scale.
60: - Component inventory.
61: - Aesthetic direction.
62:
63: ---
64:
65: # Named Anti-Slop Tells
66:
67: Impeccable flags these patterns:
68:
69: - Inter for everything without justification.
70: - Purple-to-blue gradients.
71: - Cards nested in cards.
72: - Decorative grid backgrounds.
73: - Two-axis gradient overlay patterns.
74:
75: ---
76:
77: # Detector Rules (45)
78:
79: The detector runs deterministically without an LLM:
80:
81: - Typography violations.
82: - Color violations.
83: - Layout violations.
84: - Interaction violations.
85: - Performance violations.
86: - Accessibility violations.
87:
88: ---
89:
90: # Sources
91:
92: - pbakaus/impeccable (Apache-2.0).
93: - impeccable.style.
94: - Latest: skill-v3.9.1, cli-v3.2.0 (2026-07-01).
```

## File: docs/skills/Make Interfaces Feel Better.md

```markdown
1: # Make Interfaces Feel Better
2:
3: Micro-interaction and visual polish skill by Jakub Krehel.
4:
5: ---
6:
7: # Overview
8:
9: 16 rule categories for improving interface feel through precise micro-interactions, shadows, typography, and animation values.
10:
11: ---
12:
13: # Key Rules
14:
15: ## Concentric Border Radius
16:
17: Outer radius = inner radius + padding.
18:
19: Example: card with 16px padding and 8px inner radius gets 24px outer radius.
20:
21: ## Optical Alignment
22:
23: Elements should appear visually centered, not mathematically centered.
24:
25: Adjust for optical weight (heavier elements shift slightly toward center).
26:
27: ## Shadows Over Borders
28:
29: Compose shadows from three layers:
30:
31: 1. Ambient (diffuse, large spread).
32: 2. Key (directional, medium spread).
33: 3. Rim (tight, small spread).
34:
35: Prefer shadows over borders for depth and separation.
36:
37: ## Press States
38:
39: Button press feedback: `transform: scale(0.96)`.
40:
41: Never go below `scale(0.95)`.
42:
43: ## Hit Areas
44:
45: Interactive elements: minimum 40x40px hit area.
46:
47: Extend with pseudo-element when the visible element is smaller.
48:
49: ## Font Smoothing
50:
51: Enable: `-webkit-font-smoothing: antialiased`.
52:
53: Use `font-variant-numeric: tabular-nums` for numeric data.
54:
55: ## Animation Values
56:
57: - Icon: `scale 0.25 -> 1`, `opacity 0 -> 1`, `blur 4px -> 0`.
58: - Stagger delay: ~100ms between items.
59: - Enter duration: ~800ms.
60: - Exit: subtler than enter.
61: - Spring settings: `duration 0.3`, `bounce 0`.
62:
63: ## Image Outlines
64:
65: - 1px at 10% opacity.
66: - Black in light mode, white in dark mode.
67:
68: ---
69:
70: # Supporting Files
71:
72: - `typography.md` - Typography rules.
73: - `surfaces.md` - Surface and shadow rules.
74: - `animations.md` - Animation value reference.
75: - `performance.md` - Performance constraints.
76:
77: ---
78:
79: # Sources
80:
81: - jakubkrehel/make-interfaces-feel-better (no license, all rights reserved).
82: - jakub.kr/writing/details-that-make-interfaces-feel-better.
```

## File: docs/skills/Taste Skill Project.md

```markdown
1: # Taste Skill Project
2:
3: Three-dial aesthetic framework for calibrating AI-generated frontend output.
4:
5: ---
6:
7: # Overview
8:
9: The Taste Skill provides a conversation-driven framework for setting aesthetic direction before building. It prevents generic AI output by committing to a direction early.
10:
11: ---
12:
13: # The Three Dials
14:
15: | Dial | Default | Scale | Description |
16: | ---------------- | ------- | ----- | ------------------------------------------------ |
17: | Design Variance | 8 | 1-10 | How much the layout breaks from generic patterns |
18: | Motion Intensity | 6 | 1-10 | How much animation and transition is present |
19: | Visual Density | 4 | 1-10 | How much information per viewport |
20:
21: Set these dials conversationally before touching layout.
22:
23: ---
24:
25: # Section 14 Pre-Flight Check
26:
27: Mandatory before completing any page:
28:
29: - [ ] Three dials set and committed.
30: - [ ] Hero follows constraints (2-line headline, 20-word subtext, CTA above fold).
31: - [ ] Navigation on single line at desktop (80px height cap).
32: - [ ] One accent color per page.
33: - [ ] One radius scale per page.
34: - [ ] One theme per page.
35: - [ ] At least 4 layout families in 8-section pages.
36: - [ ] No em-dashes or en-dashes in visible text.
37: - [ ] No cards nested inside cards.
38: - [ ] No purple-to-blue gradients.
39: - [ ] No Inter for everything without justification.
40: - [ ] Typography uses balance/pretty wrapping.
41:
42: Any failed box blocks completion.
43:
44: ---
45:
46: # Greenfield Workflow
47:
48: 1. Set the three dials.
49: 2. Pick a 4-6 value named hex palette.
50: 3. Define the hero thesis.
51: 4. Build with committed direction.
52: 5. Run Section 14 pre-flight.
53: 6. Revise if any check fails.
54:
55: ---
56:
57: # Redesign Workflow
58:
59: 1. Audit existing interface against Section 14.
60: 2. Identify what to preserve, what to overhaul.
61: 3. Set the three dials for the new direction.
62: 4. Build respecting preserved elements.
63: 5. Run Section 14 pre-flight.
64:
65: ---
66:
67: # Anti-Laziness Rules
68:
69: - Never output a generic layout as a starting point.
70: - Always commit to a direction before building.
71: - Always run the pre-flight check.
72: - Never skip the critique pass.
73:
74: ---
75:
76: # Sources
77:
78: - Leonxlnx/taste-skill (MIT).
79: - tasteskill.dev.
80: - v2 is experimental, iterating toward v2.0.0 stable.
```

## File: docs/skills/Vercel Web Design Guidelines.md

```markdown
1: # Vercel Web Design Guidelines
2:
3: High-performance, accessible web interface rules from Vercel Labs.
4:
5: ---
6:
7: # Installation
8:
9: `bash
 10: npx skills add vercel-labs/agent-skills --skill web-design-guidelines
 11: `
12:
13: ---
14:
15: # Workflow
16:
17: 1. Fetch the latest guidelines from the Vercel repository.
18: 2. Read target files in the project.
19: 3. Check all rules against the files.
20: 4. Output terse file:line findings.
21:
22: ---
23:
24: # Key Rule Categories
25:
26: ## Accessibility
27:
28: - Icon-only buttons need `aria-label`.
29: - Never `outline-none` without a focus replacement.
30: - Never block paste.
31: - Honor `prefers-reduced-motion`.
32: - Semantic HTML elements.
33: - Color contrast meets WCAG AA.
34:
35: ## Focus
36:
37: - Visible focus rings on all interactive elements.
38: - Logical tab order.
39: - Skip links for keyboard navigation.
40: - Focus trapping in modals.
41:
42: ## Forms
43:
44: - Labels associated with inputs.
45: - Error messages linked via `aria-describedby`.
46: - Required fields indicated visually and programmatically.
47: - Inline validation on blur.
48:
49: ## Animation
50:
51: - Honor `prefers-reduced-motion`.
52: - Under 300ms for micro-interactions.
53: - `ease-out` for enter, `ease-in` for exit.
54: - Virtualize lists over 50 items.
55: - Use `transform` and `opacity` for animations.
56:
57: ## Typography
58:
59: - `text-wrap: balance` on headlines.
60: - `text-wrap: pretty` on body text.
61: - Line length: 45-90 characters.
62: - Consistent type scale.
63:
64: ## Content
65:
66: - `Intl.DateTimeFormat` for dates.
67: - Destructive actions need confirmation or undo.
68: - URL reflects state.
69: - Loading states for async operations.
70:
71: ## Images
72:
73: - Explicit `width` and `height`.
74: - Use `next/image`.
75: - Alt text on meaningful images.
76: - Decorative: `alt=""` and `role="presentation"`.
77:
78: ## Performance
79:
80: - Server Components by default.
81: - Lazy load below-the-fold.
82: - Minimize client JS.
83: - Streaming and Suspense.
84: - Prefetch critical navigation.
85:
86: ## Touch
87:
88: - 40x40px minimum touch targets.
89: - `@media (hover: hover)` for hover styles.
90: - Safe areas for mobile.
91:
92: ## Dark Mode
93:
94: - CSS custom properties for themes.
95: - Test both modes.
96: - Avoid pure black backgrounds.
97: - Sufficient contrast in both modes.
98:
99: ---
100:
101: # Sources
102:
103: - vercel-labs/web-interface-guidelines (MIT).
104: - vercel.com/design/guidelines.
```

## File: prisma/migrations/20260719134020_test1/migration.sql

```sql
1: CREATE TABLE "User" (
2:     "id" SERIAL NOT NULL,
3:     "email" TEXT NOT NULL,
4:     "name" TEXT,
5:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
6:     "updatedAt" TIMESTAMP(3) NOT NULL,
7:     CONSTRAINT "User_pkey" PRIMARY KEY ("id")
8: );
9: CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

## File: prisma/migrations/20260722213711_add_better_auth_and_rbac/migration.sql

```sql
  1: /*
  2:   Warnings:
  3:   - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  4: */
  5: DROP TABLE "User";
  6: CREATE TABLE "user" (
  7:     "id" TEXT NOT NULL,
  8:     "email" TEXT NOT NULL,
  9:     "name" TEXT,
 10:     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
 11:     "image" TEXT,
 12:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 13:     "updatedAt" TIMESTAMP(3) NOT NULL,
 14:     CONSTRAINT "user_pkey" PRIMARY KEY ("id")
 15: );
 16: CREATE TABLE "session" (
 17:     "id" TEXT NOT NULL,
 18:     "expiresAt" TIMESTAMP(3) NOT NULL,
 19:     "token" TEXT NOT NULL,
 20:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 21:     "updatedAt" TIMESTAMP(3) NOT NULL,
 22:     "ipAddress" TEXT,
 23:     "userAgent" TEXT,
 24:     "userId" TEXT NOT NULL,
 25:     CONSTRAINT "session_pkey" PRIMARY KEY ("id")
 26: );
 27: CREATE TABLE "account" (
 28:     "id" TEXT NOT NULL,
 29:     "accountId" TEXT NOT NULL,
 30:     "providerId" TEXT NOT NULL,
 31:     "userId" TEXT NOT NULL,
 32:     "accessToken" TEXT,
 33:     "refreshToken" TEXT,
 34:     "idToken" TEXT,
 35:     "accessTokenExpiresAt" TIMESTAMP(3),
 36:     "refreshTokenExpiresAt" TIMESTAMP(3),
 37:     "scope" TEXT,
 38:     "password" TEXT,
 39:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 40:     "updatedAt" TIMESTAMP(3) NOT NULL,
 41:     CONSTRAINT "account_pkey" PRIMARY KEY ("id")
 42: );
 43: CREATE TABLE "verification" (
 44:     "id" TEXT NOT NULL,
 45:     "identifier" TEXT NOT NULL,
 46:     "value" TEXT NOT NULL,
 47:     "expiresAt" TIMESTAMP(3) NOT NULL,
 48:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 49:     "updatedAt" TIMESTAMP(3) NOT NULL,
 50:     CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
 51: );
 52: CREATE TABLE "role" (
 53:     "id" TEXT NOT NULL,
 54:     "name" TEXT NOT NULL,
 55:     "description" TEXT,
 56:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 57:     "updatedAt" TIMESTAMP(3) NOT NULL,
 58:     CONSTRAINT "role_pkey" PRIMARY KEY ("id")
 59: );
 60: CREATE TABLE "permission" (
 61:     "id" TEXT NOT NULL,
 62:     "name" TEXT NOT NULL,
 63:     "description" TEXT,
 64:     "resource" TEXT NOT NULL,
 65:     "action" TEXT NOT NULL,
 66:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 67:     "updatedAt" TIMESTAMP(3) NOT NULL,
 68:     CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
 69: );
 70: CREATE TABLE "user_role" (
 71:     "id" TEXT NOT NULL,
 72:     "userId" TEXT NOT NULL,
 73:     "roleId" TEXT NOT NULL,
 74:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 75:     CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
 76: );
 77: CREATE TABLE "role_permission" (
 78:     "id" TEXT NOT NULL,
 79:     "roleId" TEXT NOT NULL,
 80:     "permissionId" TEXT NOT NULL,
 81:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 82:     CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
 83: );
 84: CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
 85: CREATE INDEX "session_userId_idx" ON "session"("userId");
 86: CREATE UNIQUE INDEX "session_token_key" ON "session"("token");
 87: CREATE INDEX "account_userId_idx" ON "account"("userId");
 88: CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
 89: CREATE UNIQUE INDEX "role_name_key" ON "role"("name");
 90: CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");
 91: CREATE UNIQUE INDEX "permission_resource_action_key" ON "permission"("resource", "action");
 92: CREATE INDEX "user_role_userId_idx" ON "user_role"("userId");
 93: CREATE INDEX "user_role_roleId_idx" ON "user_role"("roleId");
 94: CREATE UNIQUE INDEX "user_role_userId_roleId_key" ON "user_role"("userId", "roleId");
 95: CREATE INDEX "role_permission_roleId_idx" ON "role_permission"("roleId");
 96: CREATE INDEX "role_permission_permissionId_idx" ON "role_permission"("permissionId");
 97: CREATE UNIQUE INDEX "role_permission_roleId_permissionId_key" ON "role_permission"("roleId", "permissionId");
 98: ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
 99: ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
100: ALTER TABLE "user_role" ADD CONSTRAINT "user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
101: ALTER TABLE "user_role" ADD CONSTRAINT "user_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
102: ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
103: ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

## File: prisma/migrations/migration_lock.toml

```toml
1: # Please do not edit this file manually
2: # It should be added in your version-control system (e.g., Git)
3: provider = "postgresql"
```

## File: public/file.svg

```xml
1: <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
```

## File: public/globe.svg

```xml
1: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
```

## File: public/next.svg

```xml
1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
```

## File: public/vercel.svg

```xml
1: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
```

## File: public/window.svg

```xml
1: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
```

## File: src/actions/auth.ts

```typescript
  1: "use server";
  2: import { auth } from "@/lib/auth";
  3: import * as authService from "@/services/auth";
  4: import * as authorizationService from "@/services/authorization";
  5: import {
  6:   signInSchema,
  7:   signUpSchema,
  8:   type SignInInput,
  9:   type SignUpInput,
 10: } from "@/lib/validations/auth";
 11: import { AuthenticationError } from "@/lib/errors";
 12: import { headers } from "next/headers";
 13: type ActionResponse<T = void> = {
 14:   success: boolean;
 15:   data?: T;
 16:   error?: string;
 17: };
 18: export async function signInAction(
 19:   input: SignInInput,
 20: ): Promise<ActionResponse> {
 21:   const parsed = signInSchema.safeParse(input);
 22:   if (!parsed.success) {
 23:     return {
 24:       success: false,
 25:       error: parsed.error.issues[0]?.message ?? "Invalid input",
 26:     };
 27:   }
 28:   try {
 29:     const result = await auth.api.signInEmail({
 30:       body: {
 31:         email: parsed.data.email,
 32:         password: parsed.data.password,
 33:       },
 34:       headers: await headers(),
 35:     });
 36:     return { success: true, data: result as unknown as void };
 37:   } catch (error) {
 38:     if (error instanceof Error) {
 39:       return { success: false, error: error.message };
 40:     }
 41:     return { success: false, error: "Sign in failed" };
 42:   }
 43: }
 44: export async function signUpAction(
 45:   input: SignUpInput,
 46: ): Promise<ActionResponse> {
 47:   const parsed = signUpSchema.safeParse(input);
 48:   if (!parsed.success) {
 49:     return {
 50:       success: false,
 51:       error: parsed.error.issues[0]?.message ?? "Invalid input",
 52:     };
 53:   }
 54:   try {
 55:     const result = await auth.api.signUpEmail({
 56:       body: {
 57:         email: parsed.data.email,
 58:         password: parsed.data.password,
 59:         name: parsed.data.name,
 60:       },
 61:       headers: await headers(),
 62:     });
 63:     return { success: true, data: result as unknown as void };
 64:   } catch (error) {
 65:     if (error instanceof Error) {
 66:       return { success: false, error: error.message };
 67:     }
 68:     return { success: false, error: "Sign up failed" };
 69:   }
 70: }
 71: export async function signOutAction(): Promise<ActionResponse> {
 72:   try {
 73:     await auth.api.signOut({
 74:       headers: await headers(),
 75:     });
 76:     return { success: true };
 77:   } catch (error) {
 78:     if (error instanceof Error) {
 79:       return { success: false, error: error.message };
 80:     }
 81:     return { success: false, error: "Sign out failed" };
 82:   }
 83: }
 84: export async function getSessionAction() {
 85:   try {
 86:     const session = await authService.getCurrentSession();
 87:     return { success: true, data: session };
 88:   } catch (error) {
 89:     if (error instanceof AuthenticationError) {
 90:       return { success: false, error: "Not authenticated" };
 91:     }
 92:     return { success: false, error: "Failed to get session" };
 93:   }
 94: }
 95: export async function getUserRolesAction() {
 96:   try {
 97:     const session = await authService.getCurrentSession();
 98:     const roles = await authorizationService.getUserRoles(session.user.id);
 99:     return { success: true, data: roles };
100:   } catch (error) {
101:     if (error instanceof AuthenticationError) {
102:       return { success: false, error: "Not authenticated" };
103:     }
104:     return { success: false, error: "Failed to get roles" };
105:   }
106: }
107: export async function getUserPermissionsAction() {
108:   try {
109:     const session = await authService.getCurrentSession();
110:     const permissions = await authorizationService.getUserPermissions(
111:       session.user.id,
112:     );
113:     return { success: true, data: permissions };
114:   } catch (error) {
115:     if (error instanceof AuthenticationError) {
116:       return { success: false, error: "Not authenticated" };
117:     }
118:     return { success: false, error: "Failed to get permissions" };
119:   }
120: }
121: export async function revokeSessionAction(
122:   sessionId: string,
123: ): Promise<ActionResponse> {
124:   try {
125:     await authService.revokeSession(sessionId);
126:     return { success: true };
127:   } catch (error) {
128:     if (error instanceof AuthenticationError) {
129:       return { success: false, error: "Not authenticated" };
130:     }
131:     return { success: false, error: "Failed to revoke session" };
132:   }
133: }
134: export async function revokeAllSessionsAction(): Promise<ActionResponse> {
135:   try {
136:     const session = await authService.getCurrentSession();
137:     await authService.revokeAllSessions(session.user.id);
138:     return { success: true };
139:   } catch (error) {
140:     if (error instanceof AuthenticationError) {
141:       return { success: false, error: "Not authenticated" };
142:     }
143:     return { success: false, error: "Failed to revoke sessions" };
144:   }
145: }
```

## File: src/app/api/auth/[...all]/route.ts

```typescript
1: import { auth } from "@/lib/auth";
2: import { toNextJsHandler } from "better-auth/next-js";
3: export const { GET, POST } = toNextJsHandler(auth.handler);
```

## File: src/components/layout/footer.tsx

```typescript
 1: import Link from "next/link";
 2: import { GraduationCap } from "lucide-react";
 3: import { Separator } from "@/components/ui/separator";
 4: const footerLinks = [
 5:   {
 6:     title: "Platform",
 7:     links: [
 8:       { label: "Courses", href: "#" },
 9:       { label: "Pricing", href: "#" },
10:       { label: "Instructors", href: "#" },
11:       { label: "Certificates", href: "#" },
12:     ],
13:   },
14:   {
15:     title: "Company",
16:     links: [
17:       { label: "About", href: "#" },
18:       { label: "Blog", href: "#" },
19:       { label: "Careers", href: "#" },
20:       { label: "Press", href: "#" },
21:     ],
22:   },
23:   {
24:     title: "Support",
25:     links: [
26:       { label: "Help Center", href: "#" },
27:       { label: "Contact", href: "#" },
28:       { label: "Privacy", href: "#" },
29:       { label: "Terms", href: "#" },
30:     ],
31:   },
32: ];
33: function Footer() {
34:   return (
35:     <footer className="border-t border-border bg-muted/30">
36:       <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
37:         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
38:           <div>
39:             <Link
40:               href="/"
41:               className="flex items-center gap-2 text-base font-semibold text-foreground"
42:             >
43:               <GraduationCap className="size-5" />
44:               <span>EduPlatform</span>
45:             </Link>
46:             <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
47:               Empowering learners worldwide with expert-led courses and
48:               career-focused education.
49:             </p>
50:           </div>
51:           {footerLinks.map((group) => (
52:             <div key={group.title}>
53:               <h3 className="text-sm font-medium text-foreground">
54:                 {group.title}
55:               </h3>
56:               <ul className="mt-3 flex flex-col gap-2">
57:                 {group.links.map((link) => (
58:                   <li key={link.label}>
59:                     <a
60:                       href={link.href}
61:                       className="text-sm text-muted-foreground transition-colors hover:text-foreground"
62:                     >
63:                       {link.label}
64:                     </a>
65:                   </li>
66:                 ))}
67:               </ul>
68:             </div>
69:           ))}
70:         </div>
71:         <Separator className="my-8" />
72:         <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
73:           <p>
74:             &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
75:           </p>
76:           <div className="flex gap-4">
77:             <a href="#" className="transition-colors hover:text-foreground">
78:               Privacy Policy
79:             </a>
80:             <a href="#" className="transition-colors hover:text-foreground">
81:               Terms of Service
82:             </a>
83:           </div>
84:         </div>
85:       </div>
86:     </footer>
87:   );
88: }
89: export { Footer };
```

## File: src/components/layout/header.tsx

```typescript
  1: "use client";
  2: import * as React from "react";
  3: import { GraduationCap, Menu, X } from "lucide-react";
  4: import Link from "next/link";
  5: import { Button } from "@/components/ui/button";
  6: import { ModeToggle } from "@/components/theme/mode-toggle";
  7: const navLinks = [
  8:   { label: "Home", href: "#" },
  9:   { label: "Courses", href: "#features" },
 10:   { label: "About", href: "#stats" },
 11:   { label: "Contact", href: "#cta" },
 12: ];
 13: function Header() {
 14:   const [mobileOpen, setMobileOpen] = React.useState(false);
 15:   return (
 16:     <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
 17:       <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
 18:         <Link
 19:           href="/"
 20:           className="flex items-center gap-2 text-base font-semibold text-foreground"
 21:         >
 22:           <GraduationCap className="size-5" />
 23:           <span>EduPlatform</span>
 24:         </Link>
 25:         <nav
 26:           className="hidden items-center gap-1 md:flex"
 27:           aria-label="Main navigation"
 28:         >
 29:           {navLinks.map((link) => (
 30:             <a
 31:               key={link.label}
 32:               href={link.href}
 33:               className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
 34:             >
 35:               {link.label}
 36:             </a>
 37:           ))}
 38:         </nav>
 39:         <div className="flex items-center gap-2">
 40:           <ModeToggle className="hidden md:inline-flex" />
 41:           <Button
 42:             variant="ghost"
 43:             size="sm"
 44:             className="hidden md:inline-flex"
 45:             nativeButton={false}
 46:             render={<a href="#" />}
 47:           >
 48:             Sign In
 49:           </Button>
 50:           <Button
 51:             size="sm"
 52:             className="hidden md:inline-flex"
 53:             nativeButton={false}
 54:             render={<a href="#" />}
 55:           >
 56:             Get Started
 57:           </Button>
 58:           <Button
 59:             variant="ghost"
 60:             size="icon-sm"
 61:             className="md:hidden"
 62:             aria-label={mobileOpen ? "Close menu" : "Open menu"}
 63:             onClick={() => setMobileOpen((prev) => !prev)}
 64:           >
 65:             {mobileOpen ? (
 66:               <X className="size-4" />
 67:             ) : (
 68:               <Menu className="size-4" />
 69:             )}
 70:           </Button>
 71:         </div>
 72:       </div>
 73:       {mobileOpen && (
 74:         <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
 75:           <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
 76:             {navLinks.map((link) => (
 77:               <a
 78:                 key={link.label}
 79:                 href={link.href}
 80:                 className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
 81:                 onClick={() => setMobileOpen(false)}
 82:               >
 83:                 {link.label}
 84:               </a>
 85:             ))}
 86:           </nav>
 87:           <div className="mt-3 flex flex-col gap-2">
 88:             <ModeToggle className="w-full" />
 89:             <Button
 90:               variant="outline"
 91:               size="sm"
 92:               className="w-full"
 93:               nativeButton={false}
 94:               render={<a href="#" />}
 95:             >
 96:               Sign In
 97:             </Button>
 98:             <Button
 99:               size="sm"
100:               className="w-full"
101:               nativeButton={false}
102:               render={<a href="#" />}
103:             >
104:               Get Started
105:             </Button>
106:           </div>
107:         </div>
108:       )}
109:     </header>
110:   );
111: }
112: export { Header };
```

## File: src/components/sections/cta.tsx

```typescript
 1: import { ArrowRight } from "lucide-react";
 2: import { Button } from "@/components/ui/button";
 3: function CTA() {
 4:   return (
 5:     <section id="cta" className="border-t border-border">
 6:       <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
 7:         <div className="flex flex-col items-center text-center">
 8:           <h2
 9:             className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
10:             style={{ textWrap: "balance" }}
11:           >
12:             Start your learning journey today
13:           </h2>
14:           <p
15:             className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg"
16:             style={{ textWrap: "pretty" }}
17:           >
18:             Create a free account and explore hundreds of courses. No credit
19:             card required.
20:           </p>
21:           <div className="mt-8">
22:             <Button
23:               size="lg"
24:               className="gap-2"
25:               nativeButton={false}
26:               render={<a href="#" />}
27:             >
28:               Create Free Account
29:               <ArrowRight className="size-4" />
30:             </Button>
31:           </div>
32:         </div>
33:       </div>
34:     </section>
35:   );
36: }
37: export { CTA };
```

## File: src/components/sections/features.tsx

```typescript
 1: import {
 2:   BookOpen,
 3:   BarChart3,
 4:   Award,
 5:   Users,
 6:   Smartphone,
 7:   MessageCircle,
 8: } from "lucide-react";
 9: import {
10:   Card,
11:   CardHeader,
12:   CardTitle,
13:   CardDescription,
14:   CardContent,
15: } from "@/components/ui/card";
16: const features = [
17:   {
18:     icon: BookOpen,
19:     title: "Interactive Learning",
20:     description:
21:       "Engage with hands-on projects, quizzes, and real-world scenarios that reinforce every concept.",
22:   },
23:   {
24:     icon: BarChart3,
25:     title: "Progress Tracking",
26:     description:
27:       "Monitor your learning journey with detailed analytics, streaks, and personalized milestones.",
28:   },
29:   {
30:     icon: Award,
31:     title: "Certificates",
32:     description:
33:       "Earn recognized certificates upon completion to showcase your skills to employers.",
34:   },
35:   {
36:     icon: Users,
37:     title: "Expert Instructors",
38:     description:
39:       "Learn from industry professionals with years of real-world experience in their fields.",
40:   },
41:   {
42:     icon: MessageCircle,
43:     title: "Community",
44:     description:
45:       "Connect with fellow learners, join study groups, and get support from a global community.",
46:   },
47:   {
48:     icon: Smartphone,
49:     title: "Mobile Friendly",
50:     description:
51:       "Study anywhere with a fully responsive platform that works seamlessly on any device.",
52:   },
53: ];
54: function Features() {
55:   return (
56:     <section id="features" className="border-t border-border">
57:       <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
58:         <div className="max-w-2xl">
59:           <p className="text-sm font-medium text-muted-foreground">Features</p>
60:           <h2
61:             className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
62:             style={{ textWrap: "balance" }}
63:           >
64:             Everything you need to learn effectively
65:           </h2>
66:           <p
67:             className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg"
68:             style={{ textWrap: "pretty" }}
69:           >
70:             A complete learning environment designed to help you stay focused,
71:             track progress, and achieve your goals.
72:           </p>
73:         </div>
74:         <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
75:           {features.map((feature) => (
76:             <Card key={feature.title}>
77:               <CardHeader>
78:                 <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
79:                   <feature.icon className="size-4.5 text-primary" />
80:                 </div>
81:                 <CardTitle>{feature.title}</CardTitle>
82:               </CardHeader>
83:               <CardContent>
84:                 <CardDescription className="text-sm leading-relaxed sm:text-base">
85:                   {feature.description}
86:                 </CardDescription>
87:               </CardContent>
88:             </Card>
89:           ))}
90:         </div>
91:       </div>
92:     </section>
93:   );
94: }
95: export { Features };
```

## File: src/components/sections/hero.tsx

```typescript
 1: import { ArrowRight, Play } from "lucide-react";
 2: import { Button } from "@/components/ui/button";
 3: import { Badge } from "@/components/ui/badge";
 4: function Hero() {
 5:   return (
 6:     <section className="relative overflow-hidden">
 7:       <div className="absolute inset-0 -z-10">
 8:         <div className="absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
 9:         <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-muted/50 blur-3xl" />
10:       </div>
11:       <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
12:         <div className="flex flex-col items-start gap-6">
13:           <Badge variant="secondary" className="px-3 py-1 text-xs">
14:             Trusted by 50,000+ learners
15:           </Badge>
16:           <h1
17:             className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl"
18:             style={{ textWrap: "balance" }}
19:           >
20:             Master new skills with expert-led courses
21:           </h1>
22:           <p
23:             className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground sm:text-xl"
24:             style={{ textWrap: "pretty" }}
25:           >
26:             Join thousands of learners advancing their careers through
27:             high-quality, structured courses taught by industry professionals.
28:           </p>
29:           <div className="mt-2 flex flex-col gap-3 sm:flex-row">
30:             <Button
31:               size="lg"
32:               className="gap-2"
33:               nativeButton={false}
34:               render={<a href="#" />}
35:             >
36:               Get Started Free
37:               <ArrowRight className="size-4" />
38:             </Button>
39:             <Button
40:               variant="outline"
41:               size="lg"
42:               className="gap-2"
43:               nativeButton={false}
44:               render={<a href="#" />}
45:             >
46:               <Play className="size-3.5" />
47:               Browse Courses
48:             </Button>
49:           </div>
50:         </div>
51:       </div>
52:     </section>
53:   );
54: }
55: export { Hero };
```

## File: src/components/sections/stats.tsx

```typescript
 1: const stats = [
 2:   { value: "50,000+", label: "Active Students" },
 3:   { value: "1,200+", label: "Courses" },
 4:   { value: "350+", label: "Expert Instructors" },
 5:   { value: "94%", label: "Completion Rate" },
 6: ];
 7: function Stats() {
 8:   return (
 9:     <section id="stats" className="border-t border-border bg-muted/30">
10:       <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
11:         <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
12:           {stats.map((stat) => (
13:             <div key={stat.label} className="text-center">
14:               <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
15:                 {stat.value}
16:               </p>
17:               <p className="mt-1 text-sm text-muted-foreground sm:text-base">
18:                 {stat.label}
19:               </p>
20:             </div>
21:           ))}
22:         </div>
23:       </div>
24:     </section>
25:   );
26: }
27: export { Stats };
```

## File: src/components/ui/**tests**/card.test.tsx

```typescript
 1: import { render, screen } from "@testing-library/react";
 2: import {
 3:   Card,
 4:   CardHeader,
 5:   CardTitle,
 6:   CardDescription,
 7:   CardContent,
 8:   CardFooter,
 9: } from "../card";
10: describe("Card", () => {
11:   it("renders children", () => {
12:     render(
13:       <Card>
14:         <CardContent>Test content</CardContent>
15:       </Card>,
16:     );
17:     expect(screen.getByText("Test content")).toBeInTheDocument();
18:   });
19:   it("renders with title", () => {
20:     render(
21:       <Card>
22:         <CardHeader>
23:           <CardTitle>Card Title</CardTitle>
24:         </CardHeader>
25:       </Card>,
26:     );
27:     expect(screen.getByText("Card Title")).toBeInTheDocument();
28:   });
29:   it("renders with description", () => {
30:     render(
31:       <Card>
32:         <CardHeader>
33:           <CardTitle>Title</CardTitle>
34:           <CardDescription>Description text</CardDescription>
35:         </CardHeader>
36:       </Card>,
37:     );
38:     expect(screen.getByText("Description text")).toBeInTheDocument();
39:   });
40:   it("renders with footer", () => {
41:     render(
42:       <Card>
43:         <CardContent>Content</CardContent>
44:         <CardFooter>Footer content</CardFooter>
45:       </Card>,
46:     );
47:     expect(screen.getByText("Footer content")).toBeInTheDocument();
48:   });
49:   it("applies custom className", () => {
50:     const { container } = render(
51:       <Card className="custom-class">
52:         <CardContent>Content</CardContent>
53:       </Card>,
54:     );
55:     expect(container.firstChild).toHaveClass("custom-class");
56:   });
57: });
```

## File: src/components/ui/badge.tsx

```typescript
 1: import { mergeProps } from "@base-ui/react/merge-props";
 2: import { useRender } from "@base-ui/react/use-render";
 3: import { cva, type VariantProps } from "class-variance-authority";
 4: import { cn } from "@/lib/utils";
 5: const badgeVariants = cva(
 6:   "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
 7:   {
 8:     variants: {
 9:       variant: {
10:         default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
11:         secondary:
12:           "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
13:         destructive:
14:           "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
15:         outline:
16:           "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
17:         ghost:
18:           "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
19:         link: "text-primary underline-offset-4 hover:underline",
20:       },
21:     },
22:     defaultVariants: {
23:       variant: "default",
24:     },
25:   },
26: );
27: function Badge({
28:   className,
29:   variant = "default",
30:   render,
31:   ...props
32: }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
33:   return useRender({
34:     defaultTagName: "span",
35:     props: mergeProps<"span">(
36:       {
37:         className: cn(badgeVariants({ variant }), className),
38:       },
39:       props,
40:     ),
41:     render,
42:     state: {
43:       slot: "badge",
44:       variant,
45:     },
46:   });
47: }
48: export { Badge, badgeVariants };
```

## File: src/components/ui/card.tsx

```typescript
 1: import * as React from "react";
 2: import { cn } from "@/lib/utils";
 3: function Card({
 4:   className,
 5:   size = "default",
 6:   ...props
 7: }: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
 8:   return (
 9:     <div
10:       data-slot="card"
11:       data-size={size}
12:       className={cn(
13:         "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
14:         className,
15:       )}
16:       {...props}
17:     />
18:   );
19: }
20: function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
21:   return (
22:     <div
23:       data-slot="card-header"
24:       className={cn(
25:         "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
26:         className,
27:       )}
28:       {...props}
29:     />
30:   );
31: }
32: function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
33:   return (
34:     <div
35:       data-slot="card-title"
36:       className={cn(
37:         "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
38:         className,
39:       )}
40:       {...props}
41:     />
42:   );
43: }
44: function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
45:   return (
46:     <div
47:       data-slot="card-description"
48:       className={cn("text-sm text-muted-foreground", className)}
49:       {...props}
50:     />
51:   );
52: }
53: function CardAction({ className, ...props }: React.ComponentProps<"div">) {
54:   return (
55:     <div
56:       data-slot="card-action"
57:       className={cn(
58:         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
59:         className,
60:       )}
61:       {...props}
62:     />
63:   );
64: }
65: function CardContent({ className, ...props }: React.ComponentProps<"div">) {
66:   return (
67:     <div
68:       data-slot="card-content"
69:       className={cn("px-(--card-spacing)", className)}
70:       {...props}
71:     />
72:   );
73: }
74: function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
75:   return (
76:     <div
77:       data-slot="card-footer"
78:       className={cn(
79:         "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
80:         className,
81:       )}
82:       {...props}
83:     />
84:   );
85: }
86: export {
87:   Card,
88:   CardHeader,
89:   CardFooter,
90:   CardTitle,
91:   CardAction,
92:   CardDescription,
93:   CardContent,
94: };
```

## File: src/components/ui/input.tsx

```typescript
 1: import * as React from "react";
 2: import { Input as InputPrimitive } from "@base-ui/react/input";
 3: import { cn } from "@/lib/utils";
 4: function Input({ className, type, ...props }: React.ComponentProps<"input">) {
 5:   return (
 6:     <InputPrimitive
 7:       type={type}
 8:       data-slot="input"
 9:       className={cn(
10:         "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
11:         className,
12:       )}
13:       {...props}
14:     />
15:   );
16: }
17: export { Input };
```

## File: src/components/ui/label.tsx

```typescript
 1: "use client";
 2: import * as React from "react";
 3: import { cn } from "@/lib/utils";
 4: function Label({ className, ...props }: React.ComponentProps<"label">) {
 5:   return (
 6:     <label
 7:       data-slot="label"
 8:       className={cn(
 9:         "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
10:         className,
11:       )}
12:       {...props}
13:     />
14:   );
15: }
16: export { Label };
```

## File: src/components/ui/separator.tsx

```typescript
 1: "use client";
 2: import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
 3: import { cn } from "@/lib/utils";
 4: function Separator({
 5:   className,
 6:   orientation = "horizontal",
 7:   ...props
 8: }: SeparatorPrimitive.Props) {
 9:   return (
10:     <SeparatorPrimitive
11:       data-slot="separator"
12:       orientation={orientation}
13:       className={cn(
14:         "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
15:         className,
16:       )}
17:       {...props}
18:     />
19:   );
20: }
21: export { Separator };
```

## File: src/lib/**tests**/utils.test.ts

```typescript
 1: import { cn } from "../utils";
 2: describe("cn", () => {
 3:   it("merges class names", () => {
 4:     const result = cn("text-red-500", "text-blue-500");
 5:     expect(result).toBe("text-blue-500");
 6:   });
 7:   it("handles conditional classes", () => {
 8:     const result = cn("base", false && "hidden", "extra");
 9:     expect(result).toContain("base");
10:     expect(result).toContain("extra");
11:     expect(result).not.toContain("hidden");
12:   });
13:   it("handles undefined and null", () => {
14:     const result = cn("base", undefined, null);
15:     expect(result).toBe("base");
16:   });
17:   it("merges tailwind conflicts", () => {
18:     const result = cn("p-2 p-4");
19:     expect(result).toBe("p-4");
20:   });
21:   it("handles empty input", () => {
22:     const result = cn();
23:     expect(result).toBe("");
24:   });
25: });
```

## File: src/lib/errors/index.ts

```typescript
 1: export class AuthenticationError extends Error {
 2:   readonly statusCode = 401;
 3:   readonly code = "AUTHENTICATION_ERROR";
 4:   constructor(message = "Authentication required") {
 5:     super(message);
 6:     this.name = "AuthenticationError";
 7:   }
 8: }
 9: export class AuthorizationError extends Error {
10:   readonly statusCode = 403;
11:   readonly code = "AUTHORIZATION_ERROR";
12:   constructor(message = "Insufficient permissions") {
13:     super(message);
14:     this.name = "AuthorizationError";
15:   }
16: }
17: export class InvalidCredentialsError extends Error {
18:   readonly statusCode = 401;
19:   readonly code = "INVALID_CREDENTIALS";
20:   constructor(message = "Invalid email or password") {
21:     super(message);
22:     this.name = "InvalidCredentialsError";
23:   }
24: }
25: export class SessionExpiredError extends Error {
26:   readonly statusCode = 401;
27:   readonly code = "SESSION_EXPIRED";
28:   constructor(message = "Session has expired") {
29:     super(message);
30:     this.name = "SessionExpiredError";
31:   }
32: }
33: export class EmailVerificationRequiredError extends Error {
34:   readonly statusCode = 403;
35:   readonly code = "EMAIL_VERIFICATION_REQUIRED";
36:   constructor(message = "Email verification required") {
37:     super(message);
38:     this.name = "EmailVerificationRequiredError";
39:   }
40: }
41: export class NotFoundError extends Error {
42:   readonly statusCode = 404;
43:   readonly code = "NOT_FOUND";
44:   constructor(message = "Resource not found") {
45:     super(message);
46:     this.name = "NotFoundError";
47:   }
48: }
49: export class ValidationError extends Error {
50:   readonly statusCode = 400;
51:   readonly code = "VALIDATION_ERROR";
52:   readonly errors: Record<string, string[]>;
53:   constructor(errors: Record<string, string[]>, message = "Validation failed") {
54:     super(message);
55:     this.name = "ValidationError";
56:     this.errors = errors;
57:   }
58: }
```

## File: src/lib/validations/auth.ts

```typescript
 1: import * as z from "zod";
 2: export const signInSchema = z.object({
 3:   email: z.email("Invalid email address"),
 4:   password: z.string().min(1, "Password is required"),
 5: });
 6: export const signUpSchema = z.object({
 7:   email: z.email("Invalid email address"),
 8:   password: z
 9:     .string()
10:     .min(8, "Password must be at least 8 characters")
11:     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
12:     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
13:     .regex(/[0-9]/, "Password must contain at least one number"),
14:   name: z
15:     .string()
16:     .min(2, "Name must be at least 2 characters")
17:     .max(100, "Name must be at most 100 characters"),
18: });
19: export const forgotPasswordSchema = z.object({
20:   email: z.email("Invalid email address"),
21: });
22: export const resetPasswordSchema = z
23:   .object({
24:     password: z
25:       .string()
26:       .min(8, "Password must be at least 8 characters")
27:       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
28:       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
29:       .regex(/[0-9]/, "Password must contain at least one number"),
30:     confirmPassword: z.string(),
31:   })
32:   .refine((data) => data.password === data.confirmPassword, {
33:     message: "Passwords do not match",
34:     path: ["confirmPassword"],
35:   });
36: export type SignInInput = z.infer<typeof signInSchema>;
37: export type SignUpInput = z.infer<typeof signUpSchema>;
38: export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
39: export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
```

## File: src/lib/validations/user.ts

```typescript
 1: import * as z from "zod";
 2: export const updateProfileSchema = z.object({
 3:   name: z
 4:     .string()
 5:     .min(2, "Name must be at least 2 characters")
 6:     .max(100, "Name must be at most 100 characters")
 7:     .optional(),
 8:   image: z.url("Invalid image URL").optional(),
 9: });
10: export const assignRoleSchema = z.object({
11:   userId: z.string().min(1, "User ID is required"),
12:   roleId: z.string().min(1, "Role ID is required"),
13: });
14: export const removeRoleSchema = z.object({
15:   userId: z.string().min(1, "User ID is required"),
16:   roleId: z.string().min(1, "Role ID is required"),
17: });
18: export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
19: export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
20: export type RemoveRoleInput = z.infer<typeof removeRoleSchema>;
```

## File: src/lib/auth-client.ts

```typescript
1: import { createAuthClient } from "better-auth/react";
2: export const authClient = createAuthClient();
3: export const { signIn, signUp, signOut, useSession, getSession } = authClient;
```

## File: src/lib/auth.ts

```typescript
 1: import { betterAuth } from "better-auth";
 2: import { prismaAdapter } from "better-auth/adapters/prisma";
 3: import { prisma } from "./db";
 4: export const auth = betterAuth({
 5:   database: prismaAdapter(prisma, {
 6:     provider: "postgresql",
 7:   }),
 8:   emailAndPassword: {
 9:     enabled: true,
10:   },
11:   session: {
12:     expiresIn: 60 * 60 * 24 * 7,
13:     updateAge: 60 * 60 * 24,
14:     cookieCache: {
15:       enabled: true,
16:       maxAge: 60 * 5,
17:     },
18:   },
19:   advanced: {
20:     useSecureCookies: process.env.NODE_ENV === "production",
21:   },
22:   rateLimit: {
23:     enabled: true,
24:     window: 10,
25:     max: 100,
26:   },
27: });
28: export type Session = typeof auth.$Infer.Session;
```

## File: src/lib/db.ts

```typescript
 1: import { neonConfig } from "@neondatabase/serverless";
 2: import { PrismaNeon } from "@prisma/adapter-neon";
 3: import { PrismaClient } from "@prisma/client";
 4: import ws from "ws";
 5: neonConfig.webSocketConstructor = ws;
 6: const prismaClientSingleton = () => {
 7:   const adapter = new PrismaNeon({
 8:     connectionString: process.env.DATABASE_URL,
 9:   });
10:   return new PrismaClient({ adapter });
11: };
12: declare const globalThis: {
13:   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
14: } & typeof global;
15: export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
16: if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

## File: src/lib/env.ts

```typescript
 1: import { createEnv } from "@t3-oss/env-nextjs";
 2: import * as z from "zod";
 3: export const env = createEnv({
 4:   server: {
 5:     DATABASE_URL: z.url(),
 6:     DIRECT_URL: z.url().optional(),
 7:     BETTER_AUTH_SECRET: z.string().min(32),
 8:     BETTER_AUTH_URL: z.url(),
 9:   },
10:   client: {},
11:   runtimeEnv: {
12:     DATABASE_URL: process.env.DATABASE_URL,
13:     DIRECT_URL: process.env.DIRECT_URL,
14:     BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
15:     BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
16:   },
17: });
```

## File: src/lib/utils.ts

```typescript
1: import { clsx, type ClassValue } from "clsx";
2: import { twMerge } from "tailwind-merge";
3: export function cn(...inputs: ClassValue[]) {
4:   return twMerge(clsx(inputs));
5: }
```

## File: src/providers/theme-provider.tsx

```typescript
1: "use client";
2: import * as React from "react";
3: import { ThemeProvider as NextThemesProvider } from "next-themes";
4: export function ThemeProvider({
5:   children,
6:   ...props
7: }: React.ComponentProps<typeof NextThemesProvider>) {
8:   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
9: }
```

## File: src/repositories/permission.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: import type { Prisma } from "@prisma/client";
 3: export async function findPermissionByName(name: string) {
 4:   return prisma.permission.findUnique({ where: { name } });
 5: }
 6: export async function findPermissionById(id: string) {
 7:   return prisma.permission.findUnique({ where: { id } });
 8: }
 9: export async function createPermission(data: Prisma.PermissionCreateInput) {
10:   return prisma.permission.create({ data });
11: }
12: export async function deletePermission(id: string) {
13:   return prisma.permission.delete({ where: { id } });
14: }
15: export async function findAllPermissions() {
16:   return prisma.permission.findMany();
17: }
```

## File: src/repositories/role-permission.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: export async function assignPermissionToRole(
 3:   roleId: string,
 4:   permissionId: string,
 5: ) {
 6:   return prisma.rolePermission.create({
 7:     data: { roleId, permissionId },
 8:   });
 9: }
10: export async function removePermissionFromRole(
11:   roleId: string,
12:   permissionId: string,
13: ) {
14:   return prisma.rolePermission.delete({
15:     where: { roleId_permissionId: { roleId, permissionId } },
16:   });
17: }
18: export async function findRolePermission(roleId: string, permissionId: string) {
19:   return prisma.rolePermission.findUnique({
20:     where: { roleId_permissionId: { roleId, permissionId } },
21:   });
22: }
```

## File: src/repositories/role.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: import type { Prisma } from "@prisma/client";
 3: export async function findRoleByName(name: string) {
 4:   return prisma.role.findUnique({ where: { name } });
 5: }
 6: export async function findRoleById(id: string) {
 7:   return prisma.role.findUnique({
 8:     where: { id },
 9:     include: {
10:       rolePermissions: {
11:         include: { permission: true },
12:       },
13:     },
14:   });
15: }
16: export async function createRole(data: Prisma.RoleCreateInput) {
17:   return prisma.role.create({ data });
18: }
19: export async function deleteRole(id: string) {
20:   return prisma.role.delete({ where: { id } });
21: }
22: export async function findAllRoles() {
23:   return prisma.role.findMany({
24:     include: {
25:       _count: { select: { userRoles: true } },
26:     },
27:   });
28: }
```

## File: src/repositories/session.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: export async function findSessionByToken(token: string) {
 3:   return prisma.session.findUnique({
 4:     where: { token },
 5:     include: { user: true },
 6:   });
 7: }
 8: export async function findSessionsByUserId(userId: string) {
 9:   return prisma.session.findMany({
10:     where: { userId },
11:     orderBy: { createdAt: "desc" },
12:   });
13: }
14: export async function deleteSession(id: string) {
15:   return prisma.session.delete({ where: { id } });
16: }
17: export async function deleteSessionsByUserId(userId: string) {
18:   return prisma.session.deleteMany({ where: { userId } });
19: }
20: export async function deleteExpiredSessions() {
21:   return prisma.session.deleteMany({
22:     where: { expiresAt: { lt: new Date() } },
23:   });
24: }
```

## File: src/repositories/user-role.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: export async function assignRoleToUser(userId: string, roleId: string) {
 3:   return prisma.userRole.create({
 4:     data: { userId, roleId },
 5:   });
 6: }
 7: export async function removeRoleFromUser(userId: string, roleId: string) {
 8:   return prisma.userRole.delete({
 9:     where: { userId_roleId: { userId, roleId } },
10:   });
11: }
12: export async function findUserRole(userId: string, roleId: string) {
13:   return prisma.userRole.findUnique({
14:     where: { userId_roleId: { userId, roleId } },
15:   });
16: }
17: export async function findUserRoles(userId: string) {
18:   return prisma.userRole.findMany({
19:     where: { userId },
20:     include: { role: true },
21:   });
22: }
```

## File: src/repositories/user.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: import type { Prisma } from "@prisma/client";
 3: export async function findUserByEmail(email: string) {
 4:   return prisma.user.findUnique({ where: { email } });
 5: }
 6: export async function findUserById(id: string) {
 7:   return prisma.user.findUnique({ where: { id } });
 8: }
 9: export async function createUser(data: Prisma.UserCreateInput) {
10:   return prisma.user.create({ data });
11: }
12: export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
13:   return prisma.user.update({ where: { id }, data });
14: }
15: export async function deleteUser(id: string) {
16:   return prisma.user.delete({ where: { id } });
17: }
18: export async function findUserWithRoles(id: string) {
19:   return prisma.user.findUnique({
20:     where: { id },
21:     include: {
22:       userRoles: {
23:         include: {
24:           role: {
25:             include: {
26:               rolePermissions: {
27:                 include: { permission: true },
28:               },
29:             },
30:           },
31:         },
32:       },
33:     },
34:   });
35: }
```

## File: src/services/auth.ts

```typescript
 1: import { auth } from "@/lib/auth";
 2: import * as userRepository from "@/repositories/user";
 3: import * as sessionRepository from "@/repositories/session";
 4: import { AuthenticationError, NotFoundError } from "@/lib/errors";
 5: import { headers } from "next/headers";
 6: export async function getCurrentSession() {
 7:   const session = await auth.api.getSession({
 8:     headers: await headers(),
 9:   });
10:   if (!session) {
11:     throw new AuthenticationError();
12:   }
13:   return session;
14: }
15: export async function getUserById(id: string) {
16:   const user = await userRepository.findUserById(id);
17:   if (!user) {
18:     throw new NotFoundError("User not found");
19:   }
20:   return user;
21: }
22: export async function getUserByEmail(email: string) {
23:   return userRepository.findUserByEmail(email);
24: }
25: export async function getUserWithRoles(id: string) {
26:   const user = await userRepository.findUserWithRoles(id);
27:   if (!user) {
28:     throw new NotFoundError("User not found");
29:   }
30:   return user;
31: }
32: export async function getUserSessions(userId: string) {
33:   return sessionRepository.findSessionsByUserId(userId);
34: }
35: export async function revokeSession(sessionId: string) {
36:   return sessionRepository.deleteSession(sessionId);
37: }
38: export async function revokeAllSessions(userId: string) {
39:   return sessionRepository.deleteSessionsByUserId(userId);
40: }
41: export async function updateUserProfile(
42:   id: string,
43:   data: { name?: string; image?: string },
44: ) {
45:   const user = await userRepository.findUserById(id);
46:   if (!user) {
47:     throw new NotFoundError("User not found");
48:   }
49:   return userRepository.updateUser(id, data);
50: }
```

## File: src/services/authorization.ts

```typescript
  1: import * as userRepository from "@/repositories/user";
  2: import * as userRoleRepository from "@/repositories/user-role";
  3: import { AuthorizationError, NotFoundError } from "@/lib/errors";
  4: export async function getUserPermissions(userId: string): Promise<string[]> {
  5:   const user = await userRepository.findUserWithRoles(userId);
  6:   if (!user) {
  7:     throw new NotFoundError("User not found");
  8:   }
  9:   const permissions = new Set<string>();
 10:   for (const userRole of user.userRoles) {
 11:     for (const rolePermission of userRole.role.rolePermissions) {
 12:       permissions.add(rolePermission.permission.name);
 13:     }
 14:   }
 15:   return Array.from(permissions);
 16: }
 17: export async function getUserRoles(userId: string) {
 18:   const userRoles = await userRoleRepository.findUserRoles(userId);
 19:   return userRoles.map((ur) => ur.role);
 20: }
 21: export async function hasPermission(
 22:   userId: string,
 23:   permissionName: string,
 24: ): Promise<boolean> {
 25:   const permissions = await getUserPermissions(userId);
 26:   return permissions.includes(permissionName);
 27: }
 28: export async function hasAnyPermission(
 29:   userId: string,
 30:   permissionNames: string[],
 31: ): Promise<boolean> {
 32:   const permissions = await getUserPermissions(userId);
 33:   return permissionNames.some((name) => permissions.includes(name));
 34: }
 35: export async function hasAllPermissions(
 36:   userId: string,
 37:   permissionNames: string[],
 38: ): Promise<boolean> {
 39:   const permissions = await getUserPermissions(userId);
 40:   return permissionNames.every((name) => permissions.includes(name));
 41: }
 42: export async function hasRole(
 43:   userId: string,
 44:   roleName: string,
 45: ): Promise<boolean> {
 46:   const roles = await getUserRoles(userId);
 47:   return roles.some((role) => role.name === roleName);
 48: }
 49: export async function hasAnyRole(
 50:   userId: string,
 51:   roleNames: string[],
 52: ): Promise<boolean> {
 53:   const roles = await getUserRoles(userId);
 54:   return roles.some((role) => roleNames.includes(role.name));
 55: }
 56: export async function requirePermission(
 57:   userId: string,
 58:   permissionName: string,
 59: ) {
 60:   const allowed = await hasPermission(userId, permissionName);
 61:   if (!allowed) {
 62:     throw new AuthorizationError(
 63:       `Missing required permission: ${permissionName}`,
 64:     );
 65:   }
 66: }
 67: export async function requireAnyPermission(
 68:   userId: string,
 69:   permissionNames: string[],
 70: ) {
 71:   const allowed = await hasAnyPermission(userId, permissionNames);
 72:   if (!allowed) {
 73:     throw new AuthorizationError(
 74:       `Missing required permissions: ${permissionNames.join(", ")}`,
 75:     );
 76:   }
 77: }
 78: export async function requireAllPermissions(
 79:   userId: string,
 80:   permissionNames: string[],
 81: ) {
 82:   const allowed = await hasAllPermissions(userId, permissionNames);
 83:   if (!allowed) {
 84:     throw new AuthorizationError(
 85:       `Missing required permissions: ${permissionNames.join(", ")}`,
 86:     );
 87:   }
 88: }
 89: export async function requireRole(userId: string, roleName: string) {
 90:   const allowed = await hasRole(userId, roleName);
 91:   if (!allowed) {
 92:     throw new AuthorizationError(`Missing required role: ${roleName}`);
 93:   }
 94: }
 95: export async function assignRole(userId: string, roleId: string) {
 96:   const existing = await userRoleRepository.findUserRole(userId, roleId);
 97:   if (existing) {
 98:     return existing;
 99:   }
100:   return userRoleRepository.assignRoleToUser(userId, roleId);
101: }
102: export async function removeRole(userId: string, roleId: string) {
103:   const existing = await userRoleRepository.findUserRole(userId, roleId);
104:   if (!existing) {
105:     throw new NotFoundError("Role assignment not found");
106:   }
107:   return userRoleRepository.removeRoleFromUser(userId, roleId);
108: }
```

## File: src/services/session.ts

```typescript
 1: import * as sessionRepository from "@/repositories/session";
 2: import { NotFoundError } from "@/lib/errors";
 3: export async function getSessionByToken(token: string) {
 4:   const session = await sessionRepository.findSessionByToken(token);
 5:   if (!session) {
 6:     throw new NotFoundError("Session not found");
 7:   }
 8:   return session;
 9: }
10: export async function getUserSessions(userId: string) {
11:   return sessionRepository.findSessionsByUserId(userId);
12: }
13: export async function revokeSession(sessionId: string) {
14:   return sessionRepository.deleteSession(sessionId);
15: }
16: export async function revokeAllUserSessions(userId: string) {
17:   return sessionRepository.deleteSessionsByUserId(userId);
18: }
19: export async function revokeExpiredSessions() {
20:   return sessionRepository.deleteExpiredSessions();
21: }
22: export async function isSessionValid(session: {
23:   expiresAt: Date;
24: }): Promise<boolean> {
25:   return session.expiresAt > new Date();
26: }
```

## File: src/services/user.ts

```typescript
 1: import * as userRepository from "@/repositories/user";
 2: import { NotFoundError } from "@/lib/errors";
 3: export async function getUserById(id: string) {
 4:   const user = await userRepository.findUserById(id);
 5:   if (!user) {
 6:     throw new NotFoundError("User not found");
 7:   }
 8:   return user;
 9: }
10: export async function getUserByEmail(email: string) {
11:   return userRepository.findUserByEmail(email);
12: }
13: export async function createUser(data: { email: string; name?: string }) {
14:   const existing = await userRepository.findUserByEmail(data.email);
15:   if (existing) {
16:     throw new Error("Email already in use");
17:   }
18:   return userRepository.createUser(data);
19: }
20: export async function updateUser(
21:   id: string,
22:   data: { name?: string; image?: string },
23: ) {
24:   const user = await userRepository.findUserById(id);
25:   if (!user) {
26:     throw new NotFoundError("User not found");
27:   }
28:   return userRepository.updateUser(id, data);
29: }
30: export async function deleteUser(id: string) {
31:   const user = await userRepository.findUserById(id);
32:   if (!user) {
33:     throw new NotFoundError("User not found");
34:   }
35:   return userRepository.deleteUser(id);
36: }
```

## File: components.json

```json
 1: {
 2:   "$schema": "https://ui.shadcn.com/schema.json",
 3:   "style": "base-nova",
 4:   "rsc": true,
 5:   "tsx": true,
 6:   "tailwind": {
 7:     "config": "",
 8:     "css": "app/globals.css",
 9:     "baseColor": "neutral",
10:     "cssVariables": true,
11:     "prefix": ""
12:   },
13:   "iconLibrary": "lucide",
14:   "rtl": false,
15:   "aliases": {
16:     "components": "@/components",
17:     "utils": "@/lib/utils",
18:     "ui": "@/components/ui",
19:     "lib": "@/lib",
20:     "hooks": "@/hooks"
21:   },
22:   "menuColor": "default",
23:   "menuAccent": "subtle",
24:   "registries": {}
25: }
```

## File: jest.setup.ts

```typescript
1: import "@testing-library/jest-dom";
```

## File: next.config.ts

```typescript
1: import type { NextConfig } from "next";
2: const nextConfig: NextConfig = {};
3: export default nextConfig;
```

## File: pnpm-workspace.yaml

```yaml
1: allowBuilds:
2:   '@prisma/engines': false
3:   esbuild: false
4:   prisma: false
5:   sharp: set this to true or false
6:   unrs-resolver: set this to true or false
7: ignoredBuiltDependencies:
8:   - sharp
9:   - unrs-resolver
```

## File: postcss.config.mjs

```javascript
1: const config = {
2:   plugins: {
3:     "@tailwindcss/postcss": {},
4:   },
5: };
6: export default config;
```

## File: prisma.config.ts

```typescript
1: import "dotenv/config";
2: import { defineConfig, env } from "prisma/config";
3: export default defineConfig({
4:   datasource: {
5:     url: env("DIRECT_URL") || env("DATABASE_URL"),
6:   },
7: });
```

## File: proxy.ts

```typescript
 1: import { NextRequest, NextResponse } from "next/server";
 2: const publicRoutes = ["/", "/sign-in", "/sign-up"];
 3: const authRoutes = ["/sign-in", "/sign-up"];
 4: function isPublicRoute(pathname: string): boolean {
 5:   return publicRoutes.some(
 6:     (route) => pathname === route || pathname.startsWith(route + "/"),
 7:   );
 8: }
 9: function isAuthRoute(pathname: string): boolean {
10:   return authRoutes.some(
11:     (route) => pathname === route || pathname.startsWith(route + "/"),
12:   );
13: }
14: function hasSessionCookie(request: NextRequest): boolean {
15:   const cookies = request.cookies;
16:   return cookies
17:     .getAll()
18:     .some(
19:       (cookie) =>
20:         cookie.name.startsWith("better-auth.") ||
21:         cookie.name.startsWith("__Secure-better-auth."),
22:     );
23: }
24: export async function proxy(request: NextRequest) {
25:   const { pathname } = request.nextUrl;
26:   if (pathname.startsWith("/api/auth")) {
27:     return NextResponse.next();
28:   }
29:   if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
30:     return NextResponse.next();
31:   }
32:   const hasSession = hasSessionCookie(request);
33:   if (!hasSession && !isPublicRoute(pathname)) {
34:     const signInUrl = new URL("/sign-in", request.url);
35:     signInUrl.searchParams.set("callbackURL", pathname);
36:     return NextResponse.redirect(signInUrl);
37:   }
38:   if (hasSession && isAuthRoute(pathname)) {
39:     return NextResponse.redirect(new URL("/", request.url));
40:   }
41:   return NextResponse.next();
42: }
43: export const config = {
44:   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
45: };
```

## File: skills-lock.json

```json
 1: {
 2:   "version": 1,
 3:   "skills": {
 4:     "better-auth-best-practices": {
 5:       "source": "better-auth/skills",
 6:       "sourceType": "github",
 7:       "skillPath": "better-auth/best-practices/SKILL.md",
 8:       "computedHash": "e8b46af23c6b1bc7aefdae3cf816368058c05e46eadb9bdca4f744b17d05a866"
 9:     },
10:     "better-auth-security-best-practices": {
11:       "source": "better-auth/skills",
12:       "sourceType": "github",
13:       "skillPath": "security/SKILL.md",
14:       "computedHash": "087c1094fa5f1834af4785c058dcc8c9abe4c1321b853883c76ea46c93a21cfe"
15:     },
16:     "create-auth": {
17:       "source": "better-auth/skills",
18:       "sourceType": "github",
19:       "skillPath": "better-auth/create-auth/SKILL.md",
20:       "computedHash": "cf5d2c852c66269dc350dec0db8cfb07634a2310aee5be1bfd7e643dca72f22e"
21:     },
22:     "email-and-password-best-practices": {
23:       "source": "better-auth/skills",
24:       "sourceType": "github",
25:       "skillPath": "better-auth/emailAndPassword/SKILL.md",
26:       "computedHash": "7786d722fa682b3d6a99793e73a9d51b59becefa595676134a993020633e068f"
27:     },
28:     "organization-best-practices": {
29:       "source": "better-auth/skills",
30:       "sourceType": "github",
31:       "skillPath": "better-auth/organization/SKILL.md",
32:       "computedHash": "f8ea75816a22992c1601c21c0ee3ff8209798065072d76aec3e31eea8295af57"
33:     },
34:     "two-factor-authentication-best-practices": {
35:       "source": "better-auth/skills",
36:       "sourceType": "github",
37:       "skillPath": "better-auth/twoFactor/SKILL.md",
38:       "computedHash": "cfe69aad10d4d7b397fbc101630afd9361b385b5f6f83056f33f36ab3b736fcb"
39:     }
40:   }
41: }
```

## File: .github/workflows/ci.yml

```yaml
 1: name: CI
 2: on:
 3:   push:
 4:     branches: [master, dev]
 5:   pull_request:
 6:     branches: [master, dev]
 7: jobs:
 8:   quality:
 9:     name: Quality Checks
10:     runs-on: ubuntu-latest
11:     steps:
12:       - name: Checkout
13:         uses: actions/checkout@v4
14:       - name: Setup pnpm
15:         uses: pnpm/action-setup@v4
16:       - name: Setup Node.js
17:         uses: actions/setup-node@v4
18:         with:
19:           node-version: 22
20:           cache: pnpm
21:       - name: Install dependencies
22:         run: pnpm install --frozen-lockfile
23:       - name: TypeScript check
24:         run: pnpm tsc --noEmit
25:       - name: ESLint check
26:         run: pnpm lint
27:       - name: Dead code check
28:         run: pnpm knip
29:   test:
30:     name: Tests
31:     runs-on: ubuntu-latest
32:     steps:
33:       - name: Checkout
34:         uses: actions/checkout@v4
35:       - name: Setup pnpm
36:         uses: pnpm/action-setup@v4
37:       - name: Setup Node.js
38:         uses: actions/setup-node@v4
39:         with:
40:           node-version: 22
41:           cache: pnpm
42:       - name: Install dependencies
43:         run: pnpm install --frozen-lockfile
44:       - name: Run tests
45:         run: pnpm test
46:   build:
47:     name: Build
48:     runs-on: ubuntu-latest
49:     steps:
50:       - name: Checkout
51:         uses: actions/checkout@v4
52:       - name: Setup pnpm
53:         uses: pnpm/action-setup@v4
54:       - name: Setup Node.js
55:         uses: actions/setup-node@v4
56:         with:
57:           node-version: 22
58:           cache: pnpm
59:       - name: Install dependencies
60:         run: pnpm install --frozen-lockfile
61:       - name: Build
62:         run: pnpm build
63:         env:
64:           DATABASE_URL: "postgresql://placeholder:placeholder@localhost:5432/placeholder"
```

## File: .kilo/AGENTS.md

```markdown
1: # AI Development Guide
2:
3: > **Redirect to canonical file.** The tool-agnostic, canonical AI instructions for this repository live at the repository root in `AGENTS.md`. This file is kept only as a Kilo-specific load path; its content is maintained in lockstep with `AGENTS.md`.
4: >
5: > For tool compatibility notes and loading strategies, see `docs/AI Instructions.md`.
6:
7: ---
8:
9: # Canonical Source
10:
11: Please read `AGENTS.md` at the repository root. Everything below this line is a historical mirror that is no longer the source of truth.
12:
13: ---
14:
15: # Mission
16:
17: Build maintainable, production-grade software.
18:
19: Readable code is preferred over clever code.
20:
21: Correctness is preferred over speed.
22:
23: Consistency is preferred over personal preference.
24:
25: ---
26:
27: # Technology Stack
28:
29: - Next.js 16
30: - React 19
31: - TypeScript
32: - Tailwind CSS v4
33: - shadcn/ui
34: - Prisma ORM
35: - PostgreSQL
36: - Neon Database
37: - Zod
38: - React Hook Form
39:
40: ---
41:
42: ## Architecture Rules
43:
44: Always follow this architecture:
45:
46: ` 47: UI
 48: ↓
 49: 
 50: Actions / Routes
 51: ↓
 52: 
 53: Services
 54: 
 55: ↓
 56: 
 57: Repositories
 58: 
 59: ↓
 60: 
 61: Database
 62:`
63:
64: Business logic must never exist inside UI components.
65:
66: Database access must never happen directly inside UI components.
67:
68: ---
69:
70: # Before Writing Code
71:
72: Always understand:
73:
74: - Existing architecture
75: - Current conventions
76: - File organization
77: - Naming conventions
78: - Existing abstractions
79:
80: Never introduce a second pattern when one already exists.
81:
82: ---
83:
84: # Component Rules
85:
86: Components should:
87:
88: - Have a single responsibility.
89: - Stay small.
90: - Prefer composition over inheritance.
91: - Avoid duplicated logic.
92: - Avoid unnecessary props.
93:
94: ---
95:
96: # TypeScript Rules
97:
98: - Never use `any`.
99: - Prefer inferred types.
100: - Use Zod for runtime validation.
101: - Export reusable types.
102: - Keep types close to the feature.
103:
104: ---
105:
106: # Next.js Rules
107:
108: - Prefer Server Components.
109: - Use Client Components only when required.
110: - Keep business logic outside UI.
111: - Use Server Actions when appropriate.
112: - Keep routes thin.
113:
114: ---
115:
116: # UI Rules
117:
118: Use existing shadcn/ui components whenever appropriate.
119:
120: Prefer:
121:
122: - Accessible components
123: - Consistent spacing
124: - Responsive layouts
125: - Semantic HTML
126:
127: Avoid generic AI-generated layouts.
128:
129: Every UI should feel intentional.
130:
131: ---
132:
133: # Design Quality Rules
134:
135: Every UI must follow the anti-slop rules defined in `docs/Design Rules.md`.
136:
137: Key rules:
138:
139: - Set the three dials (Design Variance, Motion Intensity, Visual Density) before layout.
140: - One accent color per page. No purple-to-blue gradients.
141: - Body text: `max-w-[65ch]`, `text-wrap: pretty`.
142: - Headlines: `text-wrap: balance`.
143: - Interactive elements: 40x40px minimum hit area, `scale(0.96)` press feedback.
144: - Shadows over borders. Three-layer shadow composition.
145: - Always honor `prefers-reduced-motion`.
146: - Break the uniform grid intentionally.
147: - No cards nested inside cards.
148: - No em-dashes or en-dashes in visible text.
149:
150: Flag these anti-patterns immediately:
151:
152: - Inter used for everything without justification.
153: - Purple-to-blue gradient backgrounds.
154: - Uniform equal spacing everywhere.
155: - Default Tailwind colors used without customization.
156:
157: Full rules: `docs/Design Rules.md`
158:
159: ---
160:
161: # Styling Rules
162:
163: - Use Tailwind consistently.
164: - Reuse design tokens from globals.css.
165: - Avoid arbitrary values unless justified.
166: - Maintain consistent spacing.
167: - Prefer shadows over borders for visual separation.
168:
169: ---
170:
171: # Performance
172:
173: Always optimize for:
174:
175: - Small bundles
176: - Lazy loading
177: - Minimal hydration
178: - Server rendering
179: - Efficient data fetching
180:
181: ---
182:
183: # Documentation
184:
185: Whenever architecture changes:
186:
187: - Update documentation.
188: - Keep README accurate.
189: - Document new conventions.
190:
191: ---
192:
193: # Before Finishing
194:
195: Verify:
196:
197: - TypeScript passes
198: - ESLint passes
199: - Build succeeds
200: - No dead code
201: - No duplicated logic
202: - Naming is consistent
203: - Imports are clean
204: - Documentation updated if required
205:
206: If something can be simplified without changing behavior, simplify it.
207:
208: ---
209:
210: # Philosophy
211:
212: Readable code is more valuable than clever code.
213:
214: Consistency is more valuable than personal preference.
215:
216: Long-term maintainability is more important than short-term speed.
217:
218: # Mission
219:
220: Build maintainable, production-grade software.
221:
222: Readable code is preferred over clever code.
223:
224: Correctness is preferred over speed.
225:
226: Consistency is preferred over personal preference.
227:
228: ---
229:
230: # Technology Stack
231:
232: - Next.js 16
233: - React 19
234: - TypeScript
235: - Tailwind CSS v4
236: - shadcn/ui
237: - Prisma ORM
238: - PostgreSQL
239: - Neon Database
240: - Zod
241: - React Hook Form
242:
243: ---
244:
245: ## Architecture Rules
246:
247: Always follow this architecture:
248:
249: `250: UI
251: ↓
252: 
253: Actions / Routes
254: ↓
255: 
256: Services
257: 
258: ↓
259: 
260: Repositories
261: 
262: ↓
263: 
264: Database
265:`
266:
267: Business logic must never exist inside UI components.
268:
269: Database access must never happen directly inside UI components.
270:
271: ---
272:
273: # Before Writing Code
274:
275: Always understand:
276:
277: - Existing architecture
278: - Current conventions
279: - File organization
280: - Naming conventions
281: - Existing abstractions
282:
283: Never introduce a second pattern when one already exists.
284:
285: ---
286:
287: # Component Rules
288:
289: Components should:
290:
291: - Have a single responsibility.
292: - Stay small.
293: - Prefer composition over inheritance.
294: - Avoid duplicated logic.
295: - Avoid unnecessary props.
296:
297: ---
298:
299: # TypeScript Rules
300:
301: - Never use `any`.
302: - Prefer inferred types.
303: - Use Zod for runtime validation.
304: - Export reusable types.
305: - Keep types close to the feature.
306:
307: ---
308:
309: # Next.js Rules
310:
311: - Prefer Server Components.
312: - Use Client Components only when required.
313: - Keep business logic outside UI.
314: - Use Server Actions when appropriate.
315: - Keep routes thin.
316:
317: ---
318:
319: # UI Rules
320:
321: Use existing shadcn/ui components whenever appropriate.
322:
323: Prefer:
324:
325: - Accessible components
326: - Consistent spacing
327: - Responsive layouts
328: - Semantic HTML
329:
330: Avoid generic AI-generated layouts.
331:
332: Every UI should feel intentional.
333:
334: ---
335:
336: # Design Quality Rules
337:
338: Every UI must follow the anti-slop rules defined in `docs/Design Rules.md`.
339:
340: Key rules:
341:
342: - Set the three dials (Design Variance, Motion Intensity, Visual Density) before layout.
343: - One accent color per page. No purple-to-blue gradients.
344: - Body text: `max-w-[65ch]`, `text-wrap: pretty`.
345: - Headlines: `text-wrap: balance`.
346: - Interactive elements: 40x40px minimum hit area, `scale(0.96)` press feedback.
347: - Shadows over borders. Three-layer shadow composition.
348: - Always honor `prefers-reduced-motion`.
349: - Break the uniform grid intentionally.
350: - No cards nested inside cards.
351: - No em-dashes or en-dashes in visible text.
352:
353: Flag these anti-patterns immediately:
354:
355: - Inter used for everything without justification.
356: - Purple-to-blue gradient backgrounds.
357: - Uniform equal spacing everywhere.
358: - Default Tailwind colors used without customization.
359:
360: Full rules: `docs/Design Rules.md`
361:
362: ---
363:
364: # Styling Rules
365:
366: - Use Tailwind consistently.
367: - Reuse design tokens from globals.css.
368: - Avoid arbitrary values unless justified.
369: - Maintain consistent spacing.
370: - Prefer shadows over borders for visual separation.
371:
372: ---
373:
374: # Performance
375:
376: Always optimize for:
377:
378: - Small bundles
379: - Lazy loading
380: - Minimal hydration
381: - Server rendering
382: - Efficient data fetching
383:
384: ---
385:
386: # Documentation
387:
388: Whenever architecture changes:
389:
390: - Update documentation.
391: - Keep README accurate.
392: - Document new conventions.
393:
394: ---
395:
396: # Before Finishing
397:
398: Verify:
399:
400: - TypeScript passes
401: - ESLint passes
402: - Build succeeds
403: - No dead code
404: - No duplicated logic
405: - Naming is consistent
406: - Imports are clean
407: - Documentation updated if required
408:
409: If something can be simplified without changing behavior, simplify it.
410:
411: ---
412:
413: # Philosophy
414:
415: Readable code is more valuable than clever code.
416:
417: Consistency is more valuable than personal preference.
418:
419: Long-term maintainability is more important than short-term speed.
```

## File: docs/API/Database.md

```markdown
1: # Database
2:
3: PostgreSQL on Neon. Prisma ORM. Repositories are the only layer that talks to Prisma.
4:
5: ## Principles
6:
7: Simple, normalized, scalable, easy to maintain. **No business logic in the database.**
8:
9: ## Access Flow
10:
11: `12: UI → Actions → Services → Repositories → Prisma → PostgreSQL
13:`
14:
15: ## Schema
16:
17: ### User
18:
19: | Field | Type | Notes |
20: | --------- | -------- | --------- |
21: | id | String | PK (CUID) |
22: | email | String | Unique |
23: | name | String? | Optional |
24: | image | String? | Optional |
25: | createdAt | DateTime | — |
26: | updatedAt | DateTime | — |
27:
28: ## Commands
29:
30: `bash
31: pnpm prisma migrate dev     # create + apply migration
32: pnpm prisma generate        # generate Prisma Client
33: pnpm prisma studio          # open Prisma Studio
34: `
35:
36: Never modify production DBs manually. Always version-control migrations.
37:
38: ## Naming
39:
40: - Models: singular PascalCase.
41: - Fields: camelCase.
42: - Relations: explicit names where needed.
43:
44: ## Future Models (added when needed)
45:
46: Session, Account, VerificationToken, Role, Permission, Notification, AuditLog.
47:
48: ## Performance
49:
50: Add indexes only when justified. Avoid unnecessary joins. Paginate large results. Select only required fields.
51:
52: ## Security
53:
54: Never expose password hashes, secrets, or internal identifiers without need. Validate input before any DB op.
```

## File: docs/deliverables/Quickstart.md

```markdown
1: # Quickstart
2:
3: Get up and running with the design skill system.
4:
5: ---
6:
7: # For Developers
8:
9: 1. Read `docs/meta/Start Here.md`.
10: 2. Read `docs/rules/Architecture and Stack.md`.
11: 3. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
12: 4. Bookmark `docs/deliverables/Design Skills Cheat Sheet.md`.
13:
14: ---
15:
16: # For AI Agents (tool-agnostic)
17:
18: 1. Read the project-level instructions file at the repository root:
19: - `AGENTS.md` (preferred, supported by most tools including Cursor, Claude Code, Aider, Codex CLI, and OpenCode).
20: - If your tool requires a different filename (e.g. `CLAUDE.md` for Claude Code, `.cursorrules` for Cursor, `.github/copilot-instructions.md` for Copilot), read whichever file your tool actually loads — they are kept in sync with `AGENTS.md`.
21: 2. Read `docs/rules/Architecture and Stack.md`.
22: 3. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
23: 4. Read `docs/skills/Taste Skill Project.md`.
24: 5. Read `docs/meta/CONVENTIONS.md`.
25:
26: ---
27:
28: # Quick Reference
29:
30: ## Before Building
31:
32: - Set three dials.
33: - Pick palette.
34: - Define hero thesis.
35: - Read existing patterns.
36:
37: ## While Building
38:
39: - Check anti-slop patterns.
40: - Apply micro-interaction rules.
41: - Follow typography rules.
42: - Use design tokens.
43:
44: ## Before Shipping
45:
46: - Run pre-flight checklist.
47: - Run audit pipeline.
48: - Update documentation.
49: - Verify accessibility.
```

## File: docs/Development/Auth Doctor.md

```markdown
1: # Auth Doctor
2:
3: Static analysis CLI for auth and security vulnerabilities in Next.js apps. Middleware-aware: routes gated by an auth middleware matcher are not false-flagged.
4:
5: ## Install / Run
6:
7: `bash
 8: npx auth-doctor          # or: npx auth-doctor ./src
 9: npm i -g auth-doctor     # optional
10: `
11:
12: ## CLI
13:
14: | Flag | Purpose |
15: | --------- | --------------------- |
16: | `[path]` | Target dir |
17: | `--json` | CI mode |
18: | `--no-ai` | Skip AI hand-off menu |
19:
20: ## Detects
21:
22: Unprotected routes / Server Actions, IDOR / missing ownership checks, hardcoded secrets, `NEXT_PUBLIC_` leaks, JWT without signature verification, localStorage sessions, missing rate limiting on auth endpoints, open redirects, sensitive field exposure, missing CSRF protection.
23:
24: ## Output
25:
26: - Scored health report (0-100) in terminal.
27: - `.auth-doctor-report.json` in project root.
28:
29: ## Workflows
30:
31: `bash
32: npx auth-doctor              # after auth changes / before deploy / after adding routes
33: npx auth-doctor --json --no-ai   # CI gate
34: `
35:
36: ## Best Practices
37:
38: Run after every auth change. Never hardcode secrets — use `@t3-oss/env-nextjs`. Store tokens in httpOnly cookies, not localStorage. Add CSRF to state-mutating endpoints. Rate-limit login, password reset, and OTP endpoints. Ensure `middleware.ts` has a proper `matcher` config to avoid false positives.
39:
40: ## Requirements
41:
42: Node 18+.
43:
44: ## References
45:
46: [npm](https://www.npmjs.com/package/auth-doctor) · [GitHub](https://github.com/noctisnovastudio/auth-doctor)
```

## File: docs/Development/Dead Doctor.md

```markdown
1: # Dead Doctor
2:
3: Static analysis CLI. Finds dead code, unused exports, ghost pages, zombie dependencies, leftover commented blocks.
4:
5: ## Install / Run
6:
7: `bash
 8: npx dead-doctor          # or: npx dead-doctor ./src
 9: npm i -g dead-doctor     # optional
10: `
11:
12: ## CLI
13:
14: | Flag | Purpose |
15: | --------- | --------------------- |
16: | `[path]` | Target dir |
17: | `--json` | CI mode |
18: | `--no-ai` | Skip AI hand-off menu |
19:
20: ## Detects
21:
22: Dead files (import-graph BFS), unused exports, duplicate files, dead Next.js pages, unused imports, empty files, zombie deps in `package.json`, large commented blocks (8+ lines), unreachable code after `return`/`throw`.
23:
24: ## Cleanup Scripts
25:
26: AI menu can generate reviewable cleanup scripts: `dead-doctor-cleanup.sh`, `.ps1`, `.md`. Nothing is auto-deleted.
27:
28: ## Output
29:
30: - Scored health report (0-100) in terminal.
31: - `.dead-doctor-report.json` in project root.
32: - Optional cleanup scripts (via AI menu).
33:
34: ## Workflows
35:
36: `bash
37: npx dead-doctor              # before deploy / after refactor / monthly
38: npx dead-doctor --json --no-ai   # CI gate
39: `
40:
41: ## Best Practices
42:
43: Run before deploys to shrink bundles; address zombie deps first; pair with `npx knip` (already configured) for broader coverage. Never run cleanup scripts blindly.
44:
45: ## Requirements
46:
47: Node 18+.
48:
49: ## References
50:
51: [npm](https://www.npmjs.com/package/dead-doctor) · [GitHub](https://github.com/noctisnovastudio/dead-doctor)
```

## File: docs/Development/Neat Doctor.md

```markdown
1: # Neat Doctor
2:
3: Code structure analyser. Detects circular deps, orphan files, naming drift, god files, deep imports. Generates `git mv` migration scripts.
4:
5: ## Install / Run
6:
7: `bash
 8: npx neat-doctor           # or: npx neat-doctor ./src
 9: npm i -g neat-doctor      # optional
10: `
11:
12: ## CLI
13:
14: | Flag | Purpose |
15: | ------------- | --------------------------- |
16: | `[path]` | Target dir (default: cwd) |
17: | `--tree` | Annotated ASCII tree |
18: | `--recommend` | Recommended clean structure |
19: | `--depth <n>` | Tree depth (default 4) |
20: | `--json` | CI mode |
21: | `--no-ai` | Skip AI hand-off menu |
22:
23: ## Detects
24:
25: **Structure:** root chaos, duplicate concept folders, deep nesting (>5), fat folders (18+), misplaced files, naming mix, missing barrels, scattered config, empty dirs.
26:
27: **Dependency graph:** circular deps (Tarjan SCC), orphan files, god files (400+ lines / 30+ imports), deep `../../../` imports.
28:
29: ## Output
30:
31: - Scored health report (0-100) in terminal.
32: - `.neat-doctor-report.json` in project root.
33: - Reviewable `git mv` migration scripts (via AI menu).
34:
35: ## Workflows
36:
37: `bash
38: npx neat-doctor                  # after major refactor
39: npx neat-doctor --tree           # share with new devs
40: npx neat-doctor --recommend      # plan restructuring
41: npx neat-doctor --json --no-ai   # CI gate
42: `
43:
44: ## Best Practices
45:
46: Run after refactors; use `--tree` to share structure; address circular deps first (breaks tree-shaking); prefer path aliases; gate CI on score.
47:
48: ## Requirements
49:
50: Node 18+.
51:
52: ## References
53:
54: [npm](https://www.npmjs.com/package/neat-doctor) · [GitHub](https://github.com/noctisnovastudio/neat-doctor)
```

## File: docs/Development/NoctisNova Doctor Suite.md

```markdown
1: # NoctisNova Doctor Suite
2:
3: Open-source static analysis CLIs for TypeScript and Next.js. Zero-install, zero-config, zero-telemetry.
4:
5: ## Tools
6:
7: | Tool | Focus | Report |
8: | ------------------------------- | -------------------------- | -------------------------- |
9: | [ORM Doctor](ORM%20Doctor.md) | DB / ORM bottlenecks | `.orm-doctor-report.json` |
10: | [Auth Doctor](Auth%20Doctor.md) | Auth & security vulns | `.auth-doctor-report.json` |
11: | [Dead Doctor](Dead%20Doctor.md) | Dead code & unused exports | `.dead-doctor-report.json` |
12: | [Neat Doctor](Neat%20Doctor.md) | Code structure & dep graph | `.neat-doctor-report.json` |
13:
14: All: Node 18+, MIT, no telemetry, scored health report (0-100), JSON output, `--no-ai` to skip hand-off menu.
15:
16: ## Quick Start
17:
18: `bash
19: npx orm-doctor
20: npx auth-doctor
21: npx dead-doctor
22: npx neat-doctor
23: 
24: # target dir / CI / no AI menu
25: npx orm-doctor ./src
26: npx orm-doctor --json
27: npx orm-doctor --no-ai
28: `
29:
30: ## Capability Matrix
31:
32: | | ORM | Auth | Dead | Neat |
33: | --------------------------------------------- | --- | ---- | ---- | ---- |
34: | N+1 / indexes / raw SQL | ✓ | | | |
35: | Unprotected routes / hardcoded secrets / CSRF | | ✓ | | |
36: | Dead files / unused exports / zombie deps | | | ✓ | |
37: | Circular deps / structure / god files | | | | ✓ |
38: | JSON output | ✓ | ✓ | ✓ | ✓ |
39: | AI menu | ✓ | ✓ | ✓ | ✓ |
40:
41: ## When to Use
42:
43: | Scenario | Tool |
44: | --------------------------------------------- | ----------- |
45: | New DB feature | ORM Doctor |
46: | After auth changes / before deploy (security) | Auth Doctor |
47: | Before deploy / monthly cleanup | Dead Doctor |
48: | After major refactor | Neat Doctor |
49: | Full health check | All four |
50:
51: ## Recommended Order
52:
53: 1. `npx dead-doctor` — remove dead code first.
54: 2. `npx neat-doctor` — fix structure & circular deps.
55: 3. `npx orm-doctor` — audit DB layer.
56: 4. `npx auth-doctor` — verify security.
57:
58: ## Requirements
59:
60: Node 18+, run from project root.
61:
62: ## References
63:
64: [noctisnova.com/tools](https://noctisnova.com/tools)
```

## File: docs/Development/ORM Doctor.md

```markdown
1: # ORM Doctor
2:
3: Static analysis CLI for ORM and database bottlenecks in TypeScript / Prisma / Drizzle codebases.
4:
5: ## Install / Run
6:
7: `bash
 8: npx orm-doctor           # or: npx orm-doctor ./src
 9: npm i -g orm-doctor      # optional
10: `
11:
12: ## CLI
13:
14: | Flag | Purpose |
15: | --------- | --------------------- |
16: | `[path]` | Target dir |
17: | `--json` | CI mode |
18: | `--no-ai` | Skip AI hand-off menu |
19:
20: ## Detects
21:
22: N+1 queries, missing indexes, unsafe raw SQL, unbounded queries (`findMany()` without `take`/cursor), transaction misuse, large query results.
23:
24: ## Output
25:
26: - Scored health report (0-100) in terminal.
27: - `.orm-doctor-report.json` in project root.
28:
29: ## Workflows
30:
31: `bash
32: npx orm-doctor              # before new DB feature / after schema change
33: npx orm-doctor --json --no-ai   # CI gate
34: `
35:
36: ## Best Practices
37:
38: Use `take` or cursor pagination on `findMany()`. Add indexes for filtered/joined columns. Prefer `select` over returning full rows. Wrap multi-write workflows in `prisma.$transaction`. Enable Prisma query logging during dev.
39:
40: ## Requirements
41:
42: Node 18+.
43:
44: ## References
45:
46: [npm](https://www.npmjs.com/package/orm-doctor) · [GitHub](https://github.com/noctisnovastudio/orm-doctor)
```

## File: docs/flows/Install and Load.md

```markdown
1: # Install and Load
2:
3: How to install and load design skills in the project.
4:
5: ---
6:
7: # Skill Installation
8:
9: ## Taste Skill
10:
11: `bash
12: npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
13: `
14:
15: ## Impeccable
16:
17: `bash
18: npx impeccable install
19: `
20:
21: Then in your AI coding tool:
22:
23: `24: /impeccable init
25:`
26:
27: ## Vercel Web Design Guidelines
28:
29: `bash
30: npx skills add vercel-labs/agent-skills --skill web-design-guidelines
31: `
32:
33: ## UI/UX Pro Max
34:
35: `bash
36: npm install -g ui-ux-pro-max-cli
37: uipro init --ai cursor
38: `
39:
40: ---
41:
42: # Loading Skills
43:
44: Skills are loaded in this order (tool-agnostic):
45:
46: 1. **Project-level instructions** — read `AGENTS.md` at the repository root.
47: - If your tool does not auto-detect `AGENTS.md`, point it to the file explicitly or to a tool-specific mirror (e.g. `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`). These mirrors should be kept identical to `AGENTS.md`.
48: - For MCP-based agents, use the filesystem MCP tool to read `AGENTS.md`.
49: 2. `docs/rules/` (architecture and design rules).
50: 3. `docs/skills/` (design skill references).
51: 4. `docs/flows/` (workflows).
52: 5. `docs/audits/` (quality checks).
53:
54: ---
55:
56: # Skill Conflict Resolution
57:
58: When skills conflict:
59:
60: 1. Project rules in `docs/rules/` take precedence.
61: 2. Vercel guidelines for accessibility and performance.
62: 3. Taste Skill for aesthetic direction.
63: 4. Impeccable for anti-pattern detection.
64: 5. MIFB for micro-interactions.
65:
66: ---
67:
68: # Verification
69:
70: After installing skills:
71:
72: 1. Run the audit pipeline.
73: 2. Verify no new conflicts.
74: 3. Update documentation if rules change.
```

## File: docs/rules/Architecture and Stack.md

```markdown
1: # Architecture and Stack
2:
3: ## Layers
4:
5: ` 6: UI (Server Components) → Actions/Routes → Services → Repositories → Database (Prisma + Neon)
 7:`
8:
9: ## Responsibilities
10:
11: | Layer | Does | Must NOT |
12: | ------------------ | ------------------------------------------------------------ | ---------------------------------- |
13: | **UI** | Render, user interaction, state display | Business logic, direct DB access |
14: | **Actions/Routes** | Request handling, auth, Zod validation, call services | Business logic, direct repo access |
15: | **Services** | Business rules, workflows, multi-repo coordination | UI dependency, HTTP details |
16: | **Repositories** | DB queries, CRUD, persistence. Only layer that calls Prisma. | Business logic |
17: | **Database** | Prisma models, migrations, PostgreSQL on Neon | App logic |
18:
19: ## Stack Integration
20:
21: - **Next.js 16:** Server Components by default. Client only for state/browser APIs/events. Server Actions for mutations, Route Handlers for APIs, Metadata API for SEO.
22: - **Prisma + Neon:** serverless PG via `@prisma/adapter-neon`, WebSocket via `ws`, singleton client in `lib/db.ts`. Never instantiate Prisma in components.
23: - **Zod:** validate all external input. Type inference from schemas. Env validation via `@t3-oss/env-nextjs`.
24: - **Tailwind v4:** design tokens as CSS custom properties in `globals.css`, oklch color space, dark mode via `.dark` class, `cn()` via `clsx` + `tailwind-merge`.
25:
26: ## Rules
27:
28: - Business logic never in UI. DB access never in UI.
29: - Validate every external input with Zod.
30: - No `any`. Prefer inferred types.
31: - Server Components by default. Thin routes; delegate to services.
32: - Never modify production DBs manually. Use Prisma migrations.
33: - Never expose secrets, password hashes, or internal identifiers.
34:
35: ## Data Flow
36:
37: Request → Zod validation → Action/Route → Service → Repository → Prisma → PostgreSQL → back up the stack to Response.
```

## File: docs/AI Instructions.md

```markdown
1: # AI Instructions
2:
3: > **Tool Compatibility (generalized):** Applies to any AI coding assistant. Verified to work with ChatGPT, Codex, Claude Code, Cursor, OpenCode, GitHub Copilot, Aider, Windsurf, Continue.dev, Cline, Roo Code, Tabnine, and any agent supporting the `AGENTS.md` convention or MCP tool servers.
4:
5: ---
6:
7: # Loading
8:
9: 1. **Preferred:** read `AGENTS.md` at the repo root (auto-detected by Cursor, Claude Code, Aider, Codex CLI, OpenCode).
10: 2. **Tool-specific mirrors** (kept identical to `AGENTS.md`): `CLAUDE.md` (Claude Code), `.cursor/rules/AGENTS.md` or `.cursorrules` (Cursor), `.github/copilot-instructions.md` (Copilot), `.windsurfrules` (Windsurf), `.clinerules` (Cline/Roo), `.continuerc.json` reference (Continue).
11: 3. **MCP agents:** use filesystem MCP to read `AGENTS.md` and `docs/`.
12:
13: > **Canonical location:** `AGENTS.md` at repo root. All tool-specific wrappers must be thin references to it.
14:
15: ---
16:
17: # Objective
18:
19: Generate production-quality code following the project's architecture and standards. Maintainability over speed.
20:
21: **Always:** read existing code first, reuse utilities, respect architecture, prefer composition, keep types strong.
22: **Never:** add unnecessary deps, duplicate logic, ignore lint, disable TypeScript, mix business logic with UI.
23:
24: ---
25:
26: # Architecture
27:
28: `29: UI → Actions → Services → Repositories → Database
30:`
31:
32: Business logic only in Services. Data access only in Repositories.
33:
34: ---
35:
36: # Components & Next.js
37:
38: - Small, single responsibility, reusable, props-driven, no side effects.
39: - **Server Components by default.** Client only for: state, browser APIs, event handlers.
40: - Thin routes, Server Actions when appropriate.
41:
42: ---
43:
44: # TypeScript
45:
46: - No `any`. Prefer inference. Zod for runtime validation. Export reusable types close to feature.
47:
48: ---
49:
50: # Styling & Design
51:
52: - Tailwind v4 + shadcn/ui + CSS variables from `globals.css`. No inline styles, no hardcoded colors.
53: - Read `docs/Design Rules.md` before any UI. Key rules: three dials before layout, one accent color, `max-w-[65ch]` body / `text-wrap: balance` headlines, 40×40 hit areas, `scale(0.96)` press feedback, shadows over borders, honor `prefers-reduced-motion`, no em-dashes/en-dashes in UI text.
54:
55: ---
56:
57: # Database
58:
59: Prisma only through repositories. Never query DB from components.
60:
61: ---
62:
63: # Performance
64:
65: Server rendering, lazy loading, streaming, partial rendering, minimal client JS.
66:
67: ---
68:
69: # Error Handling
70:
71: Validate inputs, return meaningful errors, handle edge cases, fail gracefully.
72:
73: ---
74:
75: # Documentation
76:
77: When architecture/conventions/folders/workflows change → update the docs.
78:
79: ---
80:
81: # Code Review Checklist
82:
83: - [ ] Builds, ESLint passes, TypeScript passes
84: - [ ] No duplicated logic, no dead code
85: - [ ] Architecture respected, no business logic in UI
86: - [ ] No anti-slop design patterns (see `docs/Design Rules.md`)
87: - [ ] UI follows three dials, press states, hit areas
88: - [ ] Docs updated
89:
90: ---
91:
92: # Philosophy
93:
94: Readable > clever. Consistency > personal style. Long-term maintainability > short-term speed.
```

## File: docs/Authentication.md

```markdown
1: # Authentication
2:
3: Better Auth integration with RBAC.
4:
5: ## Why Better Auth
6:
7: Open-source, self-hosted, no vendor lock-in. Built-in Prisma adapter. DB-backed sessions with cookie cache. Email/password + OAuth + plugin ecosystem. Strong TS support.
8:
9: ## Flow
10:
11: `12: Actions → Services → Repositories → Better Auth → Prisma → PostgreSQL (Neon)
13:`
14:
15: - **Actions:** validate input, invoke services, return structured results.
16: - **Services:** business logic + authorization decisions.
17: - **Repositories:** persistence only.
18: - **Better Auth:** auth infrastructure only — app talks to it through services/repos.
19:
20: ## Domain Separation
21:
22: - **Auth layer (Better Auth):** sessions, accounts, verification, password reset, email verification.
23: - **Domain layer (app):** user, roles, permissions, user-role, role-permission.
24:
25: App never talks to Better Auth directly except via configured clients.
26:
27: ## RBAC
28:
29: One user → many roles (many-to-many). Permissions inherited from roles. Architecture supports future direct user permissions.
30:
31: Default roles: Student, Instructor, Admin.
32:
33: ## File Map
34:
35: `36: src/lib/
37:   auth.ts            # Better Auth server config
38:   auth-client.ts     # Better Auth React client
39:   db.ts              # Prisma client singleton
40:   env.ts             # Zod-validated env vars
41:   errors/            # Typed domain errors
42:   validations/       # Zod schemas
43: src/repositories/
44:   user.ts, role.ts, permission.ts, user-role.ts, role-permission.ts, session.ts
45: src/services/
46:   auth.ts, authorization.ts, session.ts, user.ts
47: src/actions/
48:   auth.ts
49: middleware.ts        # Route protection (root)
50:`
51:
52: ## Environment
53:
54: | Variable | Purpose |
55: | -------------------- | -------------------------------- |
56: | `DATABASE_URL` | Neon pooled connection |
57: | `DIRECT_URL` | Neon direct (for Prisma CLI) |
58: | `BETTER_AUTH_SECRET` | Encryption secret (min 32 chars) |
59: | `BETTER_AUTH_URL` | Base URL |
60:
61: ## Migration
62:
63: `bash
64: pnpm prisma migrate dev --name add-better-auth-and-rbac
65: `
```

## File: docs/Coding Standards.md

```markdown
1: # Coding Standards
2:
3: ## General
4:
5: TypeScript strict mode. Readable > clever. Simple > abstract. Never duplicate business logic.
6:
7: ## File Naming
8:
9: | Type | Convention |
10: | ---------- | --------------------- |
11: | Components | `PascalCase.tsx` |
12: | Hooks | `useCamelCase.ts` |
13: | Utilities | `camelCase.ts` |
14: | Constants | `UPPER_SNAKE_CASE.ts` |
15: | Types | `types.ts` |
16:
17: ## Imports
18:
19: Always use path aliases (`@/...`). Never relative paths crossing multiple directories.
20:
21: ## Components
22:
23: **Prefer:** Server Components, small size, composition, single responsibility.
24: **Avoid:** huge components, nested conditionals, business logic in UI.
25:
26: ## Styling
27:
28: Tailwind only. No inline styles. No CSS duplication.
29:
30: ## State Management (priority order)
31:
32: 1. Server state
33: 2. URL state (search/route params)
34: 3. Local state (`useState`)
35: 4. Context (only for truly global: theme, auth)
36:
37: No premature global state.
38:
39: ## Business Logic
40:
41: Business logic lives only in Services. Never in components, hooks, or repositories.
42:
43: ## Database
44:
45: All DB access through repositories. Never call Prisma from UI.
46:
47: ## Error Handling
48:
49: Validate inputs. Return meaningful errors. Handle unexpected failures.
50:
51: ## Performance
52:
53: Server Components, lazy loading, memoize only when measured to help. No premature optimization.
54:
55: ## Security
56:
57: Validate server input. Sanitize user content. Secrets in env vars. Least privilege.
58:
59: ## Testing
60:
61: Every important business rule has tests. Critical UI flows have component or integration tests.
62:
63: ## Documentation
64:
65: Architecture changes require doc updates. Docs must reflect current reality.
```

## File: docs/Components.md

```markdown
1: # Components
2:
3: ## Folder Layout
4:
5: ` 6: components/
 7:   ui/        # shadcn/ui primitives (Button, Input, Card, Dialog, ...)
 8:   layout/    # Page structure (Header, Sidebar, Footer, Shell)
 9:   shared/    # Composed reusable components (SearchBar, UserMenu, EmptyState)
10: features/
11:   <feature>/ # Feature components co-located with feature
12:`
13:
14: ## Composition
15:
16: `17: Page → Layout → Feature → Shared → UI
18:`
19:
20: ## Principles
21:
22: - Single responsibility, reusable, props-driven, no hidden side effects.
23: - UI primitives: generic, no business logic.
24: - Feature components live next to their feature.
25:
26: ## Accessibility (required on all interactive components)
27:
28: Keyboard navigation · visible focus states · screen-reader labels · semantic HTML.
29:
30: ## Styling
31:
32: Tailwind utilities + design tokens from `globals.css`. No custom CSS unless necessary. No inline styles.
33:
34: ## Creation Checklist
35:
36: - [ ] Reuses an existing component if possible
37: - [ ] Generic and reusable
38: - [ ] Lives in the right folder (ui / shared / layout / feature)
39: - [ ] Accessible, responsive, properly typed
40: - [ ] Follows anti-slop design rules (see `docs/Design Rules.md`)
41: - [ ] Uses design tokens, not raw colors
42: - [ ] Intentional spacing, not uniform defaults
43: - [ ] Shadows over borders for depth
44: - [ ] Press states and ≥ 40×40 hit areas on interactive elements
```

## File: docs/Design Rules.md

```markdown
1: # Design Rules
2:
3: Frontend quality rules that prevent generic AI-generated output. Read before building any UI.
4:
5: ## The Three Dials (set before layout)
6:
7: | Dial | Default | Purpose |
8: | ---------------- | ------- | --------------------------------------------------- |
9: | Design Variance | 8 | How much layout breaks from generic grids |
10: | Motion Intensity | 6 | Animation/transition presence |
11: | Visual Density | 4 | Information per viewport (raise for data-heavy UIs) |
12:
13: Defaults 8/6/4 work for most landing pages. Commit to a direction before touching layout.
14:
15: ## Color
16:
17: - One accent color, one radius scale, one theme per page.
18: - Never purple-to-blue gradients by default.
19: - Use design tokens from `globals.css`. No inventing new color variables.
20:
21: ## Typography
22:
23: - Body: `max-w-[65ch]`, `text-wrap: pretty`.
24: - Headlines: `text-wrap: balance`.
25: - Antialiasing on. Tabular nums for numeric data.
26: - No em-dash (U+2014) or en-dash (U+2013) in visible text. Use hyphens.
27: - More whitespace than feels necessary; add density deliberately.
28: - Prefer shadows/contrast over borders for separation.
29:
30: ## Hero
31:
32: - Headline ≤ 2 lines, subtext ≤ 20 words, CTA above the fold, top padding ≤ `pt-24`, max 4 text elements.
33:
34: ## Navigation
35:
36: - Single line at desktop. Height cap 80px (default 64-72). No hamburger on desktop.
37:
38: ## Layout
39:
40: - 8-section page → use ≥ 4 different layout families.
41: - Bento grids: exactly N cells for N items.
42: - Never cards-inside-cards.
43: - Break the grid at least once. Uniform spacing everywhere looks generated.
44:
45: ## Micro-Interactions
46:
47: - **Radius:** outer = inner + padding (concentric).
48: - **Press:** `scale(0.96)`. Never below 0.95.
49: - **Shadows:** compose from 3 layers (ambient, key, rim). Prefer over borders.
50: - **Hit areas:** minimum 40×40px (extend with pseudo-element if needed).
51: - **Animation:** icon `scale 0.25→1, opacity 0→1, blur 4px→0`; stagger ~100ms; enter ~800ms, exit subtler; spring `duration 0.3, bounce 0`.
52: - Always honor `prefers-reduced-motion`.
53: - **Image outlines:** `1px` at `10%` opacity (black light / white dark).
54:
55: ## Component Checklist
56:
57: - [ ] No generic AI layout (cards-in-cards, uniform grids, centered everything)
58: - [ ] One accent color, no random gradients
59: - [ ] Typography uses `balance`/`pretty`
60: - [ ] Press states visible on interactive elements
61: - [ ] Shadows are multi-layered
62: - [ ] Hit areas ≥ 40×40px
63: - [ ] Animations respect `prefers-reduced-motion`
64: - [ ] Spacing deliberate, not default
65: - [ ] Grid broken at least once
66: - [ ] No em-dashes or en-dashes in visible text
67:
68: ## Anti-Patterns to Flag
69:
70: Inter for everything without justification · purple-to-blue gradient backgrounds · cards-in-cards · uniform spacing · perfectly centered hero with no asymmetric element · no animation on any interactive element · borders instead of shadows · default Tailwind palette used raw · leftover "Welcome to Next.js" boilerplate.
71:
72: ## Sources
73:
74: Taste Skill · make-interfaces-feel-better · Impeccable · Anthropic frontend-design · ui-ux-pro-max · Vercel web-design-guidelines · Refactoring UI · Butterick's Practical Typography.
```

## File: docs/Project Context.md

```markdown
1: # Project Context
2:
3: ## Vision
4:
5: Modern, scalable, production-ready web application. Clean architecture. Long-term quality over rapid feature development.
6:
7: ## Goals
8:
9: Solid foundation · business logic independent from UI · maximize reuse · great DX · AI-friendly codebase · low tech debt.
10:
11: ## Priorities
12:
13: 1. Maintainability
14: 2. Performance
15: 3. Scalability
16: 4. Developer Experience
17: 5. Accessibility
18: 6. Security
19:
20: ## Constraints
21:
22: TypeScript strict · Server Components by default · minimal client JS · SEO-friendly · accessible · reusable components · clean architecture.
23:
24: ## Non-Goals
25:
26: Over-engineering · premature optimization · unnecessary deps · large client bundles · duplicated business logic.
27:
28: ## Success Criteria
29:
30: Easy to extend, test, document, AI-understand, and onboard new developers.
31:
32: ## Documentation Rules
33:
34: Every significant change updates the docs. ADRs before implementation when possible. Docs always reflect current state.
```

## File: docs/Tech Stack.md

```markdown
1: # Technology Stack
2:
3: | Category | Choice | Why |
4: | ------------- | ------------------- | --------------------------------------------------------- |
5: | Framework | Next.js 16 | Server Components, App Router, performance, ecosystem |
6: | Language | TypeScript | Type safety, refactorability, fewer runtime errors |
7: | UI | React 19 | Server Components, concurrent rendering, mature ecosystem |
8: | Styling | Tailwind v4 | Utility-first, small bundle, fast iteration |
9: | Components | shadcn/ui | Accessible, fully customizable, no vendor lock-in |
10: | Database | PostgreSQL (Neon) | Reliable, scalable, serverless-friendly |
11: | ORM | Prisma | Type-safe queries, migrations, first-class TS support |
12: | Validation | Zod | Type inference, reliable runtime validation |
13: | Forms | React Hook Form | Minimal re-renders, strong TS support |
14: | Testing | Jest + RTL | Standard Next.js testing stack |
15: | Lint / Format | ESLint + Prettier | Static analysis + consistent formatting |
16: | Git hooks | Husky + lint-staged | Quality gates on commit |
17:
18: ## Principles
19:
20: Every dependency must justify its existence: improve maintainability, DX, performance, or solve a real problem.
21:
22: ## Testing Rules
23:
24: - Unit tests for pure functions/utilities.
25: - Integration tests for API endpoints and DB interactions.
26: - Monitor coverage, but don't enforce at the cost of maintainability.
```

## File: prisma/schema.prisma

```prisma
  1: generator client {
  2:   provider = "prisma-client-js"
  3: }
  4:
  5: datasource db {
  6:   provider = "postgresql"
  7: }
  8:
  9: // ──────────────────────────────────────────────
 10: // Better Auth Models
 11: // ──────────────────────────────────────────────
 12:
 13: model User {
 14:   id            String    @id @default(cuid())
 15:   email         String    @unique
 16:   name          String?
 17:   emailVerified Boolean   @default(false)
 18:   image         String?
 19:   createdAt     DateTime  @default(now())
 20:   updatedAt     DateTime  @updatedAt
 21:   sessions      Session[]
 22:   accounts      Account[]
 23:   userRoles     UserRole[]
 24:
 25:   @@map("user")
 26: }
 27:
 28: model Session {
 29:   id        String   @id
 30:   expiresAt DateTime
 31:   token     String
 32:   createdAt DateTime @default(now())
 33:   updatedAt DateTime @updatedAt
 34:   ipAddress String?
 35:   userAgent String?
 36:   userId    String
 37:   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 38:
 39:   @@unique([token])
 40:   @@index([userId])
 41:   @@map("session")
 42: }
 43:
 44: model Account {
 45:   id                    String    @id
 46:   accountId             String
 47:   providerId            String
 48:   userId                String
 49:   user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
 50:   accessToken           String?
 51:   refreshToken          String?
 52:   idToken               String?
 53:   accessTokenExpiresAt  DateTime?
 54:   refreshTokenExpiresAt DateTime?
 55:   scope                 String?
 56:   password              String?
 57:   createdAt             DateTime  @default(now())
 58:   updatedAt             DateTime  @updatedAt
 59:
 60:   @@index([userId])
 61:   @@map("account")
 62: }
 63:
 64: model Verification {
 65:   id         String   @id
 66:   identifier String
 67:   value      String
 68:   expiresAt  DateTime
 69:   createdAt  DateTime @default(now())
 70:   updatedAt  DateTime @updatedAt
 71:
 72:   @@index([identifier])
 73:   @@map("verification")
 74: }
 75:
 76: // ──────────────────────────────────────────────
 77: // Authorization Models (RBAC)
 78: // ──────────────────────────────────────────────
 79:
 80: model Role {
 81:   id            String           @id @default(cuid())
 82:   name          String           @unique
 83:   description   String?
 84:   createdAt     DateTime         @default(now())
 85:   updatedAt     DateTime         @updatedAt
 86:   userRoles     UserRole[]
 87:   rolePermissions RolePermission[]
 88:
 89:   @@map("role")
 90: }
 91:
 92: model Permission {
 93:   id            String           @id @default(cuid())
 94:   name          String           @unique
 95:   description   String?
 96:   resource      String
 97:   action        String
 98:   createdAt     DateTime         @default(now())
 99:   updatedAt     DateTime         @updatedAt
100:   rolePermissions RolePermission[]
101:
102:   @@unique([resource, action])
103:   @@map("permission")
104: }
105:
106: model UserRole {
107:   id        String   @id @default(cuid())
108:   userId    String
109:   roleId    String
110:   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
111:   role      Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)
112:   createdAt DateTime @default(now())
113:
114:   @@unique([userId, roleId])
115:   @@index([userId])
116:   @@index([roleId])
117:   @@map("user_role")
118: }
119:
120: model RolePermission {
121:   id           String     @id @default(cuid())
122:   roleId       String
123:   permissionId String
124:   role         Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
125:   permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)
126:   createdAt    DateTime   @default(now())
127:
128:   @@unique([roleId, permissionId])
129:   @@index([roleId])
130:   @@index([permissionId])
131:   @@map("role_permission")
132: }
```

## File: src/app/globals.css

```css
  1: @import "tailwindcss";
  2: @import "tw-animate-css";
  3: @import "shadcn/tailwind.css";
  4: @custom-variant dark (&:is(.dark *));
  5: @theme inline {
  6:   --color-background: var(--background);
  7:   --color-foreground: var(--foreground);
  8:   --font-sans: var(--font-sans);
  9:   --font-heading: var(--font-sans);
 10:   --color-sidebar-ring: var(--sidebar-ring);
 11:   --color-sidebar-border: var(--sidebar-border);
 12:   --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
 13:   --color-sidebar-accent: var(--sidebar-accent);
 14:   --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
 15:   --color-sidebar-primary: var(--sidebar-primary);
 16:   --color-sidebar-foreground: var(--sidebar-foreground);
 17:   --color-sidebar: var(--sidebar);
 18:   --color-chart-5: var(--chart-5);
 19:   --color-chart-4: var(--chart-4);
 20:   --color-chart-3: var(--chart-3);
 21:   --color-chart-2: var(--chart-2);
 22:   --color-chart-1: var(--chart-1);
 23:   --color-ring: var(--ring);
 24:   --color-input: var(--input);
 25:   --color-border: var(--border);
 26:   --color-destructive: var(--destructive);
 27:   --color-accent-foreground: var(--accent-foreground);
 28:   --color-accent: var(--accent);
 29:   --color-muted-foreground: var(--muted-foreground);
 30:   --color-muted: var(--muted);
 31:   --color-secondary-foreground: var(--secondary-foreground);
 32:   --color-secondary: var(--secondary);
 33:   --color-primary-foreground: var(--primary-foreground);
 34:   --color-primary: var(--primary);
 35:   --color-popover-foreground: var(--popover-foreground);
 36:   --color-popover: var(--popover);
 37:   --color-card-foreground: var(--card-foreground);
 38:   --color-card: var(--card);
 39:   --radius-sm: calc(var(--radius) * 0.6);
 40:   --radius-md: calc(var(--radius) * 0.8);
 41:   --radius-lg: var(--radius);
 42:   --radius-xl: calc(var(--radius) * 1.4);
 43:   --radius-2xl: calc(var(--radius) * 1.8);
 44:   --radius-3xl: calc(var(--radius) * 2.2);
 45:   --radius-4xl: calc(var(--radius) * 2.6);
 46: }
 47: :root {
 48:   --background: oklch(1 0 0);
 49:   --foreground: oklch(0.145 0 0);
 50:   --card: oklch(1 0 0);
 51:   --card-foreground: oklch(0.145 0 0);
 52:   --popover: oklch(1 0 0);
 53:   --popover-foreground: oklch(0.145 0 0);
 54:   --primary: oklch(0.205 0 0);
 55:   --primary-foreground: oklch(0.985 0 0);
 56:   --secondary: oklch(0.97 0 0);
 57:   --secondary-foreground: oklch(0.205 0 0);
 58:   --muted: oklch(0.97 0 0);
 59:   --muted-foreground: oklch(0.556 0 0);
 60:   --accent: oklch(0.97 0 0);
 61:   --accent-foreground: oklch(0.205 0 0);
 62:   --destructive: oklch(0.577 0.245 27.325);
 63:   --border: oklch(0.922 0 0);
 64:   --input: oklch(0.922 0 0);
 65:   --ring: oklch(0.708 0 0);
 66:   --chart-1: oklch(0.87 0 0);
 67:   --chart-2: oklch(0.556 0 0);
 68:   --chart-3: oklch(0.439 0 0);
 69:   --chart-4: oklch(0.371 0 0);
 70:   --chart-5: oklch(0.269 0 0);
 71:   --radius: 0.625rem;
 72:   --sidebar: oklch(0.985 0 0);
 73:   --sidebar-foreground: oklch(0.145 0 0);
 74:   --sidebar-primary: oklch(0.205 0 0);
 75:   --sidebar-primary-foreground: oklch(0.985 0 0);
 76:   --sidebar-accent: oklch(0.97 0 0);
 77:   --sidebar-accent-foreground: oklch(0.205 0 0);
 78:   --sidebar-border: oklch(0.922 0 0);
 79:   --sidebar-ring: oklch(0.708 0 0);
 80: }
 81: .dark {
 82:   --background: oklch(0.145 0 0);
 83:   --foreground: oklch(0.985 0 0);
 84:   --card: oklch(0.205 0 0);
 85:   --card-foreground: oklch(0.985 0 0);
 86:   --popover: oklch(0.205 0 0);
 87:   --popover-foreground: oklch(0.985 0 0);
 88:   --primary: oklch(0.922 0 0);
 89:   --primary-foreground: oklch(0.205 0 0);
 90:   --secondary: oklch(0.269 0 0);
 91:   --secondary-foreground: oklch(0.985 0 0);
 92:   --muted: oklch(0.269 0 0);
 93:   --muted-foreground: oklch(0.708 0 0);
 94:   --accent: oklch(0.269 0 0);
 95:   --accent-foreground: oklch(0.985 0 0);
 96:   --destructive: oklch(0.704 0.191 22.216);
 97:   --border: oklch(1 0 0 / 10%);
 98:   --input: oklch(1 0 0 / 15%);
 99:   --ring: oklch(0.556 0 0);
100:   --chart-1: oklch(0.87 0 0);
101:   --chart-2: oklch(0.556 0 0);
102:   --chart-3: oklch(0.439 0 0);
103:   --chart-4: oklch(0.371 0 0);
104:   --chart-5: oklch(0.269 0 0);
105:   --sidebar: oklch(0.205 0 0);
106:   --sidebar-foreground: oklch(0.985 0 0);
107:   --sidebar-primary: oklch(0.488 0.243 264.376);
108:   --sidebar-primary-foreground: oklch(0.985 0 0);
109:   --sidebar-accent: oklch(0.269 0 0);
110:   --sidebar-accent-foreground: oklch(0.985 0 0);
111:   --sidebar-border: oklch(1 0 0 / 10%);
112:   --sidebar-ring: oklch(0.556 0 0);
113: }
114: @layer base {
115:   * {
116:     @apply border-border outline-ring/50;
117:   }
118:   body {
119:     @apply bg-background text-foreground;
120:   }
121:   html {
122:     @apply font-sans;
123:   }
124: }
```

## File: src/app/layout.tsx

```typescript
 1: import type { Metadata } from "next";
 2: import { Manrope } from "next/font/google";
 3: import { ThemeProvider } from "@/providers/theme-provider";
 4: import "./globals.css";
 5: const manrope = Manrope({
 6:   variable: "--font-sans",
 7:   subsets: ["latin"],
 8: });
 9: export const metadata: Metadata = {
10:   title: "Next.js Project",
11:   description:
12:     "Maintainable, production-grade software with clean architecture",
13: };
14: export default function RootLayout({
15:   children,
16: }: Readonly<{
17:   children: React.ReactNode;
18: }>) {
19:   return (
20:     <html
21:       lang="en"
22:       suppressHydrationWarning
23:       className={`${manrope.variable} h-full antialiased`}
24:     >
25:       <body className="min-h-full flex flex-col">
26:         <ThemeProvider
27:           attribute="class"
28:           defaultTheme="system"
29:           enableSystem
30:           disableTransitionOnChange
31:         >
32:           {children}
33:         </ThemeProvider>
34:       </body>
35:     </html>
36:   );
37: }
```

## File: src/app/page.tsx

```typescript
 1: import { Header } from "@/components/layout/header";
 2: import { Footer } from "@/components/layout/footer";
 3: import { Hero } from "@/components/sections/hero";
 4: import { Features } from "@/components/sections/features";
 5: import { Stats } from "@/components/sections/stats";
 6: import { CTA } from "@/components/sections/cta";
 7: export default function Home() {
 8:   return (
 9:     <>
10:       <Header />
11:       <main className="flex-1">
12:         <Hero />
13:         <Features />
14:         <Stats />
15:         <CTA />
16:       </main>
17:       <Footer />
18:     </>
19:   );
20: }
```

## File: src/components/theme/mode-toggle.tsx

```typescript
 1: "use client";
 2: import * as React from "react";
 3: import { Moon, Sun } from "lucide-react";
 4: import { useTheme } from "next-themes";
 5: import { Button } from "@/components/ui/button";
 6: const emptySubscribe = () => () => {};
 7: function ModeToggle(props: React.ComponentProps<typeof Button>) {
 8:   const { resolvedTheme, setTheme } = useTheme();
 9:   const mounted = React.useSyncExternalStore(
10:     emptySubscribe,
11:     () => true,
12:     () => false,
13:   );
14:   const isDark = mounted && resolvedTheme === "dark";
15:   const toggleTheme = () => {
16:     if (!mounted) return;
17:     setTheme(isDark ? "light" : "dark");
18:   };
19:   return (
20:     <Button
21:       type="button"
22:       variant="outline"
23:       size="icon"
24:       aria-label={
25:         mounted
26:           ? isDark
27:             ? "Switch to light mode"
28:             : "Switch to dark mode"
29:           : "Toggle theme"
30:       }
31:       title={isDark ? "Switch to light mode" : "Switch to dark mode"}
32:       onClick={toggleTheme}
33:       {...props}
34:     >
35:       <Sun
36:         aria-hidden="true"
37:         className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
38:       />
39:       <Moon
40:         aria-hidden="true"
41:         className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
42:       />
43:       <span className="sr-only">Toggle theme</span>
44:     </Button>
45:   );
46: }
47: export { ModeToggle };
```

## File: src/components/ui/button.tsx

```typescript
 1: import { Button as ButtonPrimitive } from "@base-ui/react/button";
 2: import { cva, type VariantProps } from "class-variance-authority";
 3: import { cn } from "@/lib/utils";
 4: const buttonVariants = cva(
 5:   "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
 6:   {
 7:     variants: {
 8:       variant: {
 9:         default: "bg-primary text-primary-foreground hover:bg-primary/80",
10:         outline:
11:           "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
12:         secondary:
13:           "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
14:         ghost:
15:           "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
16:         destructive:
17:           "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
18:         link: "text-primary underline-offset-4 hover:underline",
19:       },
20:       size: {
21:         default:
22:           "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
23:         xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
24:         sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
25:         lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
26:         icon: "size-8",
27:         "icon-xs":
28:           "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
29:         "icon-sm":
30:           "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
31:         "icon-lg": "size-9",
32:       },
33:     },
34:     defaultVariants: {
35:       variant: "default",
36:       size: "default",
37:     },
38:   },
39: );
40: function Button({
41:   className,
42:   variant = "default",
43:   size = "default",
44:   ...props
45: }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
46:   return (
47:     <ButtonPrimitive
48:       data-slot="button"
49:       className={cn(buttonVariants({ variant, size, className }))}
50:       {...props}
51:     />
52:   );
53: }
54: export { Button, buttonVariants };
```

## File: .env.example

```
1: # Database (Neon PostgreSQL)
2: DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
3: DIRECT_URL="postgresql://user:password@host/database?sslmode=require"
4:
5: # Better Auth
6: BETTER_AUTH_SECRET="<generate with: openssl rand -base64 32>"
7: BETTER_AUTH_URL="http://localhost:3000"
```

## File: .gitignore

```
 1: # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2:
 3: # dependencies
 4: /node_modules
 5: /.pnp
 6: .pnp.*
 7: .yarn/*
 8: !.yarn/patches
 9: !.yarn/plugins
10: !.yarn/releases
11: !.yarn/versions
12:
13: # testing
14: /coverage
15:
16: # next.js
17: /.next/
18: /out/
19:
20: # production
21: /build
22:
23: # misc
24: .DS_Store
25: *.pem
26:
27: # debug
28: npm-debug.log*
29: yarn-debug.log*
30: yarn-error.log*
31: .pnpm-debug.log*
32:
33: # env files
34: .env
35: .env.local
36: .env.*.local
37:
38: # vercel
39: .vercel
40:
41: # typescript
42: *.tsbuildinfo
43: next-env.d.ts
44:
45: # IDE
46: .vscode/
47: *.swp
48: *.swo
49:
50: # repomix
51: repomix.config.json
52: .repomixignore
53:
54: # obsidian
55: .obsidian/
56:
57: # grapgify
58: /public/graphs/
```

## File: AGENTS.md

```markdown
1: # AI Development Guide
2:
3: > **Tool-agnostic instructions.** This file is the canonical, tool-independent source of truth for AI coding assistants working in this repository. It is intentionally written so any agent — regardless of vendor or runtime — can read and follow it.
4: >
5: > See `docs/AI Instructions.md` for a longer discussion of tool compatibility and loading strategies.
6: >
7: > Tool-specific mirrors (kept identical to this file) may exist at:
8: >
9: > - `CLAUDE.md` (Claude Code)
10: > - `.cursorrules` or `.cursor/rules/AGENTS.md` (Cursor)
11: > - `.github/copilot-instructions.md` (GitHub Copilot)
12: > - `.windsurfrules` (Windsurf)
13: > - `.clinerules` or `.cline/AGENTS.md` (Cline / Roo Code)
14: > - `.continuerc.json` reference (Continue.dev)
15: >
16: > If you are an MCP-based agent (Context7, filesystem MCP, etc.), use your filesystem tool to read this file directly.
17:
18: ---
19:
20: # Mission
21:
22: Build maintainable, production-grade software.
23:
24: Readable code is preferred over clever code.
25:
26: Correctness is preferred over speed.
27:
28: Consistency is preferred over personal preference.
29:
30: ---
31:
32: # Technology Stack
33:
34: - Next.js 16
35: - React 19
36: - TypeScript
37: - Tailwind CSS v4
38: - shadcn/ui
39: - Prisma ORM
40: - PostgreSQL
41: - Neon Database
42: - Zod
43: - React Hook Form
44:
45: ---
46:
47: ## Architecture Rules
48:
49: Always follow this architecture:
50:
51: ` 52: UI
 53: ↓
 54: 
 55: Actions / Routes
 56: ↓
 57: 
 58: Services
 59: 
 60: ↓
 61: 
 62: Repositories
 63: 
 64: ↓
 65: 
 66: Database
 67:`
68:
69: Business logic must never exist inside UI components.
70:
71: Database access must never happen directly inside UI components.
72:
73: ---
74:
75: # Before Writing Code
76:
77: Always understand:
78:
79: - Existing architecture
80: - Current conventions
81: - File organization
82: - Naming conventions
83: - Existing abstractions
84:
85: Never introduce a second pattern when one already exists.
86:
87: ---
88:
89: # Component Rules
90:
91: Components should:
92:
93: - Have a single responsibility.
94: - Stay small.
95: - Prefer composition over inheritance.
96: - Avoid duplicated logic.
97: - Avoid unnecessary props.
98:
99: ---
100:
101: # TypeScript Rules
102:
103: - Never use `any`.
104: - Prefer inferred types.
105: - Use Zod for runtime validation.
106: - Export reusable types.
107: - Keep types close to the feature.
108:
109: ---
110:
111: # Next.js Rules
112:
113: - Prefer Server Components.
114: - Use Client Components only when required.
115: - Keep business logic outside UI.
116: - Use Server Actions when appropriate.
117: - Keep routes thin.
118:
119: ---
120:
121: # UI Rules
122:
123: Use existing shadcn/ui components whenever appropriate.
124:
125: Prefer:
126:
127: - Accessible components
128: - Consistent spacing
129: - Responsive layouts
130: - Semantic HTML
131:
132: Avoid generic AI-generated layouts.
133:
134: Every UI should feel intentional.
135:
136: ---
137:
138: # Design Quality Rules
139:
140: Every UI must follow the anti-slop rules defined in `docs/Design Rules.md`.
141:
142: Key rules:
143:
144: - Set the three dials (Design Variance, Motion Intensity, Visual Density) before layout.
145: - One accent color per page. No purple-to-blue gradients.
146: - Body text: `max-w-[65ch]`, `text-wrap: pretty`.
147: - Headlines: `text-wrap: balance`.
148: - Interactive elements: 40x40px minimum hit area, `scale(0.96)` press feedback.
149: - Shadows over borders. Three-layer shadow composition.
150: - Always honor `prefers-reduced-motion`.
151: - Break the uniform grid intentionally.
152: - No cards nested inside cards.
153: - No em-dashes or en-dashes in visible text.
154:
155: Flag these anti-patterns immediately:
156:
157: - Inter used for everything without justification.
158: - Purple-to-blue gradient backgrounds.
159: - Uniform equal spacing everywhere.
160: - Default Tailwind colors used without customization.
161:
162: Full rules: `docs/Design Rules.md`
163:
164: ---
165:
166: # Styling Rules
167:
168: - Use Tailwind consistently.
169: - Reuse design tokens from globals.css.
170: - Avoid arbitrary values unless justified.
171: - Maintain consistent spacing.
172: - Prefer shadows over borders for visual separation.
173:
174: ---
175:
176: # Performance
177:
178: Always optimize for:
179:
180: - Small bundles
181: - Lazy loading
182: - Minimal hydration
183: - Server rendering
184: - Efficient data fetching
185:
186: ---
187:
188: # Documentation
189:
190: Whenever architecture changes:
191:
192: - Update documentation.
193: - Keep README accurate.
194: - Document new conventions.
195:
196: ---
197:
198: # Before Finishing
199:
200: Verify:
201:
202: - TypeScript passes
203: - ESLint passes
204: - Build succeeds
205: - No dead code
206: - No duplicated logic
207: - Naming is consistent
208: - Imports are clean
209: - Documentation updated if required
210:
211: If something can be simplified without changing behavior, simplify it.
212:
213: ---
214:
215: # Philosophy
216:
217: Readable code is more valuable than clever code.
218:
219: Consistency is more valuable than personal preference.
220:
221: Long-term maintainability is more important than short-term speed.
```

## File: eslint.config.mjs

```javascript
 1: import { defineConfig, globalIgnores } from "eslint/config";
 2: import nextVitals from "eslint-config-next/core-web-vitals";
 3: import nextTs from "eslint-config-next/typescript";
 4: const eslintConfig = defineConfig([
 5:   ...nextVitals,
 6:   ...nextTs,
 7:   globalIgnores([
 8:     ".next/**",
 9:     "out/**",
10:     "build/**",
11:     "next-env.d.ts",
12:   ]),
13:   {
14:     rules: {
15:       "react/no-unescaped-entities": "off",
16:       "react/react-in-jsx-scope": "off",
17:     },
18:   }
19: ]);
20: export default eslintConfig;
```

## File: jest.config.ts

```typescript
 1: import type { Config } from "jest";
 2: import nextJest from "next/jest.js";
 3: const createJestConfig = nextJest({ dir: "./src" });
 4: const config: Config = {
 5:   testEnvironment: "jsdom",
 6:   coverageProvider: "v8",
 7:   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
 8:   moduleNameMapper: {
 9:     "^@/(.*)$": "<rootDir>/$1",
10:   },
11: };
12: export default createJestConfig(config);
```

## File: knip.json

```json
 1: {
 2:   "$schema": "https://unpkg.com/knip@6/schema.json",
 3:   "tags": ["-lintignore"],
 4:   "prettier": {
 5:     "config": [".prettierrc"]
 6:   },
 7:   "eslint": {
 8:     "config": ["eslint.config.mjs"]
 9:   },
10:   "typescript": {
11:     "config": ["tsconfig.json"]
12:   },
13:   "postcss": {
14:     "config": ["postcss.config.{mjs,js}"]
15:   },
16:   "ignore": [
17:     "src/components/ui/*",
18:     "prisma/schema.prisma",
19:     "src/lib/db.ts",
20:     "src/repositories/*.ts",
21:     "src/services/*.ts",
22:     "src/lib/env.ts"
23:   ],
24:   "ignoreDependencies": [
25:     "@neondatabase/serverless",
26:     "@prisma/adapter-neon",
27:     "@prisma/adapter-pg",
28:     "@prisma/client",
29:     "pg",
30:     "ws",
31:     "react-hook-form",
32:     "@types/pg",
33:     "@types/ws",
34:     "ts-node",
35:     "tsx"
36:   ]
37: }
```

## File: tsconfig.json

```json
 1: {
 2:   "compilerOptions": {
 3:     "target": "ES2017",
 4:     "lib": ["dom", "dom.iterable", "esnext"],
 5:     "allowJs": true,
 6:     "skipLibCheck": true,
 7:     "strict": true,
 8:     "noEmit": true,
 9:     "esModuleInterop": true,
10:     "module": "esnext",
11:     "moduleResolution": "bundler",
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "jsx": "react-jsx",
15:     "incremental": true,
16:     "plugins": [
17:       {
18:         "name": "next"
19:       }
20:     ],
21:     "paths": {
22:       "@/*": ["./src/*"]
23:     }
24:   },
25:   "include": [
26:     "next-env.d.ts",
27:     "**/*.ts",
28:     "**/*.tsx",
29:     ".next/types/**/*.ts",
30:     ".next/dev/types/**/*.ts",
31:     "**/*.mts"
32:   ],
33:   "exclude": ["node_modules"]
34: }
```

## File: docs/Development/Git.md

```markdown
1: # Git Workflow
2:
3: This project uses a **trunk-based development workflow** with `master` as the stable production branch and `dev` as the integration branch.
4:
5: ## Branching Strategy
6:
7: ### Core Branches
8:
9: - **`master`** - Production/stable branch. Protected. Only receives merges from `dev` after full verification.
10: - **`dev`** - Development/integration branch. Protected. All feature branches merge here first.
11:
12: ### Feature Branches
13:
14: All feature work happens in `dev/<feature>` branches created from the latest `dev`:
15:
16: `text
 17: dev/navbar              # UI feature
 18: dev/auth                # Authentication feature
 19: dev/dashboard           # Dashboard feature
 20: dev/fix/navbar-mobile   # Bug fix
 21: dev/docs/architecture   # Documentation update
 22: `
23:
24: **Naming convention:** `dev/<description>` where description is lowercase with hyphens.
25:
26: ## Workflow
27:
28: `text
 29: master (production)
 30:   ↑
 31:   │ merge after verification
 32:   │
 33:  dev (integration)
 34:   ↑
 35:   │ merge via PR
 36:   │
 37: dev/<feature> (your work)
 38: `
39:
40: ### Development Process
41:
42: 1. **Start a new feature:**
43:
44: `bash
 45:    git checkout dev
 46:    git pull origin dev
 47:    git checkout -b dev/your-feature-name
 48:    `
49:
50: 2. **Work on your feature:**
51: - Keep the branch focused on one feature/fix
52: - Make small, logical commits
53: - Follow commit conventions (see below)
54:
55: 3. **Before merging to dev:**
56:
57: `bash
 58:    # Ensure all checks pass
 59:    pnpm lint
 60:    pnpm typecheck
 61:    pnpm test
 62:    pnpm build
 63:    `
64:
65: 4. **Create Pull Request:**
66: - Target: `dev` branch
67: - Ensure CI passes (lint, typecheck, tests, build)
68: - Get code review if possible
69: - Merge when approved and green
70:
71: 5. **Keep dev stable:**
72: - `dev` should always build successfully
73: - Never merge broken code to `dev`
74: - Delete feature branches after merging
75:
76: ## Release Workflow
77:
78: When `dev` is ready for release:
79:
80: `text
 81: dev
 82:  ↓
 83: 1. Run full test suite and verification
 84:  ↓
 85: 2. Update version in package.json
 86:  ↓
 87: 3. Create PR: dev → master
 88:  ↓
 89: 4. Merge to master after approval
 90:  ↓
 91: 5. Tag release with vX.Y.Z
 92:  ↓
 93: 6. Deploy to production
 94: `
95:
96: ### Versioning
97:
98: Use **Semantic Versioning** (MAJOR.MINOR.PATCH):
99:
100: - **PATCH** (0.1.0 → 0.1.1) - Bug fixes, no breaking changes
101: - **MINOR** (0.1.0 → 0.2.0) - New features, backward-compatible
102: - **MAJOR** (0.1.0 → 1.0.0) - Breaking changes
103:
104: ### Release Steps
105:
106: `bash
107: # 1. Ensure dev is stable and tested
108: git checkout dev
109: pnpm lint && pnpm typecheck && pnpm test && pnpm build
110: 
111: # 2. Update version (manually edit package.json or use npm version)
112: # For a minor release:
113: npm version minor -m "chore: release v%s"
114: 
115: # 3. Push version commit to dev
116: git push origin dev
117: 
118: # 4. Create PR from dev to master
119: # (Use GitHub/GitLab UI or CLI tool)
120: 
121: # 5. After merge, tag the release on master
122: git checkout master
123: git pull origin master
124: git tag -a v0.2.0 -m "Release v0.2.0"
125: git push origin v0.2.0
126: 
127: # 6. Deploy to production
128: `
129:
130: ## Commit Conventions
131:
132: Use **Conventional Commits**: `type(scope): description`
133:
134: ### Commit Types
135:
136: - `feat` - New feature
137: - `fix` - Bug fix
138: - `docs` - Documentation changes
139: - `refactor` - Code refactoring (no behavior change)
140: - `style` - Formatting, whitespace (no code change)
141: - `test` - Add or update tests
142: - `chore` - Maintenance, dependencies
143: - `ci` - CI configuration changes
144: - `build` - Build system changes
145: - `perf` - Performance improvements
146:
147: ### Examples
148:
149: `bash
150: feat(auth): add email verification flow
151: fix(navbar): resolve mobile menu z-index issue
152: docs(readme): update installation instructions
153: refactor(user-service): extract validation logic
154: test(auth): add session expiry tests
155: chore(deps): upgrade Next.js to 16.2.10
156: `
157:
158: ## Pull Requests
159:
160: Every PR must:
161:
162: - ✅ Pass ESLint without errors
163: - ✅ Pass TypeScript type checking
164: - ✅ Pass all tests
165: - ✅ Build successfully
166: - ✅ Include relevant documentation updates
167: - ✅ Have a clear description of changes
168:
169: ## Git Hooks (Husky + lint-staged)
170:
171: Pre-commit hook runs automatically on `git commit`:
172:
173: - ESLint fix on staged `.js`, `.jsx`, `.ts`, `.tsx` files
174: - Prettier format on staged files
175: - TypeScript check (full project)
176:
177: **To skip hooks** (only when absolutely necessary):
178:
179: `bash
180: git commit --no-verify -m "your message"
181: `
182:
183: ## Protected Branch Rules
184:
185: ### `master` branch
186:
187: - ❌ No direct commits
188: - ✅ Only accepts merges from `dev`
189: - ✅ Requires PR approval
190: - ✅ Requires CI to pass
191:
192: ### `dev` branch
193:
194: - ❌ No direct commits
195: - ✅ Only accepts merges from `dev/<feature>` branches
196: - ✅ Requires CI to pass
197: - ✅ Must stay buildable at all times
198:
199: ## Best Practices
200:
201: ### Do
202:
203: - ✅ Create feature branches from the latest `dev`
204: - ✅ Keep feature branches focused on one task
205: - ✅ Write clear, descriptive commit messages
206: - ✅ Run verification checks before creating PRs
207: - ✅ Delete feature branches after merging
208: - ✅ Keep commits small and logical
209: - ✅ Rebase feature branches on `dev` to stay current
210: - ✅ Use `git pull --rebase` to avoid merge commits
211:
212: ### Don't
213:
214: - ❌ Never commit directly to `master` or `dev`
215: - ❌ Never commit secrets or `.env` files
216: - ❌ Never use `git push --force` on shared branches
217: - ❌ Never rewrite history on public branches
218: - ❌ Never merge broken code to `dev`
219: - ❌ Don't use `git reset --hard` without understanding consequences
220: - ❌ Don't use `git clean -fd` without caution
221:
222: ### Database Changes
223:
224: - Schema changes must include Prisma migrations
225: - Test migrations locally before committing
226: - Include migration verification in PR description
227: - Never modify production database manually
228:
229: ### Force Push Safety
230:
231: If you must force push (rare cases on your own feature branch only):
232:
233: `bash
234: # Safer alternative to --force
235: git push --force-with-lease origin dev/your-feature
236: `
237:
238: This ensures you don't overwrite others' work.
239:
240: ## CI/CD
241:
242: GitHub Actions runs on:
243:
244: - Push to `master` or `dev` (currently `main`, `develop` - will be updated)
245: - Pull requests to `master` or `dev`
246:
247: CI checks:
248:
249: 1. **Quality** - TypeScript, ESLint, Knip (dead code)
250: 2. **Tests** - Jest test suite
251: 3. **Build** - Production build verification
252:
253: All checks must pass before merge.
254:
255: ## Quick Reference
256:
257: `bash
258: # Start new feature
259: git checkout dev && git pull && git checkout -b dev/my-feature
260: 
261: # Regular development
262: git add .
263: git commit -m "feat(scope): description"
264: git push origin dev/my-feature
265: 
266: # Before creating PR
267: pnpm lint && pnpm typecheck && pnpm test && pnpm build
268: 
269: # Update your branch with latest dev
270: git checkout dev && git pull
271: git checkout dev/my-feature
272: git rebase dev
273: 
274: # After PR is merged
275: git checkout dev && git pull
276: git branch -d dev/my-feature
277: `
```

## File: docs/meta/Dashboard.md

```markdown
1: # Dashboard
2:
3: ## Project Status
4:
5: - **Stage:** Foundation
6: - **Framework:** Next.js 16 + React 19 + TypeScript
7: - **UI:** shadcn/ui + Tailwind v4
8: - **DB:** PostgreSQL (Neon) via Prisma
9: - **Status:** Pre-production
10:
11: ## Authentication
12:
13: Better Auth · Prisma adapter (PostgreSQL/Neon) · RBAC · DB-backed sessions with cookie cache.
14:
15: ## Tech Health
16:
17: | Technology | Version | Status |
18: | ------------ | --------- | ---------- |
19: | Next.js | 16.2.10 | Active |
20: | React | 19.2.4 | Active |
21: | TypeScript | 5.9.3 | Active |
22: | Tailwind CSS | v4 | Active |
23: | Prisma | 7.8.0 | Active |
24: | shadcn/ui | base-nova | Active |
25: | Jest | 30.4.2 | Configured |
26: | ESLint | 9.x | Active |
27: | Prettier | 3.9.x | Active |
28: | Husky | Active | Pre-commit |
29:
30: ## Documentation Folders
31:
32: `rules/` (8) · `meta/` (4) · `skills/` (4) · `flows/` (5) · `audits/` (6) · `deliverables/` (3) · `concepts/` (6) · `decisions/` (4) · `reference/` (placeholder) · `ADR/` (3) · `API/` (1) · `Development/` (6) — all current.
```

## File: docs/meta/Start Here.md

```markdown
1: # Start Here
2:
3: ## Setup
4:
5: `bash
 6: pnpm install
 7: cp .env.example .env       # set DATABASE_URL
 8: pnpm prisma:generate
 9: pnpm run dev
10: `
11:
12: ## Commands
13:
14: `bash
15: pnpm run dev | build | start | lint | test | format
16: pnpm prisma migrate dev | generate | studio | db push
17: pnpm run prepare          # set up Husky hooks
18: `
19:
20: Pre-commit: ESLint + Prettier + TypeScript on staged files via lint-staged.
21:
22: ## Project Structure
23:
24: `25: nextjs/
26: ├── src/
27: │   ├── app/                  # App Router pages
28: │   ├── actions/              # Server Actions
29: │   ├── components/           # React components
30: │   │   └── ui/               # shadcn/ui
31: │   ├── lib/
32: │   │   ├── auth.ts           # Better Auth server
33: │   │   ├── auth-client.ts    # Better Auth client
34: │   │   ├── db.ts             # Prisma singleton
35: │   │   ├── env.ts            # Env validation
36: │   │   ├── errors/           # Typed domain errors
37: │   │   └── validations/      # Zod schemas
38: │   ├── repositories/         # Data access
39: │   ├── services/             # Business logic
40: │   └── utils.ts
41: ├── docs/                     # Docs hub
42: ├── prisma/                   # Schema + migrations
43: ├── public/
44: ├── middleware.ts             # Route protection
45: └── package.json
46:`
47:
48: ## First Steps for AI Agents (tool-agnostic)
49:
50: 1. Read this file.
51: 2. Read `AGENTS.md` at repo root (or your tool's equivalent mirror: `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, etc.).
52: 3. Read `docs/rules/Architecture and Stack.md`.
53: 4. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
54: 5. Read `docs/skills/Taste Skill Project.md`.
55: 6. Read `docs/meta/CONVENTIONS.md`.
56:
57: ## Documentation Rules
58:
59: Update docs on every significant change. ADRs before implementation when possible. Docs always reflect current state.
```

## File: docs/Architecture.md

```markdown
1: # Architecture
2:
3: ## Layers
4:
5: ` 6: UI → Actions/Routes → Services → Repositories → Database (Prisma + PostgreSQL)
 7:`
8:
9: ## Responsibilities
10:
11: | Layer | Does | Must NOT |
12: | ---------------- | -------------------------------------------------------- | ---------------------------------------- |
13: | **UI** | Render, user interaction | Business logic, direct DB access |
14: | **Actions** | Auth, input validation (Zod), call services | Business logic, direct repo access |
15: | **Services** | Business rules, multi-repo workflows, complex validation | Know about HTTP, depend on UI frameworks |
16: | **Repositories** | Queries, CRUD, data mapping | Business logic, business rules |
17: | **Database** | Persistence | — |
18:
19: ## Principles
20:
21: 1. **Separation of concerns** — business logic only in services; data access only in repos.
22: 2. **Dependency direction** — flows downward only. Repositories never import services.
23: 3. **Server Components first** — use Client Components only for state, effects, event handlers, browser APIs.
24: 4. **Thin routes** — pages compose components and call actions/services; no logic in pages.
25: 5. **Reusable abstractions** — never introduce a second pattern when one exists.
26:
27: ## When to Add Each Layer
28:
29: - **Repository:** every DB table.
30: - **Service:** any business rule, multi-step workflow, or operation touching multiple repos.
31: - **Action:** every user-initiated mutation and any client-component data fetch.
32:
33: ## Type Safety
34:
35: - Never `any`.
36: - Export reusable types close to the feature.
37: - Zod for runtime validation; infer TS types from schemas.
```

## File: docs/DEVELOPMENT.md

```markdown
1: # Development Guide
2:
3: ## Setup
4:
5: `bash
  6: pnpm install
  7: cp .env.example .env       # set DATABASE_URL
  8: pnpm prisma:generate
  9: pnpm prisma db push
 10: pnpm dev
 11: `
12:
13: Requires: Node 20+, pnpm 8+, PostgreSQL (or Neon).
14:
15: ## Coding Standards
16:
17: **TypeScript:** strict mode, no `any`, prefer inference, use Zod for runtime validation.
18:
19: **Naming:**
20:
21: | Type | Convention |
22: | ---------- | --------------------- |
23: | Components | `PascalCase.tsx` |
24: | Hooks | `useCamelCase.ts` |
25: | Utilities | `camelCase.ts` |
26: | Constants | `UPPER_SNAKE_CASE.ts` |
27:
28: **Imports:** use path aliases (`@/...`), never relative paths crossing multiple directories.
29:
30: **Components:** Server by default; client only for state/effects/events/browser APIs. Keep small, single responsibility, prefer composition.
31:
32: **State priority:** Server → URL → Local → Context (Context only for truly global like theme/auth).
33:
34: **Styling:** Tailwind utilities, design tokens from `globals.css`, no hardcoded colors, use CVA for variants.
35:
36: ## Layer Roles
37:
38: - **Action:** user mutations, auth checks, Zod validation, calls service.
39: - **Service:** business logic, multi-repo workflows, complex validation.
40: - **Repository:** one per DB table, queries, data mapping only.
41:
42: ## Feature Workflow
43:
44: 1. Zod schema in `src/lib/validations/`.
45: 2. Repository functions in `src/repositories/`.
46: 3. Service orchestration in `src/services/`.
47: 4. Server Action in `src/actions/` (auth → validate → service).
48: 5. UI component calling the action.
49:
50: ## Testing
51:
52: Mock repositories in service tests. Use `@testing-library/react` for components.
53:
54: `ts
 55: jest.mock("@/repositories/user-repository");
 56: `
57:
58: ## Git Workflow
59:
60: This project uses a **trunk-based development workflow** with `master` (production) and `dev` (integration) branches.
61:
62: ### Branching Strategy
63:
64: `text
 65: master (production)
 66:   ↑
 67:   │ merge after full verification
 68:   │
 69:  dev (integration)
 70:   ↑
 71:   │ merge via PR
 72:   │
 73: dev/<feature> (your work)
 74: `
75:
76: ### Quick Workflow
77:
78: `bash
 79: # 1. Start feature from dev
 80: git checkout dev && git pull && git checkout -b dev/my-feature
 81: 
 82: # 2. Work and commit
 83: git commit -m "feat(scope): description"
 84: 
 85: # 3. Verify before PR
 86: pnpm lint && pnpm typecheck && pnpm test && pnpm build
 87: 
 88: # 4. Create PR to dev branch
 89: git push origin dev/my-feature
 90: `
91:
92: ### Commit Convention
93:
94: Use **Conventional Commits**: `type(scope): description`
95:
96: Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`
97:
98: Examples:
99:
100: `bash
101: feat(auth): add email verification
102: fix(navbar): resolve mobile menu issue
103: docs(readme): update installation steps
104: `
105:
106: ### Pre-commit Hooks
107:
108: Husky runs automatically on `git commit`:
109:
110: - ESLint fix on staged files
111: - Prettier format
112: - TypeScript check
113:
114: Skip only when necessary: `git commit --no-verify`
115:
116: ### Release Process
117:
118: When `dev` is ready:
119:
120: 1. Verify: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
121: 2. Update version in `package.json` (Semantic Versioning)
122: 3. Create PR: `dev` → `master`
123: 4. After merge, tag release: `git tag -a v0.2.0 -m "Release v0.2.0"`
124: 5. Deploy to production
125:
126: **Semantic Versioning:**
127:
128: - **PATCH** (0.1.1) - Bug fixes
129: - **MINOR** (0.2.0) - New features (backward-compatible)
130: - **MAJOR** (1.0.0) - Breaking changes
131:
132: See **[Git Workflow Guide](Development/Git.md)** for complete details on branching, releases, and best practices.
133:
134: ## Common Tasks
135:
136: `bash
137: pnpx shadcn@latest add button       # add shadcn component
138: pnpm prisma migrate dev --name X    # create migration
139: pnpm typecheck                      # check types
140: `
141:
142: New env var: add to `.env.example`, `.env`, and `src/lib/env.ts` (Zod).
143:
144: ## Debugging
145:
146: - Server Component errors log to **terminal**, not browser.
147: - Enable Prisma logging: `new PrismaClient({ log: ["query", "error", "warn"] })`.
148:
149: ## Performance Checklist
150:
151: - [ ] Server Components by default
152: - [ ] Loading states + Suspense boundaries
153: - [ ] `next/image` for images
154: - [ ] Dynamic imports for heavy components
155: - [ ] DB indexes + cursor pagination
```

## File: docs/Home.md

```markdown
1: # Documentation Hub
2:
3: Central index for the project docs.
4:
5: ---
6:
7: ## P1 · Rules & Architecture
8:
9: **`rules/`** — Architecture and Stack · AI Tells (Forbidden Patterns) · Anthropic Frontend Design Rules · Vercel Interface Rule Categories · Taste Skill Color Rules · Dark Mode Protocol · Em-Dash Ban · Hero Discipline
10:
11: **`meta/`** — Start Here · CONVENTIONS · Tag Taxonomy · Dashboard
12:
13: **`skills/`** — Vercel Web Design Guidelines · Impeccable Toolchain · Make Interfaces Feel Better · Taste Skill Project
14:
15: ## P2 · Workflows & Quality
16:
17: **`flows/`** — Build Greenfield (Prompt 1) · Redesign First-Audit (Prompt 2) · Full Stack Build Flow · Audit Pipeline Flow · Install and Load
18:
19: **`audits/`** — Pre-Flight Check (Section 14) · Vercel Audit Guidelines · Impeccable Audit and Detect · MIFB Review Checklist · Brand Fidelity Audit · Preservation Audit
20:
21: **`deliverables/`** — Unified Pre-Flight Mega Checklist · Design Skills Cheat Sheet · Quickstart
22:
23: ## P3 · Concepts & Decisions
24:
25: **`concepts/`** — AI Slop · Coaxing Beats Constraint · Optical Alignment · Press Feedback and Hit Areas · Interruptible Animation · Design Review as Infrastructure
26:
27: **`decisions/`** — Enforcement Layer Overlap · Font Ban Conflicts · Motion Doctrine Conflicts · Prompt Layer vs Toolchain Layer
28:
29: ## P4 · References
30:
31: **`reference/`** — Source Ledger · Entities · Gaps · Questions
32:
33: **`ADR/`** — 001 Layered Architecture · 002 Neon + Prisma · 003 shadcn/ui
34:
35: ## Legacy
36:
37: **Architecture:** Authentication · Architecture · Project Context · Tech Stack · Coding Standards
38:
39: **Development:** Components · [Database (API)](API/Database.md) · [Git](Development/Git.md) · [NoctisNova Doctor Suite](Development/NoctisNova%20Doctor%20Suite.md) ([ORM](Development/ORM%20Doctor.md) · [Auth](Development/Auth%20Doctor.md) · [Dead](Development/Dead%20Doctor.md) · [Neat](Development/Neat%20Doctor.md))
40:
41: **AI:** AI Instructions · Design Rules
42:
43: ---
44:
45: ## Current Status
46:
47: Foundation · Next.js 16 · shadcn/ui + Tailwind v4 · PostgreSQL (Neon) via Prisma · Pre-production.
48:
49: ## Documentation Rules
50:
51: Update docs on every significant change. ADRs before implementation when possible. Docs always reflect current state.
```

## File: package.json

```json
 1: {
 2:   "name": "nextjs",
 3:   "version": "0.1.0",
 4:   "private": true,
 5:   "scripts": {
 6:     "dev": "next dev",
 7:     "build": "next build",
 8:     "start": "next start",
 9:     "lint": "eslint",
10:     "knip": "knip",
11:     "prepare": "husky",
12:     "lint-staged": "lint-staged",
13:     "prisma:generate": "prisma generate",
14:     "safety-net": "cc-safety-net",
15:     "format": "prettier --write .",
16:     "test": "jest",
17:     "typecheck": "tsc --noEmit"
18:   },
19:   "lint-staged": {
20:     "*.{js,jsx,ts,tsx}": [
21:       "eslint --fix",
22:       "prettier --write"
23:     ],
24:     "*.{json,md,html,css}": [
25:       "prettier --write"
26:     ]
27:   },
28:   "dependencies": {
29:     "@base-ui/react": "^1.6.0",
30:     "@neondatabase/serverless": "^1.1.0",
31:     "@prisma/adapter-neon": "^7.8.0",
32:     "@prisma/adapter-pg": "^7.8.0",
33:     "@prisma/client": "^7.8.0",
34:     "@t3-oss/env-nextjs": "^0.13.11",
35:     "better-auth": "^1.6.23",
36:     "class-variance-authority": "^0.7.1",
37:     "clsx": "^2.1.1",
38:     "dotenv": "^17.4.2",
39:     "lucide-react": "^1.25.0",
40:     "next": "16.2.10",
41:     "next-themes": "^0.4.6",
42:     "pg": "^8.22.0",
43:     "react": "19.2.4",
44:     "react-dom": "19.2.4",
45:     "react-hook-form": "^7.81.0",
46:     "shadcn": "^4.13.0",
47:     "tailwind-merge": "^3.6.0",
48:     "tw-animate-css": "^1.4.0",
49:     "ws": "^8.21.1",
50:     "zod": "^4.4.3"
51:   },
52:   "devDependencies": {
53:     "@tailwindcss/postcss": "^4",
54:     "@testing-library/dom": "^10.4.1",
55:     "@testing-library/jest-dom": "^6.9.1",
56:     "@testing-library/react": "^16.3.2",
57:     "@types/jest": "^30.0.0",
58:     "@types/node": "^20.19.43",
59:     "@types/pg": "^8.20.0",
60:     "@types/react": "^19",
61:     "@types/react-dom": "^19",
62:     "@types/ws": "^8.18.1",
63:     "cc-safety-net": "^1.0.6",
64:     "eslint": "^9.39.5",
65:     "eslint-config-next": "16.2.10",
66:     "husky": "^9.1.7",
67:     "jest": "^30.4.2",
68:     "jest-environment-jsdom": "^30.4.1",
69:     "knip": "^6.27.0",
70:     "lint-staged": "^17.0.8",
71:     "prettier": "^3.9.5",
72:     "prisma": "^7.8.0",
73:     "tailwindcss": "^4",
74:     "ts-node": "^10.9.2",
75:     "tsx": "^4.23.1",
76:     "typescript": "^5.9.3"
77:   }
78: }
```

## File: README.md

```markdown
1: # Next.js Modern Starter
2:
3: > A production-ready Next.js starter with TypeScript, Prisma, Tailwind CSS v4, and shadcn/ui.
4:
5: ## Quick Start
6:
7: `bash
  8: # Install dependencies
  9: pnpm install
 10: 
 11: # Set up environment variables
 12: cp .env.example .env
 13: 
 14: # Generate Prisma client
 15: pnpm prisma:generate
 16: 
 17: # Start development server
 18: pnpm dev
 19: `
20:
21: Visit `http://localhost:3000`
22:
23: ## Tech Stack
24:
25: | Category | Technology |
26: | ---------- | ----------------- |
27: | Framework | Next.js 16 |
28: | Language | TypeScript |
29: | UI | React 19 |
30: | Styling | Tailwind CSS v4 |
31: | Components | shadcn/ui |
32: | Database | PostgreSQL (Neon) |
33: | ORM | Prisma |
34: | Validation | Zod |
35: | Forms | React Hook Form |
36: | Testing | Jest |
37: | Linting | ESLint + Prettier |
38:
39: ## Project Structure
40:
41: ` 42: src/
 43: ├── app/              # Next.js App Router pages
 44: ├── components/       # Reusable UI components
 45: │   ├── ui/          # shadcn/ui components
 46: │   ├── layout/      # Layout components
 47: │   └── shared/      # Shared components
 48: ├── lib/             # Utilities and configurations
 49: ├── actions/         # Server Actions
 50: ├── services/        # Business logic
 51: ├── repositories/    # Data access layer
 52: └── providers/       # React Context providers
 53: 
 54: prisma/
 55: └── schema.prisma    # Database schema
 56: 
 57: docs/                # Project documentation
 58:`
59:
60: ## Architecture
61:
62: This project follows a **layered architecture** to separate concerns:
63:
64: ` 65: UI Layer (React Components)
 66:          ↓
 67: Actions/Routes (Server Actions, API Routes)
 68:          ↓
 69: Services (Business Logic)
 70:          ↓
 71: Repositories (Data Access)
 72:          ↓
 73: Database (Prisma + PostgreSQL)
 74:`
75:
76: **Key Principles:**
77:
78: - Business logic lives in **Services**, never in UI components
79: - Database access happens only through **Repositories**
80: - Prefer **Server Components** by default
81: - Use **Client Components** only when needed (state, events, browser APIs)
82:
83: ## Available Scripts
84:
85: `bash
 86: pnpm dev          # Start development server
 87: pnpm build        # Build for production
 88: pnpm start        # Start production server
 89: pnpm lint         # Run ESLint
 90: pnpm format       # Format code with Prettier
 91: pnpm typecheck    # Run TypeScript type checking
 92: pnpm test         # Run Jest tests
 93: `
94:
95: ## Documentation
96:
97: - **[Architecture](docs/ARCHITECTURE.md)** - Detailed architecture guide
98: - **[Development Guide](docs/DEVELOPMENT.md)** - Development workflows and best practices
99: - **[API Documentation](docs/API/)** - API references
100: - **[ADRs](docs/ADR/)** - Architecture Decision Records
101:
102: ## Project Goals
103:
104: - Clean, maintainable architecture
105: - Type-safe code throughout
106: - Excellent developer experience
107: - AI-friendly codebase
108: - Performance-optimized
109: - Accessible by default
110:
111: ## Git Workflow
112:
113: This project uses a trunk-based workflow:
114:
115: - **`master`** - Production/stable branch (protected)
116: - **`dev`** - Development/integration branch (protected)
117: - **`dev/<feature>`** - Feature branches
118:
119: ### Quick Start
120:
121: `bash
122: # Start new feature
123: git checkout dev && git pull && git checkout -b dev/my-feature
124: 
125: # Make changes and commit
126: git add .
127: git commit -m "feat(scope): description"
128: 
129: # Verify before PR
130: pnpm lint && pnpm typecheck && pnpm test && pnpm build
131: 
132: # Push and create PR to dev
133: git push origin dev/my-feature
134: `
135:
136: See **[Git Workflow Guide](docs/Development/Git.md)** for complete branching, release, and versioning guidelines.
137:
138: ## Contributing
139:
140: 1. Create feature branches from `dev` (never from `master`)
141: 2. Follow Conventional Commits: `type(scope): description`
142: 3. Ensure all checks pass: lint, typecheck, tests, build
143: 4. Create PR targeting `dev` branch
144: 5. Delete feature branch after merge
145:
146: See [Development Guide](docs/DEVELOPMENT.md) for coding standards.
147:
148: ## License
149:
150: MIT
```
