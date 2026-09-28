# Production deployment

The [production workflow](.github/workflows/deploy.prod.yml) builds the Next.js standalone server on each push to `main` (or a manual dispatch) and deploys it to the same DigitalOcean host used by Gatekeyper. It runs this site as a separate PM2 process on `127.0.0.1:3001` under `/var/www/brookvinehotelprices`.

## One-time setup

1. Set these **repository secrets in this repository**: `SSH_HOST`, `SSH_USERNAME`, and `SSH_PRIVATE_KEY`. Use the same host and SSH user as Gatekeyper, with a key authorized for that user. GitHub secrets are scoped to each repository unless configured at organization level.
2. On the host, install Node.js 24 and PM2 for that SSH user. If using NVM, the workflow loads `$HOME/.nvm/nvm.sh` and selects Node 24. Ensure the SSH user can create and write `/var/www/brookvinehotelprices` (create the directory and assign ownership once if needed).
3. Give this site its own Nginx server block and DNS name. Proxy to `http://127.0.0.1:3001`; keep Gatekeyper's existing proxy and PM2 process on their current ports. Configure TLS for the new name, then validate and reload Nginx.
4. Trigger the workflow. Check `pm2 status brookvinehotelprices` and `curl -I http://127.0.0.1:3001` on the host before checking the public URL.

The workflow keeps prior releases in `/var/www/brookvinehotelprices/releases` so a failed PM2 activation can restore the previous symlink. Remove old release directories during routine maintenance after confirming a newer release is healthy.
