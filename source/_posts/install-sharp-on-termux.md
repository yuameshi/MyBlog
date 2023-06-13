---
title: Termux(Android/arm64/aarch64) 开发遇到的各种坑
tags:
  - 开发
  - 记录
id: '554'
categories:
  - - 开发
date: 2023-06-13 18:30
---

# 安装`sharp`
```bash
pkg in x11-repo
pkg in libvips xorgproto build-essential
```

# proot容器下无法安装npm包（`cacache`不可用）
没什么好说的，termux环境里搞定然后再在容器里跑

# 更有效率的`code-server`
proot容器内的cs效率太低（以至于`初始化JS/TS语言功能`都要一两分钟，所以最好在termux环境钟安装code-server
```bash
pkg in x11-repo
pkg in tur-repo
pkg in code-server
```

# 轻量代码编辑器

这里我推荐[NMM](https://play.google.com/store/apps/details?id=in.mfile)，你可以在Google Play下载，调好之后还是蛮好用的。

# 编译Android APP
Android我是没办法编译，因为我用的build-tools无论是proot还是termux，都没办法calculate dependencies。

所以最佳解决办法是临时用GitHub Codespace跑包然后下来热重载代码部分。（用途局限）

# ...以后遇到其他的会继续加