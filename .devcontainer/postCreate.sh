#!/bin/sh

sudo chown -R `whoami` $HOME/.cargo/registry &&
yarn install &&

cd src-tauri && cargo fetch && cd ..
