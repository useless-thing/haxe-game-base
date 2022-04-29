# Haxe + HeapsIO + Modern JS GameBase

Based on [deepnight/gameBase](https://github.com/deepnight/gameBase)

## Setup

```sh
pnpm i
```

```sh
pnpm setup
```

## Dev

```sh
pnpm dev:web
```

## Web / HashLink VM Build

### Web

```sh
pnpm build:web
```

## Native Build

See [HashLink/C Compilation](https://haxe.org/manual/target-hl-c-compilation.html)

```sh
pnpm build:native
```

### Windows

Open `out/native/main.sln` to build

### Linux / MacOS

Change `HASHLINK_PATH` to your local hashlink path in [build.binary.sh](./build.binary.sh)

```sh
sh build.binary.sh
```

```sh
./game
```

## Others

- Sync with [deepnight/gameBase](https://github.com/deepnight/gameBase)

```sh
pnpm sync
```

## Notes

- [Compiling HashLink on macOS Apple Silicon](https://community.haxe.org/t/compiling-hashlink-on-macos-apple-silicon/3150)
