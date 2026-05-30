# Music

Sounds I made (currently with ElevenLabs). Played by the widget on the
homepage; source of truth is [`manifest.json`](./manifest.json).

## Adding a track

1. Drop the audio file in this directory, e.g. `nebula-drive.mp3`.
2. Append an entry to `manifest.json`:

   ```json
   {
     "id": "nebula-drive",
     "title": "Nebula Drive",
     "url": "music/nebula-drive.mp3",
     "duration": 187
   }
   ```

   - `id` — unique stable string. Used to keep the active-track highlight
     correct when you reorder the list.
   - `title` — what shows on the player.
   - `url` — relative (`music/foo.mp3`) or absolute
     (`https://cdn.example.com/foo.mp3`). Switching from one to the other
     is just a manifest edit; the player doesn't care.
   - `duration` — optional. Seconds. The player reads it from the file
     metadata if you leave it out; the manifest value just makes the
     track list show duration before the file finishes buffering.

3. Commit + push.

## Keeping audio files out of git

`.gitignore` skips `*.mp3`, `*.wav`, `*.m4a`, `*.ogg` inside `music/` by
default. This is opinionated — large binaries in git history are a
one-way mistake. To **commit** a file anyway, force-add it:

```sh
git add -f music/nebula-drive.mp3
```

Most use cases want one of two patterns:

- **Public-on-GitHub-Pages**: commit small tracks (a few MB each), let
  Pages serve them directly. Soft limit ~100 GB/month bandwidth, plenty
  for a personal site.
- **External hosting**: host on Cloudflare R2 / Backblaze B2 / your own
  S3, put absolute URLs in `manifest.json`. No file lives in this repo.
  Best when you have lots of tracks or expect real traffic.

The widget supports both — and a mix.

## ElevenLabs licensing

Quick check before going public: confirm the current ElevenLabs Terms
of Service let you redistribute / publish the audio you generated. They
generally do for paid tier output; double-check what tier you generated
each track under.
