# tomimi.dev

Built with Svelte 5 and SvelteKit 2. Use Node.js 24 and pnpm 11.

The `aliyun` branch uses `@sveltejs/adapter-node` and tracks the generated `build/` directory. Install with `pnpm install --frozen-lockfile`, build with `pnpm run build`, and start the production server with `node build`. Production dependencies must be installed on the server. Set `ORIGIN` to the public site URL when running behind a reverse proxy, and set `HOST`/`PORT` as needed. See the [Node adapter documentation](https://svelte.dev/docs/kit/adapter-node) for deployment options.

Run `bash update-build.sh` from a clean `aliyun` checkout to rebase onto local `main`, install dependencies, regenerate and commit the build, and push with `--force-with-lease`. Update local `main` first. The script stops on conflicts or build failures.

# Objective:

- To provide users with the most accurate information on stages & enemies stats/abilities in a readable manner and mods applied should be easily verifiable.
- To allow users to search for characters by filtering according to their function/abilities.
- To provide users with a way to view the stage playout in realtime so as to verify the flow/route of enemies.

# Roadmap:

### Operator Recruitment Helper

For enhancements/bugs please file an issue.
Written in javascript and using json for data

### Stage Simulator

Using a localised Spine library (older vers have no npm package) and threejs
Some models here are missing the special texture effects so they look different from in-game.
