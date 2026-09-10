# Deploying sp1le.tech

The site is static. Build it locally, upload `dist/`, done - nothing runs on the server.

```bash
npm run build
```

## Uploading

The current server block serves the site from `/var/www/portfolio` on the VPS.
`<vps>` below stands for the host; it is not written down in this repository on purpose.

```bash
rsync -avz --delete dist/ root@<vps>:/var/www/portfolio/
```

`--delete` removes files that are no longer part of the build. That is what you want
for a static site, but it also means **anything else living inside
`/var/www/portfolio/` would be deleted**. Check first:

```bash
ssh root@<vps> 'ls -la /var/www/portfolio/'
```

If another project sits in a subdirectory there, move it out (or drop `--delete`)
before the first upload.

Without rsync on Windows, plain scp works:

```bash
scp -r dist/* root@<vps>:/var/www/portfolio/
```

## nginx

TLS and the HTTP-to-HTTPS redirect are already configured on the server, and
**`/voiceduel` is served from the same host** - do not replace the whole server block
or that game goes offline. The only change worth making is inside the root location,
and it is optional:

```nginx
location / {
    root /var/www/portfolio;
    index index.html;

    # Multi-page static site: fall through to the real 404 page rather than
    # the SPA-style rewrite to /index.html, which answers 200 for every
    # mistyped URL and lets search engines index them.
    try_files $uri $uri/index.html $uri.html =404;
    error_page 404 /404.html;
}
```

Hashed assets under `/_astro/` and the fonts can be cached hard, since their names
change whenever their contents do:

```nginx
location /_astro/ {
    root /var/www/portfolio;
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /fonts/ {
    root /var/www/portfolio;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

After editing:

```bash
nginx -t && systemctl reload nginx
```

## Checklist after a deploy

- `https://sp1le.tech/` loads and shows the current manifest
- `https://sp1le.tech/uk` loads the Ukrainian version
- `https://sp1le.tech/work/getaway` loads a case study directly (not only via a link)
- `https://sp1le.tech/voiceduel` still works
- `https://sp1le.tech/nope` returns 404, not 200
- `https://sp1le.tech/sitemap-index.xml` resolves
