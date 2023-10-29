# Helix Webdev Config

One-stop shop for a modern web dev setup with Helix, using Typescript + ESLint + Prettier/dprint.

It took me some time to figure out how to set up Helix for webdev correctly after the merge of [Multi-LSP support with #2507](https://github.com/helix-editor/helix/pull/2507). While going through various configs that I found online, I was also never sure if things didn't work because of my Helix config or because of how the project was set up.

This particular setup uses dprint as its formatter but switching to Prettier is easily done, see below.

## Prerequisites
For completeness' sake and because it's never mentioned anywhere else, here are all the langservers you need to have installed.

### Language Servers
Install the [`typescript-language-server`](https://github.com/typescript-language-server/typescript-language-server). This is used by default by Helix.
```
npm install -g typescript-language-server typescript
```

The [`vscode-langservers-extracted`](https://github.com/hrsh7th/vscode-langservers-extracted) package provides language servers for Html, CSS, Json and ESLint.
```
npm i -g vscode-langservers-extracted
```

I'm also using [`emmet-ls`](https://github.com/aca/emmet-ls) for convenience:
```
npm install -g emmet-ls
```

### Formatters
#### dprint
We all know that a tool being written in Rust is enough reason for any true Rustacean to immediately switch over to it so in my personal setup I'm using [dprint](https://dprint.dev/install/) as my formatter:
```
curl -fsSL https://dprint.dev/install.sh | sh
```

#### Prettier
If you want to go for the canonical Typescript + ESLint + Prettier setup, install [Prettier](https://prettier.io/docs/en/install.html) (globally or locally) and comment/uncomment a few lines in the `.helix/languages.toml` file.
```
npm i -g prettier
```

## Bonus: Just use Deno?
For my personal projects, I'm currently exploring simply using Deno for both linting and formatting as I like its defaults and the simplicity of using just one langserver.
```
curl -fsSL https://deno.land/x/install/install.sh | sh
```
Here's how the `languages.toml` looks like for that:
```
[language-server]
deno = { command = "deno", args = [ "lsp" ]}

[[language]]
name = "tsx"
language-servers = [ "deno", "emmet-ls" ]
auto-format = true
```

# Helix Setup
Have a look at the [`languages.toml`](.helix/languages.toml) for the full Helix config.

# Project Setup
I'm using a [NextJS starter project](https://nextjs.org/docs/getting-started/installation) just to have something in hand and show off a correctly configured project.

Here's what I did to create the project.
```
npx create-next-app@latest helix-webdev-config
```

Add [`typescript-eslint`](https://typescript-eslint.io/getting-started) to add full Typescript support.
```
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

Exclude pure formatting lints from eslint. Formatting is a [different concern than linting](https://prettier.io/docs/en/comparison) and [should be handled separately](https://typescript-eslint.io/linting/troubleshooting/formatting).
```
npm i -D eslint-config-prettier
```

To quote directly from the above:

_Note that even if you use a formatter other than prettier, you can use eslint-config-prettier as it exclusively turns **off** all formatting rules._

When you open a file and save it, you should now see the formatter in action. To format the whole project, run:
```
dprint fmt
```

## Note on `efm-langserver`
I saw a few a few setups using `efm-langserver` for linting/formatting with ESLint + Prettier.
 I _think_ these can be regarded as deprecated and superseded by usage of an `vscode-eslint-language-server` and the newly added `formatter` option which appears to give better performance and a more straight-forward way of setting things up.
