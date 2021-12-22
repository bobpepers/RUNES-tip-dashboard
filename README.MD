## Install

### config
copy static/dev-config.js.example -> static/dev-config.js
copy static/prod-config.js.example -> static/prod-config.js

edit both files with with correct info

### Nginx config

development:
```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name localhost;
    ssl_certificate /etc/ssl/certs/localhost.crt;
    ssl_certificate_key /etc/ssl/private/localhost.key;
    ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

    location / {
        proxy_pass http://127.0.0.1:8012;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /api/ {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass         "http://127.0.0.1:8080/api/";
    }
    location /socket.io/ {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass         "http://127.0.0.1:8080/socket.io/";
    }
    location /static {
        autoindex on;
        alias /home/bago/RUNES-tip-dashboard/static;
    }
}

```

production:
```
server {
    server_name tip.runebase.io;
    root /home/bago/RUNES-Tip-dashboard/dist;
    index index.html index.htm;
    client_max_body_size 5M;


    location / {
        try_files $uri /index.html;
    }

    location /static {
        autoindex on;
        alias /home/bago/RUNES-tip-dashboard/static;
    }

    location /api/ {
        #add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass         "http://127.0.0.1:8080/api/";
    }

    location /socket.io/ {
        #add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass         "http://127.0.0.1:8080/socket.io/";
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/tip.runebase.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tip.runebase.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = tip.runebase.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name tip.runebase.io;
    listen 80;
    return 404; # managed by Certbot


}

```