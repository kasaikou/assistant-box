ARG username=vscode
ARG useruid=1000
ARG usergid=${useruid}
ARG aptmirror=archive.ubuntu.com
ARG rust=1.66.0
ARG mold=1.7.1
ARG sccache=0.3.3

FROM ubuntu:22.04 as base

ARG username
ARG useruid
ARG usergid
ARG aptmirror
ARG rust

ENV DEBIAN_FRONTEND=nointeractive
ENV TZ=Asia/Tokyo

RUN sed -i "s@archive.ubuntu.com@${aptmirror}@g" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends sudo tzdata wget tar curl unzip software-properties-common && \
    groupadd --gid ${usergid} ${username} && \
    useradd -s /bin/bash --uid ${useruid} --gid ${usergid} -m ${username} && \
    echo ${username} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${username} && \
    chmod 0440 /etc/sudoers.d/${username}

FROM base as downloader

RUN wget https://noto-website-2.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip && \
    unzip NotoSansCJKjp-hinted.zip -d NotoSansCJKjp && \
    chmod -R 644 NotoSansCJKjp

ARG mold
RUN wget https://github.com/rui314/mold/releases/download/v${mold}/mold-${mold}-x86_64-linux.tar.gz && \
    tar -xvf mold-${mold}-x86_64-linux.tar.gz && \
    chmod -R 755 mold-${mold}-x86_64-linux/**

ARG sccache
RUN wget https://github.com/mozilla/sccache/releases/download/v${sccache}/sccache-v${sccache}-x86_64-unknown-linux-musl.tar.gz && \
    tar -xvf sccache-v${sccache}-x86_64-unknown-linux-musl.tar.gz && \
    chmod 755 sccache-v${sccache}-x86_64-unknown-linux-musl/sccache

ARG username
ARG rust
USER ${username}
RUN sudo curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf -o rust-init.sh && \
    sh rust-init.sh -y --default-toolchain ${rust}

FROM base as published

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
    apt-get update && apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.0-dev \
    git \
    build-essential \
    pkg-config \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    language-pack-ja \
    nodejs && \
    npm install -g yarn

COPY --from=downloader NotoSansCJKjp /usr/share/fonts/NotoSansCJKjp

ARG mold
COPY --from=downloader mold-${mold}-x86_64-linux /usr/local

ARG sccache
COPY --from=downloader sccache-v${sccache}-x86_64-unknown-linux-musl/sccache /usr/local/bin

ARG username
ARG rust
USER ${username}
COPY --from=downloader /home/${username}/.rustup /home/${username}/.rustup
COPY --from=downloader /home/${username}/.cargo /home/${username}/.cargo

ENV PATH=$PATH:/home/vscode/.cargo/bin
ENV RUSTC_WRAPPER=/usr/local/bin/sccache
ARG language=ja_JP.UTF-8
ENV LANG=${language}
ENV LANGUAGE=${language}
