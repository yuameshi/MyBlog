---
title: 使用Termux进行手机挖矿(XMR)
tags:
  - ARM
  - Termux
  - XMRig
  - XMRig-ARM
  - 开发
  - 手机挖矿
  - 日常
  - 闲时赚钱
id: '357'
categories:
  - - 开发
  - - 日常
date: 2021-05-09 10:26:12
headerBG: https://i0.wp.com/www.han-han.xyz/wp-content/uploads/2021/05/IMG_20210509_102434.jpg?fit=1080%2C832&ssl=1
---

> 警告 - 写在开头  
> **使用ARM架构的CPU挖坑不仅效率低下，还会使硬件老化加快，所以本文只作为娱乐性教程，出现任何后果本人概不负责**

## 在这之前

你需要有一个门罗币钱包，一台Android手机，以及脑子。

关于选择何种钱包可以到[门罗币官方(?)](https://www.getmonero.org/downloads/)根据自己的个人需求选择。

这里我们选择[MyMonero](https://mymonero.com/)，只想试试或者不想申请钱包的可以用我的钱包地址(头图里自取)(有谁会白打工呢)。[GitHub Release](https://github.com/mymonero/mymonero-android-js/releases/latest)

![](/wp-content/uploads/2021/05/IMG_20210509_093602.jpg)

注意：创建钱包时一定要记忆好这一个secret mnemonic

> 注意  
> **创建钱包时一定要记忆好这一个secret mnemonic，并且不要泄露给他人，这是获取账号内资产的唯二途径中的一个(这号也是测试，随便泄露)**

## 配置环境

首先，我们要下载Termux，但该应用在Play、酷安的商店均已停止更新，所以要去F-Droid的自动化构建服务上下载，先前从酷安、Play商店下载的需要卸载并重新安装以**更新**(就是你不更新也行)。 [链接](https://f-droid.org/en/packages/com.termux/) [版本0.112直链](https://f-droid.org/repo/com.termux_112.apk)

然后，我们需要一个Linux环境，以下初始配置脚本来着[AnLinux](https://f-droid.org/zh_Hans/packages/exa.lnx.a/ "https://f-droid.org/zh_Hans/packages/exa.lnx.a/")，将会安装Ubuntu-Linux 20.04和一些基本组件

> 注意  
> **中国大陆的网络环境可能不尽人意，所以上raw.githubusercontent.com最好先开魔法上网。**

```bash
pkg install wget openssl-tool proot -y && hash -r && wget https://raw.githubusercontent.com/EXALAB/AnLinux-Resources/master/Scripts/Installer/Ubuntu/ubuntu.sh && bash ubuntu.sh
```

Termux使用技巧

_keyboard\_arrow\_down_

可以使用'termux-change-repo'来获取位于中国大陆的Termux源以加速下载，全选Main,Game和Science并在之后的对话框选择清华源即可 并且通过Tab可以使用代码补全（就是两个箭头的那个图标）

如果不是网络环境特别差的话一般1分钟即可安装完毕。(不挂魔法别想)

![](/wp-content/uploads/2021/05/IMG_20210509_092240.jpg)

当你看到如图画面的时候就安装完了

此时输入`./start-ubuntu.sh` 启动Ubuntu

然后粘贴以下脚本

```bash
apt update && apt install vim git build-essential cmake libuv1-dev libssl-dev libhwloc-dev -y 
```

## 构建XMRig

在挖矿前你要选择一个矿池，一般都会提供自己改过的XMRig仓库(虽然我觉得根本没改)。

到时候在下方替换我的仓库地址即可（如果真没给就用官方的[https://github.com/xmrig/xmrig](https://github.com/xmrig/xmrig)）

这里我选择猫池

键入`git clone https://github.com/C3Pool/xmrig-C3 && cd xmrig-C3`

然后键入`vim src/donate.h`

将48、49行的值均改成0以去除抽水

![](/wp-content/uploads/2021/05/IMG_20210509_100033.jpg)

vim使用提示

_keyboard\_arrow\_down_

使用i来开启编辑模式，ESC退出，保存退出就先'esc'+':wq&

> 警告  
> **目前最新版本的XMRig - C3发现一个Bug，即在ARM架构的设备上无法编译（https://github.com/C3Pool/xmrig-C3/pull/5） 2021/5/26最新跟进：C3Pool已经在17天前Merge了上述Pull Request，所以不改应该没什么问题**

## 修复无法在ARM架构设备编译错误的问题

在工作目录下键入 `vim src/crypto/cn/CryptoNight_arm.h` 并进入编辑模式

将623行的`template<xmrig::Algorithm::Id ALGO, bool SOFT_AES>`改为`template<xmrig::Algorithm::Id ALGO, bool SOFT_AES, int interleave>`。即在后尖括号前添加`, int interleave`。然后退出。

![](/wp-content/uploads/2021/05/image.png)

## 继续编译

输入`cmake . && make`。

![](/wp-content/uploads/2021/05/IMG_20210509_101022.jpg)

开始时应能看到如图画面

构建的时间有些久，可能需要5~10分钟。(环境：Redmi K30 Ultra）

构建完成后可以键入`ls`列出目录，成功构建应出现如图所示画面，有一个绿色的xmrig

![](/wp-content/uploads/2021/05/IMG_20210509_102042.jpg)

成功构建

启动可以用以下方法：

`./xmrig -u 钱包地址 -p 矿机名称 -o 矿池地址`

`xmrig -u XXXXXXXX -p K30U -o mine.c3pool.com:13333`

听说使用cn-pico算法效率较高，所以可以在最后加`-a cn-pico`

首次启动要进行性能测试，如图所示。

![](/wp-content/uploads/2021/05/IMG_20210509_102434.jpg)

要性能测试

我个人觉得可能放一个config.json比较好，存放测试数据，也可以直接`./xmrig`启动

键入`vim config.json`，进入编辑模式并输入以下内容，记得将user换成你的钱包地址，pass换成矿机名称，然后按`:wq`退出

```json
{
     "api": {
         "id": null,
         "worker-id": null
     },
     "http": {
         "enabled": false,
         "host": "127.0.0.1",
         "port": 0,
         "access-token": null,
         "restricted": true
     },
     "autosave": true,
     "background": false,
     "colors": true,
     "title": true,
     "randomx": {
         "init": -1,
         "init-avx2": 0,
         "mode": "auto",
         "1gb-pages": true,
         "rdmsr": true,
         "wrmsr": true,
         "cache_qos": false,
         "numa": true,
         "scratchpad_prefetch_mode": 1
     },
     "cpu": {
         "enabled": true,
         "huge-pages": true,
         "huge-pages-jit": false,
         "hw-aes": null,
         "priority": null,
         "memory-pool": true,
         "yield": true,
         "max-threads-hint": 100,
         "asm": true,
         "argon2-impl": null,
         "astrobwt-max-size": 550,
         "astrobwt-avx2": false,
         "cn/0": false,
         "cn-lite/0": false
     },
     "opencl": {
         "enabled": false,
         "cache": true,
         "loader": null,
         "platform": "AMD",
         "adl": true,
         "cn/0": false,
         "cn-lite/0": false,
         "panthera": false
     },
     "cuda": {
         "enabled": false,
         "loader": null,
         "nvml": true,
         "cn/0": false,
         "cn-lite/0": false,
         "panthera": false,
         "astrobwt": false
     },
     "donate-level": 0,
     "donate-over-proxy": 0,
     "log-file": null,
     "pools": [
         {
             "algo": null,
             "coin": null,
             "url": "mine.c3pool.com:15555",
             "user": "钱包地址",
             "pass": "K30U",
             "rig-id": null,
             "nicehash": false,
             "keepalive": true,
             "enabled": true,
             "tls": false,
             "tls-fingerprint": null,
             "daemon": false,
             "socks5": null,
             "self-select": null,
             "submit-to-origin": false
         }
     ],
     "print-time": 60,
     "health-print-time": 60,
     "dmi": true,
     "retries": 5,
     "retry-pause": 5,
     "syslog": false,
     "tls": {
         "enabled": false,
         "protocols": null,
         "cert": null,
         "cert_key": null,
         "ciphers": null,
         "ciphersuites": null,
         "dhparam": null
     },
     "user-agent": null,
     "verbose": 0,
     "watch": true,
     "rebench-algo": false,
     "bench-algo-time": 20,
     "pause-on-battery": false,
     "pause-on-active": false
 }
```

## 参考列表

[闲的没事？用手机termux挖矿吧 - 66ccff.work](https://66ccff.work/teach/313.html)

[Fix a bug causing build error in ARM device](https://github.com/KawaiiZapic/xmrig-C3/commit/35d7e9f09c1167114277e121e5420a0186fb39d9)@[KawaiiZapic/xmrig-C3](https://github.com/KawaiiZapic/xmrig-C3/commit/35d7e9f09c1167114277e121e5420a0186fb39d9)