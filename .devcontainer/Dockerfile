ARG username=vscode
ARG useruid=1000
ARG usergid=${useruid}
ARG aptmirror=archive.ubuntu.com
ARG rust=1.66.0

FROM ubuntu:22.04

ARG username
ARG useruid
ARG usergid
ARG aptmirror
ARG rust

ENV DEBIAN_FRONTEND=nointeractive
ENV TZ=Asia/Tokyo

RUN sed -i "s@archive.ubuntu.com@${aptmirror}@g" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends sudo tzdata && \
    groupadd --gid ${usergid} ${username} && \
    useradd -s /bin/bash --uid ${useruid} --gid ${usergid} -m ${username} && \
    echo ${username} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${username} && \
    chmod 0440 /etc/sudoers.d/${username}

RUN apt-get update && apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.0-dev \
    wget \
    curl \
    tar \
    unzip \
    git \
    software-properties-common \
    build-essential \
    pkg-config \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

USER ${username}
RUN sudo curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf -o rust-init.sh && \
    sh rust-init.sh -y --default-toolchain 1.66.0 && \
    sudo wget https://github.com/mozilla/sccache/releases/download/v0.3.3/sccache-v0.3.3-x86_64-unknown-linux-musl.tar.gz && \
    sudo tar -xvf sccache-v0.3.3-x86_64-unknown-linux-musl.tar.gz && \
    sudo mv sccache-v0.3.3-x86_64-unknown-linux-musl/sccache /usr/bin && \
    sudo chmod +x /usr/bin/sccache && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
    sudo apt-get install -y --no-install-recommends nodejs && \
    sudo npm install -g yarn

ENV PATH=$PATH:/home/vscode/.cargo/bin
ENV RUSTC_WRAPPER=/usr/bin/sccache
