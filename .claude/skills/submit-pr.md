# Press Release Submission Skill

## Purpose

Semi-automated press release submission to free PR distribution services. Claude fills forms via browser tools; the user solves any CAPTCHA and clicks Submit. Tracking prevents double-submissions across 40+ releases.

## Usage

```
/submit-pr <release-id> [service-id]
```

**Examples:**
- `/submit-pr 2026-11-site-launch` — submits to ALL unsubmitted services
- `/submit-pr 2026-11-site-launch prlog` — submits to PRLog only
- `/submit-pr 2026-11-vault-launch 1888pressrelease` — submits Vault release to 1888 only

## Files

- `press-releases/releases/*.md` — release markdown files with YAML frontmatter
- `press-releases/services.json` — 8 distribution services with field mappings
- `press-releases/submissions.json` — submission tracking (keyed by `releaseId.serviceId`)

## Workflow

### Step 1 — Parse the release

Read the specified release file from `press-releases/releases/<release-id>.md`. Extract:
- All YAML frontmatter fields (title, summary, body text, contact info, website, city, state, company, category)
- The body text is everything after the closing `---` of the frontmatter

### Step 2 — Load services

Read `press-releases/services.json`. Read `press-releases/submissions.json`.

If a `service-id` argument was given, target only that service.
Otherwise, target all services where `submissions[releaseId][serviceId]` does not exist or is not `"submitted"`.

Skip services already marked `"submitted"` and report them as skipped.

### Step 3 — For each target service

1. **Check if already submitted**: if `submissions[releaseId][serviceId] === "submitted"`, skip and say so.

2. **Open the service URL** in the built-in browser (`preview_start` or `navigate`).

3. **Read the page** (`read_page`) to identify form fields.

4. **Fill the form** using `form_input` with these mappings from the service's `fields` object:
   - `title` → release `title`
   - `body` → full release body text (everything after frontmatter)
   - `summary` → release `summary` (or first 200 chars of body if no summary field on form)
   - `category` → service's category value (already set in services.json)
   - `website` → `https://www.truefoundmovies.com`
   - `contactName` → release `contact_name`
   - `contactEmail` → release `contact_email`
   - `company` → `TrueFoundMovies`
   - `city` → release `city`
   - `state` → release `state`
   - `country` → `United States`

5. **Take a screenshot** after filling to show the completed form.

6. **If the service has `hasCaptcha: true`**: pause and tell the user:
   > "Form filled for [Service Name]. Please solve the CAPTCHA and click Submit, then let me know when it's done."
   Wait for the user to confirm before updating the tracking file.

7. **If `hasCaptcha: false`**: tell the user the form is ready and ask them to review and click Submit (never click Submit yourself — that is the user's action).

8. **After user confirms submission**: update `press-releases/submissions.json`:
   ```json
   {
     "releaseId": {
       "serviceId": "submitted",
       "submittedAt": "ISO timestamp"
     }
   }
   ```

### Step 4 — Report

After completing all target services, print a summary table:

| Service | Status |
|---------|--------|
| PRLog | Submitted |
| OpenPR | Submitted |
| PRFree | Skipped (already submitted) |
| ... | ... |

## Notes

- **Never click Submit yourself.** The user clicks Submit on every form. Claude's job is to fill it and hand it off.
- **Never re-submit** a service already marked `"submitted"` for this release without the user explicitly asking.
- **Account-required services** (`accountRequired: true`): if the page shows a login screen, tell the user to log in and let you know when they're on the submission form. The user manages their own accounts.
- **Body text length**: some services cap body at 5,000 chars. If the release body is longer, truncate at the last complete paragraph before the limit and append `\n\n[Full release at https://www.truefoundmovies.com]`.
- **If a form field isn't found**: skip that field, note it in the report, and continue filling what can be filled.

## Service notes (from services.json)

| Service | Account? | CAPTCHA? | Notes |
|---------|----------|----------|-------|
| PRLog | Yes | Yes | Strong SEO, good Google indexing |
| OpenPR | Yes | Yes | High domain authority, international pickup |
| 24-7 Press Release | Yes | Yes | One free release per account |
| PRFree | No | Yes | No account needed, quick |
| 1888 Press Release | Yes | No | No CAPTCHA — fastest to submit |
| PRZoom | Yes | Yes | Part of PR network |
| Newswire Today | No | Yes | No account needed |
| i-Newswire | Yes | Yes | Good SEO backlinks |

## Recommended submission order

Start with no-CAPTCHA services first (1888 Press Release), then no-account services (PRFree, Newswire Today), then the account-required ones. This front-loads the easiest submissions.
